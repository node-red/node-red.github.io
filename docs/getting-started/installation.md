---
layout: default
title: Installation
---   

### Install node.js

You can get the latest version from <http://nodejs.org/download/>.

Or, you may want to use a version from your operating system's package manager:
 <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>

### Install Node-RED

There are **three** ways to get Node-RED:

#### Download a release

Download the latest release from the link on <http://nodered.org>. The zip
contains a top-level folder called `node-red-X.Y.Z` where `X.Y.Z` is the version
number. Once extracted, from within that top-level folder, run the following
command:

    $ npm install

#### Use npm

Installing via npm allows you to [embed Node-RED into an existing application](../embedding.html).

Run the following commands to install from the npm repository:

    $ mkdir node-red
    $ cd node-red
    $ npm install node-red

This installs the latest release, and its core dependencies, into the `node-red/node_modules`
directory.

#### From GitHub

If you want to run the very latest code, you can clone the source repository
directly from GitHub:

    $ git clone https://github.com/node-red/node-red.git

Once cloned, the core pre-requisite modules must be installed. From the top-level
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

