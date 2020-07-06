---
layout: docs-getting-started
toc: toc-user-guide.html
title: Running on Raspberry Pi
slug: raspberry pi
redirect_from:
  - /docs/hardware/raspberrypi
---


### Prerequisites

If you are using Raspbian, then you must have Raspbian Jessie as a minimum version.
Raspbian Buster is the currently supported version.

### Installing and Upgrading Node-RED

We provide a script to install Node.js, npm and Node-RED onto a Raspberry
Pi. The script can also be used to upgrade an existing install when a new
release is available.

Running the following command will download and run the script. If you want
to review the contents of the script first, you can view it [here](https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered).

```
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
```

<div class="doc-callout">
<div style="float: left; margin-right: 10px; margin-bottom: 30px;">
<img src="/images/logos/debian.svg" height="30">
<img src="/images/logos/ubuntu.svg" height="30">
</div>
This script will work on any <b>Debian-based</b> operating system, including <b>Ubuntu</b>
and <b>Diet-Pi</b>. You may need to run <code>sudo apt install build-essential git</code>
first to ensure npm is able to build any binary modules it needs to install.
</div>


This script will:

 - remove the pre-packaged version of Node-RED and Node.js if they are present
 - install the current Node.js LTS release using the [NodeSource](https://github.com/nodesource/distributions/blob/master/README.md). If it detects Node.js is already installed
 from NodeSource, it will ensure it is at least Node 8, but otherwise leave it alone
 - install the latest version of Node-RED using npm
 - optionally install a collection of useful Pi-specific nodes
 - setup Node-RED to run as a service and provide a set of commands to work with
 the service

<div class="doc-callout">
<div style="float: left; margin-right: 10px;margin-bottom: 40px;">
<img src="/images/logos/raspberrypi.svg" height="30">
</div>
Node-RED has also been packaged for the Raspbian repositories and appears in their
list of 'Recommended Software'. This allows it to be installed using
<code>apt-get install nodered</code> and includes the Raspbian-packaged version
of Node.js, but <em>does not</em> include <code>npm</code>.
<p>While using these packages is convenient at first, we <b>strongly recommend</b>
using our install script above instead.</p>
</div>

### Running locally

As with [running Node-RED locally](/docs/getting-started/local), you can use
the `node-red` command to run Node-RED in a terminal. It can then be stopped
by pressing `Ctrl-C` or by closing the terminal window.

Due to the limited memory of the Raspberry Pi, you will need to start Node-RED
with an additional argument to tell the underlying Node.js process to free up
unused memory sooner than it would otherwise.

To do this, you should use the alternative `node-red-pi` command and pass in the
`max-old-space-size` argument.

```
node-red-pi --max-old-space-size=256
```

### Running as a service

The install script for the Pi also sets it up to run as a service. This means it
can run in the background and be enabled to automatically start on boot.

The following commands are provided to work with the service:

 - `node-red-start` - this starts the Node-RED service and displays its log output.
 Pressing `Ctrl-C` or closing the window does *not* stop the service; it keeps
 running in the background
 - `node-red-stop` - this stops the Node-RED service
 - `node-red-restart` - this stops and restarts the Node-RED service
 - `node-red-log` - this displays the log output of the service

You can also start the Node-RED service on the Raspbian Desktop by selecting
the `Menu -> Programming -> Node-RED` menu option.

### Autostart on boot

If you want Node-RED to run when the Pi is turned on, or re-booted, you can enable the service
to autostart by running the command:

```
sudo systemctl enable nodered.service
```

To disable the service, run the command:
```
sudo systemctl disable nodered.service
```

### Opening the editor

Once Node-RED is running you can access the editor in a browser.

If you are using the browser on the Pi desktop, you can open the address: <http://localhost:1880>.

<div class="doc-callout">We recommend using a browser outside of the PI and pointing it at Node-RED running on the Pi. However you can use the built in browser and if so we recommend Chromium or Firefox-ESR and <i>not</i> Epiphany</div>

When browsing from another machine you should use the hostname or IP-address of the Pi: `http://<hostname>:1880`. You
can find the IP address by running `hostname -I` on the Pi.


### Next steps

- [Learn how to secure your editor](/docs/user-guide/runtime/securing-node-red)
- [Create your first flow](/docs/tutorials/first-flow)
- [Adding nodes to the palette](/docs/user-guide/runtime/adding-nodes)
