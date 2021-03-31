---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Packaging Subflows
slug: packaging subflows
---

Since Node-RED 1.3 it is possible to package a Subflow as a node module and publish
it to npm.

When it gets loaded into the Editor it appears just like any other node - the
internal details of the subflow are not exposed to the user.

This guide explains how to export a Subflow from the editor, convert its JSON
into the required format and then package it as an npm module.


### Creating a subflow

### Adding meta-data to the subflow

### Exporting the subflow

### Transforming the JSON

### Packaging the subflow


### `package.json`

```
{
  "name": "node-red-contrib-",
  "version": "1.0.1",
  "description": "",
  "keywords": [],
  "license": "ISC",
  "node-red": {
      "nodes": {
          "test-subflow": "subflow.js"
      },
      "dependencies": [
          "node-red-node-random"
      ]
  },
  "dependencies": {
      "node-red-node-random": "*"
  }
}
```