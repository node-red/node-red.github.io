---
layout: default
title: Running on BeagleBone Boards
---

We recommend using the latest SD card images based on Debian 9.3 Stretch - from https://beagleboard.org/latest-images

The 4GB images for BeagleBone boards already have Node-RED pre-installed and set to auto-start, so you can just boot
and point your browser at your BeagleBone, port 1880.

To view the Node-RED log

        sudo journalctl -f -u node-red -o cat

To stop Node-RED

        sudo service node-red stop

To start Node-RED

        sudo service node-red start


The 2GB console version suitable for flashing to older eMMC versions of the BBB will need to be installed as per below.

---

#### Upgrading 4GB images

The latest Debian images already have Node.js installed - the easiest way to upgrade is to use the built in upgrade tool:

        sudo apt update
        sudo apt upgrade nodejs bb-node-red-installer

If you are on the 2017 9.2 version you may need to run `apt-get dist-upgrade` first.

Then stop and restart Node-RED.

<div class="doc-callout">
Note: Do NOT use the Raspberry Pi / Debian upgrade script (`update-nodejs-and-nodered`) as it will re-install both Node.js and Node-RED
in different locations and will conflict with the existing systemd configuration files.
</div>

#### Before you start

If you are using the 2GB eMMC version of Debian it has been stripped right down so you may need to install some
utility functions first

    sudo apt-get update
    sudo apt-get install -y curl locales ntpdate avahi-utils python build-essential

Make sure the local time is set correctly. The BeagleboneBlack does not have a
battery backed real time clock so needs to be set on every boot in order for
software certificates date checks to be valid.

    ntpdate -b -s -u pool.ntp.org

#### Updating Node.js

We recommend using Node.js LTS 6.x or 8.x

    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y build-essential nodejs
    hash -r

### Installing Node-RED

The easiest way to install Node-RED is to use node's package manager, npm:

    sudo npm i -g --unsafe-perm node-red

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but only sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather, shows up any real errors instead.

For other install options, e.g. to run in development mode from GitHub, see the [main installation instructions](../getting-started/installation#install-node-red).

#### BBB specific nodes

There are some BBB specific nodes that give you direct access to the I/O pins in the simplest possible manner.
The easiest way to install them is direct from npm.

For Debian Jessie based builds with kernel 4.x run the following commands in the user
directory of your Node-RED install. This is usually `~/.node-red`

    sudo npm install -g --unsafe-perm node-red-node-beaglebone

For previous versions of Debian (eg Wheezy) - use the older version of this node.

    sudo npm install -g --unsafe-perm node-red-node-beaglebone@0.0.8

An alternative option is to use the gpio nodes contributed by @monteslu that
are available [here](https://github.com/monteslu/node-red-contrib-gpio). These give more options for interfacing like i2c and software serial, as well as simple digital and analogue IO.

### Starting Node-RED

Due to the constrained memory available on the BBB, it is advisable to
run Node-RED with the `node-red-pi` command. For details and other options such
as auto-starting on boot, follow the [Running Node-RED](../getting-started/running)
instructions.

To access the GPIO pins it is currently necessary to run as root :

    sudo node-red-pi

There are ways to avoid this using udev rules and groups and so on - but that is
beyond the scope of this readme. Google is your friend.

#### Auto-starting

The simplest way to auto-start Node-RED on boot is to use the built in systemd.
To do this create a file `/lib/systemd/system/nodered.service` containing the following

    # systemd service file to start Node-RED
    [Unit]
    Description=Node-RED graphical event wiring tool.
    Wants=network.target
    Documentation=http://nodered.org/docs/hardware/raspberrypi.html
    [Service]
    Type=simple
    # Run as root user in order to have access to gpio pins
    User=root
    Group=root
    Nice=5
    Environment="NODE_OPTIONS=--max-old-space-size=128"
    #Environment="NODE_RED_OPTIONS=-v"
    ExecStart=/usr/bin/env node-red-pi $NODE_OPTIONS $NODE_RED_OPTIONS
    KillSignal=SIGINT
    Restart=on-failure
    SyslogIdentifier=Node-RED
    [Install]
    WantedBy=multi-user.target

Reload the systemd configuration, and enable the service

    sudo systemctl daemon-reload
    sudo systemctl enable nodered.service

Systemd uses the `/var/log/system.log` for logging.  To filter the log use

    sudo journalctl -f -u nodered -o cat

### Using the Editor

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
for detailed install instructions depending on your kernel, but for Debian Jessie it will be

    cd ~/.node-red
    npm i octalbonescript

Then update `settings.js` to add the `octalbonescript` module to the
Function global context - to find this run `node-red-pi`, and it will print the location of `settings.js` like

    [info] Settings file  : /root/.node-red/settings.js

Edit this `settings.js` file. And there we need to uncomment the octalbonescript library line.

    functionGlobalContext: {
        octalbonescript:require('octalbonescript')
    },

The module is then available to any functions you write as `context.global.octalbonescript`.

An example flow that demonstrates this is below :

    [{"id":"e370f54b.baa368","type":"inject","z":"e524537e.2ec11","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":150,"y":320,"wires":[["383a5612.0d587a"]]},{"id":"cba5ca3b.02b978","type":"inject","z":"e524537e.2ec11","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":150,"y":360,"wires":[["383a5612.0d587a"]]},{"id":"b545aca3.75e4e","type":"inject","z":"e524537e.2ec11","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":150,"y":260,"wires":[["ebbe2d86.c74b2"]]},{"id":"49b03095.64b31","type":"debug","z":"e524537e.2ec11","name":"","active":true,"x":630,"y":260,"wires":[]},{"id":"ebbe2d86.c74b2","type":"function","z":"e524537e.2ec11","name":"Toggle USR3 LED on input","func":"\nvar pin = \"USR3\"\nvar b = context.global.octalbonescript;\ncontext.state = context.state || b.LOW;\n\nb.pinModeSync(pin, b.OUTPUT);\n\n(context.state == b.LOW) ? context.state = b.HIGH : context.state = b.LOW;\nb.digitalWrite(pin, context.state);\n\nreturn msg;","outputs":1,"noerr":0,"x":380,"y":260,"wires":[["49b03095.64b31"]]},{"id":"383a5612.0d587a","type":"function","z":"e524537e.2ec11","name":"Set USR2 LED on input","func":"\nvar pin = \"USR2\";\nvar b = context.global.octalbonescript;\n\nb.pinModeSync(pin, b.OUTPUT);\n\nvar level = (msg.payload === \"1\")?1:0;\nb.digitalWrite(pin, level);\n\nreturn msg;","outputs":1,"noerr":0,"x":370,"y":320,"wires":[["49b03095.64b31"]]}]
