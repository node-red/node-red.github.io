---
layout: docs-api
toc: toc-api-ui.html
title: Editor APIs
slug: "ui"
---

The editor provides a number of APIs for nodes and plugins to use to help them integrate with the editor.

 - [`RED.actions`](actions) - register custom actions
 - [`RED.events`](events) - listen for events within the editor
 - [`RED.notify`](notification) - show notifications in the editor
 - [`RED.sidebar`](sidebar) - add sidebar tabs

### Widgets

A set of jQuery widgets are available that can be used within a node's edit template.

  - [`TypedInput`](typedInput) - a replacement for a regular `<input>` that allows
    the type of the value to be chosen, including options for string, number and boolean.
    Used extensively in the core Node-RED nodes.
  - [`EditableList`](editableList) - an editable list where the elements can be complex
    forms in their own right. Used by the core `Switch` and `Change` nodes.
  - [`SearchBox`](searchBox) - an enhanced `<input>` for common usage around Search UX.
  - [`TreeList`](treeList) - a list to display tree-structured data.
