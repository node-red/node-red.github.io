---
layout: docs
toc: user-guide-toc.html
title: Security
---

By default, the Node-RED editor is not secured - anyone who can access the IP address
and port it is running on can access the editor and deploy changes. This is only
suitable if you are running on a trusted network.

This section describes how you can secure Node-RED. The security is split into
two parts:

 - the [editor and admin API](#editor--admin-api-security)
 - the [HTTP Nodes and static content](#http-node-security).

### Editor & Admin API security

To enable user authentication on the Editor and Admin API, add the following to
your `settings.js` file:

{% highlight javascript %}
adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
        permissions: "*"
    }]
}
{% endhighlight %}

The `users` property is an array of user objects. This allows you to define
multiple users, each of whom can have different permissions.

This example configuration defines a single user called `admin` who has permission
to do everything within the editor and has a password of `password`. Note that
the password is securely hashed using the bcrypt algorithm.

<div class="doc-callout">
<em>Note</em>: in previous releases of Node-RED, the setting <code>httpAdminAuth</code>
could be used to enable HTTP Basic Authentication on the editor. This option is
deprecated and should not be used.
</div>

#### Generating the password hash

To generate a suitable password hash, you can use the [`node-red-admin`](node-red-admin)
command-line tool:

    node-red-admin hash-pw

The tool will prompt you for the password you wish to use and then print out
the hash that can be copied into the settings file.

Alternative, you can run the following command from within the Node-RED install
directory:

    node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here


#### Setting a default user

The example configuration above will prevent anyone from accessing the editor
unless they log in.

In some cases, it is desirable to allow unlogged in users some level of access.
Typically, this will be giving read-only access to the editor. To do this,
the `default` property can be added to the `adminAuth` setting to define
the default user:

{% highlight javascript %}
adminAuth: {
    type: "credentials",
    users: [ /* list of users */ ],
    default: {
        permissions: "read"
    }
}
{% endhighlight %}

#### User permissions

Prior to Node-RED 0.14, users could have one of two permissions:

 - `*` - full access
 - `read` - read-only access

From Node-RED 0.14 the permissions can be much finer grained and to support that,
the property can either be a single string as before, or an array containing multiple permissions.

Each method of the [Admin API](api/admin) defines what permission level is needed to access it.
The permission model is resource based. For example, to get the current flow configuration,
a user will require the `flows.read` permission. But to update the flows they will require
the `flows.write` permission.



#### Token expiration

By default, access tokens expire after 7 days after they are created. We do not
currently support refreshing the token to extend this period.

The expiration time can be customised by setting the `sessionExpiryTime` property
of the `adminAuth` setting. This defines, in seconds, how long a token is valid
for. For example, to set the tokens to expire after 1 day:

{% highlight javascript %}
adminAuth: {
    sessionExpiryTime: 86400,
    ...
}
{% endhighlight %}

#### Accessing the Admin API

With the `adminAuth` property set, the [Admin API documentation](api/admin/oauth)
describes how to access the API.

#### Custom user authentication

Rather than hardcode users into the settings file, it is also possible to plug in
custom code to authenticate users. This makes it possible to integrate with
existing authentication schemes.

The following example shows how an external module can be used to provide the
custom authentication code.

 - Save the following in a file called `<node-red>/user-authentication.js`

{% highlight javascript %}
var when = require("when");
module.exports = {
   type: "credentials",
   users: function(username) {
       return when.promise(function(resolve) {
           // Do whatever work is needed to check username is a valid
           // user.
           if (valid) {
               // Resolve with the user object. It must contain
               // properties 'username' and 'permissions'
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               // Resolve with null to indicate this user does not exist
               resolve(null);
           }
       });
   },
   authenticate: function(username,password) {
       return when.promise(function(resolve) {
           // Do whatever work is needed to validate the username/password
           // combination.
           if (valid) {
               // Resolve with the user object. Equivalent to having
               // called users(username);
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               // Resolve with null to indicate the username/password pair
               // were not valid.
               resolve(null);
           }
       });
   },
   default: function() {
       return when.promise(function(resolve) {
           // Resolve with the user object for the default user.
           // If no default user exists, resolve with null.
           resolve({anonymous: true, permissions:"read"});
       });
   }
}
{% endhighlight %}

 -  Set the `adminAuth` property in settings.js to load this module:

{% highlight javascript %}
adminAuth: require("./user-authentication");
{% endhighlight %}


### HTTP Node security

The routes exposed by the HTTP In nodes can be secured using basic authentication.

The `httpNodeAuth` property in your `settings.js` file can be used to define a single
username and password that will be allowed to access the routes.

{% highlight javascript %}
httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},
{% endhighlight %}

The `pass` property uses the same format as `adminAuth`. See [Generating the password hash](#generating-the-password-hash) for more information.

Access to any static content defined by the `httpStatic` property can be secured
using the `httpStaticAuth` property, which uses the same format.

<div class="doc-callout">
<em>Note</em>: in previous releases of Node-RED, the <code>pass</code> property
was expected to be an MD5 hash. This is cryptographically insecure, so has been
superseded with bcrypt, as used by <code>adminAuth</code>. For backwards compatibility, MD5
hashes are still supported - but they are not recommended.
</div>
