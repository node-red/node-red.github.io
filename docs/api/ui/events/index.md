---
layout: docs-api
toc: toc-api-ui.html
title: RED.events
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'events'
---


The editor emits events that components can listen for so they can react as needed.

*Note: any events not on this list should be considered private, subject to change without notification and not for general use.*

 - [`RED.events` API](#redevents-api)
     - [`RED.events.on( eventName, handlerFunction )`](#methods-on)
     - [`RED.events.off( eventName, handlerFunction )`](#methods-off)
 - [Available events](#available-events)
     - [Workspace events](#workspace-events)
     - [Flow configuration events](#flow-configuration-events)
     - [Palette events](#palette-events)


### `RED.events` API

#### <a href="#methods-on" name="methods-on">RED.events.on( eventName, handlerFunction )</a>

Register a new handler for the given event.


```javascript
RED.events.on("nodes:add", function(node) {
    console.log("A node has been added to the workspace!")
})
```

#### <a href="#methods-off" name="methods-off">RED.events.off(eventName, handlerFunction)</a>

Remove a previously registered event handler.

### Available events

#### Workspace events

Event | Payload | Description
------|---------|-----
`deploy` | | A new flow has been deployed
`login` | `"username"` | A user has logged into the editor. If `adminAuth` is not configured, this event is never emitted
`view:selection-changed` | `{<selection object>}` | The current selection in the workspace has changed
`workspace:change`| `{ old: "<previous-workspace-id>", workspace: "<new-workspace-id>" }`|The workspace has switched to a different tab
`workspace:clear` | | The workspace has been cleared - this happens when switching projects.
`workspace:dirty` | `{ dirty:<boolean> }` | The dirty state of the editor has changed. 'Dirty' means there are undeployed changes.
`workspace:hide` | `{ workspace: <workspace-id> }` | A tab has been hidden
`workspace:show` | `{ workspace: <workspace-id> }` | A previously hidden tab has been shown

#### Flow configuration events

Event | Payload | Description
------|---------|-----
`flows:add` | `{<flow object>}` | A new flow has been added
`flows:change` | `{<flow object>}` | A flow's properties have been changed
`flows:remove` | `{<flow object>}` | A flow has been removed
`flows:reorder`| `[<Array of flow ids]` | The flows have been reordered
`groups:add` | `{<group object>}` | A new group has been added
`groups:change` | `{<group object>}` | A group's properties have been changed
`groups:remove` | `{<group object>}` | A group has been removed
`links:add` | `{<link object>}` | A new link has been added
`links:remove` | `{<link object>}` | A link has been removed
`nodes:add` | `{<node object>}` | A new node has been added
`nodes:change` | `{<node object>}` | A node's properties have been changed
`nodes:remove` | `{<node object>}` | A node has been removed
`nodes:reorder`| `{z:"<flow-id>", nodes:[<Array of node ids>]}`| Nodes have been reordered on a flow
`subflows:add` | `{<subflow object>}` | A new subflow has been added
`subflows:change` | `{<subflow object>}` | A subflow's properties have been changed
`subflows:remove` | `{<subflow object>}` | A subflow has been removed



#### Palette events

Event | Payload | Description
------|---------|-----
`registry:module-updated`|`{module:"<module-name>", version:"<module-version>"}`|A module has updated to a new version
`registry:node-set-added`|`{<node-set object>}`| A new Node-Set has been added to the palette
`registry:node-set-disabled`|`{<node-set object>}`|A Node-Set has been disabled
`registry:node-set-enabled`|`{<node-set object>}`| A Node-Set has been enabled
`registry:node-set-removed`|`{<node-set object>}`| A Node-Set has been removed
`registry:node-type-added`|`"node-type"`| A new Node has been added to the palette
`registry:node-type-removed`|`"node-type"`| A Node has been removed from the palette
`registry:plugin-added`|`"plugin-id"`| A Plugin has been added
