---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: HTML File
slug: .html
---

The node `.html` file defines how the node appears with the editor. It
contains three distinct part, each wrapped in its own `<script>` tag:

1. the main node definition that is registered with the editor. This defines
   things such as the palette category, the editable properties (`defaults`) and
   what icon to use. It is within a regular javascript script tag

2. the edit template that defines the content of the edit dialog for the node.
   It is defined in a script of type `text/html` with `data-template-name` set
   to the [type of the node](#node-type).

3. the help text that gets displayed in the Info sidebar tab. It is defined in a
   script of type `text/html` with `data-help-name` set to the
   [type of the node](#node-type).



### Defining a node

A node must be registered with the editor using the `RED.nodes.registerType`
function.

This function takes two arguments; the type of the node and its definition:

~~~~html
<script type="text/javascript">
    RED.nodes.registerType('node-type',{
        // node definition
    });
</script>
~~~~

#### Node type

The node type is used throughout the editor to identify the node. It must
match the value used by the call to `RED.nodes.registerType` in the corresponding
`.js` file.

The type is also used as the label for the node in the palette. If the type ends
with " in" or " out" this is stripped off label. For example, the "mqtt in" and
"mqtt out" nodes are both labeled as "mqtt", with the display of the input and
output ports providing the "in" or "out" context.

#### Node definition

The node definition contains all of the information about the node needed by the
editor. It is an object with the following properties:


- `category`: (string) the palette category the node appears in
- `defaults`: (object) the [editable properties](properties) for the node.
- `credentials`: (object) the [credential properties](credentials) for the node.
- `inputs`: (number) how many inputs the node has, either `0` or `1`.
- `outputs`: (number) how many outputs the node has. Can be `0` or more.
- `color`: (string) the [background colour](appearance#background-colour) to use.
- `paletteLabel`: (string\|function) the [label](appearance#label) to use in the palette.
- `label`: (string\|function) the [label](appearance#label) to use in the workspace.
- `labelStyle`: (string\|function) the [style](appearance#label-style) to apply to the label.
- `inputLabels`: (string\|function) optional [label](appearance#port-labels) to add on hover to the input port of a node.
- `outputLabels`: (string\|function) optional [labels](appearance#port-labels) to add on hover to the output ports of a node.
- `icon`: (string) the [icon](appearance#icon) to use.
- `align`: (string) the [alignment](appearance#alignment) of the icon and label.
- `button`: (object) adds a [button](appearance#buttons) to the edge of the node.
- `oneditprepare`: (function) called when the edit dialog is being built. See [custom edit behaviour](properties#custom-edit-behaviour).
- `oneditsave`: (function) called when the edit dialog is okayed. See [custom edit behaviour](properties#custom-edit-behaviour).
- `oneditcancel`: (function) called when the edit dialog is canceled. See [custom edit behaviour](properties#custom-edit-behaviour).
- `oneditdelete`: (function) called when the delete button in a configuration node's edit dialog is pressed. See [custom edit behaviour](properties#custom-edit-behaviour).
- `oneditresize`: (function) called when the edit dialog is resized. See [custom edit behaviour](properties#custom-edit-behaviour).
- `onpaletteadd`: (function) called when the node type is added to the palette.
- `onpaletteremove`: (function) called when the node type is removed from the palette.

### Edit dialog

The edit template for a node describes the content of its edit dialog.

```html
<script type="text/html" data-template-name="node-type">
    <div class="form-row">
        <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
        <input type="text" id="node-input-name" placeholder="Name">
    </div>
    <div class="form-tips"><b>Tip:</b> This is here to help.</div>
</script>
```

More information about the edit dialog is available [here](edit-dialog).

### Help text

When a node is selected, its help text is displayed in the info tab. This should
provide a meaningful description of what the node does. It should identify what
properties it sets on outgoing messages and what properties can be set on incoming
messages.

The content of the first `<p>` tag is used as the tooltip when hovering over
nodes in the palette.

~~~~html
<script type="text/html" data-help-name="node-type">
   <p>Some useful help text to introduce the node.</p>
   <h3>Outputs</h3>
       <dl class="message-properties">
       <dt>payload
           <span class="property-type">string | buffer</span>
       </dt>
   <h3>Details</h3>
   <p>Some more information about the node.</p>
</script>
~~~~

A complete style guide for node help is [available here](help-style-guide).
