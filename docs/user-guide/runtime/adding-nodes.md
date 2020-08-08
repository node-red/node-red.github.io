---
layout: docs-user-guide
toc: toc-user-guide.html
title: Adding nodes to the palette
slug: adding nodes
redirect_from:
  - /docs/getting-started/adding-nodes

---

Node-RED comes with a core set of useful nodes, but there are many more available
from both the Node-RED project as well as the wider community.

You can search for available nodes in the [Node-RED library](http://flows.nodered.org).

### Using the Editor

You can install nodes directly within the editor by selecting the `Manage Palette`
option from the main menu to open the [Palette Manager](/docs/user-guide/editor/palette/manager).

The 'Nodes' tab lists all of the modules you have installed. It shows which you
are using and whether updates are available for any of them.

The 'Install' tab lets you search the catalogue of available node modules
and install them.


### Installing with npm

To install a node module from the command-line, you can use the following command
from within your user data directory (by default, `$HOME/.node-red`):

    npm install <npm-package-name>

You will then need to restart Node-RED for it to pick-up the new nodes.

### The package.json file

When first started, or a new project created, Node-RED will create an initial `package.json` file in your user directory, or project directory. This allows you to manage your additional dependencies, and release versions of your project, using standard npm practices. The initial version is 0.0.1 but should be edited according to your project release requirements.

`npm` will automatically add additional installed modules to the dependencies section of the `package.json` file in your user directory.

### Upgrading nodes

The easiest way to check for node updates is to open the [Palette Manager](/docs/user-guide/editor/palette/manager) in the editor. You can then apply those updates as
needed.

You can also check for updates from the command-line using `npm`. In your user
directory, `~/.node-red` run the command:

```
npm outdated
```

That will highlight any modules that have updates available. To install the latest
version of any module, run the command:

```
npm install <name-of-module>@latest
```

Whichever approach you take, you will need to restart Node-RED to load the updates.

<div class="doc-callout"><em>Note</em> : the reason for using the
<code>--unsafe-perm</code> option is that when node-gyp tries to recompile any
native libraries it tries to do so as a "nobody" user and then fails to get
access to certain directories. This causes the nodes in question (for example,
serialport) not to be installed. Allowing it root access during install
allows the nodes to be installed correctly during the upgrade.</div>
