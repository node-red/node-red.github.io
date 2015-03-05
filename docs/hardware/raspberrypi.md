---
layout: default
title: Raspberry Pi
---

### Install Node.js

As the Pi 2 uses a different processor (Arm v7) compared with the original
Pi (Arm v6) the method of installing node.js is slightly different.

#### Raspberry Pi 2

To install Node.js on Pi 2 - and some other Arm7 processor based boards, run
the following commands:

    curl -sL https://deb.nodesource.com/setup | sudo bash -
    sudo apt-get install -y build-essential python-dev python-rpi.gpio nodejs

This also installs some additional dependencies.

If you are upgrading a Raspberry Pi version 1 image for the Pi 2, it is recommended
to clean up some hidden node directories before installing Node-RED:

    npm cache clear

#### Raspberry Pi

The simplest way to install Node.js and other dependencies on Pi (version 1) is

    wget http://node-arm.herokuapp.com/node_0.10.36_armhf.deb
    sudo dpkg -i node_0.10.36_armhf.deb
    sudo apt-get install build-essential python-dev python-rpi.gpio

### Install Node-RED

For Node-RED 0.10.4 or later, the easiest way to install Node-RED is to use node's
package manager, npm:

    sudo npm install -g node-red

_Note_: for alternative install options, see the [main installation instructions](../getting-started/installation.html#install-node-red).

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
<em>Change from Node-RED v0.9.1</em>: Using RPi.GPIO is a change from using WiringPi
- the main benefits are that we can get software PWM on all output pins, and easier access to
interrupts on inputs meaning faster response times (rather than polling).
</div>

### Starting Node-RED

Due to the constrained memory available on the Raspberry Pi, it is necessary to
run Node-RED with the `node-red-pi` command. This allows an additional argument
to be provided that sets at what point Node.js will begin to free up unused memory.

When starting with the `node-red-pi` script, the `max-old-space-size` option should
be specified:

    node-red-pi --max-old-space-size=128

If you decide to run Node-RED using the node command directly, this option must appear between node
and red.js.

    node --max-old-space-size=128 red.js

This option limits the space it can use to 128MB before cleaning up. If you are
running nothing else on your Pi you can afford to increase that figure to 256
and possibly even higher. The command `free -h` will give you some clues as to
how much memory is currently available.

### Making Node-RED autostart on boot (optional)

See [Starting Node-RED on boot](../getting-started/running.html#starting-node-red-on-boot) for Linux.


### Accessing GPIO pins

The RPi.GPIO library requires root access in order to configure and manage the GPIO pins.
For us that means that the **nrgpio** command must be executable by the user that is running Node-RED.
That user **must** have root access to run python in order to access the pins
directly. The default user pi does have this access and is the recommended user
with which to run Node-RED.

If you want to run as a different user you will need either to add that user to
the sudoers list - or maybe just access to python - for example by adding the following to sudoers using visudo.

    NodeREDusername ALL=(ALL) NOPASSWD: /usr/bin/python

We are currently looking at ways to reduce this exposure further.

### Extra Nodes

There are also some extra hardware specific nodes (for the Pibrella, PiFace and
LEDBorg plug on modules) available via [npm](https://www.npmjs.com/search?q=node-red-node-+).
For example the Pibrella node can be installed as follows

        cd ~/.node-red
        npm install node-red-node-pibrella

### Note

 * **Midori Browser** - the old Midori browser does not have adequate javascript support to
use it with Node-RED. If you want to use a built in browser on the Pi please
install the Epiphany browser and use that pointed at http://localhost:1880.
Epiphany is now the default Raspbian browser, or you can install it by

        sudo apt-get install epiphany-browser

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

These use a python **nrgpio** command as part of the core install that can be
found in \<node-red-install-directory>/nodes/core/hardware

This provides a way of controlling the GPIO pins via nodes in the Node-RED palette.


### Blink - gpio

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
