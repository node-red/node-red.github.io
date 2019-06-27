---
layout: docs-api
toc: toc-api-admin.html
title: GET /nodes
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - get nodes
---

Get a list of the installed nodes

Requires permission: <code>nodes.read</code>

### Headers

Header          | Value
----------------|-------
`Accept`        | `application/json` or `text/html` - see response section
`Authorization` | `Bearer [token]` - if authentication is enabled

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | Depends on `Accept` header. See below for details.
`401`       | Not authorized | _none_


#### Accept: application/json

Returns an array of [Node Set](/docs/api/admin/types#node-set) objects. For
example:

{% highlight json %}
[
  {
    "id": "node-red/sentiment",
    "name": "sentiment",
    "types": [
      "sentiment"
    ],
    "enabled": true,
    "module": "node-red"
    "version": "0.10.6"
  }
]
{% endhighlight %}

#### Accept: text/html

This returns the [HTML content](/docs/creating-nodes/node-html) for
all of the installed nodes as a single response.
