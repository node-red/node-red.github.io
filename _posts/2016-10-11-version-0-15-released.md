---
layout: blog
title: Version 0.15 released
author: nick
---

Node-RED 0.15 is now available to [download](https://github.com/node-red/node-red/releases/download/0.15.0/node-red-0.15.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

If you are using the pre-installed version on Raspberry Pi Jessie, the repositories will be updated in the near future.

---

### Editor Updates


#### Palette editor

It's now possible to manage your palette from within the editor. This lets you
browse a catalogue of all available nodes and install any of them without having to
restart Node-RED.

![](/blog/content/images/2016/10/palette-editor.gif)

Under the covers, this triggers an npm install of the node module into your user
directory - by default, `$HOME/.node-red`. Note that if the node has any dependencies
beyond the standard npm dependencies, you'll need to resolve them manually. It also
requires you to have `npm` installed, which, if you're using the Raspberry Pi
preinstall image, you may not have - check [the docs](http://nodered.org/docs/hardware/raspberrypi.html#adding-nodes) for how to get it.


#### Scrollable tabs

Having let you reorder your workspace tabs in the last release, we knew there was
more to be done. A common complaint was how the editor handled flows with lots of tabs;
we would squeeze them all into the view making it virtually impossible to jump to the
right tab first time. It also made the Flows menu unusable as to grew beyond the bottom
of the page.

With this release, we now behave much more sensibly and allow the tab bar to scroll
so the tabs never become too small. That ensures their labels are always legible.
We've also removed the list of tabs from the Flows menu.

![](/blog/content/images/2016/10/scrolling-tabs.gif)



But wait a minute, I hear you say, how can you quickly navigate between tabs if
they are now scrolled off screen and there's no menu entry? Well, I reply, you
want to see the new search box...


#### Search box

We've added a search box that makes it easy to quickly find any tab or node. You
can access it from the 'Search flows' option in the menu, or simply hit `Ctrl+.` (`Cmd+.` on Mac). As you type, it shows a list of possible matches, either click
on the one you want, or use the cursor keys and hit enter.

If you select a flow or subflow, it will switch to the appropriate tab. If you pick
a node in the flow, it switches to the appropriate tab, scrolls to ensure the node
is visible and flashes its border so you can spot it. If you pick a configuration node,
it will reveal it in the config node sidebar.

![](/blog/content/images/2016/10/flow-search.gif)

#### Import/Export improvements

The Import and Export dialogs have had a few small updates. When importing a flow,
you can now choose to have it import into a new flow rather than the current one.

The export dialog gives you more options on what gets exported - whether the selected
nodes, the current flow or all flows. You can also pick if the export should be
prettified or minified.

 ![](/blog/content/images/2016/10/import-dialog.png)
 ![](/blog/content/images/2016/10/export-dialog.png)

A couple of other new features on import:

 - we avoid duplicating subflows if you import one you already have in the palette
 - you can now include credentials in the flow json you import


#### Other things

- As you switch between flows, we update the url in the browser so you can link
straight into a particular flow or subflow:

    ![](/blog/content/images/2016/10/flow-url.png)


- We've changed the default scope of new config nodes. When we introduced the idea
of scoping config nodes to a particular flow we defaulted to the current flow you're
on. This has caused quite a bit of confusion as user's don't necessary understand
what the scoping is doing and end up creating identical config nodes on each tab.
With this release, we now set config nodes to be global by default.


### Runtime Updates

#### Encrypting credentials

We've always taken care to ensure any credential properties are not stored in the
main flow file and put them in a dedicated credentials file. This means the main
flow file can be version controlled without fear of leaking anything sensitive.
However we can't avoid the fact that credentials really need to be kept in sync
with the flows and only version controlling one doesn't make sense.

As we're building up to adding version control support to Node-RED, we needed to
do something to protect the credentials whilst enabling them to be version controlled.

As such, we now encrypt the credentials by default. This will mean you can no
longer hand-edit the credentials file unless you choose to explicitly disable
encryption. The exact details of how we do this are on the wiki [here](https://github.com/node-red/node-red/wiki/Design%3A-Encryption-of-credentials).


#### Preventing overwrite protection

In anticipation of version control support, the `/flows` admin api has been updated
to include a revision identifier along with the flows.
When you hit the deploy button, the editor can now check if the flows in the runtime
are those it loaded originally. Why is that useful? It means if someone deploys some
changes whilst you're still working on yours, the editor will warn you when you
come to deploy. In this release, we give you the option to deploy anyway (over-writing
whatever changes had been made), or cancel the deploy.

We've already started work on being able to see what changes have been made so you
can merge them into your changes before deploying, but it didn't make the cut for
this release.

As the changes to `/flows` are not backward compatible, we've added a new custom
HTTP header to identify what version of the API should be used. That means any existing
use of the `/flows` api will continue to work, but can easily opt-in to the new
behaviour. The documentation for this new api will get updated later this week.

### Node 0.10

Finally, we need to talk about Node.js 0.10. At the [end of this month](https://github.com/nodejs/LTS/blob/75bd36a060be3b965e696bc0c53f799089ad0f52/README.md), it will no long receive _any_ updates - including security updates. This end-of-life means it is hard for us to justify maintaining support for it. There
is a growing list of modules that have already dropped support for both 0.10 and
0.12 which leaves us stuck if a critical issue was to be found in them.

The _only_ reason we've held onto 0.10 for so long is the fact its the version that
Debian Stable ships - and thus it's the only version available as part of our
Raspberry Pi preinstall image. Debian Stable isn't due to update for quite some
time yet, so we're at a bit of an impasse.

Having explored a wide range of options we've made the decision that the 0.15 stream
will be the last one to support node 0.10 *and* 0.12.

**The next milestone release, 0.16, will require Node 4.x.**

This means, for now, the Raspberry Pi preinstall will be fixed at 0.15.
To make life easier, we already include a script on the preinstall image called
`update-nodejs-and-nodered` that updates node.js to the latest LTS version using the
NodeSource repositories and then reinstalls node-red on top. See [the documentation](http://nodered.org/docs/hardware/raspberrypi.html#upgrading-nodejs) for more information - including instructions for doing that upgrade manually if you so
choose.

#### Serial node

One of the more painful parts of the node.js world is handling binary dependencies.
It can be a real headache when upgrading between versions to make sure such dependencies
continue to work as expected.

We're serving notice that in the 0.16 release **we will be removing `node-red-node-serialport` as a default
dependency**.

That means we'll no longer include the Serial node as part of the core
install.

It will remove a lot of hardware/platform dependent code, speeding up the install
time and shrinking the runtime footprint for users who have no need of the node.

It will also make upgrading more reliable as the serial port code will no longer be buried within Node-RED and can be upgraded just like any other node.

This will mean if you are using the serial port nodes you'll need to manually
install them after upgrading to 0.16 - we'll share more details when we get to
that release.

### And finally...

Keep a look out for some announcements next week... we have some exciting news
to share!
