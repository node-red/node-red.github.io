---
layout: blog
title: Version 0.16 released
author: nick
---

Node-RED 0.16 is now available to [download](https://github.com/node-red/node-red/releases/download/0.16.0/node-red-0.16.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

As announced with the 0.15 release, 0.16 will not be made available via the standard
Raspberry Pi Jessie repositories. See below for more information on how to update
your Pi to this version.

---

### Node 0.10/0.12 no longer supported

Also announced with the last release, we no longer support Node.JS 0.10 or 0.12.

Neither of these versions are supported by the Node project anymore and continuing
support for them was already preventing us from picking up important fixes in
other dependencies.

If you are running the preinstalled version on a Raspberry Pi, you should follow
the instuctions [here](http://nodered.org/docs/hardware/raspberrypi) for upgrading
your version of node.js.

### node-red-node-serialport removed

As we announced in the previous release, we've removed the Serial node from
the default set of nodes.

***If you are using the Serial node, you will need to manually reinstall the node
after upgrading.***

### Editor Updates

#### Quick-add nodes/wires

There are two fundamental actions in Node-RED - adding a node and wiring it to
another node.

One of the challenges can sometimes be finding the node you want in the palette.
That can cause lots of scrolling - particularly if you've installed lots of nodes.

We've added a new 'quick add' mode for nodes. If you ctrl-click (cmd-click) in
the workspace, the new quick-add dropdown will appear. It provides a mini version
of your palette right under the cursor that can be filtered to find exactly the
node you are looking for. When you click on the node it then appears on your workspace.

![](/blog/content/images/2017/01/quick-add.gif)

The dropdown lists five common core nodes at the top, then the
five most recently added nodes and then all of the nodes in alphabetical order.

We've been using this for a while now and found it to really speed up creating
flows. You don't have to keep moving your focus over to the palette as you go.

Another challenge is when you've placed a bunch of nodes in the workspace and
want to wire them all together; lots of click-dragging needed.

Alongside the quick add mode for nodes, we've done something similar for wires.

If you hold down ctrl (cmd) when you click on a node's port to start wiring, you
can then let go of the mouse button and simply click on each node you want to
have wired together and then release ctrl.

![](/blog/content/images/2017/01/quick-wire.gif)

As both modes are trigged by holding the ctrl key down when clicking, you can
easily combine them.

![](/blog/content/images/2017/01/quick-add-and-wire.gif)

#### Better Debug panel

The Debug sidebar has had an overhaul to make it much more useful. Previously it
would display the message content as raw text. That was fine for simple text or
numeric values, but as soon as you sent an Object or Array it was hard to see
the details in the blob of text it displayed.

The new sidebar provides a much more structured view of the messages. If you
are familiar with the JavaScript console in your browser, you'll be familiar
with what you can do here.

![](/blog/content/images/2017/01/debug.gif)

There are a number of extra features hidden in there. For example, any numeric
type can be clicked on to toggle between decimal and hexadecimal. If it looks
like a date expressed in milliseconds since epoch, another click will show the
formatted date.

Another example is if you receive a Buffer object that actually contains text data:

![](/blog/content/images/2017/01/debug-string-buffer.gif)

You can also now pop the debug sidebar out into its own window by clicking the
screen icon in the bottom right corner. That lets you give your debug messages
as much room as they need.

![](/blog/content/images/2017/01/debug-detach.png)

If you have any other suggestions for making the debug panel even more useful,
do let us know.

#### Flow diff

We introduced a warning in the last release for when you are about to overwrite
changes on the runtime. We knew the warning would be of limited use - it doesn't
help you do anything about it.

This release now lets you compare the flows on the server with the changes you've
made locally. You can then merge those changes together, resolving any conflicts
along the way.

![](/blog/content/images/2017/01/diff-view.png)


#### New keyboard shortcuts

The keyboard handling in the editor has had an overhaul to make it easier to
add keyboard shortcuts to any action. You can see a full list of the available
keyboard shortcuts by pressing `Shift-?`, or from the corresponding menu option.

Some highlights include:

 - Opening the search dialog has moved to `Ctrl-F` - these removes a clash with
   a system shortcut on Windows, and is actually more sensible in general.
 - `Ctrl-G` followed by either `i`, `d` or `c` will open the info, debug or
   configuration nodes sidebar tabs respectively.
 - You can switch tabs with `Ctrl-Shift-j` and `Ctrl-Shift-k`

The list also shows you other defined actions that don't currently have a
shortcut assigned; this work is a precursor to allowing you to customise the
shortcuts in a future release.

#### Runtime state notification

We've added a warning to the editor that notifies you if your flows are currently
stopped due to missing node types. This was a cause of confusion for users who
didn't watch their runtime logs.

![](/blog/content/images/2017/01/stopped-warning.png)

#### JSONata

[JSONata](http://jsonata.org/) is a lightweight query and transformation language
for working with JSON documents, developed by some colleagues of ours at IBM.

We've added support for it in the Change and Switch nodes. This means many simple
tasks are now possible without resorting to the Function node.

For example, a Change node that converts `msg.payload` from Fahrenheit to Celsius:

![](/blog/content/images/2017/01/jsonata-change.png)

To help you write JSONata expressions, you can open up an expression editor by
clicking the button to the right of the field. This provides auto-complete and
inline help for the full JSONata language.

For more information about JSONata, head over to their [website](http://jsonata.org/)
and use their [exerciser to try it out](http://try.jsonata.org/).


#### Other changes

 - We've added a set of tips for using the editor to the info sidebar - not
   everyone reads the release notes.
 - Installing or removing nodes using the palette manager now has an extra step
   to confirm the action.
 - The `typedInput` widget used by many nodes is now keyboard accessible
 - We've added a `delete` button to the node edit dialog - not everyone realised
   you can use the `delete` key to do the same.


### Node Updates

 - There's a new parser node for the `YAML` format
 - The `template` node can now reference `global` and `flow` context properties -
   check its updated info tab for an example
 - The Switch node now keeps your links in order when you rearrange rules
