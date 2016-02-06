---
layout: default
title: BeagleBone Black
---

The BeagleBoneBlack already has Node.js baked into it's OS, so some of these
tips are optional.

<div class="doc-callout">
These instructions only apply to the Debian versions of BeagleBoneBlack. <a href="http://beagleboard.org/latest-images">http://beagleboard.org/latest-images</a>
</div>

#### Before you start

Make sure the local time is set correctly. The Beaglebone Black does not have a
battery backed real time clock so needs to be set on every boot in order for
software certificates date checks to be valid.

    ntpdate -b -s -u pool.ntp.org

#### Updating npm

We recommend using at least npm version 2.x as it supports extras like the
serialport module more fully.

    sudo npm i -g npm@2.x
    hash -r

#### Installing Node-RED

The easiest way to install Node-RED is to use node's package manager, npm:

    sudo npm install -g --unsafe-perm  node-red

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but only sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather, shows up any real errors instead.

For alternative install options, see the [main installation instructions](../getting-started/installation.html#install-node-red).

#### BBB specific nodes

There are some BBB specific nodes now available in our [node-red-nodes project on Github](https://github.com/node-red/node-red-nodes/tree/master/hardware/BBB).

These give you direct access to the I/O pins in the simplest possible manner.
The easiest way to install them is direct from npm.

For Debian Jessie based builds with kernel 4.x run the following commands in the root
directory of your Node-RED install. This is usually `~/.node-red`

    sudo npm install -g --unsafe-perm node-red-node-beaglebone

For previous versions of Debian (eg Wheezy) - use the older version of this node.

    sudo npm install -g --unsafe-perm node-red-node-beaglebone@0.0.8

#### Starting Node-RED

Due to the constrained memory available on the BBB, it is advisable to
run Node-RED with the `node-red-pi` command. For details and other options such
as auto-starting on boot, follow the [Running Node-RED](../getting-started/running.html)
instructions.

To access the GPIO pins it is currently necessary to run as root :

    sudo node-red-pi

There are ways to avoid this using udev rules and groups and so on - but that is
beyond the scope of this readme. Google is your friend.

#### Using the Editor

Once Node-RED is started, assuming you haven't changed the hostname, point a
browser to [http://beaglebone.local:1880](http://beaglebone.local:1880).

#### First Flow - Hello World

To run a "hello world" flow that toggles the USR2 and USR3 LEDs, copy the following flow
and paste it into the Import Nodes dialog (*Import From - Clipboard* in the
dropdown menu, or Ctrl-I). After clicking okay, click in the workspace to place
the new nodes.

    [{"id":"184087e6.e7bf78","type":"inject","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":370,"y":188,"z":"345c8adc.cba376","wires":[["919e132f.6e61f"]]},{"id":"25e4d6c.fda1b2a","type":"inject","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":370,"y":228,"z":"345c8adc.cba376","wires":[["919e132f.6e61f"]]},{"id":"6be2c4b9.941d3c","type":"bbb-discrete-out","pin":"USR2","inverting":false,"toggle":false,"defaultState":"0","name":"","x":613,"y":136,"z":"345c8adc.cba376","wires":[[]]},{"id":"919e132f.6e61f","type":"bbb-discrete-out","pin":"USR3","inverting":false,"toggle":false,"defaultState":"0","name":"","x":619,"y":193,"z":"345c8adc.cba376","wires":[[]]},{"id":"1cf2bd40.e30d43","type":"inject","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":368,"y":102,"z":"345c8adc.cba376","wires":[["6be2c4b9.941d3c"]]},{"id":"3e4caa12.c1b356","type":"inject","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":368,"y":142,"z":"345c8adc.cba376","wires":[["6be2c4b9.941d3c"]]}]

Click the deploy button and the flow should start running. The USR2 and USR3 LEDs
can be manually set on or off using the Inject node buttons.

#### Advanced functions

For experts, the `octalbonescript` module can be made available for use inside
Function nodes. This is NOT necessary for simple use with the built in nodes.

To do this, first install the `octalbonescript` library - see
[the octalbonescript readme](https://github.com/theoctal/octalbonescript)
for detailed install instructions depending on your kernal, but for debian squeeze it will be

    cd ~/.node-red
    npm i octalbonescript

Then update `settings.js` to add the `octalbonescript` module to the
Function global context - to do this :

When you run node-red it will print the location of `settings.js` like

    [info] Settings file  : /root/.node-red/settings.js

Edit this `settings.js` file. And there we need to uncomment the octalbonescript library line.

    functionGlobalContext: {
        octalbonescript:require('octalbonescript')
    },

The module is then available to any functions you write as `context.global.octalbonescript`.

An example flow that demonstrates this is below :

    [{"id":"e370f54b.baa368","type":"inject","z":"e524537e.2ec11","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":150,"y":320,"wires":[["383a5612.0d587a"]]},{"id":"cba5ca3b.02b978","type":"inject","z":"e524537e.2ec11","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":150,"y":360,"wires":[["383a5612.0d587a"]]},{"id":"b545aca3.75e4e","type":"inject","z":"e524537e.2ec11","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":150,"y":260,"wires":[["ebbe2d86.c74b2"]]},{"id":"49b03095.64b31","type":"debug","z":"e524537e.2ec11","name":"","active":true,"x":630,"y":260,"wires":[]},{"id":"ebbe2d86.c74b2","type":"function","z":"e524537e.2ec11","name":"Toggle USR3 LED on input","func":"\nvar pin = \"USR3\"\nvar b = context.global.octalbonescript;\ncontext.state = context.state || b.LOW;\n\nb.pinModeSync(pin, b.OUTPUT);\n\n(context.state == b.LOW) ? context.state = b.HIGH : context.state = b.LOW;\nb.digitalWrite(pin, context.state);\n\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":260,"wires":[["49b03095.64b31"]]},{"id":"383a5612.0d587a","type":"function","z":"e524537e.2ec11","name":"Set USR2 LED on input","func":"\nvar pin = \"USR2\";\nvar b = context.global.octalbonescript;\n\nb.pinModeSync(pin, b.OUTPUT);\n\nvar level = (msg.payload === \"1\")?1:0;\nb.digitalWrite(pin, level);\n\nreturn msg;","outputs":1,"noerr":0,"x":370,"y":320,"wires":[["49b03095.64b31"]]}]
