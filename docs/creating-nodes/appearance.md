---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: Node appearance
slug: appearance
---

There are three aspects of a node's appearance that can be customised; the icon,
background colour and its label.

### Icon

The node's icon is specified by the `icon` property in its definition.

The value of the property can be either a string or a function.

If the value is a string, that is used as the icon.

If the value is a function, it will get evaluated when the node is first loaded,
or after it has been edited. The function is expected to return the value to use
as the icon.

The function will be called both for nodes in the workspace, where `this` references
a node instance, as well as for the node's entry in the palette. In this latter case,
 `this` will not refer to a particular node instance and the function *must* return
 a valid value.

{% highlight javascript %}
...
icon: "file.svg",
...
{% endhighlight %}

The icon can be either:

 - the name of a stock icon provided by Node-RED,
 - the name of a custom icon provided by the module,
 - a Font Awesome 4.7 icon

#### Stock icons

<style>
.nr-icon-list {
    background: #666;
}
.nr-icon-list li {
    width: 31%;
    display: inline-block;
    color: #fff;
    vertical-align: middle;
    margin: 10px 5px;
}
.nr-icon-list li>img  {
    vertical-align: middle;
    max-width: 20px;
    margin-right: 20px;
}
</style>

<ul class="nr-icon-list">
<li><img src="images/alert.svg"/> alert.svg</li>
<li><img src="images/arrow-in.svg"/> arrow-in.svg</li>
<li><img src="images/bridge-dash.svg"/> bridge-dash.svg</li>
<li><img src="images/bridge.svg"/> bridge.svg</li>
<li><img src="images/db.svg"/> db.svg</li>
<li><img src="images/debug.svg"/> debug.svg</li>
<li><img src="images/envelope.svg"/> envelope.svg</li>
<li><img src="images/feed.svg"/> feed.svg</li>
<li><img src="images/file.svg"/> file.svg</li>
<li><img src="images/function.svg"/> function.svg</li>
<li><img src="images/hash.svg"/> hash.svg</li>
<li><img src="images/inject.svg"/> inject.svg</li>
<li><img src="images/light.svg"/> light.svg</li>
<li><img src="images/serial.svg"/> serial.svg</li>
<li><img src="images/template.svg"/> template.svg</li>
<li><img src="images/white-globe.svg"/> white-globe.svg</li>
</ul>

**Note**: In Node-RED 1.0, all of these icons have been replaced with SVG alternatives
for a better appearance. To ensure backward compatibility, the editor will automatically
swap any request for the png version for the SVG version if it is available.

#### Custom icon

A node can provide its own icon in a directory called `icons` alongside its `.js`
and `.html` files. These directories get added to the search path when the editor
looks for a given icon filename. Because of this, the icon filename must be unique.

The icon should be white on a transparent background, with a 2:3 aspect ratio, with a minimum of 40 x 60 in size.

#### Font Awesome icon

Node-RED includes the full set of [Font Awesome 4.7 icons](https://fontawesome.com/v4.7.0/icons/).

To specify a FA icon, the property should take the form:

{% highlight javascript %}
...
icon: "font-awesome/fa-automobile",
...
{% endhighlight %}

#### User defined icon

Individual node icons can be customised by the user within the editor on the 'appearance'
tab of the node's edit dialog.

**Note**: If a node has an `icon` property in its `defaults` object, its icon
cannot be customised. For example, the `ui_button` node of `node-red-dashboard`.

### Background Colour

The node background colour is one of the main ways to quickly distinguish different
node types. It is specified by the `color` property in the node definition.

{% highlight javascript %}
...
color: "#a6bbcf",
...
{% endhighlight %}

We have used a muted palette of colours. New nodes should try to find a colour that
fits with this palette.

Here are some of the commonly used colours:



<style>
.nr-color-list {
}
.nr-color-list li {
text-align: center;
    border: 1px solid #333;
    width: 31%;
    display: inline-block;
    color: #333;
    vertical-align: middle;
    padding: 10px 5px;
    margin-bottom: 5px;
}
</style>

<ul class="nr-color-list">
<li style="background: #3FADB5">#3FADB5</li>
<li style="background: #87A980">#87A980</li>
<li style="background: #A6BBCF">#A6BBCF</li>
<li style="background: #AAAA66">#AAAA66</li>
<li style="background: #C0C0C0">#C0C0C0</li>
<li style="background: #C0DEED">#C0DEED</li>
<li style="background: #C7E9C0">#C7E9C0</li>
<li style="background: #D7D7A0">#D7D7A0</li>
<li style="background: #D8BFD8">#D8BFD8</li>
<li style="background: #DAC4B4">#DAC4B4</li>
<li style="background: #DEB887">#DEB887</li>
<li style="background: #DEBD5C">#DEBD5C</li>
<li style="background: #E2D96E">#E2D96E</li>
<li style="background: #E6E0F8">#E6E0F8</li>
<li style="background: #E7E7AE">#E7E7AE</li>
<li style="background: #E9967A">#E9967A</li>
<li style="background: #F3B567">#F3B567</li>
<li style="background: #FDD0A2">#FDD0A2</li>
<li style="background: #FDF0C2">#FDF0C2</li>
<li style="background: #FFAAAA">#FFAAAA</li>
<li style="background: #FFCC66">#FFCC66</li>
<li style="background: #FFF0F0">#FFF0F0</li>
<li style="background: #FFFFFF">#FFFFFF</li>
</ul>


### Labels

There are four label properties of a node; `label`, `paletteLabel`, `outputLabel` and `inputLabel`.

#### Node label

The `label` of a node in the workspace can either be a static piece of text, or
it can be set dynamically on a per-node basis according to the properties of the node.

The value of the property can be either a string or a function.

If the value is a string, that is used as the label.

If the value is a function, it will get evaluated when the node is first loaded,
or after it has been edited. The function is expected to return the value to use
as the label.

As mentioned in a previous section, there is a convention for nodes to have a
`name` property to help distinguish between them. The following example shows
how the `label` can be set to pick up the value of this property or default to
something sensible.

{% highlight javascript %}
...
label: function() {
    return this.name||"lower-case";
},
...
{% endhighlight %}

Note that it is not possible to use [credential](credentials) properties in the label function.

#### Palette label

By default, the node's type is used as its label within the palette. The
`paletteLabel` property can be used to override this.

As with `label`, this property can be either a string or a function. If it is a
function, it is evaluated once when the node is added to the palette.

#### Label style

The css style of the label can also be set dynamically, using the `labelStyle`
property. Currently, this property must identify the css class to apply. If
not specified, it will use the default `node_label` class. The only other
predefined class is `node_label_italic`.

<div style="text-align: center">
    <img title="node label style" src="images/node_label_style.png"/>
</div>

The following example shows how `labelStyle` can be set to `node_label_italic`
if the `name` property has been set:

{% highlight javascript %}
...
labelStyle: function() {
    return this.name?"node_label_italic":"";
},
...
{% endhighlight %}

#### Alignment

By default, the icon and label are left-aligned in the node. For nodes that sit
at the end of a flow, the convention is to right-align the content. This is done
by setting the `align` property in the node definition to `right`:

{% highlight javascript %}
...
align: 'right',
...
{% endhighlight %}

<div style="text-align: center">
    <img title="node label alignment" src="images/node_alignment.png"/>
</div>


#### Port labels

Nodes can provide labels on their input and output ports that can be seen by
hovering the mouse over the port.

<div style="text-align:center">
    <img title="port labels" src="images/node-labels.png"/>
</div>

These can either be set statically by the node's html file

{% highlight javascript %}
...
inputLabels: "parameter for input",
outputLabels: ["stdout","stderr","rc"],
...
{% endhighlight %}

or generated by a function, that is passed an index to indicate the output pin (starting from 0).

{% highlight javascript %}
...
outputLabels: function(index) {
    return "my port number "+index;
}
...
{% endhighlight %}


In both cases they can be overwritten by the user using the `node settings` section of the configuration editor.

<div style="text-align:center">
    <img title="port label editor" src="images/node-labels-override.png"/>
</div>

<div style="text-align:center">
    <img title="port custom labels" src="images/node-labels-custom.png"/>
</div>

**Note**: Labels are not generated dynamically, and cannot be set by `msg` properties.

### Buttons

A node can have a button on its left or right hand edge, as seen with the core
Inject and Debug nodes.

A key principle is the editor is not a dashboard for controlling your flows. So
in general, nodes should not have buttons on them. The Inject and Debug nodes are
special cases as the buttons play a role in the development of flows.

The `button` property in its definition is used to describe the behavior of the
button. It must provide, as a minimum, an `onclick` function that will be called
when the button is clicked.

{% highlight javascript %}
...
button: {
    onclick: function() {
        // Called when the button is clicked
    }
},
...
{% endhighlight %}

The property can also define an `enabled` function to dynamically enable and
disable the button based on the node's current configuration. Similarly, it can
define a `visible` function to determine whether the button should be shown at all.

{% highlight javascript %}
...
button: {
    enabled: function() {
        // return whether or not the button is enabled, based on the current
        // configuration of the node
        return !this.changed
    },
    visible: function() {
        // return whether or not the button is visible, based on the current
        // configuration of the node
        return this.hasButton
    },
    onclick: function() { }
},
...
{% endhighlight %}

The `button` can also be configured as a toggle button - as seen with the Debug
node. This is done by added a property called `toggle` that identifies a property
in the node's `defaults` object that should be used to store a boolean value whose
value is toggled whenever the button is pressed.


{% highlight javascript %}
...
defaults: {
    ...
    buttonState: {value: true}
    ...
},
button: {
    toggle: "buttonState",
    onclick: function() { }
}
...
{% endhighlight %}
