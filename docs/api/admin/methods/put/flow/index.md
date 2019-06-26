---
layout: docs-api
toc: toc-api-admin.html
title: PUT /flow/:id
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - update flow
---

Update a flow in the active configuration. A flow is represented as a tab within the
editor.

All nodes in the existing flow are stopped before the new flow configuration is started.

Requires permission: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - if authentication is enabled
`Content-type`             | `application/json`

### Arguments

Path Component | Description
---------------|------------
`id`           | The id of the flow to update, or `global`

The request body must be a single flow configuration object.

For a normal flow:
{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ]
}
{% endhighlight %}

For the global flow:
{% highlight json %}
{
  "id": "global",
  "configs": [ ],
  "subflows": [ ]
}
{% endhighlight %}



### Response

Status Code | Reason         | Response
------------|----------------|--------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors)
`401`       | Not authorized | _none_

Returns the `id` of the flow.

{% highlight json %}
{"id":"5a04dce3.a5fb24"}
{% endhighlight %}
