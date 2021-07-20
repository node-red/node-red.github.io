---
layout: blog
title: Version 2.0 released
author: nick
---

Node-RED 2.0 is now available to [install](https://npmjs.org/package/node-red). If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

The [Change Log](https://github.com/node-red/node-red/blob/859c0c7f6c7b4692b54f0da97737c1f88fe7973c/CHANGELOG.md) has the full list of changes in this release, but here are the highlights.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/eTEbqZcumz4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---
- [Node.js 12 or later required](#nodejs-12-or-later-required)
- [Runtime Features](#runtime-features)
  - [`node-red admin init` command](#node-red-admin-init-command)
  - [Restructured default settings file](#restructured-default-settings-file)
  - [Default flows file name](#default-flows-file-name)
- [Editor Features](#editor-features)
  - [Monaco Text Editor](#monaco-text-editor)
  - [CSS Theme Variables](#css-theme-variables)
- [Node updates](#node-updates)
  - [Function external module changes](#function-external-module-changes)
  - [Inject node quick inject button](#inject-node-quick-inject-button)
  - [Renamed `RBE` node to `Filter` node](#renamed-rbe-node-to-filter-node)
  - [Removed `tail` node](#removed-tail-node)
  - [Other node updates](#other-node-updates)
- [Extending the Developer Experience](#improving-the-developer-experience)
  - [Flow Debugger](#flow-debugger)
  - [Flow Linter - nrlint](#flow-linter---nrlint)
- [What's next](#whats-next)


The main focus of this release has been dropping support for old versions of Node.js that are themselves no longer supported. This in turn has allowed us to make some major dependency updates internally. This has required time and effort to do properly. As such, there are not a lot of big new features in this release - but there are certainly plenty of useful things to play with.

We're also releasing the first versions of the Node-RED Flow Debugger and Linter. These are optional plugins that really step up the developer experience within the Node-RED editor. Before we get to them, lets look at what's new in the Node-RED core.

## Node.js 12.17.x or later required

Node-RED 2.0 does *not* support anything earlier than Node.js 12.17.x.

## Runtime Features

### `node-red admin init` command

We've added a new command-line option to `node-red` to help you generate a settings file.

It asks you a series of questions about how you want to configure your Node-RED environment, such as setting up user security.

This makes it much easier to get started with a well configured, secure Node-RED environment.

You can run it using the `node-red admin` command:

    node-red admin init

[More details](https://github.com/node-red/node-red-admin/pull/15)

### Restructured default settings file

Along with the new `node-red admin init` command, we've reorganised the default settings file. The settings are now in a better order, with clearer sections to help users navigate.

You can see the new default settings file [here](https://github.com/node-red/node-red/blob/859c0c7f6c7b4692b54f0da97737c1f88fe7973c/packages/node_modules/node-red/settings.js).

### Default flows file name

We've updated the default settings file to hardcode the flow file name to `flows.json`. Previously we left it unset, so the runtime would use the hostname to generate the flow file name. That would catch people out when moving between networks. As this is a change to the default settings file, all existing installs will continue to behave as they did before.

## Editor Features

### Monaco Text Editor

We now have optional support for the Monaco text editor. This gives a much richer code editing experience in the Function node and elsewhere.

For now, Node-RED will still use the ACE editor by default. To enable Monaco you need to edit the `editorTheme` section of your settings file to include a `codeEditor` section like this:

```javascript
editorTheme: {
    codeEditor: {
        lib: "monaco"
    }
},
```

We tested this editor against a lot of the more commonly used nodes to ensure they work with Monaco, but it is possible there are contrib nodes out there that assume the editor uses ACE. If you hit any problems, please let us know so we can raise with the module owner.

![](/blog/content/images/2021/07/monaco.png)

### CSS Theme Variables

To make it easier for nodes/plugins to style their UI elements so they honour any custom theme applied, we've added a selection of CSS Variables they can use to pick-up theme colours.

[More details](https://github.com/node-red/node-red/pull/2994/files#diff-efdd418ee8906527e53e0216a513903eb0f5376046f0127f15048b5d65123089)

## Node updates

### Function external module changes

In the last release, we made it easier for the Function node to use external modules. Once enabled in your settings file, you could then configure what modules the Function node used in its edit dialog.

Based on feedback on the feature we've made the following changes in this release:

 - The feature is now **enabled by default** for new installs. To disable it you will need to set `functionExternalModules` to `false`.

 - The UI has been reworked to give a cleaner list of the modules and what variable they will be available as.

 - We now support both **CJS modules** and **ES6 modules**.

 - We have moved the directory the modules are install in back to the top-level of your user directory. This means there is a single `package.json` that lists all of your dependencies. The first time you run 2.0, it will automatically reinstall any external modules in the new location.


![](/blog/content/images/2021/07/function-modules.png)

### Inject node quick inject button

The Inject node has a new button in its edit dialog that will trigger the Inject node with the values from the edit dialog, rather than the values currently deployed. That makes it much easier to quickly inject different values whilst testing a flow.

Note the button in the main flow view will still inject the current deployed values as it always has.

![](/blog/content/images/2021/07/inject-button.png)


### Renamed `RBE` node to `Filter` node

The RBE (Report By Exception) node is one of the hidden gems of the palette. Given how many times its the answer to a question on the forum, it's clear we needed to make it more discoverable. With this release we have done two things:

  - added it to the core palette (it was previously installed via the `node-red-node-rbe` module)
  - rebranded it the `filter` node.

Under the covers it still uses the `rbe` node type, so existing flows will not be affected. Also that means it will still show up if you search for `rbe` - so users following existing guides will still find it.

Giving it the name `filter` should help users find it and more instinctively understand what it is for. It also opens up the option of adding more filtering options in the future that wouldn't have fitted under the 'RBE' name.

### Removed `tail` node

We have removed `node-red-node-tail` as a default dependency. This means you may need to manually install that module to get the node back if your flows use it.


### Other node updates

 - A new settings is available, `fileWorkingDirectory` that can be used to define the working directory used by the File nodes to resolve relative paths. If the setting isn't provided, the nodes will do what they did before - use the current working directory of the Node-RED process.
 - When in rate-limiting mode, the Delay node can now dynamically set its rate using `msg.rate`.
 - The TLS node now allows you to specify an ALPN protocol
 - Debug sidebar supports displaying Map/Set type properties
 - The File In node has a new option to include all properties when sending a message per line
 - The Exec node has a new option to hide the console window when running under Windows
 - The Delay node can now be told to flush a set number of queued messages using `msg.flush`
 - The WebSocket client node can be configured to send a heartbeat ping message automatically


## Extending the developer experience

One of the benefits of low-code programming with tools like Node-RED, is it abstracts away a lot of the technical detail of how things are working. It allows you to focus on solving the problem at hand.

But just because it's low-code, that doesn't mean you can't have the tools you need to make high quality applications and to help debug when things aren't going as they should.

To that end, we're also releasing a pair of new plugins for Node-RED that will bring a step-change to the overall developer experience.

### Flow Debugger

First up is a Flow Debugger. This acts like regular code debuggers, but at the flow level. You can set breakpoints on node ports, either inputs or outputs. Then, whenever a message arrives at a breakpoint, it pauses either at that node, or the entire runtime.

Once paused, it then shows you how many messages are queued up at each point in the flow and in the sidebar you can see the queue of messages in the order they will be processed. From there, you can step each message through the flow, or even delete it mid-flow.

For more information, you can find the [plugin page here](https://github.com/node-red/node-red-debugger).

### Flow Linter - nrlint

The second plugin we've released is the Flow Linter - nrlint. This can be used to identify potential problems in the flow based on a large set of rules the linter provides. For example, it can warn if you have HTTP In nodes that aren't connected to HTTP Response nodes. Or if you have nodes that are physically overlapping and potentially obscuring each other.

We've modelled the linter after [eslint](https://eslint.org) which we also bundle in one of the rules that can be used to lint the JavaScript in your Function nodes.

We've designed the linter to run in the browser using a Worker thread - meaning it doesn't impact the performance of the editor. The sidebar shows you the linter results and lets you quickly navigate to the areas of the flow that need attention.

Outside of the editor, nrlint can also be installed and run as a command-line tool against flow json files. This means it can be used to validate flows in build pipelines.

Today we have a minimal set of rules and a recent call for input from the community has generated a long list of great ideas.

We're sure there will be some slightly more esoteric rules that perhaps don't belong in the core set. For example, some third party nodes may want to introduce guidance about how their nodes are used. So to support that, the linter rules are pluggable - allowing custom rules to be created and shared with the community via npm.

For more information, you can find the [plugin page here](https://github.com/node-red/nrlint).

## What's next?

The release plan we published last year had targeted 2.0 to be released at the end of April and for subsequent milestone releases to happen every 3 months after that. Given we're already three months beyond that April target, we need to look again at our release planning.

The 2.0 release has been somewhat unique. It's our first major version bump that has unblocked a number of internal changes as we no longer have to worry about old versions of Node.js. But it has taken longer than expected to sort out those internal changes, including a couple upstream issues that blocked progress for a while.

We really want to get back to a regular release cadence - having a predictable release date that is well known and we all work towards. That's something we'll be figuring out as we move forward. But today, we reset the clock and shift our attention to 2.1 that will be released in late October.

If there's a particular feature you're interested in seeing in Node-RED, then *now* is the time to jump into the [forum](https://discourse.nodered.org) and share your feedback.

As for the 1.x stream, it is now in maintenance mode. That means we will still do maintenance releases as and when needed if there are bugs reported and fixes available.

For the contributors out there, we'll be shuffling around our code branches in github to reflect the different streams we now have - we'll share more details via the [#core-dev channel in slack](https://nodered.org/slack), so do come say hello if you're interested.
