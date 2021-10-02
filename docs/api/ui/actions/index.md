---
layout: docs-api
toc: toc-api-ui.html
title: RED.events
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'actions'
---


This API can be used to register and invoke Actions in the editor. Actions are
individual pieces of functionality that a user may want to trigger and can be
bound to keyboard shortcuts.

 - [`RED.actions` API](#redactions-api)
     - [`RED.actions.add( name, handler )`](#methods-add)
     - [`RED.actions.remove( name )`](#methods-remove)
     - [`RED.actions.invoke( name, [args...] )`](#methods-invoke)


### `RED.actions` API

#### <a href="#methods-add" name="methods-add">RED.actions.add( name, handler )</a>

Register a new action.

The name should follow the pattern `[provider]:[name-of-action]`. For example `core:show-debug-tab`.

```javascript
RED.actions.add("my-custom-tab:show-custom-tab",function() {
    RED.sidebar.show("my-custom-tab");
});
```

#### <a href="#methods-remove" name="methods-remove">RED.actions.remove( name )</a>

Remove a previously registered action.

```javascript
RED.actions.remove("my-custom-tab:show-custom-tab")
```

#### <a href="#methods-invoke" name="methods-invoke">RED.actions.invoke( name, [args...])</a>

Invoke an action by name.

When bound to a keyboard shortcut, the handler will be invoked without any arguments. But when
invoked using this API, it is possible to pass in arguments.

```javascript
RED.actions.invoke("my-custom-tab:show-custom-tab")
```
