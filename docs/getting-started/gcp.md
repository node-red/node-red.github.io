---
layout: docs-getting-started
title: Running on Google Cloud Platform (GCP)
slug: gcp
toc: toc-user-guide.html
redirect_from:
  - /docs/platforms/gcp
---

This guide takes you through the steps to get Node-RED running on an GCP
Virtual Machine instance.

#### Create the base image

1. Log in to the [Google Cloud Platform Console](https://console.cloud.google.com/)

1. Select your project.

1. Click `VPC network` >> `VPC networks` >> `Firewall rules` >> `CREATE FIREWALL RULE`

   new `Create a firewall rule` with the options set as:
     - Name: node-red-editor
     - Network: default
     - Priority: 1010
     - Direction of traffic: Ingress
     - Action on match: Allow
     - Targets: ALL Instances in the network
     - Source filter: IP ranges
     - Source IP ranges: 0.0.0.0/0 
     - Protocols and ports: Specified protocols and ports
       - tcp: 1880

   Click `Create` on the Settings page.

1. Click `Compute Engine` >> `VM instances` >> `Create`

   Give your machine info 
     - Name: node-red-instance
     - Region: us-central1
     - Zone: us-central1-a
     - Machine configuration
       - Machine family
         - General-purpose
       - Series
         - N1
       - Machine type
         - f1-micro
     - Boot disk
       - Ubuntu 18.04 LTS

   Click `Create` on the Settings page, then the instance will start to be created.
 
After a couple of minutes your instance will be running. In the console
you can find your instance's IP address as `External IP`.

#### Setup Node-RED

The next task is to log into the instance then install node.js and Node-RED.

Log into your instance using the authentication details you specified in the
previous stage.

Once logged in you need to install node.js and Node-RED

       sudo add-apt-repository -y -r ppa:chris-lea/node.js
       sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list
       sudo rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list.save

       curl -sSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -

       DISTRO="$(lsb_release -s -c)"
       echo "deb https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee /etc/apt/sources.list.d/nodesource.list
       echo "deb-src https://deb.nodesource.com/$VERSION $DISTRO main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list

       sudo apt-get update
       sudo apt-get install nodejs

       curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
       sudo apt-get install -y nodejs build-essential
       sudo npm install -g node-red


At this point you can test your instance by running `node-red`. *Note*: you may
get some errors regarding the Serial node - that's to be expected and can be
ignored.

Once started, you can access the editor at `http://<your-instance-ip>:1880/`.

To get Node-RED to start automatically whenever your instance is restarted, you
can use pm2:

       sudo npm install -g pm2
       pm2 start `which node-red` -- -v
       pm2 save
       pm2 startup

*Note:* this final command will prompt you to run a further command - make sure you do as it says.
