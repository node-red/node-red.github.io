---
layout: blog
title: Changing where Node-RED stores data
author: nick
---

One of the things we've been thinking about recently is our upgrade process.
How does a user go from version A of node-red to version B with as little effort as possible.

By default, we write your data to the directory that node-red has been installed. This means you cannot just replace that directory with the newest version of node-red. You first have to backup your data first. Whilst this is obviously always a prudent thing to do, what exactly constitutes 'your data' is a longish list of files/directories that is prone to mistakes that leads to something getting lost - especially for users who are not so used to copying files around etc.

It also meant we often told users to run from a git clone of the repository - as the upgrade path there is simply running `git pull` and `npm update`. But this left users running the latest development code, not the latest stable release - far from ideal for reasons I'll discuss later.

We have had the `userDir` setting for a while now that allows you to point to a directory that all of your data should be put - that helps to keep it separate from the node-red install. One of our rules around things 'Just Working' is that we should have the right default behaviour. As soon as we require a user to edit settings.js in order to ensure their data is somewhere sensible, we're failed.

### A new default

The upcoming 0.10.4 release of node-red will include a change to the default behaviour of node-red: user data will be written to the directory `$HOME/.node-red/`. This ensures your data is kept separate from the node-red install, meaning an upgrade is much easier to do - you just upgrade node-red.


To ensure complete backwards compatibility, the following steps are taken by node-red when it decides where to store data:

 1. if `userDir` is explicitly specified at start-up, either via `settings.js` (as before), or via a new command-line argument:  `node red.js --userDir /var/node-red/data`

  This means users who already set `userDir` are unaffected, and it is even easier to explicitly point at a specific directory if you want to switch between configurations quickly.

 2. if we detect the presence of user data in the node-red install directory (specifically, the presence of the `.config.json` file), we will continue to use the node-red install directory to store the data.

  This will mean existing node-red installs will continue to run as before. We will not move existing data to `$HOME/.node-red`

 3. if none of the above applies, we will use `$HOME/.node-red`. In other words, brand new installs will do this.

The documentation on [how to upgrade](http://nodered.org/docs/getting-started/upgrading.html) will be updated to include a guide on how to manually migrate your data into `$HOME/.node-red`.


## Installing Node-RED


This change also brings a change to how we recommend node-red is installed. Rather than downloading zip file, we will recommend the use of npm to install node-red.

The following command will do a global install of node-red:

    sudo npm install -g node-red

This will also put the new command `node-red` onto your path, allowing you to run from any directory.

When a new release is available, you simply run the following command to get it installed:

    sudo npm update -g node-red


If you choose to install it locally, rather than globally, you can still upgrade using the `npm update` command, but you won't get the `node-red` command on your path.


## Running from git

Some users chose to clone the git repository and run from there. This has the advantage of getting all of the very latest changes, but it has always been at the risk of picking up still-under-developement code.

In the very near future, we will be adding a build step into the development process that will sit between the code in git and what constitutes a runnable instance of node-red.

You will _not_ be able to run node-red straight from a git clone without first running a build. This will require the development dependencies to be installed - not just the production ones.

We'll share more details of this just before it goes into the repository. But by way of advanced warning, if you are running from git just to get the very latest code, be prepared.

If you are running from git for the convenience of upgrading between versions, you should move to the `npm install -g` approach above once we release 0.10.4.
