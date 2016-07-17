---
layout: default
title: Microsoft Azure
---

This guide takes you through the steps to get Node-RED running on an Azure
Virtual Machine instance.

#### Create the base image

1. Log in to the [Azure console](https://portal.azure.com/)

2. Click to add a New ... Virtual Machine

3. In the list of Virtual Machines, select **Ubuntu Server**, then click 'Create'

4. Give your machine a name, the username you want to use and the authentication
   details you want to use to access the instance

5. Choose the Size of your instance. Remember that node.js is single-threaded so
   there's no benefit to picking a size with multiple cores for a simple node-red
   instance. `A1 Basic` is a good starting point

6. On the 'Settings' step, click on the 'Network security group' option. Add a
   new 'Inbound rule' with the options set as:
     - Name: node-red-editor
     - Priority: 1010
     - Protocol: TCP
     - Destination port range: 1880

7. Click 'Ok' on the Settings page, check the Summary then click 'Ok' to deploy
   the new instance

After a couple of minutes your instance will be running. In the console
you can find your instance's IP address

#### Setup Node-RED

The next task is to log into the instance then install node.js and Node-RED.

Log into your instance using the authentication details you specified in the
previous stage.

Once logged in you need to install node.js and Node-RED

       curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
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
