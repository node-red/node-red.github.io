---
layout: blog
title: Version 0.6.0 released
author: nick
---

Node-RED 0.6.0 is now available to [download](https://github.com/node-red/node-red/archive/0.6.0.zip) or [npm install](https://npmjs.org/package/node-red). Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

If you are embedding Node-RED in another application, this release brings some api changes that will affect you. Be sure you read the release notes below and the updated documentation.

### What's new

#### Flow library
Not strictly part of this release, but whilst we've got your attention, we have created [flows.nodered.org](http://flows.nodered.org) for anyone to share interesting flows they have created.

Before you can add a flow, you have to login to the site via github. We do this because when you add a flow, we save the flow as a Gist under your account on github. This means it remains 'yours' - and you are free to remove it from the library at any time. It does also mean that currently, if you want to edit the flow, you have to do that via the flow's page on github (linked from the sidebar in the library). Once edited, you click the 'refresh' link in the sidebar so we go grab the latest version under the covers. We'll be adding in-line editing in a future version.

The front page currently lists all of the flows that have been added, along with the tags used. As we get more content, we'll be working on ways to make it easier for you to find relevant flows.


#### Separating http configuration

Currently, Node-RED has a pair of configuration settings that can be used to modify how the admin UI is served.

 - `httpRoot` defines the root path the UI is served from.
 - `httpAuth`, if set, defines the basic authentication by specifying a required user/password .

A problem with this approach is that these settings are also applied to the endpoints the HTTP-In node create. This means it is not possible to secure the UI from unauthorised users at the same time as allowing those users to access the HTTP In endpoints. It also meant that you could easily get a clash if you created an HTTP-In node listening on endpoints the Admin UI already uses (such as `/flows`).

With this release, the configuration for how the admin parts of Node-RED are served have been separated out from how nodes that provide HTTP endpoints are configured. The following properties can now be used:

 - `httpAdminRoot` defines the root path the UI is served from.
 - `httpAdminAuth`, if set, defines the basic auth user/password

 - `httpNodeRoot` defines the root path for nodes to use
 - `httpNodeAuth`, if set, defines the basic auth for accessing node endpoints

These changes are mostly backward compatible -  if these new properties are not set, but `httpRoot`/`httpAuth` are, then the new properties automatically pick-up their corresponding values.

For the sake of completeness, there is also a new option to provide basic auth details for the `httpStatic` content - `httpStaticAuth` - which also picks up the value of `httpAuth` if not otherwise set.

Internally, there has been a change to how nodes access the express app to attach their HTTP request handles. Previously, a node would just use `RED.app`. For example, from the Inject node:

    RED.app.post("/inject/:id", function(req,res) {

The use of `RED.app` has been deprecated. If you use it, you'll get a log message in the console warning about use of a deprecated API - although things will still work for now.

These there are two new properties of `RED` to use:

 - `RED.httpAdmin` - should be used for all admin related http endpoints. For example, managing user credentials as the MQTT node does. As the name suggests, endpoints attached here are subject to the `httpAdmin*` configuration settings. Any code that uses the deprecated RED.app will actually be using this property under the covers.
 - `RED.httpNode` - should be used for non-admin http endpoints. Again, as the name suggests, `httpNode*` configuration applies here.

If you have embedded Node-RED in your own node.js application, there is an extra required step as a result of now having two express apps to attach. Using the example from the docs (http://nodered.org/docs/embedding.html), rather than just do:

    app.use(settings.httpRoot,RED.app);

you must do:

    app.use(settings.httpAdminRoot,RED.httpAdmin);
    app.use(settings.httpNodeRoot,RED.httpNode);


#### UI changes
 - Importing a flow has got a bit easier now that you can drag and drop the flow json straight onto the canvas. Here's an example dragging from the new flow library.

![Drag and Drop](/blog/content/images/2014/Apr/nr_drag_and_drop.gif)

 - To make it a bit easier to find things in the palette, we've added a search filter.

![Palette Filter](/blog/content/images/2014/Apr/nr_palette_filter.gif)

 - To help manage the configuration nodes used in a flow, we've added the config node sidebar tab. It lists all of the config nodes in the flow and highlights what's using each one. This means you can quickly spot any config nodes that are no longer being used and can be deleted.

![Configuration Sidebar](/blog/content/images/2014/Apr/nr_config_sb.gif)




### Node updates

 - Added nodes for Emoncms, Postgres and Amazon DynamoDB to the [node-red-nodes](https://github.com/node-red/node-red-nodes) repository
 - Added `socketTimeout` to settings.js for TCP server sockets
 - Added proper choice for regex support to change node
 - Fixed keepalive handling in MQTT client
 - Added options for all 17 pins in WiringPi
 - Added new Range Node
 - Improved inject node payload options - allows an 'empty' payload to be injected
 - File node: the filename can be overridden by the incoming message's `filename` property. It will delete the file if the message has a `delete` property.
 - Added username/password to Mongo nodes
 - Added `httpNodeCors` to setting.js to enable cross-origin requests to be made
 - Added optional basic-auth to HTTP Request node
