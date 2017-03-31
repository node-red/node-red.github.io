---
layout: docs
toc: api-toc.html
title: POST /auth/revoke
---

Revoke an access token

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]`
`Content-type`             | `application/json`

### Arguments

The request body must be a JSON string with the following fields:

Field   | Description
--------|------------------------
`token` | The token to revoke

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | _none_
`401`       | Not authorized | _none_


