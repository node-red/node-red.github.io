---
layout: default
title: Running on IBM Bluemix
---

Node-RED is available on the IBM Bluemix platform as one of the [boilerplate applications](#boilerplate-application)
in the catalog.

We also provide a '[Deploy To Bluemix](#deploy-to-bluemix)' enabled repository.

---

### Boilerplate application

1. Log in or sign-up for an account at [bluemix.net](http://bluemix.net)

2. Navigate to the catalog and [search for 'Node-RED'](https://console.ng.bluemix.net/catalog?search=Node-RED)

3. This will present you with two options:

    1. **Node-RED Starter** - a vanilla Node-RED instance

    2. **Internet of Things Platform Starter** - this gives you everything you need
       to start quickly using Node-RED with the Watson IoT Platform, including
       some default flows to show how things work

   In both cases you will get:

     - a Cloudant database instance to store your flow configuration    
     - a collection of nodes that make it easy to access various Bluemix services, including
       both the Watson IoT platform and the Watson Cognitive services

4. Click the starter application you want to use, give it a name and click create.

A couple of minutes later, you'll be able to access your instance of Node-RED at `https://<yourAppName>.mybluemix.net`


#### Customising your Node-RED application

To start customising your instance of Node-RED, you can either download the application locally or you can enable the Continuous Delivery integration option via your application's Bluemix dashboard page. That will create a git repository on either GitHub or IBM DevOps services, from where you can customize your Node-RED, save the changes and automatically update the application in Bluemix.

##### Securing the editor

When you first ran the Node-RED instance you were presented with some options to secure the editor. 
To change those options, you can set some environment variables from either the Bluemix console or the cf command-line 

1. In the Bluemix dashboard, select the 'Environment Variables' page for your application
2. Add the required user-defined variables:
    - `NODE_RED_USERNAME` - the username to secure the editor with
    - `NODE_RED_PASSWORD` - the password to secure the editor with
    - `NODE_RED_GUEST_USER` - set to true to allow anonymous users to have read-only access to the editor
3. Click Save.

##### Adding nodes

You can add nodes from within the editor. Select the `manage palette` option from
the dropdown menu within the editor.

Alternatively, you can edit the application's `package.json` file and
add the required node modules in the `dependencies` section. The format is:
`"node-red-node-package-name":"x.x.x"` Where x.x.x is the desired version number.

##### Upgrading the version of Node-RED

The application's package.json is setup to grab the latest stable release of Node-RED.
To trigger an upgrade following a new release being made available:

1. Per default [IBM Bluemix maintains a cache directory](https://console.bluemix.net/docs/runtimes/nodejs/configurationOptions.html#cache_behavior) per node application, to store resolved dependencies so they are not downloaded and installed every time. For updates this cache should be disabled. Set the NODE_MODULES_CACHE environment variable to false. You can either do this on your application's Bluemix console page (Runtime -> Environment Variables), or by using the cf command-line: 

        cf set-env [APPLICATION_NAME] NODE_MODULES_CACHE false

2. Trigger a restage of your application. This cannot be done using the Bluemix console, so the cf command-line should be used:

        cf restage [APPLICATION_NAME]

If you deployed your instance **before November 2016** you will need to take some additional steps:

1. edit your application's `package.json` file - see below for how to edit the file
2. update the `engines` property to `4.x` if it is not currently set to that
3. update the `node-red` property under the `dependencies` section to the
   version of Node-RED you want to upgrade to.


In order to edit the file, you must enable the Continuous Delivery integration
option via your application's Bluemix dashboard page. That will create a git repository
on either GitHub or IBM DevOps services, from where you can edit the file, save the
changes and automatically update the application in Bluemix.


##### Changing the static web content

The landing page of your instance is provided by static content with the application.
This can be replaced with whatever content you want in the `public` directory.

If you want to remove the static web content and serve the flow editor from the
root path, delete the `httpStatic` and `httpAdminRoot` entries in the `bluemix-settings.js` file.

---

### Deploy To Bluemix

The [Deploy To Bluemix enabled repository](https://github.com/node-red/node-red-bluemix-starter)
lets you create your own customised Node-RED application that can then
be deployed to Bluemix with a couple clicks.

You can try it out now by clicking here:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/node-red/node-red-bluemix-starter.git)

When you click the button, you are taken to Bluemix where you get a pick a name
for your application at which point the platform takes over, grabs the code from
this repository and deploys it.

It will automatically create an instance of the Cloudant service, call it
`sample-node-red-cloudantNoSQLDB` and bind it to your application. This is where your
Node-RED instance will store its data. If you deploy multiple instances of
Node-RED from this repository, they will share the one Cloudant instance.

It includes a set of default flows that are automatically deployed the first time
Node-RED runs.

#### Customising your Node-RED repository

The repository is there to be cloned, modified and re-used to allow anyone to create
their own Node-RED based application that can be quickly deployed to Bluemix.

The default flows are stored in the `defaults` directory in the file called `flow.json`.

The web content you get when you go to the application's URL is stored under the
`public` directory.

Additional nodes can be added to the `package.json` file and all other Node-RED
configuration settings can be set in `bluemix-settings.js`.

If you do clone the repository, make sure you update the `README.md` file to point
the `Deploy to Bluemix` button at your repository.

If you want to change the name of the Cloudant instance that gets created, the memory
allocated to the application or other deploy-time options, have a look in `manifest.yml`.
