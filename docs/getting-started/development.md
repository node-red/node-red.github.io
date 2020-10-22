---
layout: docs-getting-started
toc: toc-user-guide.html
title: Running Node-RED from source
slug: source
---

Building and running the code from source is only intended for users who are
happy to be using development code, or for developers wanting to contribute to
the project.

### Prerequisites

To run Node-RED from source you will need:

 - a [supported version of Node.js](/docs/faq/node-versions).
 - a `git` client
 - the `grunt-cli` npm module installed globally:
```
sudo npm install -g grunt-cli
```

### Cloning the code and installing dependencies

You can clone the source repository directly from GitHub:

```
git clone https://github.com/node-red/node-red.git
```

This will create a directory called `node-red` in the current directory that contains
the full source code of the project. The rest of these instructions assume you
are inside that directory.

You should then pick which branch you want to build.

 - `master` - the default branch. This is the maintenance branch which contains
 the code of the current stable release, plus any bug fixes that have been applied
 ahead of the next maintenance release.

 - `dev` - the development branch. This is where all new development happens.

If you want to use the `dev` branch, you should run the command:

```
git checkout dev
```

Once you are on you your chosen branch, you should install all of the dependencies
with the command:

```
npm install
```

### Building Node-RED

Before you can start Node-RED you must build it. This can be done using the command:

```
grunt build
```

### Running Node-RED

You can then run Node-RED using the command:

```
npm start
```

If you want to pass any [command-line arguments](local#command-line-usage), you
must use the following syntax:

```
npm start -- <args>
```

The `--` argument tells `npm` to pass any following arguments to the command it runs.

### Automatically restarting

If you are editing the source code you must restart Node-RED to load the changes.

A special `grunt` task is provided to do this automatically.

```
grunt dev
```

This command will build and run Node-RED and then watch the filesystem for any
changes to the source code. If it detects changes made to the editor code, it will
rebuild the editor component and you can reload the editor to see the changes.
If it detects changes made to the runtime or nodes it will restart Node-RED to load those changes.

This mode does not allow you to pass arguments to the Node-RED command other than
to specify a different flow file:

```
grunt dev --flowFile=my-flow-file.json
```


### Debug run Node-RED in VS Code

It is possible to set-up VS Code to both build and start debugging by simply pressing F5. Once you have cloned the project and open it in VS code, you will need to add an entry in `launch.json` and `tasks.json`...

#### Modify launch.json ...
```
  {
     "version": "0.2.0",
     "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug node-red",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "env": { "NODE_ENV": "development" },
            "preLaunchTask": "npm: build-dev",
            "program": "${workspaceFolder}/packages/node_modules/node-red/red.js"
        }
     ]
  }
```
*NOTE: to open launch.json, ctrl+shift+p, type `debug open launch`*


#### Add an entry in tasks.json
```
{
    "version": "2.0.0",
    "tasks": [
         {
			"type": "npm",
			"script": "build-dev",
			"group": "build",
			"problemMatcher": [],
			"label": "npm: build-dev",
			"detail": "build-dev"
         }
    ]
}
```
*NOTE: if you don't have a tasks file, create one with ctrl+shift+p, type `configure task`*
*NOTE: if you already have a tasks file, open it with ctrl+p, type `tasks.json`*

#### Debug Run
Now you can run the project by pressing F5.
*NOTE: If you have more than one config, select `Debug node-red`.*