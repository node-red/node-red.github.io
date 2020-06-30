---
layout: docs-user-guide
toc: toc-user-guide.html
title: Command-line Administration
slug: node-red-admin
redirect_from:
  - /docs/node-red-admin
---

The [node-red-admin](http://npmjs.org/package/node-red-admin) command-line tool allows you to remotely administer a Node-RED
instance.

Since Node-RED 1.1.0, `node-red-admin` is now built into the `node-red` command -
you do not need to install it separately.

To run it, you use `node-red admin` instead of `node-red-admin`.


### Installation

Install this globally to make the `node-red-admin` command available on
your path:

    npm install -g --unsafe-perm node-red-admin

<div class="doc-callout">
<em>Note</em> : <code>sudo</code> is required if running as a non-root user on Linux/OS X. If
running on Windows, you will need to run in a <a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">command shell as Administrator</a>,
without the <code>sudo</code> command.
</div>


### Target and Login

To remotely administer a Node-RED instance, the tool must first be pointed at the Node-RED instance you want
it to access. By default, it assumes `http://localhost:1880`. To change that, use the `target` command:

    node-red-admin target http://node-red.example.com/admin

If [authentication](/docs/user-guide/runtime/securing-node-red) is enabled, you must then `login`:

    node-red-admin login

These commands create a file called `~/.node-red/.cli-config.json` that stores
the target and access token information.

<div class="doc-callout">
<em>Note</em> : The `hash-pw` option does <i>not</i> require the tool to be logged in and can be run at any time.
</div>

### Other commands

The tool provides the following commands:

 - `target`  - Set or view the target URL and port like http://localhost:1880
 - `login`   - Log user in to the target of the Node-RED admin API
 - `list`    - List all of the installed nodes
 - `info`    - Display more information about the module or node
 - `enable`  - Enable the specified module or node set
 - `disable` - Disable the specified module or node set
 - `search`  - Search for Node-RED modules to install
 - `install` - Install the module from NPM to Node-RED
 - `remove`  - Remove the NPM module from Node-RED
 - `hash-pw` - Create a password hash that can be used with the `adminAuth` and `httpNodeAuth` settings