---
layout: api
title: Authentication
---
The Node-RED admin API is secured using the `adminAuth` property in your `settings.js`
file. The [security](/docs/security) section describes how that property
should be configured.

If that property is not set the Node-RED admin API is accessible to anyone with
network access to Node-RED.


### Step 0 - Check the authentication scheme

An HTTP GET to `/auth/login` returns the active authentication scheme.

<div class="doc-callout"><em>curl example</em>:
<pre>curl http://localhost:1880/auth/login</pre>
</div>

In the current version of the API, there are two possible results:

##### No active authentication

    {}

All API requests can be made without providing any further authentication
information.

##### Credential based authentication

{% highlight json %}
{
  "type": "credentials",
  "prompts": [
    {
      "id": "username",
      "type": "text",
      "label": "Username"
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password"
    }
  ]
}
{% endhighlight %}

The API is secured by access token.


### Step 1 - Obtain an access token

An HTTP POST to `/auth/token` is used to exchange user credentials for an access
token.

The following parameters must be provided:

 - `client_id` - identifies the client. Currently, must be either `node-red-admin` or `node-red-editor`.
 - `grant_type` - must be `password`
 - `scope` - a space-separated list of permissions being requested. Currently, must be either `*` or `read`.
 - `username` - the username to authenticate
 - `password` - the password to authenticate

<div class="doc-callout"><em>curl example</em>:
<pre>curl http://localhost:1880/auth/token --data 'client_id=node-red-admin&grant_type=password&scope=*&username=admin&password=password'</pre>
</div>

If successful, the response will contain the access token:

{% highlight json %}
{
  "access_token": "A_SECRET_TOKEN",
  "expires_in":604800,
  "token_type": "Bearer"
}
{% endhighlight %}

### Step 2 - Using the access token

All subsequent API calls should then provide this token in the `Authorization`
header.

<div class="doc-callout"><em>curl example</em>:
<pre>curl -H "Authorization: Bearer A_SECRET_TOKEN" http://localhost:1880/settings</pre>
</div>

### Revoking the token

To revoke the token when it is no longer required, it should be sent in an HTTP
POST to `/auth/revoke`:

<div class="doc-callout"><em>curl example</em>:
<pre>curl --data 'token=A_SECRET_TOKEN' -H "Authorization: Bearer A_SECRET_TOKEN" http://localhost:1880/auth/revoke</pre>
</div>
