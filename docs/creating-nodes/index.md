---
layout: default
title: Creating Nodes
---

The main way Node-RED can be extended is to add new nodes into its palette.

*This guide is still being written - please provide any feedback to the
[mailing list](https://groups.google.com/forum/#!forum/node-red)*

This is a placeholding overview page - it'll be replaced with a proper overview
once the guide is complete.

The following sections exist and are largely complete:

 - [Creating your first node](first-node.html)
 - [JavaScript File](node-js.html)
 - [HTML File](node-html.html)
 - [Node properties](properties.html)
 - [Node appearance](appearance.html)
 - [Node status](status.html)
 - [Configuration nodes](config-nodes.html)
 - [Packaging](packaging.html)

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
   

  
