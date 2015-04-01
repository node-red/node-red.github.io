---
layout: api
title: POST /nodes
---

Install a new node module

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled
`Content-type`  | `application/json`


### Arguments

The request body must be a JSON string with the following fields:

Field    | Description
---------|-----------------------
`module` | The name of the node module to install

{% highlight json %}
{
  "module": "node-red-node-suncalc"
}
{% endhighlight %}

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | A [Node Module](/docs/api/admin/types.html#node-module) object. See example response body
`400`       | Bad request    | An [Error response](/docs/api/admin/errors.html)
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

