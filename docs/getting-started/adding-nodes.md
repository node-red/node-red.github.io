---
layout: default
title: Adding Nodes
---

The Node-RED release comes with a core set of useful nodes, but there are a growing
number of additional nodes available for install from other sources.

You can search the NPM repository for the [`node-red` keyword](https://www.npmjs.com/browse/keyword/node-red)
to find additional nodes.

### Installing npm packaged nodes

To install an npm-packaged node, you can either install it globally alongside
Node-RED:

    npm install -g <npm-package-name>

or locally within your user data directory (by default, `$HOME/.node-red`):

    cd $HOME/.node-red
    npm install <npm-package-name>    

You will need to restart Node-RED for it to pick-up the new nodes.

### Installing individual node files

It is also possible to install nodes by copying their `.js` and `.html` files into
a `nodes` directory within your user data directory. If these nodes have any npm
dependencies, they must be also be installed within the user data directory.
