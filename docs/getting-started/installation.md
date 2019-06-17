---
layout: docs
toc: getting-started-toc.html
title: Installation
---

Before you can install Node-RED, you must have a working install of Node.js. We recommend the use of Node.js **LTS 8.x or 10.x**. Node-RED no longer supports Node.js 6.x or earlier.

We have specific instructions available for certain hardware platforms and operating systems:

 - [Raspberry Pi](../hardware/raspberrypi)
 - [BeagleBone Black](../hardware/beagleboneblack)
 - [Windows](../platforms/windows)

Linux and OSX users should install the **[packaged version](https://nodejs.org/en/download/package-manager/)**
of Node.js for your specific operating system, or get the latest Long Term Support (LTS) version from the [download site](https://nodejs.org/en/download/).

To check your version of Node.js

    node -v

Other download options are available [here](https://nodejs.org/dist/latest-v8.x/).


The easiest way to install Node-RED is to use the node package manager, npm, that comes with Node.js.
Installing as a global module adds the command `node-red` to your system path:

    sudo npm install -g --unsafe-perm node-red

<div class="doc-callout">
Note: <code>sudo</code> is only required during the install when running on Linux or OS X. If
running on Windows, see the <a href="../platforms/windows">Windows Install instructions</a>.
</div>

### Install via SNAP

If your OS supports [SNAPs](https://snapcraft.io/docs/core/install) you can install Node-RED with:

    snap install node-red

but please note that this runs in a secure container and so does not have access to any extra facilities
that may be needed for your use, such as gcc to compile nodes that have native plugins, git (for projects),
direct access to gpio, any external programs (to call out to), and so on. You can run it in "classic"
mode, which reduces the container security, but we leave that as an exercise for the reader.

#### Next

Once installed, you are ready to [run Node-RED](running).

----

### For Development - from GitHub

Running the code from GitHub is only intended for users who are happy to be using
development code, or for developers wanting to contribute to the code.

You can clone the source repository directly from GitHub:

    git clone https://github.com/node-red/node-red.git

Once cloned, the core pre-requisite modules must be installed :

    cd node-red
    npm install

<div class="doc-callout">
<em>Note</em> : when running from a clone of the git repository, it is necessary
to install all dependencies, not just the production level ones. This is why the
 <code>--production</code> option should not be used.
</div>

You will also need to install `grunt-cli` in order to build the application before
you can use it. This must be done globally.

    sudo npm install -g grunt-cli

You can then build and run the application

    grunt build
    npm start

### Next steps

Once installed, you are ready to [run Node-RED](running).
