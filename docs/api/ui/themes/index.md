---
layout: docs-api
toc: toc-api-ui.html
title: Theme Plugins
slug:
  - url: "/docs/api/ui"
    label: "ui"
  - 'themes'
---

The appearance of the editor can be customised using themes. Themes are packaged
and installed as Node-RED plugins, and then selected via the `editorTheme.theme`
property in the settings file.

 - [Creating theme CSS](#creating-theme-css)
 - [Packaging as a Theme Plugin](#packaging-as-a-theme-plugin)
 - [Theming the Monaco editor](#theming-the-monaco-editor)

### Creating theme CSS

The Node-RED code repository includes a script that can be used to generate theme css.

1. Clone the Node-RED repository

        git clone https://github.com/node-red/node-red

2. Create a copy of `packages/node_modules/@node-red/editor-client/src/sass/colors.scss` from the repository

        mkdir my-custom-theme
        cp node-red/packages/node_modules/@node-red/editor-client/src/sass/colors.scss my-custom-theme

3. Edit `my-custom-theme/colors.scss` to set the custom colours for the different Node-RED components

4. Run the `build-custom-theme` script to generate the theme css

        node node-red/scripts/build-custom-theme.js \
             --in ../my-custom-theme/colors.scss \
             --out ../my-custom-theme/style.css


You can test the CSS at this point by updating the `editorTheme` property of your settings file:

```javascript
editorTheme: {
    page: {
        // This must be the *absolute* path to the style.css file
        css: "/absolute/path/to/my-custom-theme/style.css"
    }
}
```

### Packaging as a Theme Plugin

A Theme Plugin is packaged as an npm module - in the same way Nodes are packaged.
It also requires a JavaScript file that does the work to register the theme with
Node-RED.


1. Create a `theme.js` file in your theme directory.

    ```javascript
    module.exports = function(RED) {
        RED.plugins.registerPlugin("my-custom-theme", {
            // Tells Node-RED this is a theme plugin
            type: "node-red-theme",

            // List the CSS files the theme provides. If there are
            // more than one, this should be an array of filenames
            css: "style.css"

            // List the script files the theme provides.
            // If the theme doesn't include any, this can be left out
            //scripts: "theme.js"
        })
    }
    ```

1. Create a `package.json` file for your plugin. You can generate a default file using `npm init`:

        cd my-custom-theme
        npm init

   It will prompt with a series of questions to help fill out the fields.

   Ensure you follow the [standard naming guidelines](/docs/creating-nodes/packaging#naming) if you want
   to include `node-red` in the name.

   For a theme plugin, consider using something like: `node-red-contrib-theme-XYZ`

2. Add a `node-red` section to `package.json` that identifies the plugin's `theme.js` file
    ```javascript
    "node-red": {
        "plugins": {
            "my-theme": "theme.js"
        }
    }
    ```

   As with Node-RED nodes, you should add `node-red` to the `keywords` property.


#### Testing the theme

Once packaged as an npm module, it can be tested without publishing to npm by installing
it locally.

1. In your Node-RED user directory (`~/.node-red`) run:

        npm install /path/to/my-custom-theme

2. Edit your settings file to select the plugin. Make sure you remove any `editorTheme.page.css` entries
   you may have added when testing your CSS earlier.

    ```javascript
    editorTheme: {
        theme: "my-custom-theme",
    }
    ```

3. Restart Node-RED

If you need to make any further changes to the css, you can re-run the `build-custom-theme`
script and just reload the editor to see the changes - you should not need to restart
Node-RED

### Theming the Monaco editor

As well as providing custom CSS and scripts, a theme plugin can also provide custom
Monaco editor options including what theme it should use.

#### Setting the Monaco theme by name

Monaco comes with a number of built-in themes available. The full list is [here](https://github.com/node-red/node-red/tree/master/packages/node_modules/%40node-red/editor-client/src/vendor/monaco/dist/theme). Additional settings for Monaco options can be found [here](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IStandaloneEditorConstructionOptions.html).

The name of the theme can be provided in the plugin settings:

```javascript
RED.plugins.registerPlugin("my-custom-theme", {
   type: "node-red-theme",
   css: "style.css",
   monacoOptions: {
     theme: "vs-dark", // Monaco theme name
     fontSize: 14,
     fontLigatures: true,
     fontFamily: "Cascadia Code, Fira Code, Consolas, 'Courier New', monospace",
     minimap: { enabled: false }
   }
 })
 ```

#### Setting a custom Monaco theme

Rather than specifying a built-in theme by name, the `monacoOptions.theme` setting can 
be used to provide a custom Monaco theme object:

```javascript
RED.plugins.registerPlugin("my-custom-theme", {
    monacoOptions: {
      theme: {
        "base": "vs-dark",
        "inherit": true,
        "colors": {
          "editor.foreground": "#CCC",
          "editor.background": "#434954",
          "editor.selectionBackground": "#80000080",
          "editor.lineHighlightBackground": "#80000040",
          "editorCursor.foreground": "#7070FF",
          "editorWhitespace.foreground": "#BFBFBF"
        },      
        "rules": [
            {
                "background": "434954",
            },
            {
                "foreground": "aeaeae",
                "fontStyle": "italic",
                "token": "comment"
            },
            {
                "foreground": "d8fa3c",
                "token": "string"
            },
            {
                "foreground": "d8fa3c",
                "fontStyle": "bold",
                "token": "constant"
            },
        ]
      }
    }
})
```


#### Setting a custom Monaco theme from a JSON file

Rather than hardcode the theme settings, you can store the Monaco theme JSON in a 
separate file and use `require` to import it:

```javascript
RED.plugins.registerPlugin("my-custom-theme", {
    monacoOptions: {
      theme: require("./my-custom-theme-monaco-theme.json"),
    }
})
```

`my-custom-theme-monaco-theme.json` file example:
```json
{
  "base": "vs-dark",
  "inherit": true,
  "colors": {
    "editor.foreground": "#CCC",
    "editor.background": "#434954",
    "editor.selectionBackground": "#80000080",
    "editor.lineHighlightBackground": "#80000040",
    "editorCursor.foreground": "#7070FF",
    "editorWhitespace.foreground": "#BFBFBF"
  },      
  "rules": [
      {
          "background": "434954",
      },
      {
          "foreground": "aeaeae",
          "fontStyle": "italic",
          "token": "comment"
      },
      {
          "foreground": "d8fa3c",
          "token": "string"
      },
      {
          "foreground": "d8fa3c",
          "fontStyle": "bold",
          "token": "constant"
      },
  ]
}
```

The specific details of how to create a Monaco theme is beyond the scope of our documentation.
