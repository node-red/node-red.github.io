---
layout: docs
toc: creating-nodes-toc.html
title: Node context
---

A node can store data within its context object.

For more information about context, read the [Working with Context guide](../user-guide/context).

There are three scopes of context available to a node:

- Node - only visible to the node that set the value
- Flow - visible to all nodes on the same flow (or tab in the editor)
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
