---
layout: default
title: BeagleBone Black
---

The BeagleBoneBlack already has node.js baked into it's default Angstrom OS, so 
some of these tips are optional.

#### Environment

Some modules, for example serialport, require native compilation, usually using node-gyp.
To make sure this works you MUST install some python build tools.

    $ opkg update
    $ opkg install python-compiler python-distutils python-multiprocessing python-misc openssl-misc
    
NOTE: Don't be tempted to run - opkg upgrade - it will generally fail and mess up the BeagleBoneBlack.
To get the latest complete firmware build reflash the entire board - see 
<http://circuitco.com/support/index.php?title=Updating_The_Software> for details, and then upgrade
individual packages as you require.

If you intend to use git to install Node-RED then do the following (to prevent the old version of git
on beaglebone stopping you download). 

    $ git config --global http.sslverify false
    $ git clone https://github.com/node-red/node-red.git
    $ cd node-red
    $ npm install --production

#### Update node.js and bonescript (optional)

Log onto the BBB as root and at the prompt, run the following commands to ensure
the everything is up to date. 

    $ opkg update
    $ opkg install nodejs bonescript

Whilst logged in, you may also want to install `screen` - a convenient way to
run Node-RED in the console when not logged in.

    $ opkg install screen
    
#### Installing Node-RED

Now proceed to install Node-RED as per the normal [installation instructions](../getting-started/installation.html).

After doing so return here.

#### Configuring Node-RED

There are not any specific nodes for the BBB. Instead, the `bonescript` module
can be made available for use in Function nodes.

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
    ntpdate pool.ntp.org
    export NODE_PATH=/usr/lib/node_modules
    cd /home/root/node-red/
    /usr/bin/screen -dmS red /usr/bin/node red.js

Run the following commands:

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

