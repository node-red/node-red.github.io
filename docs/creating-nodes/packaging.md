---
layout: default
title: Packaging
---

Nodes can be packaged as npm modules. This makes them easy to install along with
any dependencies they may have.

Here is a typical directory structure for a node package:

    - package.json
    - nodes
         \-sample
              |-sample.html
              \-sample.js

Along with the usual entries, the `package.json` file must contain a `node-red`
entry that identifies what nodes the module provides. It does this by including
a pointer to each node's `.js` file.

If any of the nodes have dependencies on other npm modules, they must be included
in the `dependencies` property.

    {
        "name"         : "node-red-samplenode",
        "version"      : "0.0.1",
        "description"  : "A sample node for node-red",
        "dependencies": {
        },
        "node-red"     : {
            "nodes": {
                "sample": "nodes/sample/sample.js"
            }
        }
    }


