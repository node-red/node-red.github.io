---
layout: docs-api
toc: toc-api-admin.html
title: POST /projects
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - add project
---

Add a new project.  The created project becomes active one.

Requires permission: <code>projects.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - if authentication is enabled
`Content-type`             | `application/json`

### Arguments

The request body must be a single project configuration object.

{% highlight json %}
{
  "name": "PJ00",
  "summary": "Summary of PJ00",
  "path": "path/to/project",
  "files": {
    flow: "flow.json"
  }
  "credentialSecret": false,
  "git": {
    "remotes": {
      "origin": {
        "username": "user",
        "password": "pass"
      }
    }
  }
}
{% endhighlight %}

The configuration object must, at a minimum, include the `name`, `files`, and `path` property. `summary` and `credentialSecret` specify summary text and credential secret string (or `false` if encryption disabled).  If git service is used as backend of the project, `git`property represents git remote configuration information.

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors)

Returns the configuration object of the project.


