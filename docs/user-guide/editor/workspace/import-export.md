---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: editor
  - url: "/docs/user-guide/editor/workspace"
    label: "workspace"
  - "import/export"
toc: toc-editor-guide.html
title: Importing and Exporting Flows
---

Flows can be imported and exported from the editor using their JSON format, making
it very easy to share flows with others.

### Importing flows

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-import.png" alt="Import dialog">
  <p class="caption">Import dialog</p>
</div>

The Import dialog can be used to import a flow by the following methods:

 - pasting in the flow JSON directly,
 - uploading a flow JSON file,
 - browsing the local flow library,
 - browsing the example flows provided by installed nodes.

In all cases, the dialog offers the option to import the nodes into the current
flow, or to create a new flow for them.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-i</code></td></tr>
 <tr><td>Menu option</td><td><code>Import</code></td></tr>
 <tr><td>Action</td><td><code>core:show-import-dialog</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-library-import-dialog</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-examples-import-dialog</code></td></tr>
</table>



<br style="clear:both" />

### Exporting flows

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-export.png" alt="Export Flows dialog">
  <p class="caption">Export Flows dialog</p>
</div>

The Export dialog can be used to copy flow json out of the editor by the following methods:

 - copying the JSON to the system clipboard,
 - downloading the JSON as a file,
 - saving it to the local flow library.

It can export either the selected nodes, the current flow (including its tab node)
or the complete flow configuration.

It offers the option to export compact or formatted JSON. The compact option generates
a single line of JSON with no whitespace. The formatted JSON option is formatted
over multiple lines with full indentation - which can be easier to read.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-e</code></td></tr>
 <tr><td>Menu option</td><td><code>Export</code></td></tr>
 <tr><td>Action</td><td><code>core:show-export-dialog</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-library-export-dialog</code></td></tr>
</table>
