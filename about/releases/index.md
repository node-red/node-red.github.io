---
layout: about-single
title: Release Plan
slug: releases
---

_Updated: 2020-07-01_

This plan is a guide for how the project plans to schedule upcoming releases, taking
into account the release schedule of the underlying Node.js runtime.

![](release-plan.png)


The active Node-RED stream (1.x) will get a new minor version release (for example, 1.1 ->  1.2)
every three months. Maintenance releases (for example 1.1.0 -> 1.1.1) will continue
to happen as and when they are needed.

At the end of April 2021, when Node 10.x reaches its end-of-life, we will publish
Node-RED 2.x that will *drop* support for both Node 8.x and Node 10.x.

The 1.x stream will then enter maintenance mode. It will only receive bug fixes
and security updates. New features could get back-ported from 2.x if there was
a very good reason to do so as well as people available to do the work.

The 2.x stream will continue in active development with a minor release every
three months or so until April 2022 when Node 12.x reaches its end-of-life. We
then publish Node-RED 3.x and the cycle continues. The 1.x stream will reach its
end-of-life soon after the 3.x release. The exact timing of that will be something
we will need to discuss further.

This proposal means:

 - We have a regular cycle of releases - getting new features into the hands of users.
 - We have a schedule to help us prioritise and plan backlog items.
 - We can provide longer-term stable releases with a well-known end of life.
 - We have a plan that enables us to make potentially breaking changes once a year.


Release | Initial     | Maintenance Start    | End-of-life
--------|-------------|----------------------|-----------------
1.x     | 2019-09-30  | 2021-04-30           | 2022-06-30
2.x     | 2021-04-30  | 2022-04-30           | 2023-06-30
3.x     | 2022-04-30  | 2023-04-30           | 2024-06-30

_Dates are subject to change_

References:
 - [Blog post: Going beyond Node-RED 1.x](https://nodered.org/blog/2020/07/01/release-plans)
 - [Node-RED Release Plan source](https://docs.google.com/spreadsheets/d/1swMH5DXVposBIdnm6Q3BvIplMjAZSZVnU_cRS0jAPjY/edit)
 - [Node.js Releases](https://nodejs.org/en/about/releases/)
