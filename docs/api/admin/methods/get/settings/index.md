---
layout: api
title: GET /settings
---

Get the runtime settings.

### Headers

Header | Value
-------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | See example response body
`401`       | Not authorized | _none_

    {
      "httpNodeRoot": "/",
      "version": "0.X.Y",
      "user": {
        "username": "admin",
        "permissions": "*"
      }
    }

The response object contains the following fields:

Field          | Description
---------------|------------
`httpNodeRoot` | The root path of HTTP nodes
`version`      | Node-RED runtime version
`user`         | Information about the logged in user. This field is only present if [authentication is enabled](/docs/security.html).
