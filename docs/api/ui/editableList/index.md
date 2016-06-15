---
layout: api
title: EditableList Widget
---


A replacement for a `<ol>` element where the items can be complex elements in their
own right. Used by the core `Switch` and `Change` nodes.

_Since: 0.14_

<div class="widget">
    <div class="col-4-12">
        <h3>Options</h3>
        <table>
            <tr><td><a href="#options-addButton">addButton</a></td></tr>
            <tr><td><a href="#options-addItem">addItem</a></td></tr>
            <tr><td><a href="#options-connectWith">connectWith</a></td></tr>
            <tr><td><a href="#options-height">height</a></td></tr>
            <tr><td><a href="#options-resize">resize</a></td></tr>
            <tr><td><a href="#options-resizeItem">resizeItem</a></td></tr>
            <tr><td><a href="#options-sortable">sortable</a></td></tr>
            <tr><td><a href="#options-sortItems">sortItems</a></td></tr>
            <tr><td><a href="#options-removable">removable</a></td></tr>
            <tr><td><a href="#options-removeItem">removeItem</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>Methods</h3>
        <table>
            <tr><td><a href="#methods-addItem">addItem</a></td></tr>
            <tr><td><a href="#methods-removeItem">removeItem</a></td></tr>
            <tr><td><a href="#methods-width">width</a></td></tr>
            <tr><td><a href="#methods-height">height</a></td></tr>
            <tr><td><a href="#methods-items">items</a></td></tr>
            <tr><td><a href="#methods-empty">empty</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
    <h3>Events</h3>
    <h3>Types</h3>
    </div>
</div>


### Options

#### <a href="#options-addButton" name="options-addButton">addButton</a>

<span class="method-return">Type: Boolean|String</span>

Determines whether a button is shown below the list that, when clicked, will add
a new entry to the list.

If not specified, or set to `true` (boolean) a button is shown with the text 'Add'.

If set to `false` (boolean), the button is not shown.

If set to a non-blank string, a button is shown using its value as the text of the button.

    $("ol.list").editableList({
        addButton: "pets"
    });

#### <a href="#options-addItem" name="options-addItem">addItem( row, index, data )</a>

<span class="method-return">Type: Function</span>

A callback function that gets called when a new item is being added to the list.

 - `row` - the jQuery DOM element to which any row content should be added
 - `index` - the index of the row
 - `data` - the data object for the row

If it was triggered by clicking the 'add button', `data` will be `{}`. Otherwise
it will be the data passed to the call to the [`addItem`](#methods-addItem) method.

    $("ol.list").editableList({
        addItem: function(row, index, data) {
            $(row).html("Item "+index);
        }
    });

#### <a href="#options-connectWith" name="options-connectWith">connectWith</a>

<span class="method-return">Type: CSS Selector</span>

If the list is [sortable](#options-sortable), this option allows items to be
dragged from this list to any other jQuery `sortable` list, such as another `editableList`.

    $("ol.list").editableList({
        connectWith: ".my-other-list"
    });


#### <a href="#options-height" name="options-height">height</a>

<span class="method-return">Type: String|Number</span>

Sets the height of the list including, if enabled, its add button.

    $("ol.list").editableList({
        height: 300
    });


#### <a href="#options-resize" name="options-resize">resize()</a>

<span class="method-return">Type: Function</span>

A function that gets called when the size of the list changes.

    $("ol.list").editableList({
        resize: function() {
            console.log("I have changed in size")
        }
    });

#### <a href="#options-resizeItem" name="options-resizeItem">resizeItem( row, index )</a>

<span class="method-return">Type: Function</span>

A function that gets called against each item in the list when the size
of the list changes.

 - `row` - the jQuery DOM element for the row
 - `index` - the index of the row

The original data for the item is stored under a property called `data`.

This callback is invoked after the main [`resize`](#options-resize) callback is called.

    $("ol.list").editableList({
        resizeItem: function(row,index) {
            var originalData = $(row).data('data');
            consol.log("Resize the row for item:", originalData)
        }
    });

#### <a href="#options-sortable" name="options-sortable">sortable</a>

<span class="method-return">Type: Boolean|CSS Selector</span>

Determines whether the list items can be dragged to sort them.

If set to `true` (boolean), a default drag handle is displayed alongside the item.

If set to a CSS Selector, that is used to identify the element that should be used
as the drag handle within the item's content element.

    $("ol.list").editableList({
        sortable: true
    });

#### <a href="#options-sortItems" name="options-sortItems">sortItems( items )</a>

<span class="method-return">Type: Function</span>

A function that is called after an item in the list is moved.

 - `items` - an Array of the jQuery DOM elements for each row, in order.

Each row element stores the original data for the item under property called `data`.

    $("ol.list").editableList({
        sortItems: function(items) {
            console.log("The items have changed order")
        }
    });


#### <a href="#options-removable" name="options-removable">removable</a>

<span class="method-return">Type: Boolean</span>

If set to `true`, each row is displayed with a delete button on the right-hand side.
Clicking the button will remove the row from the list and trigger the
[`removeItem`](#options-removeItem) callback, if set.

$("ol.list").editableList({
    removable: true
});

#### <a href="#options-removeItem" name="options-removeItem">removeItem( data )</a>

<span class="method-return">Type: Function</span>

A function that is called when an item is removed from the list.

 - `data` - the original data item for the item

The remove can be triggered by either clicking an item's [remove button](#options-removable),
or calling the [`remoteItem` method](#methods-removeItem).


    $("ol.list").editableList({
        removeItem: function(data) {
            console.log("An item has been removed")
        }
    });


### Methods

#### <a href="#methods-addItem" name="methods-addItem">addItem( itemData )</a>

Adds an item to the end of the list. `itemData` is an object that will be associated
with the item in the list.

    $("ol.list").editableList('addItem',{fruit:"banana"});

#### <a href="#methods-removeItem" name="methods-removeItem">removeItem( itemData )</a>

Removes an item from the list. `itemData` is the object that identifies the item
to be removed.

    $("ol.list").editableList('removeItem',{fruit:"banana"});

#### <a href="#methods-width" name="methods-width">width( width )</a>

Sets the width of the editableList. This must be used in place of the standard
`jQuery.width()` function as it ensures the component resizes properly.

    $("ol.input").editableList('width', '200px');


#### <a href="#methods-height" name="methods-height">height( height )</a>

Sets the height of the editableList. This must be used in place of the standard
`jQuery.height()` function as it ensures the component resizes properly.

    $("ol.input").editableList('height', '200px');


#### <a href="#methods-items" name="methods-items">items()</a>

<span class="method-return">Type: Array</span>

Gets an Array of all list items. Each item is the jQuery DOM element for the item.

Each element stores the original data for the item under property called `data`.

    var items = $("ol.list").editableList('items');

#### <a href="#methods-empty" name="methods-empty">empty()</a>

Clears the list of all items. This does not trigger any callbacks.

    $("ol.list").editableList('empty');

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
