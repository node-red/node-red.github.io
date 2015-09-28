---
layout: default
title: Installation
---

### Install Node.js

Node-RED supports Node.js <code>0.10.x</code> and <code>0.12.x</code>.

<div class="doc-callout"><em>Note</em>: Support for Node <code>0.12.x</code> was added in Node-RED <code>0.11.0</code>.
Whilst we have tested the core runtime and its nodes, 3rd party nodes may not yet fully support it.</div>

<div class="doc-callout"><em>Note</em>: We do <em>not</em> currently support node.js v4.x.x or versions of io.js.</div>

You can get the latest supported version of Node <code>0.12.x</code> from:

 - Linux Binaries: [32-bit](https://nodejs.org/dist/v0.12.7/node-v0.12.7-linux-x86.tar.gz)
                   or
                   [64-bit](http://nodejs.org/dist/v0.12.7/node-v0.12.7-linux-x64.tar.gz)
 - Max OS X Installer: [Universal](https://nodejs.org/dist/v0.12.7/node-v0.12.7.pkg)
 - Windows Installer: [32-bit](https://nodejs.org/dist/v0.12.7/node-v0.12.7-x86.msi)
                      or
                      [64-bit](https://nodejs.org/dist/v0.12.7/x64/node-v0.12.7-x64.msi)

Other download options are available [here](http://nodejs.org/dist/v0.12.7/).

You may want to use a version from your operating system's [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager).

There are specific instructions available for certain hardware platforms:

 - [Raspberry Pi](../hardware/raspberrypi.html)
 - [BeagleBone Black](../hardware/beagleboneblack.html)

### Install Node-RED

For Node-RED 0.10.4 or later, the easiest way to install Node-RED is to use node's
package manager, npm. Installing it as a global module adds the command `node-red`
to your system path:

    sudo npm install -g --unsafe-perm node-red

<div class="doc-callout">
<em>Note</em>: <code>sudo</code> is required if running as a non-root user on Linux/OS X. If
running on Windows, you will need to run in a <a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">command shell as Administrator</a>,
without the <code>sudo</code> command.
</div>

<div class="doc-callout">
<em>Note</em>: During the install some errors may be reported by the <code>node-gyp</code>
command. These are typically <em>non-fatal</em> errors and are related to optional dependencies
that require a compiler in order to build them. <b>Node-RED will work without these
optional dependencies</b>, but you may find additional node modules that require the
ability to compile native code. You can find out how to install the <code>node-gyp</code>
compiler dependencies <a href="https://github.com/TooTallNate/node-gyp#installation">here</a>.
</div>

### Alternative install methods

#### Download a release

You can download the latest release from [here](https://github.com/node-red/node-red/releases/latest).
The zip contains a top-level folder called `node-red-X.Y.Z` where `X.Y.Z` is the
version number. Once extracted, from within that top-level folder, run the
following command:

    npm install --production

#### For Development - from GitHub

Running the code from GitHub is only intended for users who are happy to be using
development code, or for developers wanting to contribute to the code.

You can clone the source repository directly from GitHub:

    git clone https://github.com/node-red/node-red.git

Once cloned, the core pre-requisite modules must be installed :

    cd node-red
    npm install

<div class="doc-callout">
<em>Note</em>: when running from a clone of the git repository, it is necessary
to install all dependencies, not just the production level ones. This is why the
 <code>--production</code> option should not be used.
</div>

You will also need to install `grunt-cli` in order to build the application before
you can use it. This must be done globally.

    sudo npm install -g grunt-cli

You can then build and run the application

    grunt build
    node red

### Next steps

Once installed, you are ready to [run Node-RED](running.html).
