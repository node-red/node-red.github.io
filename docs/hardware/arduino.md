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

You then need to install the Node-RED Arduino nodes into the palette.

<div class="doc-callout">Please check that `npm -v` is at least version 2.x
- if not - update it using

        sudo npm i -g npm@2.x
        dash -r
</div>

Change directory to your Node-RED user directory, this is normally `~/.node-red`

        cd .node-red

Then install the Arduino node

        npm install node-red-node-arduino

Finally restart Node-RED. There should now be two new Arduino nodes in the palette.

#### Blink

To run a "blink" flow that uses LED 13, copy the following flow and paste it
into the Import Nodes dialog (*Import From - Clipboard* in the dropdown menu, or
Ctrl-I). After clicking okay, click in the workspace to place the new nodes.

    [{"id":"d7663aaf.47194","type":"arduino-board","device":""},{"id":"dae8234f.2517e","type":"inject","name":"0.5s tick","topic":"","payload":"","payloadType":"date","repeat":"0.5","crontab":"","once":false,"x":150,"y":100,"z":"359a4b52.ca65b4","wires":[["56a6f8f2.a95908"]]},{"id":"2db61802.d249e8","type":"arduino out","name":"","pin":"13","state":"OUTPUT","arduino":"d7663aaf.47194","x":570.5,"y":100,"z":"359a4b52.ca65b4","wires":[]},{"id":"56a6f8f2.a95908","type":"function","name":"Toggle output on input","func":"\n// If it does exist make it the inverse of what it was or else initialise it to false\n// (context variables persist between calls to the function)\ncontext.level = !context.level || false;\n\n// set the payload to the level and return\nmsg.payload = context.level;\nreturn msg;","outputs":1,"noerr":0,"x":358,"y":100,"z":"359a4b52.ca65b4","wires":[["2db61802.d249e8"]]}]

This flow is set to automatically try to detect the board ona a serial port.
If you need to change that, double click
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

### Johnny-Five

You may also use the popular [Johnny-Five](https://www.npmjs.com/package/johnny-five)
library as this adds capabilities like I2C.

One way to use it is via Luis Montes'
[node-red-contrib-gpio](http://flows.nodered.org/node/node-red-contrib-gpio)
node, which also adds support for a number of other boards, such as
Raspberry Pi, BeagleBone Black, Galileo/Edison, Blend Micro, LightBlue Bean,
Electric Imp and Spark Core, in a consistent manner.

Another way is to make it available within functions.
This can be achieved by editing the globalContextSettings sections of settings.js to be

    functionGlobalContext: {
        // os:require('os'),
        // bonescript:require('bonescript'),
       jfive:require("johnny-five"),                        // this is the reference to the library
       j5board:require("johnny-five").Board({repl:false})   // this actually starts the board link...
    },

We start the board link here so that multiple functions within the workspace can
use it, though you should be careful to only access each pin once.

Finally install the npm from within your Node-RED home directory

    cd .node-red
    npm install johnny-five

and then you may access all the [richness](https://github.com/rwaldron/johnny-five/wiki)
of Johnny-Five from within functions...

    var five = context.global.jfive;    // create a shorter alias
    var led = new five.Led(13);         // instatiate the led
    led.blink(500);                     // blink it every 500 ms

*Note:* this is a simple, but poor example as the led pin is created each time the
function is called... so only ok if you only call it once.

#### Blink 2

The flow below shows a more advanced example that turns on and off a flashing led,
and shows the use of context to hold the state and a single instance of the led pin.

It can be imported to the workspace by using `ctrl-c (copy) / ctrl-i (import) / ctrl-v (paste)`.

    [{"id":"62f58834.9d0a78","type":"inject","name":"","topic":"","payload":"1","payloadType":"string","repeat":"","crontab":"","once":false,"x":226,"y":326,"z":"359a4b52.ca65b4","wires":[["ae84ad08.517b5"]]},{"id":"ae84ad08.517b5","type":"function","name":"1 = start flash, 0 = stop","func":"var five = context.global.jfive;\ncontext.led = context.led || new five.Led(13);\ncontext.switch = context.switch || 0;\ncontext.switch = msg.payload;\nconsole.log(typeof(context.switch));\nif (context.switch == 1) {\n    context.led.blink(500);\n}\nif (context.switch == 0) {\n    context.led.stop().off();\n}\nreturn msg;","outputs":1,"noerr":0,"x":447,"y":349,"z":"359a4b52.ca65b4","wires":[["df638a80.209c78"]]},{"id":"df638a80.209c78","type":"debug","name":"","active":true,"console":"false","complete":"false","x":645,"y":349,"z":"359a4b52.ca65b4","wires":[]},{"id":"d79bc51d.286438","type":"inject","name":"","topic":"","payload":"0","payloadType":"string","repeat":"","crontab":"","once":false,"x":224.4000244140625,"y":364.60003662109375,"z":"359a4b52.ca65b4","wires":[["ae84ad08.517b5"]]}]
