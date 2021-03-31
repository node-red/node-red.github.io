---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Packaging a Subflow as a module
slug: subflow module
---

<div class="doc-callout">
<b>Subflow Modules were added in Node-RED 1.3.</b><br>
They should be considered experimental at this stage. If you chose to publish
your own Subflow, please ensure it has been thoroughly tested.
</div>

Subflows can be packaged as npm modules and distributed like any other node.

When they are installed, they will appear in the palette as regular nodes. Users are not able to see or modify the flow inside the subflow.

At this stage, creating Subflow module is a manual process that requires hand-editing the Subflow JSON. We will provide tooling in the future to help automate this - but for now, these instructions should help you get started.


### Creating a subflow

Any subflow can be packaged as a module. Before you do so, you need to think about how it will be used. The following checklist is a useful reminder of the things to consider:

 - Configuration - what will the user need to configure in the subflow. You can define subflow properties and what UI is provided to set those properties via the [Subflow Properties edit dialog](/docs/user-guide/editor/workspace/subflows#editing-subflow-properties).
 - Error handling - does your subflow handle it errors properly? Some errors might make sense to handle inside the subflow, some may need to be passed out of the subflow to allow the end user to handle them.
 - Status - you can add a custom status output to your Subflow that can be handled by the 'Status' node.
 - Appearance - make sure to give your subflow an icon, colour and category that makes sense for the function it provides.

### Adding subflow metadata

The Subflow can hold additional metadata that can be used to define the module it will packaged in.

On the [Subflow Module Properties edit dialog](/docs/user-guide/editor/workspace/subflows#editing-subflow-metadata) you can set the following properties:

 - `Module` - the npm package name
 - `Node Type` - this will default to the `id` property of the subflow. It is helpful to provide a better type value. As with regular node types, it must be unique to avoid conflicts with other nodes.
 - `Version`
 - `Description`
 - `License`
 - `Author`
 - `Keywords`

### Creating the module

This is where the manual work outside of Node-RED comes in.

1. create a directory with the name you want to give the module. For this example, we'll use `node-red-example-subflow`.

      mkdir node-red-example-subflow
      cd node-red-example-subflow

2. Use `npm init` to create a `package.json` file:

      npm init

  It will ask a series of questions - provide matching answers to the values you added to the subflow metadata.

3. Add a `README.md` file - as all good modules must have a README.

4. Create a JavaScript wrapper for your module. For this example, we'll use `example.js`:

    ```javascript
    const fs = require("fs");
    const path = require("path");

    module.exports = function(RED) {
        const subflowFile = path.join(__dirname,"subflow.json");
        const subflowContents = fs.readFileSync(subflowFile);
        const subflowJSON = JSON.parse(subflowContents);
        RED.nodes.registerSubflow(subflowJSON);
    }
    ```

    This reads the contents of a file called `subflow.json` - which we'll create in a moment - parses it and then passes it to the `RED.nodes.registerSubflow` function.

### Add your subflow json

With all of that in place, you can now add your subflow to the module. This requires some careful editing of the subflow json.

1. In the Node-RED editor, add a new instance of your subflow to the workspace.
2. With the instance selected, export the node (`Ctrl-E` or `Menu->Export`) and paste the JSON into a text editor. The next steps will be easier if you select the 'formatted' option on the JSON tab of the Export dialog.

The JSON is structured as an Array of Node objects. The last-but-one entry is the Subflow Definition and the last entry is the Subflow Instance you added to the workspace.

```json
[
   { "id": "Node 1", ... },
   { "id": "Node 2", ... },
   ...
   { "id": "Node n", ... },
   { "id": "Subflow Definition Node", ... },
   { "id": "Subflow Instance Node", ... }
]
```

1. Delete the Subflow Instance Node - the last entry in the Array.
2. Move the Subflow Definition Node to the top of the file - above the opening `[` of the Array
3. Move the remaining Array of nodes *inside* the Subflow Definition Node as a new property called `"flow"`.
4. Make sure you tidy up any trailing commas between the moved entries.
5. Save this file as `subflow.json`

```json
{
    "id": "Subflow Definition Node",
    ...
    "flow": [
       { "id": "Node 1", ... },
       { "id": "Node 2", ... },
       ...
       { "id": "Node n", ... }
    ]
}
```

### Update your package.json

The final task is to update your `package.json` so that Node-RED knows what your module contains.

Add a `"node-red"` section, with a `"nodes"` section containing an entry for your `.js` file:

```json
{
    "name": "node-red-example-subflow",
    ...
    "node-red": {
        "nodes": {
            "example-node": "example.js"
        }
    }
}
```

### Adding dependencies

If your subflow uses any non-default nodes, you must make sure your `package.json` file lists
them as dependencies. This will ensure they will get installed alongside your module.

The modules are listed in the standard top-level `"dependencies"` section *and* a `"dependencies"` section in the `"node-red"` section.

```json
{
    "name": "node-red-example-subflow",
    ...
    "node-red": {
        "nodes": {
            "example-node": "example.js"
        },
        "dependencies": [
            "node-red-node-random"
        ]
    },
    "dependencies": {
        "node-red-node-random": "1.2.3"
    }
}
```