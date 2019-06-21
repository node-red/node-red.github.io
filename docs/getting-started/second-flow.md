---
layout: docs
toc: getting-started-toc.html
title: Creating your second flow
---

This example is slightly more complex and starts to bring in data from external sources to do something useful locally.

 - It will go out to an external web site
 - grab some information
 - read and convert that into a useful form

#### 1. Add an Inject node

In the [previous example](first-flow), the Inject node was used to trigger the flow when its button was clicked.
For this example, the Inject node will be configured to trigger the flow at a regular interval.

Drag an Inject node onto the workspace from the palette.

Double click the node to bring up the edit dialog. Set the repeat interval to `every 5 minutes`.

Click Done to close the dialog.

#### 2. Add an HttpRequest node

The HttpRequest node (not the first http node you see) can be used to retrieve a web-page when triggered.

After adding one to the workspace, edit it to set the `URL` property to:

    https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.csv

You can optionally add a friendly Name. Then click Done when to close the dialog.

This is the US Geological Survey web site feed of significant earthquakes in the last 7 days,
there are plenty of other options there if you want to play around - see https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php


#### 3. Add a CSV node

Add a CSV node and edit the properties, (open by double clicking) and tick the

    Input - [x] First row contains column names
    
Then click Done to close.

#### 4. Add a Debug node

Add a Debug node to the output.

#### 5. Wire them all together

  - Wire the Inject node output to the HttpRequest node input.
  - Wire the HttpRequest node output to the CSV node input.
  - Wire the CSV node output to the Debug node input.

#### 7. Add a Switch node

  - Wire a Switch node to the output of the CSV node.
  - Configure the property to be `msg.payload.mag`
  - Configure the test to be `>=` and the value to be `7`
  - Click Done to close

#### 8. Add a Change node

  - Wire a Change node to the output of the Switch node.
  - Configure the node to `Set`, `msg.payload` to be `PANIC!`.
  - Click Done to close

#### 9. Add a Debug node

Wire a new Debug node to the output of the Change node

#### 10. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button.

With the Debug sidebar tab selected (Ctrl-Space, or via the dropdown menu, then click the Debug tab), click the
Inject button. You should see a list of entries with some contents that look like:

    msg.payload : Object
    {"time":"2017-11-19T15:09:03.120Z","latitude":-21.5167,"longitude":168.5426,"depth":14.19,"mag":6.6,"magType":"mww","gap":21,"dmin":0.478,"rms":0.86,"net":"us","id":"us2000brgk","updated":"2017-11-19T17:10:58.449Z","place":"68km E of Tadine, New Caledonia","type":"earthquake","horizontalError":6.2,"depthError":2.8,"magError":0.037,"magNst":72,"status":"reviewed","locationSource":"us","magSource":"us"}

You can now click on the little arrow to the left of each property to expand them and examine the contents

If there were any quakes with a magnitude greater than 7 you will also see some output like

    msg.payload : string(6)
    PANIC!

You can use the green buttons to the right of each debug node to turn on and off that particular debug node.

#### 11. Summary

You now have a flow that goes to the Internet - gets the list of significant earthquakes in the last 7 days - and converts it into a set of JavaScript objects with various details about each one, such as depth, magnitude, location and so on. It also tests to see if any were greater than magnitude 7 and if so also outputs an alert.

***

#### Source

The flow created in this example is represented by the following JSON. It can be
imported straight into the editor by pasting the JSON into the Import dialog
(Ctrl-I or via the dropdown menu).


    [{"id":"e36406f2.8ef798","type":"inject","z":"f03b57d5.e525f8","name":"","topic":"","payload":"","payloadType":"str","repeat":"300","crontab":"","once":false,"x":130,"y":900,"wires":[["c3c50023.3bbed"]]},{"id":"c3c50023.3bbed","type":"http request","z":"f03b57d5.e525f8","name":"Recent Quakes","method":"GET","url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.csv","tls":"","x":300,"y":900,"wires":[["8afc6cac.e0812"]]},{"id":"8afc6cac.e0812","type":"csv","z":"f03b57d5.e525f8","name":"","sep":",","hdrin":true,"hdrout":"","multi":"one","ret":"\\n","temp":"","x":470,"y":900,"wires":[["44779781.4190f8","6f0eb546.9e208c"]]},{"id":"44779781.4190f8","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":630,"y":900,"wires":[]},{"id":"6f0eb546.9e208c","type":"switch","z":"f03b57d5.e525f8","name":"","property":"payload.mag","propertyType":"msg","rules":[{"t":"gte","v":"7","vt":"num"}],"checkall":"true","outputs":1,"x":510,"y":960,"wires":[["d78d4aa8.8c8208"]]},{"id":"d78d4aa8.8c8208","type":"change","z":"f03b57d5.e525f8","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"PANIC!","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":1020,"wires":[["72fddece.fac0d"]]},{"id":"72fddece.fac0d","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":750,"y":960,"wires":[]}]
