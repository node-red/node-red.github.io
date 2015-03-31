---
layout: api
title: GET /auth/login
---
Get the active authentication scheme

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | Success        | See example response body

In the current version, there are two possible responses:

#### No active authentication

    {}

#### Credential based authentication

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

The `prompts` field indicates what properties are required to be provided in the
[token exchange](../../../post/auth/token).

