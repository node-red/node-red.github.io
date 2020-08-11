---
layout: docs-api
toc: toc-api-admin.html
title: Errors
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - errors
---

All API methods use standard HTTP response codes to indicate success or failure.

Status Code | Reason
------------|------------------
`200`       | Success - with the result in the response content
`204`       | Success - with no further content
`400`       | Bad request - see response format below
`401`       | Not authorized - see [Authentication](oauth)
`404`       | Not found - a resource wasn't found
`409`       | Version mismatch - see [`POST /flows`](methods/post/flows)
`500`       | Server Error - something went wrong on the server

### Error response

For a `400` response code, the body of the response will be a JSON object
containing the fields:

Field     | Description
----------|-----------------------
`code`    | The error code
`message` | The description of the error

    {
      code: "module_already_loaded",
      message: "Module already loaded"
    }

#### Error codes

Code                    | Description
------------------------|-----------------------
`unexpected_error`      | An unexpected error occurred
`invalid_request`       | The request contains invalid parameters
`settings_unavailable`  | The storage system does not support changing settings
`module_already_loaded` | The requested module is already loaded
`type_in_use`           | The request is attempting to remove/disable a node type that is currently being used
`invalid_api_version`       | The request specified an invalid api version in the `Node-RED-API-Version` header
