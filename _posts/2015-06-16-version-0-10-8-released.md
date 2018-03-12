---
layout: blog
title: Version 0.10.8 released
author: nick
---

**Update** 0.10.10 has been release to fix a permissions issue with the Raspberry Pi GPIO nodes.

~~**Update** 0.10.9 has been released to fix a packaging mistake made in 0.10.8.~~

Node-RED 0.10.~~89~~10 is now available to [download](https://github.com/node-red/node-red/releases/download/0.10.10/node-red-0.10.10.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

Remember, at this time, we **do not** support Node.js v0.12 or io.js.

---

### Nodes (re)moved

One of the main changes we've made is to move some of our core nodes out to their own individual packages. This enables us to ship fixes for these nodes independently of the main release. Some of these nodes have been added as dependencies of the node-red package so they will get automatically included when `npm install` is run. Some of the nodes are no longer included and have to be manually added back in.

The following nodes have moved to their own npm package and have been added as dependencies of the node-red package so will still get included:

 - Twitter, now provided by `node-red-node-twitter`
 - Feedparse, now provided by `node-red-node-feedparser`
 - Email, now provided by `node-red-node-email`
 - Serialport, now provided by `node-red-node-serialport`


The following nodes have moved to their own npm package but have **not** been added as dependencies of the node-red package. This means, if you are using any of these nodes, you'll need to *manually install their new npm package to continue using them.*

 - IRC: `node-red-node-irc`
 - Arduino: `node-red-node-arduino`
 - Redis: `node-red-node-redis`
 - Mongo: `node-red-node-mongodb`

Because we know not everyone reads these release notes, if node-red detects you are using any of these moved nodes, it will very clearly point you at the appropriate package to install.


### Other changes

This release includes a number of fixes and improvements throughout both the runtime and editor. Some highlights include:

- A node's definition can now defined its icon as a function or a static string. This means it can be dynamically changed based on a node's configuration, just as its label can be.

- The HTTP Request node can now be used behind a web proxy as it honours the standard http_proxy environment variable.

- The new `httpNodeMiddleware` configuration setting can be used to add an [Express middleware function](http://expressjs.com/guide/using-middleware.html#middleware.application) in front of all HTTP In nodes. This can be used, for example, to enforce an authentication scheme across all nodes.

- The `Trigger` node has had a redesign to make it more intuitive to use.

- The editor can have a custom theme applied - handy for those of you who want to embed the editor in another application. We'll get it documented properly soon, but until then, you can get some raw information on the [wiki](https://github.com/node-red/node-red/wiki/Design%3A-Editor-Themes).

- The editor now warns if you try to deploy with some unused configuration nodes lurking in the background. Config nodes don't appear on the canvas so it isn't obvious they are there unless you open the sidebar tab from the menu.

  The warning can be turned off if you are intentionally deploying unused nodes.

- The `Catch` node, introduced in the previous release, now provides some protection against a flow getting stuck in an infinite loop of error handling. If a catch node detects the same message has been passed to it, from the same source node, more than 10 times, it will drop the message and log a warning. Sometimes it may be desirable for a flow to loop like this, for example if it is retrying some operation until it succeeds. In those cases, the flow should delete the `msg.error` property to prevent this loop detection from kicking in.
