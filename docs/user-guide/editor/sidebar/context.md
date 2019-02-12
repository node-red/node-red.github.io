---
layout: docs
toc: editor-guide-toc.html
title: 'Sidebar: Context data'
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar-context.png" alt="Context data Sidebar">
  <p class="caption">Context data Sidebar</p>
</div>

The Context sidebar displays the contents of the context data store.

For more information about using context, read the [Working with context](/docs/user-guide/context) guide.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:show-context-tab</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-g x</code></td></tr>
</table>

The panel is split into three sections, one for each context scope.

The 'Node' section shows the context of the current selected node. It does not
display the contents automatically and requires the user to click the refresh button
to load it.

The 'Flow' section shows the context of the current flow. This automatically refreshes
whenever the flow is changed in the main workspace.

The 'Global' section shows the global context and is loaded each time the editor
is loaded.

For all three scopes, to see changes, the corresponding refresh button must be clicked.

Hovering the mouse over any context property name will show a refresh button that
can be used to refresh just that one value.

Hovering over the value of a context property will show a button to copy its contents
to the system clipboard. The value will be converted to JSON, so not all values
can be copied.
