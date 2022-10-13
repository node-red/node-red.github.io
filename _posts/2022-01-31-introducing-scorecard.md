---
layout: blog
title: Introducing the Node Scorecard
author: nick
description: Checking the quality of nodes in the ecosystem
---

Last year we asked the community what frustrations they were experiencing as both
users and creators of 3rd party nodes. One of the common themes was that it was
hard to judge the quality of a node just from looking at its page on the [Flow Library](https://flows.nodered.org).

Based on that feedback, we're now introducing Node Scorecards.

The scorecard provides a summary of a Node across a range of things such as whether
it follows our naming guidelines, does it have a valid license applied and does it
clash with other packages in the library.

When we first introduced the Flow Library, we chose not to act as gatekeepers to
what can be shared, beyond some very basic checks on the nodes. The scorecard
doesn't change that, but it does help start to highlight where a node may need some additional work to meet the recommended best practices.

We’ve been running the tool against new submissions to the Flow Library for a
couple months now so there are scorecards for many of the recently updated nodes.
You'll now see a link to 'View scorecard' in the sidebar of a node's page on the
library, along with a summary of the scorecard.

![](/blog/content/images/2022/01/node-page.png)

Click through gives you a more detailed view of the scorecard - listing out all
of the checks made. You can find out more about the purpose of each check by clicking
on the i link on the right hand side.

![](/blog/content/images/2022/01/node-scorecard.png)


### Changing our recommended naming convention

As part of the work to improve the overall quality of the Flow Library, we're making
a change to our [naming guidelines for node modules](/docs/creating-nodes/packaging#naming).

Previously, we asked that if a module's name started with `node-red-`, that it
use `node-red-contrib-` to distinguish it from modules maintained by the core project.

We now recommend that *newly published* modules use a [scoped name](https://docs.npmjs.com/cli/v8/using-npm/scope) - such as `@myScope/node-red-sample`. That can be your own user scope, or an organisation scope.

If you use a scoped name, there are no further requirements on the name. You could
use `@myScope/node-red-sample` or just `@myScope/sample` - although having `node-red`
in the name does help to associate the module with the project.

If you are forking an existing package to provide a fix, you can keep the same name but
released under your own scope. But please keep in mind, forking should always be a
last resort if the original maintainer is not responsive to your contributions.

We won't be asking anyone to republish their existing modules under this new
naming convention, but the scorecard will flag up any newly added modules
that don't follow this new convention from today.

### Node Developers

The tool underlying the scorecard is [`node-red-dev`](https://www.npmjs.com/package/node-red-dev) - a new command-line tool that
developers can run locally against their own code to check for any possible issues
before publishing to npm. Many of the checks are quick and easy to fix - much better
to do so before sharing with the community.

You can run the tool either against a path on your local machine or against a package already published to npm using the appropriate flags, and you’ll get the results in the console

![](/blog/content/images/2022/01/node-red-dev.png)

### The Future

This is the first step in improving the quality of our node ecosystem, over time
we will add more checks to the scorecard. It doesn't currently examine the code
of a node, but that is certainly something that could be explored.

There's also a lot more that `node-red-dev` could do for Node Developers beyond
the scorecard check. For example, using it to bootstrap development of a new
node module, with all of the best practices pre-applied.

If that's something you're interested in contributing to, please do come talk to
us in the [forum](https://discourse.nodered.org).
