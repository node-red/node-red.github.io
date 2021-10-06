---
layout: docs-api
toc: toc-api-library.html
title: Library Store API
slug: library
---

**Since 1.3.0**

The Import/Export dialog within the Node-RED editor provides a way to save flows
and nodes to a local library.

This local library is managed by the [Storage API](../storage). The default being
to store in under `~/.node-red/lib`.

The Library Store API is a plugin mechanism that can be used to provide libraries
that store their contents in other locations - not just in local files.

Node-RED provides a [File Store plugin](https://github.com/node-red/node-red-library-file-store)
that can be used to add libraries stored on the local file-system. This could be used,
for example, to create a library on a shared file-system via a tool like Dropbox, to make
it easier to share flows with other developers you are working with.

### Adding a File Store library

1. Edit your Node-RED settings file - typically `~/.node-red/settings.js`
2. Find the `editorTheme` section and add a `library` section if one does not
   already exist.
3. Under that section add a `sources` array. Within that array you can add
   as many new file store sources as you want.

    ```javascript
    editorTheme: {
        library: {
            sources: [
                {
                    id: "team-collaboration-library",
                    type: "node-red-library-file-store",
                    path: "/Users/tom/work/team-library/",
                    label: "Team collaboration",
                    icon: "font-awesome/fa-users"
                }
            ]
        },
    }
   ```

The configuration object can have the following properties:


Property | Description
---------|--------------
`id`     | **Required** <br> A unique, url-safe, identifier for the library. Should contain only letters, numbers and the symbols `- _`.
`type`   | **Required** <br> Must be set to `node-red-library-file-store`
`path`   | **Required** <br> The absolute path to the where the library should be stored
`label`  | An optional label to use in the editor, otherwise the `id` will be used.
`icon`   | An optional icon from [FontAwesome 4.7](https://fontawesome.com/v4.7.0/icons/).
`types`  | By default the library will be used to store all types of object. It can be restricted to certain types by setting this property to an array of the acceptable types. <br> For example, to restrict it to just flows, set this property to `["flows"]`.
`readOnly` | To make this a read-only library so it can only be used to import from, set this property to `true`.


### Creating a new Store plugin

To create a store backed by a different type of storage, you will need to create a new plugin.

The plugin is packaged as an npm module, with a `package.json` file.

The following code can be used as the starting point for the plugin. You should also
refer to the [File Store plugin](https://github.com/node-red/node-red-library-file-store).

#### package.json

```json
{
    "name": "your-custom-library-store",
    "version": "1.0.0",
    "description": "A Custom Library plugin for Node-RED",
    "keywords": [
        "node-red"
    ],
    "node-red": {
        "plugins": {
            "customstore": "store.js"
        }
    }
}
```

#### store.js

```javascript
module.exports = function(RED) {

    // This must be a unique identifier for the library store type
    const PLUGIN_TYPE_ID = "node-red-library-custom-store";

    class CustomStorePlugin {

        /**
         * @param {object} config an object containing the configuration for an
         *                        instance of the store
         */
        constructor(config) {
            // Required properties
            this.type = PLUGIN_TYPE_ID;
            this.id = config.id;
            this.label = config.label;
        }

        /**
         * Initialise the store.
         */
        async init() {
        }

        /**
         * Get an entry from the store
         * @param {string} type The type of entry, for example, "flow"
         * @param {string} path The path to the library entry
         * @return if 'path' resolves to a single entry, it returns the contents
         *         of that entry.
         *         if 'path' resolves to a 'directory', it returns a listing of
         *         the contents of the directory
         *         if 'path' is not valid, it should throw a suitable error
         */
        async getEntry(type,path) {
            throw new Error("Not implemented")
        }

        /**
         * Save an entry to the library
         * @param {string} type The type of entry, for example, "flow"
         * @param {string} path The path to the library entry
         * @param {object} meta An object of key/value meta data about the entry
         * @param {string} body The entry contents
         */
        async saveEntry(type,path,meta,body) {
            throw new Error("Not implemented")
        }
    }

    // Register the plugin.
    RED.plugins.registerPlugin(PLUGIN_TYPE_ID, {
        // This tells Node-RED the plugin is a library source plugin
        type: "node-red-library-source",
        class: CustomStorePlugin
    })
}
```
