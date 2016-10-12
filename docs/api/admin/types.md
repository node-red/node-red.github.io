---
layout: api
title: Types
---

The following types can be used with the API methods.

Traditionally, a flow configuration has been represented as a flat array of
node objects.

From Node-RED 0.13, an api was added to allow flows (aka tabs) to be maintained
individually. Those apis use a richer format for the flow configuration. We will
be updating the main flow configuration to use this richer format in the future,
but for now the two formats have to co-exist.


### Node

A Node represents the configuration of a single node within a flow.

{% highlight json %}
{
  "id": "123",
  "type": "inject",
  "x": 0,
  "y": 0,
  "z": "456",
  "wires": [ ... ]
}
{% endhighlight %}

Field     | Description
----------|-----------------------
`id`      | The unique id of the node
`type`    | The type of the node
`x`,`y`   | The x/y co-ordinates of the node when the flow is drawn
`z`       | The flow, or subflow, the node is a member of
`wires`   | The wires the node's outputs are connected to
*         | Other fields as defined by the particular `type`

If the node is a config node, then it must not have the `x`, `y` or `wires`  properties.

### Subflow

A Subflow node represents the configuration of a subflow.

{% highlight json %}
{
  "id": "6115be82.9eea4",
  "type": "subflow",
  "name": "Subflow 1",
  "info": "",
  "in": [{
    "x": 60,
    "y": 40,
    "wires": [{
      "id": "1830cc4e.e7cf34"
    }]
  }],
  "out": [{
    "x": 320,
    "y": 40,
    "wires": [{
      "id": "1830cc4e.e7cf34",
      "port": 0
    }]
  }],
  "configs": [ ... ],
  "nodes": [ ... ]
}
{% endhighlight %}

### Complete Flow configuration

A Complete Flow configuration represents the entire set of flows active in the
runtime. It is represented as a flat array of Node objects. This is the main flow format used by the `/flows` api and imported/exported by the editor.

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

*Since 0.15.0*, the `/flows` api supports a new format if the `Node-RED-API-Version`
header is set to `v2`. This format provides the array of nodes as above, and includes
an optional revision identifier for the flows:

{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "id": "1234",
        "type": "inject"
      },
      {
        "id": "5678",
        "type": "debug"
      }
    ]
}
{% endhighlight %}


### Single Flow configuration

A Single Flow configuration represents what gets presented in the editor as a tab.


{% highlight json %}
{
  "id": "1234",
  "label": "Sheet1",
  "nodes": [ ... ],
  "configs": [ ... ],
  "subflows": [ ... ]
}
{% endhighlight %}

Field      | Description
-----------|-----------------------
`id`       | The unique id of the flow
`label`    | A label for the the flow
`nodes`    | An array of the Nodes in the flow
`configs`  | An array of the Configs in the flow
`subflows` | An array of the Subflows in the flow - only used when representing the `global` flow configuration



### Node Module

A Node Module represents the collection of Node Sets provided by an npm package.

{% highlight json %}
{
  "name": "node-module-name",
  "version": "0.0.6",
  "nodes": [ ... ]
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
of the module's `package.json`](/docs/creating-nodes/packaging#packagejson).

{% highlight json %}
{
  "id": "node-module-name/node-set-name",
  "name": "node-set-name",
  "types": [ ... ],
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
