---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - url: "/docs/user-guide/editor/sidebar"
    label: "sidebar"
  - "info"
toc: toc-editor-guide.html
title: 'Sidebar: Information'
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar-info.png" alt="Information Sidebar">
  <p class="caption">Information Sidebar</p>
</div>

*Since Node-RED 1.1.0*

The Information sidebar shows information about the flows. This includes an outline
view of all flows and nodes, as well as details of the current selection.

The outline view can be searched using the same syntax as the [main search dialog](../workspace/search).

Hovering over an entry in the outline reveals a set of options.

<div style="width: 344px" class="figure">
  <img src="../images/editor-sidebar-info-entry.png" alt="Outline entry options">
  <p class="caption">Outline entry options</p>
</div>

The <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-search"></i> button will reveal the node/flow in the main workspace.

If the node has a button, such as the Debug and Inject nodes, the <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-toggle-right"></i> button can be used to trigger that button.


The <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-circle-thin"></i> button can be used to enable or disable the node/flow.



In the bottom section of the Information sidebar, details of the current selection are shown.

This will include:

 - a summary of its properties
 - the [user-provided description of node/flow](../workspace/nodes#editing-node-properties)
 - a link to the [node's help](./help) <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-book"></i>


If nothing is selected, it displays the description of the current flow - which
can be edited in the [Flow Properties edit dialog](../workspace/flows#editing-flow-properties).



<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:show-info-tab</code></td></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-g i</code></td></tr>
</table>
