---
layout: default
title: Amazon Web Services
---

This guide takes you through the steps to get Node-RED running on an AWS EC2
instance.

#### Create the base EC2 image

1. Log in to the [AWS EC2 console](https://console.aws.amazon.com/ec2)

2. Click 'Launch Instance'

3. In the list of Quick Start AMIs, select **Ubuntu Server**

4. Select the Instance Type - `t2.micro` is a good starting point

5. On the 'Configure Security Group' tab, add a new 'Custom TCP Rule' for port 1880

6. On the final 'Review' step, click the 'Launch' button

7. The console will prompt you to configure a set of SSH keys. Select 'Create a new key pair' and click 'Download key pair'. Your browser will save the `.pem` file - keep that safe. Finally, click 'Launch'.

After a couple of minutes your EC2 instance will be running. In the console
you can find your instance's IP address.

#### Setup Node-RED

The next task is to log into the instance then install node.js and Node-RED.

Follow the AWS guide for [connecting to your instance](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html).

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
       sudo pm2 startup

#### Next steps

This guide barely scratches the surface of how you may choose to configure your
instance to run in EC2. Node-RED is 'just' a node.js application that exposes an
HTTP server - on that principle, there are many online guides you can use to
learn what else is possible.
