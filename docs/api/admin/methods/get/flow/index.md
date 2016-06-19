---
layout: api
title: GET /flow/:id
---

Get an individual flow configuration. A flow is represented as a tab within the
editor.

Requires permission: <code>flows.read</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`id`           | The id of the flow.

If `id` is set to `global`, the global configuration nodes and subflow definitions
are returned.

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | A flow object. See example response body
`401`       | Not authorized | _none_
`404`       | Not found      | _none_

{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ],
  "subflows": [ ]
}
{% endhighlight %}
