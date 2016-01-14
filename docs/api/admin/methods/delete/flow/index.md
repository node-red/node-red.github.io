---
layout: api
title: DELETE /flow/:id
---

Delete an individual flow configuration

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Arguments

Path Component | Description
---------------|------------
`id`           | The id of the flow

### Response

Status Code | Reason         | Response
------------|----------------|------------
`204`       | Success        | _none_
`400`       | Bad request    | An [Error response](/docs/api/admin/errors.html).
`401`       | Not authorized | _none_
`404`       | Not found      | _none_
