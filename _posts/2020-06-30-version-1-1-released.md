---
layout: blog
title: Version 1.1 released
author: nick
---

Node-RED 1.1 is now available to [install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/FHP7qsaz7ZI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---


- [Editor Updates](#editor-updates)
   - [Information sidebar redesign](#information-sidebar-redesign)
   - [New Help sidebar](#new-help-sidebar)
   - [Grouping nodes](#grouping-nodes)
- [Runtime features](#runtime-features)
   - [node-red-admin built-in](#node-red-admin-built-in)
   - [Overriding individual settings](#overriding-individual-settings)
   - [`httpAdminMiddleware` setting](#httpadminmiddleware-setting)
   - [Custom `adminAuth` token handling](#custom-adminauth-token-handling)
   - [Installing nodes from other locations](#installing-nodes-from-other-locations)
   - [Refreshing HTTPS certificates](#refreshing-https-certificates)
- [Node updates](#node-updates)
   - [JSONata `$moment` support](#jsonata-moment-support)
   - [Inject node properties](#inject-node-properties)
   - [Function node lifecycle](#function-node-lifecycle)
   - [Debug node status](#debug-node-status)
   - [Trigger node](#trigger-node)



## Editor Updates

### Information sidebar redesign

The info sidebar now includes a tree-view of your flows - we call it the outliner.
This gives another way to navigate your flows and quickly find things.

![](/blog/content/images/2020/06/info-sidebar.png){:width="40%"}

Each node has a button that takes you to it in the workspace, a button to
enable/disable it and, in the case of the Inject and Debug nodes, a button to
trigger their action. Double-clicking on a node will bring up its edit dialog.

[more...](/docs/user-guide/editor/sidebar/info)

### New Help sidebar

To make room for the outliner, the help section of the sidebar has now moved
to its own sidebar tab. The added benefit of putting the help in its own tab
is you can now browse all of the available help topics without having to select
a node of the right type in the workspace.

It will also give us a space to add other help topics in the editor in the future.

[more...](/docs/user-guide/editor/sidebar/help)

### Grouping nodes

To help organise your flows you can now group your nodes in the editor.
The group can have a custom border and background colour and an optional label.

![](/blog/content/images/2020/06/groups-one.gif)

Groups are added to the flow as a new type of node. As people start using them,
it will make it harder to share flows with users who haven't yet upgraded.
To help out, we've published [`node-red-node-group`](https://flows.nodered.org/node/node-red-node-group)
which registers a `group` node type but does absolutely nothing. Installing this
module will allow older versions of Node-RED to import flows that include a
group - although they won't see the groups in the editor. And the module knows
not to register itself when it isn't needed, so there's no issue upgrading to 1.1
with it installed.

[more ...](/docs/user-guide/editor/workspace/groups)

## Runtime features

### node-red-admin built-in

The `node-red-admin` command-line tool has existed since the start of the project,
but it isn't something widely known about or used. It can be used to remotely
administer a Node-RED runtime.

To make it more useful, it is now integrated into the `node-red` command. You run it with:

```
node-red admin
```

One of the useful commands it provides is a way to hash passwords suitable for
`adminAuth`. It prompts you for the password you want to use and it gives you
back the hash you can paste into your settings file.

```
$ node-red admin hash-pw
Password:
$2b$08$sjxLvq8MmycyWJpxPLyweuw/WlYt1MX56eG5Q5nlyxJs2fASGm2jm
```

The other commands let you list what nodes are installed, enable/disable them,
install new ones or remove old ones. You can also search the flow library.

[more...](/docs/getting-started/local#command-line-usage)

### Overriding individual settings

The `node-red` command now supports the `-D` option to override individual settings.
For example, to temporarily run with a different level of logging you can use:

```
node-red -D logging.console.level=trace
```

[more...](/docs/getting-started/local#override-individual-settings)


### `httpAdminMiddleware` setting

We've had the `httpNodeMiddleware` option for a while now - allowing a custom
middleware to be added to the HTTP In node routes. This release adds
`httpAdminMiddleware` that does the same thing for all of the admin routes,
which includes the editor itself. This can be used, for example, to add custom
http headers to all admin requests. Not something most end users need, but has
been a requirement from those who embed the editor into their own applications.

[more...](/docs/user-guide/runtime/securing-node-red#custom-middleware)

### Custom `adminAuth` token handling

`adminAuth` now supports a custom `tokens` function that can be used to validate any auth token passed to the admin api. This opens up some more flexible options to integrate Node-RED admin security with other authentication systems.

[more...](/docs/user-guide/runtime/securing-node-red#custom-authentication-tokens)

### Installing nodes from other locations

The admin api for installing new nodes has been extended to support a 'url'
parameter - which should be a full url to a `tgz` containing the node to install.

This hasn't been written up in the docs yet, but for now, you can read the original
[design note](https://github.com/node-red/designs/tree/master/designs/node-installation)

### Refreshing HTTPS certificates

The runtime can now be configured to periodically refresh its https certificates.
This feature requires Node.js 12 or later.

The default [settings file has been updated](https://github.com/node-red/node-red/blob/c048b1a25b36040f169f443701b9a0dde2f57914/packages/node_modules/node-red/settings.js#L139-L171) with examples for how to configure this.

[more...](/docs/user-guide/runtime/securing-node-red#refreshing-https-certificates)

## Node updates

### JSONata `$moment` support

We've added support for the Moment date/time library within JSONata expressions via the `$moment` function.

This adds some long needed timezone awareness into the core of Node-RED. For example, you can get the current time in Auckland with the expression:

```
$moment().tz("Pacific/Auckland")
```

If you wanted to get the time 2 hours from now, you can do:

```
$moment().add(2, "hours")
```

It can also do a much better job of parsing dates:

```
$moment($.payload, "YYYY-MM-DD")
```

We're considering making the Moment library available as a default built-in of the Function node as well, but that will
be a future release.

### Inject node properties

The Inject node can now set any properties on the message it sends - you aren't limited to just `topic` and `payload`.

![](/blog/content/images/2020/06/inject-props.png)

### Function node lifecycle

The Function node now lets you provide code that should be run when the node is
deployed and when it is being stopped. This lets you initialise any state in the
node before it starts handling any messages. Note that each piece of code is in
a separate scope - you cannot declare variables in one and access them in the others.
You need to use `context` to pass things between them.

The main Function has also been made a proper async Function so you can use `await` at the top level, if that's your sort of thing.

![](/blog/content/images/2020/06/func-lifecycle.png)

### Debug node status

The Debug node can now set its status message independently of what it passes
to the Debug sidebar. Useful if you want to Debug a shorter summary to status,
whilst showing more complete information in the sidebar where there is more space.

Whilst talking about the Debug node, we've added a number of actions in the editor
to help activate/deactive lots of nodes in one go.

You can searching for them in the Action List (`Ctrl/Cmd-Shift-P` or `View -> Action List`)
and you can assign keyboard shortcuts to them:

 - `core:activate-selected-debug-nodes`
 - `core:activate-all-debug-nodes`
 - `core:activate-all-flow-debug-nodes`
 - `core:deactivate-selected-debug-nodes`
 - `core:deactivate-all-debug-nodes`
 - `core:deactivate-all-flow-debug-nodes`


### Trigger node

The Trigger node can now optionally send its 'second message' on a separate output.

If you want it to handle separate streams of messages, you are no longer tied
to using `msg.topic` to identify the streams - you can use any message property.






