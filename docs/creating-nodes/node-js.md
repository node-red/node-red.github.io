---
layout: default
title: JavaScript file
---

The node `.js` file defines the runtime behaviour of the node.

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

{% highlight javascript %}
this.on('input', function(msg) {
    // do something with 'msg'
});
{% endhighlight %}

### Sending messages

Nodes can send messages to the down-stream nodes in a flow using the `send` function:

{% highlight javascript %}
var msg = { payload:"hi" }
this.send(msg);
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

### Logging events

If a node needs to log something to the console, it can use one of the follow functions:

{% highlight javascript %}
this.log("Something happened");
this.warn("Something happened you should know about");
this.error("Oh no, something bad happened");
{% endhighlight %}

The `warn` and `error` messages also get sent to the flow editor debug tab.  

#### Handling errors

If the node encounters an error that should halt the current flow, it should log
the event with the `this.error` function.

If the error is one that a user of the node may want to handle for themselves,
the function should be called with the original message (or an empty message if
this is an Input node) as the second argument:

{% highlight javascript %}
node.error("hit an error", msg);
{% endhighlight %}

This will trigger any Catch nodes present on the same tab.

### Setting status

Whilst running, a node is able to share status information with the editor UI.
This is done by calling the `status` function:

{% highlight javascript %}
this.status({fill:"red",shape:"ring",text:"disconnected"});
{% endhighlight %}

The details of the status api can be found [here](status.html).
