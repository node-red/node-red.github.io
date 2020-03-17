---
layout: docs-user-guide
toc: toc-user-guide.html
title: Configuration
slug: configuration
redirect_from:
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
  *all IPv4 interfaces*.

  *Standalone only*.

uiPort
: the port used to serve the editor UI. Default: `1880`.

  *Standalone only*.

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

httpNodeRoot
: the root url for nodes that provide HTTP endpoints. If set to `false`, all node-based HTTP endpoints are disabled. Default: `/`

httpNodeAuth
: enables HTTP Basic Authentication. See `httpAdminAuth` for format.

httpRoot
: this sets the root url for both admin and node endpoints. It overrides the values set by `httpAdminRoot` and `httpNodeRoot`.

https
: enables https, with the specified options object, as defined
  [here](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener).

  *Standalone only*.

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
: an HTTP middleware function that is added to all HTTP In nodes. This allows whatever custom processing,
  such as authentication, is needed for the nodes. The format of the middleware function is
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

The default level is `info`. For embedded devices with limited flash storage you may wish to set this to `fatal` to minimise writes to "disk".        

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
        userMenu: false, // Hide the user-menu even if adminAuth is enabled
        login: {
            image: "/absolute/path/to/login/page/big/image" // a 256x256 image
        },
        logout: {
            redirect: "http://example.com"
        },
        palette: {
            editable: true, // Enable/disable the Palette Manager
            catalogues: [   // Alternative palette manager catalogues
                'https://catalogue.nodered.org/catalogue.json'
            ],
            theme: [ // Override node colours - rules test against category/type by RegExp.
                { category: ".*", type: ".*", color: "#f0f" }
            ]
        },
        projects: {
            enabled: false // Enable the projects feature
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
 functions. This is in anticipation of being able to persist the context data in a future release.
 </div>

debugMaxLength
: Debug Nodes - the maximum length, in characters, of any message sent to the
  debug sidebar tab. Default: 1000

mqttReconnectTime
: MQTT Nodes - if the connection is lost, how long to wait, in milliseconds,
  before attempting to reconnect. Default: 5000

serialReconnectTime
: Serial Nodes - how long to wait, in milliseconds, before attempting to reopen
  a serial port. Default: 5000

socketReconnectTime
: TCP Nodes - how long to wait, in milliseconds, before attempting to reconnect.
  Default: 10000

socketTimeout
: TCP Nodes - how long to wait, in milliseconds, before timing out a socket.
  Default: 120000
