---
layout: blog
title: A Roadmap to 1.0
author: nick
---

With the 0.17 release out of the way, we've turned our attention to what comes
next. Rather than plow straight into writing code for the next set of features,
we decided to take a bit of time to plot out where the project is headed.

Using our [Trello whiteboard](https://trello.com/b/R0O3CSrI/node-red-whiteboard)
to track individual enhancements and the bigger 'epics' has been very useful for
showing the sorts of things we have in mind. But the Trello board lacks the
narrative that paints an overall picture from those individual cards.

#### On version numbers

We've also been thinking about version numbers. Since the start of the project,
we've followed semantic versioning rules. The version number is made up of three parts
major.minor.patch. The rules on when each part gets incremented are very simple:

 - Patch is incremented when you make backwards-compatible bug fixes
 - Minor is incremented when you add functionality in a backwards-compatible manner
 - Major is incremented when you make incompatible API changes.

That has given us the excuse to not worry about 1.0. We've been  focused on each
release as an incremental improvement to the previous one, trying our hardest to
ensure we don't make incompatible changes. So much so, a flow exported four years
ago from version 0.3 can still be imported and used in today's 0.17 release.

But a 1.0 release holds particular meaning. The SemVer specification says this:

> [How do I know when to release 1.0.0?](http://semver.org/#how-do-i-know-when-to-release-100)

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

There are plenty of users in production with Node-RED today - something we fully
endorse. But we also hear of users reluctant to go to production because we don't
have the fabled 1.0 version number.

So it is time to talk about 1.0.

#### Getting to 1.0

The sorts of questions we've been asking ourselves are: what will it take to get to the 1.0
release? What items from the whiteboard do we want get done first and in what order?

To help with this, we've identified a number of high-level themes we want to address:

 - Workflow - how an individual developer can be more productive
 - Collaboration - working within a team of developers
 - Extensibility - providing the right extension points and APIs to adapt Node-RED
 - Scaling - making it easier to create flows that can scale to handle workloads of increasing size
 - API Stability - providing a stable base that can be developed against for the long-term

Thinking about the features from the whiteboard in the context of those themes has
led us to this roadmap. Most of the individual items will be familiar to those of
you who have followed the conversations on slack or mailing list, but there are a
couple there that are haven't been discussed that much - such as Projects and the
new Node Messaging API.

![](/blog/content/images/2017/07//nr-roadmap-timeline.png)

You'll note that there are not committed timescales on this roadmap; it represents
a lot of development work and there are still unanswered questions on the final
designs. But our intention is to get to 1.0 by the end of the year.

The slides below walk through the roadmap in some more detail, and includes a lot
of design work around the UX changes they bring to the editor.

<script async class="speakerdeck-embed" data-id="f647c01eecd94eb0ba0c0a51bbd755ab" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

#### A starting point

This roadmap is a starting point for discussion within the community. Do you think
it gets us to the right place? Have we missed something?

All feedback is welcome - we rely on the community to help us keep the project
headed in the right direction. Get in touch on the [mailing list](https://groups.google.com/forum/#!forum/node-red)
or [Slack](https://nodered.org/slack) and let us know.

#### Find out more

Next Monday, July 24th, IBM is hosting a pair of events around Node-RED in San Francisco.
There's a hands-on workshop and a meet-up, where I'll talk more about this roadmap.

Both are free events and quick to register for - click the links below and come say hello!

 - Workshop: [Build IoT Apps Using Node-RED and IBM Watson](http://bit.ly/2tPA6na)
 - Meetup: [Distributed Ledgers, IoT and a Node-RED Deep Dive](http://bit.ly/2t6z1Kp)

After that, I'll also be at Node Summit through the week - with a session as part
of the JS Foundation's [Day Zero](http://www.nodesummit.com/day-zero/) schedule
and around the rest of the week if you want to catch up.
