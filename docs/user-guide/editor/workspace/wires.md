---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - url: "/docs/user-guide/editor/workspace"
    label: "workspace"
  - "wires"
toc: toc-editor-guide.html
title: Wires
---

<div style="width: 435px" class="figure align-right">
  <img src="../images/editor-node-wire.png" alt="Node elements">
  <p class="caption">Wiring nodes</p>
</div>

Nodes are wired together by pressing the left-mouse button on a node's port, dragging
to the destination node and releasing the mouse button.

Alternatively, if the `Ctrl/Command` key is held down, the left-mouse
button can be clicked (and released) on a node's port and then clicked on the
destination. If the `Ctrl/Command` key remains held and the just-wired destination
node has an output port, a new wire is started from that port. This allows a
set of nodes to be quickly wired together.

This can also be combined with the Quick-Add dialog that is triggered
by a `Ctrl/Command-Click` on the workspace to quickly insert new nodes and have
them already wired to previous nodes in the flow.


#### Splitting wires

If a node with both an input and output port is dragged over the mid-point of a
wire, the wire is draw with a dash. If the node is then dropped, it is automatically
inserted into the flow at that point.

<div class="figure">
  <img src="../images/editor-wiring-splice.png" alt="">
  <p class="caption">Dropping a node on a wire to insert it mid-flow</p>
</div>

#### Moving wires

To disconnect a wire from a port, select the wire by clicking on it, then
press and hold the `Shift` key when the left-mouse button is pressed on the port.
When the mouse is then dragged, the wire disconnects from the port and can be
dropped on another port. If the mouse button is released over the workspace,
the wire is deleted.

If a port has multiple wires connected to it, if none of them is selected when
button is pressed with the `Shift` key held, all of the wires will move.

#### Deleting wires

To delete a wire, first select it by clicking on it and then press the `delete` key.
