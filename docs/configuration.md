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

httpAuth
: enables HTTP Basic Authentication, with the specified username/password:

      httpAuth: {user:"nol",pass:"5f4dcc3b5aa765d61d8327deb882cf99"}
  
  The `pass` property is the md5 hash of the actual password. The following
  command can be used to generate the hash:

      $ node -e "console.log(require('crypto').createHash('md5').update('YOUR PASSWORD HERE','utf8').digest('hex'))"

https
: enables https, with the specified options object, as defined 
  [here](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).


### Node Configuration

Any node type can define its own settings to be provided in the file.

functionGlobalContext
: Function Nodes - a collection of objects to attach to the global function
  context. For example,

      functionGlobalContext: { os:require('os') }
  
  can be accessed in a function node as:
  
      context.global.os

mqttReconnectTime
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds, 
  before attempting to reconnect. Default: 5000

serialReconnectTime
: Serial Nodes - how long to wait, in milliseconds before attempting to reopen
  a serial port. Default: 5000
