---
layout: docs-api
toc: toc-api-ui.html
title: RED.sidebar
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'sidebar'
---

The sidebar allows nodes and plugins to add custom tabs.

 - [`RED.sidebar` API](#redsidebar-api)
    - [`RED.sidebar.addTab( tab )`](#methods-addTab)
    - [`RED.sidebar.removeTab( id )`](#methods-removeTab)
    - [`RED.sidebar.show( id )`](#methods-show)
    - [`RED.sidebar.containsTab( id )`](#methods-containsTab)


### `RED.sidebar` API

#### <a href="#methods-addTab" name="methods-addTab">RED.sidebar.addTab( tab )</a>

Add a new tab to the sidebar.

The `tab` definition is an object with the following properties:

Property | Description
---------|------------------
`id`     | The unique id for this tab.
`label`  | The text to display on the sidebar tab. This should not be too long.
`name`   | The name of the tab displayed in the sidebar menu.
`iconClass` | The FontAwesome 4 class of the icon to use. For example, `"fa fa-database"`
`content` | The DOM element containing the content of the sidebar.
`toolbar` | (optional) A DOM element to display in the sidebar toolbar when this tab is active.
`enableOnEdit` | (optional) If set to `true`, this tab will be accessible whilst the edit dialog is open. Default: `false`.
`action` | (optional) The name of a registered action used to display this tab. This allows the user to assign a keyboard shortcut to switch to the tab.




```javascript

// The sidebar content
const content = $("<div>").css({"position":"relative","height":"100%"});

// (optional) A toolbar header for the sidebar
const header = $("<div>", {class:"red-ui-sidebar-header"}).appendTo(content);


RED.actions.add("my-custom-tab:show-custom-tab",function() {
    RED.sidebar.show("my-custom-tab");
});

RED.sidebar.addTab({
    id: "my-custom-tab",
    label: "custom",
    name: "My Custom Tab",
    iconClass: "fa fa-database",
    content: content,
    action: "my-custom-tab:show-custom-tab"
});
```

#### <a href="#methods-removeTab" name="methods-removeTab">RED.sidebar.removeTab( id )</a>

Removes the tab, if it exists.

If a node adds a tab as part of its `onpaletteadd` function, it must make sure it
calls this API to remove it as part of its `onpaletteremove` function.

```javascript
RED.sidebar.removeTab("my-custom-tab");
```

#### <a href="#methods-show" name="methods-show">RED.sidebar.show( id )</a>

Show the given tab, if it exists, in the sidebar.

```javascript
RED.sidebar.show("my-custom-tab")
```

#### <a href="#methods-containsTab" name="methods-containsTab">RED.sidebar.containsTab( id )</a>

Returns `true` if the tab exists in the sidebar

```
let debugExists = RED.sidebar.containsTab('my-custom-tab');
```
