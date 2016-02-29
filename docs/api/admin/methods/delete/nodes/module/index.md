---
layout: api
title: DELETE /nodes/:module
---

Remove a node module

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`module`       | The name of the module

### Response

Status Code | Reason         | Response
------------|----------------|------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors).
`401`       | Not authorized | _none_
`404`       | Not found      | _none_
