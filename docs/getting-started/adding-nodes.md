---
layout: default
title: Adding Nodes
---

Node-RED comes with a core set of useful nodes, but there are a growing number
of additional nodes available for install from both the Node-RED project as well
as the wider community.

You can search for available nodes in the [Node-RED library](http://flows.nodered.org)
or on the [npm repository](https://www.npmjs.com/browse/keyword/node-red).

### Installing npm packaged nodes

To install an npm-packaged node, you can either install it locally within your
user data directory (by default, `$HOME/.node-red`):

    cd $HOME/.node-red
    npm install <npm-package-name>  #

or globally alongside Node-RED:

    sudo npm install -g <npm-package-name>

You will need to restart Node-RED for it to pick-up the new nodes.

### Installing individual node files

It is also possible to install nodes by copying their `.js` and `.html` files into
a `nodes` directory within your user data directory. If these nodes have any npm
dependencies, they must be also be installed within the user data directory.
