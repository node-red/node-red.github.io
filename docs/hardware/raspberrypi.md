---
layout: default
title: Running on Raspberry Pi
---

The recommended way to install Node-RED on Pi is to use our script below, however Node-RED can be installed from the Recommended Software application installed on the Raspbian SD card image that can be downloaded from [RaspberryPi.org](https://www.raspberrypi.org/downloads/raspbian/). If installed in this manner it is recommended to upgrade by using the script below.

You can upgrade Node-RED by re-running the script.

### Install / Upgrade

If you have a version of Raspbian, or other **Debian** based install, such as **Ubuntu**, or **Diet-Pi**,
that doesn't have Node-RED already installed, you can install or upgrade using the Node-RED upgrade script command

    bash <(curl -sL https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered)

On really minimal Debian installs you may need to run `sudo apt-get install build-essential` before running the script
so that the serialport builds and installs OK. This is optional.

#### Script Description

Nodes can be now be managed via the built in palette manager. However the default Pi install pre-loads some
nodes globally and these cannot then be easily managed and updated. The intention of the script is to...  

 - upgrade an existing user to LTS 8.x or 10.x Node.js and latest Node-RED
 - migrate any existing globally installed nodes into the users ~/.node-red space so they can be managed via the palette manager
 - optionally (re)install the extra nodes that are pre-installed on a full Raspbian Pi image
 - Note: it DOES NOT update any user installed existing nodes. This must be done manually by the user (see below).

While aimed at the Pi user the script will also run on any Debian based operating system, such as Ubuntu, and so can
be used on other hardware platforms, although it has not been widely tested.

The command above runs many commands as **sudo** and does delete existing Node.js and the core Node-RED directories. Please inspect it by browsing to https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/update-nodejs-and-nodered

The script will perform the following steps

 - ask if you want to (re)install the extra Pi nodes
 - save a list of any globally installed *node-red-* nodes found in /usr/lib/node_modules
 - apt-get remove nodered
 - remove any node-red binaries from /usr/bin and /usr/local/bin
 - remove any node-red modules from /usr/lib/node_modules and /usr/local/lib/node_modules
 - detect if Node.js was installed from Node.js package or Debian
 - if not v8 or newer - remove as appropriate and install latest v8 or v10 LTS (not using apt).
 - clean out npm cache and .node-gyp cache to remove any previous versions of code
 - install Node-RED latest version
 - re-install under the user account any nodes that had previously been installed globally
 - re-install the extra Pi nodes if required
 - rebuild all nodes - to recompile any binaries to match latest Node.js version
 - add node-red-start, node-red-stop and node-red-log commands to /usr/bin
 - add menu shortcut and icon
 - add systemd script and set user
 - if on a Pi add a CPU temperature -> IoT example

**Caveat emptor** - The script has only been tested on installs with a small variety
of the possible extra nodes. The script tries to rebuild any nodes with native
plugins that you have installed in the `~/.node-red` directory. This may fail, and
you may need to manually rebuild or re-install some of the nodes you previous had
installed. To rebuild:

    cd ~/.node-red
    npm rebuild

To see the list of nodes you had installed:

    cd ~/.node-red
    npm ls --depth=0

**Note**: It does not update any nodes you had previously installed locally. To do that go into your user directory and run the commands below. The versions of some nodes may be fixed by the `package.json` file in that directory - you may need to hand edit this to select the versions you require before running `npm update`.

    cd ~/.node-red
    npm outdated
    npm update


#### Swapping SD Cards

Different versions of Raspberry Pi use different Arm processors. The Node.js binary is different for Arm6 and Arm7. Swapping SD cards from Arm6 to Arm7, for example Pi Zero to Pi 3, is OK. Swapping the other way will not work, unless you uninstall Node.js and then re-run the upgrade script to install the appropriate version of Node.js.


#### Running Node-RED

To start Node-RED, you can either:

  - on the Desktop, select `Menu -> Programming -> Node-RED`.
  - or run `node-red-start` in a new terminal window.

*Note:* closing the window (or ctrl-c) does not stop Node-RED running. It will continue running in the background.

To stop Node-RED, run the command `node-red-stop`.

To see the log, run the command `node-red-log`.


#### Autostart on boot

If you want Node-RED to run when the Pi boots up you can use

    sudo systemctl enable nodered.service

and likewise `sudo systemctl disable nodered.service` to disable autostart on boot.


#### Adding nodes to preloaded Raspbian version

If you **have not upgraded** the pre-installed version to the latest version using the script above, then in
order o add additional nodes you must first install the `npm` tool, as it is not included
in the default Raspbian installation. This is not necessary if you have upgraded using the script above.

The following commands install `npm` and then upgrade it to the latest version.

    sudo apt-get install npm
    sudo npm install -g npm
    hash -r
    cd ~/.node-red
    npm install node-red-{example node name}


#### Next

You will then need to restart Node-RED.
You can then start [using the editor](#using-the-editor).

----

## Notes

Debian/Raspbian Wheezy is now beyond "End of Life", and is no longer support, and this documentation is now aimed
at Jessie as a minimum.

### Accessing GPIO

If you plan to access the GPIO pins with Node-RED, you should verify which version of the Python RPi.GPIO libraries are installed.

Node-RED includes a Raspberry Pi specific script `nrgpio` for interacting with
the hardware GPIO pins. If you have installed as a global npm module, this script should be located at:

    /usr/lib/node_modules/node-red/nodes/core/hardware/nrgpio ver
    or
    /usr/local/lib/node_modules/node-red/nodes/core/hardware/nrgpio ver

You must have at least 0.5.11 for the Pi2 or 0.5.8 for the original Pi.
If you do not then the following commands will install the latest available:

    sudo apt-get update && sudo apt-get install python-rpi.gpio

Also, the user must be a member of the `gpio` group. To add the current user to the group

    sudo adduser $USER gpio

If you want to run as a user other than pi (or root), you will need either to add that user to
the [sudoers list](https://www.raspberrypi.org/documentation/linux/usage/users.md) - or maybe just access to python - for example by adding the
following to sudoers using visudo.

    NodeREDusername ALL=(ALL) NOPASSWD: /usr/bin/python


### Starting Node-RED

Due to the constrained memory available on the Raspberry Pi, it is necessary to
run Node-RED with the `node-red-pi` command. This allows an additional argument
to be provided that sets at what point Node.js will begin to free up unused memory.

When starting with the `node-red-pi` script, the `max-old-space-size` option should
be specified:

    node-red-pi --max-old-space-size=256

If you decide to run Node-RED using the node command directly, this option must
appear between node and red.js.

    node --max-old-space-size=256 red.js

This option limits the space it can use to 256MB before cleaning up. If you are
running nothing else on your Pi you can afford to increase that figure to 256
and possibly even higher. The command `free -h` will give you some clues as to
how much memory is currently available.

**Note**: The pre-installed version of Node-RED on Raspbian that uses the `node-red-start`
command also sets it to 256MB by default. If you do want to change that, the
file you need to edit (as sudo) is `/lib/systemd/system/nodered.service`. See
below for how to add this to a manually installed version.

#### Adding Autostart capability using SystemD

The preferred way to autostart Node-RED is to use the built in systemd
capability.  The pre-installed version does this by using a `nodered.service`
file and start and stop scripts. You may install these by running the following
commands

    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service -O /lib/systemd/system/nodered.service
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-start -O /usr/bin/node-red-start
    sudo wget https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/node-red-stop -O /usr/bin/node-red-stop
    sudo chmod +x /usr/bin/node-red-st*
    sudo systemctl daemon-reload

**Info:** These commands are run as root (sudo) - They download the three required
files to their correct locations, make the two scripts executable and then
reload the systemd daemon.

Node-RED can then be started and stopped by using the commands `node-red-start`
and `node-red-stop`

To then enable Node-RED to run automatically at every boot and upon crashes

    sudo systemctl enable nodered.service

It can be disabled by

    sudo systemctl disable nodered.service

Systemd uses the `/var/log/system.log` for logging.  To filter the log use

    sudo journalctl -f -u nodered -o cat

#### Changing the systemd environment -  running as non-Pi user

To run as a user other than the default `pi`, you need to edit the nodered.service file. To edit this use sudo to edit the file `/lib/systemd/system/nodered.service` and change the lines as indicated by {your_user} below

    [Service]
    Type=simple
    # Run as normal pi user - change to the user name you wish to run Node-RED as
    User={your_user}
    Group={your_user}
    WorkingDirectory=/home/{your_user}
    Nice=5
    Environment="PI_NODE_OPTIONS=--max_old_space_size=256"
    ...

Save the file, and then run:

    sudo systemctl daemon-reload

#### Changing the systemd environment - using a proxy

If you need to use a proxy for http requests - you need to set the *HTTP_PROXY* environment variable.
When using *systemd* this must be done within the service configuration. To edit this use sudo to edit the file `/lib/systemd/system/nodered.service` and add another `Environment=` line, for example:

    ...
    Nice=5
    Environment="NODE_OPTIONS=--max-old-space-size=128"
    Environment="HTTP_PROXY=my-proxy-server-address"
    ...

Save the file, and then run:

    sudo systemctl daemon-reload

to reload the configuration. Stop and restart Node-RED.

## Using the Editor

Once Node-RED is running - point a browser to the machine where Node-RED is running.
One way to find the IP address of the Pi is to use the command

    hostname -I

Then browse to `http://{the-ip-address-returned}:1880/`

<div class="doc-callout">
 <em>Note:</em> the default browser included in Raspbian, used to be Epiphany, and
has some quirks that meant certain keyboard short-cuts do not work within the
Node-RED editor. We <b>strongly</b> recommend installing the Firefox-ESR or Chromium browser instead:
<pre>
    sudo apt-get install firefox-esr
</pre>
More recent build include Chromium y default - which also works fine but can be rather slow on a Pi1 or Zero.
</div>

You can then start creating your [first flow](../getting-started/first-flow).

## Extra Nodes

You can generally install extra nodes using the Editor UI, Menu - Manage Palette . To install extra nodes manually make sure you are in your user-directory, by default this is `~/.node-red`.

     cd ~/.node-red

There are some extra hardware specific nodes (e.g. for the Pibrella, PiFace and
LEDBorg plug on modules, Neopixel leds, temperature sensors, etc) available via the **[flows library](http://flows.nodered.org/)**.
For example the alternative PiGPIOd node that allows remote access and is able to drive servos
can be installed as follows

    cd ~/.node-red
    npm install node-red-node-pi-gpiod

You then need to stop and restart Node-RED to load the new nodes, and then refresh the flow editor page in the browser.

    node-red-stop
    node-red-start


## Interacting with the Pi hardware

There are several ways of interacting with a Raspberry Pi using Node-RED.

**rpi-gpio nodes**  (default)
: provided in the palette for monitoring and controlling the GPIO
  pins. This is the simplest and recommended method.

**contrib-gpio nodes** (optional)
: additional nodes from @monteslu that provide generic gpio support for Pi, BeagleBone, Arduino, Edison, etc. They can be installed from [here](https://github.com/monteslu/node-red-contrib-gpio).

**wiring-pi module** (advanced)
: this provides more complete access to the GPIO pins, and other devices, within
  Function nodes. This gives more control and access to other features not in
  the nodes but you have to program it yourself.


### rpi-gpio nodes

These use a python `nrgpio` command as part of the core install.
This provides a way of controlling the GPIO pins via nodes in the Node-RED palette. Your user needs to be in the gpio group.

    sudo adduser $USER gpio


#### First Flow - Blink - gpio

To run a "blink" flow that toggles an LED on Pin 11 of the GPIO header, you will
need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.


        [{"id":"ae05f870.3bfc2","type":"function","name":"Toggle 0/1 on input","func":"\ncontext.state = context.state || 0;\n\n(context.state == 0) ? context.state = 1 : context.state = 0;\nmsg.payload = context.state;\n\nreturn msg;","outputs":1,"x":348.1666488647461,"y":146.16667652130127,"wires":[["1b0b73e9.14712c","b90e5005.a7c3b8"]]},{"id":"1b0b73e9.14712c","type":"debug","name":"","active":true,"x":587.1666488647461,"y":206.1666774749756,"wires":[]},{"id":"7aa75c69.fd5894","type":"inject","name":"tick every 1 sec","topic":"","payload":"","repeat":"1","crontab":"","once":false,"x":147.1666488647461,"y":146.1666774749756,"wires":[["ae05f870.3bfc2"]]},{"id":"b90e5005.a7c3b8","type":"rpi-gpio out","name":"","pin":"7","x":585.0000114440918,"y":146.00001049041748,"wires":[]}]


Click the deploy button and the flow should start running. The LED should start
toggling on and off once a second.


### wiring-pi module

This section is for advanced users only.
In general most users will not need to do this.

This version of working with the Raspberry Pi uses a Node.js wrapper to the
WiringPi libraries previously installed, and so
gives all functions you write access to the Pi capabilities at all times, so
you can do more complex things, at the expense of having to write code within a
function rather than dragging and wiring nodes.

#### Installation

After installing Node-RED, follow these [instructions](http://wiringpi.com/download-and-install/)
to get Wiring Pi installed.

#### Configuring Node-RED

Firstly the wiring-pi npm module needs to be installed into the same directory as your
`settings.js` file.

    cd ~/.node-red
    npm install wiring-pi

This does not add any specific nodes to Node-RED. Instead the Wiring-Pi module can be made
available for use in Function nodes.

To do this, edit your `settings.js` file to add the `wiring-pi` module to the Function
global context section:

    functionGlobalContext: {
        wpi: require('wiring-pi')
    }

The module is then available to any functions you write as `context.global.wpi`.

#### Blink - Wiring-Pi

To run a "blink" flow that uses the WiringPi pin 0 - Pin 11 on the GPIO header,
you will need to connect up an LED as described [here](https://projects.drogon.net/raspberry-pi/gpio-examples/tux-crossing/gpio-examples-1-a-single-led/).

Then copy the following flow and paste it into the Import Nodes dialog
(*Import From - Clipboard* in the dropdown menu, or Ctrl-I). After clicking
okay, click in the workspace to place the new nodes.

    [{"id":"860e0da9.98757","type":"function","name":"Toggle LED on input","func":"\n// select wpi pin 0 = pin 11 on header (for v2)\nvar pin = 0;\n\n// initialise the wpi to use the global context\nvar wpi = context.global.wpi;\n\n// use the default WiringPi pin number scheme...\nwpi.setup();\n\n// initialise the state of the pin if not already set\n// anything in context.  persists from one call to the function to the next\ncontext.state = context.state || wpi.LOW;\n\n// set the mode to output (just in case)\nwpi.pinMode(pin, wpi.modes.OUTPUT);\n\n// toggle the stored state of the pin\n(context.state == wpi.LOW) ? context.state = wpi.HIGH : context.state = wpi.LOW;\n\n// output the state to the pin\nwpi.digitalWrite(pin, context.state);\n\n// we don't \"need\" to return anything here but may help for debug\nreturn msg;","outputs":1,"x":333.16666412353516,"y":79.16666793823242,"wires":[["574f5131.36d0f8"]]},{"id":"14446ead.5aa501","type":"inject","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":113.16666412353516,"y":59.16666793823242,"wires":[["860e0da9.98757"]]},{"id":"574f5131.36d0f8","type":"debug","name":"","active":true,"x":553.1666641235352,"y":99.16666793823242,"wires":[]}]


Click the `Deploy` button and the flow should start running. The LED should start
toggling on and off once a second.
