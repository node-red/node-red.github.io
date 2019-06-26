---
layout: docs-user-guide
toc: toc-user-guide.html
title: Settings file
slug: settings
---

You can configure Node-RED using a settings file.

### Where is my settings file?

When Node-RED starts, it looks for a file called `settings.js` in your Node-RED
user directory, `~/.node-red`. If it does not find one there, it will copy in a
default settings file to that directory and use it.

Alternatively, the `--settings` command-line argument can be used when starting
Node-RED to point at a different file.

If you have not yet run Node-RED and want to edit the settings file, you can copy
the default settings file in manually from [here](https://github.com/node-red/node-red/blob/master/packages/node_modules/node-red/settings.js).

If you are not sure which settings file Node-RED is using, you should check the log
output when Node-RED starts up. It will log the full path to the file:

    22 Jun 12:34:56 - [info] Settings file  : /Users/nol/.node-red/settings.js

### Editing the settings file

The settings file is loaded into the runtime as a Node.js module that exports
a JavaScript object of key/value pairs.

The default settings file comes with many options commented out. For example,
the option to format your flow file to make it easier to read:

    //flowFilePretty: true,

To enable that option, remove the `//` at the start of the line.

If you add a new option to the file, be sure to add a comma to separate it from
any options before or after it.

If there is a syntax error in the file, Node-RED will not be able to start. The
log output will indicate where the error is.
