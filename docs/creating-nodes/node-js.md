---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: JavaScript file
slug: .js
---

The node `.js` file defines the runtime behaviour of the node.

 - [Node constructor](#node-constructor)
 - [Receiving messages](#receiving-messages)
 - [Sending messages](#sending-messages)
   - [Multiple outputs](#multiple-outputs)
   - [Multiple messages](#multiple-messages)
 - [Closing the node](#closing-the-node)
   - [Timeout behaviour](#timeout-behaviour)
 - [Logging events](#logging-events)
   - [Handling errors](#handling-errors)
 - [Setting status](#setting-status)
 - [Custom node settings](#custom-node-settings)

### Node constructor

Nodes are defined by a constructor function that can be used to create new instances
of the node. The function gets registered with the runtime so it can be called
when nodes of the corresponding type are deployed in a flow.

The function is passed an object containing the properties set in the flow editor.

The first thing it must do is call the `RED.nodes.createNode` function to initialise
the features shared by all nodes. After that, the node-specific code lives.

{% highlight javascript %}
function SampleNode(config) {
    RED.nodes.createNode(this,config);
    // node-specific code goes here

}

RED.nodes.registerType("sample",SampleNode);
{% endhighlight %}

### Receiving messages

Nodes register a listener on the `input` event to receive messages from the
up-stream nodes in a flow.

With Node-RED 1.0, a new style of listener was introduced to allow the node
to notify the runtime when it has finished handling a message. This added
two new parameters to the listener function. Some care is needed to ensure
the node can still be installed in Node-RED 0.x which does not use this new
style of listener.

{% highlight javascript %}
this.on('input', function(msg, send, done) {
    // do something with 'msg'

    // Once finished, call 'done'.
    // This call is wrapped in a check that 'done' exists
    // so the node will work in earlier versions of Node-RED (<1.0)
    if (done) {
        done();
    }
});
{% endhighlight %}

#### Handling errors

If the node encounters an error whilst handling the message, it should pass
the details of the error to the `done` function.

This will trigger any Catch nodes present on the same tab, allowing the user to
build flows to handle the error.

Again, some care is needed in the case the node is installed in Node-RED 0.x which
does not provide the `done` function. In that case, it should use `node.error`:


{% highlight javascript %}
let node = this;
this.on('input', function(msg, send, done) {
    // do something with 'msg'

    // If an error is hit, report it to the runtime
    if (err) {
        if (done) {
            // Node-RED 1.0 compatible
            done(err);
        } else {
            // Node-RED 0.x compatible
            node.error(err, msg);
        }
    }
});
{% endhighlight %}


### Sending messages

If the node sits at the start of the flow and produces messages in response to
external events, it should use the `send` function on the Node object:

{% highlight javascript %}
var msg = { payload:"hi" }
this.send(msg);
{% endhighlight %}

If the node wants to send from inside the `input` event listener, in response to
receiving a message, it should use the `send` function that is passed to the listener
function:

{% highlight javascript %}
let node = this;
this.on('input', function(msg, send, done) {
    // For maximum backwards compatibility, check that send exists.
    // If this node is installed in Node-RED 0.x, it will need to
    // fallback to using `node.send`
    send = send || function() { node.send.apply(node,arguments) }

    msg.payload = "hi";
    send(msg);

    if (done) {
        done();
    }
});
{% endhighlight %}


If `msg` is null, no message is sent.

If the node is sending a message in response to having received one, it should reuse
the received message rather than create a new message object. This ensures existing
properties on the message are preserved for the rest of the flow.

#### Multiple outputs

If the node has more than one output, an array of messages can be passed to `send`, with
each one being sent to the corresponding output.

{% highlight javascript %}
this.send([ msg1 , msg2 ]);
{% endhighlight %}

#### Multiple messages

It is possible to send multiple messages to a particular output by passing an array
of messages within this array:

{% highlight javascript %}
this.send([ [msgA1 , msgA2 , msgA3] , msg2 ]);
{% endhighlight %}

### Closing the node

Whenever a new flow is deployed, the existing nodes are deleted. If any of them
need to tidy up state when this happens, such as disconnecting
from a remote system, they should register a listener on the `close` event.

{% highlight javascript %}
this.on('close', function() {
    // tidy up any state
});
{% endhighlight %}

If the node needs to do any asynchronous work to complete the tidy up, the
registered listener should accept an argument which is a function to be called
when all the work is complete.

{% highlight javascript %}
this.on('close', function(done) {
    doSomethingWithACallback(function() {
        done();
    });
});
{% endhighlight %}

*Since Node-RED 0.17*

If the registered listener accepts two arguments, the first will be a boolean
flag that indicates whether the node is being closed because it has been removed
entirely, or that it is just being restarted.

{% highlight javascript %}
this.on('close', function(removed, done) {
    if (removed) {
        // This node has been deleted
    } else {
        // This node is being restarted
    }
    done();
});
{% endhighlight %}

#### Timeout behaviour

*Since Node-RED 0.17*

Prior to Node-RED 0.17, the runtime would wait indefinitely for the `done` function
to be called. This would cause the runtime to hang if a node failed to call it.

In 0.17 and later, the runtime will timeout the node if it takes longer than 15
seconds. An error will be logged and the runtime will continue to operate.




### Logging events

If a node needs to log something to the console, it can use one of the follow functions:

{% highlight javascript %}
this.log("Something happened");
this.warn("Something happened you should know about");
this.error("Oh no, something bad happened");

// Since Node-RED 0.17
this.trace("Log some internal detail not needed for normal operation");
this.debug("Log something more details for debugging the node's behaviour");


{% endhighlight %}

The `warn` and `error` messages also get sent to the flow editor debug tab.  

### Setting status

Whilst running, a node is able to share status information with the editor UI.
This is done by calling the `status` function:

{% highlight javascript %}
this.status({fill:"red",shape:"ring",text:"disconnected"});
{% endhighlight %}

The details of the status api can be found [here](status).

### Custom node settings

A node may want to expose configuration options in a user's `settings.js` file.

The name of any setting must follow the following requirements:

 - the name must be prefixed with the corresponding node type.
 - the setting must use camel-case - see below for more information.
 - the node must not require the user to have set it - it should have a sensible
   default.

For example, if the node type `sample-node` wanted to expose a setting called
`colour`, the setting name should be `sampleNodeColour`.

Within the runtime, the node can then reference the setting as
`RED.setting.sampleNodeColour`.


#### Exposing settings to the editor

*Since Node-RED 0.17*

In some circumstances, a node may want to expose the value of the setting to the
editor. If so, the node must register the setting as part of its call to `registerType`:

{% highlight javascript %}
RED.nodes.registerType("sample",SampleNode, {
    settings: {
        sampleNodeColour: {
            value: "red",
            exportable: true
        }
    }
});
{% endhighlight %}

 - `value` field specifies the default value the setting should take.
 - `exportable` tells the runtime to make the setting available to the editor.

As with the runtime, the node can then reference the setting as
`RED.settings.sampleNodeColour` within the editor.

If a node attempts to register a setting that does not meet the naming requirements
an error will be logged.
