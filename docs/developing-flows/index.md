---
layout: docs-developing-flows
toc: toc-developing-flows.html
title: Introduction
---

Node-RED allows you to quickly start developing applications by dragging in nodes and
wiring them together to create flows. This can be a great way to get started, but
as flows grow over time, it can lead to applications that are harder to maintain.

This guide provides some recommendations and best practices for how to create
Node-RED flows that will be resuable, easier to maintain and more robust.

This guide assume that you are already familiar with the basic usage of Node-RED.
If you are looking for more information about using Node-RED, the [User Guide](https://nodered.org/docs/user-guide/)
and [Cookbook](https://cookbook.nodered.org/) are good resources to help you get
started.



### [Flow structure](flow-structure)

This section looks at how you can organise your flows, strategies for splitting them
into smaller, reusable components and how to customise them for different platforms.

[more...](flow-structure)


### [Message design](message-design)

**Not written yet**

 - payload as the main content
 - properties at top level, vs everything in payload
 - Take care of node side-effects (msg.topic for example)
 - Use properties to identify the origin of a message
 - Preserve message properties
 - Cloning messages

[more...](message-design)

### [Error handling](error-handling)

**Not written yet**

 - How to handle errors in flows
   - what can or cannot be caught be a Catch node
 - Where Status node can be used
 - Layout of Catch/Status nodes in relation to what they target
 - Avoiding loops

[more...](error-handling)

### [Documenting flows](documenting-flows)

All good code should have good documentation to match. This section looks at what
tools and techniques Node-RED provides to help you document them.

[more...](documenting-flows)

---

***The following is the original proposed content for the guide. It is still here for reference whilst it is being reworked into the above sections***

##### [Designing](designing)

Descriptions about designing strategy before developing flows.

##### [Implementation](implementation)

Explanations about phases of the flow implementation.

##### [Readability](readability)

Guideline for improving readability to create a reusable flows

##### [Project](multiple-developers)

Project management methods for developing flows among multiple people

##### [Non-functional requirements](non-functional)

Techniques to meet non-functional requirements.
