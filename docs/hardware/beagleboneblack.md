---
layout: default
title: Running on BeagleBone Boards
---

We recommend using the latest Debian 9 Stretch based SD card images - from
 <a href="https://beagleboard.org/latest-images" target="_new">beagleboard.org</a>.

The 4GB images for BeagleBone boards already have Node-RED pre-installed and set to auto-start, so you can just boot
and point your browser at your BeagleBone, port 1880.

To view the Node-RED log

    sudo journalctl -f -u node-red -o cat

To stop Node-RED

    sudo service node-red stop

To start Node-RED

    sudo service node-red start


The 2GB console version suitable for flashing to older eMMC versions of the BBB will need to be manually installed as per below.

---

#### Upgrading

The latest Debian images already have Node-RED and Node.js installed - the easiest way to upgrade is to use the built in upgrade tool:

    sudo apt update
    sudo apt upgrade nodejs bb-node-red-installer

This should also restart the Node-RED service - but you will need to refresh any open browser sessions.

If you are on the 2017 Debian 9.2 version you may need to run `sudo apt full-upgrade` first.

**Note**: Do NOT use the Raspberry Pi / Debian upgrade script (`update-nodejs-and-nodered`) as it will re-install
both Node.js and Node-RED in different locations and will conflict with and break the existing systemd configuration files.

---

### Manual installation

<div class="doc-callout">
This section is deprecated in favour of using the images with Node-RED built in. See above.
</div>

#### Before you start

If you are using the 2GB eMMC version of Debian it has been stripped right down so you may need to install some
utility functions first

    sudo apt-get update
    sudo apt-get install -y curl locales ntpdate avahi-utils python build-essential

Make sure the local time is set correctly. The BeagleboneBlack does not have a
battery backed real time clock so needs to be set on every boot in order for
software certificates date checks to be valid.

    ntpdate -b -s -u pool.ntp.org

#### Updating Node.js

We recommend using Node.js LTS 6.x or 8.x

    sudo apt-get install curl
    curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
    sudo apt-get install -y build-essential nodejs
    hash -r

#### Installing Node-RED

The easiest way to install Node-RED is to use node's package manager, npm:

    sudo npm i -g --unsafe-perm node-red

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and often
fails to get access to certain directories. This causes alarming warnings that look
like errors... but only sometimes are errors. Allowing node-gyp to run as root using
this flag avoids this - or rather, shows up any real errors instead.

For other install options, e.g. to run in development mode from GitHub, see the [main installation instructions](../getting-started/installation#install-node-red).

#### Beaglebone specific nodes

There are some Beaglebone specific nodes that give you direct access to the I/O pins in the simplest possible manner.
The easiest way to install them is direct from npm.

To install manually run the following command:

    sudo npm install -g --unsafe-perm beaglebone-io johnny-five node-red-contrib-gpio

*Note*: There is also a set of BBB specific nodes that can be used. However they are built on a no longer supported
library (octalbonescript), and so are not recommended for future use, but are noted for having some extra capabilities
beyond the generic gpio nodes.

    sudo npm install -g --unsafe-perm node-red-node-beaglebone

### Starting Node-RED

Due to the constrained memory available on the Beaglebone boards, it is advisable to
run Node-RED with the command:

    node-red-pi

#### Auto-starting

The simplest way to auto-start Node-RED on boot is to use the built in systemd.
To do this create a file `/lib/systemd/system/nodered.service` containing the following

    # systemd service file to start Node-RED
    [Unit]
    Description=Node-RED graphical event wiring tool.
    Wants=network.target
    Documentation=http://nodered.org/docs/hardware/raspberrypi.html
    [Service]
    Type=simple
    # Run as root user in order to have access to gpio pins
    User=root
    Group=root
    Nice=5
    Environment="NODE_OPTIONS=--max-old-space-size=128"
    #Environment="NODE_RED_OPTIONS=-v"
    ExecStart=/usr/bin/env node-red-pi $NODE_OPTIONS $NODE_RED_OPTIONS
    KillSignal=SIGINT
    Restart=on-failure
    SyslogIdentifier=Node-RED
    [Install]
    WantedBy=multi-user.target

Reload the systemd configuration, and enable the service

    sudo systemctl daemon-reload
    sudo systemctl enable nodered.service

Systemd uses the `/var/log/system.log` for logging.  To filter the log use

    sudo journalctl -f -u nodered -o cat

### Using the Editor

Once Node-RED is started, assuming you haven't changed the hostname, point a
browser to [http://beaglebone.local:1880](http://beaglebone.local:1880).
