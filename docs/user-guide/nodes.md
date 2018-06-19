---
layout: docs
toc: user-guide-toc.html
title: The Core Nodes
---

The Node-RED palette includes a default set of nodes that are the basic building
blocks for creating flows. This page highlights the core set you should know about.

All nodes include documentation you can see in the Info sidebar tab when you select a node.

- [Inject](#inject)
- [Debug](#debug)
- [Function](#function)
- [Change](#change)
- [Switch](#switch)

***

<h3 id="inject"><img alt="Inject node" style="vertical-align: middle" src="/docs/user-guide/images/node_inject.png" width="169px"></h3>

The Inject node can be used to manual trigger a flow by clicking the node's button
within the editor. It can also be used to automatically trigger flows at regular
intervals.

The message sent by the Inject node can have its `payload` and `topic` properties
set.

The `payload` can be set to a variety of different types:

 - a flow or global context property value
 - a String, number, boolean, Buffer or Object
 - a Timestamp in milliseconds since January 1st, 1970

***

<h3 id="debug"><img alt="Debug node" style="vertical-align: middle" src="/docs/user-guide/images/node_debug.png" width="169px"></h3>

The Debug node can be used to display messages in the Debug sidebar within the editor.

The sidebar provides a structured view of the messages it is sent, making it easier
to explore the message.

Alongside each message, the debug sidebar includes information about the time the message
was received and which Debug node sent it. Clicking on the source node id will reveal
that node within the workspace.

The button on the node can be used to enable or disable its output. It is recommended
to disable or remove any Debug nodes that are not being used.

The node can also be configured to send all messages to the runtime log, or to
send short (32 characters) to the status text under the debug node.

The page on [Working with messages](/docs/user-guide/messages) gives more
information about using the Debug sidebar.

***

<h3 id="function"><img alt="Function node" style="vertical-align: middle" src="/docs/user-guide/images/node_function.png" width="169px"></h3>

The Function node allows JavaScript code to be run against the messages that are
passed through it.

A complete guide for using the Function node is available [here](/docs/writing-functions).

***

<h3 id="change"><img alt="Change node" style="vertical-align: middle" src="/docs/user-guide/images/node_change.png" width="169px"></h3>

The Change node can be used to modify a message's properties and set context properties
without having to resort to a Function node.

Each node can be configured with multiple operations that are applied in order. The
available operations are:

 - **Set** - set a property. The value can be a variety of different types, or
   can be taken from an existing message or context property.
 - **Change** - search and replace parts of a message property.
 - **Move** - move or rename a property.
 - **Delete** - delete a property.

When setting a property, the value can also be the result of a [JSONata expression](https://jsonata.org).
JSONata is a declarative query and transformation language for JSON data.

***

<h3 id="switch"><img alt="Switch node" style="vertical-align: middle" src="/docs/user-guide/images/node_switch.png" width="169px"></h3>

The Switch node allows messages to be routed to different branches of a flow by
evaluating a set of rules against each message.

The node is configured with the property to test - which can be either a message
property or a context property.

There are four types of rule:

 - **Value** rules are evaluated against the configured property
 - **Sequence** rules can be used on message sequences, such as those generated
   by the Split node
 - A JSONata **Expression** can be provided that will be evaluated against the
   whole message and will match if the expression returns a `true` value.
 - An **Otherwise** rule can be used to match if none of the preceding rules have
   matched.

The node will route a message to all outputs corresponding to matching rules. But
it can also be configured to stop evaluating rules when it finds one that matches.
