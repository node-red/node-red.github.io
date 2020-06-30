---
layout: docs-api
toc: toc-api-admin.html
title: Admin API Methods
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - methods

---

 Endpoint                                                   | Description
------------------------------------------------------------|-------------------------
[<span class="method">GET</span>/auth/login](get/auth/login)               | Get the active authentication scheme
[<span class="method">POST</span>/auth/token](post/auth/token)             | Exchange credentials for access token
[<span class="method">POST</span>/auth/revoke](post/auth/revoke)           | Revoke an access token
[<span class="method">GET</span>/settings](get/settings)                   | Get the runtime settings
[<span class="method">GET</span>/flows](get/flows)                         | Get the active flow configuration
[<span class="method">POST</span>/flows](post/flows)                       | Set the active flow configuration
[<span class="method">POST</span>/flow](post/flow)                         | Add a flow to the active configuration
[<span class="method">GET</span>/flow/:id](get/flow)                       | Get an individual flow configuration
[<span class="method">PUT</span>/flow/:id](put/flow)                       | Update an individual flow configuration
[<span class="method">DELETE</span>/flow/:id](delete/flow)                 | Delete an individual flow configuration
[<span class="method">GET</span>/nodes](get/nodes)                         | Get a list of the installed nodes
[<span class="method">POST</span>/nodes](post/nodes)                       | Install a new node module
[<span class="method">GET</span>/nodes/:module](get/nodes/module)          | Get a node module's information
[<span class="method">PUT</span>/nodes/:module](put/nodes/module)          | Enable/Disable a node module
[<span class="method">DELETE</span>/nodes/:module](delete/nodes/module)    | Remove a node module
[<span class="method">GET</span>/nodes/:module/:set](get/nodes/module/set) | Get a node module set information
[<span class="method">PUT</span>/nodes/:module/:set](put/nodes/module/set) | Enable/Disable a node set
