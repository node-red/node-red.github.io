---
layout: blog
title: Version 0.3.0 released
author: nick
---

Node-RED 0.3.0 is now available to [download](https://github.com/node-red/node-red/archive/0.3.0.zip) or [npm install](https://npmjs.org/package/node-red).

### Organising Flows
Part of the keeping-it-simple approach to Node-RED meant we provided a single workspace to create the flows on. We made the workspace really big so you could fit a lot on, but there was only one.

This worked up to a point, but it finally became clear we needed a better way to help users organise their flows.

In thinking about how to approach the problem, two use cases became apparent:

1. being able to place discrete flows on their own workspace,
2. being able to group a set of nodes into a 'sub-flow' that can be wired in to other flows as a single entity

With this new release, we begin to address these requirements by supporting multiple tabs/sheets/workspaces (the naming is still a little confused under the covers).

It may seem like a small step, but it has driven quite a bit of thought over the above use cases and how we should tackle them.

So whilst we don't have sub-flows yet, we do have a better understanding of what they are and how they'll be represented in both the underlying flows-file and the UI.

![tabbed workspace](/blog/content/images/2013/Oct/Node_RED___Google_Chrome_039-1.png)

### Reorganising nodes
This release also brings a reorganisation of the nodes that are included in the main repository. Some of the nodes, typically the more esoteric or hardware-specific, have moved over to the [node-red-nodes repository](http://github.com/node-red/node-red-nodes). We've updated the [install instructions](http://nodered.org/docs/getting-started/installation.html) with information on installing these additional nodes.

### Testing
A major omission of the project has been a set of reusable tests. As we use Node-RED all the time, our testing approach has largely been just using it - not very rigorous.

We've started adding some unit tests for the core server code, and will begin to add tests for the core nodes as well.
