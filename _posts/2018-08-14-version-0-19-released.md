---
layout: blog
title: Version 0.19 released
author: nick
---

Node-RED 0.19 is now available to [download](https://github.com/node-red/node-red/releases/download/0.19.0/node-red-0.19.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

For the Raspberry Pi users, please see the [Raspberry Pi documentation](https://nodered.org/docs/hardware/raspberrypi#upgrading)
for how to upgrade if you are still on the pre-installed version.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/_G_lCXoABO0?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

### Node.js version support

Node.js 4 reached its end-of-life back in April and is no longer receiving fixes
of any sort. The current Node.js LTS release is 8.x with 10.x coming in October.

As the node ecosystem continues to move forward we are seeing an increasing number
of modules we depend on dropping support for older node.js versions.

We are taking this opportunity to announce that this will be the **last release**
of Node-RED that supports anything **earlier than Node 8.x**.

As we approach Node-RED 1.0 we will establish our own LTS policy that aligns as
closely as possible with the [Node.JS schedule](https://github.com/nodejs/Release).

### Persistent Context

This release brings the next step on our roadmap to 1.0; the ability to store
context data outside of the runtime.

Context data is state held within a flow outside of the individual messages flowing
through it. Previously, this data was only held in memory, so would be lost whenever
the runtime restarted.

With 0.19, this state can now be held outside of the runtime. The runtime provides
a new API for creating context stores and 0.19 provides two implementations ready to use.

The default store remains an in-memory store - so nothing will change for existing flows.
The second implementation provided is a file-based store - where the context data gets
written to files under your user directory.

It also supports having more than one store configured in the runtime, so you can choose
where each piece of context data is stored. For example, you may want a non-persistent
store for some values and a persistent store for others.

In time we plan to have other implementations available, such as for Redis, to allow
a more scalable approach when running at scale.

Documentation on the how to enable the new context features is available [here](https://nodered.org/docs/user-guide/context).

#### Context browser

<div style="float: right; width: 200px; margin-left: 10px">
<img src="/blog/content/images/2018/08/editor-sidebar-context.png" />
</div>

To compliment the new persistent context feature, we've added a new sidebar that allows
you to view context data within the editor. Inspired by the existing [node-red-contrib-contextbrowser](https://flows.nodered.org/node/node-red-contrib-contextbrowser)
plugin, the new sidebar has been built around the new underlying context apis and
fully supports multiple context stores.

As with the Debug sidebar, if you hover over any value a <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-clipboard"></i> button appears to copy
that value to your clipboard. Note that only values that can be JSON-encoded can
be copied.


<br style="clear:both;" />


### Editor updates

#### Redesigned Sidebar tabs

With the new context sidebar, it was time to redesign how the sidebar tabs were
displayed as they were getting squashed.

The tabs now collapse down to just an icon for the tab, with a drop-down to select
any tabs not currently visible.

![](/blog/content/images/2018/08/sidebar-tabs.gif)

#### Changing node icons

It is now possible to customise the icon of any node in your flow. This can help
distinguish between multiple nodes of the same type that perform different roles.

![](/blog/content/images/2018/08/editor-icon-picker.gif)

The icon option is on the 'node settings' section of each node's edit dialog. It
allows you to browse and pick from all of the available icons. Note we do not
yet support using the Font Awesome icons for the node.

#### Changing subflow category

You can also now choose what palette category a subflow appears in. This makes
it easier to organise your subflows rather than having them all in a single
category at the top of the palette.

#### Flow navigator widget

We've added a flow navigator widget in the footer of the main workspace that can
be enabled with the new <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-map-o"></i> button. This
gives you a scaled down view of the entire workspace, and shows you which bit
you are currently looking at. You can drag the view around to quickly reach
any corner of the workspace and should make it easier to find the odd nodes you
had dragged to the furthers corners and forgotten about.

![](/blog/content/images/2018/08/editor-workspace-navigator.png)


### Better handling of environment variables

It is now possible to access environment variables directly within a flow.

The Inject, Switch and Change nodes have all been updated to add the 'env variable'
option to the standard TypedInput widget:

![](/blog/content/images/2018/08/editor-typedInput-envvar.png)

We've also added the `$env()` function to the JSONata expression language to allow
environment variables to be accessed from within an expression.


### Node Updates

 - the `File Out` node now has an output so a flow can continue once the file has been written.
 - the `Function` node can now access its own `id` and `name` properties. The documentation
   has been updated with a full [reference](/docs/writing-functions#api-reference) of the
   available objects and functions. The node's JavaScript editor can now also be expanded
   to a larger editor view.
 - the `JSON` node can do schema validation if the message it receives has `msg.schema` property.
 - the Pi-specific GPIO nodes are now available on all platforms - however they
   only do something when running on a Pi. This makes it easier to view/edit flows
   on your laptop that are destined for a Pi.
 - the `Switch` node has a new 'isEmpty' rule. It matches on Strings, Arrays and Buffers
   that are empty. There is also the corresponding 'isNotEmpty' rule.
 - the common `TLS` node now accepts the `servername` config option - necessary when using SNI.
