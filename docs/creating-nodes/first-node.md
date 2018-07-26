---
layout: docs
toc: creating-nodes-toc.html
title: Creating your first node
---

Nodes get created when a flow is deployed, they may send and receive some messages
whilst the flow is running and they get deleted when the next flow is deployed.

They typically consist of a pair of files; a JavaScript file that defines what the
node does, and an html file that defines the node's properties, edit dialog and
help text.

A `package.json` file is used to package it all together as an npm module.

 - [Creating a simple node](#creating-a-simple-node)
   - [package.json](#package-json)
   - [lower-case.js](#lower-casejs)
   - [lower-case.html](#lower-casehtml)
 - [Testing your node in Node-RED](#testing-your-node-in-node-red)

### Creating a simple node

This example will show how to create a node that converts message payloads to
all lower-case characters.

Ensure you have the recommended LTS version of Node.js installed on your system.  As of this writing this is version **LTS 8.x** which includes npm version 5.x.

Create a directory where you will develop your code. Within that directory, create the following files:

 - `package.json`
 - `lower-case.js`
 - `lower-case.html`

<h4 id="package-json"><i class="fa fa-file-o"></i> package.json</h4>

This is a standard file used by Node.js modules to describe their contents.

To generate a standard `package.json` file you can use the command `npm init`.
This will ask a series of questions to help create the initial content for the
file, using sensible defaults where it can. When prompted, give it the name
`node-red-contrib-example-lower-case`.

Once generated, you must added a `node-red` section:

```json
{
    "name" : "node-red-contrib-example-lower-case",
    ...
    "node-red" : {
        "nodes": {
            "lower-case": "lower-case.js"
        }
    }
}
```

This tells the runtime what node files the module contains.

For more information about how to package your node, including requirements on
naming and other properties that should be set before publishing your node, refer
to the [packaging guide](packaging).

**Note**: Please do ***not*** publish this example node to npm!

<h4 id="lower-casejs"><i class="fa fa-file-o"></i> lower-case.js</h4>

```javascript
module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}
```

The node is wrapped as a Node.js module. The module exports a function that gets called
when the runtime loads the node on start-up. The function is called with a single
argument, `RED`, that provides the module access to the Node-RED runtime api.

The node itself is defined by a function, `LowerCaseNode` that gets called whenever
a new instance of the node is created. It is passed an object containing the
node-specific properties set in the flow editor.

The function calls the `RED.nodes.createNode` function to initialise the features
shared by all nodes. After that, the node-specific code lives.

In this instance, the node registers a listener to the `input` event which gets
called whenever a message arrives at the node. Within this listener, it changes
the payload to lower case, then calls the `send` function to pass the message
on in the flow.

Finally, the `LowerCaseNode` function is registered with the runtime using the
name for the node, `lower-case`.

If the node has any external module dependencies, they must be included in the `dependencies`
section of its `package.json` file.

For more information about the runtime part of the node, see [here](node-js).

<h4 id="lower-casehtml"><i class="fa fa-file-o"></i> lower-case.html</h4>


```html
<script type="text/javascript">
    RED.nodes.registerType('lower-case',{
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: {value:""}
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() {
            return this.name||"lower-case";
        }
    });
</script>

<script type="text/x-red" data-template-name="lower-case">
    <div class="form-row">
        <label for="node-input-name"><i class="icon-tag"></i> Name</label>
        <input type="text" id="node-input-name" placeholder="Name">
    </div>
</script>

<script type="text/x-red" data-help-name="lower-case">
    <p>A simple node that converts the message payloads into all lower-case characters</p>
</script>
```

A node's HTML file provides the following things:

 - the main node definition that is registered with the editor
 - the edit template
 - the help text

In this example, the node has a single editable property, `name`. Whilst not
required, there is a widely used convention to this property to help distinguish
between multiple instances of a node in a single flow.

For more information about the editor part of the node, see [here](node-html).

### Testing your node in Node-RED

Once you have created a basic node module as described above, you can install it into your Node-RED runtime.

To test a node module locally using npm 5.x, the [`npm install <folder>`](https://docs.npmjs.com/cli/install) command can be used. This allows you
to develop the node in a local directory and have it linked into a local node-red install during development.

In your node-red user directory, typically `~/.node-red`, run:

    npm install <location of node module>

For example, on Mac OS or linux, if your node is located at `~/dev/node-red-contrib-example-lower-case` you would type the following:

    cd ~/.node-red
    npm install ~/dev/node-red-contrib-example-lower-case

This creates a symbolic link to your node module project directory in  `~/.node-red/node_modules` so that Node-RED will discover the node when it starts. Any changes to the node's file can be picked up by simply restarting Node-RED.  On Windows, again, using npm 5.x or greater:

    cd C:\Users\my_name\.node_red
    npm install C:\Users\my_name\Documents\GitHub\node-red-contrib-example-lower-case

If you are using an older version of npm, you can create a symbolic link manually to your project.  For example, on Mac or linux systems:

    cd ~/.node-red/node_modules
    ln -s ~/dev/node-red-contrib-example-lower-case  .

On Windows with older versions of npm, use `mklink` instead:

    cd C:\Users\my_name\.node_red
    mklink /D node_modules\node-red-contrib-example-lower-case C:\Users\my_name\Documents\GitHub\node-red-contrib-example-lower-case

<div class="doc-callout">
<em>Note</em> :  npm 5 will add your module as a dependency in the <code>package.json</code> file located in your user directory.  If you want to prevent this, use the npm <code>--no-save</code> option.
</div>

### Unit Testing

To support unit testing, an npm module called [`node-red-node-test-helper`](https://www.npmjs.com/package/node-red-node-test-helper) can be used.  The test-helper is a framework built on the Node-RED runtime to make it easier to test nodes.

Using this framework, you can create test flows, and then assert that your node properties and output is working as expected.  For example, to add a unit test to the lower-case node you can add a `test` folder to your node module package containing a file called `_spec.js`

<h4><i class="fa fa-file-o"></i> test/_spec.js</h4>

```javascript
var should = require("should");
var helper = require("node-red-test-helper");
var lowerNode = require("../lower-case.js");

describe('lower-case Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "lower-case", name: "test name" }];
    helper.load(lowerNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should make payload lower case', function (done) {
    var flow = [{ id: "n1", type: "lower-case", name: "test name",wires:[["n2"]] },
    { id: "n2", type: "helper" }];
    helper.load(lowerNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        msg.should.have.property('payload', 'uppercase');
        done();
      });
      n1.receive({ payload: "UpperCase" });
    });
  });
});
```

These tests check to see that the node is loaded into the runtime correctly, and that it correctly changes the payload to lower case as expected.

Both tests load the node into the runtime using `helper.load` supplying the node under test and a test flow  The first checks that the node in the runtime has the correct name property.  The second test uses a helper node to check that the output from the node is, in fact, lower case.

The helper module contains other examples of tests taken from the Node-RED core nodes.  For more information on the helper module, see the associated README.