---
layout: docs
toc: api-toc.html
title: GET /flows
---

Get the active flow configuration.

Requires permission: <code>flows.read</code>

### Headers

Header                 | Value
-----------------------|-------
`Authorization`        | `Bearer [token]` - if authentication is enabled
`Node-RED-API-Version` | (*Since 0.15.0*) The api version being used. Defaults to `v1` if not set.

### Response

Status Code | Reason              | Response
------------|---------------------|--------------
`200`       | Success             | `v1` An array of node objects <br/> `v2` A flow response object that includes the current revision identifier of the flows
`400`       | Invalid API version | An [Error response](/docs/api/admin/errors)
`401`       | Not authorized      | _none_


#### `v1` - array of node objects
{% highlight json %}
[
  {
    "type": "tab",
    "id": "396c2376.c693dc",
    "label": "Sheet 1"
  }
]
{% endhighlight %}

#### `v2` - flow response object
{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "type": "tab",
        "id": "396c2376.c693dc",
        "label": "Sheet 1"
      }
    ]
}
{% endhighlight %}
