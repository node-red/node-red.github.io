---
layout: api
title: Types
---

The following types can be returned by the API methods.

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

