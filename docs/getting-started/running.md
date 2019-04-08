---
layout: docs
toc: getting-started-toc.html
title: Running
---

If you have installed Node-RED as a global npm package, you can use the `node-red`
command:

    $ node-red

    Welcome to Node-RED
    ===================

    25 Mar 22:51:09 - [info] Node-RED version: v0.20.5
    25 Mar 22:51:09 - [info] Node.js  version: v10.15.3
    25 Mar 22:51:09 - [info] Loading palette nodes
    25 Mar 22:51:10 - [warn] ------------------------------------------
    25 Mar 22:51:10 - [warn] [rpi-gpio] Info : Ignoring Raspberry Pi specific node
    25 Mar 22:51:10 - [warn] ------------------------------------------
    25 Mar 22:51:10 - [info] Settings file  : /home/nol/.node-red/settings.js
    25 Mar 22:51:10 - [info] Context store  : 'default' [module=localfilesystem]
    25 Mar 22:51:10 - [info] User Directory : /home/nol/.node-red
    25 Mar 22:51:10 - [warn] Projects disabled : set editorTheme.projects.enabled=true to enable
    25 Mar 22:51:10 - [info] Server now running at http://127.0.0.1:1880/
    25 Mar 22:51:10 - [info] Creating new flows file : flows_noltop.json
    25 Mar 22:51:10 - [info] Starting flows
    25 Mar 22:51:10 - [info] Started flows

You can then access the Node-RED editor by pointing your browser at <http://localhost:1880>.

There are specific instructions available for certain hardware platforms:

 - [Raspberry Pi](../hardware/raspberrypi)
 - [BeagleBone Black](../hardware/beagleboneblack)

#### Next

You can now create your [first flow](first-flow).

----

### Command-line usage

    Usage: node-red [-v] [-?] [--port PORT] [--safe] [--settings settings.js] 
                    [--title TITLE] [--userDir DIR] [flows.json]

    Options:
      -p, --port PORT      use specified TCP port for editor web ui
          --safe           start Node-RED editor without running flows
      -s, --settings FILE  use specified settings file
          --title TITLE    set process window title         
      -u, --userDir DIR    use specified user directory
      -v                   enable verbose output
      -?, --help           show usage
      flows.json           name of the flow file you want to work with. Using different names, 
                           such as greenhouse.json or robot.json, you can separate different 
                           undertakings you are working on. If you don't specify a name, it 
                           defaults to flows_xxx.json where xxx is the hostname of your server.

----
                           
#### Running from a local install - Linux & Mac OS X

The `node-red` command can still be accessed even if Node-RED hasn't been installed
as a global npm package.

If you have npm installed Node-RED, this script will be `node_modules/node-red/bin/node-red`,
relative to the directory you ran `npm install` in. If you have installed from a
release zip file, the script will be `node-red-X.Y.Z/bin/node-red`, relative to
the directory you extracted the zip into.

First make the `node-red` start script executable:

    chmod +x <node-red-install-directory>/bin/node-red

Then you can start Node-RED with:

    <node-red-install-directory>/bin/node-red

#### Running from a local install - Windows

On Windows, run the following command from the same directory you ran `npm install`
in, or that you extracted the release zip file:

    node node_modules/node-red/red.js

#### Storing user data

By default, Node-RED stores your data in the directory `$HOME/.node-red`. For
backwards compatibility reasons, if Node-RED detects user data in its install
directory, it will use that instead. The [upgrading](upgrading) documentation
includes a section on migrating your data out of the Node-RED install directory.

To override what directory to use, the `--userDir` command-line option can be used.

#### Passing arguments to the underlying Node.js process

There are occasions when it is necessary to pass arguments to the underlying
Node.js process. For example, when running on devices like the Raspberry Pi or
BeagleBone Black that have a constrained amount of memory.

To do this, you must use the `node-red-pi` start script in place of `node-red`.
_Note_: this script is not available on Windows.

Alternatively, if are running Node-RED using the `node` command, you must provide
arguments for the node process before specifying `red.js` and the arguments you
want passed to Node-RED itself.

The following two commands show these two approaches:

    node-red-pi --max-old-space-size=128 --userDir /home/user/node-red-data/
    node --max-old-space-size=128 red.js --userDir /home/user/node-red-data/

### Starting Node-RED on boot

There are many methods of starting, stopping and monitoring applications at boot time.
Raspberry Pi users are *strongly* recommended to follow [these instructions](../hardware/raspberrypi).

Linux users that have a Debian flavour (e.g. Ubuntu, Mint, Debian, etc) are recommended to use the
[Adding Autostart capability using SystemD](../hardware/raspberrypi#adding-autostart-capability-using-systemd)
instructions from the Raspberry Pi docs though you will need to edit the downloaded `/lib/systemd/system/nodered.service` file to suit your *user id* and environment.

The guide below sets out what we believe to be the most straight-forward for
the majority of users. For Windows, PM2 does not autorun as a service -
you may prefer the [NSSM option](#alternative-options) below.

#### Using PM2

[PM2](https://github.com/Unitech/pm2) is a process manager for Node.js. It makes
it easy to run applications on boot and ensure they are restarted if necessary.

<div class="doc-callout"><em>Note</em> : PM2 is released under GNU-AGPL-3.0 license - please check the terms of the license before deploying.</div>

##### 1. Install PM2

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

##### 2. Determine the exact location of the `node-red` command.

If you have done a global install of node-red, then on Linux/OS X the `node-red`
command will probably be either: `/usr/bin/node-red` or `/usr/local/bin/node-red`.
The command `which node-red` can be used to confirm the location.

If you have done a local install, it will be `node_modules/node-red/bin/node-red`,
relative to where you ran `npm install` from.

##### 3. Tell PM2 to run Node-RED

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

##### 4. Tell PM2 to run on boot

PM2 is able to generate and configure a startup script suitable for the platform
it is being run on.

Run these commands and follow the instructions it provides:

    pm2 save
    pm2 startup

for newer Linux systems that use **systemd** use

    pm2 startup systemd

<div class="doc-callout">
<em>Temporary Note:</em> There's an <a href="https://github.com/Unitech/PM2/issues/1321" target="_new">
open issue</a> on PM2 on GitHub which highlights an issue that has been introduced recently.
Linux users need to manually edit the generated `/etc/init.d/pm2-init.sh` file and replace

<pre>export PM2_HOME="/root/.pm2"</pre>

to point at the correct directory, which would be like:

<pre>export PM2_HOME="/home/{youruser}/.pm2"</pre>
</div>

##### 5. Reboot

Finally, reboot and check everything starts as expected.

#### Alternative options

There are many alternative approaches. The following are some of those created
by members of the community.

 - [A systemd script (used by the Pi pre-install)](https://raw.githubusercontent.com/node-red/raspbian-deb-package/master/resources/nodered.service) by @NodeRED (linux)
 - [A systemd script](https://gist.github.com/Belphemur/3f6d3bf211b0e8a18d93) by Belphemur (linux)
 - [An init.d script](https://gist.github.com/bigmonkeyboy/9962293)  by dceejay (linux)
 - [An init.d script](https://gist.github.com/Belphemur/cf91100f81f2b37b3e94) by Belphemur (linux)
 - [A Launchd script](https://gist.github.com/natcl/4688162920f368707613) by natcl (OS X)
 - [Running as a Windows service using NSSM](https://gist.github.com/dceejay/576b4847f0a17dc066db) by dceejay
 - [Running as Windows/OS X service](http://www.hardill.me.uk/wordpress/2014/05/30/running-node-red-as-a-windows-or-osx-service/)  by Ben Hardill
