---
layout: docs-faq
toc: toc-user-guide.html
title: Supported Node versions
slug: node versions
---

_Updated: 2025-12-01_

Node-RED currently recommends **Node 22.x**.

We try to stay up to date with Node.js releases. Our goal is to support
the [Maintenance and Active LTS releases](https://nodejs.org/en/about/releases/).

We do not recommend using the odd numbered Node.js versions - we do not
routinely test against them.

Node-RED Version | Minimum Node.js Version
---|---
5.x | 22
4.x | 18
3.x | 14
2.x | 12

With such a large community of 3rd party nodes available to install, we cannot
provide any guarantees on what they support. We rely on the community to keep
up to date.

### Installing Node.js

Node [provides guides](https://nodejs.org/en/download/package-manager/) for
installing Node.js across a wide range of Operating Systems.

If you are running on a [Raspberry Pi](../hardware/raspberrypi) or
[BeagleBone Black](../hardware/beagleboneblack), please read the guides
we provide for those devices.

### Using `nvm`

[nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) is a tool that can
help manage Node.js installations.

It is convenient when running Node-RED as an individual user, but it is *not*
recommended if you want to run Node-RED as a system-level service. This is because
`nvm` uses scripts in a user's profile to setup its environment. When running
as a service, those scripts do not get used.

### Upgrading Node.js

If you change the version of Node.js you are using, you may need to rebuild
Node-RED's dependencies as well as any nodes you have installed. This is because
some of them contain binary components that must be rebuilt to be compatible with
the new Node.js version.

This can be done using the command `npm rebuild` - but it must be run in the right
directory.

There are two places it should be run:

1. In your Node-RED user directory, `~/.node-red` - this is where any additional
   nodes you have installed are.
2. In the directory you installed Node-RED

If you installed Node-RED as a global module and are not sure where that put it,
you can use the command `npm list -g --depth 0` to find where your global modules
are installed.
