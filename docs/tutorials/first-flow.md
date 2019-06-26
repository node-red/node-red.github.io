---
layout: docs-tutorial
toc: toc-user-guide.html
title: Creating your first flow
slug: first flow
redirect_from:
  - /docs/getting-started/first-flow
---

### Overview

This tutorial introduces the Node-RED editor and creates a flow the demonstrates
the Inject, Debug and Function nodes.


### 1. Access the editor

With Node-RED [running](/docs/getting-started), open the editor in a web browser.

If you are using a browser on the same computer that is running Node-RED, you can
access it with the url: <http://localhost:1880>.

If you are using a browser on another computer, you will need to use the ip address
of the computer running Node-RED: `http://<ip-address>:1880`.


### 2. Add an Inject node

The Inject node allows you to inject messages into a flow, either by clicking
the button on the node, or setting a time interval between injects.

Drag one onto the [workspace](/docs/user-guide/editor/workspace/) from the
[palette](/docs/user-guide/editor/palette/).

Select the newly added Inject node to see information about its properties and a
description of what it does in the [Information sidebar pane](/docs/user-guide/editor/sidebar/info).

### 3. Add a Debug node

The Debug node causes any message to be displayed in the
[Debug sidebar](/docs/user-guide/editor/sidebar/debug). By
default, it just displays the payload of the message, but it is possible to
display the entire message object.

### 4. Wire the two together

Connect the Inject and Debug nodes together by [dragging between](/docs/user-guide/editor/workspace/wires)
the output port of one to the input port of the other.

### 5. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button.

With the Debug sidebar tab selected, click the Inject button. You should see
numbers appear in the sidebar. By default, the Inject node uses the number of
milliseconds since January 1st, 1970 as its payload.

### 6. Add a Function node

The Function node allows you to pass each message though a JavaScript function.

Delete the existing wire (select it and press delete on the keyboard).

Wire a Function node in between the Inject and Debug nodes.

Double-click on the Function node to bring up the edit dialog. Copy the following
code into the function field:

{% highlight javascript %}
// Create a Date object from the payload
var date = new Date(msg.payload);
// Change the payload to be a formatted Date string
msg.payload = date.toString();
// Return the message so it can be sent on
return msg;
{% endhighlight %}

Click Done to close the edit dialog and then click the deploy button.

Now when you click the Inject button, the messages in the sidebar will now be
formatted is readable timestamps.

***

### Summary

This flow demonstrates the basic concept of creating a flow. It shows how the
Inject node can be used to manually trigger a flow, and how the Debug node displays
messages in the sidebar. It also shows how the Function node can be used to
write custom JavaScript to run against messages.

### Source

The flow created in this tutorial is represented by the following json. To import
it into the editor, copy it to your clipboard and then paste it into the Import dialog.


```json
[{"id":"58ffae9d.a7005","type":"debug","name":"","active":true,"complete":false,"x":640,"y":200,"wires":[]},{"id":"17626462.e89d9c","type":"inject","name":"","topic":"","payload":"","repeat":"","once":false,"x":240,"y":200,"wires":[["2921667d.d6de9a"]]},{"id":"2921667d.d6de9a","type":"function","name":"Format timestamp","func":"// Create a Date object from the payload\nvar date = new Date(msg.payload);\n// Change the payload to be a formatted Date string\nmsg.payload = date.toString();\n// Return the message so it can be sent on\nreturn msg;","outputs":1,"x":440,"y":200,"wires":[["58ffae9d.a7005"]]}]
```

### Next Steps

 - [Create your second flow](second-flow)

### Related reading

 - [Using the editor](/docs/user-guide/editor/)
 - [The Core nodes](/docs/user-guide/nodes)
 - [Using the Function node](/docs/user-guide/writing-functions)
