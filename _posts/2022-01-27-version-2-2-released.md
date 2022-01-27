---
layout: blog
title: Version 2.2 released
author: nick
---

Node-RED 2.2 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

The [Change Log](https://github.com/node-red/node-red/blob/3a69af9034a6f3a59f35c17aa16e018807a38e93/CHANGELOG.md) has the full list of changes in this release, but here are the highlights.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/vAS3gK2Wans" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

- [Highlights](#highlights)
  - [Search History](#search-history)
  - [Remembering zoom/position](#remembering-zoom-position)
  - [Aligning nodes](#aligning-nodes)
  - [Detaching nodes](#detaching-nodes)
  - [Selecting multiple wires](#selecting-multiple-wires)
  - [Slicing wires](#slicing-wires)
  - [Subflow Output labels](#subflow-output-labels)
  - [Predefined Environment Variables](#predefined-environment-variables)
  - [Node Paths](#node-paths)
- [Node Updates](#node-updates)
- [What's next?](#whats-next)

## Highlights


### Search History

The main search dialog now keeps a history of your searches. This makes it easy
to repeatedly search for the same thing.

![](/blog/content/images/2022/01/search-history.png)

### Remembering zoom/position

Under the View section of the main settings dialog, there are a pair of options
to get the editor to remember the zoom level of the workspace, as well as the
scroll position of individual tabs.

This is helpful if you prefer to have the workspace zoomed in - you don't have
to reset it every time you reload the editor.

### Aligning nodes

With snap-to-grid enabled, nodes with hidden labels (for example, link nodes) can
now be aligned on either their left or right edge. This will make it easier to
get everything to line up in the workspace

![](/blog/content/images/2022/01/align-nodes.png)

### Detaching nodes

You can now delete a node from the middle of a flow and have the wiring automatically
repair itself in the background.

![](/blog/content/images/2022/01/delete-reconnect.gif)

This is done by holding the Ctrl (or Cmd) key when you press delete.

You can also detach a node from the flow *without* deleting it:

![](/blog/content/images/2022/01/detach-node.gif)

We haven't assigned a default shortcut for that, but you can assign one yourself
in the Keyboard pane of the Settings dialog. The action is called `core:detach-selected-nodes`.

### Selecting multiple wires

You can also select multiple wires by ctrl-clicking on them.

When you select multiple nodes, we also highlight any wires between them. This can make it easier to follow a flow once you have selected it.

![](/blog/content/images/2022/01/select-wires.png)


### Slicing wires

We've added the ability to remove wires by slicing through them. You do this by holding the ctrl (or cmd) key, then dragging the mouse with the right-hand button pressed:

![](/blog/content/images/2022/01/slice-wires.gif)

### Subflow Output labels

If you have set output labels for a subflow template (via the Appearance tab of its
edit dialog), the editor will now display those labels whilst you are editing
the subflow template.

![](/blog/content/images/2022/01/subflow-labels.png)

### Predefined Environment Variables

We have added a number of predefined Environment Variables that provide access to
information about the node, group and flow at the point they are evaluated.

 - `NR_NODE_ID` - the ID of the node
 - `NR_NODE_NAME` - the Name of the node
 - `NR_NODE_PATH` - the Path of the node - this is a new concept that we'll explain below.
 - `NR_GROUP_ID` - the ID of the containing group
 - `NR_GROUP_NAME` - the Name of the containing group
 - `NR_FLOW_ID` - the ID of the flow the node is on
 - `NR_FLOW_NAME` - the Name of the flow the node is on

The guide for using Environment Variables in your flow is available [here](https://nodered.org/docs/user-guide/environment-variables).

For example, in a Function node, you can do:

```
const functionName = env.get("NR_NODE_NAME")
const flowName = env.get("NR_FLOW_NAME")
msg.payload = `I was sent by Function '${functionName}', on flow '${flowName}'`
return msg
```

### Node Paths

This is a new internal property of Nodes we've added that helps identify where
exactly any node is within the overall flows.

The following may sound a bit abstract, and it's something most users can skip over.
But it can be useful when creating your own subflow modules with custom logging
messages inside.

If a `NodeA` is on `Flow1`, it will have a `path` of `Flow1/NodeA`.

That isn't very interesting, but it gets more interesting when dealing with subflows
and, in particular, nested subflows.

When we create an instance of a subflow, all of the nodes in the subflow are given
randonly generated ids. If that node logs an error, you see the generated ID, not the
'true' id as appears in the editor. It gets harder when you have nested subflows
because you need to be able to identify which instance of the node, in which instance
of the subflow to go looking for.

The `path` property can solve that by providing the ids of the top-level flow and
each subflow instance to identify exactly where the node is.


This property is exposed in the following ways:
 - For node authors, it is available as `this._path` on the node object.
 - Inside the Function node, it is exposed as `node.path`.
 - It is also available as the environment variable `NR_NODE_PATH` when evaluated
   by a node.


## Node Updates

 - The JSON node will now attempt to parse Buffer objects if they contain a valid string
 - The TCP Client nodes support TLS connections
 - The WebSocket client node now lets you specify a sub-protocol to connect with

## What's next?

Next on the [release plan](/about/releases/) is Node-RED 3.0, scheduled for the end of April.

This coincides with Node.js 12 reaching its end of life.

As ever, if there are any particular features you're interested in, now is a great time to jump into the [forum](https://discourse.nodered.org) to share your feedback.
