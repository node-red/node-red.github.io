---
layout: api
title: Methods
---

 Endpoint                                                   | Description 
------------------------------------------------------------|-------------------------
[<span>GET</span>/auth/login](get/auth/login)               | [Get the active authentication scheme](get/auth/login)
[<span>POST</span>/auth/token](post/auth/token)             | [Exchange credentials for access token](post/auth/token)
[<span>POST</span>/auth/revoke](post/auth/revoke)           | [Revoke an access token](post/auth/revoke)
[<span>GET</span>/settings](get/settings)                   | [Get the runtime settings](get/settings)
[<span>GET</span>/flows](get/flows)                         | [Get the active flow configuration](get/flows)
[<span>POST</span>/flows](post/flows)                       | [Set the active flow configuration](post/flows)
[<span>GET</span>/nodes](get/nodes)                         | [Get a list of the installed nodes](get/nodes)
[<span>POST</span>/nodes](post/nodes)                       | [Install a new node module](post/nodes)
[<span>GET</span>/nodes/:module](get/nodes/module)          | [Get a node module's information](get/nodes/module)
[<span>PUT</span>/nodes/:module](put/nodes/module)          | [Enable/Disable a node module](put/nodes/module)
[<span>DELETE</span>/nodes/:module](delete/nodes/module)    | [Remove a node module](delete/nodes/module)
[<span>GET</span>/nodes/:module/:set](get/nodes/module/set) | [Get a node module set information](get/nodes/module/set)
[<span>PUT</span>/nodes/:module/:set](put/nodes/module/set) | [Enable/Disable a node set](put/nodes/module/set)

