---
layout: default
title: Upgrading
---   

If you have installed Node-RED as a global npm package, you can upgrade to the
latest version with the following command:

    npm update -g node-red

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

4. With your data moved, delete the Node-RED install directory and install the
   new version following the [install instructions](installation.html).

5. If you had npm-installed any additional nodes, or manually copied in nodes
   which have their own npm dependencies, you will need to [reinstall them](adding-nodes.html).

