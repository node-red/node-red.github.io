---
layout: docs-getting-started
toc: toc-user-guide.html
title: Running on BeagleBone Boards
slug: beaglebone
redirect_from:
  - /docs/hardware/beagleboneblack
---


### Installing

If you want the latest Node-RED 1.x then you need to use the Alpha Testing - Debian (10) Buster image from
 <a href="https://beagleboard.org/latest-images" target="bbb">beagleboard.org</a> - and then do a full upgrade to latest. 

    sudo apt update && sudo apt full-upgrade

Currently, Debian (10) Buster is only available as an SD card image. If flashing the image to the eMMC is desired, the line

    cmdline=init=/opt/scripts/tools/eMMC/init-eMMC-flasher-v3.sh

should be uncommented in the /boot/uEnv.txt file. The image can then be flashed to the eMMC like any 'flasher' image on the
BeagleBoard website.

All the 4GB images for BeagleBone boards already have Node-RED pre-installed and set to auto-start,
so you can just boot and point your browser at your BeagleBone, port 1880.

The 2GB console version suitable for flashing to older eMMC versions of the BBB is not recommended but can be
installed as per the manual installation instructions below.

### Running

To view the Node-RED log

    sudo journalctl -f -u node-red -o cat

To stop Node-RED

    sudo service node-red stop

To start Node-RED

    sudo service node-red start

To set Node-RED to auto-start on every boot

    sudo systemctl enable node-red.service

and likewise to stop it auto-running on boot

    sudo systemctl disable node-red.service


### Upgrading

The latest Debian images already have Node-RED and Node.js installed - the easiest way to upgrade is to use the built in upgrade tool:

    sudo apt update
    sudo apt upgrade nodejs bb-node-red-installer

This should also restart the Node-RED service - but you will need to refresh any open browser sessions.

If you are on the 2017 Debian 9.2 version you may need to run `sudo apt full-upgrade` first.

**Note**: Do NOT use the Raspberry Pi / Debian upgrade script (`update-nodejs-and-nodered`) as
it will re-install both Node.js and Node-RED in different locations and will conflict with and
break the existing systemd configuration files.

### Configuring

The Beaglebone is configured by default to run Node-RED as root. Therefore the configuration files are located in the
`/root/.node-red` directory and you will need root privileges (sudo) to edit them. This is where you need to edit your
`settings.js` file for example.

Beaglebone also has a systemd service, `/lib/systemd/system/node-red.socket`, that automatically starts Node-RED
when is sees an attempt to connect. By default this is port 1880 - but if you want change that you need to change it
here as well as in the `settings.js` file.

### Beaglebone specific nodes

There are some Beaglebone specific nodes that give you direct access to the I/O pins in the simplest possible manner.
The easiest way to install them is direct from npm.

To install manually run the following command:

    sudo npm install -g --unsafe-perm beaglebone-io johnny-five node-red-contrib-gpio

*Note*: There is also a set of BBB specific nodes that can be used. However they are built on a no longer supported
library (octalbonescript), and so are not recommended for future use, but are noted for having some extra capabilities
beyond the generic gpio nodes.

    sudo npm install -g --unsafe-perm node-red-node-beaglebone
