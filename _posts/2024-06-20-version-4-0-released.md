---
layout: blog
title: Version 4.0 released
author: nick
image: /blog/content/images/2024/06/nr4-social.png
---

Node-RED 4.0 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

We've highlighted some of the main highlights of the release below. There have also been 
a large number of community contributions ranging from bug fixes, features, documentation and translations.
We wouldn't be able to do what we do without these contributions - a big thank you to everyone involved.

The [Change Log](https://github.com/node-red/node-red/releases/tag/4.0.0) has the full list of changes in
this release.

---
- [Node.js 18 or later](#nodejs-18-or-later)
- [Editor Updates](#editor-updates)
  - [Auto-complete for `flow`/`global` and `env` inputs](#auto-complete-for-flowglobal-and-env-inputs)
  - [Customising config nodes in Subflows](#customising-config-nodes-in-subflows)
  - [Timestamp formatting](#timestamp-formatting)
  - [Multiplayer Mode](#multiplayer-mode)
  - [Better background deploy handling](#better-background-deploy-handling)
  - [Improved Diff view for moved nodes](#improved-diff-view-for-moved-nodes)
  - [Better feedback for read-only users](#better-feedback-for-read-only-users)
  - [New Config Node selection UI](#new-config-node-selection-ui)
  - [Other updates](#other-updates)
- [Runtime](#runtime)
  - [Faster deploys for *large* flows](#faster-deploys-for-large-flows)
  - [Updated JSONata](#updated-jsonata)
  - [Other updates](#other-updates-1)
- [Node Updates](#node-updates)
  - [A better CSV node](#a-better-csv-node)
  - [Updated Proxy Handling](#updated-proxy-handling)
  - [Other updates](#other-updates-2)
- [Full Changelog](#full-changelog)
- [Community](#community)

---

## Node.js 18 or later

Node-RED 4.0 requires at least Node.js 18. At the time of release, we recommend
using Node 20 as the active LTS release that will continue receiving updates until
April 2026.


## Editor Updates

### Auto-complete for `flow`/`global` and `env` inputs

Node-RED already has simple auto-complete on `msg` fields in the editor. We've now extended that to also work with `flow`/`global` context inputs as well as the `env` type for accessing environment variables.

![](/blog/content/images/2024/06/auto-complete.png)

This makes it so much easier to work with these types of properties - being sure you're using something that exists rather than having to switch between different views in the editor to get the names right.

In the case of env vars, it also shows you where the value was set - useful when you have nested groups and subflows which might be overriding a particular value.

### Customising config nodes in Subflows

This one needs a bit of explaining. Subflows are a way Node-RED lets you create a flow and add multiple reusable instances of it within your flows. For example, a subflow may connect to an MQTT broker and do some standard processing on the messages it received before sending them on. The Subflow can then expose a set of properties that can be customised for each instance. In our example, that could be the topic the MQTT node subscribes to.

However, in that example, the MQTT node's broker configuration would be locked to the same broker config node in every instance - and that's something we're solving in Node-RED 4.0.

We're making it possible to expose the choice of a configuration node in the Subflow properties - so each instance can be customised even further.

![](/blog/content/images/2024/06/subflow-config.png)

Another common use for this will be with Node-RED Dashboard - which uses config nodes to set the location of a widget. With Node-RED today, you cannot really use dashboard nodes inside subflows as you end up with multiple copies of the widgets all packed into the same group. With this update, you'll be able to configure the subflow instance with exactly what dashboard group to place its contents into.

### Timestamp formatting

The Inject node has provided the ability to inject a timestamp since the very early days of Node-RED. The value it actually sets is the number of milliseconds since epoch (aka January 1st, 1970). If you're used to working with JavaScript, then this is a perfectly normal way to pass times around. However, it isn't always what is needed and flows end up using a Function node to reformat it in some way.

With 4.0 we've added options to pick what format the timestamp is generated in at the start. Now, formatting times and dates can be a big can of worms of options. So, for this initial release, we've kept it simple by offering three options:

![](/blog/content/images/2024/06/timestamp-formats.png)


 - *milliseconds since epoch* - the existing option, just more explicitly labelled for what it is
 - *YYYY-MM-DDTHH:mm:ss.sssZ* - also known as ISO 8601
 - *JavaScript Date Object* - the standard Date object

There is scope to allow custom format strings to be set in the node - but we'll see what the feedback is on these new options first.

### Multiplayer Mode

We've made a number of changes to improve the user experience when multiple people have the editor open at the same time.

When enabled via the settings file, the new Multiplayer Mode lets you see when other users have the editor open and where they are - which tab they have open and whether they are editing a node.

![](/blog/content/images/2024/06/multiplayer.png)

It's a small step forward towards a longer-term goal of having a live view of the changes other users are making.

This new mode is not enabled by default. To turn it on, you need to set `editorTheme.multiplayer.enabled` property to `true` in your settings file. We've added a placeholder in the default settings file, but for an existing install, you'll need to add it yourself. You can see how/what it should look like [here](https://github.com/node-red/node-red/blob/3075b82792be6f9668376e66fe6cf3fc137902ff/packages/node_modules/node-red/settings.js#L440-L443).

### Better background deploy handling

In the same theme as the new Multiplayer Mode, we've also made some improvements to the existing 'background deploy' handling in the editor. This is where someone deploys new flows whilst you are busy working in the editor.

Previously, you would get a notification that you couldn't ignore and would have to interrupt what you were doing to deal with. If your colleague was being particularly productive and deploying frequently, you'd get a new interruption every time.

With this release, we've made the notification less intrusive. It's no longer modal, so you can carry on what you were doing without having to take any action. We've made it slim line so it doesn't get in the way, and it will self-close after a short period. As with similar runtime notifications, we now also show a warning icon in the header if there has been a background deploy - as it *will* need dealing with eventually - clicking on that icon shows the notification so you can take action when you choose to.

![](/blog/content/images/2024/06/background-deploy.png)

### Improved Diff view for moved nodes

When reviewing changes in the flows, either as a result of a background deploy, or as part of the Projects feature, we now highlight nodes that have only been moved separately to those that have had configuration changes.

When faced with a long list of changes, this will make it easier to spot changes that you care about.

![](/blog/content/images/2024/06/diff-view.png)


### Better feedback for read-only users

Previously if a user had read-only access to the editor, they could make changes and click the deploy button - only to be told at that point they cannot make changes.

With this release, the Deploy button now shows a lock icon if the current user doesn't have permission to deploy changes. They can still make changes in the workspace, but the deploy button won't become enabled.

![](/blog/content/images/2024/06/locked-deploy.png)


### New Config Node selection UI

We've updated the UI around config node selection to simplify the task of adding a new config node.

Feedback from new users showed some confusion on how to add a *second* config node when there was one
already selected in the list. There is now a dedicated add button alongside the selection of existing nodes

![](/blog/content/images/2024/06/add-config-node.png)


### Other updates

 - The Palette Manager now lists plugins you have installed alongside nodes.
 - The Palette sidebar now remembers how you have expanded or collapsed the different categories

## Runtime

### Faster deploys for *large* flows

We've swapped the library we use to clone flow configurations in the runtime. The new library is faster and uses less memory.

The gains are less noticeable in 'typical' flows, but for those of you with *large* flows, there should be an improvement.

In my testing, a config with a few hundred tabs with a few hundred nodes on each, plus some subflows went from 8 seconds to deploy down to just over 1 second.


### Updated JSONata

The JSONata library is used to provide the `expression` types in Node-RED - a really powerful way of working with JSON objects. With this release we've updated to the new major release of JSONata that comes with a bunch of performance improvements.

But it also comes with a breaking change with how it gets invoked under the covers. We prepared for this in 3.1 by adding a large warning to the log if we ever spotted a node accessing it incorrectly. With this release, that warning becomes an error.

Given we didn't hear a lot of complaints in the 3.1 release about this, either the warning went unnoticed, or it isn't a wide-spread issue. However, this will be something to keep an eye on as you upgrade.


### Other updates

 - The following configuration options have been added to the default settings file:
   - `httpAdminCookieOptions` can be used to customise the options set on cookies as part of the authentication system.
   - `httpStaticCors` can be used to set custom cross-origin resource sharing rules for the content served up via the `httpStatic` option 
 - `node-red --version` now reports the node-red, node.js and os information without starting Node-RED.
 

## Node Updates

### A better CSV node

The CSV node has had a big overhaul to make it more standards compliant. It turns out CSV has a whole bunch of tricky edge cases that most users don't hit - but if you did hit them you would be stuck.

The new node follows the [RFC4180](https://www.ietf.org/rfc/rfc4180.txt) standard and is also faster - wins all around.

Existing flows using the CSV node will stay in 'legacy' mode until they are modified to use the new parser.

### Updated Proxy Handling

The HTTP Request node's handling of proxies has been updated to address a number of issues and to bring better support for the various standard environment variables used to configure proxies.

Details are in the [original issue](https://github.com/node-red/node-red/issues/3904) and the [pull request](https://github.com/node-red/node-red/pull/4616) that fixed it.


### Other updates

 - TCP node - when resetting, if no payload, stay disconnected @dceejay
 - HTML node: add option for collecting attributes and content ([#4513](https://github.com/node-red/node-red/pull/4513))
 - let split node specify property to split on, and join auto join correctly ([#4386](https://github.com/node-red/node-red/pull/4386))
 - Fix change node to return boolean if asked ([#4525](https://github.com/node-red/node-red/pull/4525))
 - Let msg.reset reset Tcp request node connection when in stay connected mode ([#4406](https://github.com/node-red/node-red/pull/4406))
 - Let debug node status msg length be settable via settings ([#4402](https://github.com/node-red/node-red/pull/4402))
 - Feat: Add ability to set headers for WebSocket client ([#4436](https://github.com/node-red/node-red/pull/4436))



## Full Changelog

The full set of changes in this release can be found in the [changelog](https://github.com/node-red/node-red/releases/tag/4.0.0)

Thank you to everyone who contributed to this release - we wouldn't be able to do it without you!

## Community

As an open-source project we are reliant on the contribution of the community.
We have a strong and vibrant user community, well demonstrated by the activity on the
[forums](https://discourse.nodered.org). It's great to see the support the community
provides each other.

If you're interested in contributing to Node-RED, now is a good time to come over
and chat with us in either the [forum](https://discourse.nodered.org) or [slack](https://nodered.org/slack).
