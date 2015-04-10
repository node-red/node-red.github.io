---
layout: default
title: BeagleBone Black
---

The BeagleBoneBlack already has Node.js baked into it's OS, so some of these tips are optional.

<div class="doc-callout">
<em>Note:</em> we are soon deprecating Node v0.8 support - these instructions only apply to the
Debian versions of BeagleBoneBlack. <a href="http://beagleboard.org/latest-images">http://beagleboard.org/latest-images</a>
</div>


#### Upgrading Node.js (Optional)

You need Node.js v0.10.x which should be installed by default on the BBB so this step is optional.
To update Node.js on BBB - checkout the instructions halfway down this page [http://elinux.org/Beagleboard:BeagleBoneBlack_Debian](http://elinux.org/Beagleboard:BeagleBoneBlack_Debian)

In particular the lines about adding an updated repo to /etc/apt/sources.list

    sudo sh -c "echo 'deb [arch=armhf] http://repos.rcn-ee.net/debian wheezy main' >> /etc/apt/sources.list"
    sudo sh -c "echo '#deb-src [arch=armhf] http://repos.rcn-ee.net/debian wheezy main' >> /etc/apt/sources.list"

Then update the packages

    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install npm --reinstall

#### Installing Node-RED

The easiest way to install Node-RED is to use node's package manager, npm:

    sudo npm install -g --unsafe-perm  node-red

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but only sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather shows up any real errors instead.

For alternative install options, see the [main installation instructions](../getting-started/installation.html#install-node-red).


#### BBB specific nodes

There are some BBB specific nodes now available in our [node-red-nodes project on Github](https://github.com/node-red/node-red-nodes/tree/master/hardware/BBB).

These give you direct access to the I/O pins in the simplest possible manner. The easiest way to install them is direct from npm

    cd ~/.node-red
    npm install node-red-node-beaglebone

#### Starting Node-RED

Due to the constrained memory available on the BBB, it is advisable to
run Node-RED with the `node-red-pi` command. For details and other options such as auto-starting
on boot, follow the [Running Node-RED](../getting-started/running.html) instructions.

#### Using the Editor

Once Node-RED is started, assuming you haven't changed the hostname, point a
browser to [http://beaglebone.local:1880](http://beaglebone.local:1880).

#### First Flow - Hello World

To run a "hello world" flow that toggles the USR2 and USR3 LEDs, copy the following flow
and paste it into the Import Nodes dialog (*Import From - Clipboard* in the
dropdown menu, or Ctrl-I). After clicking okay, click in the workspace to place
the new nodes.

    [{"id":"b1fce44.9ce3c18","type":"inject","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":127.16666412353516,"y":109.16666412353516,"wires":[["b2a66e5e.6da6f"]]},{"id":"591aef4d.b55f38","type":"inject","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":127.16666412353516,"y":149.16666412353516,"wires":[["b2a66e5e.6da6f"]]},{"id":"36f2a960.164f76","type":"inject","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":127.16666412353516,"y":49.166664123535156,"wires":[["7ee460bc.df48e"]]},{"id":"55249ec9.21e61","type":"debug","name":"","active":true,"x":567.1666641235352,"y":89.16666412353516,"wires":[]},{"id":"7ee460bc.df48e","type":"function","name":"Toggle USR3 LED on input","func":"\nvar pin = \"USR3\"\nvar b = context.global.bonescript;\ncontext.state = context.state || b.LOW;\n\nb.pinMode(pin, b.OUTPUT);\n\n(context.state == b.LOW) ? context.state = b.HIGH : context.state = b.LOW;\nb.digitalWrite(pin, context.state);\n\nreturn msg;","outputs":1,"x":347.16666412353516,"y":69.16666412353516,"wires":[["55249ec9.21e61"]]},{"id":"b2a66e5e.6da6f","type":"function","name":"Set USR2 LED on input","func":"\nvar pin = \"USR2\";\nvar b = context.global.bonescript;\n\nb.pinMode(pin, b.OUTPUT);\n\nvar level = (msg.payload === \"1\")?1:0;\nb.digitalWrite(pin, level);\n\nreturn msg;","outputs":1,"x":347.16666412353516,"y":129.16666412353516,"wires":[["55249ec9.21e61"]]}]

Click the deploy button and the flow should start running. The USR2 and USR3 LEDs
can be manually set on or off using the Inject node buttons.

#### Advanced functions

For experts, the `bonescript` module can be made available for use in Function nodes.

To do this, update `settings.js` to add the `bonescript` module to the
Function global context:

    functionGlobalContext: {
        bonescript:require('bonescript')
    }

The module is then available to any functions you write as `context.global.bonescript`.
