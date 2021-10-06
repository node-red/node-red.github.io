---
layout: docs-api
toc: toc-api-hooks.html
title: Node Install Hooks
slug:
  - url: "/docs/api/hooks"
    label: "hooks"
  - 'install'
---

The Node Install Hooks allow custom code to be added around the installation of
new npm modules - for both Nodes and External modules.

 - Hooks
   - [preInstall](#preinstall)
   - [postInstall](#postinstall)
   - [preUninstall](#preuninstall)
   - [postUninstall](#postuninstall)
 - Event Objects
   - [InstallEvent](#installevent-object)
   - [UninstallEvent](#uninstallevent-object)

### Hooks

#### `preInstall`

Called before running `npm install` to install an npm module.

The hook is passed an `InstallEvent` object that contains information about the
module to be installed.

```json
{
    "module": "<npm module name>",
    "version": "<version to be installed>",
    "url": "<optional url to install from>",
    "dir": "<directory to run the install in>",
    "isExisting": "<boolean> this is a module we already know about",
    "isUpgrade": "<boolean> this is an upgrade rather than new install",
    "args": [ "an array", "of the args", "that will be passed to npm"]
}
```

The hook can modify the InstallEvent to change how npm is run. For example,
the `args` array can be modified to change what arguments are passed to `npm`.

If the hook returns `false`, the `npm install` will be skipped and the processing
continue as if it had been run. This would allow some alternative mechanism
to be used - as long as it results in the module being installed under the expected
`node_modules` directory.

If the hook throws an error, the install will be cleanly failed.

```javascript
RED.hooks.add("preInstall", (installEvent) => {
    console.log(`About to install ${installEvent.module}@${installEvent.version}`);
});
```

#### `postInstall`

Called after `npm install` finishes installing an npm module.

*Note* if a `preInstall` hook returned `false`, `npm install` will not have been
run, but this hook will still get invoked.

This hook can be used to run any post-install activity needed.

For example, when running in an Electron environment, it is necessary to rebuild
the module:

```javascript
RED.hooks.add("postInstall",  (installEvent, done) => {
    child_process.exec("npm run rebuild " +  installEvent.module,
        {cwd: installEvent.dir},
        (err, stdout, stderr) => {
            done();
        }
    );
});
```

If the hook throws an error, the install will be cleanly failed.

If the preceding `npm install` returned an error, this hook will not be invoked.


#### `preUninstall`

Called before running `npm remove` to uninstall an npm module.

The hook is passed an `UninstallEvent` object that contains information about the
module to be removed.

```json
{
    "module": "<npm module name>",
    "dir": "<directory to run the remove in>",
    "args": [ "an array", "of the args" , "we will pass to npm"]
}
```

The hook can modify the UninstallEvent to change how npm is run. For example,
the `args` array can be modified to change what arguments are passed to `npm`.

If the hook returns `false`, the `npm remove` will be skipped and the processing
continue as if it had been run. This would allow some alternative mechanism
to be used.

If the hook throws an error, the uninstall will be cleanly failed.


```javascript
RED.hooks.add("preUninstall", (uninstallEvent) => {
    console.log(`About to remove ${uninstallEvent.module}`);
});
```

#### `postUninstall`

Called after `npm remove` finishes removing an npm module.

*Note* if a `preUninstall` hook returned `false`, `npm remove` will not have been
run, but this hook will still get invoked.

This hook can be used to run any post-uninstall activity needed.

If the hook throws an error, it will be logged, but the uninstall will complete
cleanly as we cannot rollback an `npm remove` after it has completed.


```javascript
RED.hooks.add("postUninstall",  (uninstallEvent) => {
    console.log(`Removed ${uninstallEvent.module}`);
});
```

### Event Objects

#### `InstallEvent` object

```json
{
    "module": "<npm module name>",
    "version": "<version to be installed>",
    "url": "<optional url to install from>",
    "dir": "<directory to run the install in>",
    "isExisting": "<boolean> this is a module we already know about",
    "isUpgrade": "<boolean> this is an upgrade rather than new install",
    "args": [ "an array", "of the args", "we will pass to npm"]
}
```

#### `UninstallEvent` object

```json
{
    "module": "<npm module name>",
    "dir": "<directory to run the remove in>",
    "args": [ "an array", "of the args", "we will pass to npm"]
}
```
