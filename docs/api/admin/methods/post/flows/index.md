---
layout: api
title: POST /flows
---

Set the active flow configuration.

Requires permission: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - if authentication is enabled
`Content-type`             | `application/json`
`Node-RED-Deployment-Type` | `full`, `nodes`, `flows` or `reload`


The `Node-RED-Deployment-Type` header is used to define what type of deployment
is performed.

 - `full` - all existing nodes are stopped before the new configuration is started.
   This is the default behaviour if the header is not provided.
 - `nodes` - only nodes that have been modified are stopped before the new
   configuration is applied.
 - `flows` - only flows that contain modified nodes are stopped before the new
   configuration is applied.
 - `reload` - the flows are reloaded from storage and all nodes are restarted (since Node-RED 0.12.2)

### Arguments

The request body must be a new full configuration JSON string.

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`204`       | Success        | _none_
`401`       | Not authorized | _none_
