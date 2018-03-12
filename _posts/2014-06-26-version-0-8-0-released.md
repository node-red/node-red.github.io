---
layout: blog
title: Version 0.8.0 released
author: nick
---

Node-RED 0.8.0 is now available to [download](https://github.com/node-red/node-red/archive/0.8.0.zip) or [npm install](https://npmjs.org/package/node-red).

Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html) and don't forget to run `npm update` after grabbing the latest code.

### What's new

#### A subtle new look for nodes

With our use of white-on-transparent icons, along with a muted palette of colours for the nodes themselves, sometimes the combination could make the icon hard to see. To help improve the icon's contrast, it now gets displayed on a darker background. It's a subtle change, but makes it easier to distinguish the different nodes.
![New node appearance](/blog/content/images/2014/Jun/Selection_077.png)


#### Documentation updates

We now have documentation on [how to write your own node](http://nodered.org/docs/creating-nodes/). There are a couple more advanced topics still to cover, but all of the basics are there.

#### Node status indicators

It is now possible for nodes to share their status with the UI and update it in realtime. This status is hidden by default, but it can be turned on by selecting the 'Node Status' option in the right-hand drop-down menu.

For example, the MQTT nodes have been updated to show if they are connected or not.

![MQTT node state](/blog/content/images/2014/Jun/Selection_078.png)

More information in the [new docs](http://nodered.org/docs/creating-nodes/status.html).

#### npm installable nodes

With this release, we now support nodes to be installed via npm. This make it much easier to install new nodes as well as their dependencies.

If you have a [Griffin Powermate](http://www.amazon.co.uk/gp/product/B003VWU2WA) you can install the Node-RED node for it with a simple `npm install node-red-contrib-powermate` - thanks to [@hardillb](https://twitter.com/hardillb).

We'll be gradually releasing the nodes in the existing node-red-nodes repository to npm.

More information in, you guessed it, the [new docs](http://nodered.org/docs/creating-nodes/packaging.html).

#### Touch UI

Quite a lot of work has gone into making the UI touch-enabled. This first pass has been focused on enabling the existing functionality to be driven by touch and not rely on mouse/keyboard combinations.

There are still some parts that aren't yet optimised for touch/mobile - such as the drop-down menu. This is something we'll be working on in the next couple releases.

Credit to [TJ Koury](https://github.com/TJKoury) for his contributions in this area.


#### Flow file handling

The flow file now gets backed-up whenever a new set of flows are deployed. This means the backup file, `flows.backup` will always contain the previous deployed flows - handy if you accidentally deploy something you didn't mean to.

Previously, the credentials for a flow would get stored in `credentials.json`. When the flow file was loaded, it would prune out any credentials that were associated with nodes that no longer existed. This was a pain for users who frequently switched between flow files. To solve this, the file used to store credentials is now tied to the flow filename. For example, when running with `my_flows.json`, the credentials will get stored in `my_flows_cred.json`.

We have occasionally had a request to format the flow file to make it more human-readable, rather than as a compact, single-line JSON string. This is now possible by setting the `flowFilePretty` option in the settings file.

#### Node updates

- There is a new collection of parser nodes that make it easy to convert payloads between different formats. For example, the JSON node can convert between a JSON string and a JavaScript Object, in either direction. There are also nodes for handling XML and CSV payloads.
- The HTML node allows a flow to extract elements of a document using jQuery-like selectors.
- The File In node can be used to read a file's contents
- The Trigger node can be used to pulse IO pins, setup a watchdog or many other things
- The Serial node has been updated to allow configuration of the data bits, parity and stop bits. It can also now be configured to handle binary data rather than assume everything is ASCII text.
