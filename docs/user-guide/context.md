---
layout: docs-user-guide
toc: toc-user-guide.html
title: Working with context
slug: context
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jLI0DcXMQOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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

<div class="doc-callout"><em>Note</em> : for nodes in a subflow, the <code>flow</code>
context is shared by those nodes and not the flow the subflow is on.
From Node-RED 0.20, the nodes inside a subflow can access the context of the
parent flow by prepending <code>$parent.</code> to the context key. For example:
<pre>var colour = flow.get("$parent.colour");</pre></div>


### Context stores

By default, context is stored in memory only. This means its contents are cleared
whenever Node-RED restarts. With the 0.19 release, it is possible to configure
Node-RED to save context data so it is available across restarts.

The `contextStorage` property in `settings.js` can be used to configure how context
data is stored.

Node-RED provides two built-in modules for this: `memory` and `localfilesystem`.
It is also possible to create custom store plugins to save the data elsewhere.

#### Saving context data to the file-system

To enable file-based storage, the following option can be used:

```javascript
contextStorage: {
   default: {
       module: "localfilesystem"
   }
}
```

This sets the default context store to be an instance of the `localfilesystem`
plugin, with all of its default settings. That means:

 - it will store the context data in files under `~/.node-red/context/`
 - it caches the values in memory and only writes them out to the file-system
   every 30 seconds.

<div class="doc-callout"><em>Note</em> : Depending on when you installed Node-RED,
your <code>settings.js</code> file may not have an example entry for <code>contextStorage</code>.
If that is the case, you can copy the example above and add it yourself.</div>

#### Using multiple context stores

It is possible to configure more than one store so that some values are saved to
the local file-system and some are only held in memory.

For example, to configure the default store to be in-memory only, and a second
store for the file-system, the following options can be used:

```javascript
contextStorage: {
   default: "memoryOnly",
   memoryOnly: { module: 'memory' },
   file: { module: 'localfilesystem' }
}
```

In this example, the `default` property tells Node-RED which store to use if a
request to access context doesn't specify a store.

<div class="doc-callout"><em>Note</em> : if you choose to configure multiple
<code>localfilesystem</code> stores, you <em>must</em> set their <code>dir</code>
option so they use different directories to store data. Details on how to configure
the store is available <a href="/docs/api/context/store/localfilesystem#options">here</a></div>

Full details on the built-in modules, what configuration options they provide and
how to create custom modules, are available on the [api pages](../api/context/).

### Using context in a flow

The easiest way to set a value in context is to use the Change node. For example,
the following Change node rule will store the value of `msg.payload` in `flow` context
under the key of `myData`.

<div style="text-align: center"><img src="/docs/user-guide/images/context_change.png" width="488px"></div>

Various nodes can access context directly. For example, the Inject node can be configured
to inject a context value and the Switch node can route messages based on a value
stored in context.

If you have multiple context stores configured, the UI will allow you to pick
which store a value should be stored in.

<div style="text-align: center"><img src="/docs/user-guide/images/context_change_multiple_stores.png" width="471px"></div>


### Using context in a Function node

The [Writing Functions guide](../writing-functions#storing-data) describes
how to use context in the Function node.

### Using context in a custom node

The [Creating Nodes guide](/docs/creating-nodes/context) describes how to use context in a custom node.

### Deleting context from the file store

Context can be permenantly deleted by using a Change node set to delete.

<div style="text-align: center"><img src="/docs/user-guide/images/context_delete.png" width="488px"></div>
