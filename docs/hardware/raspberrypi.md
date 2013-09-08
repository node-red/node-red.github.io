---
layout: default
title: Raspberry Pi
---

There are (at least) two ways for interacting with a Raspberry Pi using Node-RED.

**pi-gpio**
: this provides nodes in the palette for monitoring and controlling the GPIO
  pins

**WiringPi**
: this provides complete access to the GPIO pins, and other devices, within
  Function nodes.

***
  
### pi-gpio

*pi-gpio is no longer maintained. We will be migrating to an alternative soon*

pi-gpio is a node.js module that wraps the [gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin)
command-line tool.

#### Installation

After [installing](../getting-started/installation.html) Node-RED, follow these 
[instructions](https://github.com/rakeshpai/pi-gpio#installation) to get both
gpio-admin and pi-gpio installed.

Once Node-RED is started, you should now see the rpi-gpio nodes in the palette
in the Advanced section.

#### Blink

To run a "blink" flow that toggles an LED on Pin 11 of the GPIO header, you will
need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.

    [{"id":"12c3cae6.ed3c35","type":"debug","name":"","active":true,"x":561,"y":119,"wires":[]},{"id":"d4b2ed80.2b4d1","type":"rpi-gpio out","name":"","resistor":"no","pin":"11","x":561,"y":59,"wires":[]},{"id":"5e5e53c0.a1a1ac","type":"inject","name":"tick every 1 sec","topic":"","payload":"","repeat":"1","once":false,"x":121,"y":59,"wires":[["63dad785.9c2528"]]},{"id":"63dad785.9c2528","type":"function","name":"Toggle 0/1 on input","func":"\ncontext.state = context.state || 0;\n\n(context.state == 0) ? context.state = 1 : context.state = 0;\nmsg.payload = context.state;\n\nreturn msg;","outputs":1,"x":321,"y":59,"wires":[["12c3cae6.ed3c35","d4b2ed80.2b4d1"]]}]

Click the deploy button and the flow should start running. The LED should start
toggling on and off once a second.

***

### WiringPi

This version of working with the Raspberry Pi uses the WiringPi libraries so
gives you much richer control of all the GPIO pins and also access to the PiFace
expansion board. More details about WiringPi are available [here](http://wiringpi.com/).

#### Installation

After [installing](../getting-started/installation.html) Node-RED, follow these 
[instructions](http://wiringpi.com/download-and-install/) to get Wiring Pi 
installed.

#### Configuring Node-RED

There are not any specific nodes for Wiring Pi. Instead the module can be made
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

Click the deploy button and the flow should start running. The LED should start
toggling on and off once a second.

***

### Making Node-RED autostart on boot (optional)

The easiest way to autostart Node-RED is to use `screen` so you can get to the
console at any time.

To install screen, if it is not already there, run:

    $ sudo apt-get install screen

Then edit the `/etc/rc.local` file to include the lines:

    cd /home/pi/node-red-master
    screen -dmS red node red.js

This assumes that you have installed Node-RED to the default (pi) user's home
directory.

Once you reboot you should then be able to attach to the screen session by
running:

    $ screen -r red
    
To detach from the session, type Ctrl-A-D.


