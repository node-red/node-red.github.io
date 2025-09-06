---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Node context
slug: context
---

A node can store data within its context object.

For more information about context, read the [Working with Context guide](../user-guide/context).

There are three scopes of context available to a node:

- Node - only visible to the node that set the value
- Flow - visible to all nodes on the same flow (or tab in the editor), visible to all nodes of an instance of a subflow
- Global - visible to all nodes

Unlike the Function node which provides predefined variables to
access each of these contexts, a custom node must access these
contexts for itself:

{% highlight javascript %}
// Access the node's context object
var nodeContext = this.context();

var flowContext = this.context().flow;

var globalContext = this.context().global;
{% endhighlight %}

Each of these context objects has the same `get`/`set` functions described
in the [Writing Functions guide](/docs/writing-functions#storing-data).

Note: Configuration nodes that are used by and shared by other nodes are by default global, unless otherwise
specified by the user of the node. As such it cannot be assumed that they have access to a Flow context.
