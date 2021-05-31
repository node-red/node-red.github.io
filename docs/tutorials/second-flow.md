---
layout: docs-tutorial
toc: toc-user-guide.html
title: Creating your second flow
slug: second flow
redirect_from:
  - /docs/getting-started/second-flow

---


### Overview

This tutorial builds on the [first tutorial](first-flow) to make a flow that
starts to bring in data from external sources to do something useful locally.

The flow will:

 - Retrieve information from a website at a regular interval
 - Convert that information into a useful form
 - Display the result in the Debug sidebar

### 1. Add an Inject node

In the [previous tutorial](first-flow), the Inject node was used to trigger the
flow when its button was clicked. For this tutorial, the Inject node will be
configured to trigger the flow at a regular interval.

Drag an Inject node onto the workspace from the palette.

Double click the node to bring up the edit dialog. Set the repeat interval to
`every 5 minutes`.

Click Done to close the dialog.

### 2. Add an HTTP Request node

The HTTP Request node can be used to retrieve a web-page when triggered.

After adding one to the workspace, edit it to set the `URL` property to:

    https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv

Then click Done to close the dialog.

This URL is a feed of significant earthquakes in the last month from the US Geological Survey web site. The site offers a number of [other options](https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php)
that you may want to play around with after completing this tutorial.

### 3. Add a CSV node

Add a CSV node and edit its properties. Enable option for 'First row contains
 column names'.

Then click Done to close.

### 4. Add a Debug node

Add a Debug node to the output.

### 5. Wire them all together

Add wires connecting:

  - The Inject node output to the HTTP Request node input.
  - The HTTP Request node output to the CSV node input.
  - The CSV node output to the Debug node input.

### 6. Add a Switch node

Add a Switch node to the workspace. Edit its properties and configure it to check
the property `msg.payload.mag` with a test of `>=` change it to test on a `number` and the value `7`. Click
Done to close.

Add a second wire from the CSV node to this Switch node.

### 7. Add a Change node

Add a Change node, wired to the output of the Switch node. Configure it to
set `msg.payload` to the string `PANIC!`.

### 8. Add a Debug node

Wire a new Debug node to the output of the Change node

### 9. Deploy

Deploy the flow to the runtime by clicking the Deploy button.

With the Debug sidebar tab open click the Inject button. You should see a list of
entries with some contents that look like:

    msg.payload : Object
    {"time":"2017-11-19T15:09:03.120Z","latitude":-21.5167,"longitude":168.5426,"depth":14.19,"mag":6.6,"magType":"mww","gap":21,"dmin":0.478,"rms":0.86,"net":"us","id":"us2000brgk","updated":"2017-11-19T17:10:58.449Z","place":"68km E of Tadine, New Caledonia","type":"earthquake","horizontalError":6.2,"depthError":2.8,"magError":0.037,"magNst":72,"status":"reviewed","locationSource":"us","magSource":"us"}

You can now click on the little arrow to the left of each property to expand them
and examine the contents

If there were any quakes with a magnitude greater than 7 you will also see debug
messages like:

    msg.payload : string(6)
    "PANIC!"

You could change the switch value of `7` to a smaller one to test your program. Remember to click on deploy after the change.
***

### Summary

This flow is automatically triggered every 5 minutes and retrieves data from a
url. It parses the data and displays in the Debug sidebar. It also checks the
magnitude value in the data and branches the flow for any messages with a
magnitude greater than, or equal to, 7. The payloads of such messages are
modified and displayed in the Debug sidebar.


### Source

The flow created in this tutorial is represented by the following json. To import
it into the editor, copy it to your clipboard and then paste it into the Import dialog.

    [{"id":"e36406f2.8ef798","type":"inject","z":"f03b57d5.e525f8","name":"","topic":"","payload":"","payloadType":"str","repeat":"300","crontab":"","once":false,"x":130,"y":900,"wires":[["c3c50023.3bbed"]]},{"id":"c3c50023.3bbed","type":"http request","z":"f03b57d5.e525f8","name":"Recent Quakes","method":"GET","url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv","tls":"","x":300,"y":900,"wires":[["8afc6cac.e0812"]]},{"id":"8afc6cac.e0812","type":"csv","z":"f03b57d5.e525f8","name":"","sep":",","hdrin":true,"hdrout":"","multi":"one","ret":"\\n","temp":"","x":470,"y":900,"wires":[["44779781.4190f8","6f0eb546.9e208c"]]},{"id":"44779781.4190f8","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":630,"y":900,"wires":[]},{"id":"6f0eb546.9e208c","type":"switch","z":"f03b57d5.e525f8","name":"","property":"payload.mag","propertyType":"msg","rules":[{"t":"gte","v":"7","vt":"num"}],"checkall":"true","outputs":1,"x":510,"y":960,"wires":[["d78d4aa8.8c8208"]]},{"id":"d78d4aa8.8c8208","type":"change","z":"f03b57d5.e525f8","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"PANIC!","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":1020,"wires":[["72fddece.fac0d"]]},{"id":"72fddece.fac0d","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":750,"y":960,"wires":[]}]

### Related reading

 - [Using the editor](/docs/user-guide/editor/)
 - [The Core nodes](/docs/user-guide/nodes)
 - [Using the Function node](/docs/user-guide/writing-functions)
