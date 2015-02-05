---
layout: default
title: Raspberry Pi
---

(the previous version of these instructions can be found [here](raspberrypi-old.html).)

#### Installation

**Note:** These instructions are for the Pi version 1. The Pi 2 has some known 
issues due to the different processor architecture (ARMv7). We will update this document
as soon as we have a working set of instructions.

The simplest way to install node.js on Pi is

    wget http://node-arm.herokuapp.com/node_latest_armhf.deb
    sudo dpkg -i node_latest_armhf.deb

Then after [following the instructions](../getting-started/installation.html) to
install Node-RED, make sure the Python RPi.GPIO libraries are installed...

    $sudo apt-get install python-dev python-rpi.gpio

**Change** Using RPi.GPIO is a change from using WiringPi - the main benefits
are that we can get software PWM on all output pins, and easier access to
interrupts on inputs meaning faster response times (rather than polling).

<b>NOTE - </b>
The Garbage Collector (GC) algorithm in node.js v0.10.x behaves differently
than v0.8.x - in that it doesn't enforce a clean until it is near a memory limit
larger than the 512MB in the Pi - this can cause the Pi to crash if left running
for a long time, so we recommend starting Node-RED like this

    $ cd node-red
    $ node --max-old-space-size=128 red.js

This extra parameter limits the space it can use to 128MB before cleaning up. If
you are running nothing else on your Pi feel free to up that to 192 or 256...
the command `free -h` will give you some clues if you wish to tweak.

Once you restart Node-RED and then browse to <b>http://{your-pi-address}:1880</b>
you should now see two rpi-gpio nodes in the advanced section of the pallette.
One to read from pins, and one to control pins. If they are not there then check
both the **nrgpio** and **nrgpio.py** commands installed correctly to the `~/node-red/nodes/core/hardware/` directory and are executable by the user that you are running as. To check:

    $ ~/node-red/nodes/core/hardware/nrgpio ver 0

should return...  0.5.8    or greater - this is the version of the RPi.GPIO library.

NOTE: the old Midori browser does not have adequate javascript support to
use it with Node-RED. If you want to use a built in browser on the Pi please
install the Epiphany browser and use that pointed at http://localhost:1880.
Epiphany is now the default Rasbian browser, or you can install it by

    $ sudo apt-get install epiphany-browser

There are also some extra hardware specific nodes (for the Pibrella, PiFace and
LEDBorg plug on modules) available in the [node-red-nodes project](https://github.com/node-red/node-red-nodes/tree/master/hardware/) on Github.

There are (at least) two ways for interacting with a Raspberry Pi using Node-RED.

**rpi-gpio nodes**
: provided in the palette for monitoring and controlling the GPIO
  pins. This is the simplest and recommended way.

**wiring-pi module**
: this provides complete access to the GPIO pins, and other devices, within
  Function nodes. This gives more control and access to other features not in
  the nodes but you have to program it yourself.


***

### rpi-gpio nodes

These use a python **nrgpio** command as part of the core install and can be
found in node-red/nodes/core/hardware

This provides a way of controlling the GPIO pins via nodes in the Node-RED palette.

The nrgpio command *MUST* be executable by the user that is running Node-RED.
That user *MUST* have root access to run python in order to access the pins
directly. The default user Pi does have this access and is the recommended user
with which to run Node-RED.

If you want to run as a different user you will need either to add that user to
the sudoers list - or maybe just access to python - for example by adding the following to sudoers using visudo.

    NodeREDusername ALL=(ALL) NOPASSWD: /user/bin/python




#### Blink

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

After [installing](../getting-started/installation.html) Node-RED, follow these
[instructions](http://wiringpi.com/download-and-install/) to get Wiring Pi
installed.

#### Configuring Node-RED

Firstly the npm module needs to be installed into the node-red directory.

    cd ~/node-red-x.y.z    (changing x.y.z to match the version you have installed)
    npm install wiring-pi

This does not add any specific nodes to Node-RED. Instead the Wiring-Pi module can be made
available for use in Function nodes.

To do this, update `settings.js` to add the `wiring-pi` module to the Function
global context:

    functionGlobalContext: {
        wpi: require('wiring-pi')
    }

The module is then available to any functions you write as `context.global.wpi`.

#### Blink

To run a "blink" flow that uses the WiringPi pin 0 - Pin 11 on the GPIO header,
you will need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.

    [{"id":"860e0da9.98757","type":"function","name":"Toggle LED on input","func":"\n// select wpi pin 0 = pin 11 on header (for v2)\nvar pin = 0;\n\n// initialise the wpi to use the global context\nvar wpi = context.global.wpi;\n\n// use the default WiringPi pin number scheme...\nwpi.setup();\n\n// initialise the state of the pin if not already set\n// anything in context.  persists from one call to the function to the next\ncontext.state = context.state || wpi.LOW;\n\n// set the mode to output (just in case)\nwpi.pinMode(pin, wpi.modes.OUTPUT);\n\n// toggle the stored state of the pin\n(context.state == wpi.LOW) ? context.state = wpi.HIGH : context.state = wpi.LOW;\n\n// output the state to the pin\nwpi.digitalWrite(pin, context.state);\n\n// we don't \"need\" to return anything here but may help for debug\nreturn msg;","outputs":1,"x":333.16666412353516,"y":79.16666793823242,"wires":[["574f5131.36d0f8"]]},{"id":"14446ead.5aa501","type":"inject","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":113.16666412353516,"y":59.16666793823242,"wires":[["860e0da9.98757"]]},{"id":"574f5131.36d0f8","type":"debug","name":"","active":true,"x":553.1666641235352,"y":99.16666793823242,"wires":[]}]


Click the `Deploy` button and the flow should start running. The LED should start
toggling on and off once a second.

***

### Making Node-RED autostart on boot (optional)

To make Node-RED into a service by using init.d - thanks to our contributors for this.
[Init.d script](https://gist.github.com/Belphemur/cf91100f81f2b37b3e94)

Copy the init.d script into /etc/init.d/node-red and make it executable. You can
then stop, start and restart Node-RED by

    $ sudo service node-red stop
    $ sudo service node-red start
    $ sudo service node-red restart

If you need Node-RED to autostart on boot then use this command

    $ sudo update-rc.d node-red defaults

Once running you should then be able to attach to the screen session to see the
console by running:

    $ sudo screen -r red

To detach from the session and leave it running, type Ctrl-A-D.


And alternative is to use `screen` so you can get to the
console at any time. To install screen, if it is not already there, run:

    $ sudo apt-get install screen

then use a script like this [Node-RED init script](https://gist.github.com/bigmonkeyboy/9962293)
