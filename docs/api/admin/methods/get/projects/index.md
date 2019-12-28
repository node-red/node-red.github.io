---
layout: docs-api
toc: toc-api-admin.html
title: GET /projects
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - get projects
---

Get list of projects.

Requires permission: <code>projects.read</code>

### Headers

Header                 | Value
-----------------------|-------
`Authorization`        | `Bearer [token]` - if authentication is enabled

### Response

Status Code | Reason              | Response
------------|---------------------|--------------
`200`       | Success             | An object with array of project names and active project name
`400`        | Runtime error       | _none_
`401`       | Not authorized      | _none_


{% highlight json %}
{
  "projects": ["PJ00", "PJ01"],
  "active": "PJ01"
}
{% endhighlight %}
