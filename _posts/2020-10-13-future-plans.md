---
layout: blog
title: What's next with Node-RED?
author: nick
description: Having covered the release schedule in a previous post, we now look at the technical content in the roadmap for Node-RED.
---

Last week I presented at [Node-RED Con Tokyo](https://nodered.jp/noderedcon2020/index-en.html)
to talk about the future of the project. I spoke about the high-level goals for
project and what they translate to in terms of technical features in the roadmap.

This blog post is the written form of that talk - it provides the context that
is otherwise lacking from just looking through the slides.

<script async class="speakerdeck-embed" data-id="df4c972d06664bbe97b2e66897eba5c4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

---


In my [last post](/blog/2020/07/01/release-plans), I wrote about how we plan to
schedule our releases - with a new major versions being published to coincide
with the Node.js release schedule.

What I didn't touch on in that post is the technical side of the roadmap. Aside
from keeping up to date with Node.js, the question is what have we got planned
for the future of the project.

The roadmap for the 1.0 release gave us something to focus on - it set a reasonably
well-defined target for the project to get to. Looking beyond 1.0 is a much more
open-ended question - there isn't an equivalent end-point in mind.

We do have a set of goals of the project - things we know we want to achieve.
We can use those goals to identify and prioritise the technical features we're
going to work on in the coming releases.

In this post, I'm going share some of the technical features we have
planned for the project and how they fit in with our goals for the project's future.

But first I wanted to share what we see our goals as being.

### Who are our users?

To begin thinking about what the technical roadmap is for the project, we have
to take a step back and think about who our users are - who are we developing
Node-RED for?

The [community survey](https://nodered.org/about/community/survey/2019/) we did
last year gave us a good view of the community. Our users come from a very wide
range of backgrounds and experience. We have students who are just starting to
learn about programming. We have retired engineers who are getting back to
building things. We have experienced developers who appreciate the convenience
Node-RED provides over writing code. And we have everyone else in between.

A large proportion of our users are individuals who run Node-RED on personal devices -
a laptop, a Raspberry Pi or a virtual machine in the cloud. They are building
solutions for themselves - whether it's home automation, adding skills to their
Alexa or Google Home, or doing the types of online services like IFTTT can provide.

It's predominately these users who spend their time in the forum, discussing what
they’ve built, or helping answer questions from newcomers.

Another group of users come from the companies who have integrated Node-RED into
their own products and services. Hitachi, Siemens, Samsung, Particle and many others.
They have a different set of needs. They want to integrate Node-RED into their
existing platforms. They want to be able to offer a seamless experience to their
end users - hiding away the details of how Node-RED is being run or where the
flows are executed.

Understanding the different needs of these groups of users is vital to getting
the priorities right in the roadmap.

### Sustainability

There is another reason why we need to understand these different groups of
users. We have a responsibility to ensure Node-RED is a sustainable project - that
it has the resources it needs to continue delivering to our users. Sustainability
in open source is a hard problem.

Contributors typically come from two places; individuals who chose to invest their
spare time to the project and individuals who have a commercial interest in the
project and contribute as part of their day job.

As a Growth project of the OpenJS Foundation, we want to grow our contributor
base - getting more people involved with the central parts of the project.

Whilst some of that will come from individuals, we want to increase the commercial
adoption of Node-RED. This will help increase the commercial investment back into
the project itself.

### Project goals

As we think about the technical roadmap for the project, we have three goals:

 * Improve the experience for the individual developer
 * Increase commercial adoption of Node-RED
 * Improve the path to production for anyone wanting to use Node-RED


It's these goals that we should use to help us prioritise and focus our efforts
moving forward.

A lot of this will be familiar if you've followed the various discussions in the
forum or slack - but it's useful to bring it together into one place.

## Improving the Developer Experience

### Testing Framework

One of the most fundamental requirements for any software development is being
able to easily test the code. Whether that is unit-testing individual components,
or system-testing a larger piece.

This is an entire area that Node-RED does not provide much help to the user with.
Some testing can be done in the editor, using Inject nodes to create test messages,
and the Debug sidebar to check the results. But that’s quite a limited set of tools.
It's entirely manual testing and not suitable when you want to test against external
systems like databases or web apis, nor is it suitable when you want to automate
the testing as part of a automated Continual Integration workflow.

One approach would be to create traditional test cases in code; tests that can
run against the externals exposed by the flows. This has two major drawbacks;
it would be hard to do unit testing of internal components of the flows, and it
does not fit the ‘low-code’ idea of Node-RED very well.

We want our users who are not traditional software developers to be able to
create tests for their flows just as easily as anyone else can.

There is some initial design work on this item in our designs repository. The
high-level concept is to be able to define suites of test cases in the editor.
Then, for each node in a flow, you will be able to define the desired behaviour
of that node for each test case. The behaviour will be split into three phases:

* `beforeNode` - this phase is triggered when a node receives a message, but
  before the node is given the message. This can be used to validate the message
  arriving at the node has the expected properties.
* `testNode` - this phase can be used to define the behaviour of the node in
  place of the actual runtime node. This would allow the node to be ’stubbed’
  out, for example a node that writes to a database or interacts with an external
  system.
* `afterNode` - this phase is triggered whenever the node sends a message, but
  before the next nodes receive it. This can be used to validate the output of
  the node.

Any of these phases will be able to mark the test case as having passed or failed.
That means it would be possible to create test cases that span entire flows, or
that just focus on one or two nodes.

The editor will have a new sidebar that lists out the test cases, where they can
be run and have their results reported. We'll also provide a way of running the
test cases using just the command-line so they can be used as part of an automated
pipeline.


### Flow Linter

Alongside testing, there’s another type of tool that developers have come to
expect and rely on in modern development tools - linters.

Linters are tools that can analyse the code and generate recommendations, warnings
and errors based on what they find. From checking for basic syntax errors, to
ensuring a consistent format is used in a code base, linters play an important
role.

There has been some initial work on a Flow Linter from our friends at Hitachi,
and we’ll be looking to accelerate that work in the coming months.

The Flow Linter will be both command-line and editor based. The command-line
version will allow it to be used as part of deployment pipelines to ensure a
flow meets the required linting rules before it is integrated.

Within the editor, it’ll give feedback to the user over issues in their flow,
before they have even clicked the Deploy button.

It will be a pluggable tool, allowing custom linting rules to be written and
shared with the community - so if your organisation has a particular set of
requirements, or maybe you use some custom nodes that must be wired up in very
particular ways, the linter will help catch mistakes before they are deployed.

### Flow Debugger

One of the features that I am personally most excited to start working on is a
proper flow debugger.

Node-RED provides the Debug node to help the developer understand what is happening
in their flow. They are helpful tools, but they have their limits. You can only
debug at the points you have added a node into the flow. Where you have a flow
that involves multiple branches and timing events, it can be hard to see how
messages are flowing in each branch at the same time.

The Flow Debugger will allow the developer to set breakpoints throughout their
flow. When a message arrives at a breakpoint, the runtime will pause, messages
will stop flowing. The developer can then inspect the flow at different points -
to inspect the messages waiting to be delivered.

When running with the Debugger enabled, the user will be able to visualise the
performance of their flows - to see where time is being spent, or if there are
any bottlenecks that could be optimised.


### Exportable Subflows

We want to make it easier for users to create their own nodes and share them with
the community. The goal is to allow subflows to be published as proper node
modules that can then be installed just like any other node in the library.

Work is already well underway on this - there's a draft PR that adds basic
support for loading subflows into the runtime from a module.


### Projects

We have had the projects feature in Node-RED for a long time now - bringing the
ability to version control flows directly into the editor. But there’s more to be
done in this area.

The 1.2 release has introduced a new simplified git workflow - where changes are
automatically committed whenever the deploy button is clicked. That’s important
for users who are less experienced with Git version control - they will benefit
without having to know about committing changes themselves.

And there are other areas we need to improve:

 - *Managing project dependencies*. At the moment the editor lets you edit the
   dependencies yourself, and it tries to give some hints on what needs doing,
   but that whole user experience needs to be improved.
 - *Accessing earlier versions of a project*. Having a full history of changes
   is not much use if you can’t easily go back to an earlier version. It is
   possible to do on the command-line - but that isn’t the right answer if we
   want this to be accessible to all users within the editor.
 - *Adding `settings.js` to a project*. For a project to be a complete deployable
   artefact, it needs a settings file. At the moment, that has to be created and
   added to the project manually. There's more the editor could do to help with
   this - the hard part is managing the project's settings file versus the runtime
   settings file - but that's a discussion for another time.
 - *Adding a `Dockerfile` to a project*. A common pattern for deploying projects
   into a production environment is via some form of containerisation. Making
   this quick and easy to setup in the editor would be a big step forward - although
   very much an optional feature.

I’m sure there are other things we could be doing with the Projects feature to
make it much more powerful. As with everything on this roadmap, we’ll be looking
to the community for feedback to help expand on the details.

### Standalone Installer

Another area we want to improve is making it easier for users to get started with
Node-RED. At the moment, to install Node-RED a user has to install node.js and npm,
then run some commands they may not be familiar with, and they see a screenful
of output from npm - most of which will mean very little to them.

There are also the cases where a user doesn’t have a good internet connection -
or any connection at all where they want to install Node-RED.

To help address these problems, we’re going to create a standalone installer for
Node-RED. Built with Electron to generate native installers for all the common
platforms, this will be a way to install and use Node-RED as a native desktop
application.

There are existing projects that do this - including Saito-san's [Node-RED Desktop](https://sakazuki.github.io/node-red-desktop/).
We'll look to those projects for collaboration and inspiration as we move forward.

## Increasing commercial adoption

An important goal for the project is to increase its commercial adoption. It's
through this we can help increase the investment back into the project and help
increase its long-term sustainability.

All of the developer experience items feed into this as Node-RED will only get
adopted if there is a demand for it - so ensuring it is a delight to use and
provides the tools users want to use is vital.

But there are also a set of features that are of less immediate relevance to individual
users - but will play an important role when looking at running Node-RED at scale.

### Deploying Node-RED at scale

One very common question we get is around multi-tenancy - having multiple users
share a single Node-RED instance without getting in each other’s way.

Our long-stated recommendation has been that the node-red runtime is not suited
for multi-tenancy. This is down to a number of reasons. Node.js is a single-threaded
runtime - there is only one event loop that must be shared between all of the
flows in the runtime. If one user creates a flow that uses a lot of resources,
it could have a negative impact on the performance of the other flows. Any bugs
in that flow that lock up the event loop would stop everything else from running.
Similarly, we have no mechanism to isolate the global context of each flow.

This is why we have always said each user’s flows should be put in its own runtime
instance - and we have no immediate plans to change that recommendation.

But we recognise that hands the responsibility for figuring out how to manage
multiple instances over to those who want to integrate Node-RED into their
environment. That can be quite a barrier to adoption and we don’t currently provide
any guidance on how to do it.

To begin with, we want to understand how the existing users of Node-RED have
approached deploying it at scale. We know there are lots of different possible
models and approaches taken today. We want to get a better view on questions like
what stacks are being used - is it Kubernetes, OpenShift, Docker Compose or some
other orchestration technology. We want to understand what approaches companies
have taken to manage their user's flows. Do users edit their flows in a ‘live’
environment or are there separate development and production runtimes.

This will then feed into a set of architectural patterns we'll create for deploying
Node-RED at scale. In the first instance, those patterns may be more about
documentation than running code. Over time, there may prove to be some useful
components we can develop that would fill in some of the gaps.


### Scalability of flows

As workloads increase, we need to ensure the Node-RED runtime can be scaled to
meet the demand.

As with the multi-tenancy question, we've traditionally deferred this question to
say you can horizontally scale your flows by running multiple instances of the runtime,
with some kind of load balancing in front.

That answer remains largely the same, but there are certainly things we can do
to help with the overall scalability.

We've talked about the idea of a distributed Node-RED architecture many times in
the past. This is where a flow drawn in the editor can be deployed across multiple
runtimes and devices. It is something we've been slowing working towards and we'll
continue to do so.

It's a model that can also be used in the context of scalability. For example,
being able to deploy multiple copies of a flow across multiple runtimes.

In 1.2 we’ve added the hooks API to support pluggable message routing. This will
allow custom code to be added to the message routing between nodes. So if a flow
spans two different runtimes, or different parts can be scaled independently,
that custom code could be used to route the messages between the runtimes.

In 1.0 we added the Groups feature in the editor. The plan is, in a future release,
to allow a group to have custom meta data associated with it. A user could then
create a flow, and then group the nodes according to *where* they should be deployed,
or *how* they can be scaled. That group meta data could then be used by the
messaging routing to handle getting the messages to where they need to be. Aside
from the group meta-data, the only other missing piece is a way to deploy the
flow across the multiple runtimes.

The new hooks api we introduced in 1.2 for the message routing will get extended
in a future release to support hooks at other points of the runtime lifecycle -
such as when the deploy button is pressed.

The key part here is we're adding the components and APIs needed to build a
distributed Node-RED. We don't plan at this stage to produce an out-of-the-box
Distributed Node-RED version - but all the parts will be there to do so.

### Customising the Node-RED flow appearance

Another aspect is looking at how easy it is to customise the appearance of Node-RED.
We already provide ways to add custom CSS and modify some aspects of the editor,
but that can only go so far.

We have had occasional requests to be able to customise the appearance of the
flow itself - the shape and design of the nodes.

We plan to make the drawing of flows a pluggable component of the editor. It is
only a concept at this stage - I couldn’t say exactly how it would work, but the
idea would be that when the editor needs to draw a node on the screen at a given
position, it calls out to the custom code that does the work needed.

To be clear, this isn't about allowing individual nodes to change their own
appearance - its about customising the appearance of the entire flow in a consistent
way.



## Feedback

With all of these features, there is a significant amount of development work
needed. As an Open Source project without a large team of full-time developers,
it isn't possible to put a time-scale on this work as a whole. These items are
only the headlines for future releases - there will be countless smaller
enhancements and features throughout the editor and runtime.

If there’s anything here you're excited by, that you'd like to get mored involved
with, then please do come talk to us - either on the [forum](https://discourse.nodered.org)
or on [slack](https://nodered.org/slack).

