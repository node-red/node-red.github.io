---
layout: docs-api
toc: toc-api-admin.html
title: PUT /nodes/:module/:set
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - modify node set
---

Enable/Disable a node set

Requires permission: <code>nodes.write</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled
`Content-type`  | `application/json`


### Arguments

Path Component | Description
---------------|------------
`module`       | The name of the module
`set`          | The name of the set

The request body must be a JSON string with the following fields:

Field     | Description
----------|------------------------
`enabled` | `true` or `false` - whether to enable or disable the module

{% highlight json %}
{
  "enabled": true
}
{% endhighlight %}

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | A [Node Set](/docs/api/admin/types#node-module) object. See example response body
`400`       | Bad request    | An [Error response](/docs/api/admin/errors)
`401`       | Not authorized | _none_
`404`       | Not found      | _none_


{% highlight json %}
{
  "id": "node-red-node-suncalc/suncalc",
  "name": "suncalc",
  "types": [
    "sunrise"
  ],
  "enabled": false,
  "module": "node-red-node-suncalc"
}
{% endhighlight %}
