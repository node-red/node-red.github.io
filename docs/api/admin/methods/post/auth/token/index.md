---
layout: docs
toc: api-toc.html
title: POST /auth/token
---

Exchange credentials for access token

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]`
`Content-type`             | `application/json`

### Arguments

The request body must be a JSON string with the following fields:

Field        | Description
-------------|------------------------
`client_id`  | identifies the client. Currently, must be either `node-red-admin` or `node-red-editor`.
`grant_type` | must be `password`
`scope`      | a space-separated list of permissions being requested. Currently, must be either `*` or `read`.
`username`   | the username to authenticate
`password`   | the password to authenticate


### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | See example response body
`401`       | Not authorized | _none_

{% highlight json %}
{
  "access_token": "A_SECRET_TOKEN",
  "expires_in":604800,
  "token_type": "Bearer"
}
{% endhighlight %}
