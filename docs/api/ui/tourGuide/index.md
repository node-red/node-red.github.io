---
layout: docs-api
toc: toc-api-ui.html
title: RED.tourGuide
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'tourGuide'
---

__Since 2.1.0__

This API can be used to provide interactive guided tours within the Node-RED UI.

- [`RED.tourGuide` API](#redtourguide-api)
  - [`RED.tourGuide.load( tourPath, done )`](#methods-load)
  - [`RED.tourGuide.run( tourPath, done )`](#methods-run)
- [Tour Properties](#tour-properties)
- [Step Properties](#step-properties)
- [i18n Support](#i18n-support)
- [Examples](#examples)


### `RED.tourGuide` API

#### <a href="#methods-load" name="methods-load">RED.tourGuide.load( tourPath, done )</a>

Load a tour.

```javascript
RED.tourGuide.load("/resources/<packageName>/<tourName>.js", function (error, tour) {
  if (error) {
    console.error(error)
    return;
  }
  console.log("Successfully loaded the tour: ", tour)
})
```

#### <a href="#methods-run" name="methods-run">RED.tourGuide.run( tourPath, done )</a>

Run a tour.

```javascript
RED.tourGuide.run("/resources/<packageName>/<tourName>.js")
RED.tourGuide.run("/resources/<packageName>/<tourName>.js", function (error) {
  if (error) {
    console.error(error)
  }
})
```


### Tour Properties

- `version`: *optionnal for first install tour* the version of your contrib.
- `steps`: an array with [steps](#step-options) of your tour.

```javascript
export default {
  version: "2.1.0",
  steps: [
    {
      titleIcon: "fa fa-map-o",
      title: "Welcome to Node-RED 2.1!",
      description: "Let's take a moment to discover the new features in this release."
    }
  ]
}
```


### Step Properties

- `description`:  text to display (can be HTML)
- `title`:  *optional* title text
- `titleIcon`:  *optional* title fa icon class
- `prepare`: *optional* function is called before the step is shown. Can take an optional done callback if it needs to do async work.
- `complete`: *optional* function is called after the step is completed (or aborted). Can take an optional done callback if it needs to do async work.
- `element`: *optional* identifies the element in the page to highlight. Can be a string css selector, or a function that returns the element.
- `interactive`: *optional* if an element is focused, but the user shouldn't be able to click it, set this to `false`. Default: `true`.
- `direction`: *optional* what side of the element to display the step popup. e.g. `left`, `top`, `bottom`, `right`... Default: `bottom`.
- `fallback`: *optional* in some cases, the focus on an element should be removed when the cursor moves over the element. For example, highlighting a node in the palette, but then expand to allow the user to drag that node into the workspace.
- `wait`: *optional* hides the 'next' button and waits for some condition before moving forward with the tour.
  The `wait` object can either wait for a DOM event, or a Node-RED event (via [RED.events](../events/index.md)).
  - To wait for the DOM element identified by `element` to be clicked:
  ```javascript
  wait: {
    type: "dom-event",
    event: "click"
  }
  ```
  - To wait for a Node-RED event:
  ```javascript
  wait: {
    type: "nr-event",
    event: "nodes:add",
    filter: function (event) {
      if (event.type === "inject") {
        return true
      }
      return false
    }
  }
  ```
  The `filter` function can be used to check if an event matches what was needed. This example waits for an inject node to be added - and then returns true. Returning false ignores the event.

### i18n Support

The `description` and `title` properties can be provided as strings and will be displayed as-is. However they can also be provided as an object containing translated versions (keyed by the language code). It will fallback to en-US if the active language isn't provided.

```javascript
title: { "en-US": "My title", "ja": "タイトル", "fr": "Mon Titre" }
```


### Examples

#### First Install Tour

```javascript
// First, check that the tour has not yet been launched
if (RED.settings.get("editor.tours.[packageName].[tourName]", false) === false) {
  RED.tourGuide.run("/resources/<packageName>/<tourName>.js", function (error) {
    if (error) {
      console.error(error)
    }
    // Set true for first install tour
    RED.settings.set("editor.tours.[packageName].[tourName]", true)
  })
}
```

#### New Version Tour

```javascript
RED.tourGuide.load("/resources/<packageName>/<tourName>.js", function (error, tour) {
  if (error) {
    console.error(error)
    return
  }
  // First, check that this tour version has not yet been launched - default 0.0.1
  const currentVersion = RED.settings.get("editor.tours.[packageName].[tourName]", "0.0.1")
  const tourVersion = tour.version.split("."); // 1.0.0

  // Only display the tour if its MAJ.MIN versions the current version
  if (tourVersion[0] > currentVersion[0]
    || (tourVersion[0] == currentVersion[0] && tourVersion[1] > currentVersion[1])) {
      RED.tourGuide.run("/resources/<packageName>/<tourName>.js", function (error) {
        if (error) {
          console.error(error)
        }
        // Set the version of your contrib
        RED.settings.set("editor.tours.[packageName].[tourName]", tour.version)
      })
  }
})
```
