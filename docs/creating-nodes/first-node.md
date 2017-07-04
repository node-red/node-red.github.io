---
layout: docs
toc: creating-nodes-toc.html
title: Creating your first node
---

Nodes get created when a flow is deployed, they may send and receive some messages
whilst the flow is running and they get deleted when the next flow is deployed.

They consist of a pair of files; a JavaScript file that defines what the
node does, and an html file that defines the node's properties, edit dialog and
help text.

When packaged as an npm module, a `package.json` file is used to pull it all together.

 - [Creating a simple node](creating-a-simple-node)
   - [package.json](packagejson)
   - [lower-case.js](lower-casejs)
   - [lower-case.html](lower-casehtml)
 - [Testing your node in Node-RED](testing-your-node-in-node-red)


### Creating a simple node

This example will show how to create a node that converts message payloads to
all lower-case characters.

Create a directory where you will develop your code. Within that directory,
create the following files:

 - `package.json`
 - `lower-case.js`
 - `lower-case.html`

<h4 id="package-json"><i class="fa fa-file-o"></i> package.json</h4>

This is a standard file used by node.js modules to describe their contents.

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

{% highlight javascript %}
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
{% endhighlight %}

The node is wrapped as a node module. The module exports a function that gets called
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


{% highlight html %}
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
{% endhighlight %}    

A node's HTML file provides the following things:

 - the main node definition that is registered with the editor
 - the edit template
 - the help text

In this example, the node has a single editable property, `name`. Whilst not
required, there is a widely used convention to this property to help distinguish
between multiple instances of a node in a single flow.

For more information about the editor part of the node, see [here](node-html).

### Testing your node in Node-RED

Once you have created a basic node module as described above, you can install
it into your Node-RED runtime.

To test a node module locally, the `npm link` command can be used. This allows you
to develop the node in a local directory and have it linked into a local node-red
install, as if it had been npm installed.

1. in the directory containing the node's `package.json` file, run: `sudo npm link`.
2. in your node-red user directory, typically `~/.node-red` run: `npm link <name of node module>`.

This creates the appropriate symbolic links between the two directories so Node-RED
will discover the node when it starts. Any changes to the node's file can be picked
up by simply restarting Node-RED.
