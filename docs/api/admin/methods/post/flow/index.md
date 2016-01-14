---
layout: api
title: POST /flow
---

Add a flow to the active configuration. A flow is represented as a tab within the
editor.

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - if authentication is enabled
`Content-type`             | `application/json`

### Arguments

The request body must be a single flow configuration object.

{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ]
}
{% endhighlight %}

The configuration object must, at a minimum, include the `nodes` property.

The runtime will assign a new id for the flow. If the provided flow configuration
object includes an `id` field it will be replaced and the `z` property of all
nodes updated to match.

All of the nodes in the flow must have unique `id` properties. The request will
rejected if any of the `id`s are already in use.

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors.html)
`401`       | Not authorized | _none_

Returns the `id` of the flow.

{% highlight json %}
{"id":"5a04dce3.a5fb24"}
{% endhighlight %}
