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


### Editor UI

![ScreenShot][1]

  [1]: ../../images/node-red-screenshot2.png "ScreenShot"

The key areas are

 1. The node palette - nodes can be dragged from here on to the main canvas.
 2. The canvas or workarea - this is where you compose your flows.
 3. The sidebar, including information and debug tabs - this can be accessed via the Options button top right, or pressing Ctrl-Space.
 4. The Deploy button - this saves your flow and starts it running. It turns red when there are undeployed changes.
 5. The Options menu - this gives access to other functions such as import/export and the sidebar.
