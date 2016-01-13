---
layout: api
title: Runtime API
---

RED          | API entry point returned by `require('node-red');`
&nbsp;&nbsp;[.init(server,settings)](#init) | Initialises Node-RED
&nbsp;&nbsp;[.start()](#start)                   | Start Node-RED
&nbsp;&nbsp;[.stop()](#stop)                     | Stop Node-RED
&nbsp;&nbsp;[.version()](#version)               | Returns the version
&nbsp;&nbsp;[.httpAdmin](#httpAdmin)             | The admin express application
&nbsp;&nbsp;[.httpNode](#httpNode)               | The node express application
&nbsp;&nbsp;[.server](#server)                    | The http server instance
RED.auth     |
&nbsp;&nbsp;&nbsp;&nbsp;[.needsPermissions(permission)](#needsPermissions) |
RED.comms    |
&nbsp;&nbsp;&nbsp;&nbsp;[.publish(msg)](#publish)|
RED.library  |
&nbsp;&nbsp;&nbsp;&nbsp;[.register(type)](#register)|
RED.log      | Logging services
&nbsp;&nbsp;&nbsp;&nbsp;[.addHandler(func)](#addHandler) |
&nbsp;&nbsp;&nbsp;&nbsp;[.log(msg)](#log)                |
&nbsp;&nbsp;&nbsp;&nbsp;[.info(msg)](#info)              |
&nbsp;&nbsp;&nbsp;&nbsp;[.warn(msg)](#warn)              |
&nbsp;&nbsp;&nbsp;&nbsp;[.error(msg)](#error)            |
&nbsp;&nbsp;&nbsp;&nbsp;[.trace(msg)](#trace)            |
&nbsp;&nbsp;&nbsp;&nbsp;[.debug(msg)](#debug)            |
&nbsp;&nbsp;&nbsp;&nbsp;[.metric()](#metric)             |
&nbsp;&nbsp;&nbsp;&nbsp;[.audit(msg,req)](#audit)        |
&nbsp;&nbsp;&nbsp;&nbsp;[._(msg,options)](#nls)         |
RED.nodes    | Core runtime api
&nbsp;&nbsp;&nbsp;&nbsp;[.getType(type)](#getType) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getNode(id)](#getNode)          |
&nbsp;&nbsp;&nbsp;&nbsp;[.eachNode(callback)](#eachNode)  |
&nbsp;&nbsp;&nbsp;&nbsp;[.installModule(module)](#installModule)     |
&nbsp;&nbsp;&nbsp;&nbsp;[.uninstallModule(module)](#uninstallModule) |
&nbsp;&nbsp;&nbsp;&nbsp;[.enableNode(id)](#enableNode) |
&nbsp;&nbsp;&nbsp;&nbsp;[.disableNode(id)](#disableNode) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeInfo(id)](#getNodeInfo) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeList()](#getNodeList) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getModuleInfo(id)](#getModuleInfo) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeConfigs()](#getNodeConfigs) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getNodeConfig(id)](#getNodeConfig) |
&nbsp;&nbsp;&nbsp;&nbsp;[.loadFlows()](#loadFlows) |
&nbsp;&nbsp;&nbsp;&nbsp;[.startFlows()](#startFlows) |
&nbsp;&nbsp;&nbsp;&nbsp;[.stopFlows()](#stopFlows) |
&nbsp;&nbsp;&nbsp;&nbsp;[.setFlows(flows)](#setFlows) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getFlows()](#getFlows) |
&nbsp;&nbsp;&nbsp;&nbsp;[.addCredentials(id,credentials)](#addCredentials) |
&nbsp;&nbsp;&nbsp;&nbsp;[.getCredentials(id)](#getCredentials) |
&nbsp;&nbsp;&nbsp;&nbsp;[.deleteCredentials(id)](#deleteCredentials) |
RED.settings | Runtime settings
&nbsp;&nbsp;&nbsp;&nbsp;[.available()](#available) |
&nbsp;&nbsp;&nbsp;&nbsp;[.get(key)](#get)             |
&nbsp;&nbsp;&nbsp;&nbsp;[.set(key,value)](#set)       |
RED.util     | Common utilities
&nbsp;&nbsp;&nbsp;&nbsp;[.cloneMessage(msg)](#cloneMessage)           |
&nbsp;&nbsp;&nbsp;&nbsp;[.compareObjects(objA,objB)](#compareObjects) |
&nbsp;&nbsp;&nbsp;&nbsp;[.ensureBuffer(value)](#ensureBuffer)         |
&nbsp;&nbsp;&nbsp;&nbsp;[.ensureString(value)](#ensureString)         |
&nbsp;&nbsp;&nbsp;&nbsp;[.evaluateNodeProperty(value,type,node,msg)](#evaluateNodeProperty) |
&nbsp;&nbsp;&nbsp;&nbsp;[.generateId()](#generateId)                  |
&nbsp;&nbsp;&nbsp;&nbsp;[.getMessageProperty(msg,expr)](#getMessageProperty)            |
&nbsp;&nbsp;&nbsp;&nbsp;[.setMessageProperty(msg,prop,value,createMissing)](#setMessageProperty) |

---

#####<a name="init"></a> RED.init(server,settings)

---

#####<a name="start"></a> RED.start()

#####<a name="stop"></a> RED.stop()

#####<a name="version"></a> RED.version()

#####<a name="httpAdmin"></a> RED.httpAdmin

#####<a name="httpNode"></a> RED.httpNode

#####<a name="server"></a> RED.server

#####<a name="needsPermissions"></a> RED.auth.needsPermissions(permission)

#####<a name="publish"></a> RED.comms.publish(msg)

#####<a name="register"></a> RED.library.register(type)

#####<a name=""></a> RED.log

#####<a name="addHandler"></a> RED.log.addHandler(func)

#####<a name="log"></a> RED.log.log(msg)

#####<a name="info"></a> RED.log.info(msg)

#####<a name="warn"></a> RED.log.warn(msg)

#####<a name="error"></a> RED.log.error(msg)

#####<a name="trace"></a> RED.log.trace(msg)

#####<a name="debug"></a> RED.log.debug(msg)

#####<a name="metric"></a> RED.log.metric()

#####<a name="audit"></a> RED.log.audit(msg,req)

#####<a name="nls"></a> RED.log._(msg,options)

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

#####<a name="setFlows"></a> RED.nodes.setFlows(flows)

#####<a name="getFlows"></a> RED.nodes.getFlows()

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
