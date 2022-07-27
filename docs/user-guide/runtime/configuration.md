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

The settings are split into the following sections:
- Flow File and User Directory Settings
- Security
- Server Settings
- Runtime Settings
- Editor Settings
- Node Settings
 
### Flow File and User Directory Settings

**flowFile**
: the file used to store the flows. Default: `flows.json`

**credentialSecret**
: By default, credentials are encrypted in storage using a generated key. To specify your own secret, set the following property. If you want to disable encryption of credentials, set this property to false. Note: once you set this property, do not change it - doing so will prevent node-red from being able to decrypt your existing credentials and they will be lost.

**flowFilePretty**
:  By default, the flow JSON will be formatted over multiple lines making
     it easier to compare changes when using version control.
     To disable pretty-printing of the JSON set the following property to false. Default: `flowFilePretty: true`


**userDir**
: By default, all user data is stored in a directory called `.node-red` under the user's home directory. To use a different location, the following property can be used `userDir: '/home/nol/.node-red/',` Default: `$HOME/.node-red`

**nodesDir**
: a directory to search for additional installed nodes. Node-RED searches the `nodes`
  directory under the *userDir* directory. This property allows an additional directory
  to be searched, so that nodes can be installed outside of the Node-RED install
  structure. Default: `$HOME/.node-red/nodes`

### Security

**adminAuth**
: enables user-level security in the editor and admin API.<br /> See [Securing Node-RED](securing-node-red)
  for more information.

**https**
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

**httpsRefreshInterval**
: If the `https` setting is a function, the following setting can be used to set how often, in hours, the function will be called. That can be used to refresh any certificates. `httpsRefreshInterval : 12,`

**requireHttps**
: The following property can be used to cause insecure HTTP connections to be redirected to HTTPS. `requireHttps: true,`

**httpNodeAuth**
: enables HTTP Basic Authentication. See `adminAuth` for format.

**httpStaticAuth**
: enabled HTTP Basic Authentication on the static content. See `adminAuth` for format.

### Server Settings

**uiPort**
: the port used to serve the editor UI. Default: `process.env.PORT || 1880`.

  *Standalone only*.

**uiHost**
: the interface to listen for connections on. Default: `0.0.0.0` -
  By default, the Node-RED UI accepts connections on all IPv4 interfaces.
  To listen on all IPv6 addresses, set uiHost to "::",
  The following property can be used to listen on a specific interface. For
  example, the following would only allow connections from the local machine `uiHost: "127.0.0.1",`
  
  *Standalone only*.

**apiMaxLength**
: The maximum size of HTTP request that will be accepted by the runtime api.<br/>Default: `apiMaxLength: '5mb',`

**httpServerOptions**
: The following property can be used to pass custom options to the Express.js server used by Node-RED. For a full list of available options, refer to [Express.js](http://expressjs.com/en/api.html#app.settings.table) `httpServerOptions: { },`

**httpAdminRoot**
: the root url for the editor UI. If set to `false`, all admin endpoints are disabled. This includes both API endpoints and the editor UI. To disable just the editor UI, see the `disableEditor` property below. Default: `/`

**httpAdminMiddleware**
: an HTTP middleware function, or array of functions, that is added to all admin routes.
  The format of the middleware function is documented [here](http://expressjs.com/guide/using-middleware.html#middleware.application).

```
    // httpAdminMiddleware: function(req,res,next) {
    //    // Set the X-Frame-Options header to limit where the editor
    //    // can be embedded
    //    //res.set('X-Frame-Options', 'sameorigin');
    //    next();
    // },
```
**httpNodeRoot**
: Some nodes, such as HTTP In, can be used to listen for incoming http requests. By default, these are served relative to '/'. The following property can be used to specifiy a different root path. If set to `false`, this is disabled. Default: `/`

**httpNodeCors**
: enables cross-origin resource sharing for the nodes that provide HTTP endpoints,
  as defined [here](https://github.com/troygoode/node-cors#configuration-options)

**httpNodeMiddleware**
: an HTTP middleware function, or array of functions, that is added to all HTTP In nodes.
  This allows whatever custom processing, such as authentication, is needed for
  the nodes. The format of the middleware function is
  documented [here](http://expressjs.com/guide/using-middleware.html#middleware.application).

```
//httpNodeMiddleware: function(req,res,next) {
    //    // Handle/reject the request, or pass it on to the http in node by calling next();
    //    // Optionally skip our rawBodyParser by setting this to true;
    //    //req.skipRawBodyParser = true;
    //    next();
    //},
```
**httpStatic**
: When httpAdminRoot is used to move the UI to a different root path, the following property can be used to identify a directory of static content that should be served at `http://localhost:1880/` When httpStaticRoot is set differently to httpAdminRoot, there is no need to move httpAdminRoot

```
   //httpStatic: '/home/nol/node-red-static/', //single static source
    /* OR multiple static sources can be created using an array of objects... */
    //httpStatic: [
    //    {path: '/home/nol/pics/',    root: "/img/"}, 
    //    {path: '/home/nol/reports/', root: "/doc/"}, 
    //],

    /**  
     * All static routes will be appended to httpStaticRoot
     * e.g. if httpStatic = "/home/nol/docs" and  httpStaticRoot = "/static/"
     *      then "/home/nol/docs" will be served at "/static/"
     * e.g. if httpStatic = [{path: '/home/nol/pics/', root: "/img/"}]
     *      and httpStaticRoot = "/static/"
     *      then "/home/nol/pics/" will be served at "/static/img/"
     */
    //httpStaticRoot: '/static/',
```

  *Standalone only*.

httpAdminAuth
: *Deprecated*: see `adminAuth`.

  enables HTTP Basic Authentication on the editor UI:

      httpAdminAuth: {user:"nol", pass:"5f4dcc3b5aa765d61d8327deb882cf99"}

  The `pass` property is the md5 hash of the actual password. The following
  command can be used to generate the hash:

      node -e "console.log(require('crypto').createHash('md5').update('YOUR PASSWORD HERE','utf8').digest('hex'))"

  *Standalone only*.

httpRoot
: this sets the root url for both admin and node endpoints. It overrides the values set by `httpAdminRoot` and `httpNodeRoot`.


### Runtime Settings

**lang**
: the following option is to run node-red in your preferred language.<br/> 
Available languages include: `en-US (default), ja, de, zh-CN, zh-TW, ru, ko`. Some languages are more complete than others.

**diagnostics**
: Configure diagnostics options.
```
    diagnostics: {
        /** @type {boolean} enable or disable diagnostics. Must be set to `false` to disable */
        enabled: true,
        /** @type {"basic"|"admin"} diagnostic level can be "basic" (default) or "admin" (more sensitive details are included) */
        level: "basic",
    },
```
When `enabled` is `true` (or unset), diagnostics data will be available at http://localhost:1880/diagnostics . When `level` is "basic" (or unset), the diagnostics will not include sensitive data. Set level to "admin" for detailed diagnostics.  

**runtimeState**
: enable or disable flows/state
```
    runtimeState: {
        /** enable or disable flows/state endpoint. Must be set to `false` to disable */
        enabled: false,
        /** show or hide runtime stop/start options in the node-red editor. Must be set to `false` to hide */
        ui: false,
    },
```

**logging**
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

**contextStorage**
: The following property can be used to enable context storage. The configuration provided here will enable file-based context that flushes to disk every 30 seconds. Refer to the documentation for further options [here](https://nodered.org/docs/api/context/)

**exportGlobalContextKeys**
: `global.keys()` returns a list of all properties set in global context. This allows them to be displayed in the Context Sidebar within the editor. In some circumstances it is not desirable to expose them to the editor. The following property can be used to hide any property set in `functionGlobalContext` from being list by `global.keys()`.
By default, the property is set to false to avoid accidental exposure of their values. Setting this to true will cause the keys to be listed.


**externalModules**
: Configure how the runtime will handle external npm modules. This covers:<br/>
     - whether the editor will allow new node modules to be installed<br/>
     - whether nodes, such as the Function node are allowed to have their own dynamically configured dependencies.

The allow/denyList options can be used to limit what modules the runtime will install/load. It can use `*` as a wildcard that matches anything.
```
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
```

**functionExternalModules**
: Allow the Function node to load additional npm modules directly. Default: `true`

### Editor Settings

**disableEditor**
: if set to `true`, prevents the editor UI from being served by the runtime. The admin api endpoints remain active. Default: `false`.

**editorTheme**
: The following property can be used to set a custom theme for the editor. See [here](https://github.com/node-red-contrib-themes/theme-collection) for a collection of themes to choose from.

```
editorTheme: {

        //theme: "",

        /** To disable the 'Welcome to Node-RED' tour that is displayed the first
         * time you access the editor for each release of Node-RED, set this to false
         */
        //tours: false,

        palette: {
            /** The following property can be used to order the categories in the editor
             * palette. If a node's category is not in the list, the category will get
             * added to the end of the palette.
             * If not set, the following default order is used:
             */
            //categories: ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],
        },

        projects: {
            /** To enable the Projects feature, set this value to true */
            enabled: false,
            workflow: {
                /** Set the default projects workflow mode.
                 *  - manual - you must manually commit changes
                 *  - auto - changes are automatically committed
                 * This can be overridden per-user from the 'Git config'
                 * section of 'User Settings' within the editor
                 */
                mode: "manual"
            }
        },

        codeEditor: {
            /** Select the text editor component used by the editor.
             * As of Node-RED V3, this defaults to "monaco", but can be set to "ace" if desired
             */
            lib: "monaco",
            options: {
                /** The follow options only apply if the editor is set to "monaco"
                 *
                 * theme - must match the file name of a theme in
                 * packages/node_modules/@node-red/editor-client/src/vendor/monaco/dist/theme
                 * e.g. "tomorrow-night", "upstream-sunburst", "github", "my-theme"
                 */
                // theme: "vs",
                /** other overrides can be set e.g. fontSize, fontFamily, fontLigatures etc.
                 * for the full list, see https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html
                 */
                //fontSize: 14,
                //fontFamily: "Cascadia Code, Fira Code, Consolas, 'Courier New', monospace",
                //fontLigatures: true,
            }
        }
    },

```

### Node Settings
Any node type can define its own settings to be provided in the file.

**fileWorkingDirectory**
: The working directory to handle relative file paths from within the File nodes defaults to the working directory of the Node-RED process.

**functionExternalModules**
: if set to `true`, the Function node's Setup tab will allow adding additional modules that will become available to the function. See [Writing Functions](../writing-functions#using-the-functionexternalmodules-option) for more information. Default: `true`.

**functionGlobalContext**
: Function Nodes - a collection of objects to attach to the global function context. For example:

`functionGlobalContext: { osModule:require('os') }`

can be accessed in a function node as:

`var myos = global.get('osModule');`

<div class="doc-callout"><em>Note</em> : Prior to Node-RED v0.13, the documented
 way to use global context was to access it as a sub-property of context: <code>context.global.foo = "bar"; var osModule = context.global.osModule;</code>This method is still supported, but deprecated in favour of the <code>global.get</code>/ <code>global.set</code> functions. Any data stored using this method will not be persisted across restarts and will not be visible in the sidebar context viewer.
</div>


**nodeMessageBufferMaxLength**
: The maximum number of messages nodes will buffer internally as part of their operation. This applies across a range of nodes that operate on message sequences. defaults to no limit. A value of `0` also means no limit is applied.

**ui**
: The home path for the Node-RED-Dashboard add-on nodes can specified. This is relative
to any already defined **httpNodeRoot**. <br />Example: `ui: { path: "mydashboard" },`
Other optional properties include : 
```
readOnly:{boolean},
middleware:{function or array}, (req,res,next) - http middleware
ioMiddleware:{function or array}, (socket,next) - socket.io middleware
```

**debugUseColors**
: Colourise the console output of the debug node. Default: `true`

**debugMaxLength**
: Debug Nodes - the maximum length, in characters, of any message sent to the
  debug sidebar tab. Default: `1000`

**execMaxBufferSize**
: Maximum buffer size for the exec node. Defaults to 10Mb. `execMaxBufferSize: 10000000`

**httpRequestTimeout**
: Timeout in milliseconds for HTTP request connections. Defaults to 120s. Setting in ms `120000`

**mqttReconnectTime**
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds,
  before attempting to reconnect. Default: `5000`

**serialReconnectTime**
: Serial Nodes - how long to wait, in milliseconds, before attempting to reopen
  a serial port. <br />Default: `5000`

**socketReconnectTime**
: TCP Nodes - how long to wait, in milliseconds, before attempting to reconnect.
  Default: `10000`

**socketTimeout**
: TCP Nodes - how long to wait, in milliseconds, before timing out a socket.
  Default: `120000`

**tcpMsgQueueSize**
: Maximum number of messages to wait in queue while attempting to connect to TCP socket. Defaults to `1000`

**inboundWebSocketTimeout**
: Timeout in milliseconds for inbound WebSocket connections that do not match any configured node. Defaults to `5000`

**tlsConfigDisableLocalFiles**
: To disable the option for using local files for storing keys and certificates in the TLS configuration node, set this to `true`

**webSocketNodeVerifyClient**
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