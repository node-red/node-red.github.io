---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Loading extra resources in the editor
slug: resources
---

*Since Node-RED 1.3*

A node may need to load extra resources in the editor. For example, to include
images in its help or to use external JavaScript and CSS files.

In earlier versions of Node-RED, the node would have to create custom HTTP Admin
end-points to serve up those resources.

With Node-RED 1.3 or later, if a module has a directory called `resources` at the
top level, the runtime will make anything in that directory available to the editor
under the url `/resources/<name-of-module>/<path-to-resource>`.

For example, given the following module structure:

```
node-red-node-example
 |- resources
 |   |- image.png
 |   \- library.js
 |- example-node.js
 |- example-node.html
 \- package.json
```

A default Node-RED configuration will expose those resource files as:

 - `http://localhost:1880/resources/node-red-node-example/image.png`
 - `http://localhost:1880/resources/node-red-node-example/library.js`


### Loading resources in the editor

When loading resources in the editor, the node must use relative URLs rather than absolute
URLs. This allows the browser to resolve the URL relative to the editor URL and removes
the need for the node to know anything about how its root paths are configured.

Using the above example, the following HTML can be used to load those resources in the editor:

 - `<img src="resources/node-red-node-example/image.png" />`
 - `<script src="resources/node-red-node-example/library.js">`

Note the URLs do not start with a `/`.
