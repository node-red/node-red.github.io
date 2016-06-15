---
layout: api
title: GET /nodes/:module/:set
---

Get a node module set information

Requires permission: <code>nodes.read</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`module`       | The name of the module
`set`          | The name of the set

### Response

Status Code | Reason         | Response
------------|----------------|------------
`200`       | Success        | A [Node Set](/docs/api/admin/types#node-set) object. See example response body
`401`       | Not authorized | _none_
`404`       | Not found      | _none_

{% highlight json %}
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
{% endhighlight %}  
