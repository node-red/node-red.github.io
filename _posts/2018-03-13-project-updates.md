---
layout: blog
title: Project updates
author: nick
---

One of the things we've not done so well on is keeping the community up to date
with the general goings on of the project. The mailing list and slack team are a
constant stream of discussion and debate, but it's easy to forget that not everyone
follows all the various threads.

So we're going to try to do some more frequent posts here to share what's been
going on across the project.

### 🎉 1 Million Installs 🎉

The first thing to highlight is we recently hit 1 million all-time npm installs
of Node-RED. That's an incredible milestone for what still feels like our little
project.

![](/blog/content/images/2018/03/node-red-npm-installs.png)

It's hard to dig much into that number to understand more about where and how
Node-RED is being used. One thing we can say is roughly 45% of those installs are
happening within the [IBM Cloud](https://console.bluemix.net/catalog/starters/node-red-starter) - a fact we can infer from the install statistics
of the `node-red-bluemix-nodes` module. It also doesn't include people using the
version that comes pre-installed on the Raspberry Pi, unless they have used our
[update script](https://nodered.org/docs/hardware/raspberrypi) to get to the latest
version.

We track a variety of other statistics about the project to get a sense of how
the community is growing, for example the number of people signed up to the
mailing list and slack team. Whilst none is a definitive indicator by itself,
they all show a nice steady growth.


### 0.18 updates

We've had lots of great feedback on the projects feature we released in 0.18, but
there's lots still to do.

The most common problems relate to authenticating with remote git repositories.
There are some outstanding issues to work through - the stickiest relating to
HTTPS authentication on Windows. On the whole, if you use SSH keys, things should
just work.

We're also thinking about next steps for the Projects feature. The two hot topics
are:

1. how to make a Project a deployable artefact. The goal is to be able to clone
   a project, `npm install` to get its dependencies and then simply `npm start`
   to run it - without ever touching the editor.

2. how to have environment-specific settings for your nodes. For example, you may
   want to use a local MQTT broker when developing and testing locally, but when
   you deploy to a 'production' environment, you want to use your production
   broker. We already support using environment variables to allow dynamic configuration
   of nodes (a fact we really need to document), and we want to see how to better
   expose this via Projects.

### Updating the roadmap

The roadmap for 1.0 is still the overarching plan for what we are doing and it
will continue to evolve as things progress. The way we lined-up some of the
technical content hasn't quite panned out - for example, the Library redesign
didn't make it into 0.18 and we don't currently have an outlook for that particular
piece.

We need to put together a more concrete plan for 0.19 so we don't end up going
another 6 months before another milestone release. Ultimately the content of the
releases is shaped by feedback from the community and what contributions are made.

### Editor/Runtime Split

One of the most important features on the roadmap is splitting the editor and runtime
in to their own packages. This enables many different use cases for Node-RED.

It's also quite a hard problem to get right; to ensure the API we expose between
the editor and runtime is right. This is the item we've been focussed on over
the last couple of weeks. As with all major functional items, there's a [wiki page](https://github.com/node-red/node-red/wiki/Design%3A-Runtime-Editor-Split)
where we're working on the design. Right now there's more scribbled on paper
than there is on the wiki, but that will change over the coming days.


### Testing nodes

Mike Blackstock has taken a lead in helping standardise how 3rd parties can write
test cases for their nodes. The core nodes already had a test helper module which
Mike has extracted out into its own repository, [node-red-node-test-helper](https://github.com/node-red/node-red-node-test-helper).

It's a work in progress, but the hope is this will become an invaluable tool in
creating high-quality nodes.

If you want to find out more, come chat in the #testing channel on [slack](https://nodered.org/slack/).

### Flow Library updates

Mike has also been busy giving the [Flow Library](https://flows.nodered.org)
some much needed updates.

The page used to retrieve the complete list of all nodes and
flows every time someone loaded it. In the early days that wasn't a problem, but
as we now have well over 2000 things listed, it was about time we made that
initial page load much more efficient.

Thanks to Mike's work, it now loads the items a page at a time and makes for a much
quicker load. There's still some more tweaks to make on this, but it's a solid
starting point.

As if that wasn't enough, Mike also added the ability to give any node a rating
out of 5 - if you're logged in via the GitHub button. Over time this will let users
get a better sense of the quality of any particular node. We'll also look at how
we can expose the ratings in the editor's palette manage at some point.

We've added a 'Report this module' link to each node's page. If you have any concerns
about the content of a node, such as inappropriate or unsuitable material, this lets
you notify the admins to take a look. This is *not* about reporting bugs and seeking
help in using the node - those sorts of reports should be directed at the node authors.


### Cookbook

Finally, an appeal. We started the Cookbook a year ago as an effort to get lots of
simple recipes together that cover the basics of what you can do with Node-RED.

Over time, the hope is to expand it to cover more complicated recipes, but we're
keen to ensure we have the basics covered first.

Sadly we've not made as much progress as we'd hoped in filling up the cookbook.

If you're a keen user of Node-RED and wanted to give something back to community,
this would be a great way to get involved. Come over to the #docs channel on [slack](https://nodered.org/slack/)
and find out more.


### Learning more about Node-RED

We often get asked about how to get started with Node-RED and what material is
out there to help learn.

A couple of pointers to help get you started:

1. [Coursera : A Developer's guide to Node-RED](https://www.coursera.org/learn/developer-nodered) - from IBM.
   Part of a series of courses on IoT. *Disclaimer: I helped create this course*.

2. [Node-RED Programming Guide](http://noderedguide.com/) - from Mike and team
   at SenseTecnic. A series of lectures covering a wide range of topics.


If you know of other useful resources, please do share them with us. We want to
create a collection of links on [nodered.org](https://nodered.org) to help users
find this sort of thing.
