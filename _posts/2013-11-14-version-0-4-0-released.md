---
layout: blog
title: Version 0.4.0 released
author: nick
---

Node-RED 0.4.0 is now available to [download](https://github.com/node-red/node-red/archive/0.4.0.zip) or [npm install](https://npmjs.org/package/node-red). Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

### New configuration options

This release brings a few new configuration options. They're all documented [here](http://nodered.org/docs/configuration.html), but there are a couple worth calling out.

By default, all the user data is normally stored in the Node-RED install directory. This isn't ideal when you are using `npm` to install as it will all get lost when you come to `npm update` to the next release. Similarly, any custom nodes you've added to the `nodes` directory will be removed.

To solve this, we've added two new configuration options:

- `userDir` points at the directory to store all of your data in. If not set, it uses the install directory as before.
- `nodesDir` points at a directory that contains nodes you want to add to the palette. This directory is searched in addition to the existing `nodes` directory, so you can use either.

A common scenario for embedding Node-RED is to put it behind a dashboard that presents the data being generated. Previously, you would have had to [embed](http://nodered.org/docs/embedding.html) the Node-RED into another node.js app to achieve this.

To make this even easier, the new `httpStatic` property can be used to point at a directory of files that should be served up when someone points their browser at http://localhost:1880 (or wherever you've configured Node-RED to listen). For this to work, you *must* also set `httpRoot` to move the editor UI away from `/`.

The existing `httpAuth` property, which can be used to enabled authentication, *only* applies to the editor UI, not to the static files. This means it isn't currently possible to secure the static content using these options - if you need that, you should use the embedding approach. This is something we'll address in a future release.


### Node updates
Various bug fixes have gone into the existing nodes. One new feature to mention is the Delay node can now be configured to delay a random amount of time, between two values.

We've added the `json2xml` to the core repository to provide the reverse mapping of the existing `xml2js` node.

In the [node-red-nodes](https://github.com/node-red/node-red-nodes) repository, some new nodes have been added:

 - `wemo` - to control Wemo sockets and switches,
 - `twilio` - send SMS using the Twilio service (contributed by [Andrew Lindsay](http://blog.thiseldo.co.uk/))
 - `rawserial` - Only needed for Windows boxes without `serialport` installed. Uses a simple read of the serial port as a file to input data. You must set the baud rate etc externally before starting Node-RED. This node does not implement pooling of connections so only one instance of each port may be used - so in or out but not both.
 - `mdp` - MPD music control nodes. Output node expects payload to be a valid mpc command. Currently only simple commands that expect no reply are supported. Input node creates a payload object with Artist, Album, Title, Genre and Date.
 - `mysql` - allows basic access to a MySQL database.
 - `swearfilter` - analyses the payload and tries to filter out any messages containing bad swear words. Handy for doing live Twitter demos to your parents.

### What's next?

There's a healthy [list of issues](https://github.com/node-red/node-red/issues?state=open) and we've still got a whiteboard of scribblings to work through.

Some of the items near the top of the list include:

 - making it more obvious if you have nodes with undeployed changes
 - add client id, usernamd and password support to the MQTT nodes. May even get Last Will and Testament support in.
 - enable session-oriented connections in the TCP nodes.



### Upcoming events

There a couple events coming up where we'll be speaking about Node-RED.

[IOT London Meetup](http://www.meetup.com/iotlondon/events/145842362/) is next Tuesday. As usual, its highly oversubscribed, so hopefully you're already on the list.

On December 2nd & 3rd is [ThingMonk](http://redmonk.com/thingmonk/), a two-day event all about the Internet of Things. I'll be talking on the theme of Integration:
> The Internet of Things is not a single choice of technology, approach or philosophy. Its very existence is the bringing together of multiple platforms, products and protocols, where the whole is greater than the sum of its parts.

>We need to make it as easy as possible to allow developers, to make things, for play or profit, serious or whimsical, professional or hobbyist.

Be sure to [buy your ticket](http://redmonk.com/thingmonk/tickets/) and we'll see you there.
