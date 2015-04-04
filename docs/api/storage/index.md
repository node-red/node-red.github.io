---
layout: api
title: Storage API
---

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
_[Storage.getAllFlows()](#storagegetallflows)_                 | _deprecated: get all library flows_
_[Storage.getFlow(name)](#storagegetflowname)_                 | _deprecated: get a library flow_
_[Storage.saveFlow(name,flow)](#storagesaveflownameflow)_      | _deprecated: save a flow to the library_



### Storage.init(settings)

Initialise the storage system.

Argument | Description
---------|----------------------
settings | the runtime settings

Returns a promise that resolves when the storage system is initalised.

### Storage.getFlows()

Returns a promise that resolves when the storage system is initalised.

### Storage.saveFlows(flows)

Argument | Description
---------|-----------------
flows    | the flow object

### Storage.getCredentials()

### Storage.saveCredentials(credentials)

Argument    | Description
------------|------------------------
credentials | the credentials object


### Storage.getSettings()

### Storage.saveSettings(settings)

### Storage.getSessions()

### Storage.saveSessions(sessions)

### Storage.getLibraryEntry(type,name)

### Storage.saveLibraryEntry(type,name,meta,body)

### _Storage.getAllFlows()_

### _Storage.getFlow(name)_

### _Storage.saveFlow(name,flow)_

