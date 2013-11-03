---
layout: default
title: Raspberry Pi
---

There are (at least) two ways for interacting with a Raspberry Pi using Node-RED.

**gpio command**
: this provides nodes in the palette for monitoring and controlling the GPIO
  pins

**wiring-pi module**
: this provides complete access to the GPIO pins, and other devices, within
  Function nodes.

***
  
### gpio command

The gpio command is part of @drogon WiringPi suite of tools.

This provides a way of controlling the GPIO pins via a simple command. It also supports
accessories such as the PiFace and others and so provides a good platform for these integrations.
For full details see the [WiringPi website](http://wiringpi.com/).

#### Installation

After [installing](../getting-started/installation.html) Node-RED, follow these 
[instructions](http://wiringpi.com/download-and-install/) to get WiringPi installed.
Ensure that the test commands work.

Once you restart Node-RED you should now see two rpi-gpio nodes in the advanced section of the pallette.
One to read from pins, and one to control pins. If they are not there then check the gpio command installed
correctly to /usr/local/bin/gpio and is executable by the user you are running.

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

This version of working with the Raspberry Pi uses a node.js wrapper to the WiringPi libraries previously installed, and so
gives all functions you write access to the Pi capabilities at all times, so you can do more complex things, at the expense of having to write code within a function rather than dragging and wiring nodes.

#### Installation

After [installing](../getting-started/installation.html) Node-RED, follow these 
[instructions](http://wiringpi.com/download-and-install/) to get Wiring Pi 
installed.

#### Configuring Node-RED

Firstly the npm module needs to be installed into the node-red directory.

    cd /node-red
    npm install wiring-pi

This does not any specific nodes to Node-RED. Instead the Wiring-Pi module can be made
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


