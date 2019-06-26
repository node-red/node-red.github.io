---
layout: aboutSingle
title: Contributing to Node-RED
slug: contributing
---

The starting point for any contribution should be a discussion with the community.
Our preferred mechanism for that is the project forum, although discussions
on the Slack team are equally valid. This serves two purposes:

 - it reaches a wide audience, including those who are not GitHub users.
 - It allows feature requests that are actually support requests or duplicate
   items to get filtered out or rationalised and handled before being taken any
   further.

Once the community discussion reaches a conclusion, the request is either dropped
or taken forward.

For a feature request from a member of the community who is not in a position to
also contribute the design or code, an item is added by a Committer to the
[Trello Whiteboard](https://trello.com/b/R0O3CSrI/node-red-whiteboard). The
Whiteboard acts as a backlog of features that can be drawn on when prioritising
work.

If an item has a Contributor to do the work, the next step will depend on the nature
of the change.

If it is a well-defined feature that has limited impact - such as adding a new
option to an existing node - an issue should be raised in the appropriate
repository with the `feature` label applied. The issue should provide a
description of the feature and any key design points that are needed.
This issue can then be used to help refine the proposal. The issue should
clearly identify who is working on it - this is to avoid accidental duplication
of work and ensure there is a focal point for the work.

If it is a larger scoped feature that may require multiple pull-requests to
implement, or has a great impact to the end user, a design note should be
created in the [node-red/designs](https://github.com/node-red/designs) repo.

Once the design has been approved and moved to the `in-progress` state, an issue
should be raised in the appropriate repository with the `feature` label applied.
If the design identifies multiple stages of delivery for the feature, an issue
should be raised for each stage as needed. The issues should reference the design
note. Each issue should have a milestone set if it is planned for a particular release.

At some point a pull request will arrive. This will go through the normal review
processes. The Committer community have a responsibility to review the PR in a
timely manner. For any significant changes, the PR should be allowed to sit on
the list for at least 48 hours - with consideration for weekends and other
holiday periods. This gives all committers a fair chance to review the PR, or at
least register their desire to give it a proper review, regardless of their
timezone.

If there are no outstanding objections, a Committer will accept the PR.

If there are objections, a suitable consensus amongst the Committers should be reached.

Once all PRs relating to an issue have been resolved, the issue can be closed.

Once it has been merged, the corresponding feature issue should be
closed. If there is a corresponding design note, its history section should be
updated to reflect where/when the item was delivered.


### Pull-Request Requirements

Any pull-request that introduces a code change is expected to meet certain
criteria before it will be accepted:

1. All committers to the PR must have signed the JS Foundation CLA. The project
   cannot accept any changes from unknown committers.

2. It should not be the first time the project is aware of the contribution. As
   described above, any code contribution should have already been discussed with
   the community and an Issue raised.

   If the PR contains a bug fix, it can still be accepted as long as there are no
   controversial changes.

   If it is a larger change, it may get rejected until the proper contribution
   process is followed. Whilst we do not want to discourage contributions, we do
   want to avoid shortcutting the proper review/discussion process.

3. The build tests should pass cleanly; they are run automatically on each PR and
   reported back. This covers code style and linting as well as unit and functional
   tests.

4. The changes must have appropriate Test coverage included. The core project has
   a goal to maintain over 90% code coverage. If a PR causes the code coverage to
   decrease it will be rejected unless there is a good reason provided.

The project places no requirements on what development methodology is used to
make the code change prior to raising the PR. The project places high value on
having good test coverage and documentation.

### Git Workflow

The following workflow is used in git for the main project repositories.

As in traditional git workflows, multiple branches are used for different streams
of activity. The following describes how we use it today.

 - `master` - this branch contains the latest shipped release of node-red, plus
   any additional bug fixes that have been made since. At any time, this branch
   could get shipped as the next maintenance release. At the time of writing,
   this contains 0.16.2 and a few fixes that will be released as 0.16.3 at some point.
 - `dev` - this branch contains the development work on the next milestone release.
   This is where new features are developed.
 - Larger features get developed in their own branches and merged to the
   development branch as and when the feature is sufficiently stable for wider
   consumption.

### Tools

The project uses a number of tools to support its activities. The following list
is a current reflection of what is used and in what capacity.


 - [Forum](https://discourse.nodered.org)

   This is the main discussion venue for the project. Anyone can join the forum.

 - [Slack](https://nodered.org/slack)

   For active, real-time, conversations, slack can be more productive than the
   forum. Anyone can join the slack team. The `#dev` channel is used for discussions
   on project development.

 - [Trello - Whiteboard](https://trello.com/b/R0O3CSrI/node-red-whiteboard)

   High level tracking of ideas and features. This is where items are captured
   into the backlog that are considered enhancements to existing features or
   larger "epic" items.

   It is used by the TC to provide a sense of priority across the items. Anyone
   can view the board. Committers have write access.

 - [Trello - Documentation](https://trello.com/b/m2mBMUYj/documentation)

   A separate board is used for documentation tasks that are not tied to specific
   code changes. This helps to ensure we have the right documentation for the
   different types of user/developer/contributor. Anyone can view the board.
   Committers have write access.

 - [GitHub - code](https://github.com/node-red/node-red)

   Version Control of the project source code. Anyone can clone or fork a
   repository; there are no private repos. Committers can apply commits to a
   repository.

 - [GitHub - issues](https://github.com/node-red/node-red/issues)

   Reporting of bugs/issues and tracking of feature development. Anyone can
   report an issue. Committers can "own" an issue.

 - [GitHub - pull requests](https://github.com/node-red/node-red/pulls)

   How any contribution is made to a repository. Anyone can raise a pull-request.
   The process for doing so is described separately.

 - [GitHub - wiki](https://github.com/node-red/node-red/wiki)

   Each repository has a wiki associated with it. They are used as working spaces
   to develop designs, ideas and documentation in a collaborative way.

   In particular, the core repository wiki has a set of [Design Notes](https://github.com/node-red/node-red/wiki/Design-Notes)
   pages. These are where designs can be developed and feedback sought.

   The wiki has no access control; anyone can make a change. But changes should
   only be made in collaboration with those who are actively working on a page.
