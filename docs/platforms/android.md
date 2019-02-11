---
layout: default
title: Running on Android
---

Using the <a href="https://termux.com">Termux</a> app in the app store makes it easy to run Node-RED on Android devices. You can get it from the <a href="https://play.google.com/store/apps/details?id=com.termux&amp;hl=en_GB">Play Store</a>.

<div class="doc-callout"><em>Note</em> : the Node-RED team have no connection with the Termux application nor it's development. We cannot provide support for it in any way, other than to say that at this point in time it works rather well.</div>

Install it, and run it. Then at the prompt type

    apt update
    apt upgrade
    apt install coreutils nano nodejs
    npm i -g --unsafe-perm node-red
    node-red

Then you can point a browser to `localhost:1880`


#### Notes

 - You can also npm install other node-red nodes such as `node-red-dashboard` in the standard way :

       cd ~/.node-red
       npm i node-red-dashboard

 - The `volume-down` key is the ctrl key - so `vol-down-c` can be used to "break" a running app.
 - The instructions above also install the `nano` editor, which is useful for editing files.


### Misc

#### Autostarting

For a discussion on autostarting apps within Termux - see <a href="https://github.com/termux/termux-app/issues/14">this thread</a> on the Termux Github project.

I have found this other app useful for autostarting Termux on boot - <a href="https://play.google.com/store/apps/details?id=com.autostart&amp;hl=en_GB">Autostart - No Root</a>

#### Device Access

You can also get direct access to various hardware on the device by using the extra Termux device plugins - which can then of course be accessed via `Node-RED` using the exec command.

**Note**: you need to install both the add-on app, and also the add-on api in Termux.

Install add-on app - <a href="https://play.google.com/store/apps/details?id=com.termux.api&amp;hl=en">Termux:API</a> from Play store.

Install add-on access into Termux

    apt install termux-api

Link to - <a href="https://wiki.termux.com/wiki/Termux:API">How to use Termux API</a>
