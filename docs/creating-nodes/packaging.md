---
layout: default
title: Packaging
---

Nodes can be packaged as modules and published to the npm repository. This makes
them easy to install along with any dependencies they may have.

### Directory structure

Here is a typical directory structure for a node package:

    - package.json
    - sample
       |-sample.html
       |-sample.js
       \-icons
          \-sample.png
    - README.md
    - LICENSE

There are no strict requirements over the directory structure used within the
package. If a package contains multiple nodes, they could all exist in the same
directory, or they could each be placed in their own sub-directory.

### Testing a node module locally

To test a node module locally, the `npm link` command can be used. This allows you
to develop the node in a local directory and have it linked into a local node-red
install, as if it had been npm installed.

1. in the directory containing the node's `package.json` file, run: `sudo npm link`.
2. in your node-red user directory, typically `~/.node-red` run: `npm link <name of node module>`.

This creates the appropriate symbolic links between the two directories so Node-RED
will discover the node when it starts. Any changes to the node's file can be picked
up by simply restarting Node-RED.

### package.json

Along with the usual entries, the `package.json` file must contain a `node-red`
entry that identifies what nodes the module provides, along with a pointer to
their `.js` files.

If any of the nodes have dependencies on other npm modules, they must be included
in the `dependencies` property.

To help make the nodes discoverable within the npm repository, the file should
include `node-red` in its `keywords` property. This will ensure the package
appears when [searching by keyword](https://www.npmjs.org/browse/keyword/node-red).

<div class="doc-callout"><em>Note</em>: Please do NOT add the `node-red` keyword until
you are happy that the node is stable and working correctly, and documented sufficiently
for others to be able to use it.</div>

{% highlight json %}
{
    "name"         : "node-red-contrib-samplenode",
    "version"      : "0.0.1",
    "description"  : "A sample node for node-red",
    "dependencies": {
    },
    "keywords": [ "node-red" ],
    "node-red"     : {
        "nodes": {
            "sample": "sample/sample.js"
        }
    }
}
{% endhighlight %}

### Naming

Node modules should use `node-red-contrib-` as a prefix to their name to make it
clear they are not maintained by the Node-RED project. Alternatively, any name
that doesn't use `node-red` as a prefix can be used.

### README.md

The README.md file should describe the capabilities of the node, and list any
pre-requisites that are needed in order to make it function. It may also be
useful to include any extra instuctions not included in the *info* tab part
of the node's html file, and maybe even a small example flow demonstrating it's
use.

The file should be marked up using
[GitHub flavoured markdown](https://help.github.com/articles/markdown-basics/).

### LICENSE

Please include a license file so that others may know what they can and cannot
do with your code.

### Publishing to npm

There are lots of guides to publishing a package to the npm repository.
A basic overview is available [here](https://www.npmjs.org/doc/misc/npm-developers.html).

Please be sure to publicise your node on the [project mailing list](https://groups.google.com/forum/#!forum/node-red).
