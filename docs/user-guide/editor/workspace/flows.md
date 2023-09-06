---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - url: "/docs/user-guide/editor/workspace"
    label: "workspace"
  - "flows"
toc: toc-editor-guide.html
title: Flows
---

A flow is represented as a tab within the editor workspace and is the main way
to organise nodes.

<div class="figure">
  <img src="../images/editor-flow-tabs.png" alt="Flow tabs">
  <p class="caption">Flow tabs</p>
</div>

<div class="doc-callout">
<em>Note</em> : The term "flow" is also used to informally describe a single set
of connected nodes. So a flow (tab) can contain multiple flows (sets of connected nodes).
</div>

Each flow can have a name, and description that is displayed in the [Information sidebar](../sidebar/info).

All of the nodes in a flow can access the same [flow-scoped context](/docs/user-guide/context).


#### Adding a flow

To add a new flow, either click the <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-plus"></i> button
in the top bar, or double-click on free space in the tab bar.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>Flows -&gt; Add</code></td></tr>
 <tr><td>Action</td><td><code>core:add-flow</code></td></tr>
</table>

#### Reordering flows

Flows can be reordered in the workspace by dragging their tabs around in the tab bar.

#### Editing flow properties

<div style="width:350px" class="figure align-right">
  <img src="../images/editor-edit-flow.png" alt="Flow properties editor">
  <p class="caption">Flow properties editor</p>
  <img src="../images/editor-sidebar-info.png" alt="Information Sidebar">
  <p class="caption">Information Sidebar</p>
</div>

To edit a flow's properties, double-click on its tab in the top bar. This will
open the Flow Properties dialog.

<ul>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-cog"></i> : Properties - set the flow's name and description. The description
    can use Markdown syntax for formatting and will appear in the <a href="../sidebar/info">Information sidebar</a>.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-list"></i> : Environment Variables - properties that are exposed as environment variables within the flow. <i>Since Node-RED 2.1</i></li>
</ul>


<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>Flows -&gt; Rename</code></td></tr>
 <tr><td>Action</td><td><code>core:edit-flow</code></td></tr>
</table>

#### Enabling or disabling a flow

The flow can be enabled or disabled using the toggle button at the bottom of the
dialog. If a flow is disabled, none of the nodes it contains will be created when
the flow is deployed.

The <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-circle-thin"></i> button in the [Information sidebar](../sidebar/info) can also be used to enable or disable the node/flow.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:enable-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:disable-flow</code></td></tr>
</table>

<br style="clear: both;" />

#### Hiding or showing a flow

A flow can be hidden by right-clicking on it and selecting 'hide flow' in the context menu. The option
can also be found in the tab bar drop-down menu.

When hidden, the [Information sidebar](../sidebar/info) will show an <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-eye-slash"></i> icon next to it. Clicking that icon will show the flow again.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Alt-w</code></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide flow</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Alt-Shift-w</code></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Show last hidden flow</code></td></tr>
 <tr><td>Action</td><td><code>core:show-last-hidden-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide other flows</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-other-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide all flows</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-all-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Show all flows</code></td></tr>
 <tr><td>Action</td><td><code>core:show-all-flows</code></td></tr>
</table>

#### Locking a flow

Flows can be locked to prevent any changes being made to them.

To lock/unlock a flow, you can:

 - Right-click on its tab and select the 'lock flow' option
 - Toggle the lock button in the bottom corner of the Flow Properties dialog
 - Click the padlock icon in the Information Sidebar when hovering over the flow

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Lock Flow</code></td></tr>
 <tr><td>Action</td><td><code>core:lock-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Unlock Flow</code></td></tr>
 <tr><td>Action</td><td><code>core:unlock-flow</code></td></tr>
</table>

#### Deleting a flow

To delete a flow, click the 'Delete' button in the Flow Properties dialog.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>Flows -&gt; Delete</code></td></tr>
 <tr><td>Action</td><td><code>core:remove-flow</code></td></tr>
</table>

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-flow-search-tabs.png" alt="Search flows">
  <p class="caption">Search flows</p>
</div>

#### Switching between flows

To open a list of the available flows, click the <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-caret-down"></i> menu button
in the top bar. Then select the List Flows option.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-Shift-f</code></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:list-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-[</code></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-previous-tab</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-]</code></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-next-tab</code></td></tr>
</table>
