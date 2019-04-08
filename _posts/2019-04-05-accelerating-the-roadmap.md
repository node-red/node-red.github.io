---
layout: blog
title: Accelerating the journey to 1.0
author: nick
description: Version 1.0 is coming. Soon.
---

Our [roadmap to version 1.0](/blog/2017/07/17/roadmap-to-1-dot-0) was published
in July 2017. It described a set of themes we wanted to address within the project,
along with the functional items we decided were necessary to get there.

Since then we've made gradual progress through the roadmap with three milestone
releases containing many of its features. But there are still a number of features
outstanding and at the current course and speed, it would be another 6 months to
get them done.

Having shipped the 0.20 release with the runtime/editor split work complete, we've
been discussing how we can get to 1.0 sooner. We've been challenging the
assumptions that underpinned the roadmap to see if they still held true.

The key realisation is that 1.0 is not the end of the project. It is just another
release, albeit one that rightly signifies the maturity of the project.

The main concept with the 1.0 roadmap was to get to a point of functional 'completeness'
and API stability.

### Functional 'completeness'

This means we've addressed the major gaps of functionality that users have fed
back to us. This is focussed on the larger items - pieces that have to be addressed
in the core runtime, rather than as incremental enhancements to the existing nodes.

Projects (0.18), Persistable Context (0.19) and Subflow Instance Properties (0.20)
all fall into this criteria. Each of those addresses very specific requirements
and greatly enhance what users can build with Node-RED.

### API Stability

Whenever we add new features to the runtime, they introduce new APIs and extension
points. As more users look to integrate Node-RED with their existing applications,
or to customise it for their own needs, there is a real need to have a stable API.

The Runtime/Editor split (0.20) work was the major item here - it has exposed
more of the internal components of Node-RED with APIs that can be reused. There's
more to be done to properly document those APIs and provide more concrete examples
of how they can be used, but the technical work has been done.

### What's left?

There are three items from the original roadmap that have not yet been delivered:

 - Library Redesign - an overhaul of the built-in library experience; one of the
   oldest bits of the Node-RED user experience that has not had much attention.
 - Pluggable Message Routing - the ability to plug custom code into how messages
   are passed between nodes.
 - New Message API - an update to how nodes handle messages that will enable the
   runtime to track better what nodes are doing and enable features such as automatically
   timing out a node.

Work has started to various degrees on all three, from high-level design work to
actual code contributions. But they all have more work to be done.

There are also a number of threads of activity on items that didn't feature in
the original roadmap, including:

 - Subflows Properties UI - allow a subflow to define its own custom UI to set
   its instance properties
 - Integrated Flow Testing - being able to define test cases for your flows in the
   editor and have a test-runner that can be used to validate them
 - Flow Linter - a command-line tool that can be used to validate a flow based
   on a set of rules about what a flow should and shouldn't do

The risk we have, with all of this activity going on, is that we keep finding
'one more thing' to do before getting to 1.0. Each new item brings a risk of
destabilising what we have and adding more time into the plan.


### Changing the plan

With all of this in mind, we're going to do some reprioritisation to ensure we're
focussed only on what is absolutely necessary for 1.0.

Here's what that means to the remaining roadmap features:

#### Library Redesign

This will provide a much needed cosmetic improvement to how users interact with the
library in the editor, but won't introduce any new capabilities. The underlying
APIs will largely remain the same.

We will not add the ability to plug-in other library sources in the 1.0 release, but
the UI changes will keep that in mind for the future.

#### Pluggable Message Routing

This feature is no longer in the plan for 1.0. By itself, it doesn't add any value
to users. The real value comes with the things that can then be plugged in - such
as an interactive flow debugger. Rather than rush through a design for this item
it makes sense for it to be done after 1.0, when we can also work on some concrete
uses for it in parallel

#### New Messaging API

We have had a design for this agreed for some time and there's also a pull-request
that implements that design sat waiting. But in the last couple of weeks we've
identified some concerns that the new API is too big of a change for the value
it would bring. With 1900+ node modules published, we need to be careful over
any change we introduce in this area. An alternative design is being discussed
which is a much more modest change that provides most of the functionality needed.

#### Non-functional Changes

The 1.0 release is an opportunity to make a splash around the project. That will
bring new users to the community so we need to make sure we have everything in
place to introduce them to Node-RED and help them get started.

So alongside the technical work for 1.0, we also want to give the website a clean
up, review our documentation and get more content into the cookbook. If you're looking
for ways to contribute to the project, but not sure about jumping into the code,
there's plenty to help with in this area.

### When is 1.0?

The intention is for the *next* milestone release of Node-RED to be version 1.0.

The target is to have the first 1.0-beta release in mid-May with the final release
available in early June.

### And then?

As we said at the start, version 1.0 is not the end of the project - its the
next step forward in the project's growth.

Alongside the release we'll have a clear roadmap of the ongoing work to take us
to the next milestone and beyond.

We'll also have the results of our Community Survey to feed back into the plan -
if you haven't completed the survey yet, [please do](https://tiny.cc/NodeRED2019Survey)!
