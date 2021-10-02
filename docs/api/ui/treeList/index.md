---
layout: docs-api
toc: toc-api-ui.html
title: TreeList Widget
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'treelist'
---

__Since 0.20.0__

A list for displaying tree-structured data. This was added in 0.20.0 and has quite a minimal functionality.

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
`checkbox` | (optional) If set, displays a checkbox next to the item.
`radio`    | (optional) *since 2.1* If set, and `checkbox` not set, displays a radio box next to the item. The value should be a string used to group the radio buttons.
`selected` | (optional) Sets the initial selected state of the item.
`children` | (optional) Identifies the child items of this one. Can be provided as an array if the children are immediately known, or as a function to get the children asynchronously. See below for details.
`expanded` | (optional) If the item has children, set whether to display the children
`deferBuild` | (optional) Delay building any UI elements for the item's children until it is expanded for the first time. This can have a significant performance benefit for large data sets.
`element` | (optional) Custom DOM element to be used in place of the node's label. This is ignored if `label` is set.

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

After the item has been added to the treeList, it is augmented with some additional properties
and functions:

Property      | Description
--------------|--------------------------
`item.parent` | The parent item in the tree
`item.depth`  | The depth in the tree, with `0` being the root of the tree
`item.treeList.container` | The DOM element containing the item
`item.treeList.label`     | The DOM element containing the label

Function         | Description
-----------------|---------------------------
`item.treeList.remove(detach)` | Remove the item from the tree. Set `detach` to `true` to preserve any event handlers on the item - required if the item is going to be readded elsewhere.
`item.treeList.makeLeaf(detachChildElements)` | Turns an element with children into a leaf node, removing the UI decoration. Set `detachChildElements` to `true` to preseve any child element event handlers.
`item.treeList.makeParent(children)` | Make the item a parent item, adding the child items
`item.treeList.insertChildAt(item, pos, select)` | Adds a new item at the desired position, optionally selecting it after doing so
`item.treeList.addChild(item, select)` | Appends a child item, optionally selecting it after doing so
`item.treeList.expand(done)` | Expand the item to show child items, with optional `done` callback that is called when complete
`item.treeList.collapse()` | Collapse the item to hide its children
`item.treeList.sortChildren(sortFunction)` | Sort the item's children using the provided sort function. The sort function should match the compareFunction used with [`Array.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
`item.treeList.replaceElement(element)` | Replace the item's custom DOM element

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

*Note:* This currently only works for the topmost items in the list. It cannot
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
