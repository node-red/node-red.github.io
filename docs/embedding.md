---
layout: default
title: Embedding into an existing app
---   

It is possible to embed Node-RED into a larger application. A typical scenario
would be where you use Node-RED to generate flows of data that you want to
display on a web dashboard - all from the same application.


Add `node-red` to the module dependencies in your application's `package.json`,
along with any of the individual node dependencies you may have.

The following is a minimal example of embedded the runtime into a wider Express
application.

{% highlight javascript %}
var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8000);

// Start the runtime
RED.start();
{% endhighlight %}
    
When this approach is used, the `settings.js` file included with Node-RED is not
used. Instead, the settings are passed to the `RED.init` call as shown above.

Furthermore, the following settings are ignored as they are left to you to
configure the Express instance as you want it:

 - `uiHost`
 - `uiPort`
 - `httpAdminAuth`
 - `httpNodeAuth`
 - `httpStatic`
 - `httpStaticAuth`
 - `https`


