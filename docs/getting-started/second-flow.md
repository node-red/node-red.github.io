---
layout: default
title: Creating your second flow
---

### Get the current UK Electricity Demand

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

#### 2. Add an HttpGet node

The HttpGet node can be used to retrieve a web-page when triggered.

After adding one to the workspace, edit it to set the `BaseURL` property to:

        http://www.nationalgrid.com/ngrealtime/realtime/systemdata.aspx

You can optionally add a friendly name.

#### 3. Add a function node

Add a Function node with the following code:

        // does a simple text extract parse of the http output to provide an
        // object containing the uk power demand, frequency and time
        
        if (~msg.payload.indexOf('<BR')) {
          var words = msg.payload.split("div")[1].split("<BR");
          if (words.length >= 3) {
            msg.payload = {};
            msg.payload.demand = parseInt(words[0].split(":")[1]);
            msg.payload.frequency = parseFloat(words[2].split(":")[1]);
            msg.payload.time = words[1].split(">")[1];
            
            // Create the true/false signal based on the frequency.
            msg2 = {};
            msg2.payload = (msg.payload.frequency >= 50) ? true : false;
            
            return [msg,msg2];
          }
        }
        return null;

Set the number of outputs for the function node to <b>2</b>.

#### 4. Add a Debug node

Add two Debug nodes.

#### 5. Wire them all together

  - Wire the Inject node output to the HttpGet node input. 
  - Wire the HttpGet node output to the Function node input.
  - Wire each of the Function node outputs to a different Debug node input.

#### 6. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button.

With the Debug sidebar tab selected (Ctrl-Space, or via the dropdown menu, then click the Debug tab), click the
Inject button. You should see an entry with some contents that looks like:

        (Object) { "demand": 34819, "frequency": 50.04, "time": "17:30:00 GMT" }

and another with something like:

        (boolean) true


#### 7. Summary

You now have a flow that goes to the internet - gets the live UK total electricity
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


    [{"id":"9667c21d.69984","type":"function","name":"UK Power Demand","func":"// does a simple text extract parse of the http output to provide an\n// object containing the uk power demand, frequency and time\n\nif (~msg.payload.indexOf('<BR')) {\nvar words = msg.payload.split(\"div\")[1].split(\"<BR\");\nif (words.length >= 3) {\nmsg.payload = {};\nmsg.payload.demand = parseInt(words[0].split(\":\")[1]);\nmsg.payload.frequency = parseFloat(words[2].split(\":\")[1]);\nmsg.payload.time = words[1].split(\">\")[1];\nmsg2 ={};\nmsg2.payload = (msg.payload.frequency >= 50) ? true : false;\n\nreturn [msg,msg2];\n}\n}\nreturn null;","outputs":"2","x":405,"y":130,"wires":[["29565919.d6a9a6"],["37641836.c89be8"]]},{"id":"27b6ea1d.d84916","type":"httpget","name":"UK Power","baseurl":"http://www.nationalgrid.com/ngrealtime/realtime/systemdata.aspx","append":"","x":228,"y":119,"wires":[["9667c21d.69984"]]},{"id":"2eb79d84.d14862","type":"inject","name":"Tick","topic":"","payload":" ","repeat":"","crontab":"*/5 * * * *","once":false,"x":85,"y":109,"wires":[["27b6ea1d.d84916"]]},{"id":"29565919.d6a9a6","type":"debug","name":"","active":true,"complete":false,"x":601,"y":94,"wires":[]},{"id":"37641836.c89be8","type":"debug","name":"","active":true,"complete":false,"x":602,"y":165,"wires":[]}]

