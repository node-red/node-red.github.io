---
layout: docs
toc: getting-started-toc.html
title: Creating your first flow
---

Once Node-RED is [running](running), point a local browser at  http://localhost:1880.
You can always use a browser from another machine if you know the ip address or name of
the Node-RED instance - http://{Node-RED-machine-ip-address}:1880

#### 1. Add an Inject node

The Inject node allows you to inject messages into a flow, either by clicking
the button on the node, or setting a time interval between injects.

Drag one onto the workspace from the palette.

Open the sidebar (Ctrl-Space, or via the dropdown menu) and select the Info tab.

Select the newly added Inject node to see information about its properties and a
description of what it does.

#### 2. Add a Debug node

The Debug node causes any message to be displayed in the Debug sidebar. By
default, it just displays the payload of the message, but it is possible to
display the entire message object.

#### 3. Wire the two together

Connect the Inject and Debug nodes together by dragging between the output port
of one to the input port of the other.

#### 4. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button. Simple as that.

With the Debug sidebar tab selected, click the Inject button to the left of the inject node. You should see
numbers appear in the sidebar. By default, the Inject node uses the number of
milliseconds since January 1st, 1970 as its payload. Let's do something more
useful with that.

#### 5. Add a Function node

The Function node allows you to pass each message though a JavaScript function.

Wire the Function node in between the Inject and Debug nodes. You may need to
delete the existing wire (select it and hit delete on the keyboard).

Double-click on the Function node to bring up the edit dialog. Copy the follow
code into the function field:

{% highlight javascript %}
// Create a Date object from the payload
var date = new Date(msg.payload);
// Change the payload to be a formatted Date string
msg.payload = date.toString();
// Return the message so it can be sent on
return msg;
{% endhighlight %}

Click Ok to close the edit dialog and then click the deploy button.

Now when you click the Inject button, the messages in the sidebar will be more
readable time stamps.

***

#### Source

The flow created in this example is represented by the following json. It can be
imported straight into the editor by pasting the json into the Import dialog
(Ctrl-I or via the dropdown menu).


    [{"id":"58ffae9d.a7005","type":"debug","name":"","active":true,"complete":false,"x":640,"y":200,"wires":[]},{"id":"17626462.e89d9c","type":"inject","name":"","topic":"","payload":"","repeat":"","once":false,"x":240,"y":200,"wires":[["2921667d.d6de9a"]]},{"id":"2921667d.d6de9a","type":"function","name":"Format timestamp","func":"// Create a Date object from the payload\nvar date = new Date(msg.payload);\n// Change the payload to be a formatted Date string\nmsg.payload = date.toString();\n// Return the message so it can be sent on\nreturn msg;","outputs":1,"x":440,"y":200,"wires":[["58ffae9d.a7005"]]}]
