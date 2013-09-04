---
toc-index: 2
layout: default
title: Configuration
---
Node-RED's configuration is stored in the `settings.js` file.

### Editor Configuration

uiPort
: the port used to serve the editor UI. Default: 1880

httpRoot
: the root url for the editor UI. Default: '/'

https
: the https options object, as defined [here](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

### Node Configuration

Any node type can define its own settings to be provided in the file. 

functionGlobalContext
: Function Nodes - objects to attach to the global function context. For example,

      functionGlobalContext: { os:require('os') }
  
  can be accessed in a function node as:
  
      context.global.os

mqttReconnectTime
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds, 
  before attempting to reconnect. Default: 5000

serialReconnectTime
: Serial Nodes - how long to wait, in milliseconds before attempts to open
  a serial port. Default: 5000
