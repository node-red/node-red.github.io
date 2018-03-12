---
layout: blog
title: Version 0.7.0 released
author: nick
---

Node-RED 0.7.0 is now available to [download](https://github.com/node-red/node-red/archive/0.7.0.zip) or [npm install](https://npmjs.org/package/node-red).

Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html). Above all, don't forget to run `npm update` after grabbing the latest code!

### What's new

When you run Node-RED, it attempts to load all of the nodes it finds. Typically you'll have some nodes that have missing dependencies so you'll get a number of messages such as:

    16 Apr 21:16:59 - [23-watch.js] Error: Cannot find module 'fs.notify'
    16 Apr 21:16:59 - [32-feedparse.js] Error: Cannot find module 'feedparser'

We've tidied that up a bit so it is less intimidating to new users. With this release, we now hide these message by default and just provide a summary:

    16 Apr 21:23:32 - ------------------------------------------
    16 Apr 21:23:32 - [red] Failed to register 10 node types
    16 Apr 21:23:32 - [red] Run with -v for details
    16 Apr 21:23:32 - ------------------------------------------

As you can see, we also tell you how to see the details - by running with the `-v` option.

As we now have a couple different command-line options, we've added help:

    $ node red.js -?
    Usage: node red.js [-v] [-?] [--settings settings.js] [flows.json]

    Options:
      -s, --settings FILE  use specified settings file
      -v                   enable verbose output
      -?, --help           show usage

    Documentation can be found at http://nodered.org


#### Headless Mode

One of our first issues on the tracker was the ability to run Node-RED in headless mode - without the UI running.

In previous releases, we've made some small steps towards enabling this feature, which we have finally done in this release.

If you recall with the last release we introduced the `httpAdminRoot` and `httpNodeRoot` configuration settings. These are used to define the root path of their respective http endpoints.

You can now set either of these properties to `false` (not `'false'` the string, but `false` the boolean type). Doing so effectively turns off their respective endpoints. For ease of use, setting `httpRoot` to false is a short-cut for setting both `httpAdminRoot` and `httpNodeRoot` to false.

Furthermore, if `httpAdminRoot` and `httpNodeRoot` are both false (or `httpRoot` is false), and `httpStatic` isn't set, then we don't even start the http server.

If you have HTTP-In nodes in a flow and you have `httpNodeRoot` set to false, you will now get warning messages letting you know those nodes are not accessible.

If you have debug nodes and `httpAdminRoot` is false, you won't have any access to the debug node output unless you also use their new option to send output to stdout.

#### UI updates

In the UI, when dragging nodes around, you could already snap to a grid by pressing `shift` *after* starting to drag the nodes. There were some inconsistences in how we calculated the grid position when you had multiple nodes selected which we've tidied up. This makes it easier to get the wires lining up.

In this release you can now also achieve pixel-perfect placement of your nodes using the cursor keys. If you press `shift` at the same time, the nodes will make large movements.

We've added support for cutting nodes in the workspace with `Ctrl-X` to compliment the existing copy (`Ctrl-C`) and paste (`Ctrl-V`) actions.


#### Removing old deprecated nodes
As announced earlier on the [mailing list](https://groups.google.com/forum/#!topic/node-red/-2nG6nKaxFI), we've removed some of the nodes we deprecated a long time ago. When we deprecate a node, it disappears from the palette to prevent new uses of it, but remains in the runtime so existing flows aren't affected. The nodes we've removed are:

 - 30-socketin  - the old simle tcp and udp socket - now replaced by separate tcp and udp and http nodes
 - 30-socketout - the matching outbound sockets
 - 32-multicast - the original multicast node - now replaced as part of the udp node
 - 35-rpi-gpio-in - original raspberry pi input node using a node library (no longer maintained) - now replaced by the one using gpio.
 - 35-rpi-gpio-out - the outbound pair

#### Deprecating HTTPGet
In this release we have deprecated the httpget node. This had been logically replaced by the HTTPRequest node some time ago, but we never got around to properly deprecating it. When I highlighted this, it was pointed out there was a feature of the httpget node not available in its replacement; the ability to programmatically construct the url within the node.

The httpget node allowed you to specify a 'base url' and an 'append' option. When a message arrived, the payload was inserted between these two to get the final url for the request. Rather than reproduce this feature in the HTTPRequest node as-is, it was a chance to do a better job of solving the problem.

When configured in the node itself, the `url` property of the HTTPRequest node now supports mustache-style template tags. This allows the url to be generated dynamically using any property of the incoming message. For example, a url of:

    http://example.com/{{topic}}?s={{user}}

and an incoming message of:

    {
        topic: "foo",
        user: "fred",
    }

will result in the url:

    http://example.com/foo/?s=fred


You can still construct the url yourself and pass it in with the `url` property of the message - this will override whatever else you have configured in the node.

#### Other node updates


- Debug nodes can now optionally send their output to stdout. Also, clicking on a debug message in the sidebar will switch tabs in the workspace if needed to show the source of the message.
- The Delay node has a new option to drop intermediate messages when in rate-limiting mode
- The Sentiment node accepts a set of word-value pairs to customise its scoring

- Added nodes to the [node-red-nodes](https://github.com/node-red/node-red-nodes) repository for:
  - Beaglebone Black hardware - analog, discrete and pulse IO
  - Heatmiser thermostat
  - Pibrella board
- Updated the Emoncms and Hue nodes with new capabilities
- The Twilio node no longer requires you to provide your account details in `settings.js` - you can provide them within the node itself.
