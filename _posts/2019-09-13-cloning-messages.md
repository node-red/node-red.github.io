---
layout: blog
title: Cloning messages in a flow
author: nick
description: With the move to asynchronous messaging, we're also changing how the Function node clones messages. Find out what cloning is all about, why it's necessary and what's changing in 1.0.
---

With the change to asynchronous message passing in Node-RED 1.0, we're also changing
how some messages are cloned between nodes. The behaviour in this area wasn't
always clear and could lead to unexpected results to end users who weren't familiar
with some of the principles of JavaScript object handling.

This post explains what cloning messages is all about, why it's necessary and what
is changing in 1.0.


### Pass-by-reference

Before we get into the details of cloning messages, we once again take a detour
into how JavaScript works.

Let's consider the following code:

```javascript
> let a = { payload: "hello" };
> let b = a;
> b.payload = "goodbye";
> console.log(a)
{ payload: 'goodbye' }
```

We create a new object and assign it to the variable `a`. We then assign variable
`b` to the value of `a`. Next we change the value of `b.payload`. Finally we print
the original variable `a`.

As if by magic, the change we made to variable `b` has been made to variable `a`
as well. This is because we did *not* make a copy of the object - we created a new
reference to the same object in memory.

This is known as pass-by-reference and can cause unexpected results if you aren't
prepared for it.

### Cloning messages

Within a Node-RED flow, when a node receives a message (which is a JavaScript
Object), it is free to modify the message however it wants and then pass it on
to any nodes it is connected to.

![](/blog/content/images/2019/09/flow1.svg)

When Node A sends a message it generates two 'send events' - one for Node B and
one for Node C. If we simply passed the message to Node B then to Node C, any
modifications to the message made by Node B would be visible to Node C.

This is where the need to clone messages comes in. Node-RED automatically clones
messages before they are passed on in order to prevent this type of cross-branch
modification.

But it isn't quite as simple as that. Cloning messages can be expensive to do. For
flows that are single row of nodes with no branching, there is in general no need
to do any cloning of messages.

![](/blog/content/images/2019/09/flow2.svg)

So the code tries to optimise when it will clone a message or not. The algorithm is:

> When `node.send()` is called it generates a list of send events. The first
> send event uses the message object given as-is. All of the remaining send events
> clone their message before passing it on.

Essentially that means, for a node wired to one other node, a call to
`node.send(msg)` will *not* clone that message because there is no need to.

But this algorithm has its limits. In particular, we cannot handle the case
where a Function node calls `node.send()` multiple times with the *same*
message object.

For example, consider the following code from a Function node:

```javascript
msg.topic = "A";
msg.payload = "1";
node.send(msg);

msg.topic = "B";
msg.payload = "2";
node.send(msg);
```

Each individual call to `node.send()` will generate one send event, so the message
does not get cloned.

For *some* flows, this was not a problem prior to Node-RED 1.0. If the latter nodes
in the flow were entirely synchronous, the first call to `node.send()` would pass
the whole way down the flow and complete before the execution would return to the
function and modify the message for the second call.

But with Node-RED 1.0 introducing fully asynchronous message passing, this pattern
of code would potentially be unsafe to use. The message would get modified *before*
the send event from the first `node.send()` call is delivered.

This can cause quite subtle issues that are hard spot. There's no loud bang to alert
the user to a problem. If the code above was connected to an MQTT node, it would
generate duplicate messages on topic `B` and nothing on topic `A`.

We're changing the default approach to cloning used by the Function node to prevent
this issue.

### Cloning by default

With Node-RED 1.0, when a Function node calls `node.send()`, it will now clone
every single message, including the first. This will ensure code like that above
will continue to work.

But unfortunately this doesn't come for free. Cloning *can* be an expensive operation.
For many users it won't matter at all - their messages will be relatively small
and relatively infrequent.

It will be more of an issue for flows that have very large messages, high message
rates and also, more critically, flows that use messages that *cannot be cloned*.
For example, flows that move around video frames at a high rate.

For those flows, we are introducing a new optional argument to `node.send()` that
will keep the existing behaviour:

```javascript
node.send(msg, false);
```

This will tell the Function node *not* to clone the message - although the rules
still apply where if the flow branches, the 2nd and later branches *will* still
get a cloned message.

### Why change the default behaviour at all?

With every change we make, we have to assess the potential impact it has. The goal
is to minimise that impact and keep flows working as users expect.

When this issue came up, there were two possible possible approaches we could take.

One option was to change nothing in the code and update our documentation to
explain you really shouldn't reuse message objects and make use of
`RED.util.cloneMessage()` to manually clone messages in your Function code.

The problem with this approach is it leaves users uncertain over what they should
do for *their* flows. We have a large user base who are not experienced JavaScript
developers and are not interested in the inner workings of Node-RED. They expect
their flows to just work. The fact any issues this caused would be subtle and
hard to track down made the potential impact pretty high.

The other option, the one we chose to take, was to change the default behaviour to
ensure flows kept working for most users without them having to change *anything*.

One downside of this option is that there will be some flows that rely on the
non-cloning behaviour. However they will now fail in a much more obvious way;
the clone will fail with the very first message that passes through. That will
make it easier to identify the Function node at fault and to add the `false`
parameter as needed. In fact, they could update their flows to add the extra
parameter *today* in preparation of upgrading to 1.0.

The other downside is the potential performance hit of the extra clone. But again,
a slight performance hit is preferable to incorrect flow behaviour. Particularly as
we can seek out other ways to improve performance through-out the system as we
move forward.

Given the choice of either breaking a wide range of flows in a subtle and hard to
detect way, versus a clear break for a much smaller subset of flows, I hope
you can see why we chose the latter.

### What about other nodes?

The changes described above *only* apply to the Function node. Custom nodes remain
responsible for cloning messages as they need to before passing to `node.send()`.
