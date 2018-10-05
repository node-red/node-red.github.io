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
  - [Username/password based authentication](#usernamepassword-based-authentication)
    - [Generating the password hash](#generating-the-password-hash)
  - [OAuth/OpenID based authentication](#oauthopenid-based-authentication)
  - [Setting a default user](#setting-a-default-user)
  - [User permissions](#user-permissions)
  - [Token expiration](#token-expiration)
  - [Accessing the Admin API](#accessing-the-admin-api)
  - [Custom user authentication](#custom-user-authentication)
- the [HTTP Nodes, Dashboard and static content](#http-node-security)

### Editor & Admin API security

The Editor and Admin API supports two types of authentication:

 - username/password credential based authentication
 - *since Node-RED 0.17:* authentication against any OAuth/OpenID provider such
   as Twitter or GitHub

#### Username/password based authentication

To enable user authentication on the Editor and Admin API, add the following to
your `settings.js` file:

```javascript
adminAuth: {
    type: "credentials",
    users: [{
        username: "admin",
        password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
        permissions: "*"
    }]
}
```

The `users` property is an array of user objects. This allows you to define
multiple users, each of whom can have different permissions.

This example configuration defines a single user called `admin` who has permission
to do everything within the editor and has a password of `password`. Note that
the password is securely hashed using the bcrypt algorithm.

<div class="doc-callout">
<em>Note</em> : in previous releases of Node-RED, the setting <code>httpAdminAuth</code>
could be used to enable HTTP Basic Authentication on the editor. This option is
deprecated and should not be used.
</div>

##### Generating the password hash

To generate a suitable password hash, you can use the `node-red-admin`
command-line tool. Instructions for installing the tool are available [here](node-red-admin).

    node-red-admin hash-pw

The tool will prompt you for the password you wish to use and then print out
the hash that can be copied into the settings file.

Alternative, you can run the following command from within the Node-RED install
directory:

    node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here

#### OAuth/OpenID based authentication

*Since Node-RED 0.17*

To use an external authentication source, Node-RED can take use a wide range of
the strategies provided by [Passport](http://passportjs.org/).

Node-RED authentication modules are available for both [Twitter](https://www.npmjs.com/package/node-red-auth-twitter)
and [GitHub](https://www.npmjs.com/package/node-red-auth-github). They wrap up
some of the strategy-specific detail to make it easier to use. But they can also
be used as a template for authenticating with other similar strategies.

The following example shows how to configure to authenticate against Twitter
_without_ using the auth module we provide.

```javascript
adminAuth: {
    type:"strategy",
    strategy: {
        name: "twitter",
        label: 'Sign in with Twitter',
        icon:"fa-twitter",
        strategy: require("passport-twitter").Strategy,
        options: {
            consumerKey: TWITTER_APP_CONSUMER_KEY,
            consumerSecret: TWITTER_APP_CONSUMER_SECRET,
            callbackURL: "http://example.com/auth/strategy/callback"
        },
        verify: function(token, tokenSecret, profile, done) {
            done(null, profile);
        }
    },
    users: [
       { username: "knolleary",permissions: ["*"]}
    ]
};
```

The `strategy` property takes the following options:

 - `name` - the name of the passport strategy being used
 - `strategy` - the passport strategy module
 - `label`/`icon` - used on the login page. `icon` can be any FontAwesome icon name.
 - `options` - an options object passed to the passport strategy when it is created.
   Refer to the strategy's own documentation for what it requires. See below for a
   node on the `callbackURL`.
 - `verify` - the verify function used by the strategy. It must call `done` with
   a user profile as the second argument if the user is valid. This is expected
   to have a `username` property that is used to check against the list of valid
   users. Passport attempts to standardize the user profile object, so most strategies
   provide this property.

The `callbackURL` used by a strategy is where the authentication provider will
redirect to following an auth attempt. It must be the URL of your Node-RED editor
with `/auth/strategy/callback` added to the path. For example, if you access the
editor at `http://localhost:1880`, you would use `http://localhost:1880/auth/strategy/callback`.


#### Setting a default user

The example configuration above will prevent anyone from accessing the editor
unless they log in.

In some cases, it is desirable to allow everyone some level of access.
Typically, this will be giving read-only access to the editor. To do this,
the `default` property can be added to the `adminAuth` setting to define
the default user:

```javascript
adminAuth: {
    type: "credentials",
    users: [ /* list of users */ ],
    default: {
        permissions: "read"
    }
}
```

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

```javascript
adminAuth: {
    sessionExpiryTime: 86400,
    ...
}
```

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

```javascript
module.exports = {
   type: "credentials",
   users: function(username) {
       return new Promise(function(resolve) {
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
       return new Promise(function(resolve) {
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
       return new Promise(function(resolve) {
           // Resolve with the user object for the default user.
           // If no default user exists, resolve with null.
           resolve({anonymous: true, permissions:"read"});
       });
   }
}
```

 -  Set the `adminAuth` property in settings.js to load this module:

```javascript
adminAuth: require("./user-authentication")
```


### HTTP Node security

The routes exposed by the HTTP In nodes can be secured using basic authentication.

The `httpNodeAuth` property in your `settings.js` file can be used to define a single
username and password that will be allowed to access the routes.

```javascript
httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},
```

The `pass` property uses the same format as `adminAuth`. See [Generating the password hash](#generating-the-password-hash) for more information.

Access to any static content defined by the `httpStatic` property can be secured
using the `httpStaticAuth` property, which uses the same format.

<div class="doc-callout">
<em>Note</em> : in previous releases of Node-RED, the <code>pass</code> property
was expected to be an MD5 hash. This is cryptographically insecure, so has been
superseded with bcrypt, as used by <code>adminAuth</code>. For backwards compatibility, MD5
hashes are still supported - but they are not recommended.
</div>
