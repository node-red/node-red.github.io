---
layout: docs-api
toc: toc-api-admin.html
title: GET /diagnostics
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "methods"
  - get diagnostics
---

Get the runtime diagnostics. Note that runtime diagnostics are available only if
`diagnostics` value is set to `enabled: true` in the `settings.js` file.


Requires permission: <code>settings.read</code>

### Headers

Header | Value
-------|-------
`Authorization` | `Bearer [token]` - if authentication is enabled

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | See example response body
`401`       | Not authorized | _none_

{% highlight json %}
{
  "report": "diagnostics",
  "scope": "basic",
  "time": {
    "utc": "Mon, 23 Jan 2023 20:15:08 GMT",
    "local": "1/23/2023, 8:15:08 PM"
  },
  "intl": {
    "locale": "en-US",
    "timeZone": "UTC"
  },
  "nodejs": {
    "version": "v16.16.0",
    "arch": "x64",
    "platform": "linux",
    "memoryUsage": {
      "rss": 106336256,
      "heapTotal": 36225024,
      "heapUsed": 33527912,
      "external": 1905248,
      "arrayBuffers": 145556
    }
  },
  "os": {
    "containerised": true,
    "wsl": false,
    "totalmem": 32841064448,
    "freemem": 28394344448,
    "arch": "x64",
    "loadavg": [
      1,
      1.01,
      0.89
    ],
    "platform": "linux",
    "release": "5.15.85-1-MANJARO",
    "type": "Linux",
    "uptime": 5554.97,
    "version": "#1 SMP PREEMPT Wed Dec 21 21:15:06 UTC 2022"
  },
  "runtime": {
    "version": "3.0.2",
    "isStarted": true,
    "flows": {
      "state": "start",
      "started": true
    },
    "modules": {
      "node-red": "3.0.2"
    },
    "settings": {
      "available": true,
      "apiMaxLength": "UNSET",
      "disableEditor": false,
      "contextStorage": {},
      "debugMaxLength": 1000,
      "editorTheme": {
        "palette": {},
        "projects": {
          "enabled": false,
          "workflow": {
            "mode": "manual"
          }
        },
        "codeEditor": {
          "lib": "ace",
          "options": {
            "theme": "vs"
          }
        }
      },
      "flowFile": "flows.json",
      "mqttReconnectTime": 15000,
      "serialReconnectTime": 15000,
      "socketReconnectTime": "UNSET",
      "socketTimeout": "UNSET",
      "tcpMsgQueueSize": "UNSET",
      "inboundWebSocketTimeout": "UNSET",
      "runtimeState": {
        "enabled": false,
        "ui": false
      },
      "adminAuth": "SET",
      "httpAdminRoot": "/",
      "httpAdminCors": "UNSET",
      "httpNodeAuth": "UNSET",
      "httpNodeRoot": "/",
      "httpNodeCors": "UNSET",
      "httpStatic": "UNSET",
      "httpStaticRoot": "UNSET",
      "httpStaticCors": "UNSET",
      "uiHost": "SET",
      "uiPort": "SET",
      "userDir": "SET",
      "nodesDir": "UNSET"
    }
  }
}
{% endhighlight %}

The response object contains the following fields:

Field          | Description
---------------|------------
`intl`         | The internationalization (i8n) language for the node-red instance
`nodejs`       | NodeJS version for underlying architecture / platform
`os`           | Operating System information and statistics for current memory usage
`runtime`      | Current Node-RED runtime information
`modules`      | Node-RED modules and their respective versions
`settings`     | Detailed description for the current settings of the node-RED instance

