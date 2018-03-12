---
layout: blog
title: Version 0.18 released
author: nick
---

At long last, Node-RED 0.18 is now available to [download](https://github.com/node-red/node-red/releases/download/0.18.0/node-red-0.18.0.zip) or [npm install](https://npmjs.org/package/node-red).

If upgrading, please read the [upgrade instructions](http://nodered.org/docs/getting-started/upgrading.html).

For the Raspberry Pi users, please see the [Raspberry Pi documentation](https://nodered.org/docs/hardware/raspberrypi#upgrading)
for how to upgrade if you are still on the pre-installed version.

---

<iframe width="560" height="315" src="https://www.youtube.com/embed/xOpmYVXG7lU?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---


We published our [roadmap to 1.0](https://nodered.org/blog/2017/07/17/roadmap-to-1-dot-0)
last July and with it said:

> You'll note that there are not committed timescales on this roadmap; it represents
a lot of development work and there are still unanswered questions on the final
designs. But our intention is to get to 1.0 by the end of the year.

Here we are at the end of January and this is our first release since then and it
isn't 1.0. We had hoped to be further along the roadmap than we are, but some things
just can't be rushed.

As an open source project we rely on our excellent community to help drive things
forward. One of our goals for this year is to grow the contributor community.
Contributing to the project doesn't just mean writing lines of code (although,
of course, that does help speed the roadmap along). There are many ways to get
more involved and give back to the project, such as documentation, the cookbook
or helping improving the flow library.

If you want to get involved, come chat to us on Slack.

But now, on with the 0.18 release notes.


### Projects

The new Projects feature is the first major step on our roadmap to 1.0. It changes
how you manage your flow files and introduces version control into the editor.

Rather than go over it all here, we've added some [documentation](https://nodered.org/docs/user-guide/projects/)
that explains more about the Projects feature, or you can watch this [video](https://www.youtube.com/watch?v=Bto2rz7bY3g):

<iframe width="560" height="315" src="https://www.youtube.com/embed/Bto2rz7bY3g?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

We're easing this feature out, so for this release it is in preview mode - you
need to enable it via your settings file. That means you can opt-in to moving
over to projects before we turn it on by default in a future release.

### Message Sequence nodes

We introduced the Split/Join node pair in a previous release. These nodes can be
used to turn a single message into a sequence of messages and back again.

With this release we are adding some more features around message sequences.

 - the `Switch` node has some new rules for routing messages based on their position
within a sequence
 - the `Join` node can be configured with a JSONata expression for reducing a sequence
   to a single message
 - a new `Sort` node has been added for reordering the messages in a sequence
 - a new `Batch` node has been aded for creating new sequences from the messages it receives.
 - both the `CSV` and `File In` nodes, when sending multiple messages, send them
 as properly formed message sequences. This allows you to more efficiently stream
 large CSV files through a flow.


For example, given a stream of sensor data coming from an MQTT node, the `Batch` node
can be used to create time-sliced sequences which the `Join` node reduces to calculate
the average sensor reading within each time-slice.

![](/blog/content/images/2018/01/message-seq-01.png)

### Customising a node's icon

We've added the ability to change a node's icon. This can be helpful where you
have lots of the same node type on a flow and you want to help distinguish them.
Note this is an editor customisation - you cannot change the icon dynamically from
a flow.

To change the icon, open the settings section of a node's edit dialog and you'll
see the new options beneath the port labels settings. With this release you have
to pick from the list of available icons, but we'll be expanding on that in the
future.

### Support for scoped modules

We recently updated the [Flow Library](https://flows.nodered.org) to index scoped
node modules. With this release we've squashed a few bugs so you can now also install
them directly from within the Palette Editor.

### Increased flexibility with core nodes

By convention, nodes use `msg.payload` as the main property they work with. This
is how many nodes are able to just work together, but it can also cause problems
where a flow has to juggle its properties around to get the right thing into the payload
at any given point.

Some nodes are already more flexible than others and let you pick a different
property to work with. We've now extended that to more nodes.

In the core palette, the `range`, `HTML`, `JSON` and `XML` nodes have all been updated,
as have the extra nodes `RBE`, `random`, `smooth` and `base64` - look-out for
new versions of their modules.

### Update to JSONata 1.5.0

We've updated to the latest release of JSONata which introduces some new functions
and capabilities. Check their [release notes](https://github.com/jsonata-js/jsonata/releases) for
more information on both the 1.4.0 and 1.5.0 releases.


### Node Updates

As usual, there's a long list of improvements across a wide range of the core nodes.

 - the `JSON` node can now be configured to enforce a particular encoding, rather
   than always toggling between JSON and JavaScript Object. This is useful, for example,
   when you have an http endpoint that is expecting the user to send JSON. The `HTTP In`
   node will only automatically parse the JSON if the request had its `Content-type`
   properly set - and in the real world, that's the type of thing that users get wrong.
   Adding this mode to the `JSON` node allows such a flow to be more forgiving and
   guarantee the message payload has been parsed.

 - The common `TLS` config node allows you to specify a passphrase for your private
   key file.

 - Speaking of TLS, we've added TLS support to the `WebSocket Client` node.

 - Speaking of WebSockets, we've added WebSocket support to the `MQTT` nodes.

 - The `template` node, which can already send parsed JSON rather than text, can
   now also send parsed YAML. You can also use `msg.template` to dynamically set
   the template it uses.

 - Speaking of YAML, there's a new `YAML` parser node for converting to and from
   that format.

 - The `Delay` node can now be reset by sending it a message with a `msg.reset`
   property, discarding any queued up messages.

 - The `Debug` node now lets you update its status text with the content of messages
   it receives. Useful for providing a quick-glance view of your flow's state.

 - The `Inject` node now lets you specify a delay before its 'inject once on start'
   option is triggered.

 - The `Trigger` node can now be configured to use `msg.topic` to distinguish
   different streams of messages to trigger against.
