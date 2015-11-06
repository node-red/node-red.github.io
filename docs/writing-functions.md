---
layout: default
title: Writing Functions
---

The Function node allows arbitrary code to be run against the messages that are
passed in, and then return zero or more messages to continue the flow.

The message is passed in as a JSON object called `msg`. By convention it will
have a `msg.payload` property containing the body of the message. Some nodes
also attach a `msg.topic` property - a hangover from Node-RED's MQTT origins.

Other nodes may attach their own properties to the message, and they should be
described in their documentation.

### Writing a Function

The code entered into the Function node represents the *body* of the function.
When a message arrives, the code is wrapped into a full function declaration and
then run within a secure sandbox.

The most simple function simply returns the message exactly as-is:

{% highlight javascript %}
return msg;
{% endhighlight %}

If the function returns `null`, then no message is passed on and the flow ends.

The returned message object does not need to be same object as was passed in;
the function can construct a completely new object before returning it. For
example:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return newMsg;
{% endhighlight %}

<div class="doc-callout"><em>Note</em>: constructing a new message object will
lose any message properties of the received message. This will break some flows,
for example the HTTP In/Response flow requires the <code>msg.req</code> and
<code>msg.res</code> properties to be preserved end-to-end.</div>



#### Multiple Outputs ####

The function edit dialog allows the number of outputs to be defined. If there
is more than one output, an array of objects should be returned. Each element
of the array maps to the corresponding output.

This makes it easy to write a function that sends the message to different
outputs depending on some condition. For example, this function would send
anything on topic `banana` to the second output rather than the first:

{% highlight javascript %}
if (msg.topic == "banana") {
   return [ null, msg ];
} else {
   return [ msg, null ];
}
{% endhighlight %}


Combining with the earlier example, the following example passes the original
message as-is on the first output, and a message containing the payload length
on the second output:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return [msg, newMsg];
{% endhighlight %}

#### Multiple Messages ####

A function can return multiple messages on an output by returning an array of
objects within the returned array. When multiple messages are returned for an
output, subsequent nodes will receive the messages one at a time, in the order
they were returned. In the following example, `msg1`, `msg2`, `msg3` will be
sent sequentially to the first output. `msg4` will be sent to the second output.

{% highlight javascript %}
return [ [ msg1, msg2, msg3 ], msg4 ];
{% endhighlight %}

The following example splits the received payload into individual words and
returns a message for each of the words.

{% highlight javascript %}
var outputMsgs = [];
var words = msg.payload.split(" ");
for (var w in words) {
    outputMsgs.push({payload:words[w]});
}
return [ outputMsgs ];
{% endhighlight %}

#### Sending messages asynchronously

If the function needs to perform an asynchronous action before sending a message,
it cannot return the message at the end of the function.

Instead, it can make use of the `node.send()` function, passing in the message(s)
to be sent. For example:

{% highlight javascript %}
doSomeAsyncWork(msg, function(result) {
    node.send({payload:result});
});
return;
{% endhighlight %}

#### Logging events

If a node needs to log something to the console, it can use one of the follow functions:

{% highlight javascript %}
node.log("Something happened");
node.warn("Something happened you should know about");
node.error("Oh no, something bad happened");
{% endhighlight %}

The `warn` and `error` messages also get sent to the flow editor debug tab.

#### Handling errors

If the function encounters an error that should halt the current flow, it should
return nothing. To trigger a Catch node on the same tab, the function should call
`node.error` with the original message as a second argument:

{% highlight javascript %}
node.error("hit an error", msg);
{% endhighlight %}

#### Context ####

Aside from the `msg` object, the function also has access to a `context` object.
This can be used to hold data between invocations of the specific function.

The following example maintains a count of how many times the function has been
run:

{% highlight javascript %}
// initialise the counter to 0 if it doesn't exist already
context.count = context.count || 0;
context.count += 1;
// make it part of the outgoing msg object
msg.count = context.count;
{% endhighlight %}

The context object is *not* persisted across restarts of Node-RED.

#### Global Context ####

There is also a global context available that is shared by, and accessible to
all functions. For example to make the variable foo available globally across the canvas:

{% highlight javascript %}
context.global.foo = "bar";   // this is now available to other function blocks.
{% endhighlight %}

The global context can also be pre-populated with objects when Node-RED starts. This
is defined in the main *settings.js* file under the *functionGlobalContext*
property.

For example, the built-in `os` module can be made available to, all functions:

{% highlight javascript %}
functionGlobalContext: {
    osModule:require('os')
}
{% endhighlight %}

at which point, the module can be referenced within a function as
`context.global.osModule`.

#### Adding Status ####

The function node can also provide it's own status decoration in the same way
that other nodes can. To set the status, call the `node.status` function.
For example

{% highlight javascript %}
node.status({fill:"red",shape:"ring",text:"disconnected"});

node.status({fill:"green",shape:"dot",text:"connected"});

node.status(text:"Just text status");

node.status();   // to clear the status
}
{% endhighlight %}

For details of the accepted parameters see the
[Node Status documentation](creating-nodes/status.html)

Any status updates can then also be caught by the Status node (available in
Node-RED v0.12 + ).


#### Other objects ####

The Function node also makes the following object available:

* `console` - useful for making calls to `console.log` whilst debugging, although
  `node.log` is the preferred method of logging
* `util` - the Node.js `util` module
* `Buffer` - the Node.js `Buffer` module
