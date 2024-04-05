---
layout: about-single
title: Release Plan
slug: releases
---

_Updated: 2024-01-03_

This plan is a guide for how the project plans to schedule upcoming releases, taking
into account the release schedule of the underlying Node.js runtime.

![](release-plan.png)

The project aims to make a new major release around April each year. This aligns
with when versions of Node.js reach their end-of-life and enables us to drop support
for them.

The active Node-RED stream will get regular minor releases (for example 4.0 -> 4.1)
containing new features as well as maintenance releases (for example 4.0.1 -> 4.0.2)
as and when they are needed.

When a new major version is released, the previous version enters maintenance mode
for an extended period of time. During this time it will only receive bug fixes
and security updates.

This proposal means:

 - We have a regular cycle of releases - getting new features into the hands of users.
 - We have a schedule to help us prioritise and plan backlog items.
 - We can provide longer-term stable releases with a well-known end of life.
 - We have a plan that enables us to make potentially breaking changes once a year.


Release | Initial         | Maintenance Start    | End-of-life
--------|-----------------|----------------------|-----------------
4.x     | *2024-04-30* *  | *2025-04-30* *       | 2026-06-30
3.x     | 2022-07-14      | *2024-04-30* *       | 2025-06-30
2.x     | 2021-07-22      | 2022-07-14           | 2023-06-30
1.x     | 2019-09-30      | 2021-04-30           | 2022-06-30

_Dates are subject to change_

References:
 - [Blog post: Going beyond Node-RED 1.x](https://nodered.org/blog/2020/07/01/release-plans)
 - [Node-RED Release Plan source](https://docs.google.com/spreadsheets/d/1swMH5DXVposBIdnm6Q3BvIplMjAZSZVnU_cRS0jAPjY/edit)
 - [Node.js Releases](https://nodejs.org/en/about/releases/)
