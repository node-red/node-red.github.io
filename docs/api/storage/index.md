---
layout: api
title: Storage API
---

The Storage API provides a pluggable way to configure where the Node-RED runtime
stores data.

The information stored by the API includes:

 - flow configuration
 - flow credentials
 - user settings
 - user sessions
 - node library content

By default, Node-RED uses a local file-system implementation of this API.

The API functions are documented [here](methods/).

### Configuration

The `storageModule` property in settings.js can be used to identify a custom module
to use:

{% highlight javascript %}
storageModule: require("my-node-red-storage-plugin")
{% endhighlight %}


### Promises

The API makes extensive use of [JavaScript promises](https://promisesaplus.com/).

A promise represents the eventual result of an asynchronous operation. It acts as
a placeholder until the result is available.

Node-RED uses the [When.js](https://github.com/cujojs/when) library. The following
example shows it in use. For a more complete example, the default file-system
implementation is located in `red/storage/localfilesystem.js`.


{% highlight javascript %}
function getFlows() {
    // create and return a promise
    return when.promise(function(resolve,reject) {
        // resolve - a function to be called with the successful result
        // reject - a function to be called if an error occurs
    
        // do some asynchronous work, with a callback on completion
        doAsyncWork(function(err,result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

getFlows()
    .then(function(result) {
        // Called when getFlows completes successfully
    })
    .otherwise(function(err) {
        // Called when getFlows hits an error
    });
{% endhighlight %}


