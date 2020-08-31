---
layout: docs-getting-started
title: Running on an Google Cloud Compute Engine
toc: toc-user-guide.html
slug: google cloud
redirect_from:
  - /docs/platforms/gcloud
---

This guide takes you through the steps to get Node-RED running on an Google
Cloud Platform (GCP) - Compute Engine.

You can use the Node Package Manager (`npm`) to install Node-RED on any
environment that has a Node.JS runtime. For GCP, this includes Compute Engine,
Google Kubernetes Engine (GKE), Cloud Run, Cloud Shell as well as other GCP
environments.

There’s also a publically available Docker image, which is what we’ll use for
this example.

#### Create a Compute Engine instance

1. Log in to [GCP](https://console.cloud.google.com/)

2. Open `Compute Engine` and create a new one.

3. Check the label `Deploy a container image to this VM instance` and enter
   `nodered/node-red` as the name of the container image.

4. Leave all the other settings as their defaults and proceed to complete.

Once the VM has started your Node-RED is running.
In the console you can find your instance's IP address.

#### Firewall setup

Node-RED listens on port `1880`. The default VPC network firewall deliberately
restricts incoming requests which means that requests to port 1880 will be
**denied**.

The next step will be to allow ingress traffic to the Node-RED instance.

1. [Create](https://console.cloud.google.com/appengine/firewall/create) a new
   firewall rule.

2. Enter a `Priority` (e.g. 1).

3. Specify in `Action on match` the `allow` option to allow ingress.

4. In `IP range` define the IP addresses which should have access. You can also
   put `*` for allowing ingress from every IP.

5. Save the rule.

#### Work with Node-RED

After you created the Compute Engine and added the firewall rule you have access to
the Node-RED instance via the `IP address` from the Compute instance and port `1880`.
