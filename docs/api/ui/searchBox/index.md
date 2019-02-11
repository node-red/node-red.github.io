---
layout: docs
toc: api-toc.html
title: SearchBox Widget
---

An enhanced `<input>` element that provides common features for a search input.

<div class="widget">
    <div class="col-4-12">
        <h3>Options</h3>
        <table>
            <tr><td><a href="#options-delay">delay</a></td></tr>
            <tr><td><a href="#options-minimumLength">minimumLength</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>Methods</h3>
        <table>
            <tr><td><a href="#methods-change">change</a></td></tr>
            <tr><td><a href="#methods-count">count</a></td></tr>
            <tr><td><a href="#methods-value">value</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>Events</h3>
        <h3>Types</h3>
    </div>
</div>

### Options

#### <a href="#options-delay" name="options-delay">delay</a>

<span class="method-return">Type: number</span>

Sets the delay, in ms, after the last keystroke before a `change` event is fired.

#### <a href="#options-data" name="options-minimumLength">minimumLength</a>

<span class="method-return">Type: number</span>

Sets the minimum length of text before the input triggers a `change` event. Clearing
the input to 0 will always trigger a `change` event regardless of this setting.

### Methods

#### <a href="#methods-change" name="methods-change">change( )</a>

Trigger the change event on the search input.

```javascript
$(".input").searchBox('change');
```

#### <a href="#methods-count" name="methods-count">count( value )</a>

Sets a the value of the count label on the search box. This can be used to
provide feedback to the user as to how many 'things' the search currently
matches. The `value` is a string.

The standard pattern to follow is:

 - if the search box is empty, set it to the number of available items: `"300"`
 - if the search box is not empty, set it to the number of matching items, as
   well as the number of available items: `"120 / 300"`

If `value` is null, undefined or blank, the count field is hidden.

```javascript
$(".input").searchBox('count', '120 / 300');
```

<a name="methods-value"></a>

#### <a href="#methods-value-get" name="methods-value-get">value()</a>

<span class="method-return">Returns: String</span>

Gets the current value of the search input.

```javascript
var type = $(".input").searchBox('value');
```

#### <a href="#methods-value-set" name="methods-value-set">value( value )</a>

Sets the current value of the search input.

```javascript
$(".input").searchBox('value','hello');
```

<style>

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
