---
layout: docs
toc: api-toc.html
title: POST /flows
---

Set the active flow configuration.

Requires permission: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - if authentication is enabled
`Content-type`             | `application/json`
`Node-RED-API-Version`     | (*Since 0.15.0*) The api version being used. Defaults to `v1` if not set.
`Node-RED-Deployment-Type` | `full`, `nodes`, `flows` or `reload`


The `Node-RED-Deployment-Type` header is used to define what type of deployment
is performed.

 - `full` - all existing nodes are stopped before the new configuration is started.
   This is the default behaviour if the header is not provided.
 - `nodes` - only nodes that have been modified are stopped before the new
   configuration is applied.
 - `flows` - only flows that contain modified nodes are stopped before the new
   configuration is applied.
 - `reload` - the flows are reloaded from storage and all nodes are restarted (since Node-RED 0.12.2)

### Arguments

The format of the request body will depend on the Node-RED API version being used:

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

The `rev` property, if provided, should reflect the revision of flows that was returned by `GET /flows`.

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

### Response

Status Code | Reason              | Response
------------|---------------------|--------------
`200`       | `v2` Success        | The new `rev` for the active flows. See below.
`204`       | `v1` Success        | _none_
`400`       | Invalid API version | An [Error response](/docs/api/admin/errors)
`401`       | Not authorized      | _none_
`409`       | Version mismatch    | An [Error response](/docs/api/admin/errors). See below.

If `v1` of the API is being used, a successful request contains no response body.

If `v2` of the API is being used, the request should include `rev` property that
is set to the latest `rev` value known to the requestor. If this value matches
the `rev` value of the active flows in the runtime, the request will succeed.

If it does not match, this indicates the runtime is using a newer version of flows
and the request is rejected with a `409` status code. This allows the requestor to
resolve any differences and resubmit the request.

If the requestor wishes to force deploy, the `rev` property should be omitted from
the request.

On a successful request, the response provides the new `rev` value:

{% highlight json %}
{
    "rev": "def-456",
}
{% endhighlight %}

*Note*: the `rev` property is a string, but no other assumptions should be made
as to its format.
