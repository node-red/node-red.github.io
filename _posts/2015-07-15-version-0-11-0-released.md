---
layout: blog
title: Version 0.11.0 released
author: nick
---

Node-RED 0.11.1 is now available to [download](https://github.com/node-red/node-red/releases/download/0.11.1/node-red-0.11.1.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

---

This release consists of three significant updates, a new node and the usual handful of smaller but just as perfectly formed updates.


### Node.js 0.12

In recent weeks, there had been a steady increase in issues being [raised on GitHub](https://github.com/node-red/node-red/issues), or questions [asked on Stack Overflow](http://stackoverflow.com/questions/tagged/node-red) because we didn't work with the latest stable version of node. Despite our release notes and install instructions highlighting this, users were still getting caught out.

We've finally tracked down and squashed the last remaining issues that were breaking our unit tests on node 0.12 and we've added it to the list of versions that get checked with [every commit pushed to the repository](https://travis-ci.org/node-red/node-red).

It is important to note that we have only tested the core runtime and nodes. 3rd party nodes may still have lurking issues - so be sure to test your flows out before you leap.

### Internationalisation

... or i18n for short.

The runtime, editor and core nodes have had all of their text extracted into message catalogs ready for translation. We don't yet have a plan for getting the content translated, but having the underlying engineering done to enable it is an important step.

The '[how to write a node](http://nodered.org/docs/creating-nodes/)' documentation will be updated shortly to cover how 3rd party nodes can do the same if they so wish. Some of the design notes for how this works are available [on the wiki](https://github.com/node-red/node-red/wiki/Design%3A-i18n).

### Editor design refresh

Whilst the above two items should be fairly transparent to end-users, this third item will be far more apparent to everyone.

The appearance of the editor UI has had a complete refresh. Whilst keeping the core visual identity the same, we've given the editor a face lift to make it cleaner, crisper and more consistent.

Under the covers it also takes another step towards removing our dependency on [bootstrap](http://getbootstrap.com/2.3.2/). There's still some way to go on that front, but we're making good progress.

Let us know what you think.

### New Report-By-Exception node

The report-by-exception (rbe) node has lived in the [node-red-nodes repository](https://github.com/node-red/node-red-nodes/tree/master/function/rbe) and been [available on npm](http://flows.nodered.org/node/node-red-node-rbe) for some time.

With this release, we've added it to the default set installed with Node-RED.

The node only allows messages to pass through based on one of two possible conditions:

 - for string or numeric values, if their `msg.payload` is different to the previous messages value.
 - for numeric values, if their `msg.payload` differs from the previous value by at least some margin (either absolute value or by a percentage)

This is particularly useful, for example, if you are reporting a sensor value. It isn't necessarily useful to report a temperature is unchanged every few seconds through the day. It is far more useful to report when the value has changed.

### Other changes

Aside from a couple bug fixes, the only other changes in the release were:

 - The File output node can be configured to create the directory if needed
 - The Function node already had `setTimeout` available to it - we've added `clearTimeout` as it seemed only polite
