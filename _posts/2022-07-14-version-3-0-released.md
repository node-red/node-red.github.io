---
layout: blog
title: Version 3.0 released
author: nick
---

Node-RED 3.0 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

The [Change Log](https://github.com/node-red/node-red/blob/1b94cc3ac027bfc38a300867a0b0fd635bf273b8/CHANGELOG.md) has the full list of changes in this release, but here are the highlights.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/R9bV2MytHr0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
 - [Migrating from Node-RED 2.x](#migrating-from-node-red-2x)
 - [Editor Features](#editor-features)
   - [Context Menu](#context-menu)
   - [Junctions](#junctions)
   - [Debug Path Tooltip](#debug-path-tooltip)
   - [Continuous Search](#continuous-search)
   - [Default node names](#default-node-names)
   - [Monaco Text Editor](#monaco-text-editor)
   - [Remembering cursor position](#remembering-cursor-position)
   - [Accessing previous welcome tours](#accessing-previous-welcome-tours)
 - [Runtime Features](#runtime-features)
   - [Editing stopped flows](#editing-stopped-flows)
   - [Diagnostic Report](#diagnostic-report)
   - [Multiple static folders](#multiple-static-folders)
 - [Node updates](#node-updates)
   - [Dynamic Link Call node](#dynamic-link-call-node)
   - [Environment Variables in the Template node](#environment-variables-in-the-template-node)
   - [Debug node message count](#debug-node-message-count)
   - [Predefined HTTP Request headers](#predefined-http-request-headers)
 - [What's next?](#whats-next)


## Migrating from Node-RED 2.x

Here are the key points you need to know when migrating to Node-RED 3.x.

 - Node.js 14.x or later required
 - Internet Explorer no longer supported
 - Choose if you want to enable the [Stopping Flows](#editing-stopped-flows) feature
 - Choose if you want to *disable* the [Runtime Diagnostics](#diagnostic-report) feature
 - Choose if you want to switch to the [Monaco editor](#monaco-text-editor) (if you haven't already).

## Editor Features

### Context Menu

We have (finally) added a right-click context menu in the workspace. This gives
you quick access to a lot of built-in actions in the editor and should help users
discover more of the features available.

![](/blog/content/images/2022/07/context.png)

Picking what options should be in the menu hasn't been a simple task. There are
a lot of things that could have been included - so we had to get the right balance
between having the right options there and making it too long and hard to find.

### Junctions

We have introduced a new special node type called `junction` that can make it
easier to route the wires in a flow.

Unlike the various 'no-op' nodes that have been published to the community to help
achieve similar results, the Junctions are far more compact and less obtrusive
in the flow.

When you hover over a Junction, it expands to show input and output ports. You can
move the junction by dragging its body, or add a wire by click/dragging on one of
its ports - just as you do with nodes.

![](/blog/content/images/2022/07/junctions.gif)

Junctions do not appear as regular nodes in the palette or flow outline, but can be
added through the quick-add dialog (Ctrl-click in the workspace) or the new Context Menu.

![](/blog/content/images/2022/07/jucntion-quick-add.png)

You can also insert a Junction into an existing wire by slicing through it with the
mouse by holding <kbd>alt-shift</kbd> when dragging across the wire. Note that some OS might
use that same combination to move the active window, so this won't work there. We
don't yet have a way to allow the mouse actions to be customised, so users affected
by that would have to use the other methods to add Junctions.


### Debug Path Tooltip

When hovering over a node name in the Debug sidebar, a new tooltip shows the full
location of the node. This is useful when working with subflows, making it much
easier to identify exactly which node generated the message.

Clicking on any item in the list will reveal it in the workspace.

![](/blog/content/images/2022/07/debug-tooltip.png)

### Continuous Search

When searching for things in the editor, a new toolbar in the workspace provides
options to quickly jump between the search results.

![](/blog/content/images/2022/07/search.png)

We've added a pair of new actions to help navigate the results:

 - `core:search-next` - shortcut: <kbd>f</kbd>
 - `core:search-previous` - shortcut: <kbd>shift-f</kbd>

We've also added some more predefined searches, including the ability to restrict
the search to the current flow.

![](/blog/content/images/2022/07/search-options.png)

### Default node names

The `Debug`, `Function` and `Link` nodes are now given unique default names when
they are added to the workspace.

![](/blog/content/images/2022/07/node-names.gif)

This capability could be added to any node, including contrib nodes, via their
`onadd` function. We chose just this initial set as they were the ones that would
most benefit from having a name applied.

A new action has also been added that will apply an appropriate default name to
any selected nodes that don't currently have a name:

 - `core:generate-node-names`

### Monaco Text Editor

We added the `monaco` editor component as an alternative to the default `ace`
editor a year ago in the 2.x release. It has proven to be very stable and provides
a much richer user experience.

With 3.0, we have switched over to monaco as the default editor. New installs of
Node-RED will pickup the change - existing installs will need to update (or remove) the
`codeEditor` entry in their settings file.

The ultimate goal will be to remove `ace` entirely in the 4.0 release next year.

### Remembering cursor position

The editor now tries to restore your cursor position when you reopen a node's
edit dialog. This is super handy with the Function node, amongst others, where
you don't want to have to scroll back to where you were working each time you
open the edit dialog.


### Accessing previous welcome tours

We introduced the Welcome Tour back in 2.1.0 and it has been updated for each
release. With this release, we've added a way to access the tours of the previous
releases in the Help sidebar:

![](/blog/content/images/2022/07/tours.png)

## Runtime Features

### Editing stopped flows

We've introduced the **optional** ability to run Node-RED without the flows
themselves running. We already had Safe Mode that achieved a similar result, but
with this new feature, you can stop and start the flows directly from the editor.
The runtime will remember the state of the flows so when Node-RED starts up, the
flows will stay in the same started/stopped state.

This feature is **not enabled by default**. To enable it, you need to add the
following to your `settings.js` file:

```
runtimeState: {
   enabled: true,
   ui: true
}
```

With that set, you get a new option in the Deploy menu:

![](/blog/content/images/2022/07/deploy-stop.png)

Clicking that option will stop the flows running, but you can continue editing
them and deploy changes. Whilst stopped, the Inject/Debug node buttons will be
disabled.

When the flows are stopped, the menu shows a start option instead:

![](/blog/content/images/2022/07/deploy-start.png)

### Diagnostic Report

We've added a new admin endpoint that returns information about the runtime and
the system its running on. This can be used to quickly gather information when
reporting an issue.

Within the editor you can see the information it returns by running the 'Show System Info'
action.

We have taken care to ensure this does not return anything sensitive. In some cases
it will indicate if a particular setting is set, but not what value it has been
set to.

We realise that not everyone will want to have this exposed depending on how
they use Node-RED. For that reason, the endpoint can be disabled by adding the
following to `settings.js`:

```
diagnostics: {
    enabled: false
}
```


### Multiple static folders

The runtime has long-supported the ability to serve a folder of static content
as part of its HTTP handling. Useful for providing static resources to webpages
and the like.

With this release you can now specify multiple folders to serve from and, more
importantly, to specify the http path each folder should be served from.

See [#3542](https://github.com/node-red/node-red/pull/3542) for details on how it
can be used.

## Node updates

### Dynamic Link Call node

We added the Link Call node in Node-RED 2.1. It lets you create a flow that calls
out to a Link In node and get a response back. The main limitation was you had
to hardcode what Link In node you wanted it to call.

With this release you can now use `msg.target` to set the name of the Link In node
it should call.

### Environment Variables in the Template node

The Template node can now access environment variables using the syntax:

```
My favourite colour is {{env.COLOUR}}.
```

### Debug node message count

The Debug node has a new option to report how many messages it has received in its
status output.

### Predefined HTTP Request headers

The HTTP Request node now allows you to set request headers in the node's edit
dialog - rather than having to always pass them in as message properties.


## What's next?

As happened with 2.0, we've overrun our plan for getting 3.0 released in April. But
the series of beta releases we have been doing have really helped improve the overall
quality of this release.

The main challenge has always been getting enough time and attention dedicated
to keep the release cadence going.

Our next scheduled main release will be 3.1 in late October/November. As ever,
we have a healthy backlog of items to keep us busy - but ultimately it depends
very much on the feedback from the community.

If you're interested in contributing to Node-RED, now is a good time to come over
and chat with us in either the [forum](https://discourse.nodered.org) or [slack](https://nodered.org/slack).

Node-Red 2.x is now in maintenance mode - we won't be added any new features to it,
but we will do maintenance releases with fixes as needed. In fact, we'll have a
long overdue 2.2.3 release in the next couple of weeks.
