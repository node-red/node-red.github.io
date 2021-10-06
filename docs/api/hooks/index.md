---
layout: docs-api
toc: toc-api-hooks.html
title: Hooks API
slug: hooks
---

The Hooks API provides a way to insert custom code into certain key points of
the runtime operation.

*Note: there is also a hooks api in the editor, but it is less mature so
not currently documented for general use.*


 - [`RED.hooks` API](#redhooks-api)
    - [`RED.hooks.add( hookName, handlerFunction )`](#methods-add)
    - [`RED.hooks.remove( hookName )`](#methods-remove)

 - [Messaging Hooks](messaging) - add code to the message routing path.
 - [Node Install Hooks](install) - how modules are installed (or uninstalled) by the runtime.


### `RED.hooks` API

#### <a href="#methods-add" name="methods-add">RED.hooks.add( hookName, handlerFunction )</a>

Register a new hook handler.

The `hookName` is the name of the hook to register the handler for.

It can be optionally suffixed with a label for the hook - `onSend.my-hooks`.
That label can then be used with `RED.hooks.remove` to remove the handler.


When invoked, the hook handler will be called with a single payload object - the details
of which will be specific to the hook.

The handler can take an optional second argument - a callback function to call
when the handler has finished its work.

When the handler finishes its work it must either:
 - return normally
 - call the callback function with no arguments
 - return a promise that resolves

Any modifications it has made to the payload object will be passed on.

If the handler wants to stop further processing of the event (for example, it does
would not want a message to be passed to the next node in a flow), it must either:
 - return `false` (strictly `false` - not a false-like value)
 - call the callback function with `false`
 - return a promise that resolves with the value `false`.

If the handler encounters an error that should be logged it must either:
 - throw an Error
 - call the callback function with the Error
 - return a promise that rejects with the Error

If a function is defined as the two-argument version (accepting the callback function),
it *must* use that callback - any value it returns will be ignored.

 ```javascript
 RED.hooks.add("preDeliver.my-hooks", (sendEvent) => {
     console.log(`About to deliver to ${sendEvent.destination.id}`);
 });
 ```

#### <a href="#methods-remove" name="methods-remove">RED.hooks.remove( hookName )</a>

Remove a hook handler.

Only handlers that were registered with a labelled name (for example `onSend.my-hooks`) can be removed.

To remove all hooks with a given label, `*.my-hooks` can be used.


```javascript
RED.hooks.remove("*.my-hooks");
```
