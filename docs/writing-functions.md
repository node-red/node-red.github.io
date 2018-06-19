---
layout: docs
toc: user-guide-toc.html
title: Writing Functions
---

The Function node allows JavaScript code to be run against the messages that are
passed through it.

The message is passed in as an object called `msg`. By convention it will
have a `msg.payload` property containing the body of the message.

Other nodes may attach their own properties to the message, and they should be
described in their documentation.

 - [Writing a Function](#writing-a-function)
 - [Sending to multiple outputs](#multiple-outputs)
 - [Sending multiple messages](#multiple-messages)
 - [Sending messages asynchronously](#sending-messages-asynchronously)
 - [Logging events](#logging-events)
 - [Handling errors](#handling-errors)
 - [Storing data (context)](#storing-data)
    - [Flow context](#flow-context)
    - [Global context](#global-context)
 - [Adding status](#adding-status)
 - [Loading additional modules](#loading-additional-modules)
 - [API Reference](#api-reference)
    - [Other modules and functions](#other-modules-and-functions)

### Writing a Function

The code entered into the Function node represents the *body* of the function.
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
<code>msg.res</code> properties to be preserved end-to-end. In general, function
nodes <em>should</em> return the message object they were passed having made any
changes to its properties.</div>

#### Multiple Outputs

The function edit dialog allows the number of outputs to be changed. If there
is more than one output, an array of messages can be returned by the function to
send to the outputs.

This makes it easy to write a function that sends the message to different
outputs depending on some condition. For example, this function would send
anything on topic `banana` to the second output rather than the first:

{% highlight javascript %}
if (msg.topic === "banana") {
   return [ null, msg ];
} else {
   return [ msg, null ];
}
{% endhighlight %}

The following example passes the original message as-is on the first output and
a message containing the payload length is passed to the second output:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return [msg, newMsg];
{% endhighlight %}

#### Multiple Messages

A function can return multiple messages on an output by returning an array of
messages within the returned array. When multiple messages are returned for an
output, subsequent nodes will receive the messages one at a time in the order
they were returned.

In the following example, `msg1`, `msg2`, `msg3` will be sent to the first output.
`msg4` will be sent to the second output.

{% highlight javascript %}
var msg1 = { payload:"first out of output 1" };
var msg2 = { payload:"second out of output 1" };
var msg3 = { payload:"third out of output 1" };
var msg4 = { payload:"only message from output 2" };
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

If the function needs to perform an asynchronous action before sending a message
it cannot return the message at the end of the function.

Instead, it must make use of the `node.send()` function, passing in the message(s)
to be sent. For example:

{% highlight javascript %}
doSomeAsyncWork(msg, function(result) {
    node.send({payload:result});
});
return;
{% endhighlight %}

If you do use asynchronous callback code in your functions then you may need to
tidy up any outstanding requests, or close any connections,  whenever the flow gets
re-deployed. You can do this by adding a `close` event handler.

{% highlight javascript %}
node.on('close', function() {
    // tidy up any async code here - shutdown connections and so on.
});
{% endhighlight %}

#### Logging events

If a node needs to log something to the console, it can use one of the follow functions:

{% highlight javascript %}
node.log("Something happened");
node.warn("Something happened you should know about");
node.error("Oh no, something bad happened");
{% endhighlight %}

The `warn` and `error` messages also get sent to the flow editor debug tab.

For finer grained logging, `node.trace()` and `node.debug()` are also available.
If there is no logger configured to capture those levels, they will not be seen.

#### Handling errors

If the function encounters an error that should halt the current flow, it should
return nothing. To trigger a Catch node on the same tab, the function should call
`node.error` with the original message as a second argument:

{% highlight javascript %}
node.error("hit an error", msg);
{% endhighlight %}

#### Storing data ####

Aside from the `msg` object, the function can also store data between invocations
within it's `context` object.

The following example maintains a count of how many times the function has been
run:

{% highlight javascript %}
// initialise the counter to 0 if it doesn't exist already
var count = context.get('count')||0;
count += 1;
// store the value back
context.set('count',count);
// make it part of the outgoing msg object
msg.count = count;
{% endhighlight %}

By default, the context data is *not* persisted across restarts of Node-RED.

<div class="doc-callout"><em>Note</em>: Prior to Node-RED v0.13, the documented
way to use <code>context</code> was to access it directly:
<pre>var count = context.count;</pre>
This method is still supported, but deprecated in favour of the <code>context.get</code>/<code>context.set</code>
functions. This is in anticipation of being able to persist the context data in a future release.
</div>

##### Flow context

Just as the `context` object is local to the node,
there is also a flow-level context that is shared by all nodes, not just Function
nodes, on a given tab. It is accessed via the `flow` object:

{% highlight javascript %}
var count = flow.get('count')||0;
{% endhighlight %}


##### Global context

There is also a global context available that is shared by, and accessible to
all nodes. For example to make the variable foo available globally across the canvas:

{% highlight javascript %}
global.set("foo","bar");  // this is now available to other nodes
{% endhighlight %}

And can then be read using .get

{% highlight javascript %}
var myfoo = global.get("foo");  // this should now be "bar"
{% endhighlight %}

The global context can also be pre-populated with objects when Node-RED starts. This
is defined in the main *settings.js* file under the `functionGlobalContext`
property.

<div class="doc-callout"><em>Note</em>: Prior to Node-RED v0.13, the documented
way to use global context was to access it as a sub-property of <code>context</code>:
<pre>context.global.foo = "bar";
var osModule = context.global.osModule;</pre>
This method is still supported, but deprecated in favour of the <code>global.get</code>/<code>global.set</code>
functions. This is in anticipation of being able to persist the context data in a future release.
</div>

#### Adding Status

The function node can also provide it's own status decoration in the same way
that other nodes can. To set the status, call the `node.status` function.
For example

{% highlight javascript %}
node.status({fill:"red",shape:"ring",text:"disconnected"});
node.status({fill:"green",shape:"dot",text:"connected"});
node.status({text:"Just text status"});
node.status({});   // to clear the status
{% endhighlight %}

For details of the accepted parameters see the
[Node Status documentation](creating-nodes/status)

Any status updates can then also be caught by the Status node.

#### Loading additional modules

Additional node modules cannot be loaded directly within a Function node. They must
be loaded in your *settings.js* file and added to the `functionGlobalContext`
property.

For example, the built-in `os` module can be made available to all functions by
adding the following to your *settings.js* file.

{% highlight javascript %}
functionGlobalContext: {
    osModule:require('os')
}
{% endhighlight %}

at which point, the module can be referenced within a function as
`global.get('osModule')`.

Modules loaded from your settings file must be installed in the same directory as
the settings file. For most users that will be the default user directory - `~/.node-red`:

    cd ~/.node-red
    npm install name_of_3rd_party_module

***

### API Reference

The following objects are available within the Function node.

#### `node`
 * `node.id` : the id of the Function node - *added in 0.19*
 * `node.name` : the name of the Function node - *added in 0.19*
 * `node.log(..)` : [log a message](#logging-events)
 * `node.warn(..)` : [log a warning message](#logging-events)
 * `node.error(..)` : [log an error message](#logging-events)
 * `node.debug(..)` : [log a debug message](#logging-events)
 * `node.trace(..)` : [log a trace message](#logging-events)
 * `node.on(..)` : [register an event handler](#sending-messages-asynchronously)
 * `node.status(..)` : [update the node status](#adding-status)
 * `node.send(..)` : [send a message](#sending-messages-asynchronously)

#### `context`
 * `context.get(..)` : get a node-scoped context property
 * `context.set(..)` : set a node-scoped context property
 * `context.keys(..)` : return a list of all node-scoped context property keys
 * `context.flow` : same as `flow`
 * `context.global` : same as `global`

#### `flow`
 * `flow.get(..)` : get a flow-scoped context property
 * `flow.set(..)` : set a flow-scoped context property
 * `flow.keys(..)` : return a list of all flow-scoped context property keys

#### `global`
 * `global.get(..)` : get a global-scoped context property
 * `global.set(..)` : set a global-scoped context property
 * `global.keys(..)` : return a list of all global-scoped context property keys

#### `RED`
 * `RED.util.cloneMessage(..)` : safely clones a message object so it can be reused  

#### Other modules and functions

The Function node also makes the following modules and functions available:

  * `Buffer` - the Node.js `Buffer` module
  * `console` - the Node.js `console` module (`node.log` is the preferred method of logging)
  * `util` - the Node.js `util` module
  * `setTimeout/clearTimeout` - the javascript timeout functions.
  * `setInterval/clearInterval` - the javascript interval functions.

Note: the function node automatically clears any outstanding timeouts or
interval timers whenever it is stopped or re-deployed.
