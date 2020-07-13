---
layout: docs-developing-flows
toc: toc-developing-flows.html
title: Message design
slug: message design
---

The messages that pass through a flow are plain JavaScript objects that can have
properties set on them.

They usually have a payload property - this is the default property that most nodes
will work with.

When creating flows, the choice of properties used on a message will largely
be determined by what the nodes in the flow require.




 - payload as the main content
 - properties at top level, vs everything in payload
 - Take care of node side-effects (msg.topic for example)
 - Use properties to identify the origin of a message
 - Preserve message properties
 - Cloning messages
