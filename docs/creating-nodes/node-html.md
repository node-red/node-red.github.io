---
layout: default
title: HTML File
---

The node `.html` file defines the how the node appears with the editor. It
contains three distinct part, each wrapped in its own `<script>` tag:

1. the main node definition that is registered with the editor. This defines
   things such as the palette category, the editable properties (`defaults`) and
   what icon to use. It is within a regular javascript script tag

2. the edit template that defines the content of the edit dialog for the node.
   It is defined in a script of type `text/x-red` with `data-template-name` set
   to the [type of the node](#node-type).

3. the help text that gets displayed in the Info sidebar tab. It is defined in a
   script of type `text/x-red` with `data-help-name` set to the
   [type of the node](#node-type).



### Defining a node

A node must be registered with the editor using the `RED.nodes.registerType`
function.

This function takes two arguments; the type of the node and its definition:

    <script type="text/javascript">
        RED.nodes.registerType('node-type',{
            // node definition
        });
    </script>

#### Node type

The node type is used throughout the editor to identify the node. It must
match the value used by the call to `RED.nodes.registerType` in the corresponding
`.js` file.

The type is also used as the label for the node in the palette. If the type ends
with " in" or " out" this is stripped off label. For example, the "mqtt in" and
"mqtt out" nodes are both labelled as "mqtt", with the display of the input and
output ports providing the "in" or "out" context.

#### Node definition

The node definition contains all of the information about the node needed by the
editor. It is an object with the following properties:


- `category`: (string) the palette category the node appears in
- `defaults`: (object) the [editable properties](properties.html) for the node.
- `credentials`: (object) the [credential properties](credentials.html) for the node.
- `inputs`: (number) how many inputs the node has, either `0` or `1`.
- `outputs`: (number) how many outputs the node has. Can be `0` or more.
- `icon`: (string) the [icon](appearance.html#icon) to use.
- `color`: (string) the [background colour](appearance.html#background-colour) to use.
- `label`: (string\|function) the [label](appearance.html#label) to use.
- `paletteLabel`: (string\|function) the [label](appearance.html#label) to use in the palette.
- `labelStyle`: (string\|function) the [style](appearance.html#label-style) to apply to the label.
- `align`: (string) the [alignment](appearance.html#alignment) of the icon and label.
- `oneditprepare`: (function) called when the edit dialog is being built. See [custom edit behaviour](properties.html#custom-edit-behaviour).
- `oneditsave`: (function) called when the edit dialog is okayed. See [custom edit behaviour](properties.html#custom-edit-behaviour).
- `oneditcancel`: (function) called when the edit dialog is cancelled. See [custom edit behaviour](properties.html#custom-edit-behaviour).
- `oneditdelete`: (function) called when the delete button in a configuration node's edit dialog is pressed. See [custom edit behaviour](properties.html#custom-edit-behaviour).
- `onpaletteadd`: (function) called when the node type is added to the palette.
- `onpaletteremove`: (function) called when the node type is removed from the palette.

### Edit dialog

The edit template for a node describes the content of its edit dialog.

    <script type="text/x-red" data-template-name="node-type">
        <div class="form-row">
            <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
            <input type="text" id="node-input-name" placeholder="Name">
        </div>
    </script>


There are some simple conventions to follow:

 - a `<div>` with class `form-row` should be used to layout each row of the
   dialog.
 - a typical row will have a `<label>` that contains an icon and the name of the
   property followed by an `<input>`. The icon is created using an `<i>` element
   with a class taken from those available from [Font Awesome](http://fortawesome.github.io/Font-Awesome/icons/).

   Note: we previously used the icons provided by [Bootstrap](http://getbootstrap.com/2.3.2/base-css.html#icons).
   Their use is now deprecated within Node-RED in preference to Font Awesome.
 - if more interactivity is required, `oneditprepare` can be used to attach
   any event handlers on the dialog elements.


More information on how the edit template is used is available
[here](properties.html#property-edit-dialog).




### Help text

When a node is selected, its help text is displayed in the info tab. This should
provide a meaningful description of what the node does. It should identify what
properties it sets on outgoing messages and what properties can be set on incoming
messages.

The content of the first `<p>` tag is used as the tooltip when hovering over
nodes in the palette.

    <script type="text/x-red" data-help-name="node-type">
       <p>Some useful help text about the node.</p>
       <p>Outputs an object called <b>msg</b> containing <b>msg.topic</b> and
       <b>msg.payload</b>. msg.payload is a String.</p>
    </script>
