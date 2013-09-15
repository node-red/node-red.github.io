---
layout: default
title: Creating your second flow
---

### Get the current UK Electricity Demand

This flow is slightly more complex and starts to bring in data from outside to do something useful locally.

 - It will go out to an external web site
 - grab some information
 - read and convert that into a useful form
 - output that in two formats, one as a JSON object for further use, and one as a boolean to switch things on and off

#### 1. Add an Inject node

The Inject node allows you to inject messages into a flow, either by clicking
the button on the node, or setting a time interval between injects.

Drag one onto the workspace from the palette.

Double click the node - the Edit properties dialog will open up.
Select Repeat - Interval, and set a sensible figure like 

        every 5 minutes on every day.
        
Hit OK to save those properties.

#### 2. Add an HttpGet node

You'll find that near the bottom of the palette under advanced.
Double click to Edit properties, and in the BaseURL box enter or paste :

        http://www.nationalgrid.com/ngrealtime/realtime/systemdata.aspx

Add a friendly name if you want to. (optional)

Hit OK

#### 3. Add a function node

Double click to Edit the function. You may want to cut and paste the next bit in...

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

Select <b>2</b> for the number of outputs.

Add a friendly name for the function if you want to. (optional)

Hit OK to save

#### 4. Add a Debug node

The Debug node causes any message to be displayed in the Debug sidebar. By
default, it just displays the payload of the message, but it is possible to
display the entire message object. To see the Debug Sidebar use the shortcut ctr-space.

#### 5. Wire them all together

  - Wire the Inject node output to the HttpGet node input. 
  - Wire the HttpGet node output to the Function node input.
  - Wire both the Function node outputs to the Debug node input.

#### 6. Deploy

At this point, the nodes only exist in the editor and must be deployed to the
server.

Click the Deploy button. Simple as that. The flow should now be running.

With the Debug sidebar tab selected, click the Inject button. You should see
an entry with some contents that look like

        (Object) { "demand": 34819, "frequency": 50.04, "time": "17:30:00 GMT" }

and another with something like 

        (boolean) true

or maybe false...

#### 7. Summary

<b>Congratulations !</b>  You now have a flow that goes to the internet - gets the live UK total electricity
consumption - and converts it into a JSON object with the demand in MW, and frequency in Hertz.

The frequency is an indication of overall stress - so when the frequency is under 50 HZ there may
be excess load on the overall National Grid. Now would be a good time to turn off some appliances if you can.

The true/false output could be used to do this. It's true (1) when it's OK to turn on...
and false (0) when you should turn off.

***

#### Source

The flow created in this example is represented by the following json. It can be
imported straight into the editor by pasting the json into the Import dialog
(Ctrl-I or via the dropdown menu).


    [{"id":"748dc465.c5c21c","type":"function","name":"UK Power Demand","func":"// does a simple text extract parse of the http output to provide an\n// object containing the uk power demand, frequency and time\n\nif (~msg.payload.indexOf('<BR')) {\nvar words = msg.payload.split(\"div\")[1].split(\"<BR\");\nif (words.length >= 3) {\nmsg.payload = {};\nmsg.payload.demand = parseInt(words[0].split(\":\")[1]);\nmsg.payload.frequency = parseFloat(words[2].split(\":\")[1]);\nmsg.payload.time = words[1].split(\">\")[1];\nmsg2 ={};\nmsg2.payload = (msg.payload.frequency >= 50) ? true : false;\n\nreturn [msg,msg2];\n}\n}\nreturn null;","outputs":"2","x":296.89998626708984,"y":232.8833293914795,"wires":[["ff2efb9a.803cd"],["ff2efb9a.803cd"]]},{"id":"23207b72.6b8814","type":"httpget","name":"UK Power","baseurl":"http://www.nationalgrid.com/ngrealtime/realtime/systemdata.aspx","append":"","x":201.89998626708984,"y":157.8833293914795,"wires":[["748dc465.c5c21c"]]},{"id":"ff2efb9a.803cd","type":"debug","name":"","x":456.8999557495117,"y":300.8833293914795,"wires":[]},{"id":"a880f67e.727f9","type":"inject","name":"Tick","topic":"","payload":" ","repeat":"","crontab":"*/5 * * * *","once":false,"x":131.89998626708984,"y":88.88332939147949,"wires":[["23207b72.6b8814"]]}]
