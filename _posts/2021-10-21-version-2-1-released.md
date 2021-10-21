---
layout: blog
title: Version 2.1 released
author: nick
---

Node-RED 2.1 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

The [Change Log](https://github.com/node-red/node-red/blob/21304a695c3450fbf80cee69c84fe71ce753b076/CHANGELOG.md) has the full list of changes in this release, but here are the highlights.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/5DHs7y0zSZo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

- [Highlights](#highlights)
  - [New Welcome Tour Guide](#new-welcome-tour-guide)
  - [Hiding tabs](#hiding-tabs)
  - [Dynamic MQTT nodes](#dynamic-mqtt-nodes)
  - [Auto-complete in `msg` TypedInputs](#auto-complete-in-msg-typedinputs)
  - [New Link Call node](#new-link-call-node)
  - [Edit & Arrange menus](#edit--arrange-menus)
  - [Flow/Group level environment variables](#flowgroup-level-environment-variables)
- [Other node updates](#other-node-updates)
  - [Debug sidebar options](#debug-sidebar-options)
  - [Deep copy option on Change node](#deep-copy-option-on-change-node)
  - [Delay node updates](#delay-node-updates)
  - [Join node reset timeout](#join-node-reset-timeout)
  - [TCP Request node can return Strings](#tcp-request-node-can-return-strings)
  - [File nodes renamed](#file-nodes-renamed)
- [Documentation Updates](#documentation-updates)
- [What's next?](#whats-next)


## Highlights

### New Welcome Tour Guide

The first time you open the editor with 2.1.0, you will be greeted with a new Welcome Tour. This will highlight a lot of the new features in this version.

The Tour will only be shown the first time you open any particular version of Node-RED - and you can opt-out of seeing them in the future in the User Settings dialog.

If you embed Node-RED in your own application and don't want the tour to be shown to your users, then it can also be disabled in the settings file.

The underlying framework for creating the Welcome Tour can be reused to create other interactive tours/tutorials/guides. We'll have more on this area in the future.

![](/blog/content/images/2021/10/welcome-tour.png)

### Hiding tabs

We often hear from users who have a *lot* of flows. To make it a bit easier to manage, you can now hide their tabs in the editor.

![](/blog/content/images/2021/10/hide-tabs.png)

The Info sidebar still lists them all, and indicates which are currently hidden. It also allows them to be shown with a single click.

![](/blog/content/images/2021/10/hide-tabs-sidebar.png)

There's also a new tab menu that provides more options around managing the tabs.

![](/blog/content/images/2021/10/hide-tabs-menu.png)

For this first release of the feature, the hidden state of a tab is stored in user preferences within the editor - it is *not* a property of the flow itself. This means you can't share a set of flows with another user and have some of the tabs pre-hidden. It is an open point of discussion as to whether we want to allow that behaviour.

Whilst talking about managing the tabs, shift-clicking on the workspace tab bar scroll arrows will now jump immediately to the start/end of the tab list.


### Dynamic MQTT nodes

The MQTT In node now includes a 'Dynamic subscription' option. When selected, the node gets an input so you can pass it messages. Those messages can be used to:

 - connect/disconnect the broker
 - subscribe to topics
 - unsubscribe from topics

![](/blog/content/images/2021/10/mqtt-out-opts.png)


The MQTT Out node also supports the connect/disconnect messages as well.

The MQTT Broker configuration node has a new 'connect automatically' option - which is enabled by default. If you disable that, it won't connect until one of the flow nodes receives a connect message.

Full details of the formats of those messages are in the node help and summarised in the [pull-request here](https://github.com/node-red/node-red/pull/3189).

### Auto-complete in `msg` TypedInputs

The `msg` TypedInputs are used widely throughout Node-RED. To make life a bit easier, they now provide auto-complete when typing message property names.

For now, it offers completions from the list of well-known properties the core nodes use.

In the future, it will be possible for contrib nodes to register the properties they use so they can be offered as completions as well.

![](/blog/content/images/2021/10/autocomplete.png)

We're also thinking about how best to apply this to flow/global inputs - auto-completing based on the current contents of context.

### New Link Call node

The new Link Call node can be used alongside the Link-In/Out nodes to create subroutine-like flows.

If you have a flow that starts with a Link-In node and ends with a Link-Out node that has been put into its new 'return' mode (giving the node a different icon), the Link Call node can be used to pass that flow a message and the result is passed back to the calling node.

![](/blog/content/images/2021/10/link-call.png)

As an alternative to using subflows, this is great for creating little utility flows that you want to reuse in multiple places.


### Edit & Arrange menus

The main menu now has Edit and Arrange submenus.

The Edit menu has the actions you'd expect - Undo, Redo, Copy and Paste etc.

The Arrange menu adds tools to help arrange your nodes.

![](/blog/content/images/2021/10/menus.png)

All of the menus now also show any keyboard shortcuts that have been set.

### Flow/Group level environment variables

We have supported Environment Variables being set within Subflows for a while now. With this release, you can now also set them at the Flow or Group level.

## Other node updates

### Debug sidebar options

The Debug sidebar options have been reworked.

The filter options are now a drop-down menu of options, rather than the sliding panel.

![](/blog/content/images/2021/10/debug-filter.png)

The 'clear messages' button now also has a drop-down that lets you change it to 'clear filtered messages' instead. That option is useful if you have the 'current flow' filter enabled, and you want to clear the message for the current flow without clearing messages from other flows.

In other good news, both of these options are now stored in the editor settings - so they are remembered between editor reloads.


### Deep copy option on Change node

The Change node's "set" action has a new option to create a deep copy of the value when copying from `msg`, `flow` or `global`.

In the case of Objects and Arrays, this creates a proper clone of the value, rather than creating a reference to the same object.

We've also updated the label of the "set" action to hopefully help users get the 'from' and 'to' fields the right way around.

![](/blog/content/images/2021/10/deep-copy.png)

### Delay node updates

When in rate limiting mode, the Delay node supports two new features:

 - if `msg.toFront` is set, a message is put to the front of the queue of messages waiting to be sent
 - there's a new option to send rate limited messages to an optional second output on the node. This is useful if you need to rate limit messages *and* do some further processing for the messages that have been rate limited, rather than just have them discarded.
   For example, if you are creating a rate limited HTTP endpoint, you still want to be able to respond to the rate limited requests rather than just letting them time out.

### Join node reset timeout

If the Join node has a timeout running and it receives a message with `msg.restartTimeout` set, it will restart the timeout.


### TCP Request node can return Strings

The TCP Request node can now be configured to return Strings rather than raw Buffers. This matches the functionality already available with the TCP In node.

### File nodes renamed

The `file` and `file in` nodes have new palette labels to make it clearer which writes to files and which reads from files. Even after all this time, I would have to double check which was which.

## Documentation Updates

Whilst not really part of the release, we've also published lots of updates to the [API documentation](https://nodered.org/docs/api/) on the website.

This includes the hooks and library store APIs in the runtime.

The docs now cover more of the APIs available to nodes and plugins to [extend the UI](https://nodered.org/docs/api/ui/).

There is also documentation on creating custom [Theme plugins](https://nodered.org/docs/api/ui/themes/).


## What's next?

This release has got us back on schedule for our [release plan](/about/releases/). With that plan, the next release, 2.2 is scheduled for the end of January.

There are a few features already in development for that release, including tooling to help package subflows as npm modules directly from the editor.

As ever, if there are any particular features you're interested in, now is a great time to jump into the [forum](https://discourse.nodered.org) to share your feedback.
