---
layout: default
title: Configuration
---
The following properties can be used to configure Node-RED.

When run as a standalone application, these properties are read from the `settings.js`
file. 

When [embedded](embedding.html), they are passed in the call to `RED.init()`.
However, when run in this mode, certain properties are ignored and are left to
the embedding application to implement.

### Editor Configuration

flowFile
: the file used to store the flows. Default: `flows_<hostname>.json`

uiPort
: the port used to serve the editor UI. Default: 1880.
  
  *Standalone only*.

httpRoot
: the root url for the editor UI. Default: '/'.
  
  *Standalone only*.

httpAuth
: enables HTTP Basic Authentication, with the specified username/password:

      httpAuth: {user:"nol", pass:"5f4dcc3b5aa765d61d8327deb882cf99"}
  
  The `pass` property is the md5 hash of the actual password. The following
  command can be used to generate the hash:

      $ node -e "console.log(require('crypto').createHash('md5').update('YOUR PASSWORD HERE','utf8').digest('hex'))"
  
  *Standalone only*.
      
https
: enables https, with the specified options object, as defined 
  [here](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

  *Standalone only*.

### Node Configuration

Any node type can define its own settings to be provided in the file.

functionGlobalContext
: Function Nodes - a collection of objects to attach to the global function
  context. For example,

      functionGlobalContext: { os:require('os') }
  
  can be accessed in a function node as:
  
      context.global.os

debugMaxLength
: Debug Nodes - the maximum length, in characters, of any message sent to the
  debug siderbar tab. Default: 1000

mqttReconnectTime
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds, 
  before attempting to reconnect. Default: 5000

serialReconnectTime
: Serial Nodes - how long to wait, in milliseconds before attempting to reopen
  a serial port. Default: 5000
