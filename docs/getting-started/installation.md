---
layout: default
title: Installation
---   

### Install Node.js

Node-RED requires version <code>0.10.x</code> of Node.js. 

<div class="doc-callout"><em>Note</em>: The most recent stable release of Node <code>0.12.x</code> is <em>not</em> currently supported.</div>

You can get the latest supported version of Node <code>0.10.x</code> from:

 - Linux Binaries: [32-bit](http://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x86.tar.gz)
                   or
                   [64-bit](http://nodejs.org/dist/v0.10.36/node-v0.10.36-linux-x64.tar.gz)
 - Max OS X Installer: [Universal](http://nodejs.org/dist/v0.10.36/node-v0.10.36.pkg)
 - Windows Installer: [32-bit](http://nodejs.org/dist/v0.10.36/node-v0.10.36-x86.msi)
                      or
                      [64-bit](http://nodejs.org/dist/v0.10.36/x64/node-v0.10.36-x64.msi)

Other download options are available [here](http://nodejs.org/dist/v0.10.36/).

You may want to use a version from your operating system's [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).
If you chose this option, you must ensure to get a <code>0.10.x</code> version.
 
For installing on the Raspberry Pi, see the specific instructions [here](../hardware/raspberrypi.html).

### Install Node-RED

For Node-RED 0.10.4 or later, the easiest way to install Node-RED is to use node's
package manager, npm. Installing it as a global module adds the command `node-red`
to your system path:

    sudo npm install -g node-red

<div class="doc-callout">
<em>Note</em>: <code>sudo</code> is required if running as a non-root user on Linux/OS X. If
running on Windows, you will need to run in a command shell as Administrator,
without the <code>sudo</code> command.
</div>

### Alternative install methods

#### Download a release

You can download the latest release from [here](https://github.com/node-red/node-red/releases/latest).
The zip contains a top-level folder called `node-red-X.Y.Z` where `X.Y.Z` is the
version number. Once extracted, from within that top-level folder, run the
following command:

    npm install --production
    
#### From GitHub
    
Running the code from GitHub is only intended for users who are happy to be using
development code, or for developers wanting to contribute to the code.

You can clone the source repository directly from GitHub:

    git clone https://github.com/node-red/node-red.git

Once cloned, the core pre-requisite modules must be installed. From the top-level
directory of Node-RED, run:

    npm install

<div class="doc-callout">
<em>Note</em>: in anticipation of future changes, when running from a clone of the git
repository, it is necessary to install all dependencies, not just the production
level ones. This is why the <code>--production</code> option should not be used.
</div>
    
### Next steps

Once installed, you are ready to [run Node-RED](running.html).
