---
layout: default
title: Command-line Administration
---

The [node-red-admin](http://npmjs.org/package/node-red-admin) command-line tool allows you to remotely administer a node-red
instance.

### Installation

Install this globally to make the `node-red-admin` command available on
your path:

    npm install -g node-red-admin

<div class="doc-callout">
<em>Note</em>: <code>sudo</code> is required if running as a non-root user on Linux/OS X. If
running on Windows, you will need to run in a <a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">command shell as Administrator</a>,
without the <code>sudo</code> command.
</div>


### Target and Login

The tool must first be pointed at the Node-RED instance you want it to access. By
default, it assumes `http://localhost:1880`. To change that, use the `target` command:

    node-red-admin target http://node-red.example.com/admin

If [authentication](security.html) is enabled, you must then `login`:

    node-red-admin login

These commands create a file called `~/.node-red/cli-config.json` that stores 
the target and access token information.

### Other commands

The tool provides the following commands:

 - `list` - List all of the installed nodes
 - `info` - Display more information about the module or node set
 - `enable` - Enable the specified module or node set
 - `disable` - Disable the specified module or node set
 - `search` - Search NPM for Node-RED modules relating to the search-term given
 - `install` - Install a module from NPM
 - `remove` - Remove an NPM module

