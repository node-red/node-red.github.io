---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Node properties
slug: properties
---

A node's properties are defined by the `defaults` object in its html definition.
These are the properties that get passed to the node constructor function when
an instance of the node is created in the runtime.

In the example from the [creating your first node section](first-node), the
node had a single property called `name`. In this section, we'll add a new
property called `prefix` to the node:

1. Add a new entry to the `defaults` object:

        defaults: {
            name: {value:""},
            prefix: {value:""}
        },

   The entry includes the default `value` to be used when a new node of this type
   is dragged onto the workspace.

2. Add an entry to the edit template for the node

        <div class="form-row">
            <label for="node-input-prefix"><i class="icon-tag"></i> Prefix</label>
            <input type="text" id="node-input-prefix">
        </div>

    The template should contain an `<input>` element with an `id` set to
    `node-input-<propertyname>`.

3. Use the property in the node

        function LowerCaseNode(config) {
            RED.nodes.createNode(this,config);
            this.prefix = config.prefix;
            var node = this;
            this.on('input', function(msg) {
                msg.payload = node.prefix + msg.payload.toLowerCase();
                node.send(msg);
            });
        }

### Property definitions

The entries in the `defaults` object can have the following attributes:

- `value` : (any type) the default value the property takes
- `required` : (boolean) *optional* whether the property is required. If set to
  true, the property will be invalid if its value is null or an empty string.
- `validate` : (function) *optional* a function that can be used to validate the
  value of the property.
- `type` : (string) *optional* if this property is a pointer to a
  [configuration node](config-nodes),  this identifies the type of the node.

### Reserved property names

There are some reserved names for properties that must not be used. These are:

> `type`, `x`, `y`, `z`, `wires`, `outputs`


If a node wants to allow the number of outputs it provides to be configurable
then `outputs` may be included in the `defaults` array. The Function node is
an example for how this works.

### Property validation

The editor attempts to validate all properties to warn the user if invalid values
have been given.

The `required` attribute can be used to indicate a property must be non-null and
non-blank.

If more specific validation is required, the `validate` attribute can be used to
provide a function that will check the value is valid. The function is passed the
value and should return either true or false. It is called within the context of
the node which means `this` can be used to access other properties of the node.
This allows the validation to depend on other property values.
While editing a node the `this` object reflects the current configuration of the
node and **not** the current form element value. The validator function should
try to access the property configuration element and take the `this` object as
fallback to achieve the right user experience.

There is a group of common validation functions provided.

 - `RED.validators.number()` - check the value is a number
 - `RED.validators.regex(re)` - check the value matches the provided regular
   expression

Both methods - `required` attribute and `validate` attribute - are reflected by
the UI in the same way. The missing configuration marker on the node is triggered
and the corresponding input is red surrounded when a value is not valid or missing.


The following example shows how each of these validators can be applied.

```javascript
defaults: {
   minimumLength: { value:0, validate:RED.validators.number() },
   lowerCaseOnly: {value:"", validate:RED.validators.regex(/[a-z]+/) },
   custom: { value:"", validate:function(v) {
      var minimumLength=$("#node-input-minimumLength").length?$("#node-input-minimumLength").val():this.minimumLength;
      return v.length > minimumLength
   } }
},
```

Note how the `custom` property is only valid if its length is greater than the
current value of the `minimumLength` property or the value of the minimumLength
form element.

### Property edit dialog

When the edit dialog is opened, the editor populates the dialog with the edit
template for the node.

For each of the properties in the `defaults` array, it looks for an `<input>`
element with an `id` set to `node-input-<propertyname>`. This input is then
automatically populated with the current value of the property. When the edit
dialog is okayed, the property takes whatever value is in the input.

The `<input>` type can be either `text` for string/number properties, or
`checkbox` for boolean properties. Alternatively, a `<select>` element can be
used if there is a restricted set of choices.

#### Custom edit behaviour

The default behaviour works in many cases, but sometimes it is necessary to
define some node-specific behaviour. For example, if a property cannot be
properly edited as a simple `<input>` or `<select>`, or if the edit dialog
content itself needs to have certain behaviours based on what options are
selected.

A node definition can include two functions to customise the edit behaviour.

 - `oneditprepare` is called immediately before the dialog is displayed.
 - `oneditsave` is called when the edit dialog is okayed.
 - `oneditcancel` is called when the edit dialog is cancelled.
 - `oneditdelete` is called when the delete button in a configuration node's edit
   dialog is pressed.
 - `oneditresize` is called when the edit dialog is resized.

For example, when the Inject node is configured to repeat, it stores the
configuration as a cron-like string: `1,2 * * * *`. The node defines an
`oneditprepare` function that can parse that string and present a more
user-friendly UI. It also has an `oneditsave` function that compiles the options
chosen by the user back into the corresponding cron string.
