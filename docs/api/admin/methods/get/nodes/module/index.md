---
layout: api
title: GET /nodes/:module
---

Get a node module's information.

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
`200`       | Success        | A [Node Module](/docs/api/admin/types.html#node-module) object. See example response body
`400`       | Bad request    | An [Error response](/docs/api/admin/errors.html).
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
