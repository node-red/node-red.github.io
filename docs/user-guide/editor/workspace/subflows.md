---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - url: "/docs/user-guide/editor/workspace"
    label: "workspace"
  - "subflows"
toc: toc-editor-guide.html
title: Subflows
---

A subflow is a collection of nodes that are collapsed into a single node in the workspace.

They can be used to reduce some visual complexity of a flow, or to package up
a group of nodes as a reusable flow used in multiple places.

Once created, the subflow is added to the palette of available nodes. Individual
instances of the subflow can then be added to the workspace just like any other node.

*Note:* a subflow cannot contain an instance of itself - either directly or indirectly.

### Creating an empty subflow

A subflow can be created by selecting the 'Subflow -> Create subflow' option in
the menu. This will create a blank subflow and open it in the workspace.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>Subflows -&gt; Create subflow</code></td></tr>
 <tr><td>Action</td><td><code>core:create-subflow</code></td></tr>
</table>

### Converting nodes to a subflow

It is also possible to convert the current selection of nodes to a subflow by
selecting the 'Subflow -> Selection to Subflow' option in the menu. The nodes
will be moved to a new subflow and replaced by a subflow instance node within the
flow.

<div class="figure">
  <img src="../images/editor-subflow-create-selection.png" alt="Creating a subflow">
  <p class="caption">Creating a subflow</p>
</div>

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-subflow-invalid-selection.png" alt="Invalid subflow selection">
  <p class="caption">Invalid subflow selection</p>
</div>

This is only possible if any wires coming into the selection are connected to one
node - as the resulting subflow node can itself only have at most one input.

<br style="clear: both" />

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>Subflows -&gt; Selection to Subflow</code></td></tr>
 <tr><td>Action</td><td><code>core:convert-to-subflow</code></td></tr>
</table>


### Editing a subflow

There are two ways to open a subflow to edit its contents. Either double click
its node in the palette, or click the 'Edit flow template' button in the edit
dialog of a subflow instance node.

The subflow is opened in the workspace as a new tab. Unlike regular flow tabs,
subflow tabs can be closed to hide them.

<div class="figure">
  <img src="../images/editor-edit-subflow.png" alt="Editing a subflow">
  <p class="caption">Editing a subflow</p>
</div>

#### Inputs & Outputs

The inputs and outputs of the subflow are represented by the grey square nodes that
can be wired into the flow as normal.

The toolbar provides options to add and remove these nodes. As with normal
flows nodes, there can be at most one input and as many outputs as needed.

#### Subflow properties

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-edit-subflow-properties.png" alt="Subflow properties edit dialog">
  <p class="caption">Subflow properties edit dialogn</p>
</div>


The 'edit properties' button opens the subflow properties dialog. As with the Flow
properties dialog, the name and description of the subflow can be set.

The category the subflow appears in can also be set - either by choosing from one
of the existing categories or adding a new one.

#### Deleting a subflow

The 'delete subflow' button in the subflow toolbar can be used to remove the subflow
and *all* instances of it.
