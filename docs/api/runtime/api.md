---
layout: api
title: Runtime API
---

RED          | API entry point returned by `require('node-red');`
&nbsp;&nbsp;[.init(server,settings)](#init)      | Initialises Node-RED
&nbsp;&nbsp;[.start()](#start)                   | Start Node-RED
&nbsp;&nbsp;[.stop()](#stop)                     | Stop Node-RED
&nbsp;&nbsp;[.version()](#version)               | Returns the version
&nbsp;&nbsp;[.httpAdmin](#httpAdmin)             | The admin express application
&nbsp;&nbsp;[.httpNode](#httpNode)               | The node express application
&nbsp;&nbsp;[.server](#server)                   | The http server instance
RED.auth     | Authentication middleware
&nbsp;&nbsp;&nbsp;&nbsp;[.needsPermissions(permission)](#needsPermissions) | Middleware used to ensure a user has a specific permission
RED.comms    |
&nbsp;&nbsp;&nbsp;&nbsp;[.publish(msg)](#publish)| Send a message to the editor
RED.library  |
&nbsp;&nbsp;&nbsp;&nbsp;[.register(type)](#register)| Register a type to the library
RED.log      | Logging services
&nbsp;&nbsp;&nbsp;&nbsp;[.addHandler(func)](#addHandler) | Add a log handler
&nbsp;&nbsp;&nbsp;&nbsp;[.log(msg)](#log)                | Log a message
&nbsp;&nbsp;&nbsp;&nbsp;[.info(msg)](#info)              | Log an info-level message
&nbsp;&nbsp;&nbsp;&nbsp;[.warn(msg)](#warn)              | Log a warning-level message
&nbsp;&nbsp;&nbsp;&nbsp;[.error(msg)](#error)            | Log an error-level message
&nbsp;&nbsp;&nbsp;&nbsp;[.trace(msg)](#trace)            | Log a trace-level message
&nbsp;&nbsp;&nbsp;&nbsp;[.debug(msg)](#debug)            | Log a debug-level message
&nbsp;&nbsp;&nbsp;&nbsp;[.metric()](#m\etric)             | Check if metrics are enabled in the runtime
&nbsp;&nbsp;&nbsp;&nbsp;[.audit(msg,req)](#audit)        | Log an audit event
&nbsp;&nbsp;&nbsp;&nbsp;[._(msg,options)](#nls)          | Lookup NLS message
RED.nodes    | Core runtime api
&nbsp;&nbsp;&nbsp;&nbsp;[.getType(type)](#getType)       | Get a type definition
&nbsp;&nbsp;&nbsp;&nbsp;[.getNode(id)](#getNode)         | Get a node configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.eachNode(callback)](#eachNode) | Iterate over all ndoes
&nbsp;&nbsp;&nbsp;&nbsp;[.installModule(module)](#installModule)     | Install a new node module
&nbsp;&nbsp;&nbsp;&nbsp;[.uninstallModule(module)](#uninstallModule) | Remove a node module
&nbsp;&nbsp;&nbsp;&nbsp;[.enableNode(id)](#enableNode)   | Enable a node set
&nbsp;&nbsp;&nbsp;&nbsp;[.disableNode(id)](#disableNode) | Disabled a node set
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeInfo(id)](#getNodeInfo) | Get a node set's information
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeList()](#getNodeList)   | Get the list of all available nodes
&nbsp;&nbsp;&nbsp;&nbsp;[.getModuleInfo(id)](#getModuleInfo) | Get a node module's information
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeConfigs()](#getNodeConfigs) | Get the HTML configurations of all active node sets
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeConfig(id)](#getNodeConfig) | Get the HTML configuration of a specific node set
&nbsp;&nbsp;&nbsp;&nbsp;[.loadFlows()](#loadFlows)       | Load the active flow configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.startFlows()](#startFlows)     | Start the active flow configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.stopFlows()](#stopFlows)       | Stop the active flow configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.setFlows(flows,type)](#setFlows)   | Set the active flow configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.getFlows()](#getFlows)         | Get the active flow configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.addFlow(flow)](#addFlow)       | Add a new flow to the active configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.getFlow(id)](#getFlow)         | Get a flow within the active configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.updateFlow(id,flow)](#updateFlow)  | Update an existing flow in the active configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.removeFlow(id)](#removeFlow)   | Remove a flow from the active configuration
&nbsp;&nbsp;&nbsp;&nbsp;[.addCredentials(id,credentials)](#addCredentials) | Add a credentials entry for a node
&nbsp;&nbsp;&nbsp;&nbsp;[.getCredentials(id)](#getCredentials)             | Get the credentials entry for a node
&nbsp;&nbsp;&nbsp;&nbsp;[.deleteCredentials(id)](#deleteCredentials)       | Remove the credentials entry for a node
RED.settings | Runtime settings
&nbsp;&nbsp;&nbsp;&nbsp;[.available()](#available)    | Check if settings are available
&nbsp;&nbsp;&nbsp;&nbsp;[.get(key)](#get)             | Get a setting value
&nbsp;&nbsp;&nbsp;&nbsp;[.set(key,value)](#set)       | Set a value in settings
RED.util     | Common utilities
&nbsp;&nbsp;&nbsp;&nbsp;[.cloneMessage(msg)](#cloneMessage)           | Clone a message object
&nbsp;&nbsp;&nbsp;&nbsp;[.compareObjects(objA,objB)](#compareObjects) | Compare two javascript objects
&nbsp;&nbsp;&nbsp;&nbsp;[.ensureBuffer(value)](#ensureBuffer)         | Ensure a value is a Buffer type
&nbsp;&nbsp;&nbsp;&nbsp;[.ensureString(value)](#ensureString)         | Ensure a value is a String type
&nbsp;&nbsp;&nbsp;&nbsp;[.evaluateNodeProperty(value,type,node,msg)](#evaluateNodeProperty) | Evaluate a typed node property
&nbsp;&nbsp;&nbsp;&nbsp;[.generateId()](#generateId)                  | Generate a new id value
&nbsp;&nbsp;&nbsp;&nbsp;[.getMessageProperty(msg,expr)](#getMessageProperty)                | Get a message property
&nbsp;&nbsp;&nbsp;&nbsp;[.setMessageProperty(msg,prop,value,createMissing)](#setMessageProperty) | Set a message property

---

#####<a name="init"></a> RED.init(server,settings)

#####<a name="start"></a> RED.start()

#####<a name="stop"></a> RED.stop()

#####<a name="version"></a> RED.version()

#####<a name="httpAdmin"></a> RED.httpAdmin

#####<a name="httpNode"></a> RED.httpNode

#####<a name="server"></a> RED.server

#####<a name="needsPermissions"></a> RED.auth.needsPermissions(permission)

#####<a name="publish"></a> RED.comms.publish(msg)

#####<a name="register"></a> RED.library.register(type)

#####<a name="addHandler"></a> RED.log.addHandler(func)

#####<a name="log"></a> RED.log.log(msg)

#####<a name="info"></a> RED.log.info(msg)

#####<a name="warn"></a> RED.log.warn(msg)

#####<a name="error"></a> RED.log.error(msg)

#####<a name="trace"></a> RED.log.trace(msg)

#####<a name="debug"></a> RED.log.debug(msg)

#####<a name="metric"></a> RED.log.metric()

#####<a name="audit"></a> RED.log.audit(msg,req)

#####<a name="nls"></a> RED.log.\_(msg,options)

#####<a name="getType"></a> RED.nodes.getType(type)

#####<a name="getNode"></a> RED.nodes.getNode(id)

#####<a name="eachNode"></a> RED.nodes.eachNode(callback)

#####<a name="installModule"></a> RED.nodes.installModule(module)

#####<a name="uninstallModule"></a> RED.nodes.uninstallModule(module)

#####<a name="enableNode"></a> RED.nodes.enableNode(id)

#####<a name="disableNode"></a> RED.nodes.disableNode(id)

#####<a name="getNodeInfo"></a> RED.nodes.getNodeInfo(id)

#####<a name="getNodeList"></a> RED.nodes.getNodeList()

#####<a name="getModuleInfo"></a> RED.nodes.getModuleInfo(id)

#####<a name="getNodeConfigs"></a> RED.nodes.getNodeConfigs()

#####<a name="getNodeConfig"></a> RED.nodes.getNodeConfig(id)

#####<a name="loadFlows"></a> RED.nodes.loadFlows()

#####<a name="startFlows"></a> RED.nodes.startFlows()

#####<a name="stopFlows"></a> RED.nodes.stopFlows()

#####<a name="setFlows"></a> RED.nodes.setFlows(flows,type)

#####<a name="getFlows"></a> RED.nodes.getFlows()

#####<a name="addFlow"></a> RED.nodes.addFlow(flow)

#####<a name="getFlow"></a> RED.nodes.getFlow(id)

#####<a name="updateFlow"></a> RED.nodes.updateFlow(id,flow)

#####<a name="removeFlow"></a> RED.nodes.removeFlow(id)

#####<a name="addCredentials"></a> RED.nodes.addCredentials(id,credentials)

#####<a name="getCredentials"></a> RED.nodes.getCredentials(id)

#####<a name="deleteCredentials"></a> RED.nodes.deleteCredentials(id)

#####<a name="available"></a> RED.settings.available()

#####<a name="get"></a> RED.settings.get(key)

#####<a name="set"></a> RED.settings.set(key,value)

#####<a name="cloneMessage"></a> RED.util.cloneMessage(msg)

#####<a name="compareObjects"></a> RED.util.compareObjects(objA,objB)

#####<a name="ensureBuffer"></a> RED.util.ensureBuffer(value)

#####<a name="ensureString"></a> RED.util.ensureString(value)

#####<a name="evaluateNodeProperty"></a> RED.util.evaluateNodeProperty(value,type,node,msg)

#####<a name="generateId"></a> RED.util.generateId()

#####<a name="getMessageProperty"></a> RED.util.getMessageProperty(msg,expr)

#####<a name="setMessageProperty"></a> RED.util.setMessageProperty(msg,prop,value,createMissing)
