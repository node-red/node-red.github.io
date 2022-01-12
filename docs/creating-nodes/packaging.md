---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Packaging
slug: packaging
---

Nodes can be packaged as modules and published to the npm repository. This makes
them easy to install along with any dependencies they may have.

### Naming

Packages first published after the 1st Feb 2022 should use a [scoped name](https://docs.npmjs.com/cli/v8/using-npm/scope), within the scope of your own namespace there are no other restrictions on what you can name your package, you may use either `@myScope/node-red-sample` or `@myScope/sample` Please remember to use `node-red` not `nodered`.

If you are forking an existing pacakge you should keep the same name but release under your own scope, (if its an unscoped package then use the contrib name under your own scope) Remember, forking should be a last resort if the orignal maintainer is not responsive to your contributions.

Older packages used an unscoped namespace and the `node-red-contrib-*` format, these do not need to be changed.

### Directory structure

Here is a typical directory structure for a node package:

```
├── LICENSE
├── README.md
├── package.json
├── examples
    │   ├── example-1.json
    │   └── example-2.json
└── sample
    ├── icons
    │   └── my-icon.svg
    ├── sample.html
    └── sample.js
```

There are no strict requirements over the directory structure used within the
package. If a package contains multiple nodes, they could all exist in the same
directory, or they could each be placed in their own sub-directory.
The examples folder must be in the root of the package.

### Testing a node module locally

To test a node module locally, the [`npm install <folder>`](https://docs.npmjs.com/cli/install) command can be used. This allows you
to develop the node in a local directory and have it linked into a local node-red install during development.

In your node-red user directory, typically `~/.node-red`, run:

    npm install <path to location of node module>

This creates the appropriate symbolic link to the directory so that Node-RED
will discover the node when it starts. Any changes to the node's file can be picked
up by simply restarting Node-RED.

### package.json

Along with the usual entries, the `package.json` file must contain a `node-red`
entry that lists the `.js` files that contain nodes for the runtime to load.

If you have multiple nodes in a single file, you only have to list the file once.

If any of the nodes have dependencies on other npm modules, they must be included
in the `dependencies` property.

To help make the nodes discoverable within the npm repository, the file should
include `node-red` in its `keywords` property. This will ensure the package
appears when [searching by keyword](https://www.npmjs.org/browse/keyword/node-red).

<div class="doc-callout"><em>Note</em> : Please do NOT add the `node-red` keyword until
you are happy that the node is stable and working correctly, and documented sufficiently
for others to be able to use it.</div>

{% highlight json %}
{
    "name"         : "@myScope/node-red-sample",
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

You should specify what versions of Node-RED your nodes support with a `version` entry. For example, the following means the node requires Node-RED 2.0 or later.

{% highlight json %}
"node-red"     : {
    "version": ">=2.0.0",
    "nodes": {
        "sample": "sample/sample.js"
    }
}
{% endhighlight %}


### README.md

The README.md file should describe the capabilities of the node, and list any
pre-requisites that are needed in order to make it function. It may also be
useful to include any extra instructions not included in the *info* tab part
of the node's html file, and maybe even a small example flow demonstrating it's
use.

The file should be marked up using
[GitHub flavoured markdown](https://help.github.com/articles/markdown-basics/).

### LICENSE

Please include a license file so that others may know what they can and cannot
do with your code.

### Publishing to npm

There are lots of guides to publishing a package to the npm repository.
A basic overview is available [here](https://docs.npmjs.com/misc/developers).

### Adding to flows.nodered.org

As of April 2020, the [the Node-RED Flow Library](https://flows.nodered.org)
is no longer able to automatically index and update nodes published on
npm with the `node-red` keyword. Instead, a submission request has to be
placed manually.

To do so, make sure all of the packaging requests are met. To add a new node
to the library, click on the `+` button at the top of
[the library's page](https://flows.nodered.org), and select the 'node' option.
This button takes you to
[the Adding a Node page](https://flows.nodered.org/add/node). Here, the list of
requirements is repeated and describes the steps to have it added to the
library.

To update an existing node, you can either resubmit it the same way as you
would for a new node, or request a refresh from the node's page on the
flow library through the 'request refresh' link. This is only visible to
logged in users.

If it does not appear after that time, you can ask for help on the
[Node-RED forum](https://discourse.nodered.org) or
[slack](https://nodered.org/slack).
