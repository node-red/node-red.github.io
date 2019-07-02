---
layout: docs-user-guide
title: Node-RED Concepts
slug: concepts
---

<ul class="multi-column-toc" id="concept-toc"></ul>

---

<b id="node">Node</b>
: A Node is the basic building block of a flow.

  Nodes are triggered by either receiving a message from the previous node in a
  flow, or by waiting for some external event, such as an incoming HTTP request,
  a timer or GPIO hardware change. They process that message, or event, and then
  may send a message to the next nodes in the flow.

  A node can have at most one input port and as many output ports as it requires.

    - [Working with Nodes](/docs/user-guide/editor/workspace/nodes)
    - [The Core Nodes](/docs/user-guide/nodes)
    - [Creating Nodes](/docs/creating-nodes)

<b id="config-node">Configuration node</b>
: A Configuration (config) Node is a special type of node that holds reusable
  configuration that can be shared by regular nodes in a flow.

  For example, the MQTT In and Out nodes use an MQTT Broker config node to represent a
  shared connection to an MQTT broker.

  Config nodes do not appear in the main workspace, but can be seen by opening
  the Configuration nodes sidebar.

    - [Working with Configuration nodes](/docs/user-guide/editor/workspace/nodes#configuration-nodes)
    - [Configuration node sidebar](/docs/user-guide/editor/sidebar/config)


<b id="flow">Flow</b>
: A Flow is represented as a tab within the editor workspace and is the main way to
  organise nodes.

  The term "flow" is also used to informally describe a single set of connected nodes.
  So a flow (tab) can contain multiple flows (sets of connected nodes).


    - [Working with Flows](/docs/user-guide/editor/workspace/flows)

<b id="context">Context</b>
: Context is a way to store information that can be shared between nodes without
  using the messages that pass through a flow.

  There are three types of context;

    - Node - only visible to the node that set the value
    - Flow - visible to all nodes on the same flow (or tab in the editor)
    - Global - visible to all nodes

  By default, Node-RED uses an in-memory Context store so values do not get saved
  across restarts. It can be configured to use a file-system based store to make
  the values persistent. It is also possible to plug-in alternative storage plugins.

    - [Working with context](/docs/user-guide/context)
    - [Context Store API](/docs/api/context/)

<b id="message">Message</b>
: Messages are what pass between the nodes in a flow. They are plain JavaScript
  objects that can have any set of properties. They are often referred to as `msg`
  within the editor.

  By convention, they have a `payload` property containing the most useful information.

  - [Working with messages](/docs/user-guide/messages)


<b id="subflow">Subflow</b>
: A Subflow is a collection of nodes that are collapsed into a single node in
  the workspace.

  They can be used to reduce some visual complexity of a flow, or to package up a group
  of nodes as a reusable component used in multiple places.

    - [Working with Subflows](/docs/user-guide/editor/workspace/subflows)


<b id="wire">Wire</b>
: Wires connect the nodes and represent how messages pass through the flow.

    - [Working with Wires](/docs/user-guide/editor/workspace/wires)

<b id="palette">Palette</b>
: The Palette is on the left of the editor and lists of the nodes that are available
  to use in flows.

  Extra nodes can be installed into the palette using either the command-line or
  the Palette Manager.

    - [Working with the Palette](/docs/user-guide/editor/palette/)
    - [Adding nodes to the palette](/docs/user-guide/runtime/adding-nodes)
    - [The Palette Manager](/docs/user-guide/editor/palette/manager)

<b id="workspace">Workspace</b>
: The Workspace is the main area where flows are developed by dragging nodes
  from the palette and wiring them together.

  The workspace has a row of tabs along the top; one for each flow and any
  subflows that have been opened.

    - [Working with the Workspace](/docs/user-guide/editor/workspace/)

<b id="sidebar">Sidebar</b>
: The sidebar contains panels that provide a number of useful tools within the
  editor. These include panels to view more information and help about a node,
  to view debug message and to view the flow's configuration nodes.

    - [Working with the Sidebar](docs/user-guide/editor/sidebar/)


<script>
    $(function() {
        $("dt b").each(function() {
            $('<li><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></li>').appendTo("#concept-toc")
        })
    })
</script>
