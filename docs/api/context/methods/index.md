---
layout: docs-api
toc: toc-api-context.html
title: Context Store API
slug:
  - url: "/docs/api/context"
    label: "context"
  - 'api'
---

**New in 0.19**

A Context Storage plugin is a node.js module that exposes a function on its `module.exports`
that can be used to create new instances of the plugin. The object returned by the
function must have the following functions:

 Function                                                      | Description
---------------------------------------------------------------|-------------------------
[ContextStore.open()](#contextstoreopen)                       | Open the storage ready for use
[ContextStore.close()](#contextstoreclose)                     | Close the storage
[ContextStore.get(scope, key, callback)](#contextstoregetscope-key-callback) | Get values from the store
[ContextStore.set(scope, value, key, callback)](#contextstoresetscope-value-key-callback) | Set values in the store
[ContextStore.keys(scope, calback)](#contextstorekeysscope-callback) | Get a list of all keys in the store
[ContextStore.delete(scope)](#contextstoredeletescope)               | Delete all keys for a given scope
[ContextStore.clean(activeNodes)](#contextstorecleanactivenodes)     | Clean the context store

### ContextStore.open()

Open the storage ready for use. This is called before any store values are accessed.

Returns a `Promise` that resolves when the store is ready for access.

### ContextStore.close()

Called when the runtime is stopped so no further key values will be accessed.

Returns a `Promise` that resolves with the store is closed.

### ContextStore.get(scope, key, [callback])

Argument | Description
---------|------------------------------
scope    | the scope of the key
key      | the key, or array of keys, to return the value(s) for.
callback | *optional* a callback function to invoke with the key value

The `key` argument can be either a String identifying a single key, or an Array
of Strings identifying multiple keys to return the values for.


If the optional `callback` argument is provided, it must be a function that takes
two or more arguments:

```
function callback(error, value1, value2, ... ) {

}
```

If no callback is provided, and the store supports synchronous access, the
`get` function should return the individual value, or array of values for the keys.
If the store does not support synchronous access it should throw an error.

### ContextStore.set(scope, value, key, [callback])

Argument | Description
---------|------------------------------
scope    | the scope of the key
value    | the value, or array of values
key      | the key, or array of keys, to set the value(s) for.
callback | *optional* a callback function to invoke when the value is set

The `key` argument can be either a String identifying a single key, or an Array
of Strings identifying multiple keys to set.

`key`        | `value`        | Action
-------------|----------------|----------------
String       | Any            | Stores `value` under `key`
Array        | Array          | Stores each element of the `value` array under the corresponding `key` value. If `value` has fewer elements than `key`, it sets the missing values to `null`.
Array        | not-Array      | Stores `value` as the value of the first key - uses `null` for any remaining keys.


If the optional `callback` argument is provided, it will be called when the value
has been stored. It takes a single argument, `error`, to indicate any errors hit
whilst storing the values.

```
function callback(error) {

}
```

If no callback is provided, and the store supports synchronous access, the
`set` function should return once the value is stored. If the store does not support
synchronous access it should throw an error.

### ContextStore.keys(scope, [callback])

Argument    | Description
------------|------------------------
scope       | the scope of the keys to return
callback    | *optional* a callback function to invoke with the list of keys

Gets a list of all keys under the given scope.

If the optional `callback` argument is provided, it must be a function that takes
two or more arguments:

```
function callback(error, keys) {

}
```

If no callback is provided, and the store supports synchronous access, the
`keys` function should return the array of keys. If the store does not support
synchronous access it should throw an error.


### ContextStore.delete(scope)

Argument    | Description
------------|------------------------
scope       | the scope to delete


### ContextStore.clean(activeNodes)

Argument    | Description
------------|------------------------
activeNodes | a list of all node/flow ids that are still active

Returns a promise that resolves when store has removed any context scopes that
are no longer required. The `activeNodes` list can be used to identify what nodes
and flows are still considered active.
