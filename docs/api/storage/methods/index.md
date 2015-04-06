---
layout: api
title: Storage API
---

A Storage plugin is a node.js module that exposes the following functions on its
`module.exports`.

 Function                                                      | Description 
---------------------------------------------------------------|-------------------------
[Storage.init(settings)](#storageinitsettings)                 | initialise the storage system
[Storage.getFlows()](#storagegetflows)                         | get the flow configuration
[Storage.saveFlows(flows)](#storagesaveflowsflows)             | save the flow configuration
[Storage.getCredentials()](#storagegetcredentials)             | get the flow credentials
[Storage.saveCredentials(credentials)](#storagesavecredentialscredentials) | save the flow credentials
[Storage.getSettings()](#storagegetsettings)                   | get the user settings
[Storage.saveSettings(settings)](#storagesavesettingssettings) | save the user settings
[Storage.getSessions()](#storagegetsessions)                   | get the user sessions
[Storage.saveSessions(sessions)](#storagesavesessionssessions) | save the user sessions
[Storage.getLibraryEntry(type,name)](#storagegetlibraryentrytypename) | get a type-specific library entry
[Storage.saveLibraryEntry(type,name,meta,body)](#storagesavelibraryentrytypenamemetabody) | save a type-specific library entry

### Storage.init(settings)

Initialise the storage system.

Argument | Description
---------|----------------------
settings | the runtime settings

Returns a promise that resolves when the storage system is initalised.

### Storage.getFlows()

Returns a promise that resolves with the runtime flow configuration.

### Storage.saveFlows(flows)

Argument | Description
---------|------------------------------
flows    | the flow configuration object, can be serialised as JSON.

Returns a promise that resolves when the flow configuration has been saved.

### Storage.getCredentials()

Returns a promise that resolves with the runtime flow credentials.

### Storage.saveCredentials(credentials)

Argument    | Description
------------|------------------------
credentials | the credentials object, can be serialised as JSON.

Returns a promise that resolves when the flow credentials have been saved.

### Storage.getSettings()

Returns a promise that resolves with the user settings.

### Storage.saveSettings(settings)

Argument | Description
---------|------------------------
settings | the settings object, can be serialised as JSON.

Returns a promise that resolves when the settings have been saved.

### Storage.getSessions()

Returns a promise that resolves with the sessions object.

### Storage.saveSessions(sessions)

Argument | Description
---------|------------------------
sessions | the sessions object, can be serialised as JSON.

Returns a promise that resolves when the sessions have been saved.

## Library Functions

Nodes that register a library type allow the user to save and retrieve content
in a local library. The following functions of the storage module are used to
access this content.

Entries may have metadata associated with them, for example, a `function` entry
includes metadata identifying how many outputs the function provides.

### Storage.getLibraryEntry(type,name)

Argument | Description
---------|----------------------------------------------------------------
type     | the type of library entry, eg `flows`, `functions`, `templates`
name     | the pathname of the entry to return

Returns a promise that resolves with the result.

If `name` represents to a single entry, the result is the content of the entry. 
For example, the code of a function.

If `name` represents to a logical directory, the result is a directory listing array.
Each element of the array is either a string (representing subdirectories that can
be browsed) or is an object with a `fn` property providing the entry's filename,
as well as any other metadata associated with the entry.

{% highlight javascript %}
[ 'directory1',
  'directory2',
  { fn: 'File-1.js', outputs: 3 },
  { fn: 'File-2.js', outputs: 1 },
  { fn: 'File-3.js', outputs: 2 }
]
{% endhighlight %}

### Storage.saveLibraryEntry(type,name,meta,body)

Argument | Description
---------|----------------------------------------------------------------
type     | the type of library entry, eg `flows`, `functions`, `templates`
name     | the pathname of the entry
meta     | an object containing additional metadata to save with the entry
body     | the body of the entry

Returns a promise that resolves when the entry has been saved.


## Deprecated Library Functions

Prior to version 0.10.7, the following functions were also used by storage modules.

New implementations of this interface should _not_ implement these functions.

The runtime will use them if they are present for backwards compatibility, but
will otherwise use `getLibraryEntry/saveLibraryEntry` with their `type` argument
set to `'flows'`.

#### Storage.getAllFlows()

Returns a promise that resolves to an object containing a complete listing of
all flows in the library.

#### Storage.getFlow(name)

Returns a promise that resolves to the content of a flow.

#### Storage.saveFlow(name,flow)

Returns a promise that resolves when flow is saved to the library.

