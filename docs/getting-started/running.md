---
layout: default
title: Running
---   

From the top-level directory, run:

    $ node red.js

You can then access Node-RED at <http://localhost:1880>.

By default, Node-RED uses a file called `flows_<hostname>.json` to save the
deployed configuration. You can point to a different flow file at start-up:

    $ node red.js my_flows.json

You should now have a screen almost like this.

![ScreenShot][1]

  [1]: ../../images/node-red-screenshot2.png "ScreenShot"

The key areas are

 1. The Pallette on the left - Nodes can be dragged from here to the main canvas.
 2. The Canvas or workarea - this is where you compose your flows.
 3. The Information and Debug window - this can be accessed via the Option button top right, or by the shortcut ctrl-space.
 4. The Deploy button - top right. This saves your flow and starts it running.
 5. The Options button - top right. This gives access to other functions such as import/export and the debug window.
