---
layout: docs-api
toc: toc-api-admin.html
title: GET /flows/state
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - get flows state
---

Get the current runtime state of flows. Note that runtime state of flows is available only if
`runtimeState` value is set to `enabled: true` in the `settings.js` file.

### Headers

Header | Value
-------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | See example response body
`401`       | Not authorized | _none_

{% highlight json %}
{
    "state": "stop"
}
{% endhighlight %}

The response object contains the following fields:

Field          | Description
---------------|------------
`state`        | runtime state of the flows. Can be either `start` or `stop`