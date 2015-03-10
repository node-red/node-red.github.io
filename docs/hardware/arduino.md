---
layout: default
title: Arduino
---

There are several ways to interact with an Arduino using Node-RED. They
all assume the Arduino is connected to the host computer via a USB serial
connection.

***

### Serial

As the Arduino appears as a Serial device, the Serial in/out nodes can be used
to communicate with it.

This is normally the case if you program the Arduino with the IDE, as you can
then send and receive input over the serial port to interact with your creation.
Just make sure you set the serial port speed (baud rate) to be the same at both
ends.

***

### Firmata

[Firmata](http://firmata.org/) is a protocol for communicating between an
Arduino (as well as other microcontrollers) and the host computer, providing
direct access to the IO pins.

#### Installation

First you need to load the default Firmata sketch onto the Arduino using the
standard Arduino software download tools. This is usually found in the Arduino
IDE under the menu:

    Files - Examples - Firmata - Standard Firmata

To ensure you have the Arduino nodes in the Node-RED palette, install the
firmata npm module and restart Node-RED

    $ cd node-red
    $ npm install arduino-firmata
    $ node red.js

#### Blink

To run a "blink" flow that uses LED 13, copy the following flow and paste it
into the Import Nodes dialog (*Import From - Clipboard* in the dropdown menu, or
Ctrl-I). After clicking okay, click in the workspace to place the new nodes.

    [{"id":"d7663aaf.47194","type":"arduino-board","repeat":"25","device":"/dev/ttyUSB0"},{"id":"8c09ca6c.a975d","type":"arduino out","name":"","pin":"13","state":"OUTPUT","arduino":"d7663aaf.47194","x":509.16667556762695,"y":162.16666984558105,"wires":[]},{"id":"e37b6a97.610968","type":"inject","name":"tick","topic":"","payload":"","repeat":"0.5","once":false,"x":116.16668319702148,"y":62.16666507720947,"wires":[["60b4aeaa.800d58"]]},{"id":"60b4aeaa.800d58","type":"function","name":"Toggle output on input","func":"\n// initialise level as a context variable if currently undefined \n// (context variables persist between calls to the function)\ncontext.level = context.level || false;\n\n// if it's a 0 make it a 1 else make it a 0...\ncontext.level = !context.level;\n\n// set the payload to the level and return\nmsg.payload = context.level;\nreturn msg;","outputs":1,"x":298.1666793823242,"y":113.16665458679199,"wires":[["8c09ca6c.a975d"]]}]

This flow is set to use `/dev/ttyUSB0`. If you need to change that, double click
the node labelled `Pin 13` - the Arduino node. Click the pencil icon and change
the port definition as needed.

Click the deploy button and the flow should start running. LED 13 should start
toggling on and off once a second.

#### Capabilities

The Arduino output node currently supports three modes of operation:

 - Digital - 0 or 1
 - Analogue - 0 to 255
 - Servo - 0 to 180

The Arduino input node, available in the palette but not used in this example,
can support both Digital and Analog pins. The input will send a message whenever
it detects a change. This may be okay for digital inputs as they tend to be
fairly stable, but analog readings often end up being at the full sample rate
(default: 40 times a second...). This can be changed in the configuration of the
serial port to reduce it to a more manageable rate.

Details of the node.js arduino-firmata library can be found [here](https://www.npmjs.com/package/arduino-firmata).

***

### Using Johnny-Five

You may also use the popular [Johnny-Five](https://www.npmjs.com/package/johnny-five) library.
As it is so rich in function it is best used within functions.

This can be achieved by editing the globalContextSettings sections of settings.js to be

    functionGlobalContext: {
        // os:require('os'),
        // bonescript:require('bonescript'),
       jfive:require("johnny-five"),                // this is the reference to the library
       jboard:require("johnny-five").Board()        // this actually starts the board link...
    },

We start the board link here so that multiple functions within the workspace can
use it, though you should be careful to only access each pin once.

Finally install the npm from within your Node-RED home directory

    cd ~/.node-red
    npm install johnny-five

and then you may access all the richness of Johnny-Five from within functions...

    var five = context.global.jfive;
    var led = new five.Led(13);
    led.blink(500);


#### Blink 2

Here is a complete example that you can import into the workspace.
Click the inject button to start the led 13 flashing every 500mS.

    [{"id":"35f228b4.e1f3b8","type":"inject","name":"Click to start","topic":"","payload":"This will make it blink","payloadType":"string","repeat":"","crontab":"","once":false,"x":124,"y":291,"z":"6480e14.f9b7f2","wires":[["b2b5f432.a374e8"]]},{"id":"b2b5f432.a374e8","type":"function","name":"blink LED 13","func":"// rename the global context variable to something shorter\nvar five = context.global.jfive;\n\n// select Led function on pin 13\nvar led = new five.Led(13);\n\n// blink it every 500mS\nled.blink(500);\n\nreturn msg;","outputs":1,"valid":true,"x":276,"y":358,"z":"6480e14.f9b7f2","wires":[["ac67828.f53988"]]},{"id":"ac67828.f53988","type":"debug","name":"","active":true,"console":"false","complete":"false","x":435,"y":299,"z":"6480e14.f9b7f2","wires":[]}]

<div class="doc-callout">If you do use Johnny-Five it also uses the
console and will require you to hit Ctrl-C or Ctrl-break <b>twice</b> to stop the
application.
</div>
