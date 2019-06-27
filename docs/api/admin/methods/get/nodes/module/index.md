---
layout: docs-api
toc: toc-api-admin.html
title: GET /nodes/:module
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - get module info
---

Get a node module's information.

Requires permission: <code>nodes.read</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`module`       | The name of the module

### Response

Status Code | Reason         | Response
------------|----------------|------------
`200`       | Success        | A [Node Module](/docs/api/admin/types#node-module) object. See example response body
`400`       | Bad request    | An [Error response](/docs/api/admin/errors).
`401`       | Not authorized | _none_
`404`       | Not found      | _none_


{% highlight json %}
{
  "name": "node-red-node-suncalc",
  "version": "0.0.6",
  "nodes": [
    {
      "id": "node-red-node-suncalc/suncalc",
      "name": "suncalc",
      "types": [
        "sunrise"
      ],
      "enabled": true,
      "module": "node-red-node-suncalc",
      "version": "0.0.6"
    }
  ]
}
{% endhighlight %}
