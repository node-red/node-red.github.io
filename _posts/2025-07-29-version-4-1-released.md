---
layout: blog
title: Version 4.1 released
author: nick
image: /blog/content/images/2025/07/nr41-social.png
---

Node-RED 4.1 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

The [Change Log](https://github.com/node-red/node-red/releases/tag/4.1.0) has the full list of changes in
this release.

Whilst we have your attention, we're already thinking about what comes next - and we're running a community survey over the next couple of weeks to help shape our future roadmap. Please give us 10 minutes of your time and share your thoughts. You can [take the survey here](https://survey.nodered.org).

---
 - [Update Notifications](#update-notifications)
 - [Node Documentation icon](#node-documentation-icon)
 - [Managing flow dependencies](#managing-flow-dependencies)
 - [Palette Manager Updates](#palette-manager-updates)
   - [Deprecated modules](#deprecated-modules)
   - [Sorting nodes by downloads](#sorting-nodes-by-downloads)
   - [Links to node docs](#links-to-node-docs)
   - [Better support for Plugins](#better-support-for-plugins)
   - [Event log widget](#event-log-widget)
 - [Other updates](#other-updates)
 - [Node Updates](#node-updates)
 - [Full Changelog](#full-changelog)
 - [Community](#community)

---



### Update Notifications

One of the first things you'll see when you start 4.1 is a request to enable update notifications. This enables a notification in the editor when there is a new version of Node-RED available. This ensures you can keep up to date with the latest fixes and features. In return, Node-RED sends back anonymous usage information to the project, covering information on what version of NR is being used and type of OS. No information about your users or flows is shared. More information on what is gathered, why and how it'll be used is available in the [documentation](https://nodered.org/docs/telemetry/).

Separately, it will also notify you when there are updates available for any of the nodes in your palette. This part of the notification is handled by the Palette Manager based on the node catalogues it downloads; as such, it is enabled by default.


![](/blog/content/images/2025/07/update-notification.png)


### Node Documentation icon

An often requested feature has finally made the cut; any node with documentation added in its 'Description' field of the edit dialog will now show the Info icon. Clicking on the icon will open up the edit dialog.

As before, when a node is selected, any content in its Description is shown in the Info sidebar

If you aren't a fan of the icon, you can turn it off in the Editor Settings dialog.

![](/blog/content/images/2025/07/node-docs.png)


### Managing flow dependencies

Whilst Node-RED makes it super simple to share flows via its import/export dialog, a common challenge has been not knowing what additional modules need to be installed for the flow to work.

With this release, when you export a flow, it now includes meta-data of which additional modules are used by the flow.

When importing the flow, if any of the node types aren't recognised, the editor can now use this information to let you know what needs to be installed.

Note: we chose not to automatically install the modules as it felt important that the user should be able to make that choice and not have things get installed without their knowledge.

![](/blog/content/images/2025/07/missing-modules.png)

This additional meta-data is held in a global-config node within the export. This is a node type that was introduced in Node-RED 4.0 - so you will still be able to import flows from 4.1 back to 4.0.

### Palette Manager Updates

The Palette Manager has had a number of small but powerful updates.

#### Deprecated modules

If a node module has been deprecated by its author on npm, or flagged as such on the flow library, it will now show a deprecated badge. This will be a sign to avoid the module unless you have a very specific need to use it.

The Flow Library has been updated to also show this information on the nodes page.

#### Sorting nodes by downloads

By default the list of nodes available to install are now sorted by download count. That helps to prioritise the more widely used and popular nodes.

#### Links to node docs

We've added links to a node's documentation on the Nodes tab (previously this was only on the Install tab)

#### Better support for Plugins

The list of installed modules now handles plugins better - particular those modules that contain a mix of plugins and nodes

#### Event log widget

When installing a node from the palette manager, it can sometimes take a while depending on where Node-RED is running and the size of the module being installed. If you close the palette manager, you then lose any feedback of the install still running.

We've had the Event Log view since the early days of Node-RED (menu -> view -> Event log) but I bet its something most users are unaware of.

With this release, if there is an install running in the background, a progress widget is shown in the editor footer. Clicking on it will open up the event log. Once the install completes, the widget will hide itself.

![](/blog/content/images/2025/07/event-widget.png)

### Other updates

There's a lot of other smaller items in the changelog, a few more to highlight:

 - Deploying when you have a badly configured node has alway asked for confirmation. The logic behind that will now ignore nodes that are disabled - as they won't impact the deployed flow.

 - A new action is available that will trigger the buttons of any selected nodes. This action (`core:trigger-selected-nodes-action`) can be found in the Action Menu (`Ctrl-Shift-P`), and can be bound to whatever keyboard shortcut you want.

 - Clicking outside of a Node's edit dialog will no longer close the dialog.

### Node Updates

Here's a list of the various updates made to the individual core nodes.

  - Complete/Status: Fix complete node to not feedback immediately connected nodes (#5114)
  - Function: Add URL/URLSearchParams to Function sandbox (#5159) 
  - Function: Add support for node: prefixed modules in function node (#5067) 
  - Function: Add globalFunction timeout (#4985) @vasuvanka
  - Exec: Make encoding handling consistent between stdout and err (#5158) 
  - Split: Let split node send original msg to complete node (#5113) 
  - Split: Rename Split The field (#5130) 
  - MQTT: Ensure generated mqtt clientId uses only valid chars (#5156) 
  - HTTP In: provide access to request body as Buffer
  - HTTP Request: Fix the capitisation for ALPN settings in http-request (#5105) 
  - HTTP Request: (docs) Recommend HTTPS over HTTP (#5141)
  - HTTP Request: Include URL query params in HTTP Digest (#5166) 
  - Catch: Add code to error object sent by Catch node (#5081) 
  - Debug: Improve debug display of error objects (#5079) 
  - Debug: Improve display of loooooong message properties



## Full Changelog

The full set of changes in this release can be found in the [changelog](https://github.com/node-red/node-red/releases/tag/4.1.0)

Thank you to everyone who contributed to this release - we wouldn't be able to do it without you!

## Community

As an open-source project we are reliant on the contribution of the community.
We have a strong and vibrant user community, well demonstrated by the activity on the
[forums](https://discourse.nodered.org). It's great to see the support the community
provides each other.

If you're interested in contributing to Node-RED, now is a good time to come over
and chat with us in either the [forum](https://discourse.nodered.org) or [slack](https://nodered.org/slack).
