---
layout: docs-getting-started
title: Running on Amazon Web Services
toc: toc-user-guide.html
slug: aws
redirect_from:
  - /docs/platforms/aws
---

This guide takes you through the steps to get Node-RED running in an AWS environment.

There are two approaches:

1. [Running on the AWS Elastic Beanstalk Service (EBS)](#running-on-aws-ebs)
2. [Running under an Ubuntu image on AWS EC2](#running-on-aws-ec2-with-ubuntu)

### Running on AWS EBS

#### Prerequisites

1. Ensure you have an AWS account with Elastic Beanstalk, SQS and S3 enabled

2. Download EB command line and install on your local computer - see [link](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html)

3. Create AWS credentials and save in a local file (~/.aws/config or Usersusername.awsconfig) as below

    ```
[profile eb-cli]
aws_access_key_id = key id
aws_secret_access_key = access key
```

#### Create EB Environment

1. Create a new directory (e.g. `demoapp`)

2. cd to that directory

3. run `eb init` to create a new elastic beanstalk project. select preferred region and use node.js as the plaform
You will be asked if you wish to use ssh. If you do, please ensure you have ssh installed on your computer if you wish to generate a new key pair.

4. Login to the AWS Console on your browser, select Identity and Access Management (IAM) and add the AmazonS3FullAccess policy to the aws-elasticbeanstalk-ec2-role. Note: this gives full access from EBS to S3 and you may wish to tailor this policy to meet your own security needs

#### Create a Node-RED environment

1. Create a `package.json` file with the following content (replacing "demoapp" with your app name)

    ```javascript
{   
    "name": "demoapp",
    "version": "1.0.0",
    "description": "node-red demo app",
    "main": "",
    "scripts": {
        "start": "./node_modules/.bin/node-red -s ./settings.js"
    },
    "engines": {
        "node": "10.x"
    },
    "dependencies": {
        "node-red": "0.20.x",
        "aws-sdk": "2.4.x",
        "node-red-contrib-storage-s3": "0.0.x",
        "when": "3.7.x"
    },
    "author": "",
    "license": "ISC"
}
```

2. Copy the default [Node-RED settings.js file](https://github.com/node-red/node-red/blob/master/packages/node_modules/node-red/settings.js) to the demoapp directory

3. Edit the settings.js file to add the following entries to module.exports (setting awsRegion to that used in eb init and replacing demoapp with your app name) :

    ```
     awsRegion: 'eu-west-1',
     awsS3Appname: 'demoapp',
     storageModule: require('node-red-contrib-storage-s3'),
```

4. At the command prompt make sure you are in the your application's top-level directory and run the command `eb create`; you may wish to specify a more unique application name. This will take a long time to run but eventually will return successfully.

#### Configuring Node-RED access

Node-RED is now accessible directly from the web url of the application. However this is insecure and does not work very well for logging. Instead we will configure direct access to the administration port of node-red on the ec2 instance it is using.

1. In the AWS Console, select EC2, then select security groups. You will see a set of security groups. Select one with a name of your environment and a description of "Security Group for ElasticBeanstalk Environment". Once selected, click on "Actions" and then "Edit inbound settings". A dialog box with rules with appear. Add a new rule. Set type to "all traffic" and source to "my ip". Save the rule.  

2. Select the EC2 instance which is running the node-red application. copy its IP address

3. Enter the IP address in the browser with a port of 8081. This will provide direct access to the node-red adminstration console.

Note: the public IP address also provides access to the node-red application and it would be good practice to remove that access at the same time  i.e. the HTTP rule for port 80.

Your Node-RED instance is now running on EBS. Any flows you create will be saved to AWS S3 so you can tear down the environment and the flows will be accessible whenever you redeploy.


### Running on AWS EC2 with Ubuntu

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

### Next steps

This guide barely scratches the surface of how you may choose to configure your
instance to run in EC2. Node-RED is 'just' a node.js application that exposes an
HTTP server - on that principle, there are many online guides you can use to
learn what else is possible.
