---
layout: default
title: Creating your second flow
---

This example is slightly more complex and starts to bring in data from external sources to do something useful locally.

 - It will go out to an external web site
 - grab some information
 - read and convert that into a useful form
 - output that in two formats, one as a JSON object for further use, and one as a boolean to switch things on and off

#### 1. Add an Inject node

In the [previous example](first-flow.html), the Inject node was used to trigger the flow when its button was clicked.
For this example, the Inject node will be configured to trigger the flow at a regular interval.

Drag an Inject node onto the workspace from the palette.

Double click the node to bring up the edit dialog. Set the repeat interval to `every 5 minutes on every day`.

Click Ok to close the dialog.

#### 2. Add an HttpRequest node

The HttpRequest node can be used to retrieve a web-page when triggered.

After adding one to the workspace, edit it to set the `URL` property to:

    http://realtimeweb-prod.nationalgrid.com/SystemData.aspx

You can optionally add a friendly name.

#### 3. Add a function node

Add a Function node with the following code:

{% highlight javascript %}
// does a simple text extract parse of the http output to provide an
// object containing the uk power demand, frequency and time

if (~msg.payload.indexOf('<span')) {
    var dem = msg.payload.split('Demand:')[1].split("MW")[0];
    var fre = msg.payload.split('Frequency:')[1].split("Hz")[0];

    msg.payload = {};
    msg.payload.demand = parseInt(dem.split(">")[1].split("<")[0]);
    msg.payload.frequency = parseFloat(fre.split(">")[1].split("<")[0]);

    msg2 = {};
    msg2.payload = (msg.payload.frequency >= 50) ? true : false;

    return [msg,msg2];
}
return null;
{% endhighlight %}

Set the number of outputs for the function node to <b>2</b>.

#### 4. Add a Debug node

Add two Debug nodes.

#### 5. Wire them all together

  - Wire the Inject node output to the HttpRequest node input.
  - Wire the HttpRequest node output to the Function node input.
  - Wire each of the Function node outputs to a different Debug node input.

#### 6. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button.

With the Debug sidebar tab selected (Ctrl-Space, or via the dropdown menu, then click the Debug tab), click the
Inject button. You should see an entry with some contents that looks like:

    (Object) { "demand": 34819, "frequency": 50.04 }

and another with something like:

    (boolean) true


#### 7. Summary

You now have a flow that goes to the Internet - gets the live UK total electricity
consumption - and converts it into a JavaScript object with demand in MW, and frequency in Hertz.

The object is emitted out of the first output of the Function node.

The frequency is an indication of overall stress - so when the frequency is under 50 HZ there may
be excess load on the overall National Grid. This is indicated in the message emitted out of the
second output of the Function node; if the payload is true, there is capacity in the grid.

***

#### Source

The flow created in this example is represented by the following json. It can be
imported straight into the editor by pasting the json into the Import dialog
(Ctrl-I or via the dropdown menu).


    [{"id":"11b032a3.ee4fcd","type":"inject","name":"Tick","topic":"","payload":"","repeat":"","crontab":"*/5 * * * *","once":false,"x":161,"y":828,"z":"6480e14.f9b7f2","wires":[["a2b3542e.5d4ca8"]]},{"id":"a2b3542e.5d4ca8","type":"http request","name":"UK Power","method":"GET","url":"http://realtimeweb-prod.nationalgrid.com/SystemData.aspx","x":301,"y":828,"z":"6480e14.f9b7f2","wires":[["2631e2da.d9ce1e"]]},{"id":"2631e2da.d9ce1e","type":"function","name":"UK Power Demand","func":"// does a simple text extract parse of the http output to provide an\n// object containing the uk power demand, frequency and time\n\nif (~msg.payload.indexOf('<span')) {\n    var dem = msg.payload.split('Demand:')[1].split(\"MW\")[0];\n    var fre = msg.payload.split('Frequency:')[1].split(\"Hz\")[0];\n\n    msg.payload = {};\n    msg.payload.demand = parseInt(dem.split(\">\")[1].split(\"<\")[0]);\n    msg.payload.frequency = parseFloat(fre.split(\">\")[1].split(\"<\")[0]);\n    \n    msg2 = {};\n    msg2.payload = (msg.payload.frequency >= 50) ? true : false;\n\n    return [msg,msg2];\n}\n\nreturn null;","outputs":"2","valid":true,"x":478,"y":828,"z":"6480e14.f9b7f2","wires":[["8e56f4d3.71a908"],["cd84371b.327bc8"]]},{"id":"8e56f4d3.71a908","type":"debug","name":"","active":true,"complete":false,"x":678,"y":798,"z":"6480e14.f9b7f2","wires":[]},{"id":"cd84371b.327bc8","type":"debug","name":"","active":true,"complete":false,"x":679,"y":869,"z":"6480e14.f9b7f2","wires":[]}]
