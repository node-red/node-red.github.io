---
layout: default
title: Installation
---

### Install Node.js

Node-RED supports Node.js <code>0.10.x</code> and later.

<div class="doc-callout"><em>Note</em>: Node.js 5.x and npm 3.x are under active development and are not recommended
for a stable base. Many 3rd party node packages may not yet fully support Node 5.x and later, especially if they
contain a binary component. Check with the author of the package if you are not sure.</div>

You can get the latest Long Term Support (LTS) version of Node <code>4.x</code> from:

 - Linux Binaries: [32-bit](https://nodejs.org/dist/latest-v4.x/node-v4.5.0-linux-x86.tar.gz)
                   or
                   [64-bit](https://nodejs.org/dist/latest-v4.x/node-v4.5.0-linux-x64.tar.gz)
 - Max OS X Installer: [Universal](https://nodejs.org/dist/latest-v4.x/node-v4.5.0.pkg)
 - Windows Installer: [32-bit](https://nodejs.org/dist/latest-v4.x/node-v4.5.0-x86.msi)
                      or
                      [64-bit](https://nodejs.org/dist/latest-v4.x/node-v4.5.0-x64.msi)

It is often easiest to use a [packaged version](https://nodejs.org/en/download/package-manager/)
specifically for your operating system.

We also have specific instructions available for certain hardware platforms:

 - [Raspberry Pi](../hardware/raspberrypi)
 - [BeagleBone Black](../hardware/beagleboneblack)

Other download options are available [here](https://nodejs.org/dist/latest-v4.x/).

### Install Node-RED

The easiest way to install Node-RED is to use node's
package manager, npm. Installing it as a global module adds the command `node-red`
to your system path:

    sudo npm install -g --unsafe-perm node-red

<div class="doc-callout">
<p>
<em>Note</em>: you should not use <code>npm 1.x</code> to install Node-RED. You can upgrade
to the latest <code>npm 2.x</code> version with the command: <code>sudo npm install -g npm@2.x</code>
</p>
<p>
<em>Note</em>: <code>sudo</code> is required if running as a non-root user on Linux/OS X. If
running on Windows, you will need to run in a <a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">command shell as Administrator</a>,
without the <code>sudo</code> command.
</p>
<p>
<em>Note</em>: During the install some errors may be reported by the <code>node-gyp</code>
command. These are typically <em>non-fatal</em> errors and are related to optional dependencies
that require a compiler in order to build them. <b>Node-RED will work without these
optional dependencies</b>, but you may find additional node modules that require the
ability to compile native code. You can find out how to install the <code>node-gyp</code>
compiler dependencies <a href="https://github.com/TooTallNate/node-gyp#installation">here</a>.
</p>
</div>

#### Next

Once installed, you are ready to [run Node-RED](running).

----

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

### Serial port

If you want to use the serial port node when using Node.js v0.10.x or v0.12.x
you will need to manually install an older version of the serial port node.
To do this:

    cd $HOME/.node-red
    npm install node-red-node-serialport@0.0.5

### Next steps

Once installed, you are ready to [run Node-RED](running).
