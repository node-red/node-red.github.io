---
toc-index: 3
layout: default
title: Writing Functions
---

The Function node allows arbitary code to be run against the messages that are
passed in, and then return zero or more messages to continue the flow. 

The message is passed in as a JSON object called `msg`. By convention it will
have a `msg.payload` property containing the body of the message. Some nodes
also attach a `msg.topic` property - a hangover from Node-RED's MQTT origins.

Other nodes may attach their own properties to the message, and they should be
described in their documentation.

### Writing a Function

The code entered into the Function node represents the *body* of the function.
When a message arrives, the code is wrapped into a full function declaration and
then run within a secure sandbox.

The most simple function simply returns the message exactly as-is:

    return msg;


If the function returns `null`, then no message is passed on and the flow ends.

The returned message object does not need to be same object as was passed in;
the function can construct a completely new object before returning it. For
example:

    var newMsg = { payload: msg.payload.length };
    return newMsg;
    
#### Multiple Outputs ####

The function edit dialog allows the number of outputs to be defined. If there
is more than one output, an array of objects should be returned. Each element
of the array maps to the corresponding output.

This makes it easy to write a function that sends the message to different
outputs depending on some condition. For example, this function would send
anything on topic `banana` to the second output rather than the first:

    if (msg.topic == "banana") {
       return [ null, msg ];
    } else {
       return [ msg, null ];
    }

Combining with the earlier example, the following example passes the original
message as-is on the first output, and a message containing the payload length
on the second output:

    var newMsg = { payload: msg.payload.length };
    return [msg, newMsg];

#### Multiple Messages ####

A function can return multiple messages on an output by returning an array of
objects within the returned array. When multiple messages are returned for an
output, subsequent nodes will receive the messages one at a time, in the order
they were returned. In the following example, `msg1`, `msg2`, `msg3` will be
sent sequentially to the first output. `msg4` will be sent to the second output.

    return [ [ msg1, msg2, msg3 ], msg4 ];

    
The following example splits the received payload into individual words and
returns a message for each of the words.

{% highlight javascript %}
    var outputMsgs = [];
    var words = msg.payload.split(" ");
    for (var w in words) {
        outputMsgs.push({payload:w});
    }
    return [ outputMsgs ];
{% endhighlight %}

#### Context ####

Aside from the `msg` object, the function also has access to a `context` object.
This can be used to hold data between invocations of the specific function.

The following example maintains a count of how many times the function has been
run:

    // initialise the counter to 0 if it doesn't exist already
    context.count = context.count || 0;    
    context.count += 1;
    // make it part of the outgoing msg object
    msg.count = context.count;

The context object is *not* persisted across restarts of Node-RED.

#### Global Context ####

There is also a global context available that is shared by, and accessible to
all functions:

    context.global.foo = "bar";   // this is now available to other function blocks.

The global context can be pre-populated with objects when Node-RED starts. This
is defined in the main *settings.js* file under the *functionGlobalContext*
property.

For example, the built-in `os` module can be made available to, all functions:

    functionGlobalContext: {
        osModule:require('os')
    }

at which point, the module can be referenced within a function as 
`context.global.osModule`.

#### Other objects ####

The Function node also makes the following object available:

* `console` - useful for making calls to `console.log` whilst debugging
* `util` - the Node.js `util` module
* `Buffer` - the Node.js `Buffer` module


