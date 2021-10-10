---
layout: docs-api
title: API Reference
---

#### Runtime APIs

 - [Admin HTTP API](admin)

    This HTTP-based API can be used to remotely administer the runtime. It is used
    by the Node-RED Editor and command-line admin tool.


 - [Hooks](hooks)

    The Hooks API provides a way to insert custom code into certain key points of
    the runtime operation.

 - [Storage](storage)

    This API provides a pluggable way to configure where the Node-RED runtime stores
    data.

 - [Logging](/docs/user-guide/runtime/logging)

    A custom logger can be used to send log events to alternative locations, such as
    a database.

 - [Context Store](context)

    This API provides a pluggable way to store context data outside of the runtime.

 - [Library Store](library)

    This API provides a pluggable way to add additional libraries to the Node-RED
    Import/Export dialog.

#### [Editor APIs](ui)

The APIs available in the editor for nodes and plugins to use. This includes a set
set of standard UI widgets that can be used within a node's edit template.

#### [Module APIs](modules)

The APIs provided by npm modules that Node-RED is built from. These can be used
to embed Node-RED into existing Node.js applications.
