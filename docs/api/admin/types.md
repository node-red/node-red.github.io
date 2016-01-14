---
layout: api
title: Types
---

The following types can be used with the API methods.

### Node

A Node represents the configuration of a single node within a flow.

{% highlight json %}
{
  "id": "123",
  "type": "inject",
  "x": 0,
  "y": 0,
  "z": "456",
  "wires": []
}
{% endhighlight %}

Field     | Description
----------|-----------------------
`id`      | The unique id of the node
`type`    | The type of the node
`x`,`y`   | The x/y co-ordinates of the node when the flow is drawn
`z`       | The flow, or subflow, the node is a member of
`wires`    | The wires this nodes outputs are connected to
*         | Other fields as defined by the particular `type`


### Config Node

A Config node represents the configuration of a single config node. It is identical
to a [Node](#node) configuration except it must not have the `x`, `y` or `wires` properties.

### Complete Flow configuration

A Complete Flow configuration represents the entire set of flows active in the
runtime. It is represented as an array of Node objects.

{% highlight json %}
[
  {
    "id": "1234",
    "type": "inject"
  },
  {
    "id": "5678",
    "type": "debug"
  }
]
{% endhighlight %}

### Single Flow configuration

A Single Flow configuration represents what gets presented in the editor as a tab.


{% highlight json %}
{
  "id": "1234",
  "label": "Sheet1",
  "nodes": [],
  "configs": [],
  "subflows": []
}
{% endhighlight %}

Field      | Description
-----------|-----------------------
`id`       | The unique id of the flow
`label`    | A label for the the flow
`nodes`    | An array of the Nodes in the flow
`configs`  | An array of the Configs in the flow
`subflows` | An array of the Subflows in the flow


### Node Module

A Node Module represents the collection of Node Sets provided by an npm package.

{% highlight json %}
{
  "name": "node-module-name",
  "version": "0.0.6",
  "nodes": [ ]
}
{% endhighlight %}

Field     | Description
----------|-----------------------
`name`    | The name of the module - as defined in its `package.json`
`version` | The version of the module - as defined in its `package.json`
`nodes`   | An array of the Node Set objects provided by this module

### Node Set

A Node Set represents the collection of types provided by a single file within
a Node Module. They correspond to the entries in the [`node-red.nodes` property
of the module's `package.json`](/docs/creating-nodes/packaging.html#packagejson).

{% highlight json %}
{
  "id": "node-module-name/node-set-name",
  "name": "node-set-name",
  "types": [ ],
  "enabled": true,
  "module": "node-module-name",
  "version": "0.0.6"
}
{% endhighlight %}

Field    | Description
---------|-----------------------
`id`     | The ID of the set - `module/name`
`name`   | The name of the set - as defined in the module's `package.json`
`types`  | A string array of the node types provided by this set
`enabled`| Whether this set is currently enabled
`module` | The name of the module providing the set. A value of `node-red` indicates the node was loaded from copied in files, rather than an npm module.
