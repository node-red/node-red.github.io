---
layout: default
title: Installation
---   

### Install Node.js

Node-RED requires version <code>0.10.x</code> of Node.js. The most recent stable
release of Node <code>0.12.x</code> is **not** supported.

You can get the latest version <code>0.10.x</code> of Node from <http://nodejs.org/dist/v0.10.36/>.

Or, you may want to use a version from your operating system's package manager:
 <https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager>
 
For installing on the Raspberry Pi, see the specific instructions [here](../hardware/raspberrypi.html).

### Install Node-RED

The main way to install Node-RED is to download the latest stable release. If you
are just getting started, this is the right option to choose.

#### Download a release

Download the latest release from the link on <http://nodered.org>. The zip
contains a top-level folder called `node-red-X.Y.Z` where `X.Y.Z` is the version
number. Once extracted, from within that top-level folder, run the following
command:

    $ npm install --production
    
This is the simplest way for most people to install Node-RED.

#### Use npm

Installing via npm allows you to [embed Node-RED into an existing application](../embedding.html).
This assumes you are comfortable with creating node.js applications.

#### From GitHub

If you want to run the very latest development code, you can clone the source
repository directly from GitHub:

    $ git clone https://github.com/node-red/node-red.git

Once cloned, the core pre-requisite modules must be installed. From the top-level
directory of Node-RED, run:

    $ npm install --production
    
Whilst we always try to ensure the repository is bug-free, it may contain features
still under development.
    
### Installing additional nodes

The Node-RED release comes with a core set of useful nodes, but there are a growing
number of additional nodes available for install from other sources.

You can search the NPM repository for the [`node-red` keyword](https://www.npmjs.com/browse/keyword/node-red)
to find additional nodes.

To install an npm-packaged node, run the following command in the node-red install
directory:

    $ npm install <npm-package-name>

### Next steps

Once installed, you are ready to [run Node-RED](running.html).
