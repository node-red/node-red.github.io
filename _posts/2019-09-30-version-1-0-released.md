---
layout: blog
title: Version 1.0 released
author: nick
---

We published the roadmap to get us to this point two years ago. It may have
taken longer than we anticipated, but the time has arrived for us to release
Node-RED 1.0.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/nIVBZQi18fQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This release has been a long time coming, and gives us a stable base to build upon.
It is an opportunity to reflect on not only how much we've achieved with the project,
but also how much there is still to do. The backlog contains a long list of
features and improvements for us to work on in as we plot a course to 2.0.

A big thank you to everyone in the community who have contributed to this release.
Whether through code, documentation, ideas or feedback, it all helps to keep the
project moving in the right direction.

If you are new to Node-RED or wanted a refresher of the basics, we've also published a new
video series to introduce the essentials of Node-RED. There's lots more to add,
but there's plenty to get you started.

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PLyNBB9VCLmo1hyO-4fIZ08gqFcXBkHy-6" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

 - [Asynchonous message passing](#asynchronous-message-passing)
 - [Node Send API](#node-send-api)
 - [Cloning messages](#cloning-messages)
 - [Reorganised palette](#reorganised-palette)
 - [Removed nodes](#removed-nodes)
 - [Subflow Instance property UI](#subflow-instance-property-ui)
 - [Action List](#action-list)
 - [Visual JSON Editor](#visual-json-editor)
 - [New wiring tricks](#new-wiring-tricks)
 - [More search results](#more-search-results)
 - [New Import/Export dialogs](#new-importexport-dialogs)
 - [Context Sidebar auto-refresh](#context-sidebar-auto-refresh)
 - [Picking your language](#picking-your-language)
 - [Editor CSS restructuring](#editor-css-restructuring)
 - [Editor dependencies](#editor-dependencies)
 - [Node updates](#node-updates)
 - [New Docker Images](#new-docker-images)
 - [Flow Library Update](#flow-library-update)


---

As this release brings a major version number bump, it includes some changes
that you need to be aware of before upgrading.

### Asynchronous message passing

This release changes the message passing between nodes to be always asynchronous
rather than it being sometimes asynchronous and sometimes synchronous depending
on the implementation of individual nodes.

This will, in some cases, change the relative ordering of messages when a flow
branches.

For more details on this change, read [this blog post](https://nodered.org/blog/2019/08/16/going-async).

### Node Send API

Nodes now have a new API available for how they handle messages in the runtime.
This API allows them to tell the runtime when they have finished with a message.

This will help the runtime to track nodes as they flow through the system - enabling
future features such as automatic timeouts of nodes.

To go along with this change, we've introduced a new Complete node. This node
can be targeted at another node, like the Catch node, and it will be triggered when
the targeted node finishes handling a message.

This will only work for nodes that are updated to the new API.

[This blog post](https://nodered.org/blog/2019/09/20/node-done) details the new
style API. The documentation has also been updated.

### Cloning messages

A knock-on effect of the async messaging change is a change to how the Function
node clones messages. It used to avoid cloning messages if it could, but this
led to hard to detect issues once the async message change was introduced.

So now the Function node will also clone all of the messages you pass to
 `node.send()`.

If you have a flow that depends on the message not being cloned, you'll need to
update your flow to request the runtime not to do the cloning.

For more details on this, read [this blog post](https://nodered.org/blog/2019/09/13/cloning-messages).


### Editor Features

The editor has a number of new features worth highlighting:

#### Reorganised palette

We've reorganised the palette to give what we believe is a better order to the nodes.

The categories are now:
 - *common* - the basic building block nodes: Inject, Debug, Catch, Status, Links, Comment.
 - *function* - the main function nodes: Function, Switch, Change, Template, Exec, Delay, Trigger, Range
 - *network* - nodes that do things over the network. This means the HTTP In and HTTP Response node are now sat next to each other and not split across different categories - likewise the MQTT, TCP and UDP nodes.
 - *sequence* - the nodes for working with message sequences: Split, Join, Sort and Batch.
 - *parser* - the nodes for working with particular data formats: CSV, HTML, JSON, XML and YAML.
 - *storage* - the file nodes.

#### Removed nodes

 **We have removed some nodes from the default palette.**

The **Twitter**, **Email**, **Feedparser**, **Sentiment** and **Pi GPIO** nodes are no longer installed  as dependencies of the `node-red` module. They have all been in their own npm modules for a long time, but you will need to explicitly add them back if you are using them.

If you install on the Raspberry Pi using our script, then the GPIO nodes will already
 have been reinstalled for you.


#### Subflow Instance property UI

In 0.20 we added the ability for a Subflow Template to define a set of environment variables and for individual instances of the subflow to override their values.

With this release, when you define the env vars of a subflow you can also define a custom UI for how the env var should be presented in the instance node.

For example, you may want to have a boolean flag in the subflow to toggle a piece of behaviour per instance. Rather than a free-form text field in the instance node to set the flag you can configure it to show a checkbox.

You can also now customise the colour of a Subflow node.


#### Action List

A lot of the things you can do in the editor are defined as 'actions'. The actions can have keyboard shortcuts assigned in the settings dialog. We provide default shortcuts to lots of the actions, but not all.

This beta introduces the new Action List. This provides a way to browser and trigger any action.

You can open the action list from the `View->Action List` menu item, or use the shortcut `Ctrl-Shift-P`

Speaking of keyboard shortcuts, we've added some new defaults.

 - `Cmd/Ctrl-Y` : redo the last edit that was undone with `Cmd/Ctrl-z`
 - `Cmd/Ctrl-Alt-L` : clear the debug sidebar of messages
 - `Cmd/Ctrl-d` : Deploy your flows

#### Visual JSON Editor

The JSON editor now provides a visual mode where you edit JSON without worrying about getting all the quotes in the right place.

#### New wiring tricks

In 0.20, Ctrl-clicking in the workspace opens the quick-add dialog. Now, if you ctrl-click on a wire the quick-add dialog is shown and whatever you add will be spliced into the wire you clicked on.

#### More search results

The search dialog (`Ctrl-f`) only ever returned the first 25 results. This was a problem for some users when using it to browse their hundreds of tabs. The dialog can now show all of the results - albeit 25 at a time.

#### New Import/Export dialogs

The clipboard dialogs have been combined with the library import/export dialogs to give a more consistent experience around importing and exporting flows.

The individual type libraries (for example, in the Function node) have also been updated to a matching style.

#### Context Sidebar auto-refresh

The Context sidebar now has options to toggle on or off the auto-refreshing of its contents as you change selection in the editor.

#### Picking your language

There is a new option under the user settings dialog to pick what language the editor is presented in. By default it will use the browser's preferred language, but you can override that to use one of the languages we provide: English, Japanese, Chinese, Korean or German.

If you want to help provide translations in other languages then get in touch!

#### Editor CSS restructuring

We have completely overhauled the internal styling of the editor to give it a much
more consistent CSS structure.

*This is probably the largest breaking change we've ever made in the history of Node-RED. It is the sort of change we could only do with a major version bump.*

**This will break**:
 - any custom themes that people have created for Node-RED.
 - any nodes that customized their appearance in the editor beyond what we have provided APIs for.

There's no easy way around that. You will want to disable your custom theme before trying this beta for the first time.

If you are using the wonderful `node-red-contrib-theme-midnight-red`, then there is already
a [1.0 ready version available](https://github.com/bonanitech/node-red-contrib-theme-midnight-red).

Pretty much every single CSS class and DOM ID used by the editor has been changed. The classes and ids we were using reflected 5 years of incremental development, including things dating back to the very first day I started creating Node-RED.

They have served us well this far, but were, frankly, an inconsistent mess for anyone who wanted to create a custom theme, or to try to embed the editor in their own page.

So this release brings a much more consistent naming scheme for all of these things. We avoid setting any global styles to the page, instead applying them only to things within the editor components.

We have also structured the css to make it *much* easier to create custom colour schemes for the editor. We also provide a script to do a lot of the work for you in generating a custom theme. If you're interested, come chat to us on slack.

A pretty much complete list of these changes is available [here](https://docs.google.com/spreadsheets/d/1l-apmuM1mpUfvd2gUR__KD4SVkrkDJgsC8y0zyKk_bs/edit#gid=0).

#### Editor dependencies

We've finally updated the versions of jQuery and jQuery-UI to their latest - 3.4.1 and 1.12.1 respectively. As jQuery 3.x removes a bunch of deprecated APIs that we were previously depending on, we've also included jquery-migrate that keeps things working for now. That has the added benefit of recording any usage of the deprecated APIs so we can start spotting contrib nodes that need to be updated.

Whilst we say hello to the latest version of jQuery, we also say goodbye to Bootstrap. We used the Bootstrap theme in the very early days of the editor and have been slowly weaning ourselves off it. With this release, the last remnants of bootstrap css and JavaScript have been removed.


### Node updates

There have been a small number of bugs fixes and enhancements to the core nodes.

 - The **CSV** node now has an option to turn off its smart detection of number values and to leave them as strings. It turned out it was being a bit too smart for certain edge cases.
 - The **Template** node *finally* has an option to expand the edit box to a full screen editor, much like the Function node has had for a while.
 - It is now easier to pick which nodes the **Catch** and **Status** nodes target. Rather than having to just pick from a long list of nodes, you can now switch back to the workspace and click on the nodes you want.
 - The **MQTT** node now defaults to 3.1.1, rather than the older 3.1 version of the protocol. We don't have MQTTv5 support yet, but there's a PR waiting to be reviewed for that, so keep an eye out for it in the next release.
 - The **Switch** node has a new "has key" rule to check if an Object contains a given property regardless of its value.
 - The **HTTP Request** node now lets you set keep-alive options, so connections can be reused.


### New Docker Images

The Docker images have had a very large overhaul. We now produce images for
multiple architectures and have moved to the `node:XX-alpine` base images.

With this change, the name of the images has changed to `nodered/node-red`. We no
longer publish updates to `nodered/node-red-docker`.

Check the [Node-RED Docker readme](https://github.com/node-red/node-red-docker/blob/master/README.md) for more details.


### Flow Library Update

Along side this release, we've also given the [Flow Library](https://flows.nodered.org)
a big update.

Aside from a new look, we've added the ability to rate flows, just as you could
rate nodes before. We've also introduced the idea of Collections; groups of nodes
and flows that anyone can create.

Some of the collections that have already been created include:
 - [Extra nodes for Node-RED Dashboard](https://flows.nodered.org/collection/590bc13ff3a5f005c7d2189bbb563976)
 - [Nodes and flows that help schedule tasks](https://flows.nodered.org/collection/c8156f6276976bfb518d1e60442e01e2)
 - [Nodes that help with routing messages](https://flows.nodered.org/collection/B1C6pe3gKjH9)

This is a great way for the community to help curate all of the great content in
the library.
