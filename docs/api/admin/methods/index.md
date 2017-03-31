---
layout: docs
toc: api-toc.html
title: Admin API Methods
---

 Endpoint                                                   | Description
------------------------------------------------------------|-------------------------
[<span>GET</span>/auth/login](get/auth/login)               | Get the active authentication scheme
[<span>POST</span>/auth/token](post/auth/token)             | Exchange credentials for access token
[<span>POST</span>/auth/revoke](post/auth/revoke)           | Revoke an access token
[<span>GET</span>/settings](get/settings)                   | Get the runtime settings
[<span>GET</span>/flows](get/flows)                         | Get the active flow configuration
[<span>POST</span>/flows](post/flows)                       | Set the active flow configuration
[<span>POST</span>/flow](post/flow)                         | Add a flow to the active configuration
[<span>GET</span>/flow/:id](get/flow)                       | Get an individual flow configuration
[<span>PUT</span>/flow/:id](put/flow)                       | Update an individual flow configuration
[<span>DELETE</span>/flow/:id](delete/flow)                 | Delete an individual flow configuration
[<span>GET</span>/nodes](get/nodes)                         | Get a list of the installed nodes
[<span>POST</span>/nodes](post/nodes)                       | Install a new node module
[<span>GET</span>/nodes/:module](get/nodes/module)          | Get a node module's information
[<span>PUT</span>/nodes/:module](put/nodes/module)          | Enable/Disable a node module
[<span>DELETE</span>/nodes/:module](delete/nodes/module)    | Remove a node module
[<span>GET</span>/nodes/:module/:set](get/nodes/module/set) | Get a node module set information
[<span>PUT</span>/nodes/:module/:set](put/nodes/module/set) | Enable/Disable a node set
