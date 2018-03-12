---
layout: blog
title: Version 0.17 released
author: nick
---

Node-RED 0.17 is now available to [download](https://github.com/node-red/node-red/releases/download/0.17.0/node-red-0.17.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

For the Raspberry Pi, 0.17 will not be made available via the standard
Raspberry Pi Jessie repositories. See the [Raspberry Pi documentation](https://nodered.org/docs/hardware/raspberrypi#upgrading)
for how to upgrade if you are still on the pre-installed version.

---

This release has been a while in the making, but comes to you with plenty of useful
new features. There are over 300 commits across the code base, with a record 20
different contributors.


### TL;DR

 - Improvements to Debug panel - copying message paths/content and better filtering
 - Tooltip labels on node ports
 - A new style guide for node help text
 - Better tools for editing JSON, Buffers and JSONata expressions
 - A new settings panel pulling together customisations of the editor...
 - ... including custom keyboard shortcuts
 - Updating nodes via the palette manager
 - More options for the Split/Join nodes
 - File upload in the HTTP In node amongst other updates
 - Support for OAuth/OpenID schemes to secure the editor
 - Lots of other things you should read about below!

### Editor Updates

#### Even better Debug panel

Building on the improvements we made last time around with the Debug sidebar, we've
continued to make it even more useful.

![](/blog/content/images/2017/06/debug-tools.png)

When you hover over any element of a debug message, you get a mini-toolbar that
gives you some actions to take. The first button will copy the path to that message
element to your clipboard. For example, in the screenshot above, it will copy
`payload["First Name"]`. This can then be pasted anywhere you might need to
reference that element, such as in a Change node.

The second button will copy the value of that element - again, in this example,
you'd get `Fred`. If the element is an Object or Array, you'll get the JSON
encoded version.

The third button lets you 'pin' this message element. When another message arrives
from the same Debug node, it will be automatically expanded to reveal all pinned
elements.

The filtering options have also been expanded. As well as the existing options
to filter based on which flow you are looking at, you can filter the view to show
particular nodes.

![](/blog/content/images/2017/06/debug-filter.png)

#### Port Labels

All node ports can now have tooltips that appear when your mouse hovers over them.
A node can define its own labels as part of its definition or a user can specify
custom labels. For example, the Switch node will automatically create labels that
tell you what rule applies to each output.

![](/blog/content/images/2017/06/switch-labels.gif)

The node editor has a new 'port labels' section where you can provide your own
labels for any node.

![](/blog/content/images/2017/06/switch-labels-edit.gif)



#### Node information panel

The information sidebar has had a general tidy up and we've introduced a
[style guide](http://nodered.org/docs/creating-nodes/help-style-guide) for node
help text. Having a more standard structure for the information a node provides
will make it easier for users to understand how to use any particular node.

If you have published your own nodes, we strongly encourage you to update them to
follow the style guide.

#### Expression/JSON/Buffer editors

The `typedInput` common widget we provide has been extended to support more types
and to make it easier to work with some of the existing types.

We've added a Buffer type so you can work with node.js Buffer objects. You can
enter the value as a JSON array of bytes, such as `[1,2,3,4]`, and the runtime
will convert that to the corresponding Buffer object.

The single-line of the typedInput is not well suited for working with long pieces
of content, such as JSON or longer JSONata expressions. For these types, and the
new Buffer type, we've added the ability to expand the typedInput into a larger
editor to give you more room by clicking the button on the right of the input.

![](/blog/content/images/2017/06/typedInput-json.png)

<div style="text-align:center">
<img style="width:30%" src="/blog/content/images/2017/06/json-editor.png" />
<img style="width:30%" src="/blog/content/images/2017/06/jsonata-editor.png" />
<img style="width:30%" src="/blog/content/images/2017/06/bin-editor.png" />
</div>

The JSONata editor provides a tab to test your expression within the editor. You
can paste in an example message (which, as described above, you can now copy
straight out of the Debug sidebar) and see the results of the expression. It also
includes a complete function reference for the JSONata language.

Whilst we're talking about JSONata, we've also updated to the latest version
(1.2.6) which brings a lot of new functions, including `$flowContext` and
`$globalContext` that can be used to retrieve values from context within your
expression. We've also made it so you no longer have to use the `msg.` prefix in
the expression - so where you previously would have used `msg.payload` you should
now just use `payload`. Existing expressions will continue to work - but we
recommend updating them.

The Buffer editor lets you enter a JSON array and will display the data in
hexadecimal below. If you enter invalid JSON, it will treat it as raw UTF-8 data
and convert it to its Buffer representation.

#### Settings panel

We've introduced a new settings panel within the editor to bring together all
the options you have available for customising the editor.

This is where you'll now find some the options that were previously under the 'view'
menu, such as the grid options. It's also where you'll find the list of keyboard
shortcuts - including the ability to customise any of the shortcuts to your own
taste. Please note that these options are stored within the browser - so if you
access the editor from a different browser, it won't have them saved.

#### Palette Manager Updates

With the new settings panel in place, the Palette Manager view has also been
moved over.

The nodes view has been updated to highlight any nodes that have updates available
and to let you kick off the install. It also warns you that you *must* manually
restart Node-RED in order to complete the update.


### Node Updates

I mentioned previously that we've added a style guide for the node help. Most of
the core nodes have been updated to use the guide.

Some of the nodes have had minor updates to their edit dialogs to improve their
usability - particular around the parser nodes (JSON, HTML, CSV etc)

#### Split/Join

The Split node has been updated to provide more options on how it should approach
splitting different message types. For example, Arrays can now be split to sub-arrays
of fixed length, rather than individual elements and it can also now handle Buffer
payloads.

A new 'streaming' mode has been added which can be used to realign a
stream of messages to ensure each one is a 'complete' message. For example, if
a data source is sending data packets separated by a newline character, but it
isn't able to ensure the packets align to individual messages, you may receive
two messages containing:

```
"one\ntwo\nthr" "ee\nfour\n"
```

Note that the packet containing `three` has been split across two messages.
In streaming mode, the Split node would be able to convert that to a stream
containing:

```
"one" "two" "three" "four"
```

#### HTTP nodes

The HTTP nodes have had a few useful updates.

The HTTP In node now supports file uploads. It must be enabled in the node (and is
not enabled by default). When enabled, any files included in a request are provided
under the `msg.req.files` object. Note that the file content is included in the
message, rather than written to a temporary file.

The HTTP Response node now lets you hardcode a response status code and http
headers within the node as an alternative to setting them manually on each message.

The HTTP Request node now has better cookie handling - making it easier to set
cookies on requests and receive the cookies set in the response. Note that the node
automatically follows http redirects and will only return cookies set on the final
request it makes in a redirect sequence. For some login apis this means you cannot
easily access the cookies made earlier in the sequence. This is a signifiant
limitation of the node that we want to address - but to do so will involve a
considerable change to its internals. Rather than rush that into this release we've
decided to defer it to the next release so we can spend the time needed to ensure
nothing breaks along the way.

Finally, we've made it easier to chain HTTP Request nodes together. There has been
harder than it should have been up until now. The Request node sends the headers
it receives as `msg.headers`. It also uses `msg.headers` to set the headers of
the request it makes. This meant that give a sequence of two Request nodes, the
headers returned by the first would modify the request made by the second. This
was rarely the right thing to do and could cause various side effects. The work
around has been to explicitly delete `msg.headers` between the nodes - something
you had to just know. With this release, we now detect when the headers from one
request node are being passed to another and, unless they have been purposefully
modified in some way, the second node will now ignore them.


#### Other nodes

As ever, there is a collection of smaller updates to other nodes.

 - The Delay node will now accept `msg.delay` to set the delay interval for each message.
 - The Exec node will now accept `msg.kill` in order to kill a process it had previously started
 - The File node can now send a sequence of messages for a file's contents. Those
   messages use the same `msg.parts` property as the Split/Join nodes, so can be
   fed into a Join node to get back to a single message.
 - The Template can send parsed JSON rather than raw text.
 - The TLS config node now allows the required certificate files to be uploaded
   in the editor rather than point at local files.


### Runtime updates

#### Suppressing caught errors

If a node logs an error and provides a message object, it can trigger any Catch
nodes in the flow. That mechanism has been in place for a while now.

In most programming languages, if you catch an error it is up to you to log it
if it needs logging. We've made our behaviour to be consistent with that approach,
so now we will only log errors that do not get caught by a Catch node.

#### Support for alternative authentication schemes on admin

We've extended the authentication mechanisms supported by the editor to include
many of those provided by [Passport](http://passportjs.org/). More specifically,
this means you can now use OAuth and OpenID identity provides to secure your editor.

We've published examples for both [Twitter](https://github.com/node-red/node-red-auth-twitter)
and [GitHub](https://github.com/node-red/node-red-auth-github) to get you started.

*Note*: we have not yet updated the `node-red-admin` tool to also support these
authentication schemes.

#### Node API changes

The `context` object has a new function, `context.keys()` that returns an array
of all keys stored in context. This exists for the node's own context and the
flow and global context objects.

When new flows are deployed, all nodes are first stopped (or `closed`) before being
restarted. The `close` event handler a node can register can now receive a boolean
flag to tell the node if it is being removed rather than just restarted.

The call to close the node will now also timeout after 15 seconds. This will
prevent a misbehaving node from hanging the whole runtime. *Note*: a hang is
considered to be a bug with the node and any such instance should be raised as
an issue against the node. The 15 second timeout can be changed using the `nodeCloseTimeout`
property in your settings file.
