---
layout: docs-getting-started
title: Running Node-RED on balena
toc: toc-user-guide.html
slug: balena
redirect_from:
  - /docs/platforms/balena
---

This guide is going to install Node-RED on an edge device using [balena.io](https://balena.io) in 1 click. 

Running Node-RED on balena, means that you are using containers and Node-RED can run alognside with other services such as MQTT, databases, LoRa Network Servers and more. balena is a platform for managing fleets of connected devices. balena.io fleets run balenaOS (open source Linux operating system), which executes containers (using balenaEngine based on Docker Moby).


### Hardware required

To build this project, you will need:

* Raspberry Pi 0, 2, 3, 4 or [balenaFin](https://www.balena.io/fin/)
* An SD card if you are using a Raspberry Pi
* Power supply and (optionally) Ethernet cable.


### Software setp

To set up this project, you'll need:

* a [balenaCloud account](https://dashboard.balena-cloud.com/) (remember that the first 10 devices are fully-featured and free)
* [balenaEtcher](https://www.balena.io/etcher/) to flash the SD card.



## Tutorial

### Deploy Node-RED in 1 click

The Node-RED application with [balena-supervisor](https://balena.io/docs/reference/supervisor/supervisor-api/) flow [support](https://github.com/balena-io-projects/node-red-contrib-balena), can be managed remotely via balena [publicURL](https://balena.io/docs/learn/manage/actions/#enable-public-device-url).

You can deploy this project to a new balenaCloud fleet in one click using the button below:

[![](https://balena.io/deploy.svg)](https://dashboard.balena-cloud.com/deploy?repoUrl=https://github.com/balenalabs/balena-node-red)

Clicking the deploy button will create an application with all the necessary code to deploy your Node-RED project.

<img src="/images/balena-creating-fleet.png" />

Create the fleet and you will see the code being release on balenaCloud.

Click `Add device` and download the balenaOS image with the WiFi credentials that you will need (in case that you use WiFi). 

Flash the SD card with [balenaEtcher](https://www.balena.io/etcher/) and power up the device with the SD card.

The device will appear on balenaCloud and the `Node-RED` service will be deployed on the device, such as in the image below.

<img src="/images/balena-device-nodeRED.png" />

Once the `Node-RED` service has been deployed on your device, copy your local IP (if you are using the same network) or just click on `Public Device URL` and access to the Node-RED UI.

To access to the Node-RED UI, use `balena` as username and password. You may want to modify the `USERNAME` and `PASSWORD` on the balenaCloud Device Variables.

Now you are ready to start using Node-RED on your device.


### Deploy Node-RED from balena CLI

The previous application was running Node-RED however if you would like to run more services alongisde on the same device, this is also possible.

You will need to have installed on your computer the [git CLI](https://github.com/git-guides/install-git) and the [balena CLI](https://www.balena.io/docs/reference/balena-cli/).

First thing you need to do is to clone the [balena Node-RED block](https://github.com/balenalabs/balena-node-red).

````
cd ~/workspace
mkdir balena-node-red-mqtt
cd balena-node-red-mqtt
git clone https://github.com/balenalabs/balena-node-red.git
```

#### Add MQTT mosquitto service 

Let's add to the Node-RED service on balena another service. In this example we are going to add the MQTT mosquitto service.

Create a `docker-compose.yml` file and add this:

````
version: '2'

volumes:
    data:
    database:

services:
  node-red:
    build: ./balena-node-red
    volumes:
      - 'data:/data'
    restart: always
    privileged: true
    network_mode: host
    labels:
      io.balena.features.supervisor-api: '1'
      io.balena.features.balena-api: '1' 
    environment:
      - "USERNAME=balena"
      - "PASSWORD=balena"
      - "ENCRIPTION_KEY=balena"
    cap_add:
      - SYS_RAWIO
    devices:
      - "/dev/mem:/dev/mem"
      - "/dev/gpiomem:/dev/gpiomem"
      - "/dev/i2c-1:/dev/i2c-1"
    ports:
      - 80:80

  mqtt:
    image: arm32v6/eclipse-mosquitto
    network_mode: host
    ports:
      - "1883:1883"
    restart: always
```

#### Deploy the Node-RED and MQTT with balena CLI

* Sign up on your balena.io account.
* Create a new fleet on balenaCloud.
* Add a new device and download the image of the balenaOS that the balenaCloud creates. Remember to introduce your WiFi credentials, in case you are going to use WiFi.
* Burn an SD card (if you are using the Raspberry Pi) using balenaEtcher.
* Once the flashing process has completed, insert your SD card into the device and power it up.

When the device boots for the first time, it connects to your network automatically and then appears to the balenaCloud dashboard. After a few moments, you will see the new provisioned device listed and online.

Now using the balena CLI, push the code to your fleet using `balena push <the-name-of-your-fleet>`. And see the magic happening, your device is getting updated over-the-air.

Once the project has been built on the balena builders, you should see your device downloading the new images containers and starting them.

<img src="/images/balena-nodeRED-mqtt.png" />

In this repository you can find an example of [nodeRED and MQTT mosquitto](https://github.com/mpous/balena-nodered-mqtt) on balena.


### Troubleshooting

If there is any issue not reported here, feel free to report it at the [balena forums](https://forums.balena.io).

