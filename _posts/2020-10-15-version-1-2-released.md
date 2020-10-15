---
layout: blog
title: Version 1.2 released
author: nick
---

Node-RED 1.2 is now available to [install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/rnM5sfb2qoY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
- [Editor Updates](#editor-updates)
   - [Importing duplicate nodes](#importing-duplicate-nodes)
   - [Simplified Git Workflow](#simplified-git-workflow)
   - [Handling 'lost' nodes](#handling-lost-nodes)
   - [Other editor features](#other-editor-features)
- [Runtime features](#runtime-features)
   - [Splitting `.config.json` into multiple files](#splitting-configjson-into-multiple-files)
   - [Introducing `RED.hooks` api](#introducing-redhooks-api)
- [Node updates](#node-updates)


## Editor Updates

### Importing duplicate nodes

In previous releases, when you import a flow, all of its nodes are assigned new
identifiers. This meant that if you imported the flow again, you'd get a second
copy. If that flow included configuration nodes or subflows that were identical
to ones you already had, the editor would avoid importing a duplicate copy and
reuse the existing one.

That has generally worked well, but on some occasions it wasn't ideal. In particular,
if you wanted to import an *update* to a subflow you are using, there was no easy
way to do it - it would be imported as a new subflow and you'd have to manually
update all the instances to the new subflow.

With this release, when you import a flow that contains nodes you already have,
the editor will now ask you what to do. In the case of Subflows and Configuration
nodes, it gives you the option of *replacing* the instances you already have,
rather than importing a copy.

![](/blog/content/images/2020/10/import-dupes.gif)

[More details](https://github.com/node-red/node-red/pull/2698)

### Simplified Git Workflow

The projects feature now provides an option for a simplified git workflow. The
option, under User Settings, lets you enable an 'automatic' mode where changes
will be automatically committed with every deploy.

![](/blog/content/images/2020/10/git-workflow.png)

[More details](https://github.com/node-red/node-red/pull/2035)

Other project enhancements include:
 - the project settings dialog also now lets you edit the project's version string.
 - the `flowFilePretty` option is now automatically enabled for projects unless explicitly set to `false`

### Handling 'lost' nodes

We've seen a very small number of instances where a node forgets what tab it is
on and its `z` property is set to `0` or `""` - causing the node to disappear
from the editor. We've never managed to recreate this issue to get to the bottom
of it - something to do with deleting flows. But with this release, the editor
will now help recover those lost nodes by added a 'recovery' tab to add them to.

[More details](https://github.com/node-red/node-red/pull/2691)

### Other editor features

 - Sidebar tabs can now be reordered ([details](https://github.com/node-red/node-red/pull/2655))
 - The palette manager has an option to upload a node module tgz file rather than install from the catalog. This can be disabled in the settings. ([details](https://github.com/node-red/node-red/pull/2682))
 - The ACE edit component has been updated to the latest version which brings much better support for ES6 JavaScript syntax
 - Fixes issues around copy/paste of nodes within groups causing lockups.
 - When merging groups, the style options of the first selected group is used for the combined group.

## Runtime features

### Splitting `.config.json` into multiple files

The runtime settings file, `.config.json` has been split in to four separate
files to better organise the content and allow the user to be more selective over
what they version control.

**If you have a backup script that includes `.config.json` you will need to update
it to backup these other files instead**.

The runtime will leave the existing `.config.json` in place in case you chose to
downgrade, but it will no longer be updated.

[More details](https://github.com/node-red/node-red/pull/2704)

### Introducing `RED.hooks` api

This is part of the pluggable message routing work that has been in our roadmap
for a long time now. It is less relevant to end users at this point in time,
but will underpin a lot of exciting features in the future, such as a proper
flow debugger, distributed node-red runtimes and integrated flow testing.

[More details](https://github.com/node-red/node-red/pull/2665)

## Node Features

 - The Trigger node can now be configured to set its delay/repeat-interval by `msg.delay`
 - The Function node's "setup" code can now log and send messages ([details](https://github.com/node-red/node-red/pull/2644))
 - More of the core nodes now implement the 'done' api so can be used with the Complete node - yaml, xml, json, html, http, template, range, link, status, catch , complete, inject. Work continues on the remaining nodes.
