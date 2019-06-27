---
layout: docs-api
toc: toc-api-context.html
title: Local Filesystem Context Store
slug:
  - url: "/docs/api/context"
    label: "context"
  - 'filesystem'
---

**New in 0.19**

The Local Filesystem Context store holds context data in local files. By default it
caches context data in memory, allowing both synchronous and asynchronous access.

If the caching mode is disabled, the store only supports asynchronous access.

### Configuration

To create a file store, the following configuration can be used.

{% highlight javascript %}
contextStorage: {
   default: {
       module:"localfilesystem",
       config: {
           // see below
       }
   }
}
{% endhighlight %}

### Options

The file store can take the following configuration options:

Options         | Description
----------------|------------------------------
`dir`           | The directory to store the `base` directory in. Default: the user directory, `~/.node-red`
`base`          | The base directory under which context data is stored. Default: `"context"`
`cache`         | Whether to cache context in memory. Default: `true`
`flushInterval` | If caching is enabled, the minimum interval between writes to storage, in seconds. Default: `30`

The default configuration for a `file` context store is to use the directory `~/.node-red/context`, with caching
enabled and writes to storage happening every 30 seconds.

The `flushInterval` is provided to minimise wear on the underlying storage, such
as on a Raspberry Pi's SD card. Note that if Node-RED is unexpectedly killed, any data
that has not yet been flushed will be lost.

### Implementation details

This context store uses a separate file for each context scope. At the top level
is a directory for each flow scope and one for the global scope. Within each
flow scope directory is a file containing the flow scope, `flow.json` and a file
for each node context.

```
   $HOME/.node-red/context
     ├── global
     │     └── global.json
     ├── <id of Flow 1>
     │     ├── flow.json
     │     ├── <id of Node a>.json
     │     └── <id of Node b>.json
     └── <id of Flow 2>
           ├── flow.json
           ├── <id of Node x>.json
           └── <id of Node y>.json
```
