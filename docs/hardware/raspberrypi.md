---
layout: default
title: Raspberry Pi
---

There are two ways to get started with Node-RED on a Raspberry Pi.

  - use the version preinstalled in the November 2015 Raspbian Jessie image
  - or install manually from the `npm` repository - see [here](#installing-via-npm).

### Raspbian Jessie

As of the November 2015 version of Raspbian Jessie, Node-RED comes preinstalled on
the SD card image that can be downloaded from [here](https://www.raspberrypi.org/downloads/raspbian/).

If you already have an older version of Jessie, you can install Node-RED using the
standard package manager:

    sudo apt-get update
    sudo apt-get install nodered

#### Running Node-RED

To start Node-RED, you can either:

  - on the Desktop, select `Menu -> Programming -> Node-RED`.
  - or run `node-red-start` in a new terminal window

To stop Node-RED, run `node-red-stop`.

To set Node-RED to run automatically on boot see [here](#making-node-red-autostart-on-boot).

#### Adding nodes

To add additional nodes you must first install the `npm` tool, as it is not included
in the default installation. The following commands installs `npm` and then upgrades
it to the latest `2.x` version.

    sudo apt-get install npm
    sudo npm install -g npm@2.x
    cd ~/.node-red
    npm install node-red-{example node name}

#### Upgrading

To update Node-RED, you can use the standard package manager:

    sudo apt-get update
    sudo apt-get install nodered

This will grab the latest version that has been made available on the Raspbian
repositories. *Note*: there may be a slight delay between a release being made
to the `npm` repositories and it being available in Raspbian.

#### Autostart on boot (preloaded version 0.12.1)

If you want Node-RED to run when the Pi boots up you can use one of the following
commands depending on the version you have installed.

For version 0.12.1 of Node-RED version (the version that comes preinstalled on Jessie):

    sudo update-rc.d nodered defaults


#### Using newer versions of node.js

This pre-install uses the default node.js within Debian Jessie, which is version
0.10.29. You may wish to use more recent versions of Node.js such as v0.12.x or v4.2.x

To do this you must uninstall the built-in version and re-install using the
instructions below. To uninstall:

    sudo apt-get remove nodered
    sudo apt-get remove nodejs nodejs-legacy
    sudo apt-get remove npm   # if you installed npm

This will remove all the built in packages but leave your workspace - by default
at `~/.node-red` . You may then proceed to re-install as per instructions below.


### Installing via npm

If you want to install directly from `npm` you *must* first uninstall the preinstalled
version if you are running on Raspbian Jessie:

    sudo apt-get remove nodered


#### Install Node.js

As the Pi 2 uses a different processor (Arm v7) compared with the original
Pi (Arm v6) the method of installing node.js is slightly different.

##### Raspberry Pi 2

To install Node.js on Pi 2 - and other Arm7 processor based boards, run
the following commands:

    curl -sL https://deb.nodesource.com/setup_4.x | sudo bash -
    sudo apt-get install -y build-essential python-dev python-rpi.gpio nodejs

This also installs some additional dependencies.

If you are upgrading a Raspberry Pi version 1 image for the Pi 2, it is recommended
to clean up some hidden node directories before installing Node-RED:

    sudo npm cache clean

##### Raspberry Pi

The simplest way to install Node.js and other dependencies on Pi (version 1) is

    wget http://node-arm.herokuapp.com/node_archive_armhf.deb
    sudo dpkg -i node_archive_armhf.deb
    sudo apt-get install build-essential python-dev python-rpi.gpio

#### Install Node-RED

The easiest way to install Node-RED is to use node's
package manager, npm:

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
1.4.28 or better. Type `npm -v` to check.


<div class="doc-callout"><em>Note</em>: the reason for using the
<code>--unsafe-perm</code> option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather shows up any real errors instead.</div>

For alternative install options, see the [main installation instructions](../getting-started/installation.html#install-node-red).

Once installed, you should verify which version of the Python RPi.GPIO libraries
have been installed.

Node-RED includes a Raspberry Pi specific script `nrgpio` for interacting with
the hardware GPIO pins. This script can also be used to check what version of
the underlying library is installed:

    <node-red-install-directory>/nodes/core/hardware/nrgpio ver 0

<div class="doc-callout">If you have installed as a global npm module, this script will be located at:
<pre>/usr/local/lib/node_modules/node-red/nodes/core/hardware/nrgpio</pre>
</div>

This command should return 0.5.11 or newer. You must have at least 0.5.11 for the Pi2 and
0.5.8 for the original Pi. If you do not then the following commands will grab
the latest available:

    sudo apt-get update && sudo apt-get install python-dev python-rpi.gpio

<div class="doc-callout">
Using RPi.GPIO is a change from our using WiringPi in v0.9.1 - the main benefits
are that we can get software PWM on all output pins, and easier access to
interrupts on inputs meaning faster response times (rather than polling).
</div>

#### Serial port on Raspbian Wheezy

If you want to use the serial port node with Node.js v0.10.x or v0.12.x and
have manually installed Node-RED on Raspbian Wheezy, you will need to manually
install a specific version of the serial port node. To do this:

    cd ~/.node-red
    npm install node-red-node-serialport@0.0.5

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
    sudo systemctl enable nodered.service

**Note:** These commands are run as root (sudo) - It downloads the three required files to their correct locations, makes the two scripts executable, reloads the systemd daemon and then enables the service.

It is configured to restart at boot time and upon crashes. It can be disabled by

    sudo systemctl disable nodered.service

Systemd uses the `/var/log/system.log` for logging.  To filter the log use

    sudo journalctl -f -u nodered -o cat

For further options see [Starting Node-RED on boot](../getting-started/running.html#starting-node-red-on-boot).


### Using the Editor

Once Node-RED is running - point a browser to the machine where Node-RED is running.
One way to find the IP address of the Pi is to use the command

    hostname -I

Then browse to `http://{the-ip-address-returned}:1880/`

<div class="doc-callout">
 <em>Note:</em> the default browser included in Raspbian, Ephiphany,
has some quirks that mean certain keyboard short-cuts do not work within the
Node-RED editor. We recommend installing the Iceweasel browser instead:
<pre>
    sudo apt-get install iceweasel
</pre>
</div>

### Accessing GPIO pins

The RPi.GPIO library requires root access in order to configure and manage the GPIO pins.
For us that means that the **nrgpio** command must be executable by the user that is running Node-RED.
That user **must** have root access to run python in order to access the pins
directly. The default user pi does have this access and is the recommended user
with which to run Node-RED.

If you want to run as a different user you will need either to add that user to
the sudoers list - or maybe just access to python - for example by adding the
following to sudoers using visudo.

    NodeREDusername ALL=(ALL) NOPASSWD: /usr/bin/python

We are currently looking at ways to reduce this exposure further.

### Extra Nodes

There are also some extra hardware specific nodes (for the Pibrella, PiFace and
LEDBorg plug on modules) available via [npm](https://www.npmjs.com/search?q=node-red-node-+).
For example the Pibrella node can be installed as follows

    cd ~/.node-red
    npm install node-red-node-pibrella

***

### Interacting with the Pi hardware

There are two main ways of interacting with a Raspberry Pi using Node-RED.

**rpi-gpio nodes**  (default)
: provided in the palette for monitoring and controlling the GPIO
  pins. This is the simplest and recommended way.

**wiring-pi module** (optional)
: this provides complete access to the GPIO pins, and other devices, within
  Function nodes. This gives more control and access to other features not in
  the nodes but you have to program it yourself.


### rpi-gpio nodes

These use a python `nrgpio` command as part of the core install that can be
found in {node-red-install-directory}/nodes/core/hardware

This provides a way of controlling the GPIO pins via nodes in the Node-RED palette.


### First Flow - Blink - gpio

To run a "blink" flow that toggles an LED on Pin 11 of the GPIO header, you will
need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.


        [{"id":"ae05f870.3bfc2","type":"function","name":"Toggle 0/1 on input","func":"\ncontext.state = context.state || 0;\n\n(context.state == 0) ? context.state = 1 : context.state = 0;\nmsg.payload = context.state;\n\nreturn msg;","outputs":1,"x":348.1666488647461,"y":146.16667652130127,"wires":[["1b0b73e9.14712c","b90e5005.a7c3b8"]]},{"id":"1b0b73e9.14712c","type":"debug","name":"","active":true,"x":587.1666488647461,"y":206.1666774749756,"wires":[]},{"id":"7aa75c69.fd5894","type":"inject","name":"tick every 1 sec","topic":"","payload":"","repeat":"1","crontab":"","once":false,"x":147.1666488647461,"y":146.1666774749756,"wires":[["ae05f870.3bfc2"]]},{"id":"b90e5005.a7c3b8","type":"rpi-gpio out","name":"","pin":"7","x":585.0000114440918,"y":146.00001049041748,"wires":[]}]


Click the deploy button and the flow should start running. The LED should start
toggling on and off once a second.

***

### wiring-pi module

This version of working with the Raspberry Pi uses a node.js wrapper to the
WiringPi libraries previously installed, and so
gives all functions you write access to the Pi capabilities at all times, so
you can do more complex things, at the expense of having to write code within a
function rather than dragging and wiring nodes.

#### Installation

After installing Node-RED, follow these [instructions](http://wiringpi.com/download-and-install/)
to get Wiring Pi installed.

#### Configuring Node-RED

Firstly the npm module needs to be installed into the same directory as your
`settings.js` file.

    cd ~/.node-red
    npm install wiring-pi

This does not add any specific nodes to Node-RED. Instead the Wiring-Pi module can be made
available for use in Function nodes.

To do this, update `settings.js` to add the `wiring-pi` module to the Function
global context:

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
