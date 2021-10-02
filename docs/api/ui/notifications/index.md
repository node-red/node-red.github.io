---
layout: docs-api
toc: toc-api-ui.html
title: RED.notify
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'notifications'
---


This API can be used to display notifications that pop-down from the top of the editor.

As these notifications interrupt the user, they should be used sparingly.

 - [`RED.notify`](#rednotifymessage-options)
     - [Configuration options](#configuration-options)
     - [Notification buttons](#notification-buttons)
     - [Notification object](#notification-object)
 - [Examples](#examples)
     - [Plain information notification](#plain-information-notification)
     - [Warning notification for 10 seconds](#warning-notification-for-10-seconds)
     - [Notification with buttons](#notification-with-buttons)


### `RED.notify(message, [options])`

 - `message` - the text to be displayed in the notification
 - `options` - configuration options for the notification

The function returns a `notification` object that can be used to interact with
the notification.

#### Configuration options

The following properties can be provided in the `options` argument. All are optional.

Option | Description
-------|--------------
`type` | Sets the appearance of the notification. Available values are: `compact`, `success`, `warning`, `error`. If this value is not set, the notification uses the default 'info' appearance.
`timeout` | How long the notification should be shown for, in milliseconds. Default: `5000`. This is ignored if the `fixed` property is set.
`fixed` | Do not hide the notification after a timeout. This also prevents the click-to-close default behaviour of the notification.
`modal` | If set to `true`, the notification should prevent interaction with any other UI element until the notification has been dismissed.
`buttons` | An array of buttons to display on the notification to allow user interaction.

#### Notification buttons

The `buttons` option can be used to provide a set of buttons that should be displayed on the notification.

For example, to have a 'cancel' and 'okay' button, the following can be used (see further below for a fuller example that explains `myNotification.close()`).

```javascript
buttons: [
    {
        text: "cancel",
        click: function(e) {
            myNotification.close();
        }
    },
    {
        text: "okay",
        class:"primary",
        click: function(e) {
            myNotification.close();
        }
    }
```

The `class` property can be used to specify an additional CSS class for the button. If the notification has multiple buttons, there should be one with the class set to `primary` to indicate the primary button for the user to click.

#### Notification object

The `RED.notify()` call returns a `notification` object. This object provides the following functions:

Function | Description
---------|---------
`notification.close()` | Close the notification and dispose of it.
`notification.update( message, options )` | Replace the contents of the notification.

### Examples

#### Plain information notification

```javascript
RED.notify("Hello World");
```

#### Warning notification for 10 seconds

```javascript
RED.notify("Something has happened", { type: "warning", timeout: 10000 });
```

#### Notification with buttons

This example shows how the returned `myNotification` object is then used in the button event handlers to close the notification.

```javascript
let myNotification = RED.notify("This is the message to display",{
    modal: true,
    fixed: true,
    type: 'warning',
    buttons: [
        {
            text: "cancel",
            click: function(e) {
                myNotification.close();
            }
        },
        {
            text: "okay",
            class:"primary",
            click: function(e) {
                myNotification.close();
            }
        }
    ]
});
```
