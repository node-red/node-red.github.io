---
layout: default
title: Configuration
---
The following properties can be used to configure Node-RED.

When run as a standalone application, these properties are read from the `settings.js`
file. The location of this file is determined in the order:

 - set using the `--settings|-s` command-line argument
 - in the user directory if it was specified by the `--userDir|-u` command-line argument
 - in the default user directory: `$HOME/.node-red/settings.js`
 - in the node-red install directory

Node-RED includes a default `settings.js` file that will be used in absence of a
user-provided settings file. It can also be used as a starting point for creating
your own settings file. It can be seen on GitHub [here](https://github.com/node-red/node-red/blob/master/settings.js).

When [embedded](embedding), they are passed in the call to `RED.init()`.
However, when run in this mode, certain properties are ignored and are left to
the embedding application to implement.

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

### Editor Configuration

adminAuth
: enables user-level security in the editor and admin API. See [security](security)
  for more information.

paletteCategories
: defines the order of categories in the palette. If a node's category is not in
  the list, the category will get added to the end of the palette. If not set,
  the following default order is used:

      ['subflows', 'input', 'output', 'function', 'social', 'storage', 'analysis', 'advanced'],

   _Note_: Until the user creates a subflow the subflow category will be empty and will
   not be visible in the palette.

### Editor Themes

The theme of the editor can be changed by using the following settings object. All parts are optional.

    editorTheme: {
        page: {
            title: "Node-RED",
            favicon: "/absolute/path/to/theme/icon",
            css: "/absolute/path/to/custom/css/file"
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
        menu: { // Hide unwanted menu items by id. see editor/js/main.js:loadEditor for complete list
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

      functionGlobalContext: { os:require('os') }

  can be accessed in a function node as:

      context.global.os

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
