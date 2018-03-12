---
layout: blog
title: Version 0.10.6 released
author: nick
---

Node-RED 0.10.6 is now available to [download](https://github.com/node-red/node-red/archive/0.10.6.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

Remember, at this time, we **do not** support Node.js v0.12 or io.js.

### On version numbers

You may have spotted this release is `0.10.6`. You may be wondering what happened to `0.10.5`. This marks the first release where we're going to take a slightly different approach to version numbering.

**tl;dr**: Released versions, published to npm, will have an even last digit. The latest code being developed on GitHub will have the next odd number.

Previously, the very last commit I do before cutting a new release is to bump the version number in `package.json`. At that point, anyone who installed the release from npm would get that version. We would then continue development in git. If someone wanted to try out the latest code from git by cloning the repository, it would still have the same version number in its `package.json` as the previous release.

This has caused some confusion for users when reporting issues as well as some technical headaches for automated builds that pull in node-red as a dependency.

By immediately bumping the version in git following a release (to make it odd), and also bumping it immediately before the next release (to make it even) helps to identify the different levels.

### Editor changes

Quite a few small changes have gone into the editor. Some of the ones worth highlighting are:

 - We've made some performance improvements to how flows are drawn in the editor. The more nodes/wires you have, the more noticeable they'll be.

 - The palette has had an overdue update to bring the nodes' appearance inline with how they appear in the workspace.

 ![Palette Update](/blog/content/images/2015/Mar/Selection_164.png)

 - If you try to leave the editor with undeployed changes, you'll get a browser alert warning you'll lose your changes and give you the option to stay on the page.

 ![Confirm Navigation](/blog/content/images/2015/Mar/Selection_165.png)


 - A common issue is where an Inject node's button is clicked on before it is deployed, which doesn't work. Or when it has undeployed changes and clicking the button causes the current deployed version to trigger.

 Now, if a node has undeployed changes, the button is visually disabled.

 ![Inject buttons](/blog/content/images/2015/Mar/Selection_166.png)

 - Another area that the node action buttons can cause unexpected behaviour is whilst editing a subflow. A subflow is best thought of as a template of nodes. When editing a subflow, you are editing the template, not the actual instance of the subflow. In this view, the node action buttons, such as on the Inject node, do not correspond to a single node in the runtime, so clicking on them won't work. To reflect this, the buttons are disabled when editing a subflow.

 - Whilst mentioning subflows, you can now get to a subflow's edit view by double-clicking on its entry in the palette

 - We've moved away from the Eclipse Orion rich text editor component in favour of the [ACE code editor](http://ace.c9.io/) in the Function, Template and Comment nodes. We've still load the Orion library into the Editor as we know there are 3rd party nodes that depend on it.

### Node changes

#### Catch node

Many of the nodes in the palette are optimistic in behaviour; they assume things will succeed, so the fact that errors cause flows to stop is ignored.

In reality, things do go wrong. Files fail to write, TCP sockets fail to connect, user-written Function nodes contain bugs. As soon as you want to create a flow that can handle these scenarios, it gets a bit tricky.

This release introduces the new Catch node. This node can be used to catch errors thrown by other nodes on the same tab and trigger an error handling flow. The node sends on the message that was being handled when the error was hit and allows whatever steps are needed to be taken.

For HTTP request based flows, this is particularly important where a flow must complete and a response sent back regardless of what happens.

![Error flow example](/blog/content/images/2015/Mar/Selection_168.png)

We'll be improving the individual nodes' documentation to highlight which will trigger the Catch node and under what circumstances.

#### Function node

There are two new features of the Function node.

First, if it needs to log something to the Node-RED log, it can now use one of the following functions:

    node.log("something something logging");
    node.warn("this is a warning");
    node.error("something went wrong",msg);

The last of these, `node.error`, can take an optional second argument of the message that was being handled. If it is passed in, it will trigger any Catch nodes on the same tab.

The second change is one that has been asked for a few times, but it has taken a little while to make sure we get it plumbed in correctly.

Rather than require the Function node to return the messages to send on, it can now also call the new `node.send()` function at any time to send messages. This small additional means it is possible to write code in the Function node that performs asynchronous operations.

A consequence of adding this, is that, in some circumstances, the Function needs to be notified if the node is being stopped, so it can cancel any outstanding activity. Just as with the runtime node api, the Function can register its own handler for the `close` event by calling:

    node.on('close',function() { })

The [documentation](http://nodered.org/docs/writing-functions.html) has been updated to cover these things.



#### Change node

The Change node makes it easy to set, change and delete properties of a message without resorting to a Function node. A common reason users still resort to a Function node is that they want to make multiple changes, and having a change node in a flow for each desired change makes for a crowded workspace.

This release introduces an updated Change node that allows you to specify multiple rules that get applied in each message passing through.

![Change Node edit dialog](/blog/content/images/2015/Mar/Selection_169.png)


### Runtime changes

As highlighted in the last couple of releases, we had deprecated the behaviour in some of our nodes whereby a message's properties could override properties explicitly set in a node. We added warnings in the 0.10.1 release to highlight to the user when they were using this deprecated behaviour.

In this release, we have now switched over our node implementations so that a message's properties will not override properties explicitly set in a node. We've updated the deprecation warning that gets logged if we spot a message with a property that would have previously overriden a node property.

### Node API changes

We've added `onpaletteadd` and `onpaletteremove` properites to a [node's definition](http://nodered.org/docs/creating-nodes/node-html.html#node-definition). If a node makes any contribution to the UI, it should be done within the `onpaletteadd` function, and removed within the `onpaletteremove` function. This ensures the node can be dynamically added and removed from the palette without leaving remnants behind.

A node can now define multiple handlers for the `close` event, simply by calling `this.on('close',function(){...})` multiple times.

### Command-line administration tool

We've also released the Node-RED command-line administration tool. This allows you to remotely add/remove/enable/disable nodes from Node-RED without having to restart.

More details in the [documentation](http://nodered.org/docs/node-red-admin.html).

This tool makes use of the Admin API which we've had in place for a couple releases. With the release of the tool, we're now happy the API is stable enough for others to make use of. The API is documented in the new [API section of our documentation](http://nodered.org/docs/api/index.html).
