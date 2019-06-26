---
layout: docs-user-guide
toc: toc-user-guide.html
title: Logging
slug: logging
redirect_from:
  - /docs/user-guide/logging
---

Node-RED uses a logger that writes its output to the console. It also
supports the use of custom logger modules to allow the output to be sent elsewhere.

<div class="doc-callout">
<em>Note</em> : if you are running as a service on the Raspberry Pi using our
<a href="/docs/hardware/raspberrypi">install script</a>, you can use the
<code>node-red-log</code> command to view the service log.
</div>

### Console logger

The console logger can be configured under the `logging` property in your
[settings file](settings-file).


~~~~js
// Configure the logging output
logging: {
    // Console logging
    console: {
        level: "info",
        metrics: false,
        audit: false
    }
}
~~~~

There are 3 properties used to configure the logger's behaviour:

#### `level`

Level of logging to be recorded. Options are:

- `fatal` - only those errors which make the application unusable should be recorded
- `error` - record errors which are deemed fatal for a particular request
- `warn` - record problems which are non fatal
- `info` - record information about the general running of the application
- `debug` - record information which is more verbose than info
- `trace` - record very detailed logging
- `off` - no log messages at all

Other than `off`, each level includes messages at higher levels - for example, `warn` level
will include `error` and `fatal` level messages.

#### `metrics`

When set to `true`, the Node-RED runtime outputs flow execution and
memory usage information.

Received and sent events in each node are output into the log.
For example, the following logs are output from the flow which has inject and debug nodes.

    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"8bd04b10.813f58","event":"node.inject.receive","msgid":"86c8212c.4ef45","timestamp":1489067873391}
    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"8bd04b10.813f58","event":"node.inject.send","msgid":"86c8212c.4ef45","timestamp":1489067873392}
    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"4146d01.5707f3","event":"node.debug.receive","msgid":"86c8212c.4ef45","timestamp":1489067873393}

Memory usage is logged every 15 seconds.

    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.rss","value":97517568,"timestamp":1489067784815}
    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.heapTotal","value":81846272,"timestamp":1489067784817}
    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.heapUsed","value":59267432,"timestamp":1489067784817}

#### `audit`

When set to `true`, the Admin HTTP API access events are logged. The event includes
additional information such as the end point being accessed, IP address and time stamp.

If `adminAuth` is enabled, the events include information about the requesting user.

    9 Mar 13:49:42 - [audit] {"event":"library.get.all","type":"flow","level":98,"path":"/library/flows","ip":"127.0.0.1","timestamp":1489067382686}
    9 Mar 14:34:22 - [audit] {"event":"flows.set","type":"full","version":"v2","level":98,"user":{"username":"admin","permissions":"write"},"path":"/flows","ip":"127.0.0.1","timestamp":1489070062519}

### Custom logging module

A custom logging module can also be used. For example, the `metrics` output may
get sent to a separate system for monitoring the performance of the system.

To use a custom logger, add a new block in the logging property of your
[settings file](settings-file):


~~~~js
// Configure the logging output
logging: {
    // Console logging
    console: {
        level: "info",
        metrics: false,
        audit: false
    },
    // Custom logger
    myCustomLogger: {
        level: 'debug',
        metrics: true,
        handler: function(settings) {
            // Called when the logger is initialised

            // Return the logging function
            return function(msg) {
                console.log(msg.timestamp, msg.event);
            }
        }
    }
}
~~~~

The `level`, `metrics` and `audit` properties are the same as console logging.

The `handler` property defines the custom logging handler. It is a function that
is called once at start-up, passing in the logger's configuration. It must
return a function that will get called with log messages.

Multiple custom loggers can be configured - the only reserved name is `console`.

#### Example logger

The following example adds a custom logger that sends metrics events to a
[Logstash](https://www.elastic.co/products/logstash) instance over a TCP connection.

It is a very quick and simple example - with no error handling or reconnect logic.

~~~~~js
logging: {
    console: {
        level: "info",
        metrics: false,
        audit: false
    },
    logstash: {
        level:'off',
        metrics:true,
        handler: function(conf) {
            var net = require('net');
            var logHost = '192.168.99.100',logPort = 9563;
            var conn = new net.Socket();
            conn.connect(logPort,logHost)
                .on('connect',function() {
                    console.log("Logger connected")
                })
                .on('error', function(err) {
                    // Should attempt to reconnect in a real env
                    // This example just exits...
                    process.exit(1);
                });
            // Return the function that will do the actual logging
            return function(msg) {
                var message = {
                    '@tags': ['node-red', 'test'],
                    '@fields': msg,
                    '@timestamp': (new Date(msg.timestamp)).toISOString()
                }
                try {
                    conn.write(JSON.stringify(message)+"\n");
                }catch(err) { console.log(err);}
            }
        }
    }
}
~~~~~
