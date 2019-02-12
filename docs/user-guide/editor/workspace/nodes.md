---
layout: docs
toc: editor-guide-toc.html
title: Nodes
---

Nodes can be added to the workspace by either:

 - dragging them from the [palette](../palette),
 - using the [quick-add dialog](#quick-add-dialog),
 - or importing from the library or clipboard.


 <div style="width: 222px" class="figure align-right">
   <img src="../images/editor-node-port-label.png" alt="Node port labels">
   <p class="caption">Node port labels</p>
 </div>

Nodes are joined together by wires via their ports. A node can have at most one
input port and many output ports. A port may have a label that is displayed
when the mouse hovers over it. A node may specify labels, for example, the Switch
node shows the rule that matches the port. The labels can also be customised
in the node edit dialog.

Some nodes display a status message and icon below the node. This is used to indicate
the runtime state of the node - for example, the MQTT nodes indicate if they are
currently connected or not.

<div style="width: 550px" class="figure">
  <img src="../images/editor-node-details.png" alt="">
  <p class="caption">Node elements</p>
</div>

If a node has any undeployed changes, it displays a blue circle above it. If there
are errors with its configuration, it displays a red triangle.

Some nodes include a button on either its left or right edge. These allow some
interaction with the node from within the editor. The Inject and Debug nodes
are the only core nodes that have buttons.

#### Quick-Add dialog

The Quick-Add dialog provides an easy way to add a node to the workspace wherever
the mouse is, without having to drag it over from the palette.

<div style="width: 340px" class="figure align-right">
  <img src="../images/editor-quick-add.png" alt="Quick-Add dialog">
  <p class="caption">Quick-Add dialog</p>
</div>

The dialog is opened by holding the `Ctrl` or `Command` key when clicking on the
workspace.

The dialog contains a complete list of all nodes available to add. It shows the
five main core nodes at the top of the list, followed by any recently added nodes
and finally a complete, alphabetical, list of the remaining nodes.

As with the main palette, the dialog has an input at the top to filter the list
and quickly find a node.

#### Editing node configuration

A node's configuration can be edited by double clicking on the node, or pressing
`Enter` when the workspace has focus. If multiple nodes are selected, the *first*
node in the selection will be edited.

<div class="figure">
  <img style="width: calc(50% - 10px); display: inline-block;" src="../images/editor-edit-node.png" alt="Node edit dialog - properties">
  <img style="width: calc(50% - 10px); margin-left: 10px; display: inline-block;"  src="../images/editor-edit-node-settings.png" alt="Node edit dialog - properties">
  <p class="caption">Node edit dialog - properties and settings sections</p>
</div>

The node edit dialog has two separate sections; properties and settings. The
properties section shows the edit form specific to the node type being edited.
The settings section shows the common settings that can be set on all nodes.
This includes the custom port labels as well as the icon for the node.

Clicking on the icon shows the Node icon picker that can be used to select the icon
for the node from the list of all available icons.

<div style="width:346px;" class="figure align-center">
  <img src="../images/editor-edit-node-settings-icon.png" alt="Node icon picker">
  <p class="caption">Node icon picker</p>
</div>

#### Configuration nodes

A Configuration (config) Node is a special type of node that holds reusable configuration
that can be shared by regular nodes in a flow.

For example, the MQTT In and Out nodes use an MQTT Broker config node to
represent a shared connection to an MQTT broker.

Configuration nodes are added through the edit dialog of a node that requires
the config node. It will have a field to select from the available config nodes
of the required type or to add a new instance.

<div style="width:468px;" class="figure align-center">
  <img src="../images/editor-edit-node-config-node.png" alt="Adding a configuration node">
  <p class="caption">Adding a configuration node</p>
</div>

Clicking the button next to the select box will open the edit dialog for the
selected node, or add a new instance.


<div  class="figure">
  <img src="../images/editor-edit-config-node.png" alt="Configuration node edit dialog">
  <p class="caption">Configuration node edit dialog</p>
</div>

The config node edit dialog only has the node properties section - as a config node
has no icon or ports to set labels on.

In the footer of the dialog is an indication of how many nodes use this config node.
It also provides a select box to set the scope of the config node. The scope
determines which flows the config node is available on. By default it is available
on all flows, but the select box can be used to make it local to just one flow.

The [Configuration Nodes Sidebar](sidebar/config) can be used to manage all config nodes.
