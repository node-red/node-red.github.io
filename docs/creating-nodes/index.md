---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Creating Nodes
---

The main way Node-RED can be extended is to add new nodes into its palette.

The following sections exist and are largely complete:

 - [Creating your first node](first-node)
 - [JavaScript File](node-js)
 - [HTML File](node-html)
 - [Packaging](packaging)
 - [Node properties](properties)
 - [Node credentials](credentials)
 - [Node appearance](appearance)
 - [Node edit dialog](edit-dialog)
 - [Storing context](context)
 - [Node status](status)
 - [Configuration nodes](config-nodes)
 - [Help style guide](help-style-guide)
 - [Adding examples](examples)
 - [Internationalisation](i18n)


To do:

1. library
2. custom http endpoints


### General guidance

There are some general principles to follow when creating new nodes. These reflect
the approach taken by the core nodes and help provided a consistent user-experience.

Nodes should:

- **be well-defined in their purpose.**

   A node that exposes every possible option of an API is potentially less useful
   that a group of nodes that each serve a single purpose.

- **be simple to use, regardless of the underlying functionality.**

   Hide complexity and avoid the use of jargon or domain-specific knowledge.

- **be forgiving in what types of message properties it accepts.**

   Message properties can be strings, numbers, booleans, Buffers, objects, arrays
   or nulls. A node should do The Right Thing when faced with any of these.

- **be consistent in what they send.**

   Nodes should document what properties they add to messages, and they should
   be consistent and predictable in their behaviour.

- **sit at the beginning, middle or end of a flow - not all at once.**

- **catch errors.**

   If a node throws an uncaught error, Node-RED will stop the entire flow as the
   state of the system is no longer known.

   Wherever possible, nodes must catch errors or register error handlers for any
   asynchronous calls they make.
