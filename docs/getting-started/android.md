---
layout: docs-getting-started
title: Running on Android
toc: toc-user-guide.html
slug: android
redirect_from:
  - /docs/platforms/android
---

Using the [Termux](https://termux.com) app makes it easy to run
Node-RED on Android devices. Get it directly from their [github](https://github.com/termux/termux-app#github) or via [F-Droid](https://f-droid.org/) here [Termux on F-Droid](https://f-droid.org/en/packages/com.termux/).

Note that the Play Store version is not maintained.

<div class="doc-callout"><em>Note</em> : the Node-RED team have no connection
with the Termux application nor its development, nor F-Droid. We cannot provide support for
it in any way, other than to say that at this point in time it works.</div>

### Installing

Install it, and run it. Then at the prompt type

    apt update
    apt upgrade
    apt install coreutils nano nodejs
    npm i -g --unsafe-perm node-red
    node-red

Then you can point a browser to `http://localhost:1880`

Note that installing openssh may make interacting with termux a little easier.  [see this thread](https://discourse.nodered.org/t/android-termux-playstore-no-longer-a-recommended-install-source/85034/4) for a description of one such install.

### Notes

 - You can also npm install other node-red nodes such as `node-red-dashboard` in the standard way :

       cd ~/.node-red
       npm i node-red-dashboard
   
   or via the Pallete Manager.

 - The `volume-down` key is the ctrl key - so `vol-down-c` can be used to "break" a running app.
 - The instructions above also install the `nano` editor, which is useful for editing files.

### Autostarting

The recommended way of starting applications running in Termux is using the [Termux:Boot application](https://github.com/termux/termux-boot) (available from [F-droid](https://f-droid.org/en/packages/com.termux.boot/) - note that the Play Store version may not be maintained, and it's recommended to use the same source that you installed termux from).

We have found this other app useful for autostarting Termux on boot - <a href="https://play.google.com/store/apps/details?id=com.autostart&amp;hl=en_GB">Autostart - No Root</a> (Note: with termux:boot, use of other autoboot apps does not seem to be required).

Note that the shebang in the node-red script is incompatible with termux:boot scripts.  The workaround is to start node-red using a termux:boot startup script like:

```
#!/data/data/com.termux/files/usr/bin/sh
termux-wake-lock
node /data/data/com.termux/files/usr/bin/node-red
```

### Device Access

You can get direct access to various hardware on the device by using the extra
Termux device plugins - which can then be accessed via `Node-RED` using the `exec`
node.

**Note**: you need to install both the add-on app, and also the add-on api in Termux.

Install add-on app - Termux:API from the same source you got termux.

Install add-on access into Termux

    apt install termux-api

### Useful links

 - [How to use Termux API](https://wiki.termux.com/wiki/Termux:API)
 - [node-red-contrib-termux-api](https://flows.nodered.org/node/node-red-contrib-termux-api)
 - [Another Node-Red on termux install guide](https://che-adrian.medium.com/install-node-red-on-an-android-device-using-the-termux-app-1e1679ae876)

  
