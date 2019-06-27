---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - "sidebar"
toc: toc-editor-guide.html
title: Sidebar
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar.png" alt="Editor Sidebar">
  <p class="caption">Editor Sidebar</p>
</div>

The sidebar contains panels that provide a number of useful tools within the editor.

 - [Information](info) - view information about nodes and their help
 - [Debug](debug) - view messages passed to Debug nodes
 - [Configuration Nodes](config) - manage configuration nodes
 - [Context data](context) - view the contents of context

Some nodes contribute their own sidebar panels, such as [node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard).

The panels are opened by clicking their icon in the header of the sidebar, or by
selecting them in the drop-down list shown by clicking the <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-caret-down"></i> button.

The sidebar can be resized by dragging its edge across the workspace.

If the edge is dragged close to the right-hand edge, the sidebar will be hidden.
It can be shown again by selecting the 'Show sidebar' option in the View menu,
or using the <code>Ctrl/⌘-Space</code> shortcut.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-Space</code></td></tr>
 <tr><td>Menu option</td><td><code>View -&gt; Show sidebar</code></td></tr>
 <tr><td>Action</td><td><code>core:toggle-sidebar</code></td></tr>
</table>
