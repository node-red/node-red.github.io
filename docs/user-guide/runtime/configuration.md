---
layout: docs-user-guide
toc: toc-user-guide.html
title: Configuration
slug: configuration
redirect_from:
  - /docs/configuration
  - /docs/user-guide/configuration
---
The following properties can be used to configure Node-RED.

When running as a normal application, it loads its configuration from a settings
file. For more information about the settings file and where it is, read [this guide](settings-file).

When running as an [embedded application](embedding), the configuration options
are passed in the call to `RED.init()`. However, when run in this mode, certain
properties are ignored and are left to the embedding application to implement.

### Runtime Configuration

flowFile
: the file used to store the flows. Default: `flows_<hostname>.json`

flowFilePretty
:  By default, the flow JSON will be formatted over multiple lines making
     it easier to compare changes when using version control.
     To disable pretty-printing of the JSON set the following property to false. Default: `flowFilePretty: true`

userDir
: the directory to store all user data, such as flow and credential files and all
  library data. Default: `$HOME/.node-red`

nodesDir
: a directory to search for additional installed nodes. Node-RED searches the `nodes`
  directory under the *userDir* directory. This property allows an additional directory
  to be searched, so that nodes can be installed outside of the Node-RED install
  structure. Default: `$HOME/.node-red/nodes`

uiHost
: the interface to listen for connections on. Default: `0.0.0.0` -
  By default, the Node-RED UI accepts connections on all IPv4 interfaces.
  To listen on all IPv6 addresses, set uiHost to "::",
  The following property can be used to listen on a specific interface. For
  example, the following would only allow connections from the local machine `uiHost: "127.0.0.1",`
  
  *Standalone only*.

uiPort
: the port used to serve the editor UI. Default: `process.env.PORT || 1880`.

  *Standalone only*.

apiMaxLength
: The maximum size of HTTP request that will be accepted by the runtime api. Default: `apiMaxLength: '5mb',`

httpAdminRoot
: the root url for the editor UI. If set to `false`, all admin endpoints are disabled. This includes both API endpoints and the editor UI. To disable just the editor UI, see the `disableEditor` property below. Default: `/`

httpAdminAuth
: *Deprecated*: see `adminAuth`.

  enables HTTP Basic Authentication on the editor UI:

      httpAdminAuth: {user:"nol", pass:"5f4dcc3b5aa765d61d8327deb882cf99"}

  The `pass` property is the md5 hash of the actual password. The following
  command can be used to generate the hash:

      node -e "console.log(require('crypto').createHash('md5').update('YOUR PASSWORD HERE','utf8').digest('hex'))"

  *Standalone only*.

httpAdminMiddleware
: an HTTP middleware function, or array of functions, that is added to all admin routes.
  The format of the middleware function is documented [here](http://expressjs.com/guide/using-middleware.html#middleware.application).

      httpAdminMiddleware: function(req,res,next) {
          // Perform any processing on the request.
          // Be sure to call next() if the request should be passed on
      }

httpNodeRoot
: the root url for nodes that provide HTTP endpoints. If set to `false`, all node-based HTTP endpoints are disabled. Default: `/`

httpNodeAuth
: enables HTTP Basic Authentication. See `httpAdminAuth` for format.

httpRoot
: this sets the root url for both admin and node endpoints. It overrides the values set by `httpAdminRoot` and `httpNodeRoot`.

https
: The following property can be used to enable HTTPS.
  See [here](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) for details of its contents.
  This property can be either an object, containing both a (private) key
     * and a (public) certificate, or a function that returns such an object.

```
  /** Option 1: static object */
  //https: {
  //  key: require("fs").readFileSync('privkey.pem'),
  //  cert: require("fs").readFileSync('cert.pem')
  //},

  /** Option 2: function that returns the HTTP configuration object */
  // https: function() {
  //     // This function should return the options object, or a Promise
  //     // that resolves to the options object
  //     return {
  //         key: require("fs").readFileSync('privkey.pem'),
  //         cert: require("fs").readFileSync('cert.pem')
  //     }
  // },
```

  *Standalone only*.

httpsRefreshInterval
: If the `https` setting is a function, the following setting can be used to set how often, in hours, the function will be called. That can be used to refresh any certificates. `httpsRefreshInterval : 12,`

requireHttps
: The following property can be used to cause insecure HTTP connections to be redirected to HTTPS. `requireHttps: true,`

disableEditor
: if set to `true`, prevents the editor UI from being served by the runtime. The admin api endpoints remain active. Default: `false`.

httpStatic
: a local directory from which to serve static web content from. This content is
  served from the top level url, `/`. When this property is used, `httpAdminRoot` must
  also be used to make editor UI available at a path other than `/`.

  *Standalone only*.

httpStaticAuth
: enabled HTTP Basic Authentication on the static content. See `httpAdminAuth` for format.

httpNodeCors
: enables cross-origin resource sharing for the nodes that provide HTTP endpoints,
  as defined [here](https://github.com/troygoode/node-cors#configuration-options)

httpNodeMiddleware
: an HTTP middleware function, or array of functions, that is added to all HTTP In nodes.
  This allows whatever custom processing, such as authentication, is needed for
  the nodes. The format of the middleware function is
  documented [here](http://expressjs.com/guide/using-middleware.html#middleware.application).

      httpNodeMiddleware: function(req,res,next) {
          // Perform any processing on the request.
          // Be sure to call next() if the request should be passed
          // to the relevant HTTP In node.
      }

logging
: currently only console logging is supported. Various levels of logging can be specified. Options are:

 - **fatal** - only those errors which make the application unusable should be recorded
 - **error** - record errors which are deemed fatal for a particular request + fatal errors
 - **warn** - record problems which are non fatal + errors + fatal errors
 - **info** - record information about the general running of the application + warn + error + fatal errors
 - **debug** - record information which is more verbose than info + info + warn + error + fatal errors
 - **trace** - record very detailed logging + debug + info + warn + error + fatal errors
```
logging: {
    console: {
          level: "info",
          metrics: false, /** Whether or not to include metric events in the log output */
          audit: false /** Whether or not to include audit events in the log output */
    }
},
```
The default level is `info`. For embedded devices with limited flash storage you may wish to set this to `fatal` to minimise writes to "disk".

lang
: the following option is to run node-red in your preferred language. Available languages include: en-US (default), ja, de, zh-CN, zh-TW, ru, ko Some languages are more complete than others. Example: `lang: "de",`

diagnosticsOptions
: Configure diagnostics options.

    diagnosticsOptions: {
        /** @type {boolean} enable or disable diagnostics. Must be set to `false` to disable */
        enabled: true,
        /** @type {"basic"|"admin"} diagnostic level can be "basic" (default) or "admin" (more sensitive details are included) */
        level: "basic",
    },

When `enabled` is `true` (or unset), diagnostics data will be available at http://localhost:1880/diagnostics . When `level` is "basic" (or unset), the diagnostics will not include sensitive data. Set level to "admin" for detailed diagnostics.  

runtimeState
: enable or disable flows/state

    runtimeState: {
        /** enable or disable flows/state endpoint. Must be set to `false` to disable */
        enabled: false,
        /** show or hide runtime stop/start options in the node-red editor. Must be set to `false` to hide */
        ui: false,
    },

exportGlobalContextKeys
: `global.keys()` returns a list of all properties set in global context. This allows them to be displayed in the Context Sidebar within the editor. In some circumstances it is not desirable to expose them to the editor. The following property can be used to hide any property set in `functionGlobalContext` from being list by `global.keys()`.
By default, the property is set to false to avoid accidental exposure of their values. Setting this to true will cause the keys to be listed.


externalModules
: Configure how the runtime will handle external npm modules. This covers:<br/>
     - whether the editor will allow new node modules to be installed<br/>
     - whether nodes, such as the Function node are allowed to have their own dynamically configured dependencies.

The allow/denyList options can be used to limit what modules the runtime will install/load. It can use `*` as a wildcard that matches anything.

      externalModules: {
         // autoInstall: false,   /** Whether the runtime will attempt to automatically install missing modules */
         // autoInstallRetry: 30, /** Interval, in seconds, between reinstall attempts */
         // palette: {              /** Configuration for the Palette Manager */
         //     allowInstall: true, /** Enable the Palette Manager in the editor */
         //     allowUpdate: true,  /** Allow modules to be updated in the Palette Manager */
         //     allowUpload: true,  /** Allow module tgz files to be uploaded and installed */
         //     allowList: ['*'],
         //     denyList: [],
         //     allowUpdateList: ['*'],
         //     denyUpdateList: []
         // },
         // modules: {              /** Configuration for node-specified modules */
         //     allowInstall: true,
         //     allowList: [],
         //     denyList: []
         // }
      },

functionExternalModules
: Allow the Function node to load additional npm modules directly. Default: `true`

### Editor Configuration

adminAuth
: enables user-level security in the editor and admin API. See [Securing Node-RED](securing-node-red)
  for more information.

paletteCategories
: defines the order of categories in the palette. If a node's category is not in
  the list, the category will get added to the end of the palette. If not set,
  the following default order is used:

      ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],

   _Note_: Until the user creates a subflow the subflow category will be empty and will
   not be visible in the palette.

debugUseColors
: Colourise the console output of the debug node. Default: `true`

debugMaxLength
: Debug Nodes - the maximum length, in characters, of any message sent to the
  debug sidebar tab. Default: `1000`

### Editor Themes

The theme of the editor can be changed by using the following settings object. All parts are optional.

    editorTheme: {
        page: {
            title: "Node-RED",
            favicon: "/absolute/path/to/theme/icon",
            css: "/absolute/path/to/custom/css/file",
            scripts: [ "/absolute/path/to/custom/script/file", "/another/script/file"]
        },
        header: {
            title: "Node-RED",
            image: "/absolute/path/to/header/image", // or null to remove image
            url: "http://nodered.org" // optional url to make the header text/image a link to this url
        },
        deployButton: {
            type:"simple",
            label:"Save",
            icon: "/absolute/path/to/deploy/button/image" // or null to remove image
        },
        menu: { // Hide unwanted menu items by id. see packages/node_modules/@node-red/editor-client/src/js/red.js:loadEditor for complete list
            "menu-item-import-library": false,
            "menu-item-export-library": false,
            "menu-item-keyboard-shortcuts": false,
            "menu-item-help": {
                label: "Alternative Help Link Text",
                url: "http://example.com"
            }
        },
        tours: false, // disable the Welcome Tour for new users
        userMenu: false, // Hide the user-menu even if adminAuth is enabled
        login: {
            image: "/absolute/path/to/login/page/big/image" // a 256x256 image
        },
        logout: {
            redirect: "http://example.com"
        },
        palette: {
            editable: true, // *Deprecated* - use externalModules.palette.allowInstall instead
            catalogues: [   // Alternative palette manager catalogues
                'https://catalogue.nodered.org/catalogue.json'
            ],
            theme: [ // Override node colours - rules test against category/type by RegExp.
                { category: ".*", type: ".*", color: "#f0f" }
            ]
        },
        projects: {
            enabled: false // Enable the projects feature
        },
        theme: "", // Select a color theme for the editor. See https://github.com/node-red-contrib-themes/theme-collection for a collection of themes to choose from
        codeEditor: {
            lib: "ace", // Select the text editor component used by the editor. Defaults to "ace", but can be set to "ace" or "monaco"
            options: {
                // The following only apply if the editor is set to "monaco"
                theme: "vs", // Select a color theme for the text editor component. Must match the file name of a theme in packages/node_modules/@node-red/editor-client/src/vendor/monaco/dist/theme
            }
        }
    },

### Dashboard

ui
: The home path for the Node-RED-Dashboard add-on nodes can specified. This is relative
to any already defined **httpNodeRoot**

    ui : { path: "mydashboard" },
   

### Node Configuration

Any node type can define its own settings to be provided in the file.

functionGlobalContext
: Function Nodes - a collection of objects to attach to the global function
  context. For example,

      functionGlobalContext: { osModule:require('os') }

  can be accessed in a function node as:

      var myos = global.get('osModule');

 <div class="doc-callout"><em>Note</em> : Prior to Node-RED v0.13, the documented
 way to use global context was to access it as a sub-property of <code>context</code>:
 <pre>context.global.foo = "bar";
 var osModule = context.global.osModule;</pre>
 This method is still supported, but deprecated in favour of the <code>global.get</code>/<code>global.set</code>
 functions. Any data stored using this method will not be persisted across restarts and will not be visible in the sidebar context viewer.
 </div>
<br/>

nodeMessageBufferMaxLength
: The maximum number of messages nodes will buffer internally as part of their operation. This applies across a range of nodes that operate on message sequences. defaults to no limit. A value of 0 also means no limit is applied.

functionExternalModules
: if set to `true`, the Function node's Setup tab will allow adding additional modules that will become available to the function. See [Writing Functions](../writing-functions#using-the-functionexternalmodules-option) for more information. Default: `false`.

mqttReconnectTime
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds,
  before attempting to reconnect. Default: `5000`

serialReconnectTime
: Serial Nodes - how long to wait, in milliseconds, before attempting to reopen
  a serial port. Default: `5000`

socketReconnectTime
: TCP Nodes - how long to wait, in milliseconds, before attempting to reconnect.
  Default: `10000`

socketTimeout
: TCP Nodes - how long to wait, in milliseconds, before timing out a socket.
  Default: `120000`

tcpMsgQueueSize
: Maximum number of messages to wait in queue while attempting to connect to TCP socket. Defaults to 1000

inboundWebSocketTimeout
: Timeout in milliseconds for inbound WebSocket connections that do not match any configured node. Defaults to `5000`

tlsConfigDisableLocalFiles
: To disable the option for using local files for storing keys and certificates in the TLS configuration node, set this to `true`

execMaxBufferSize
: Maximum buffer size for the exec node. Defaults to 10Mb. `execMaxBufferSize: 10000000`

httpRequestTimeout
: Timeout in milliseconds for HTTP request connections. Defaults to 120s. Setting in ms `120000`

webSocketNodeVerifyClient
: The following property can be used to verify websocket connection attempts. This allows, for example, the HTTP request headers to be checked to ensure they include valid authentication information.
```
//webSocketNodeVerifyClient: function(info) {
    //    /** 'info' has three properties:
    //    *   - origin : the value in the Origin header
    //    *   - req : the HTTP request
    //    *   - secure : true if req.connection.authorized or req.connection.encrypted is set
    //    *
    //    * The function should return true if the connection should be accepted, false otherwise.
    //    *
    //    * Alternatively, if this function is defined to accept a second argument, callback,
    //    * it can be used to verify the client asynchronously.
    //    * The callback takes three arguments:
    //    *   - result : boolean, whether to accept the connection or not
    //    *   - code : if result is false, the HTTP error status to return
    //    *   - reason: if result is false, the HTTP reason string to return
    //    */
    //},
```