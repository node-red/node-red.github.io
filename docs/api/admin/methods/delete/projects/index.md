---
layout: docs-api
toc: toc-api-admin.html
title: DELETE /projects/:id
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - delete project
---

Delete an individual project.

Deleting an active project is an error.

Requires permission: <code>projects.write</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`id`           | The id of the project

### Response

Status Code | Reason         | Response
------------|----------------|------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors).
`401`       | Not authorized | _none_


