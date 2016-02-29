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
`module` | Either the name of the node module to install from the npm repository, or a full path to a directory containing the node module. _Note_: this api does not support the full range of module specifiers used by npm such as `.tgz` files or version qualifiers.

{% highlight json %}
{
  "module": "node-red-node-suncalc"
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
