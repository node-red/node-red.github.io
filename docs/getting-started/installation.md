---
layout: default
title: Installation
---   

### Install node.js

You can get the latest version from <http://nodejs.org/download/>.

Or, you may want to use a version from your operating system's package manager:
 <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>

### Install Node-RED

There are two ways to get Node-RED; either via npm, or directly from GitHub:

#### Using npm

    $ mkdir node-red
    $ cd node-red
    $ npm install node-red

This installs Node-RED, and its core dependencies into the `node_modules`
directory.

Installing via npm also allows you to [embed Node-RED into an existing application](../embedding.html).

The version installed by npm is a point-in-time snapshot. To get the latest code run:

    $ npm install node-red/node-red

#### From GitHub

Either clone the repository:

    $ git clone https://github.com/node-red/node-red.git

Or download the latest zip file from <https://github.com/node-red/node-red/archive/master.zip>.

Once downloaded, the core pre-requisite modules must be installed. From the top-level
directory of Node-RED, run:

    $ npm install

### Installing individual node dependencies

*Eventually, nodes will be npm-installable themselves. This will take care of
all of the dependency management. Until then, it is a bit more manual...*

When Node-RED starts, it attempts to load the nodes from the `nodes/` directory.
Each will have its own set of dependencies that will need to be installed before
the node is available in the palette.

To help identify the dependencies, Node-RED logs any modules it fails to find
for a particular node. You only need to install these dependencies if you want
to use that node. For example, you probably don't want to install the `pi-gpio`
module unless you are running on a Raspberry Pi.

Alternatively, a node's `.js` file can be examined to identify the modules it
explicitly requires. For example, the Twitter node is defined in
`nodes/social/27-twitter.js` and contains:

	var RED = require("../../red/red");
	var ntwitter = require('ntwitter');
	var OAuth= require('oauth').OAuth;

Of these, `ntwitter` and `oauth` are neither built-in modules nor ones provided
by Node-RED itself. They can subsequently be installed by running:

    $ npm install ntwitter oauth

