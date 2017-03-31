---
layout: docs
toc: creating-nodes-toc.html
title: Node credentials
---

A node may define a number of properties as `credentials`. These are properties
that are stored separately to the main flow file and do not get included when
flows are exported from the editor.

To add credentials to a node, the following steps are taken:

1. Add a new `credentials` entry to the node's definition:

        credentials: {
            username: {type:"text"},
            password: {type:"password"}
        },

   The entries take a single option - their `type` which can be either `text` or
   `password`.

2. Add suitable entries to the edit template for the node

        <div class="form-row">
            <label for="node-input-username"><i class="icon-tag"></i> Username</label>
            <input type="text" id="node-input-username">
        </div>
        <div class="form-row">
            <label for="node-input-password"><i class="icon-tag"></i> Password</label>
            <input type="password" id="node-input-password">
        </div>

    Note that the template uses the same element `id` conventions as regular
    node properties.

3. In the node's `.js` file, the call to `RED.nodes.registerType` must be updated
   to include the credentials:

        RED.nodes.registerType("my-node",MyNode,{
            credentials: {
                username: {type:"text"},
                password: {type:"password"}
            }
        });

### Accessing credentials

#### Runtime use of credentials

Within the runtime, a node can access its credentials using the `credentials`
property:

{% highlight javascript %}
function MyNode(config) {
    RED.nodes.createNode(this,config);
    var username = this.credentials.username;
    var password = this.credentials.password;
}
{% endhighlight %}

#### Credentials within the Editor

Within the editor, a node has restricted access to its credentials. Any that are
of type `text` are available under the `credentials` property - just as they are
in the runtime. But credentials of type `password` are not available. Instead,
a corresponding boolean property called `has_<property-name>` is present to
indicate whether the credential has a non-blank value assigned to it.

{% highlight javascript %}
oneditprepare: function() {
    // this.credentials.username is set to the appropriate value
    // this.credentials.password is not set
    // this.credentials.has_password indicates if the property is present in the runtime
    ...
}
{% endhighlight %}

### Advanced credential use

Whilst the credential system outlined above is sufficient for most cases, in some
circumstances it is necessary to store more values in credentials then just those
that get provided by the user.

For example, for a node to support an OAuth workflow, it must retain server-assigned
tokens that the user never sees. The Twitter node provides a good example of how
this can be achieved.
