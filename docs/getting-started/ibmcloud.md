---
layout: docs-getting-started
title: Running on IBM Cloud
toc: toc-user-guide.html
slug: ibm cloud
redirect_from:
  - /docs/platforms/bluemix
---

Node-RED is available on the IBM Cloud platform as one of the [Starter Kits applications](#starter-kit-application)
in the catalog.

We also provide a '[Deploy To IBM Cloud](#deploy-to-ibm-cloud)' enabled repository.

---

### Starter Kit application

1. Log in or sign-up for an account at [cloud.ibm.com](https://cloud.ibm.com)

2. Navigate to the catalog and [search for 'Node-RED'](https://cloud.ibm.com/catalog?search=node-red).
   This will present you with the **Node-RED Starter**. This gives you a Node-RED instance running as a Cloud Foundry 
   application. It also provides a Cloudant database instance
   and a collection of nodes that make it easy to access various IBM Cloud services.

3. Click the starter application you want to use, give it a name and click create.

A couple of minutes later, you'll be able to access your instance of Node-RED at `https://<yourAppName>.mybluemix.net`

#### Customising your Node-RED application

To start customising your instance of Node-RED, you can either download the application locally or you can enable the Continuous Delivery integration option via your application's IBM Cloud dashboard page. That will create a git repository on either GitHub or IBM DevOps services, from where you can customize your Node-RED, save the changes and automatically update the application in IBM Cloud.

##### Securing the editor

When you first ran the Node-RED instance you were presented with some options to secure the editor.
To change those options, you can set some environment variables from either the IBM Cloud console or the cf command-line

1. In the IBM Cloud dashboard, select the 'Environment Variables' page for your application
2. Add the required user-defined variables:
    - `NODE_RED_USERNAME` - the username to secure the editor with
    - `NODE_RED_PASSWORD` - the password to secure the editor with
    - `NODE_RED_GUEST_ACCESS` - set to true to allow anonymous users to have read-only access to the editor
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

1. Applications running in the Cloud Foundry space of IBM Cloud maintain a cache directory per node application, to store resolved dependencies so they are not downloaded and installed every time the application is restaged. To update the dependencies, including the version of node-RED, this cache must be disabled. Set the NODE_MODULES_CACHE environment variable to false. You can either do this on your application's IBM Cloud console page (Runtime -> Environment Variables), or by using the cf command-line:

        cf set-env [APPLICATION_NAME] NODE_MODULES_CACHE false

2. Trigger a restage of your application. This cannot be done using the IBM Cloud console, so the cf command-line should be used:

        cf restage [APPLICATION_NAME]

3. If you are upgrading to Node-RED 0.20 or later, you **must** ensure your application is running on Node.js 10 or later. To do that, edit your application `package.json` file - see below for how to edit the file. Update the `engines` property to `10.x` if it is not currently set to that.

In order to edit the file, you must enable the Continuous Delivery integration
option via your application's IBM Cloud dashboard page. That will create a git repository
on either GitHub or IBM DevOps services, from where you can edit the file, save the
changes and automatically update the application in IBM Cloud.


##### Changing the static web content

The landing page of your instance is provided by static content with the application.
This can be replaced with whatever content you want in the `public` directory.

If you want to remove the static web content and serve the flow editor from the
root path, delete the `httpStatic` and `httpAdminRoot` entries in the `bluemix-settings.js` file.

---

### Deploy To IBM Cloud

The [Deploy To IBM Cloud enabled repository](https://github.com/IBM/node-red-app)
lets you create your own customised Node-RED application that can then
be deployed to IBM Cloud with a couple of clicks.

You can try it out now by clicking here:

[![Deploy to IBM Cloud](https://cloud.ibm.com/devops/setup/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/IBM/node-red-app.git)

When you click the button, you are taken to IBM Cloud where you get a pick a name
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
their own Node-RED based application that can be quickly deployed to IBM Cloud.

The default flows are stored in the `defaults` directory in the file called `flow.json`.

The web content you get when you go to the application's URL is stored under the
`public` directory.

Additional nodes can be added to the `package.json` file and all other Node-RED
configuration settings can be set in `bluemix-settings.js`.

If you do clone the repository, make sure you update the `README.md` file to point
the `Deploy to IBM Cloud` button at your repository.

If you want to change the name of the Cloudant instance that gets created, the memory
allocated to the application or other deploy-time options, have a look in `manifest.yml`.
