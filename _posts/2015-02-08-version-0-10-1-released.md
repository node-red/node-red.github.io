---
layout: blog
title: Version 0.10.1 released
author: nick
---

Node-RED 0.10.1 is now available to [download](https://github.com/node-red/node-red/archive/0.10.1.zip) or [npm install](https://npmjs.org/package/node-red).

Please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html) and don't forget to run `npm update` after grabbing the latest code.

### What's new

#### Subflows
One of the main new features in this release is the introduction of subflows. They allow you to group together a set of nodes and collapse them down into a single node, which then appears in the _subflow_ palette category. You can then drag on as many instances of the subflow onto your workspace as you need.

![Subflow editing](/blog/content/images/2015/Feb/Selection_136.png)

To get started, select the `Create subflow` menu option.

#### New deploy menu

There are occasions when restarting your flows just to add a new node, or tweak an existing one, is inconvenient. For example, you can quickly hit the Twitter API rate limit if your flows include the twitter input node and you redeploy too often in a 15 minute window. If you have a node capturing data and storing it in a database, the redeploy causes an interruption so some data may get missed.

This releases adds some new deploy options aimed to help avoid those issues. There are now three deployment modes:

- Full - what we've always had, and still the default mode
- Modified Nodes - only nodes that contain changes are stopped and recreated. If any new wires have been added/removed, they get patched in without restarting the nodes either end of them (unless they have some other material change).
- Modified Flows - nodes that are in the same flow as a modified node are stopped and recreated. A change to the wiring of the flow causes the whole flow to be stopped and recreated.

To expose these options the Deploy button now has a drop-down next to it to pick what sort of deploy occurs when the button is pressed:

![New deploy menu](/blog/content/images/2015/Feb/Selection_135.png)

One footnote regarding subflows, as they are handled slightly differently. If anything has changed within a subflow definition, the entire subflow is treated as a 'changed' node - in other words, we don't patch in changes to a running subflow, we will always stop the entire subflow and recreate it.


#### Securing the Editor

In previous releases, the editor could be secured using HTTP Basic Authentication by hardcoding a username/password in the settings file. Whilst that worked for simple local installations of node-red, it was never really a good solution.

This release brings a better framework for securing the editor.

Rather than use basic authentication, we have moved to an access token based system. When a user logs in, we exchange their username/password for an access token, which can then be used to make authenticated requests to the API. For those technically minded, we've implemented Resource Owner Password Credentials Grant of OAuth 2.0 (RFC 6749, Section 4.3).

You can still hardcode username/passwords if that's right for you, but you can also plug in your own code to validate users.

We've also added the concept of user permissions; identifying what an individual user can and can't do. This makes it simple to give a user read-only access to the editor - so they can see the flows, but cannot deploy back any changes.

More details on how to configure and enable this feature is available in the [documentation](http://nodered.org/docs/security.html).


#### Other Editor changes

- The [node status option](http://blog.nodered.org/2014/06/26/version-0-8-0-released/#nodestatusindicators) is now enabled by default. The editor remembers what state you set it to (as well as whether you have the sidebar open or not).
- The order of the palette categories can be customised in the settings file - useful if you have some custom nodes you want at the top of the palette, for example.

#### Raspberry Pi GPIO nodes

The Raspberry Pi GPIO nodes have had a major update.

They now sit on top of the built-in RPi.GPIO python library - and as long as it is at version 0.5.8 or newer it uses interrupts for the detection of inputs, so is much quicker to respond and uses much less cpu than the previous method of polling.

They also now support software pwm on all outputs, so fading of LEDS and speed control of motors is now possible.

This RPI.GPIO library is part of all recent Raspbian distributions so should be there by default unless you haven't upgraded in a while. If your install is broken you will need to upgrade your Pi to make sure you have the necessary files.

    sudo apt-get update
    sudo apt-get install python-dev python-rpi.gpio

you should then be able to run

    <node-red install dir>/nodes/core/hardware/nrgpio ver 0

and it should reply  0.5.8  (or better) - this is the version of the RPi.GPIO library.

Latest instructions are [here](http://nodered.org/docs/hardware/raspberrypi.html).


#### Node updates
- Function node - runtime errors reported with line number
- MQTT - receive binary payloads
- HTTP Request - receive binary payloads
- IRC node - improved connection reliability
- Debug node - you can now set what property should be sent to debug, rather than assume `msg.payload`.
- Mongo node - new skip option for pagination of results
- Switch node - rules can be reordered by dragging them around the list.
- Raspberry Pi Mouse node - this allows a USB connected mouse to provide clicks as inputs to flows. It supports 2 or 3 button mice and is specifically for the Raspberry Pi.

#### Deprecated nodes
The nodes we [deprecated](http://blog.nodered.org/2014/09/24/version-0-9-0-released/#deprecatednodes) over the last couple releases have been removed.

### Supported versions of Node
At this time, we **do not** support running on the newly [released node v0.12](http://blog.nodejs.org/2015/02/06/node-v0-12-0-stable/). We'll be working to add support, but that will be largely dependant on the maintainers of the modules we use to add in support where it's missing. That's likely to be true for many node.js applications for a while yet.

A consequence of adding support for v0.12 we will be **dropping support for v0.8** after this release.

### Raspberry Pi 2
With the surprise (well, it was to us) release of the Raspberry Pi 2, there has naturally been a lot of interest in getting Node-RED running on it. The main stumbling block has been getting a properly built version of node.js on there. [This page](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions) has a guide that should get it installed.

Note that currently, the GPIO nodes are known not to work; they are awaiting an update to the underlying libraries, which an `apt-get upgrade` should pick up eventually.
