---
layout: docs
toc: creating-nodes-toc.html
title: Node generator
---

The [Node generator](https://www.npmjs.com/package/node-red-nodegen) is a tool that can automatically generate an original node by using one command.
You can use Node generator to develop a custom node based on a function node and Open API document with a minimum of effort.
This page explains how to use this approach to node development.

The general procedure for generating a node using Node generator is as follows:

1. Install Node generator into local PC
2. Prepare or create source file (e.g. Open API document or JavaScript code in function node)
3. Use a Node generator command to generate the custom node.
4. Add a description, test cases, and other elements to the custom node.

Using this tool enables automatic generation of the following files that make up an original node.
For this reason, the node developer can drastically reduce the man-hours for node development.

* Original node (the node's js file, html file, node icon file, and language files)
* Files required to package an original node (README.md, package.json, LICENSE)
* Test cases

The latest information about the node generator can be obtained from the GitHub project for the Node generator (https://github.com/node-red/node-red-nodegen).

The following explains the steps in developing a custom node.
Note that this procedure assumes that you are using Node-RED installed in the local environment.

### How to use Node generator
To install Node generator to your local PC, you need to input the following "npm install" command on command prompt (Windows) or terminal (macOS/Linux).
Because the command execution needs root permission, "sudo" is required before "npm install" command on macOS or Linux environment.

    npm install -g node-red-nodegen

The current version of Node generator supports function node and Open API document as source files.
Simply, Node generator command, node-red-nodegen converts to a node from the file which is specified in the argument of the command as follows.

    node-red-nodegen <source file> -> The command tool outputs the node from the source file

The following documentation explains methods of creating nodes from two types of source files.

 - [How to create a node from Open API document](#how-to-create-a-node-from-open-api-document)
 - [How to create a node from function node](#how-to-create-a-node-from-function-node)

### How to create a node from Open API document
You can specify the URL or file path of Open API document as the first argument of the node-red-nodegen command.

(1) Generate node using node-red-nodegen command

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json

Node-RED users typically import the generated node to the palette of Node-RED flow editor using the following procedures.

(2) Change directory to the generated node's directory

    cd node-red-contrib-swagger-petstore

(3) Prepare the symbolic link

    sudo npm link

(4) Change current directory to Node-RED home directory (Typically, Node-RED home directory is ".node-red" under the home directory)

    cd ~/.node-red

(5) Create a symbolic link

    npm link node-red-contrib-swagger-petstore

(6) Start Node-RED

    node-red

(7) Access the Node-RED flow editor (http://localhost:1880)

-> You can see the generated node on the palette of the Node-RED flow editor.

(8) Drag and drop the generated node to the workspace

(9) Select a method on the node property setting

(When the Open API document does not contain a hostname or has authentication settings, the node property will have a property to set hostname and authentication settings.)

(10) Create flow on the Node-RED flow editor

-> The flow which consists of inject node, the generated node and debug node are suitable for the first step.
(If the generated node uses POST method, you need to set JSON data to msg.payload of the inject node)

(11) Run the flow

-> In this example, After clicking the button on the inject node, you can get the received data on debug tab.

### Command line options
If you want to customize the generated node, the following procedures and command line options will be helpful.

#### Module name
Node generator uses "node-red-contrib-" as the default prefix of the module name.
Therefore, when the node name is "swagger-petstore", the module name becomes "node-red-contrib-swagger-petstore".
If you want to change the default module name, you can specify the module name using --module or --prefix option.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --module node-red-node-swagger-petstore
    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --prefix node-red-node

#### Node name
In the case of the node generated from Open API document, "info.title" value in Open API document is used as the generated node's name.
Node generator will replace uppercase characters and spaces with hyphens to convert appropriate name for npm module and Node-RED node.

##### Example of Open API document
```
{
  "swagger": "2.0",
  "info": {
    "description": "This is a sample server Petstore server.",
    "version": "1.0.0",
    "title": "Swagger Petstore",  <- Node generator converts this value to "swagger-petstore" and uses it as node name.
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/v2",
  "schemes": [
    "https"
  ],
  ...
}
```

If you want to change the default name, you can set node name using --name option.
Especially, you need to specify node name using --name option when "info.title" value contains a double-byte character instead of alphabet and number because Node generator cannot create node correctly.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --name new-node-name

#### Version
As the default, Node generator uses "info.version" value as the module version number.

##### Example of Open API document
```
{
  "swagger": "2.0",
  "info": {
    "description": "This is a sample server Petstore server.",
    "version": "1.0.0",  <- Node generator uses this version number as the module version number.
    "title": "Swagger Petstore",
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/v2",
  "schemes": [
    "https"
  ],
  ...
}
```

When you update the version number of the module without incrementing the version number in Open API document, you need to specify --version option.
Especially, conflict error will occur when you publish the module which has the same version number as the previously published module using "npm publish" command.
In this case, the --version option needs to be specified to update the version number of the module.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --version 0.0.2

#### Keywords
--keywords is a useful option for keywords of the module in the flow library.
On the flow library website, visitors will search the module using the keywords.
For example, if you want to use "petstore" as a keyword, you can specify the word using --keywords option.
By default, Node generator uses "node-red-nodegen" as a keyword. 

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --keywords petstore

To add more than two keywords, you can also use comma-separated keywords.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --keywords petstore,petshop

When "--keywords node-red" is specified before publishing the generated node, your node will be registered on the flow library and you can install the node via Node-RED flow editor.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --keywords petstore,petshop,node-red

#### Category
On the palette of Node-RED flow editor, the generated node is in the function category as the default.
To change the category or use the product name, you can use --category option.
For example, the generated node which the following command outputs will be in the "analysis" category on the Node-RED flow editor.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --category analysis

#### Node icon
Node generator command supports --icon option to specify icon file for the generated node.
You can use PNG file path or [file name of stock icons](https://nodered.org/docs/creating-nodes/appearance) for the option. The icon should have white on a transparent background.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --icon <PNG file or stock icon>

#### Node color
In the default, Node generator uses default node color defined in the node templates. If you need to change it, you can use the --color option of the command line. The option value should be the sequence of the hexadecimal numbers ("RRGGBB" formats) which represents node color.

    node-red-nodegen http://petstore.swagger.io/v2/swagger.json --color FFFFFF

#### Node information in info tab
Node generator automatically generates the node information in the info tab using the following values in Open API document.

- info.description : Node description
- paths.[path].[http method].summary : Method description
- paths.[path].[http method].operationId : Method name

##### Example of Open API document
```
{
  "swagger": "2.0",
  "info": {
    "description": "This is a sample server Petstore server.",  <- Node generator uses this value as the node description.
    "version": "1.0.0",
    "title": "Swagger Petstore",
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "petstore.swagger.io",
  "basePath": "/v2",
  "schemes": [
    "https"
  ],
  ...
  "paths": {
    "/pet": {
      "post": {
        "tags": [
          "pet"
        ],
        "summary": "Add a new pet to the store",  <- Node generator uses this value as the method description.
        "description": "",
        "operationId": "addPet",  <- Node generator uses this value as the method name.
  ...
}
```

If you want to modify node information in info tab, you can manually edit the node's HTML file at the end of the section.

    vi node-red-contrib-swagger-petstore/node.html

```html:
<script type="text/x-red" data-help-name="swagger-petstore">

    <p>This is a sample server Petstore server.</p>   <- Modify the node description
    <h2>Methods</h2>
        <h3>addPet</h3>                               <- Modify the method name
        <h4>Add a new pet to the store</h4>           <- Modify the method description
        ...
        <h3>deleteUser</h3>
        <h4>This can only be done by the logged in user.</h4> </script>
```

#### README
To explain the details of the node, you need to write documentation in README.md file.
The documentation will be used in the flow library website if you publish your node on the flow library.
Because the Node generator outputs the template file of README.md, you just modify it.

    vi node-red-contrib-swagger-petstore/README.md

```
node-red-contrib-swagger-petstore
=====================

Node-RED node for swagger-petstore

This is a sample server Petstore server.

Install
-------

Run the following command in your Node-RED home directory, typically `~/.node-red`

        npm install node-red-contrib-swagger-petstore
```

#### Test cases
The set of test cases is the most important to maintain the quality of the generated node in production use.
Node generator outputs the template file ("test/node_spec.js") of test cases into the generated directory.
You need to modify the following three lines, (1),(2) and (3) in the test case file.
If Open API document does not contain hostname in "info" section, you need to write hostname as (4) in each test case manually.

    vi node-red-contrib-swagger-petstore/test/node_spec.js

```JavaScript:
    it('should handle addPet()', function (done) {
        var flow = [
            { id: 'n1', type: 'swagger-petstore', name: 'swagger-petstore',
                method: 'addPet',
                addPet_body: '<node property>', // (1) define node properties
                wires: [['n3']]
            },
            { id: 'n3', type: 'helper' }
        ];
        helper.load(node, flow, function () {
            var n3 = helper.getNode('n3');
            var n1 = helper.getNode('n1');
            n3.on('input', function (msg) {
                try {
                    msg.should.have.property('payload', { "id": 4513 }); // (3) define output message
                    done();
                } catch (e) {
                    done(e);
                }
            });
            n1.receive({ payload: { "id": 4513 } }); // (2) define input message
        });
    });
```

In this example, the generated node sends data, "{ "id": 4513 }" to pet store REST API.
And then, REST API returns the same data, "{ "id": 4513 }".
You can run the test cases using the "npm test" command under the generated directory.

    cd node-red-contrib-swagger-petstore
    npm install
    npm test

#### Message catalogs
As the default, Node generator outputs template files of English, Japanese, Chinese and German languages.
When you want to support internationalization of node properties, you need to add language messages of parameters into the files.

    vi node-red-contrib-swagger-petstore/locales/ja/node.json

```
{
    "SwaggerPetstore": {
        "label": {
            "service": "サービス",
            "method": "メソッド",
            "host": "ホスト",
            "header": "ヘッダ",
            "value": "値",
            "isQuery": "クエリ"
        },
        "status": {
            "requesting": "要求中"
        },
        "parameters": {
            "addPet": "addPet",
            "body": "body",
            "updatePet": "updatePet",
            "findPetsByStatus": "findPetsByStatus",
            ...
            "optionalParameters": "任意項目"
        }
    }
}
```

If your node does not support some languages, you can delete the language directory.
(For example, delete "zh-CN" directory, if you do not want to support the Chinese language in the node)

### How to create a node from function node
After writing JavaScript code in a function node, you can export the JavaScript code as js file using "Save to Library..." menu in function node.
Because Node generator uses function node name as the generated node name, it is better to input node name before exporting the function node.
Node-RED saves the js file to the directory, "<Home directory>/.node-red/lib/functions/".
Therefore, you need to specify the directory and file path as the argument of the command line.

(1) Export function node as a js file

![Export function node](images/library.png)

(2) Generate node using node-red-nodegen command

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js

Node-RED users typically import generated node to the palette of Node-RED flow editor using the following procedures.

(3) Change the current directory to generated node's directory

    cd node-red-contrib-lower-case

(4) Prepare a symbolic link

    sudo npm link

(5) Change directory to Node-RED home directory (Typically, Node-RED home directory is ".node-red" under the home directory)

    cd ~/.node-red

(6) Create a symbolic link

    npm link node-red-contrib-lower-case

(7) Start Node-RED

    node-red

(8) Access the Node-RED flow editor (http://localhost:1880)

-> You can see the generated node on the palette of the Node-RED flow editor.

(9) Drag and drop the generated node to the workspace

(10) Create flow on the Node-RED flow editor

-> The flow which consists of inject node, the generated node and debug node are suitable for the first step.

(11) Run the flow

-> In this example, After clicking the button on the inject node, you can get the received data on debug tab.

### Command line options
If you want to customize the generated node, the following procedures and command line options will be helpful.

#### Module name
Node generator uses "node-red-contrib-" as default prefix of the module name.
Therefore, module name is "node-red-contrib-lower-case" when node name is "lower-case".
If you want to change the default module name, you can specify module name using --module or --prefix option.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --module node-red-node-lower-case
    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --prefix node-red-node

#### Node name
In the case of function node, node name in function node is used as the generated node's name.
If you want to change the default name, you can set node name using --name option.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --name new-node-name

#### Version
As the default, the version number of the module is always "0.0.1".
When you update the version number of the module, you need to specify --version option.
Especially, conflict error will occur when you publish the module which has the same version number as the previously published module using "npm publish" command.
In this case, the --version option needs to be specified to update the version number of the module.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --version 0.0.2

#### Keywords
--keywords is a useful option for keywords of the module on flow library.
On the flow library website, visitors will search the module using the keywords.
For example, if you want to use "lower-case" as a keyword, you can specify the word using --keywords option.
As the default, Node generator uses "node-red-nodegen" as a keyword.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --keywords lower-case  

To add more than two keywords, you can also use comma-separated keywords.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --keywords lower-case,function

When "--keywords node-red" is specified before publishing the generated node, your node will be registered on flow library and you can install the node via Node-RED flow editor.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --keywords lower-case,function,node-red

#### Category
On the palette of Node-RED flow editor, the generated node is in the function category as the default.
To change the category or use product name, you can use --category option.
For example, the generated node which the following command outputs will be in the "analysis" category on Node-RED flow editor.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --category analysis

#### Node icon
Node generator command supports --icon option to specify icon file for the generated node.
You can use PNG file path or [file name of stock icons](https://nodered.org/docs/creating-nodes/appearance) for the option. The icon should have white on a transparent background.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --icon <PNG file or stock icon>

#### Node color
In the default, Node generator uses default node color defined in the node templates. If you need to change it, you can use the --color option of the command line. The option value should be hexadecimal numbers ("RRGGBB" formats) which represent node color.

    node-red-nodegen ~/.node-red/lib/functions/lower-case.js --color FFFFFF

#### Node information in info tab
Node generator outputs the template of node information into the node.html file.
You need to modify the template along with your node.
(Node developer will be able to use node description property to use node information in the future version of Node-RED and Node generator)

    vi node-red-contrib-lower-case/node.html

```html:
<script type="text/x-red" data-help-name="lower-case">
    <p>Summary of the node.</p>
    <h3>Inputs</h3>
    <dl class="message-properties">
       <dt>payload<span class="property-type">object</span></dt>
       <dd>Explanation of payload.</dd>
       <dt class="optional">topic <span class="property-type">string</span></dt>
       <dd>Explanation of topic.</dd>
    </dl>
    <h3>Outputs</h3>
    <dl class="message-properties">
        <dt>payload<span class="property-type">object</span></dt>
        <dd>Explanation of payload.</dd>
        <dt class="optional">topic<span class="property-type">string</span></dt>
        <dd>Explanation of topic.</dd>
    </dl>
    <h3>Details</h3>
    <p>Explanation of the details.</p>
    <p><b>Note</b>: Note of the node.</p>
</script>
```

In the template, there are both a summary of the node and three sections.
Inputs section has properties information of inputted messages.
Outputs section has properties explanation of outputted messages.
Details section will contain additional information about the generated node.

#### README
To explain the details of the node, you need to write documentation in README.md file.
The documentation will be used in the flow library website if you publish your node on npmjs.
Because Node generator outputs the README.md template file, you just modify it.

    vi node-red-contrib-lower-case/README.md

```
node-red-contrib-lower-case
=====================

Node-RED node for lower case

Install
-------

Run the following command in your Node-RED home directory, typically `~/.node-red`

        npm install node-red-contrib-lower-case
```

#### Test cases
The set of test cases is the most important to maintain the quality of the generated node in production use.
Node generator outputs the template file of test cases into the file, "test/node_spec.js" under the generated directory.
You need to modify the following two lines, (1) and (2) in the test case file.

    vi node-red-contrib-lower-case/test/node_spec.js

```JavaScript:
    it('should have payload', function (done) {
        var flow = [
            { id: "n1", type: "lower-case", name: "lower-case", wires: [["n2"]] },
            { id: "n2", type: "helper" }
        ];
        helper.load(node, flow, function () {
            var n2 = helper.getNode("n2");
            var n1 = helper.getNode("n1");
            n2.on("input", function (msg) {
                msg.should.have.property('payload', 'abcd'); // (2) define output message
                done();
            });
            n1.receive({ payload: "AbCd" }); // (1) define input message
        });
    });
```

In this example, the generated node converts upper case characters to lower case characters.
Therefore, the input message is "AbCd" and the output message is "abcd".
You can run the test cases using "npm test" command under the generated directory.

    cd node-red-contrib-lower-case
    npm install
    npm test
