---
layout: default
title: Creating your first node
---

Nodes lead a simple life. They are created when a flow is deployed, they may
send and receive some messages whilst the flow is running and they get deleted
when the next flow is deployed.

They consist of a pair of files; a JavaScript file that defines what the
node does, and an html file that defines the node's properties, edit dialog and
help text.

These files can be located within either the `nodes` directory or one of the
directories defined in the `nodesDir` setting. Alternatively, nodes can be installed
using npm.


### Creating a simple node

The following example defines a simple node that converts a message payload into
all lower-case characters.


#### lower-case.js
    module.exports = function(RED) {
        function LowerCaseNode(config) {
            RED.nodes.createNode(this,config);
            var node = this;
            this.on('input', function(msg) {
                msg.payload = msg.payload.toLowerCase();
                node.send(msg);
            });
        }
        RED.nodes.registerType("lower-case",LowerCaseNode);
    }

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

    
#### lower-case.html
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
    

A node's HTML file provides the following things:

 - the main node definition that is registered with the editor
 - the edit template
 - the help text

In this example, the node has a single editable property, `name`. Whilst not
required, there is a widely used convention to this property to help distinguish
between multiple instances of a node in a single flow.

