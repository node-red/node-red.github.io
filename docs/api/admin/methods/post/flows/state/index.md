---
layout: docs-api
toc: toc-api-admin.html
title: POST /flows/state
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - set flows state
---

Set the runtime state of flows. Note that runtime state of flows is available only if
`runtimeState` value is set to `enabled: true` in the `settings.js` file.

Requires permission: <code>flows.write</code>

### Headers

Header | Value
-------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled


### Arguments

The request body must be a URL-Encoded parameter with the following field:


Field        | Description
-------------|------------------------
`state`      | Required runtime state of the flow. Can be either `start` or `stop` 

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