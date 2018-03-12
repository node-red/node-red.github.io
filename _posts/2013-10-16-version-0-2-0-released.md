---
layout: blog
title: Version 0.2.0 released
author: nick
---

We're still finding our way with how we want to do regular releases, but as I said in the [original commit](https://github.com/node-red/node-red/commit/32796dd74ca2525e3fea302e79ff3fc596bb1bf3) to github, we've got to start somewhere.

With that said, Node-RED 0.2.0 is available to [download](https://github.com/node-red/node-red/archive/v0.2.0.zip) or [npm install](https://npmjs.org/package/node-red).

We need to make it as easy as possible for users to get started. Where we would normally git pull our way between updates, now we need to think through how a user can safely upgrade. It's quite a manual process at the moment - and writing this makes me realise the [docs](http://nodered.org/docs) need an upgrade guide adding.

Moving forward, there are various strands of activity. Some of the ones that are at the forefront as I sit here writing this are:

- npm install vs zip download - when should one be used over the other
- moving all but the core nodes from the main repository to the [node-red-nodes repository](http://github.com/node-red/node-red-nodes).
- thinking about multi-tabbed workspaces and sub-flows
- continuing to tidy up our existing nodes in light of feedback and experience

Stay tuned for more thoughts on these.

In the meantime, if you have any thoughts or suggestions, leave a comment here or on the [mailing list](https://groups.google.com/forum/#!forum/node-red).
