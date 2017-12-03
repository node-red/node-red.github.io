---
layout: docs
toc: getting-started-toc.html
title: Upgrading
---

<div class="doc-callout"><em>Note</em>: if you are using the preinstalled version
on a Raspberry Pi, please refer to <a href="/docs/hardware/raspberrypi">these instructions for <b>upgrading a Pi</b></a>.</div>

If you have installed Node-RED as a global npm package, you can upgrade to the
latest version with the following commands:

    sudo npm cache clean
    sudo npm install -g --unsafe-perm node-red

To check for, and re-install outdated nodes that are installed in the user directory you have two options:

Use the `Manage Pallete` menu from within node-red's editor UI. You can then remove, add, and also update nodes. Or via the command-line as follows;

    cd ~/.node-red
    npm outdated

This will print a list of nodes that can be updated.   
To re-install the latest node version you can then run:

    npm install foo          # to re-install the latest version of a node called foo

You will then need to stop and restart Node-RED.

## Upgrading Node.js

If you upgrade Node.js, for example from v4.x to v6.x, it is better to stop
Node-RED, and then re-install as follows:

    sudo npm cache clean
    sudo npm install -g --unsafe-perm node-red

You will also need to rebuild any nodes that have binary dependancies. If you
installed them in the recommended `~/.node-red` directory, you can do this by:

    cd ~/.node-red
    npm rebuild

You will then need to restart Node-RED.

----

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and then
fails to get access to certain directories. This causes the nodes in question
(eg serialport) not to be installed. Allowing it root access during install
allows the nodes to be installed correctly during the upgrade.
