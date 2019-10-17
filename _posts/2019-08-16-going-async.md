---
layout: blog
title: Making flows asynchronous by default
author: nick
description: Changes are coming in Node-RED 1.0 to how messages are routed in a flow. Find out what it means to go asynchronous.
---

In Node-RED 1.0, we are changing the way messages pass between nodes from being
synchronous to being asynchronous. This will, in some cases, change the relative
order messages are handled in flows. This post explains what we mean by synchronous
and asynchronous, why we are making this change and what effect it will have.

### Node.js Event Loop

To understand how messages pass through a Node-RED flow, we first need to take
a slight detour into how Node.js works.

As JavaScript is a single-threaded language, it can only do one thing at a time.
But there are times when it needs to do something that will take a while, such
as make an HTTP request or write something to a file. If it did this work on its
only thread, then it would block anything else from happening and the performance
would be terrible.

Instead, Node.js passes those sorts of actions to the underlying operating system,
which is multi-threaded, and registers a callback that will be called when the
action completes. This is the idea of the [Event Loop that is at the heart of Node.js](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).

To overly simplify it, you can think of it as a queue of work. Each time the Event
Loop runs, it takes the next piece of work and runs it, which may in turn cause
new events to be added to the queue.


### Synchronous vs Asynchronous

When we talk about Synchronous and Asynchronous code, you can think of it like this:

 - Synchronous code all runs in a single pass of the Event Loop.
 - Asynchronous code starts with a piece of work in the Event Loop, that will in
   turn add another piece of work to the Event Loop that will be run in a future
   pass.

The key thing to understand is that with Asynchronous code, once it has added more
work to the Event Loop and its current work has 'finished', other pieces of work
can run.

### Synchronous messaging passing

Since the start of Node-RED we have used synchronous message passing between nodes.

This means when a node calls `node.send(msg)`, that call passes to the next node's
`input` event handler, which does its work and calls the next node's event handler
and so on. If each node's event handler is purely synchronous code, then a message
will passing all the way down the flow in a single pass of the Event Loop.

![](/blog/content/images/2019/08/flow1.svg)

If one of the nodes contains asynchronous code, such as the HTTP Request node,
then the current pass ends at that node and the next piece of work can
start. It is also possible in that case for the second message to overtake the
first if its asynchronous work completes before the first message's.

![](/blog/content/images/2019/08/flow1-node-async.svg)

### Branching a flow

When a flow branches, for a synchronous flow, each branch will be completed in turn.

![](/blog/content/images/2019/08/flow2.svg)

This does lead to a slightly counter-intuitive behaviour when you add Debug
nodes at each point along the flow. In the following diagram, note the order
in which messages arrive at the Debug nodes.

![](/blog/content/images/2019/08/flow4.svg)

### Changing to Asynchronous message passing

With Node-RED 1.0, we are changing the message passing to be asynchronous. That
means when a node calls `node.send(msg)`, the work to call the next node's `input`
event handler is put onto the queue to be called in a later pass of the Event Loop.

For those more familiar with the Event Loop, we use `setImmediate()` so they
actually get invoked during the 'check' phase of the current Event Loop iteration.

Looking back at the single branch, entirely synchronous, flow we started with, the
messages will now make equal progress through the flow.

![](/blog/content/images/2019/08/flow1-async.svg)

When a flow branches, the branches will be evaluated in 'parallel'.

![](/blog/content/images/2019/08/flow2-async.svg)

Which also means a flow with Debug nodes at each point, will log the message
in the expected order.

![](/blog/content/images/2019/08/flow4-async.svg)

### Why is this change needed?

Making the message passing asynchronous is needed for a number of reasons.

#### Pluggable Message Routing

One of the features on the roadmap, coming after 1.0, is the ability to plug
custom code into the message routing path. That custom code may need to do
asynchronous work - such as sending messages over the network in a distributed
Node-RED environment.

#### Node timeouts

We are looking at how the runtime can better monitor messages passing through a
flow and provide a standard way to timeout any node that takes too long.

With the current synchronous model, the time it takes a node to handle a message
is the time it takes to run its own code, plus the time it takes each subsequent
node to handle the message it is passed.

Looking at this branching flow again, lets say we want each node to take no more than
5 seconds to handle a message.

![](/blog/content/images/2019/08/flow2.svg)

If everything is synchronous, then the second node is not 'finished' until both
the yellow and red messages have reached their Debug nodes. If each node takes
2 seconds to process the message, then that second node will take 10 seconds
to process its message and will get timed out, even though no individual node
has taken longer than 5 seconds.

With asynchronous message passing, we can stop the clock as soon as the node has
queued up the work for the next nodes.

There's more work to be done after 1.0 to build on this capability, but the shift
to asynchronous is a key first step.

We'll have another blog post up soon that covers the changes to the node messaging
api in 1.0 to further support this timeout behaviour.

#### Better I/O scheduling

If you recall the purpose of the Event Loop is to allow the Node.js runtime to
perform I/O in the background and call back when there is something to be done.

But those callbacks can only happen if the Event Loop is able to make regular
progress. If you have a large piece of synchronous code, then you are preventing
those callbacks from being called. There is a trade off here. Purely synchronous
code is going to be faster, but it does starve the Event Loop.

By splitting a large synchronous flow into smaller asynchronous chunks, it allows
the Node.js runtime to better schedule all of the other activity in the runtime.


### Will this change break my flows?

For most flows, this change will not alter their behaviour in any way. We have
always said no assumptions should be made about ordering once a flow branches.

That said, there are bound to be flows out there that have exploited the observed
ordering and make some of these assumptions. So care should be taken when upgrading
if you know your flows make such assumptions.

This is why we're making this change as part of the 1.0 release. We've worked
hard to ensure Node-RED remains backwards compatible between releases, but sometimes
we simply have to make a change that could have an impact. We don't make those
changes lightly and we can only make them as part of a major release.


#### Keeping things synchronous, for now

Given the potential for this change to alter how *some* flows behave, we're
introducing a new setting that will restore the synchronous delivery mode:

```
    runtimeSyncDelivery: true
```

Given the features in the roadmap that will require asynchronous delivery, this
setting is *not* a long term solution. Consider its usage as instantly deprecated.
It is only intended as a stop-gap measure to allow affected flows to be upgraded
to 1.0 before they are updated to handle the new asynchronous mode.
