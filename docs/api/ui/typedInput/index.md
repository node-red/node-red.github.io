---
layout: docs-api
toc: toc-api-ui.html
title: TypedInput Widget
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'typedinput'
---

A replacement for a regular `<input>` that allows the type of the value to be
chosen, including options for string, number and boolean types.

- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Types](#types)
- [Examples](#examples)


<div class="widget">
    <div style="clear:both">
        <div class="col-1-2">
            <h3>Options</h3>
            <table>
                <tr><td><a href="#options-default">default</a></td></tr>
                <tr><td><a href="#options-types">types</a></td></tr>
                <tr><td><a href="#options-typeField">typeField</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>Methods</h3>
            <table>
                <tr><td><a href="#methods-disable">disable</a></td></tr>
                <tr><td><a href="#methods-disabled-get">disabled</a></td></tr>           
                <tr><td><a href="#methods-enable">enable</a></td></tr>
                <tr><td><a href="#methods-hide">hide</a></td></tr>
                <tr><td><a href="#methods-show">show</a></td></tr>
                <tr><td><a href="#methods-type">type</a></td></tr>
                <tr><td><a href="#methods-types">types</a></td></tr>
                <tr><td><a href="#methods-validate">validate</a></td></tr>
                <tr><td><a href="#methods-value">value</a></td></tr>
                <tr><td><a href="#methods-width">width</a></td></tr>
            </table>
        </div>
    </div>
    <div style="clear:both">
        <div class="col-1-2">
            <h3>Events</h3>
            <table>
                <tr><td><a href="#events-change">change</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>Types</h3>
            <table>
            <tr><td><a href="#types-typedefinition">TypeDefinition</a></td></tr>
            </table>
        </div>
    </div>
</div>


### Options

#### <a href="#options-default" name="options-default">default</a>

<span class="method-return">Type: String</span>

If defined, sets the default type of the input if [`typeField`](#options-typeField)
is not set.

```javascript
$(".input").typedInput({
    default: "msg"
});
```

#### <a href="#options-types" name="options-types">types</a>

<span class="method-return">Type: Array</span>

Sets the list of types the element will offer.

The value of the option is an array of string-identifiers for the
predefined types and [TypeDefinition](#types-typedefinition) objects for any custom types.

The predefined types are:

identifier | description
-----------|------------
`msg` | a `msg.` property expression
`flow` | a `flow.` property expression
`global` | a `global.` property expression
`str` | a String
`num` | a Number
`bool` | a Boolean
`json` | a valid JSON string
`bin` | a Node.js Buffer
`re` | a Regular Expression
`jsonata` | a Jsonata Expression
`date` | the current timestamp
`env` | an environment variable
`node` | a `node.` property expression
`cred` | a secure credential

```javascript
$(".input").typedInput({
    types: ["msg","str"]
});
```

#### <a href="#options-typeField" name="options-typeField">typeField</a>

<span class="method-return">Type: CSS Selector</span>

In some circumstances it is desirable to already have an `<input>` element to store
the type value of the typedInput. This option allows such an existing element to be
provided. As the type of the typedInput is changed, the value of the provided input
will also change.
The type field should also be added as a property of the defaults object so that it is saved.

```javascript
$(".input").typedInput({
    typeField: ".my-type-field"
});
```

### Methods

<a name="methods-type"></a>

#### <a href="#methods-disable" name="methods-disable">disable( state )</a>

*Since Node-RED 1.2.7*

Disable the typedInput when it is currently enabled.

The optional `state` parameter can be used to toggle the disabled/enabled state of the typedInput. If `state` is true, the element will be disabled, otherwise it will be enabled.

```javascript
$(".input").typedInput('disable');
```

#### <a href="#methods-disabled-get" name="methods-disabled-get">disabled()</a>

*Since Node-RED 1.2.7*

<span class="method-return">Returns: Boolean</span>

Gets whether the typedInput is currently disabled or not.

```javascript
$(".input").typedInput('disabled');
```

#### <a href="#methods-enable" name="methods-disable">enable()</a>

*Since Node-RED 1.3.3*

Enable the typedInput when it is currently disabled.

```javascript
$(".input").typedInput('enable');
```



#### <a href="#methods-hide" name="methods-hide">hide()</a>

Hide the typedInput when it is currently visible.

```javascript
$(".input").typedInput('hide');
```

#### <a href="#methods-show" name="methods-show">show()</a>

Show the typedInput when it is currently hidden.

```javascript
$(".input").typedInput('show');
```

#### <a href="#methods-type-get" name="methods-type-get">type()</a>

<span class="method-return">Returns: String</span>

Gets the selected type of the typedInput.

```javascript
var type = $(".input").typedInput('type');
```

#### <a href="#methods-type-set" name="methods-type-set">type( type )</a>

Sets the selected type of the typedInput.

```javascript
$(".input").typedInput('type','msg');
```

#### <a href="#methods-types" name="methods-types">types( types )</a>

Sets the list of types offered by the typedInput. See the description of the [`types` option](#options-types).

```javascript
$(".input").typedInput('types',['str','num']);
```

#### <a href="#methods-validate" name="methods-validate">validate()</a>

<span class="method-return">Returns: Boolean</span>

Triggers a revalidation of the typedInput's type/value. This occurs automatically
whenever the type or value change, but this method allows it to be run manually.

```javascript
var isValid = $(".input").typedInput('validate');
```

<a name="methods-value"></a>

#### <a href="#methods-value-get" name="methods-value-get">value()</a>

<span class="method-return">Returns: String</span>

Gets the value of the typedInput.

```javascript
var value = $(".input").typedInput('value');
```

#### <a href="#methods-value-set" name="methods-value-set">value( value )</a>

Sets the value of the typedInput.

```javascript
$(".input").typedInput('value','payload');
```

#### <a href="#methods-width" name="methods-width">width( width )</a>

Sets the width of the typedInput.

```javascript
$(".input").typedInput('width', '200px');
```

### Events

#### <a href="#events-change" name="events-change">change( event, type, value )</a>

Triggered when either the type or value of the input is changed.

```javascript
$(".input").on('change', function(event, type, value) {} );
```

*Note:* The `value` property was added in Node-RED 1.3

### Types

#### <a href="#types-typedefinition" name="types-typedefinition">TypeDefinition</a>

A `TypeDefinition` object describes a type that can be offered by a typedInput
element.

It is an object with the following properties:

Property | Type    | Required | Description
---------|---------|----------|-------------
`value`  | string  | yes      | The identifier for the type
`label`  | string  |          | A label to display in the type menu
`icon`   | string  |          | An icon to display in the type menu. This can be either an image url, or a FontAwesome 4 icon, for example `"fa fa-list"`.
`options`| array   |          | If the type has a fixed set of values, this is an array of string options for the value. For example, `["true","false"]` for the boolean type.
`multiple`|boolean |          | If `options` is set, this can enable multiple selection of them.
`hasValue`|boolean |          | Set to `false` if there is no value associated with the type.
`validate`|function|          | A function to validate the value for the type.
`valueLabel` | function |     | A function that generates the label for a given value. The function takes two arguments: `container` - the DOM element the label should be constructed in, and `value`.
`autoComplete` | function |   | *Since 2.1.0.* If set, enable autoComplete on the input, using this function to get completion suggestions. See [autoComplete](../autoComplete) for details. This option cannot be used with `options`, `hasValue=false` or `valueLabel`


### Examples

#### Built-in String, Number, Boolean types

```html
<input type="text" id="node-input-example1">
```

```javascript
$("#node-input-example1").typedInput({
    type:'str',
    types:['str','num','bool']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example1"></div>

#### Message Properties

```html
<input type="text" id="node-input-example2">
```

```javascript
$("#node-input-example2").typedInput({
    type:'msg',
    types:['msg']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example2"></div>

#### Flow/Global Context Properties

```html
<input type="text" id="node-input-example3">
```

```javascript
$("#node-input-example3").typedInput({
    type:'flow',
    types:['flow','global']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example3"></div>


#### Select from a list of options

```html
<input type="text" id="node-input-example4">
```

```javascript
$("#node-input-example4").typedInput({type:"fruit", types:[{
    value: "fruit",
    options: [
        { value: "apple", label: "Apple"},
        { value: "banana", label: "Banana"},
        { value: "cherry", label: "Cherry"},
    ]
}]})
```

<div class="red-ui-editor"><input type="text" id="node-input-example4"></div>


#### Select multiple items from a list of options

```html
<input type="text" id="node-input-example5">
```

```javascript
$("#node-input-example5").typedInput({type:"fruit", types:[{
    value: "fruit",
    multiple: true,
    options: [
        { value: "apple", label: "Apple"},
        { value: "banana", label: "Banana"},
        { value: "cherry", label: "Cherry"},
    ]
}]})
```

<div class="red-ui-editor"><input type="text" id="node-input-example5"></div>




<script src="/js/jquery-ui.min.js"></script>
<script>
    var RED = {};
    RED.settings = {};
    RED.editor = { editJSON: function(){}}
</script>
<script src="/js/utils.js"></script>
<script src="/js/autoComplete.js"></script>
<script src="/js/typedInput.js"></script>
<script src="/js/popover.js"></script>
<link rel="stylesheet" href="/css/editor-style.min.css">
<style>
.red-ui-editor {
    border: 1px solid #564848;
    background: white;
    border-radius: 2px;
    padding: 40px 20px;
}
.widget h3 {
    margin-left: 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #B68181;
}
.widget:after {
    content:"";
    display:block;
    clear:both;
}
.method-return {
    float: right;
    font-style: italic;
    padding-left: 10px;
    border-left: 2px solid #B68181;
}
</style>

<script>
$(function() {
    $("#node-input-example1").typedInput({type:'str',types:['str','num','bool']})
    $("#node-input-example2").typedInput({type:'msg',types:['msg']})
    $("#node-input-example3").typedInput({type:'flow',types:['flow','global']})
    $("#node-input-example4").typedInput({type:"fruit", types:[{
        value: "fruit",
        options: [
            { value: "apple", label: "Apple"},
            { value: "banana", label: "Banana"},
            { value: "cherry", label: "Cherry"},
        ]
    }]})
    $("#node-input-example5").typedInput({type:"fruit", types:[{
        value: "fruit",
        multiple: true,
        options: [
            { value: "apple", label: "Apple"},
            { value: "banana", label: "Banana"},
            { value: "cherry", label: "Cherry"},
        ]
        }]})
});
</script>
