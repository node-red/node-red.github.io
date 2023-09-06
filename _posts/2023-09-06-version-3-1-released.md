---
layout: blog
title: Version 3.1 released
author: nick
---

Node-RED 3.1 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

This release is a little overdue to say the least. We released the first beta
back in February - thinking it would be the only one we did. But one thing lead
to another and, four beta releases later, here we are finally with the full
release for everyone to enjoy.

These delays have had a knock-on effect to our [release plan](https://nodered.org/about/releases/).
We're going to shift things around a bit, but still plan to have Node-RED 4.0 released
in the near future to keep up to date with Node.js versions reaching their end-of-life.

We'll also get back to more regular maintenance releases to keep things moving.

With all that said, and without our usual accompanying video, lets dig into what
3.1 has to offer. As ever, the [Change Log](https://github.com/node-red/node-red/releases/tag/3.1.0) has the full list of changes in
this release.


---
- [Editor Updates](#editor-updates)
   - [Change notifications on tabs](#change-notifications-on-tabs)
   - [A bigger workspace](#a-bigger-workspace)
   - [Locking Flows](#locking-flows)
   - [Hiding Flows](#hiding-flows)
   - [New Group User Experience](#new-group-user-experience)
   - [Group-level scope for the Catch/Status](#group-level-scope-for-the-catchstatus)
   - [Updated Context Menu](#updated-context-menu)
   - [Adding images to node/flow descriptions](#adding-images-to-nodeflow-descriptions)
   - [Mermaid Diagrams](#mermaid-diagrams)
   - [Global Environment Variables](#global-environment-variables)
   - [New subflow environment variables](#new-subflow-environment-variables)
   - [Changes to how Environment Variables are evaluated](#changes-to-how-environment-variables-are-evaluated)
   - [Linking to Node Help](#linking-to-node-help)
   - [Deprecating synchronous access to JSONata](#deprecating-synchronous-access-to-jsonata)
   - [Improved wiring for horizontally aligned nodes](#improved-wiring-for-horizontally-aligned-nodes)
 - [Runtime Updates](#runtime-updates)
   - [Individual http middleware for httpStatic routes](#individual-http-middleware-for-httpstatic-routes)
 - [What's next?](#whats-next)

---

## Editor Updates

### Change notifications on tabs

The tab bar now shows a change icon for any tabs that contain changes. This makes it much easier to find where things have changed in your flows.

![](/blog/content/images/2023/09/tab-changes.png)

### A bigger workspace

We have occasionally had requests to make the tab canvas bigger. There was even a discussion around making it infinitely large - allowing a flow to be as large as it needs to be. Whilst that's a nice idea, for this release we've simply increased the size of each tab from 5000x5000 to 8000x8000.

We'd still recommend using tools like Subflows and Link nodes to help organise your flows, but at least this quick change will give you plenty more space to use if you need it.


### Locking Flows

You can now lock a flow (tab in the editor) to prevent it from being modified. Whilst locked you cannot edit the nodes, add new nodes, modify the wiring... anything.

Why is that useful? You may have a 'mission critical' flow that you want to be super careful not to change by accident. You may want to collaborate on some flows with others, but mark some of them as 'off limits'.

With this release anyone is able to lock and unlock flows, but it lays the ground work for a possible future where particular users may not have permission to unlock flows - allowing them to only edit the flows they are allowed to.

The options to lock/unlock flows are available in the right-click context menu - as well as a new padlock button in the Info sidebar explorer.

![](/blog/content/images/2023/09/locking-flows-01.png)

![](/blog/content/images/2023/09/locking-flows-02.png)


To make this work, we've modified how 'nodes' are managed inside the editor to prevent them being modified on locked flows. No apis have changed, but it does mean certain calls might fail if they are attempted on a locked flow. This has had a fair amount of testing across all of the core features of the editor, but 3rd party node authors are a creative bunch and it is possible someone is doing something ~~sneaky~~ unexpected with their node implementation that gets tripped up by this. So if you see any odd/inconsistent behaviour with this feature, please do let us know (and definitely have ready any error messages from the browser's JavaScript console).

### Hiding Flows

We added the ability to hide flows a couple releases ago. This was done use the 'eye' icon that appeared when you hovered over the tab.

We got plenty of feedback, including our own experience, that it was way too easy to accidentally click that button and make things disappear without realising it.

So for this release we've gotten rid of that button on the tab. Flows can still be hidden, but you do so via the context menu option when you right-click on the tab bar. You can still use the eye button in the Info sidebar explorer.

### New Group User Experience

Following feedback from the community on what it was like to work with the groups feature in the editor, they have been given a big overhaul in this release.

You can now click on any node, inside or outside of a group, and interact with it directly. No more clicking multiple times to get to a node.

Because of that change, you now move a group by clicking on its border and dragging it. But what if you've made the border invisible? It now highlights whenever you mouse over it.

We've also made it possible to drag multiple nodes into a group in one go - previously we only supported dragging one node in at a time.

And in response to a particular piece of feedback, if you hold down `alt` whilst dragging a selection of nodes inside a group, you can drag them **out** of the group.

Overall, this should make for a much for intuitive user experience.

### Group-level scope for the Catch/Status

The Catch/Status nodes could already be configured to handle specific nodes within a flow. They can now also be configured to handle just the nodes in the same group as them (or any nested groups).

This gives you more options for organising your flows and their error handling.


### Updated Context Menu

We've expanded the usefulness of the Context Menu added in the last release. There are now lots more commonly used options available in the menu, which also provides better options related to what you clicked on to open the menu. This includes right-clicking on the tab bar at the top of the workspace to get flow-specific options.

![](/blog/content/images/2023/09/context-menu-01.png)

### Adding images to node/flow descriptions

All nodes and flows have a Description tab in their edit dialog. This lets you write docs (using markdown) that gets displayed in the Info sidebar when the thing is selected.

With this release you can now drag images directly into the markdown editor and they will get inlined. This is done by base64 url encoding the image directly into the description property.

### Mermaid Diagrams

We've also added support for [Mermaid](https://github.com/mermaid-js/mermaid) diagrams. These are diagrams that can be defined directly in the markdown and then rendered out as images when displaying in the sidebar. GitHub recently added support for them, and I've found them to be super-useful when documenting things when plain text isn't quite enough.

![](/blog/content/images/2023/09/mermaid.png)

### Global Environment Variables

We've supported defining environment variables scoped to individual flows, subflows or groups for a while. But the only way to define an environment variable available to all flows was to do it via your settings file. That wasn't very accessible or portable.

So with this release you can now define global env vars via the User Settings dialog:

![](/blog/content/images/2023/09/global-env-vars.png)

Under the covers these get added to your flow as a new core configuration node type. That will mean importing a flow from 3.1 with global env vars into an earlier version of Node-RED will lead to an unrecognised node warning - something to be aware of.

### New subflow environment variables

Within a subflow, you can now use `NR_SUBFLOW_NAME` `NR_SUBFLOW_ID` and `NR_SUBFLOW_PATH` to access those properties of the subflow instance node.

These join the existing `NR_NODE_*`/`NR_FLOW_*` and `NR_GROUP_*` equivalents.

### Changes to how Environment Variables are evaluated

Environment variables are statically defined values that cannot be changed whilst the flow is running. There were some edge cases to this, such as using a JSONata expression of `$now()` that would get re-evaluated every time it was referenced.

Because of the need to make JSONata fully asynchronous in the future, we've changed how the env var evaluation is done - their values are now all generated when the flows start and not re-evaluated again.

This should not cause any changes in behaviour, unless you were relying on the `$now()` trick that was not an intentional behaviour.

As nodes can depend on env var values, we've also updated the logic around the 'modified nodes' and 'modified flows' types of deploys. Changing an env var at the flow level will now cause all of the nodes on that flow to be considered modified. This is a bit of a blunt solution for this release and we may refine it to be more selective to only the nodes that reference the changed env var - but that's for another day.


### Linking to Node Help

Every node dialog now has a help button in its footer. This will open the Help sidebar and display the... you guessed it... help for the node.

![](/blog/content/images/2023/09/node-help-link.png)

### Deprecating synchronous access to JSONata

This is one for node authors rather than end users.

JSONata 2.0 was recently published and promises a lot of significant performance improvements. However it brings a major breaking change - you can no longer evaluate expressions synchronously. So we can't upgrade to it quite yet, but we can lay some ground work for it.

Since we introduced JSONata into Node-RED, we've provided a set of standard APIs for nodes to use. Notably:
 - `RED.util.evaluateNodeProperty` - used to evaluate all sorts of standard types of property
 - `RED.util.evaluateJSONataExpression` - used to evaluate a prepared JSONata expression

Both of these functions accept an optional callback parameter which allows them to evaluate asynchronously - however they both also allow synchronous behaviour.

With this release we have *deprecated* calling `evaluateJSONataExpression` without a callback argument. By extension, `evaluateNodeProperty` will require a callback *if* being used with JSONata.

Using these APIs without a callback will trigger a warning in the log, along with a full stacktrace that will hopefully help identify the node that caused it.

Our intention is to update to JSONata 2.0 in Node-RED 4.0 this summer - so we want to flush out any nodes that need updating.

### Improved wiring for horizontally aligned nodes

Following [this](https://discourse.nodered.org/t/feature-request-little-tweak-on-wires/79336) discussion on the forum, we've made some modifications to the wiring layout logic to improve cases where wires loop back on horizontally laid out nodes.

Here is a before/after pair of screenshots:

<p>
  <img width="40%" src="/blog/content/images/2023/09/node-wiring-01.png" alt="">
  <img width="40%" src="/blog/content/images/2023/09/node-wiring-02.png" alt="">
</p>

## Runtime Updates

### Individual http middleware for httpStatic routes

It is now possible to configure separate middleware functions for different `httpStatic` configured routes. 

See [#4229](https://github.com/node-red/node-red/pull/4229) for the details.



## What's next?

As I mentioned at the start, this release is overdue and has pushed back the existing
release plan.

With Node.js 16.x reaching its end-of-life *next week*, we'll be moving forward with
Node-RED 4.0 in the near future. As it stands, we strongly recommend users to be
using Node 18 or 20 by now.

As an open-source project we are reliant on the contribution of the community.
We have a strong and vibrant user community, well demonstrated by the activity on the
[forums](https://discourse.nodered.org). It's great to see the support the community
provides each other.

If you're interested in contributing to Node-RED, now is a good time to come over
and chat with us in either the [forum](https://discourse.nodered.org) or [slack](https://nodered.org/slack).
