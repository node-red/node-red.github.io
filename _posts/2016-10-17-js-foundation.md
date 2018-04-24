---
layout: blog
title: Moving to the JS Foundation
author: nick
---

_[Nick O'Leary](https://twitter.com/knolleary) and [Dave Conway-Jones](https://twitter.com/ceejay), [IBM Emerging Technologies](https://www.ibm.com/blogs/emerging-technology/)_.


On a wet January day in 2013, I started playing around with how to visualise
mapping messages between MQTT topics. Having got something working in my web
browser, I showed Dave and said it wouldn't take much to have the visualisation
update a running system at the click of a button. Without pause, his response
was 'go on then' and Node-RED was born.

Soon after we added a Serial node to get data from a GPS into MQTT for a project
Dave was working on. A couple of months after that we were running it on a group
of Raspberry Pis strapped to a client's manufacturing line.

At that time it was a side project; something to fit around the day job. As it
became evident to us we had something quite useful, the question was how to make
the most of it.

The obvious answer to us was to open source it and continue to develop it in the
open. We quickly convinced the powers that be that this was the route to take and
in September 2013 we pushed the first commit to GitHub.

Fast forward three years and we find ourselves with over 325,000 installs from
npm, over 600 nodes contributed to the community and code contributions coming
into the project from over 50 non-IBMers.

Node-RED is included on the main Raspberry Pi Raspbian distribution - available
directly from the desktop menu.

Companies such as [SenseTecnic](https://fred.sensetecnic.com/), [AT&T](https://flow.att.com/) and [Red Ant](https://www.redconnect.io/) provide Node-RED services.

Hardware devices are shipped with Node-RED installed to enable end-user
configuration - for example the [Multitech MultiConnect Conduit](http://www.multitech.co.uk/brands/multiconnect-conduit) and Intel's IoT
Gateway Developer Hub.

Amongst the many nodes contributed to the community, companies such as [Opto 22](http://www.opto22.com/)
are providing [nodes](http://flows.nodered.org/node/node-red-contrib-pac) for their own devices.

It has been used to create [beautiful interactive lighting displays](https://momentfactory.com/work/all/all/nova-lumina), to help [refurbish hovercrafts delivering aid](https://kk4oyj.wordpress.com/2016/10/09/hovercraft-instrumentation/)
and to bring [dinosaurs to life](https://www.ibm.com/blogs/internet-of-things/bring-dinosaur-life/).


And of course Node-RED is a key part of the [IBM Watson IoT platform's Developer experience](https://www.ibm.com/internet-of-things/roles/iot-developer/), making
it easy to create IoT applications that can combine the best of what IBM Bluemix
has to offer.

All of this has been possible through the power of open technology. Had Dave and
I kept it to ourselves, we would have got on with our client projects, making
incremental changes as and when we needed something from it. But by developing
it in the open, we have seen a community build around it that has helped push
it further than we could have ever imagined.

### Moving forward

And that brings us to today's announcement.

The [JS Foundation](https://js.foundation/), of which IBM is a founding member,
has been created to drive widespread adoption and continued development of key
JavaScript solutions and related technologies. With a formalised partnership with
the Node.js Foundation, it is creating a centre of gravity for all things JavaScript.

As part of the launch, we're excited to announce Node-RED is becoming a project
within the foundation.

<div style="text-align:center">
<img style="width:150px;" src="/blog/content/images/2016/10/jsf-hex.png" />
<img style="width:150px;" src="/blog/content/images/2016/10/nr-hex.png" />
</div>

Becoming part of the foundation means we'll benefit from increased collaboration
and cross-pollination between the wide variety of projects. We'll have an open
technical governance structure and access to a Mentorship Program that will help
us continue to drive innovation and increase participation.

Over the coming days and weeks we will formalise these things along with the other
projects in the foundation.

But above all else, we remain an open project that continues to welcome contributions
of any sort, from anyone. Our GitHub organisation won't change, Dave and I aren't
going anywhere and we're still committed to making Node-RED an indispensable tool
for the Internet of Things.


### Community driven

We wouldn't be here today without you, the community. This move is a great
validation of everything we've achieved together in a short time.

So from Dave and myself, a big thank you for your enthusiasm, your contributions,
and even your issues raised on GitHub.

### More information

To find out more about this news, check out:

 - the [Linux Foundation's
press release](https://www.linuxfoundation.org/press-release/the-linux-foundation-unites-javascript-community-for-open-web-development/)
 - a [blog post from Angel Diaz](https://www.ibm.com/blogs/cloud-computing/2016/10/ibm-partners-js-foundation/), IBM VP Cloud Architecture & Technology

To see how Node-RED can be used alongside IBM Watson IoT, try out the [starter application](https://new-console.ng.bluemix.net/catalog/starters/internet-of-things-platform-starter/) in IBM Bluemix.
