---
layout: docs-faq
toc: toc-user-guide.html
slug: gpio
title: Interacting with Raspberry Pi GPIO
---

There are a few node modules available for interacting with the Pi's GPIO pins.

### node-red-node-pi-gpio

This module is preinstalled with Node-RED when using
our install script. It provides a simple way to monitor and control the GPIO pins.

<div class="doc-callout">
Raspberry Pi OS comes preconfigured for this node to work. If you are running a different
distribution, such as Ubuntu, some additional install steps may be needed. The
node's README <a href="https://github.com/node-red/node-red-nodes/tree/master/hardware/PiGpio#install">has the details</a>.
</div>

### node-red-node-pi-gpiod

This module uses the [PiGPIOd](http://abyz.me.uk/rpi/pigpio/pigpiod.html) daemon
which offers some more features over the default nodes. For example, the node can
be easily configured to do PWM output or drive a Servo.

The module is available [here](https://flows.nodered.org/node/node-red-node-pi-gpiod).


### node-red-contrib-gpio

This modules supports GPIO across a wide range of device types, using the
[Johnny-Five](https://github.com/rwaldron/johnny-five) library.

The module is available [here](https://flows.nodered.org/node/node-red-contrib-gpio).
