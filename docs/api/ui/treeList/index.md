---
layout: docs
toc: api-toc.html
title: TreeList Widget
---

__Since 0.20.0__

An list for displaying tree-structured data. This was added in 0.20.0 and has quite a minimal functionality.

<div class="widget">
    <div class="col-4-12">
        <h3>Options</h3>
        <table>
            <tr><td><a href="#options-data">data</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>Methods</h3>
        <table>
            <tr><td><a href="#methods-data">data</a></td></tr>
            <tr><td><a href="#methods-empty">empty</a></td></tr>
            <tr><td><a href="#methods-show">show</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>Events</h3>
        <table>
            <tr><td><a href="#events-treelistselect">treelistselect</a></td></tr>
            <tr><td><a href="#events-treelistmouseout">treelistmouseout</a></td></tr>
            <tr><td><a href="#events-treelistmouseover">treelistmouseover</a></td></tr>
        </table>
        <h3>Types</h3>
    </div>
</div>


### Options

#### <a href="#options-data" name="options-data">data</a>

<span class="method-return">Type: Array</span>

The initial data for the treelist.

The tree is represented as an Array of items. These are the top-most items in the
tree structure. Each item may have a `children` property that identifies the children
of the item.

```javascript
[
    {
        label: 'Local',
        icon: 'fa fa-rocket',
        children: [
            { label: "child 1"},
            { label: "child 2"}
        ]
    }
]
```

Each item can have the following properties:

Property   | Description
-----------|--------------------------
`label`    | The label for the item.
`id`       | (optional) A unique identifier for the item
`class`    | (optional) A css class to apply to the item
`icon`     | (optional) A css class to apply as the icon, for example `"fa fa-rocket"`.
`selected` | (optional) if set, display a checkbox next to the item. Its state is set to the boolean value of this property
`children` | (optional) Identifies the child items of this one. Can be provided as an array if the children are immediately known, or as a function to get the children asynchronously. See below for details.
`expanded` | (optional) If the item has children, set whether to display the children


If the `children` property is provided as a function, that function should accept
a single argument of a callback function. That callback function should be called
with the array of child items. This allows for the items to be retrieved asynchronously,
such as via HTTP request.

```javascript
children: function(done) {
    $.getJSON('/some/url', function(result) {
        done(result);
    })
}
```

### Methods

<a name="methods-data"></a>

#### <a href="#methods-data-get" name="methods-data">data()</a>

Returns the data the treeList is displaying.

If any items had the `selected` property set on them, its value will reflect
the current checkbox state.

#### <a href="#methods-data-set" name="methods-data">data( items )</a>

Sets the data to be displayed by the list.

See the [`data` option](#options-data) for details of the `items` argument.

```javascript
$(".input").treeList('data',[{label:"Colours"}]);
```

#### <a href="#methods-empty" name="methods-empty">empty()</a>

Removes all items from the list.

```javascript
$(".input").treeList('empty');
```

#### <a href="#methods-show" name="methods-show">show( itemId )</a>

Ensures an item is visible in the list. The argument `itemId` must correspond
with the `id` property of an item in the list.

*Note:* This currently only works for the top most items in the list. It cannot
be used to reveal items below the top level of the tree.

```javascript
$(".input").treeList('show','my-red-item');
```

### Events

#### <a href="#events-treelistselect" name="events-treelistselect">treelistselect( event, item )</a>

Triggered when an item is clicked. If the item had the `selected` property set originally,
its value will be updated to reflect the state of the item's checkbox.

```javascript
$(".input").on('treelistselect', function(event, item) {
    if (item.selected) {
        // The checkbox is checked
    } else {
        // The checkbox is not checked
    }
} );
```

#### <a href="#events-treelistmouseout" name="events-treelistmouseout">treelistmouseout( event, item )</a>

Triggered when the mouse moves out of the item.

```javascript
$(".input").on('treelistmouseout', function(event, item) { });
```

#### <a href="#events-treelistmouseover" name="events-treelistmouseover">treelistmouseover( event, item )</a>

Triggered when the mouse moves over an item.

```javascript
$(".input").on('treelistmouseover', function(event, item) { });
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
