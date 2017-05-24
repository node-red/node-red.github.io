---
layout: docs
toc: creating-nodes-toc.html
title: Node context
---

A node can store data within its context object. This context object is reset
whenever the node is redeployed and when Node-RED is restarted.

{% highlight javascript %}
// Access the node's context object
var context = this.context();

var count = context.get('count') || 0;
count += 1;
context.set('count',count);

{% endhighlight %}

##### Flow context

The flow-level context is shared by all nodes on a given tab.

{% highlight javascript %}
var flowContext = this.context().flow;
var count = flowContext.get('count')||0;
{% endhighlight %}

##### Global context

The global context is shared by, and accessible to all nodes. For example to
make the variable `foo` available globally:

{% highlight javascript %}
var globalContext = this.context().global;
globalContext.set("foo","bar");  // this is now available to other nodes
{% endhighlight %}

##### Accessing context in a Function node

In the Function node, the `flow` and `global` context objects are made available
as top-level objects. See [this section](/docs/writing-functions#storing-data)
for more information.
