---
layout: api
title: PUT /nodes/:module
---

Enable/Disable a node module

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled
`Content-type`  | `application/json`


### Arguments

Path Component | Description
---------------|------------
`module`       | The name of the module

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
`200`       | Success        | A [Node Module](/docs/api/admin/types#node-module) object. See example response body
`400`       | Bad request    | An [Error response](/docs/api/admin/errors)
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
      "loaded": true,
      "module": "node-red-node-suncalc"
    }
  ]
}
{% endhighlight %}
