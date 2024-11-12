---
layout: docs-user-guide
toc: toc-user-guide.html
title: Securing Node-RED
slug: security
redirect_from:
  - /docs/security
---

By default, the Node-RED editor is not secured - anyone who can access its IP address
can access the editor and deploy changes.

This is only suitable if you are running on a trusted network.

This guide describes how you can secure Node-RED. The security is split into
three parts:

 - [Enabling HTTPS access](#enabling-https-access)
 - [Securing the editor and admin API](#editor--admin-api-security)
 - [Securing the HTTP Nodes and Node-RED Dashboard](#http-node-security)

### Enabling HTTPS Access

To enable access to the Node-RED Editor over HTTPS, rather than the default HTTP,
you can use the `https` configuration option in your [settings file](settings-file).

The `https` option can be either a static set of configuration options, or, since
Node-RED 1.1.0, a function that returns the options.

The full set of options are [documented here](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options).

As a minimum, the options should include:

 - `key` - Private key in PEM format, provided as a `String` or `Buffer`
 - `cert` - Cert chain in PEM format, provided as a `String` or `Buffer`



<div class="doc-callout">
For a guide on how to generate certificates, you can follow <a href="https://it.knightnet.org.uk/kb/nr-qa/https-valid-certificates/">this guide</a>.
</div>

The default Node-RED settings file includes a commented out `https` section that
can be used to load the certificates from local files.

```javascript
https: {
    key: require("fs").readFileSync('privkey.pem'),
    cert: require("fs").readFileSync('cert.pem')
},
```

*Since Node-RED 1.1.0*

If the `https` property is a function, it can be used to return the options object.
The function can optionally return a Promise that will resolve to the options object,
allowing it to complete asynchronously.

```javascript
https: function() {
    return new Promise((resolve, reject) => {
        var key, cert;
        // Do some work to obtain valid certificates
        // ...
        resolve({
            key: key
            cert: cert
        })
    });
}
```

#### Refreshing HTTPS certificates

*Since Node-RED 1.1.0*

It is possible to configure Node-RED to periodically refresh its HTTPS certificates
without having to restart Node-RED. To do this:

1. You *must* be using Node.js 11 or later
2. The `https` setting *must* be a Function that can be called to get the updated certificates
3. Set the `httpsRefreshInterval` to how often (in hours) Node-RED should call the `https` function
   to get updated details.

The `https` function should determine if the current certificates will expire within the next
`httpsRefreshInterval` period, and if so, generate a new set of certificates. If no update
is required, the function can return `undefined` or `null`.


### Editor & Admin API security

The Editor and Admin API supports two types of authentication:

 - username/password credential based authentication
 - authentication against any OAuth/OpenID provider such as Twitter or GitHub

#### Username/password based authentication

To enable user authentication on the Editor and Admin API, uncomment the `adminAuth`
property in your [settings file](settings-file):

```javascript
adminAuth: {
    type: "credentials",
    users: [
        {
            username: "admin",
            password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
            permissions: "*"
        },
        {
            username: "george",
            password: "$2b$08$wuAqPiKJlVN27eF5qJp.RuQYuy6ZYONW7a/UWYxDTtwKFCdB8F19y",
            permissions: "read"
        }
    ]
}
```

The `users` property is an array of user objects. This allows you to define
multiple users, each of whom can have different permissions.

This example configuration above defines two users. One called `admin` who has
permission to do everything within the editor and has a password of `password`.
The other called `george` who is given read-only access.

Note that the passwords are securely hashed using the bcrypt algorithm.

<div class="doc-callout">
<em>Note</em> : in previous releases of Node-RED, the setting <code>httpAdminAuth</code>
could be used to enable HTTP Basic Authentication on the editor. This option is
deprecated and should not be used.
</div>

#### Generating the password hash

If you are using Node-RED 1.1.0 or later, you can use the command:
```
node-red admin hash-pw
```

For older versions of Node-RED, you can either:

 - Install the separate [`node-red-admin` command-line tool](../node-red-admin) and use the command:

        node-red-admin hash-pw

 - Or, locate the directory Node-RED has been installed to and use the command:

        node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here


In all cases, you will get back the hashed version of your password which you can then
paste into your settings file.


#### OAuth/OpenID based authentication

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
            callbackURL: "http://example.com/auth/strategy/callback",
            verify: function(token, tokenSecret, profile, done) {
                done(null, profile);
            }
        },
    },
    users: [
       { username: "knolleary",permissions: ["*"]}
    ]
}
```

The `strategy` property takes the following options:

 - `name` - the name of the passport strategy being used
 - `strategy` - the passport strategy module
 - `label`/`icon` - used on the login page. `icon` can be any FontAwesome icon name.
 - `options` - an options object passed to the passport strategy when it is created.
   Refer to the strategy's own documentation for what it requires. See below for a
   note on the `callbackURL` and `callbackMethod`.
 - `verify` - the verify function used by the strategy. It must call `done` with
   a user profile as the second argument if the user is valid. This is expected
   to have a `username` property that is used to check against the list of valid
   users. Passport attempts to standardize the user profile object, so most strategies
   provide this property.
- `autoLogin` - boolean, when `true` will automatically redirect to the authentication
   provider rather than asking the user to click a button.

The `callbackURL` used by a strategy is where the authentication provider will
redirect to following an auth attempt. It must be the URL of your Node-RED editor
with `/auth/strategy/callback` added to the path. For example, if you access the
editor at `http://localhost:1880`, you would use `http://localhost:1880/auth/strategy/callback`.

By default, the `callbackURL` will listen for `GET` requests. To use `POST` requests
instead, set `callbackMethod` to `POST`.

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

Each method of the [Admin API](/docs/api/admin) defines what permission level is needed to access it.
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

With the `adminAuth` property set, the [Admin API documentation](/docs/api/admin/oauth)
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

#### Custom authentication tokens

*Since Node-RED 1.1.0*

In some circumstances you may need to use your own authentication tokens and not use
those generated by Node-RED. For example:

 - You want to use OAuth based user authentication, but you also require automated access
   to the admin API which cannot perform the interactive authentication steps OAuth requires
 - You want to integrate Node-RED into an existing system where the users will already be
   logged in and you don't want them to have to log in again when accessing the editor

The `adminAuth` setting can include a `tokens` function. This function will be called
if a request to the admin api does not contain an authentication token that Node-RED
recognises as one of its own. It is passed the token provided in the request and should
return a Promise that resolves with either the authenticated user, or `null` if the
token is not valid.

```javascript
adminAuth: {
    ...
    tokens: function(token) {
        return new Promise(function(resolve, reject) {
            // Do whatever work is needed to check token is valid
            if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: 'admin', permissions: '*' };
                resolve(user);
            } else {
                // Resolve with null as this user does not exist
                resolve(null);
            }
        });
    },
    ...
}
```

By default, it will use the `Authorization` http header and expect a `Bearer` type
token - passing in just the value of the token to the function. If it is not a
`Bearer` type token, then the full value of the `Authorization` header will be
passed to the function, containing both type and value.

To use a different HTTP header, the `tokenHeader` setting can be used to identify
which header to use:

```javascript
adminAuth: {
    ...
    tokens: function(token) {
        ...
    },
    tokenHeader: "x-my-custom-token"
}
```

##### Accessing the editor with a custom token

To access the editor using a custom token without the login prompt, add `?access_token=<ACCESS_TOKEN>`
to the URL. The editor will store that token locally and use it for all future requests.


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

### Custom Middleware

It is possible to provide custom HTTP middleware that will be added in front of
all `HTTP In` nodes and, since Node-RED 1.1.0, in front of all admin/editor routes.

##### Custom Middleware for http-in nodes

For the `HTTP In` nodes, the middleware is provided as the `httpNodeMiddleware` setting.

The following setting is an example to limit the HTTP access rate in http-in nodes.

```javascript
// Run `npm install express-rate-limit` on `~/.node-red/` directory in advance
var rateLimit = require("express-rate-limit");
module.exports = {
    httpNodeMiddleware: rateLimit({
        windowMs: 1000, // 1000 milliseconds is set as the window time.
        max: 10 // limit access rate to 10 requests/second
    })
}
```

Using this configuration, the Node-RED process can avoid memory exhaustions even if the flows which start with the http-in node take time to process.
When reaching the limitation, the endpoints will return the default message, "Too many requests, please try again later.".

##### Custom Middleware for Admin API

For the admin/editor routes, the middleware is provided as the `httpAdminMiddleware` setting.

For example, the following middleware could be used to set the `X-Frame-Options` http header
on all admin/editor requests. This can be used to control how the editor is embedded on
other pages.

```javascript
httpAdminMiddleware: function(req, res, next) {
    // Set the X-Frame-Options header to limit where the editor
    // can be embedded
    res.set('X-Frame-Options', 'sameorigin');
    next();
},
```

Other possible uses would be to add additional layers of security or request verification
to the routes.
