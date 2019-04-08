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
    - [Get/Set multiple values](#getset-multiple-values)
    - [Asynchronous context access](#asynchronous-context-access)
    - [Multiple context stores](#multiple-context-stores)
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

The function must always return a msg object. Returning a number or string will
result in an error.

The returned message object does not need to be same object as was passed in;
the function can construct a completely new object before returning it. For
example:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return newMsg;
{% endhighlight %}

<div class="doc-callout"><em>Note</em> : constructing a new message object will
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

#### Storing data

Aside from the `msg` object, the function can also store data in the context store.

More information about Context within Node-RED is available [here](user-guide/context).

In the Function node there are three predefined variables that can be used to
access context:

   - `context` - the node's local context
   - `flow` - the flow scope context
   - `global` - the global scope context

The following examples use `flow` context, but apply equally well to `context`
and `global`.

<div class="doc-callout"><em>Note</em> : these predefined variables are a feature
of the Function node. If you are creating a custom node, check the <a href="/docs/creating-nodes/context">Creating Nodes guide</a> for how to access context.</div>

There are two modes for accessing context; either synchronous or asynchronous.
The built-in context stores provide both modes. Some stores may only provide
asynchronous access and will throw an error if they are accessed synchronously.

To get a value from context:

{% highlight javascript %}
var myCount = flow.get("count");
{% endhighlight %}

To set a value:

{% highlight javascript %}
flow.set("count", 123);
{% endhighlight %}

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
return msg;
{% endhighlight %}

##### Get/Set multiple values

Since Node-RED 0.19, it is also possible to get or set multiple values in one go:

{% highlight javascript %}
// Node-RED 0.19 or later
var values = flow.get(["count", "colour", "temperature"]);
// values[0] is the 'count' value
// values[1] is the 'colour' value
// values[2] is the 'temperature' value
{% endhighlight %}

{% highlight javascript %}
// Node-RED 0.19 or later
flow.set(["count", "colour", "temperature"], [123, "red", "12.5"]);
{% endhighlight %}

In this case, any missing values are set to `null`.


##### Asynchronous context access

If the context store requires asynchronous access, the `get` and `set` functions
require an extra callback parameter.

{% highlight javascript %}
// Get single value
flow.get("count", function(err, myCount) { ... });

// Get multiple values
flow.get(["count", "colour"], function(err, count, colour) { ... })

// Set single value
flow.set("count", 123, function(err) { ... })

// Set multiple values
flow.set(["count", "colour", [123, "red"], function(err) { ... })
{% endhighlight %}

The first argument passes to the callback, `err`, is only set if an error
occurred when accessing context.

The asynchronous version of the count example becomes:

{% highlight javascript %}
context.get('count', function(err, count) {
    if (err) {
        node.error(err, msg);
    } else {
        // initialise the counter to 0 if it doesn't exist already
        count = count || 0;
        count += 1;
        // store the value back
        context.set('count',count, function(err) {
            if (err) {
                node.error(err, msg);
            } else {
                // make it part of the outgoing msg object
                msg.count = count;
                // send the message
                node.send(msg);
            }
        });
    }
});
{% endhighlight %}

##### Multiple context stores

With 0.19 it is possible to configure multiple context stores. For example, both
a `memory` and `file` based store could be used.

The `get`/`set` context functions accept an optional parameter to identify the store
to use.

{% highlight javascript %}
// Get value - sync
var myCount = flow.get("count", storeName);

// Get value - async
flow.get("count", storeName, function(err, myCount) { ... });

// Set value - sync
flow.set("count", 123, storeName);

// Set value - async
flow.set("count", 123, storeName, function(err) { ... })
{% endhighlight %}


##### Global context

The global context can be pre-populated with objects when Node-RED starts. This
is defined in the main *settings.js* file under the `functionGlobalContext`
property.

This can be used to [load additional modules](#loading-additional-modules) within
the Function node.

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
