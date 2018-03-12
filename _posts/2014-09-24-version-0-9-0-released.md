---
layout: blog
title: Version 0.9.0 released
author: nick
---

Node-RED 0.9.0 is now available to [download](https://github.com/node-red/node-red/archive/0.9.0.zip) or [npm install](https://npmjs.org/package/node-red).

Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html) and don't forget to run `npm update` after grabbing the latest code.

### What's new

#### Faster start-up time

A change went in a couple of releases ago that made Node-RED parse and compress all of the node `.html` defintions on start-up. This allowed us to minifiy the output before serving it to the editor. The downside of this change was the amount of work needed to be done each time Node-RED started. This was particularly noticable on smaller platforms such as the Raspberry Pi, where it could take almost a minute to get going.

With this release, we've backed out that change; the saving made in minifiying the output was marginal when compared to the expense of start-up time.

#### A dynamic palette of nodes

For a node to appear in the side palette, it has traditionally had to pick one of the pre-existing categories to be put in. This had its limits, so nodes can now specify their own category.

We've also added an admin api for adding and removing nodes from the runtime without having to restart Node-RED. It's still a little experimental and will be stablised in the next release along with some tooling to make use of it. If you want to find out more, ask on the [mailing list](https://groups.google.com/forum/#!forum/node-red).

We'll also be doing a bit of reorganisation of the core nodes in the near future, so if you're following the git repository, expect to see some nodes move around the palette as they find new homes.

#### A faster Function node

The function node is one of the basic building blocks for a lot of flows. But it has also been one of the main bottlenecks. A few tweaks to its implementation in this release brings an order-of-magnitude speed improvement. It also improves the memory usage pattern of the runtime.

#### Awesome icons

As mentioned previously, we're slowly reducing our dependency on the Bootstrap UI framework. A key part of this is the palette of icons that are available for nodes to use. We made [Font Awesome](http://fortawesome.github.io/Font-Awesome/) available in the last release and have now migrated all of the core nodes over to their [icons](http://fortawesome.github.io/Font-Awesome/icons/). We recommend node authors do the same.

#### Almost-headless

We've had support for running in headless mode since 0.7. This allowed the editor and all of the admin apis to be disabled.

As we expand the capabilities of the api, we realised we needed an almost-headless mode; where the editor is disabled, but the admin apis are still available.

With this release we've added the `disableEditor` option in the settings file. Setting this to `true` stops the runtime from serving up the editor. All of the admin api endpoints remain available.

#### Credential documentation

There's a much easier way for nodes to interact with the credentials system now in place. With all of the core nodes updated to use it, the [documentation](http://nodered.org/docs/creating-nodes/credentials.html) has been updated to match.


#### Web Nodes

We've created a new repository of nodes for popular web services. This will grow over time, but with this release we have nodes for:

 - saving bookmarks to [Delicious](http://delicious.com) and [Pinboard](http://pinboard.in)
 - uploading images to [Flickr](http://flickr.com)
 - saving files to both [Dropbox](http://dropbox.com) and [Amazon S3](http://aws.amazon.com/s3)

To add these nodes to your palette, run:

    $ npm install node-red-node-web-nodes


#### Node updates

 - The CSV parser node can now handle more things thrown at it
 - The Mongo nodes now support `update`, `count` and `aggregate` functions
 - The TCP node can be configured to drop its connection after each transfer. Handy for notifying the remote end that a transfer is complete.
 - The MQTT node now supports configuring the qos and retain options on a message.
 - The Twitter node can tweet photos
 - The RaspberryPi GPIO nodes support the B+ model pins

#### Deprecated nodes

 We deprecated the `httpget` node a couple of releases ago, but it's still just hanging on. Joining it on the list are:

  - `imap` - the core email node provides this functionality
  - `parsexml`, `js2xml` - the XML parser node does a much better job then either of these did

All four of these nodes have been removed from the palette, but are still present under the covers. Deprecation warnings have been added to them all and they _will be deleted in the next release_.

#### npm installable nodes

There's a growing collection of Node-RED nodes being published onto npm. We've made most of the nodes in our node-red-nodes repository available there to make them really easy to install.

We recommend authors tag their nodes with `node-red` so they show up in [this search](https://www.npmjs.org/browse/keyword/node-red).
