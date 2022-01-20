---
layout: docs-api
toc: toc-api-ui.html
title: AutoComplete
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'autocomplete'
---

__Since 2.1.0__

Adds auto-complete functionality to an `<input>` element.

 - [Options](#options)
 - [Methods](#methods)
 - [Examples](#examples)

<div class="widget">
    <div style="clear:both">
        <div class="col-1-2">
            <h3>Options</h3>
            <table>
                <tr><td><a href="#options-search">search</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>Methods</h3>
            <table>
                <tr><td><a href="#methods-destroy">destroy</a></td></tr>
            </table>
        </div>
    </div>
    <div style="clear:both">
        <div class="col-1-2"><h3>Events</h3></div>
        <div class="col-1-2"><h3>Types</h3></div>
    </div>
</div>

### Options

#### <a href="#options-search" name="options-search">search( value, [done])</a>

<span class="method-return">Type: function</span>

A function that is called when the input value changes that should return a list
of possible completions.

The function can take one or two arguments:

 - `value` - the current value of the `<input>`.
 - `done` - an optional callback function that will be called with the completions.

If the function has two arguments, it *must* call `done` with the results rather
than return them. This allows the function to do asynchronous work to generate the
completions.

The returns list of completions must be an array of objects of the form:

```javascript
   {
       value: "<string>", // The value to insert if selected
       label: "<string>"|DOMElement  // The label to display in the dropdown
   }
```

The `label` can be a DOMElement. This can be used to provide a customised display
of the completion - for example, including more contextual information.


### Methods

#### <a href="#methods-destroy" name="methods-destroy">destroy( )</a>

Remove auto-complete functionality from an `<input>`.

```javascript
$(".input").autoComplete('destroy');
```


### Examples

#### Auto-complete on plain `<input>`

```html
<input type="text" id="node-input-example1">
```

```javascript
// View the page source to see the full list of animals used in
// this example
let animals = ["Aardvark","Alligator","Alpaca","Anaconda","Ant","Antelope",
               "Carp","Cat","Caterpillar","Catfish","Cheetah","Chicken",
               "Deer","Dinosaur","Dog","Dolphin","Donkey","Dove" ];

$("#node-input-example1").autoComplete({
    search: function(val) {
        var matches = [];
        animals.forEach(v => {
            var i = v.toLowerCase().indexOf(val.toLowerCase());
            if (i > -1) {
                matches.push({
                    value: v,
                    label: v,
                    i: i
                })
            }
        });
        matches.sort(function(A,B){return A.i-B.i})
        return matches
    }
})
```

<div class="red-ui-editor">
<p>Pick an animal</p>
    <input type="text" id="node-input-example1">
</div>

#### Asynchronous search

```html
<input type="text" id="node-input-example2">
```

```javascript
// View the page source to see the full list of animals used in
// this example
let animals = ["Aardvark","Alligator","Alpaca","Anaconda","Ant","Antelope",
               "Carp","Cat","Caterpillar","Catfish","Cheetah","Chicken",
               "Deer","Dinosaur","Dog","Dolphin","Donkey","Dove" ];

$("#node-input-example2").autoComplete({
    search: function(val, done) {
        var matches = [];
        animals.forEach(v => {
            var i = v.toLowerCase().indexOf(val.toLowerCase());
            if (i > -1) {
                matches.push({
                    value: v,
                    label: v,
                    i: i
                })
            }
        });
        matches.sort(function(A,B){return A.i-B.i})
        // Simulate asynchronous work by using setTimout
        // to delay response by 1 second
        setTimeout(function() {
            done(matches);
        },1000)
    }
})
```


<div class="red-ui-editor">
<p>Pick an animal</p>
    <input type="text" id="node-input-example2">
</div>

#### Custom result labels

```html
<input type="text" id="node-input-example2">
```

```javascript
// View the page source to see the full list of animals used in
// this example
let animals = ["Aardvark","Alligator","Alpaca","Anaconda","Ant","Antelope",
               "Carp","Cat","Caterpillar","Catfish","Cheetah","Chicken",
               "Deer","Dinosaur","Dog","Dolphin","Donkey","Dove" ];

$("#node-input-example3").autoComplete({
    search: function(val) {
        var matches = [];
        animals.forEach(v => {
            var i = v.toLowerCase().indexOf(val.toLowerCase());
            if (i > -1) {
                var pre = v.substring(0,i);
                var matchedVal = v.substring(i,i+val.length);
                var post = v.substring(i+val.length)

                var el = $('<div/>',{style:"white-space:nowrap"});
                $('<span/>').text(pre).appendTo(el);
                $('<span/>',{style:"font-weight: bold; color:red"}).text(matchedVal).appendTo(el);
                $('<span/>').text(post).appendTo(el);

                matches.push({
                    value: v,
                    label: el,
                    i:i
                })
            }
        })
        matches.sort(function(A,B){return A.i-B.i})
        return matches
    }
})
```

<div class="red-ui-editor">
<p>Pick an animal</p>
    <input type="text" id="node-input-example3">
</div>


<script src="/js/jquery-ui.min.js"></script>
<script>
    var RED = {};
    RED.settings = {};
    RED.editor = { editJSON: function(){}}
</script>
<script src="/js/autoComplete.js"></script>
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

    var animals = ["Aardvark","Alligator","Alpaca","Anaconda","Ant","Antelope","Ape","Aphid","Armadillo","Asp","Ass","Baboon","Badger","Bald Eagle","Barracuda","Bass","Basset Hound","Bat","Bear","Beaver","Bedbug","Bee","Beetle","Bird","Bison","Black panther","Black Widow Spider","Blue Jay","Blue Whale","Bobcat","Buffalo","Butterfly","Buzzard","Camel","Caribou","Carp","Cat","Caterpillar","Catfish","Cheetah","Chicken","Chimpanzee","Chipmunk","Cobra","Cod","Condor","Cougar","Cow","Coyote","Crab","Crane","Cricket","Crocodile","Crow","Cuckoo","Deer","Dinosaur","Dog","Dolphin","Donkey","Dove","Dragonfly","Duck","Eagle","Eel","Elephant","Emu","Falcon","Ferret","Finch","Fish","Flamingo","Flea","Fly","Fox","Frog","Goat","Goose","Gopher","Gorilla","Grasshopper","Hamster","Hare","Hawk","Hippopotamus","Horse","Hummingbird","Humpback Whale","Husky","Iguana","Impala","Kangaroo","Ladybug","Leopard","Lion","Lizard","Llama","Lobster","Mongoose","Monitor lizard","Monkey","Moose","Mosquito","Moth","Mountain goat","Mouse","Mule","Octopus","Orca","Ostrich","Otter","Owl","Ox","Oyster","Panda","Parrot","Peacock","Pelican","Penguin","Perch","Pheasant","Pig","Pigeon","Polar bear","Porcupine","Quail","Rabbit","Raccoon","Rat","Rattlesnake","Raven","Rooster","Sea lion","Sheep","Shrew","Skunk","Snail","Snake","Spider","Tiger","Walrus","Whale","Wolf","Zebra"];
    $("#node-input-example1").autoComplete({
        search: function(val) {
            var matches = [];
            animals.forEach(v => {
                var i = v.toLowerCase().indexOf(val.toLowerCase());
                if (i > -1) {
                    matches.push({
                        value: v,
                        label: v,
                        i: i
                    })
                }
            });
            matches.sort(function(A,B){return A.i-B.i})
            return matches
        }
    })

    $("#node-input-example2").autoComplete({
        search: function(val, done) {
            var matches = [];
            animals.forEach(v => {
                var i = v.toLowerCase().indexOf(val.toLowerCase());
                if (i > -1) {
                    matches.push({
                        value: v,
                        label: v,
                        i: i
                    })
                }
            });
            matches.sort(function(A,B){return A.i-B.i})
            // Simulate asynchronous work by using setTimout
            setTimeout(function() {
                done(matches);
            },1000)
        }
    })

    $("#node-input-example3").autoComplete({
        search: function(val) {
            var matches = [];
            animals.forEach(v => {
                var i = v.toLowerCase().indexOf(val.toLowerCase());
                if (i > -1) {
                    var pre = v.substring(0,i);
                    var matchedVal = v.substring(i,i+val.length);
                    var post = v.substring(i+val.length)

                    var el = $('<div/>',{style:"white-space:nowrap"});
                    $('<span/>').text(pre).appendTo(el);
                    $('<span/>',{style:"font-weight: bold; color:red"}).text(matchedVal).appendTo(el);
                    $('<span/>').text(post).appendTo(el);

                    matches.push({
                        value: v,
                        label: el,
                        i:i
                    })
                }
            })
            matches.sort(function(A,B){return A.i-B.i})
            return matches
        }
    })

});
</script>
