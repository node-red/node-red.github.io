---
layout: default
title: Upgrading
---   

### Backup your flows and library files

**You must backup your flows and library files before upgrading.**

From the Node-RED install directory, copy the following files to another location:

- `settings.js`, if you have customised it,
- files ending in `.json` in the top-level directory, but not `package.json`,
- the entire `lib/` directory,
- any additional nodes installed in the `nodes/` directory.


### Upgrading a release

1. Delete, or rename, the existing Node-RED install directory.
2. Follow the normal [instructions](http://nodered.org/docs/getting-started/installation.html)
   for installing a release.
3. This will result in a new folder called `node-red-X.Y.Z` where `X.Y.Z` is the
   version number. This can be renamed to the original install directory name if
   needed.
4. Copy your backed-up files into the new release.

*Note*: if you have modified the default `settings.js` you should merge the
changes into the version supplied with the new release rather than copy over it.

*Note*: If you did backup `package.json` then do NOT allow it to copy over the new version.


### Upgrading via npm

If you have npm installed Node-RED as part of [embedding into an existing
application](../embedding.html), the `npm update` command can be used to update
to the latest version.

Once updated, copy your backed-up files back into the `node_modules/node-red`
directory.

### Upgrading from GitHub

If you used git clone to install then the usual git commands apply:

    $ git pull

You should also use npm to update any node modules:

    $ npm update




