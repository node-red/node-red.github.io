---
layout: default
title: Upgrading
---   

### Before you Upgrade

Upgrades should not overwrite the main flow file or library files, as long as the upgrade method matches the original install method... but... better safe than sorry.

Backing up key files...  the main flow file is called **flows_{hostname}.json**
where {hostname} is the machine name of your device. If you have started Node-RED using other flows .json files then back those up as well.

You may also have saved function and flows in the library - these are kept in the `lib/` directory under the top-level folder.

Once these are backed up they can be moved to other types of install.



### How to Upgrade
How you upgrade depends on which method you used to install Node-RED initially.


#### Upgrading a release

Download the latest release from the link on <http://nodered.org>. The zip
contains a top-level folder called `node-red-X.Y.Z` where `X.Y.Z` is the version
number. Once extracted, from within that top-level folder, run the following
command:

    $ npm install --production

As this will (by default) create a new install directory you should copy over your existing **flows_{hostname}.json** and other files
that you backed up previously in stage 1. Obviously you will now need to start Node-RED from within this new directory and
update any auto-start scripts to point to this new directroy instead.


#### Upgrading from npm

Currently it is advisable only to do this if you want to [embed Node-RED into an existing application](../embedding.html).

Run the following commands to upgrade from the npm repository:

    $ cd node-red
    $ npm install --force node-red

This installs the latest release, and its core dependencies, into the `node-red/node_modules` 
directory.

#### From GitHub

If you used git clone to install then the usual git commands apply

    $ git pull

Once cloned, the core pre-requisite modules may need to be updated. 

    $ cd node-red
    $ npm update

If you had downloaded the master.zip file you can re-download the latest from  https://github.com/node-red/node-red/archive/master.zip .
This should unzip over the original without issue. Then

    $ cd node-red-master
    $ npm update
    
