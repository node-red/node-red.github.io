---
layout: aboutSingle
title: About
---

Node-RED is a flow-based programming tool, original developed by [IBM's Emerging Technology Services](https://emerging-technology.co.uk)
team and now a part of the [JS Foundation](https://js.foundation).

## Flow-based Programming

Invented by J. Paul Morrison in the 1970s, [flow-based programming](https://en.wikipedia.org/wiki/Flow-based_programming)
is a way of describing an application's behavior as a network of black-boxes, or
"nodes" as they are called in Node-RED. Each node has a well-defined purpose; it
is given some data, it does something with that data and then it passes that
data on. The network is responsible for the flow of data between the nodes.

It is a model that lends itself very well to a visual representation and makes
it more accessible to a wider range of users. If someone can break down a problem
into discrete steps they can look at a flow and get a sense of what it is doing;
without having to understand the individual lines of code within each node.

## Runtime/Editor

Node-RED consists of a Node.js-based runtime that you point a web browser at to
access the flow editor. Within the browser you create your application by dragging
nodes from your palette into a workspace and start to wire them together. With a
single click, the application is deployed back to the runtime where it is run.

The palette of nodes can be easily extended by installing new nodes created by
the community and the flows you create can be easily shared as JSON files.


## History

Node-RED started life in early 2013 as a side-project by Nick O'Leary and Dave
Conway-Jones of IBM's Emerging Technology Services group.

What began as a proof-of-concept for visualising and manipulating mappings
between MQTT topics, quickly became a much more general tool that could be easily
extended in any direction.

It was open-sourced in September 2013 and has been developed in the open ever
since, culminating in it being one of the founding projects of the JS Foundation
in October 2016.

For some more of the history and highlights:

- read our blog post announcing the
[move to the JS Foundation](http://nodered.org/blog/2016/10/17/js-foundation).
- watch Nick's talk from [Monki Gras 2016](https://www.youtube.com/watch?v=Bbg1017amZs) :

<div style="text-align: center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Bbg1017amZs" frameborder="0" allowfullscreen></iframe>
</div>
