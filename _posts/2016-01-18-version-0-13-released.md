---
layout: blog
title: Version 0.13 released
author: nick
---

Node-RED 0.13.0 is now available to [download](https://github.com/node-red/node-red/releases/download/0.13.0/node-red-0.13.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

If you are using the pre-installed version on Raspberry Pi Jessie, the repositories will be updated in the near future.

---

The 0.13 release brings lots of new features in the editor and internal changes to the runtime.

### Editor Updates

The Editor has had quite a few little changes that make for a nicer experience when creating your flows.

#### Grid layout
One of our existing hidden features has been the ability to align your nodes to an invisible grid by pressing the Shift key whilst dragging nodes around. We've made this more obvious by adding options to `Show grid` and `Snap to grid` under the new `View` menu. If you like everything to line up perfectly, turn these options on and enjoy.

Whilst we're talking about moving nodes, one bit that we know annoyed some of you was that simply moving a node didn't enable the Deploy button; that you had to make a material change to the flow before you could save changes. You can be annoyed no more - moving a node will now enable the Deploy button. If you select the Modified Nodes or Modified Flows deploy option then your layout changes will get saved without disrupting the running nodes (assuming you haven't made any material changes as well...).

#### Splicing wires

How many times have you wanted to drop a node onto an existing wire and have it splice itself into place? Well, now you can.
![](/blog/content/images/2016/01/splice-wire-1.gif)

You can only splice in new nodes that are either dragged straight from the palette or that have no existing wires.

#### Detaching wires

How many times have you wanted to replace a node that has lots of wires coming into it, but then had to manually rewire it? Well, now that's become much easier. If you hold the Shift key when you start dragging on a node's port, it will detach the existing wires and allow you to reconnect them elsewhere.

![](/blog/content/images/2016/01/rewire-node.gif)

#### Configuration nodes (again)

In the last release we added some warnings at deploy time to let you know about potential problems. One of those warnings was if you had any unused configuration nodes in your workspace. It was an improvement on what we had before - not telling you anything - but it didn't gain many fans as it got in the way of the deploy and wasn't really an error as such.

With this release, we've gotten rid of that warning. In its place, if you deploy with unused configuration nodes, the normal 'Successfully deployed' notification has been extended to tell you about the unused nodes. As this notification disappears after ~8 seconds it doesn't get in the way of your work flow. Significantly, the message also includes a link which opens up the config node sidebar to show you the unused nodes it's telling you about.

![](/blog/content/images/2016/01/Node-RED.png)

The config node sidebar has also been updated to show you all config nodes organised by the flow (tab) or subflow they are on. There are controls at the top of the view to show just the unused ones.

We think this addresses all of the comments we've received about this particular area - do let us know what you think.

#### Edit dialog

The free-form nature of the node edit dialog means it is hard for the editor to know if there are unsaved changes in the dialog. Because of this we disabled the 'hit Escape to close' behaviour you may expect in such a dialog - so you didn't accidentally lose your changes. For those of you that don't like leaving the keyboard, you can now use Ctrl-Escape (Cmd-Escape) to close the dialog and discard any changes. Similarly, Ctrl-Enter (Cmd-Enter) hits the Okay button and applies the changes.

One thing we spotted in our own nodes was a lot of repeated boilerplate code to handle layout changes when the edit dialog was resized. To make that easier a node's definition can now include an `oneditresize` function that is called whenever the dialog is resized. The core nodes have been updated to use it so you can see how it can be used, for example, with the [Catch node](https://github.com/node-red/node-red/blob/03558b012c825caa3d5ea981bfe125997ca357fd/nodes/core/core/25-catch.html#L275).

#### TypedInput widget

The Change node has been updated to support a richer set of property types. Previously, it could only set a message property to a String value. Now, you can pick from a selection of types using the new `TypedInput` widget added in this release.

![](/blog/content/images/2016/01/Node-RED-1.png)

In that list you'll see `msg.` - which copies one message property to another. You'll also see `flow.` and `global.` - more on those in a bit.

The JSON option lets you provide a JSON string and it will be parsed to the equivalet JavaScript object. All in all, very handy.

The Switch node has also been updated to use this widget. One extra option that is particular to the Switch node is the ability to set the property to 'previous value'. This let's you create flows that route messages depending on whether the value of the property has changed. We have the `rbe` node (report-by-exception) that can do this as well, but adding it to the Switch node makes it easier to do.

The Inject node has also been updated so you have a richer set of choices for what payload it injects.

The `TypedInput` widget is a Node-RED specific jQuery widget that is available in the editor for any node to use. We'll be sharing documentation for it in the near future - but you can take a look at the updated nodes to see how it's used.

#### Context

Function nodes have had access to the `context` object to give them a space to store state between calls. They also had access to `context.global` - the context shared by all Function nodes.

In this release, we've made some updates to how context is accessed, making it available to all nodes and changed how it's used.

Within the Function node, `context` has been joined by `flow` and `global`. These are three separate scopes of context - within the node, the flow (tab)
and across all nodes respectively.

Each of these contexts now provide a `get(key)` and `set(key,value)` pair of functions for accessing the data within them. You can still just attach properties to these objects, for example `context.foo = 1;` so existing flows won't be affected, but doing so is now discouraged in favour of `context.set('foo',1);`. This is the first step to the goal of being able to save and restore the context objects across Node-RED restarts.

As mentioned earlier, the Inject, Switch and Change nodes are now all able to access the `flow` and `global` contexts and the Template node can be used to set context properties.

The [documentation on writing Functions](http://nodered.org/docs/writing-functions.html#storing-data) has been updated with more details.

### Runtime updates

The Admin API has some new additions:

 - the [`/flows` endpoint](http://nodered.org/docs/api/admin/methods/post/flows/) can now be used to trigger a reload and restart of the of the active flow configuration by setting the `Node-RED-Deployment-Type` header to `reload`.
 - the new `/flow` endpoint has been added with actions to [add](http://nodered.org/docs/api/admin/methods/post/flow/), [get](http://nodered.org/docs/api/admin/methods/get/flow/), [update](http://nodered.org/docs/api/admin/methods/put/flow/) and [delete](http://nodered.org/docs/api/admin/methods/delete/flow/) an individual flow (tab) without distrupting the other flows.

The runtime itself has been reorganised to better separate the core runtime from the parts that provide the admin api and editor. We've also stabalised the runtime api to the point where we can start [documenting](http://nodered.org//docs/api/runtime/index.html) it. We wanted to have it fully documented in time for the release, but inevitably that hasn't happened - we're working on it.

One note to anyone who has started creating message translations of your own, the catalog files for the editor and runtime have moved. They are now:

 - `red/api/locales/en-US/editor.json`
 - `red/runtime/locales/en-US/runtime.json`
