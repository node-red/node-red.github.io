---
layout: docs-user-guide
title: Usage Telemetry
slug: telemetry
---


Starting with the 4.1.0 release, Node-RED gathers anonymous usage information once
a day and shares it with the Node-RED team. In return, Node-RED will notify the user
when there is a new version available.

This information is only shared with the Node-RED team once the user has opted
into sharing their information. If the user declines to share their information,
nothing is sent back to the team.

### Why?

As with all software, it is important to keep it up to date. With legislation
such as the EU's [Cyber Resilience Act](https://digital-strategy.ec.europa.eu/en/library/cyber-resilience-act)
on the horizon, we want to take a proactive approach to help users keep their Node-RED
environments up to date and secure.

The Usage Telemetry serves two purposes:

1. It allows us to notify users within the application when there are updates available,
2. It allows us to get a better understanding of Node-RED usage; what versions are being used, what operating systems are favoured.

Historically, the only measures we've had around the size and scale of the Node-RED
user-base have been secondary indicators, such as high-level statistics provided
by npm and docker, or the general level of activity on the community forum. This does
not give us much useful information to help understand Node-RED usage.


### What data is collected?

With the 4.1.0 release, the collected information is:
 - A randomly generated instance identifier to allow us to de-duplicate reports
 - Node-RED version
 - Node.JS version
 - OS type/release/architecture

It does **not** contain:
 - Any personal information
 - Any flow configuration information
 - Any user-specific information related to security
 - Any information outside the scope of Node-RED

### How is the data collected?

If the user has opted to receive update notifications, a task will run 30 minutes after
Node-RED starts (or when they opt-in), and every 24 hours after that.

The data is sent over HTTPS to an endpoint hosted by the Node-RED project.

### What happens to the data?

The reports are aggregated into a daily record of usage. The individual reports
are kept for up to 90 days.

### Who has access to the data?

The raw data is only accessible by the core Team Committers.

The aggregated data will be made available on a public dashboard for public
consumption. _Note_: At the time of writing, we have not yet released this feature,
so we have very little data to start building the dashboard with. Once it is available,
this document will be updated to link to it and it will be publicised within the community.

### How do I opt out?

We hope you'll appreciate the value of knowing when there are updates available, and that
by opting in, you'll help us maintain the project.

However, if you want to opt out, there are a number of ways to do so.

#### Editor Settings

The first time you open the editor for Node-RED 4.1 or later, if you have not
already opted in or out, you will be asked if you are willing to receive update notifications.

You can change your preference via the Editor Settings dialog at any time.
#### `settings.js` file

You can also enable/disable telemetry via your settings file.

If you have a pre-existing settings file, you will need to add a `telemetry` section.
For new installs of Node-RED, the default settings file already has this section, but
with the `enabled` option commented out. Remove the `//` at the start of the line
and change the value to `false`:

```
    telemetry: {
        enabled: false,
        /**
         * If telemetry is enabled, the runtime will log a message when an update is available.
         * The editor will also notify the user if a new version of Node-RED
         * is available. Set the following property to false to disable this editor notification.
         */
        updateNotification: true
    },
```

#### Other

You can also disable telemetry using the `--no-telemetry` command-line flag, or by setting
`NODE_RED_DISABLE_TELEMETRY` environment variable.

### Update notification

With the usage telemetry feature enabled, in response to sending the information, Node-RED
is notified when there is a new version available. This will generate a notification
in the editor to help you know when it's time to upgrade.

This notification can be disabled via the `telemetry.updateNotification` setting in the
settings file; it cannot be disabled from within the editor.

The runtime will also log when an update is available; this cannot be disabled.

