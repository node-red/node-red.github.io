---
layout: default
title: Raspberry Pi
---

There are two ways to get started with Node-RED on a Raspberry Pi.

  - use the version preinstalled in the November 2015 **Raspbian Jessie** image
  - or **manual install** from the `npm` repository - see [further below](#manual-install).

You can then start [using the editor](#using-the-editor).

## Raspbian Jessie

As of the November 2015 version of Raspbian Jessie, Node-RED comes preinstalled on
the SD card image that can be downloaded from [RaspberryPi.org](https://www.raspberrypi.org/downloads/raspbian/).

If you already have an older version of Jessie, you can install or upgrade Node-RED
using the standard package manager:

    sudo apt-get update
    sudo apt-get install nodered

#### Running Node-RED

To start Node-RED, you can either:

  - on the Desktop, select `Menu -> Programming -> Node-RED`.
  - or run `node-red-start` in a new terminal window.

To stop Node-RED, run the command `node-red-stop`.

#### Autostart on boot (preloaded versions)

If you want Node-RED to run when the Pi boots up you can use one of the following
commands depending on the version you have installed.

For version 0.12.1 of Node-RED - SD card Jessie Nov 2015:

    sudo update-rc.d nodered defaults

For version 0.12.5 of Node-RED and later:

    sudo systemctl enable nodered.service

#### Adding nodes

To add additional nodes you must first install the `npm` tool, as it is not included
in the default installation. The following commands install `npm` and then upgrade
it to the latest `2.x` version.

    sudo apt-get install npm
    sudo npm install -g npm@2.x
    hash -r
    cd ~/.node-red
    npm install node-red-{example node name}

*Note:* npm version 3 is the latest version, but is currently *not* recommended for use.

#### Upgrading

To update Node-RED, you can use the standard package manager:

    sudo apt-get update
    sudo apt-get install nodered

This will grab the latest version that has been made available on the Raspbian
repositories. *Note*: there may be a slight delay between a release being made
to the `npm` repositories and it being available in Raspbian.

#### Next

You can now start [using the editor](#using-the-editor).

----

## Manual install

### Using newer versions of node.js

The pre-install uses the default node.js within Debian Jessie, which is version
0.10.29. You may wish to use more recent versions of Node.js such as v0.12.x or v4.2.x

To do this you must uninstall the built-in version and re-install using the
instructions below. To uninstall:

    sudo apt-get remove nodered
    sudo apt-get remove nodejs nodejs-legacy
    sudo apt-get remove npm   # if you installed npm

This will remove all the built in packages but leave your workspace - by default
at `~/.node-red` . You may then proceed to re-install as per instructions below

#### Install Node.js

As the Pi 2 uses a different processor (Arm v7) compared with the original
Pi (Arm v6) the method of installing node.js is slightly different.

##### Raspberry Pi 2

To install Node.js on Pi 2 - and other Arm7 processor based boards, run
the following commands:

    curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
    sudo apt-get install -y build-essential python-rpi.gpio nodejs

This also installs some additional dependencies.

##### Raspberry Pi

The simplest way to install Node.js and other dependencies on Pi (version 1), Pi Zero, Pi A+/B+ is

    wget http://node-arm.herokuapp.com/node_archive_armhf.deb
    sudo dpkg -i node_archive_armhf.deb
    sudo apt-get install build-essential python-rpi.gpio

### Install Node-RED

Install the latest stable version of Node-RED using node's package manager, npm:

    sudo npm cache clean
    sudo npm install -g --unsafe-perm  node-red

<div class="doc-callout">
<em>Note</em>: During the install some errors may be reported by the <code>node-gyp</code>
command. These are typically <em>non-fatal</em> errors and are related to optional dependencies
that require a compiler in order to build them. <b>Node-RED will work without these
optional dependencies</b>, but you may find additional node modules that require the
ability to compile native code. You can find out how to install the <code>node-gyp</code>
compiler dependencies <a href="https://github.com/TooTallNate/node-gyp#installation">here</a>.
</div>

If there are any npm errors (not warnings, not gyp errors) during install, try
running `sudo npm cache clean` and re-trying the install. `npm` should be version
2.x. Type `npm -v` to check.

<div class="doc-callout"><em>Note</em>: the reason for using the
<code>--unsafe-perm</code> option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather shows up any real errors instead.</div>

For alternative install options, see the [main installation instructions](../getting-started/installation#install-node-red).

#### Accessing GPIO

If you plan to access the GPIO pins with Node-RED, you should verify which version of the Python RPi.GPIO libraries are installed.

Node-RED includes a Raspberry Pi specific script `nrgpio` for interacting with
the hardware GPIO pins. If you have installed as a global npm module, this script should be located at:

    /usr/lib/node_modules/node-red/nodes/core/hardware/nrgpio ver
    or
    /usr/local/lib/node_modules/node-red/nodes/core/hardware/nrgpio ver

You must have at least 0.5.11 for the Pi2 or 0.5.8 for the original Pi.
If you do not then the following commands will install the latest available:

    sudo apt-get update && sudo apt-get install python-rpi.gpio

If you want to run as a user other than pi (or root), you will need either to add that user to
the [sudoers list](https://www.raspberrypi.org/documentation/linux/usage/users.md) - or maybe just access to python - for example by adding the
following to sudoers using visudo.

    NodeREDusername ALL=(ALL) NOPASSWD: /usr/bin/python


#### Serial port on Raspbian Wheezy

If you want to use the serial port node with Node.js v0.10.x or v0.12.x and
have manually installed Node-RED on Raspbian Wheezy, you will need to manually
install a specific version of the serial port node. To do this:

    sudo npm i -g --unsafe-perm node-red-node-serialport@0.0.5

### Starting Node-RED

Due to the constrained memory available on the Raspberry Pi, it is necessary to
run Node-RED with the `node-red-pi` command. This allows an additional argument
to be provided that sets at what point Node.js will begin to free up unused memory.

When starting with the `node-red-pi` script, the `max-old-space-size` option should
be specified:

    node-red-pi --max-old-space-size=128

If you decide to run Node-RED using the node command directly, this option must
appear between node and red.js.

    node --max-old-space-size=128 red.js

This option limits the space it can use to 128MB before cleaning up. If you are
running nothing else on your Pi you can afford to increase that figure to 256
and possibly even higher. The command `free -h` will give you some clues as to
how much memory is currently available.

**Note**: The pre-installed version of Node-RED on Raspbian that uses the `node-red-start`
command also sets it to 128MB by default. If you do want to change that, the
file you need to edit (as sudo) is `/lib/systemd/system/nodered.service`. See
below for how to add this to a manually installed version.

#### Adding Autostart capability using SystemD

The preferred way to autostart Node-RED on Pi is to use the built in systemd
capability.  The pre-installed version does this by using a `nodered.service`
file and start and stop scripts. You may install these by running the following
commands

    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-start -O /usr/bin/node-red-start
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-stop -O /usr/bin/node-red-stop
    sudo chmod +x /usr/bin/node-red-st*
    sudo systemctl daemon-reload

**Info:** These commands are run as root (sudo) - They download the three required
files to their correct locations, make the two scripts executable and then
reload the systemd daemon.

Node-RED can then be started and stopped by using the commands `node-red-start`
and `node-red-stop`

To then enable Node-RED to run automatically at every boot and upon crashes

    sudo systemctl enable nodered.service

It can be disabled by

    sudo systemctl disable nodered.service

Systemd uses the `/var/log/system.log` for logging.  To filter the log use

    sudo journalctl -f -u nodered -o cat


## Using the Editor

Once Node-RED is running - point a browser to the machine where Node-RED is running.
One way to find the IP address of the Pi is to use the command

    hostname -I

Then browse to `http://{the-ip-address-returned}:1880/`

<div class="doc-callout">
 <em>Note:</em> the default browser included in Raspbian, Epiphany,
has some quirks that mean certain keyboard short-cuts do not work within the
Node-RED editor. We <b>strongly</b> recommend installing the Iceweasel browser instead:
<pre>
    sudo apt-get install iceweasel
</pre>
</div>

You can then start creating your [first flow](../getting-started/first-flow).

## Extra Nodes

To install extra nodes make sure you are in your user-directory, by default this is `~/.node-red`.

     cd ~/.node-red

There are some extra hardware specific nodes (e.g. for the Pibrella, PiFace and
LEDBorg plug on modules, Neopixel leds, temperature sensors, etc) available via the **[flows library](http://flows.nodered.org/)**.
For example the Pibrella node can be installed as follows

    cd ~/.node-red
    npm install node-red-node-pibrella

You then need to stop and restart Node-RED to load the new nodes, and then refresh the flow editor page in the browser.

    node-red-stop
    node-red-start

There is a [command line admin](../node-red-admin) tool that may be useful if you need to do this a lot.

## Interacting with the Pi hardware

There are several ways of interacting with a Raspberry Pi using Node-RED.

**rpi-gpio nodes**  (default)
: provided in the palette for monitoring and controlling the GPIO
  pins. This is the simplest and recommended method.

**contrib-gpio nodes** (optional)
: additional nodes from @monteslu that provide generic gpio support for Pi, BeagleBone, Arduino, Edison, etc. They can be installed from [here](https://github.com/monteslu/node-red-contrib-gpio).

**wiring-pi module** (advanced)
: this provides more complete access to the GPIO pins, and other devices, within
  Function nodes. This gives more control and access to other features not in
  the nodes but you have to program it yourself.


### rpi-gpio nodes

These use a python `nrgpio` command as part of the core install.
This provides a way of controlling the GPIO pins via nodes in the Node-RED palette.


#### First Flow - Blink - gpio

To run a "blink" flow that toggles an LED on Pin 11 of the GPIO header, you will
need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.


        [{"id":"ae05f870.3bfc2","type":"function","name":"Toggle 0/1 on input","func":"\ncontext.state = context.state || 0;\n\n(context.state == 0) ? context.state = 1 : context.state = 0;\nmsg.payload = context.state;\n\nreturn msg;","outputs":1,"x":348.1666488647461,"y":146.16667652130127,"wires":[["1b0b73e9.14712c","b90e5005.a7c3b8"]]},{"id":"1b0b73e9.14712c","type":"debug","name":"","active":true,"x":587.1666488647461,"y":206.1666774749756,"wires":[]},{"id":"7aa75c69.fd5894","type":"inject","name":"tick every 1 sec","topic":"","payload":"","repeat":"1","crontab":"","once":false,"x":147.1666488647461,"y":146.1666774749756,"wires":[["ae05f870.3bfc2"]]},{"id":"b90e5005.a7c3b8","type":"rpi-gpio out","name":"","pin":"7","x":585.0000114440918,"y":146.00001049041748,"wires":[]}]


Click the deploy button and the flow should start running. The LED should start
toggling on and off once a second.


### wiring-pi module

This section is for advanced users only.
In general most users will not need to do this.

This version of working with the Raspberry Pi uses a node.js wrapper to the
WiringPi libraries previously installed, and so
gives all functions you write access to the Pi capabilities at all times, so
you can do more complex things, at the expense of having to write code within a
function rather than dragging and wiring nodes.

#### Installation

After installing Node-RED, follow these [instructions](http://wiringpi.com/download-and-install/)
to get Wiring Pi installed.

#### Configuring Node-RED

Firstly the wiring-pi npm module needs to be installed into the same directory as your
`settings.js` file.

    cd ~/.node-red
    npm install wiring-pi

This does not add any specific nodes to Node-RED. Instead the Wiring-Pi module can be made
available for use in Function nodes.

To do this, edit your `settings.js` file to add the `wiring-pi` module to the Function
global context section:

    functionGlobalContext: {
        wpi: require('wiring-pi')
    }

The module is then available to any functions you write as `context.global.wpi`.

#### Blink - Wiring-Pi

To run a "blink" flow that uses the WiringPi pin 0 - Pin 11 on the GPIO header,
you will need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.

    [{"id":"860e0da9.98757","type":"function","name":"Toggle LED on input","func":"\n// select wpi pin 0 = pin 11 on header (for v2)\nvar pin = 0;\n\n// initialise the wpi to use the global context\nvar wpi = context.global.wpi;\n\n// use the default WiringPi pin number scheme...\nwpi.setup();\n\n// initialise the state of the pin if not already set\n// anything in context.  persists from one call to the function to the next\ncontext.state = context.state || wpi.LOW;\n\n// set the mode to output (just in case)\nwpi.pinMode(pin, wpi.modes.OUTPUT);\n\n// toggle the stored state of the pin\n(context.state == wpi.LOW) ? context.state = wpi.HIGH : context.state = wpi.LOW;\n\n// output the state to the pin\nwpi.digitalWrite(pin, context.state);\n\n// we don't \"need\" to return anything here but may help for debug\nreturn msg;","outputs":1,"x":333.16666412353516,"y":79.16666793823242,"wires":[["574f5131.36d0f8"]]},{"id":"14446ead.5aa501","type":"inject","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":113.16666412353516,"y":59.16666793823242,"wires":[["860e0da9.98757"]]},{"id":"574f5131.36d0f8","type":"debug","name":"","active":true,"x":553.1666641235352,"y":99.16666793823242,"wires":[]}]


Click the `Deploy` button and the flow should start running. The LED should start
toggling on and off once a second.
