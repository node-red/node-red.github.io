---
layout: default
title: Running
---   

If you have installed Node-RED as a global npm package, you can use the `node-red`
command:

    $ node-red
    
    Welcome to Node-RED
    ===================
    
    25 Feb 22:51:09 - [info] Node-RED version: v0.10.4
    25 Feb 22:51:09 - [info] Node.js  version: v0.10.36
    25 Feb 22:51:09 - [info] Loading palette nodes
    25 Feb 22:51:10 - [warn] ------------------------------------------
    25 Feb 22:51:10 - [warn] Failed to register 5 node types
    25 Feb 22:51:10 - [warn] Run with -v for details
    25 Feb 22:51:10 - [warn] ------------------------------------------
    25 Feb 22:51:10 - [info] User Directory : /home/nol/.node-red
    25 Feb 22:51:10 - [info] Server now running at http://127.0.0.1:1881/
    25 Feb 22:51:10 - [info] Creating new flows file : flows_noltop.json
    25 Feb 22:51:10 - [info] Starting flows
    25 Feb 22:51:10 - [info] Started flows

You can then access the Node-RED editor at <http://localhost:1880>.

For running on the Raspberry Pi, or similar constrained devices, see the specific
instructions [here](../hardware/raspberrypi.html#starting-node-red).

#### Running from a local install - Linux & Mac OS X

The `node-red` command can still be accessed even if Node-RED hasn't been installed
as a global npm package.

If you have npm installed Node-RED, this script will be `node_modules/node-red/bin/node-red`,
relative to the directory you ran `npm install` in. If you have installed from a
release zip file, the script will be `node-red-X.Y.Z/bin/node-red`, relative to
the directory you extracted the zip into.

First make the `node-red` start script executable:

     $ chmod +x <node-red-install-directory>/bin/node-red

Then you can start Node-RED with:

    $ <node-red-install-directory>/bin/node-red

#### Running from a local install - Windows

On Windows, run the following command from the same directoy you ran `npm install`
in, or that you extracted the release zip file:

    $ node node_modules/node-red/red.js


### Storing user data

By default, Node-RED stores your data in the directory `$HOME/.node-red`. For
backwards compatibility reasons, if Node-RED detects user data in its install
directory, it will use that instead. The [upgrading](upgrading.html) documentation
includes a section on migrating your data out of the Node-RED install directory.

To override what directory to use, the `--userDir` command-line option can be used.

### Command-line usage

    Usage: node-red [-v] [-?] [--settings settings.js] [--userDir DIR] [flows.json]
    
    Options:
      -s, --settings FILE  use specified settings file
      -u, --userDir  DIR   use specified user directory
      -v                   enable verbose output
      -?, --help           show usage

#### Passing arguments to the underlying node.js process

There are occassions when it is necessary to pass arguments to the underlying
node.js process. For example, when running on devices with a constrained amount
of memory.

If you are running Node-RED using the `node-red` start script, you can provide
these arguments alongside the Node-RED command-line arguments to the `node-red-pi`
start script instead. _Note_: this script is not available on Windows.

If you are running Node-RED using the `node` command, you must provide arguments
for the node process before specifying `red.js` and the arguments you want passed
to Node-RED itself.

The following two commands show these two approaches:

    $ node-red-pi --max-old-space-size=128 --userDir /var/node-red/data
    $ node --max-old-space-size=128 red.js  --userDir /var/node-red/data



