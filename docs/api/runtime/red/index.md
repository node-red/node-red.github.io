---
layout: api
title: Runtime API - RED
---

This API can be used when embedding Node-RED into another application.

### Getting Started

Node-RED can be loaded into another node.js application using the standard
`require` module loader.

### API

 Function                                  | Description
-------------------------------------------|-------------------------
[RED.init(server,settings)](#redinitserversettings) | Initialises Node-RED
[RED.start()](#redstart)                   | Start Node-RED
[RED.stop()](#redstop)                     | Stop Node-RED
[RED.version()](#redversion)               | Returns the version
[RED.httpAdmin](#redhttpadmin)             | The admin express application
[RED.httpNode](#redhttpnode)               | The node express application
[RED.server](#redserver)                    | The http server instance

### RED.init([server],settings)

Initialises the Node-RED runtime. This should only be called once.

Argument | Description
---------|----------------------
server   | (optional) the HTTP(s) server instance the runtime should use
settings | the runtime settings

### RED.start()

Starts the Node-RED runtime. Returns a promise that resolves once the runtime
has started.

### RED.stop()

Stops the Node-RED runtime. Returns a promise that resolves once the runtime has
stopped.

### RED.version()

Returns the version of the Node-RED runtime.

### RED.httpAdmin

The Express application instance that provides the Editor and Admin api.

### RED.httpNode

The Express application instance used by nodes that provide an HTTP route - such
as the HTTP In node.

### RED.server

The HTTP(s) server instance that will be used to serve the Editor and Admin api.
