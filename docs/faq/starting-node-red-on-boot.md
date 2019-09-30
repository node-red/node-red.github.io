---
layout: docs-faq
toc: toc-user-guide.html
title: Starting Node-RED on boot
slug: start on boot
---

There are many methods of starting, stopping and monitoring applications at boot
time. This guide highlights some of the possible ways of doing it.

### Raspberry Pi, Debian, Ubuntu

The [Raspberry Pi install script](/docs/getting-started/raspberrypi) we provide
can be used on any Debian-like operating system.

This script installs Node-RED as a [systemd](https://wiki.debian.org/systemd) service.
For more information, read the [Running on Raspberry Pi](/docs/getting-started/raspberrypi#autostart-on-boot)
guide.

If you are not using Raspbian, you may need to edit the service file to suit
your local user id and environment. Details for how to do that are available
[here](/docs/faq/customising-systemd-on-pi).

### RPM based Linux, RedHat, Fedora, CentOS

We also provide an install script for RPM based linux [available here](https://github.com/node-red/linux-installers), that also sets up systemd.

### Other Linux, OSX

The guide below sets out what we believe to be the most straight-forward for
the majority of users. For Windows, PM2 does not autorun as a service -
you may prefer the [NSSM option](#alternative-options) below.

#### Using PM2

[PM2](https://github.com/Unitech/pm2) is a process manager for Node.js. It makes
it easy to run applications on boot and ensure they are restarted if necessary.

#### 1. Install PM2

    sudo npm install -g pm2

<div class="doc-callout">
<em>Note</em> : <code>sudo</code> is required if running as a non-root user on Linux or OS X. If
running on Windows, you will need to run in a <a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">command shell as Administrator</a>,
without the <code>sudo</code> command.
</div>

<div class="doc-callout">
If running on Windows, you should also ensure <code>tail.exe</code> is on your path, as
described <a href="https://github.com/Unitech/PM2/blob/development/ADVANCED_README.md#windows">here</a>.
</div>

#### 2. Determine the exact location of the `node-red` command.

If you have done a global install of node-red, then on Linux/OS X the `node-red`
command will probably be either: `/usr/bin/node-red` or `/usr/local/bin/node-red`.
The command `which node-red` can be used to confirm the location.

If you have done a local install, it will be `node_modules/node-red/bin/node-red`,
relative to where you ran `npm install` from.

#### 3. Tell PM2 to run Node-RED

The following command tells PM2 to run Node-RED, assuming `/usr/bin/node-red` as
the location of the `node-red` command.

The `--` argument must appear before any arguments you want to pass to node-red.

    pm2 start /usr/bin/node-red -- -v

<div class="doc-callout">
<em>Note</em> : if you are running on a device like the Raspberry Pi or BeagleBone
Black that have a constrained amount of memory, you must pass an additional argument:

<pre>pm2 start /usr/bin/node-red --node-args="--max-old-space-size=128" -- -v</pre>
</div>

<div class="doc-callout">
<em>Note</em> : if you want to run as the root user, you must use the `--userDir`
option to specify where Node-RED should store your data.
</div>

This will start Node-RED in the background. You can view information about the
process and access the log output using the commands:

    pm2 info node-red
    pm2 logs node-red

More information about managing processes under PM2 is available [here](https://github.com/Unitech/pm2#process-management).

#### 4. Tell PM2 to run on boot

PM2 is able to generate and configure a startup script suitable for the platform
it is being run on.

Run these commands and follow the instructions it provides:

    pm2 save
    pm2 startup

for newer Linux systems that use **systemd** use

    pm2 startup systemd

<div class="doc-callout">
<em>Temporary Note:</em> There's an <a href="https://github.com/Unitech/PM2/issues/1321">
open issue</a> on PM2 on GitHub which highlights an issue that has been introduced recently.
Linux users need to manually edit the generated `/etc/init.d/pm2-init.sh` file and replace

<pre>export PM2_HOME="/root/.pm2"</pre>

to point at the correct directory, which would be like:

<pre>export PM2_HOME="/home/{youruser}/.pm2"</pre>
</div>

#### 5. Reboot

Finally, reboot and check everything starts as expected.

### Windows

PM2 does not autorun as a service on Windows. An alternative option is to use NSSM,
an example of which is available from the community link below.


### Alternative options

There are many alternative approaches. The following are some of those created
by members of the community.

 - [A systemd script (used by the Pi pre-install)](https://raw.githubusercontent.com/node-red/linux-installers/master/resources/nodered.service) by @NodeRED (linux)
 - [A systemd script](https://gist.github.com/Belphemur/3f6d3bf211b0e8a18d93) by Belphemur (linux)
 - [An init.d script](https://gist.github.com/bigmonkeyboy/9962293)  by dceejay (linux)
 - [An init.d script](https://gist.github.com/Belphemur/cf91100f81f2b37b3e94) by Belphemur (linux)
 - [A Launchd script](https://gist.github.com/natcl/4688162920f368707613) by natcl (OS X)
 - [Running as a Windows service using NSSM](https://gist.github.com/dceejay/576b4847f0a17dc066db) by dceejay
 - [Running as Windows/OS X service](http://www.hardill.me.uk/wordpress/2014/05/30/running-node-red-as-a-windows-or-osx-service/)  by Ben Hardill
 - [An rc.d script](https://gist.github.com/apearson/56a2cd137099dbeaf6683ef99aa43ce0) by apearson (freebsd)
