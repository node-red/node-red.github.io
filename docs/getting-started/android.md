---
layout: docs-getting-started
title: Running on Android
toc: toc-user-guide.html
slug: android
redirect_from:
  - /docs/platforms/android
---

Using the [Termux](https://termux.com) app in the app store makes it easy to run
Node-RED on Android devices. You can get it from the [Play Store](https://play.google.com/store/apps/details?id=com.termux&amp;hl=en_GB).

<div class="doc-callout"><em>Note</em> : the Node-RED team have no connection
with the Termux application nor its development. We cannot provide support for
it in any way, other than to say that at this point in time it works.</div>

### Installing

Install it, and run it. Then at the prompt type

    apt update
    apt upgrade
    apt install coreutils nano nodejs
    npm i -g --unsafe-perm node-red
    node-red

Then you can point a browser to `http://localhost:1880`

### Notes

 - You can also npm install other node-red nodes such as `node-red-dashboard` in the standard way :

       cd ~/.node-red
       npm i node-red-dashboard

 - The `volume-down` key is the ctrl key - so `vol-down-c` can be used to "break" a running app.
 - The instructions above also install the `nano` editor, which is useful for editing files.

### Autostarting

The recommended way of starting applications running in Termux is using the [Termux:Boot application](https://github.com/termux/termux-boot) (available from [F-droid](https://f-droid.org/en/packages/com.termux.boot/) or [Play Store](https://play.google.com/store/apps/details?id=com.termux.boot)).

We have found this other app useful for autostarting Termux on boot - <a href="https://play.google.com/store/apps/details?id=com.autostart&amp;hl=en_GB">Autostart - No Root</a>

### Device Access

You can get direct access to various hardware on the device by using the extra
Termux device plugins - which can then be accessed via `Node-RED` using the `exec`
node.

**Note**: you need to install both the add-on app, and also the add-on api in Termux.

Install add-on app - <a href="https://play.google.com/store/apps/details?id=com.termux.api&amp;hl=en">Termux:API</a> from Play store.

Install add-on access into Termux

    apt install termux-api

### Useful links

 - [How to use Termux API](https://wiki.termux.com/wiki/Termux:API)
