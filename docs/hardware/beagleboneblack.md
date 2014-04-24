---
layout: default
title: BeagleBone Black
---

The BeagleBoneBlack already has node.js baked into it's OS, so some of these tips are optional.

* NEWS - Beaglebone Black latest firmware image is now Debian based. It is so much easier to get things like Wifi working... see [http://beagleboard.org/latest-images](http://beagleboard.org/latest-images)

***

## Debian

Follow the normal [installation instructions](../getting-started/installation.html) to install Node-RED, 
and after doing so return here.

<b>NOTE - </b>
The new Garbage Collector (GC) algorithm in node.js v0.10.x behaves differently than v0.8.x - in that it doesn't enforce a clean until it is near a memory limit larger than the 512MB in the BBB - this can cause the BBB to crash if left running for a long time, so we recommend starting Node-RED like this

    $ cd node-red
    $ node --max-old-space-size=128 red.js
    
This extra parameter limits the space it can use to 128MB before cleaning up. If you are running nothing else on your BBB feel free to up that to 192 or 256...  the command `free -h` will give you some clues if you wish to tweak.

Once Node-RED is started, assuming you haven't changed the hostname, browse to
<http://beaglebone.local:1880>.

#### BBB specific nodes

There are some great BBB specific nodes now available in our Node-red-nodes project on Github - [node-red-nodes](https://github.com/node-red/node-red-nodes/tree/master/hardware/BBB) - kudos to Max.
These give you direct access to the I/O pins in the simplest possible manner.

Also for experts, the `bonescript` module can be made available for use in Function nodes.

To do this, update `settings.js` to add the `bonescript` module to the
Function global context:

    //functionGlobalContext: { }  
    functionGlobalContext: { bonescript:require('bonescript') }

The module is then available to any functions you write as `context.global.bonescript`.

#### Making Node-RED autostart on boot (optional)

The easiest way to autostart Node-RED is to use `screen` so you can get to the
console at any time. To install screen, if it is not already there, run:

    $ sudo apt-get install screen

Then make Node-RED into a service but using init.d - thanks to our contributors for pointing this out.

see [Node-RED init script](https://gist.github.com/bigmonkeyboy/9962293)

Copy the init script into /etc/init.d/node-red and make it executable. You will also need to edit line 22 `cd /home/pi/node-red` to point to wherever you have installed Node-RED. You can then stop, start and restart Node-RED by

    $ sudo service node-red stop
    $ sudo service node-red start
    $ sudo service node-red restart

If you need Node-RED to autostart on boot then use this command

    $ sudo update-rc.d node-red defaults
    
Once running you should then be able to attach to the screen session to see the console by running:

    $ sudo screen -r red
    
To detach from the session and leave it running, type Ctrl-A-D.


***

## Angstrom 

#### Environment

Some modules, for example serialport, require native compilation, usually using node-gyp.
To make sure this works you MUST install some python build tools.

    $ opkg update
    $ opkg install python-compiler python-distutils python-multiprocessing python-misc openssl-misc

If you want to run <b>opkg upgrade</b>. (optional)

    From the command line run: 
    1. udhcpc -i <interface>" (Interface = eth0, wlan0 etc).
    2. Then and ONLY then run "opkg --tmp-dir ~ upgrade"

This will populate /etc/resolve.conf with the appropriate settings. Once it has finished, opkg --tmp-dir ~ upgrade should run no problem. If you run "opkg --tmp-dir ~ upgrade" prior to doing this (or manually setting a DNS server), it will fail and horrible things will happen to your BBB, likely requiring you to reflash. This can be added to a startup script so you don't have to worry about it.

To get the latest complete firmware build in order to reflash the entire board - see 
<http://circuitco.com/support/index.php?title=Updating_The_Software> for details.

#### Update node.js and bonescript (optional)

Log onto the BBB as root and at the prompt, run the following commands to ensure
the everything is up to date. 

    $ opkg update
    $ opkg install nodejs bonescript

Whilst logged in, you may also want to install `screen` - a convenient way to
run Node-RED in the console when not logged in.

    $ opkg install screen
    
#### Installing Node-RED

Follow the normal [installation instructions](../getting-started/installation.html) to install Node-RED, 
and after doing so return here.

<b>Note:</b> If you intend to use git to install Node-RED then do the following 
(in order to prevent the old version of git on beaglebone stopping you from downloading). 

    $ git config --global http.sslverify false
    $ git clone https://github.com/node-red/node-red.git
    $ cd node-red
    $ npm install --production
    

#### Configuring Node-RED

#### BBB specific nodes

There are some great BBB specific nodes now available in our Node-red-nodes project on Github - https://github.com/node-red/node-red-nodes/tree/master/hardware/BBB - kudos to Max.

Also for experts, the `bonescript` module can be made available for use in Function nodes.

To do this, update `settings.js` to add the `bonescript` module to the
Function global context:

    //functionGlobalContext: { }  
    functionGlobalContext: { bonescript:require('bonescript') }

The module is then available to any functions you write as `context.global.bonescript`.

Once Node-RED is started, assuming you haven't changed the hostname, browse to
<http://beaglebone.local:1880>.

#### Blink

To run a "blink" flow that uses the USR3 and USR2 LEDs, copy the following flow
and paste it into the Import Nodes dialog (*Import From - Clipboard* in the
dropdown menu, or Ctrl-I). After clicking okay, click in the workspace to place
the new nodes.

    [{"id":"b1fce44.9ce3c18","type":"inject","name":"on","topic":"","payload":"1","repeat":"","once":false,"x":127.16666412353516,"y":109.16666412353516,"wires":[["b2a66e5e.6da6f"]]},{"id":"591aef4d.b55f38","type":"inject","name":"off","topic":"","payload":"0","repeat":"","once":false,"x":127.16666412353516,"y":149.16666412353516,"wires":[["b2a66e5e.6da6f"]]},{"id":"36f2a960.164f76","type":"inject","name":"tick","topic":"","payload":"","repeat":"1","once":false,"x":127.16666412353516,"y":49.166664123535156,"wires":[["7ee460bc.df48e"]]},{"id":"55249ec9.21e61","type":"debug","name":"","active":true,"x":567.1666641235352,"y":89.16666412353516,"wires":[]},{"id":"7ee460bc.df48e","type":"function","name":"Toggle USR3 LED on input","func":"\nvar pin = \"USR3\"\nvar b = context.global.bonescript;\ncontext.state = context.state || b.LOW;\n\nb.pinMode(pin, b.OUTPUT);\n\n(context.state == b.LOW) ? context.state = b.HIGH : context.state = b.LOW;\nb.digitalWrite(pin, context.state);\n\nreturn msg;","outputs":1,"x":347.16666412353516,"y":69.16666412353516,"wires":[["55249ec9.21e61"]]},{"id":"b2a66e5e.6da6f","type":"function","name":"Set USR2 LED on input","func":"\nvar pin = \"USR2\";\nvar b = context.global.bonescript;\n\nb.pinMode(pin, b.OUTPUT);\n\nvar level = (msg.payload === \"1\")?1:0;\nb.digitalWrite(pin, level);\n\nreturn msg;","outputs":1,"x":347.16666412353516,"y":129.16666412353516,"wires":[["55249ec9.21e61"]]}]

Click the deploy button and the flow should start running. USR3 LED should start
toggling on and off once a second. USR2 LED can be manually set on or off using
the Inject node buttons.

#### Autostart on boot (optional)

As Angstrom uses the Upstart way of doing things we need to create a couple of
files.

##### /lib/systemd/system/node-red.service :

    [Unit]
    Description=Start Node-RED

    [Service]
    Environment=HOME=/home/root
    WorkingDirectory=/home/root
    ExecStart=/home/root/go.sh
    SyslogIdentifier=Node-RED
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target

##### /home/root/go.sh : 

    #!/bin/bash -
    ## change line below to match your network port eth0, wlan0, etc
    udhcpc -i eth0
    ntpdate pool.ntp.org
    export NODE_PATH=/usr/lib/node_modules
    cd /home/root/node-red/
    /usr/bin/screen -dmS red /usr/bin/node red.js

Run the following commands:

    $ chmod +x /home/root/go.sh
    $ systemctl enable node-red.service
    $ systemctl start node-red.service

Node-RED should now be running in a screen session. You can attach to the
session by running:

    $ screen -r red
    
To detach from the session, type Ctrl-A-D.

Note that `go.sh` also tries to set the clock correctly using `ntpdate`. You
shouldn't have to do this but we found the BBB does sometimes take an age to
sync up - so forcing it helps.

Other useful hints are available here: <http://www.gigamegablog.com/2012/01/29/beaglebone-linux-101-configuring-angstrom-linux/>

