---
layout: default
title: Arduino
---

There are two main ways for interacting with an Arduino using Node-RED. They
both assume the Arduino is connected to the host computer via a USB connection.

***

### Serial

As the Arduino appears as a Serial device, the Serial in/out nodes can be used
to communicate with it.

*TODO: add example of sketch for Serial*

***

### Firmata

[Firmata](http://firmata.org/) is a protocol for communicating between an
Arduino (as well as other microcontrollers) and the host computer, providing 
direct access to the IO pins.

#### Installation

First you need to load the default Firmata sketch onto the Arduino using the
standard Arduino software download tools. This is usually found under 
*Files - Examples - Firmata - Standard Firmata*.

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

Details of the node.js firmata library can be found [here](https://github.com/jgautier/firmata).
