---
layout: docs
toc: user-guide-toc.html
title: Working with context
---

 - [What is context](#what-is-context)
 - [Context scopes](#context-scopes)
 - [Context stores](#context-stores)
 - [Using context in a flow](#using-context-in-a-flow)
 - [Using context in a Function node](#using-context-in-a-function-node)
 - [Using context in a custom node](#using-context-in-a-custom-node)

### What is context?

Node-RED provides a way to store information that can be shared between different
nodes without using the messages that pass through a flow. This is called 'context'.

### Context scopes

The 'scope' of a particular context value determines who it is shared with. There
are three context scope levels:

 - Node - only visible to the node that set the value
 - Flow - visible to all nodes on the same flow (or tab in the editor)
 - Global - visible to all nodes

The choice of scope for any particular value will depend on how it is being used.

If a value only needs to be accessed by a single node, such as a Function node, then
Node context is sufficient.

More often context allows some sort of state to be shared between multiple nodes.
For example, a sensor may publish new values regularly in one flow and you want
to create a separate HTTP triggered flow to return the most recent value. By
storing the sensor reading in context it is then available for the HTTP flow to return.

The Global context can be preconfigured with values using the `functionGlobalContext`
property in the settings file.

<div class="doc-callout"><em>Note</em> : for nodes within a subflow, the 'flow' context
is scoped to the subflow. The nodes cannot access the flow context of the flow
containing the subflow instance node.</div>


### Context stores

By default, context is stored in memory only. This means its contents are cleared
whenever Node-RED restarts. With the 0.19 release, it is possible to configure
Node-RED to save context data so it is available across restarts.

The `contextStorage` property in settings.js can be used to configure how context
data is stored.

For example, to enable file-based storage, the following options can be used:

{% highlight javascript %}
contextStorage: {
   default: {
       module: "file"
   }
}
{% endhighlight %}

Node-RED provides two built-in store modules: `memory` and `file`. It is also
possible to create custom store plugins.

Full details on the built-in modules, and how to create custom modules, is
available on the [api pages](../api/context/).

Stores can provide either synchronous or asynchronous access. Synchronous access
means a call to get data from the store returns immediately with the value. Asynchronous
access means a call to get data must also provide a callback function that is called
once the value is available.

The built-in `memory` and `file` stores both offer synchronous access. This means
existing (pre-0.19) flows can use these stores without any changes.

### Using context in a flow

The easiest way to set a value in context is to use the Change node. For example,
the following Change node rule will store the value of `msg.payload` in `flow` context
under the key of `myData`.

<div style="text-align: center"><img src="/docs/user-guide/images/context_change.png" width="488px"></div>

Various nodes can access context directly. For example, the Inject node can be configured
to inject a context value and the Switch node can route messages based on a value
stored in context.

### Using context in a Function node

The [Writing Functions guide](../writing-functions#storing-data) describes
how to use context in the Function node.

### Using context in a custom node

The [Creating Nodes guide](/docs/creating-nodes/context) describes how to use context in a custom node.
