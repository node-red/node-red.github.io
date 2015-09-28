---
layout: default
title: Upgrading
---

If you have installed Node-RED as a global npm package, you can upgrade to the
latest version with the following command:

    sudo npm update -g --unsafe-perm node-red

### Upgrading node.js

If you upgrade node.js, for example from v0.10.x to v0.12.x, it is better to
re-install Node-RED as follows:

    sudo npm cache clean
    sudo npm install -g --unsafe-perm node-red

### Upgrading from before Node-RED 0.10.4

In releases prior to 0.10.4, the default behaviour was to write user data into
the Node-RED install directory. This made upgrading a painful experience. The
following guide takes you through moving your existing data out of the install
directory.

1. Choose where you want to store your data. By default, Node-RED 0.10.4 will
   use `$HOME/.node-red`, but you can override that with the `--userDir` option.

2. Take a back-up copy of the entire Node-RED install directory, just in case.

3. Move the following files from the Node-RED install directory to your chosen
   user data directory:

   - `settings.js` - if you have customised it
   - all files beginning with `flows_`
   - `.config.json`
   - `.sessions.json` - if it exists
   - the entire `lib/` directory
   - any additional nodes you have manually installed under the `nodes/` directory

4. With your data moved, ensure that the new directory and the files within it are
owned by and writeable by the user that you use to run Node-RED.

5. Delete the old Node-RED install directory and install the
   new version following the [install instructions](installation.html).

6. If you had npm-installed any additional nodes, or manually copied in nodes
   which have their own npm dependencies, you will need to [reinstall them](adding-nodes.html).

_Note_: the reason for using the `--unsafe-perm` option is that when node-gyp tries
to recompile any native libraries it tries to do so as a "nobody" user and then
fails to get access to certain directories. This causes the nodes in question
(eg serialport) not to be installed. Allowing it root access during install
allows the nodes to be installed correctly during the upgrade.
