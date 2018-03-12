---
layout: blog
title: Version 0.12.0 released
author: nick
---

Node-RED 0.12.0 is now available to [download](https://github.com/node-red/node-red/releases/download/0.12.0/node-red-0.12.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

---

### Updated to Express 4.x

Express is the web framework we use to serve up the editor, admin api and the HTTP nodes. We've been using Express 3.x since the start, but that version is no longer maintained so we've had to move up to the latest stable version 4.x. A major version number bump like that indicates some breaking api changes in the library which, on the whole, we can hide from the Node-RED user. But if you embed node-red into your own application, and provide your own instance of Express, there may be hiccups if the versions don't match.

I've said before on the mailing list that one of my regrets with early choices made in Node-RED was that we exposed the raw Express request and response objects on the message sent by the `HTTP In` node. We want to get to a point where we can reliably encode and decode message objects to a JSON format - that isn't something we can do today with these objects attached to the message. So with this release, we are deprecating the use of any of the functions these objects provide. They will still work in this release, but you will get warning messages in the log. Most functions have alternatives that can be used - if you're not sure, jump on the [mailing list](https://groups.google.com/forum/#!forum/node-red) and ask.

### Support for Node 4.x

With the reunification of node.js and io.js comes the release of [Node v4.2.0](https://nodejs.org/en/blog/release/v4.2.0/), a Long Term Support (LTS) version.

The core Node-RED runtime now supports running on 4.x versions of node - but it may take a little time for some of the individual nodes to catch up as 4.x brought a significant change to how binary modules are built.

For example, our Serial nodes depend on the `serialport` module. They have released a new version that supports 4.x, but it needs a newer version of the GCC compiler than ships by default on Raspberry Pi. So to install it takes more than just an `npm update`. Once we figure out the best way to do it, we'll get it documented and shared.


### Configuration Nodes

Configuration nodes, for those that need reminding, are nodes that don't appear physically in a flow, but contain some shared config that can be reused by nodes in a flow. For example, the `mqtt-broker` config node contains all the connection details of a broker that can be used by multiple `mqtt in` and `mqtt out` nodes.

To date, configuration nodes float at a global level and can be used by any node on any tab or subflow. With this release, configuration nodes can now be scoped to a specific tab or subflow, or kept as a global node.

This means if you import a subflow that includes some config nodes, and then delete the subflow from your palette, the config nodes will be deleted as well - they won't be left lying around at the global level as they would previously.

The edit dialog for config nodes allows you to pick the scope of the node in the top right corner - and will warn you if changing the scope will make it unavailable to a node that currently uses it.

![](/blog/content/images/2015/11/config-node-select.gif)

This configuration node sidebar tab (accessed via the drop-down menu) has been updated to show the config nodes on the current tab as well as the global ones. The deploy warning when you have unused config nodes has also been updated to help indicate where exactly the nodes are.

### Status node

Nodes have been able to share status messages for a while now - such as the MQTT nodes indicating if they are connected or not. What has been missing is a way for a flow to react to these messages.

The new Status node allows you to do just that. Similar in concept to the Catch node in the last release, the Status node will get triggered when a node on the same tab updates its status.

Because a tab may have multiple nodes that have status updates, the Status node can be targetted to specific nodes on the tab - making it much easier to create specific flows for specific scenarios. Because this targetting feature is very useful to have, we've updated the Catch node to be able to do the same.

### MQTT node

The MQTT nodes have had a long-overdue update to support more features of the protocol, including:

 - keep-alive timer and clean session settings
 - TLS connection*
 - Birth and Will messages (auto publish messages on connect or loss of connection).

The TLS support is very much minimum viable solution at the moment - you can't specify your own certificates, so you may need to disable verifying the server certificate for now. But we know we need to provide a better way to manage certificates across the board for any TLS-based connection. There are a few hurdles to jump before we get there, but expect further improvements to come.


### Node Updates

As ever, lots of the other nodes have had various updates.

- JSON node can encode Array types
- Switch node regular expression rule can now be set to be case-insensitive
- HTTP In node can accept non-UTF8 payloads - will return a Buffer when appropriate
- Exec node configuration consistent regardless of the spawn option
- Function node can now display status icon/text
- CSV node can now handle arrays
- setInterval/clearInterval added to Function node
- Function node automatically clears all timers (setInterval/setTimeout) when the node is stopped
