---
layout: docs
toc: editor-guide-toc.html
title: Selection
---

A node is selected when it is clicked on. This will deselect anything currently
selected. The Information Sidebar will update to show the node's properties and
help text for its type.

If the `Ctrl` or `Command` key is held when clicking on the node, the node will
be added to the current selection (or removed if it was already selected).

If the `Shift` key is held when clicking on the node, it will select that node
and all other nodes it is connected to.

A wire is selected when it is clicked on. Unlike nodes, it is only possible to
select one wire at a time.

### Lasso Tool

<div style="width: 460px" class="figure align-right">
  <img src="../images/editor-workspace-lasso.png" alt="Selecting multiple nodes with the lasso tool">
  <p class="caption">Selecting multiple nodes with the lasso tool</p>
</div>

The lasso tool can be used to select multiple nodes. It is enabled by click-dragging
on the workspace.

It cannot be used to select a wire.

<br style="clear: both;" />

### Selecting all nodes

To select all nodes on the current flow, ensure the workspace has focus and then
press `Ctrl/Command-a`.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:select-all-nodes</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-a</code></td></tr>
</table>

### Editor clipboard

<div style="width: 400px; float: right">
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:copy-selection-to-internal-clipboard</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-c</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:cut-selection-to-internal-clipboard</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-x</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:paste-selection-from-internal-clipboard</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-v</code></td></tr>
</table>
</div>

The editor supports the standard copy/cut/paste actions. Note they use an internal
clipboard rather than the system clipboard.
