---
layout: docs
toc: creating-nodes-toc.html
title: Testing
---

This guideline explains how to write and execute test code for node.

Because nodes run in Node-RED, you cannot execute the processing of individual units of HTML or JavaScript to test processing.
In addition, if you use manual testing, you need to stop and restart Node-RED after each test so that cleanup processing takes place.
This makes testing quite time-consuming.
Therefore, a tool called [Node Test Helper](https://github.com/node-red/node-red-node-test-helper) (hereafter "helper") has been developed for Node-RED.
This tool provides a framework for node testing.
By using this framework, you can easily run nodes at the code level.

Node-RED uses the following libraries for testing, and we recommend their use when using the test code.
You will need to have an understanding of the specifications of these libraries when creating test code.
Read the documentation of each library and learn how to use it.

| No. | Library | Purpose | URL |
| --- | --- | ---| --- |
| 1 | Mocha | Test framework | [https://mochajs.org](https://mochajs.org/) |
| 2 | Should.js | Assertion | [https://shouldjs.github.io](https://shouldjs.github.io/) |
| 3 | Sinon.js | Test double (general testing) | [http://sinonjs.org](http://sinonjs.org/) |
| 4 | Nock | Test double (for creating mock HTTP server) | [https://github.com/nock/nock](https://github.com/nock/nock) |
| 5 | nyc | Coverage | [https://www.npmjs.com/package/nyc](https://www.npmjs.com/package/nyc) |

### Creating test code

Creating test code consists of the following steps:

1. Preparing the environment
2. Creating the test code
3. Running the test code

### 1. Preparing the environment

Use `npm` to install the modules required for testing in the directory in which you are developing your custom node.

```bash
npm install node-red-node-test-helper should mocha --save-dev
```

Install modules like `sinon` and `nock` as needed.

### 2. Creating the test code

Create a spec file that contains the test directory and the test code.
You would typically create a `test` directory in the same directory as package.json, and use the naming rule `file-to-be-tested_spec.js` for the test files themselves.
[Example]

```text
.
├── test-node.js
├── test-node.html
├── package.json
└── test
    └── test-node_spec.js  // As the spec file for test-node.js, the file name is test-node_spec.js
```

The processing of test code typically follows this sequence:

1. Load libraries
2. Initialize helper
3. Start helper
4. Exit helper
5. Load test flow into helper
6. Run test flow in helper
7. Evaluate processing results

The following explains how to create test code based on the lowercase [example](https://github.com/node-red/node-red-node-test-helper#Example-unit-test) in the helper.
The test code is written using Mocha.
Specific details about Mocha are not given here, but you can learn about writing test code in Mocha by visiting the preceding URL and other resources.

```javascript
// 1. Load libraries
var should = require("should");
var helper = require("node-red-node-test-helper");
var lowerNode = require("../lower-case.js");

// 2. Initialize helper
helper.init(require.resolve('node-red'));

describe('myNode', function () {

  // 3. Start helper
  beforeEach(function (done) {
      helper.startServer(done);
  });

  // 4. Exit helper
  afterEach(function (done) {
      helper.unload();
      helper.stopServer(done);
  });

  // Test case
  it('should make payload lower case', function (done) {
    // Define test flow
    var flow = [{ id: "f1", type:"tab"},
                { id: "n1", z:"f1", type: "lower-case", wires:[["n2"]] },
                { id: "n2", z:"f1", type: "helper" }];
    // 5. Load test flow into helper
    helper.load(lowerNode, flow, function () {
      var lowerCase = helper.getNode("n1");
      var helperNode = helper.getNode("n2");
      // 7. Evaluate processing results
      helperNode.on("input", function (msg) {
        msg.should.have.property('payload', 'uppercase');
        done();
      });
      // 6. Run test flow in helper
      lowerCase.receive({ payload: "UpperCase" });
    });
  });

  it('should do something', function (done) {
    // Write test codes here ...
  });
});
```

#### 1. Load libraries

As a minimum, you will need to load the following libraries:

1. should.js
2. node test helper
3. The node to be tested (lower-case.js in the example)

Add libraries like sinon.js as needed.

#### 2. Initialize helper

The helper does not in itself have the ability to run nodes and does so by referencing code in the Node-RED platform.
Give helper access to the code of the Node-RED platform by passing the Node-RED path to `helper.init()`.

#### 3. Start helper and 4. Exit helper

If you start helper and then run multiple test cases, the results of a test case might remain in helper and contaminate the results of other test cases.
For this reason, you must exit and restart helper after each test case.
You can make sure this takes place by calling the startup and shutdown of helper in `beforeEach` and `afterEach` functions.

#### 5. Load test flow into helper

Define the test flow to run as the test case, and load it into the helper.
If your custom node has an output terminal and you want to evaluate its output results, we recommend that you create a flow using a __helper node__.
A helper node is a mock node provided by the helper.
You can check the output of a node you are testing by creating a flow in which a helper node is the succeeding node.

We recommend that you define a tab as part of a test flow (this corresponds to `{ id: "f1", type:"tab"},` in the example).
Although the code will run without a tab definition, if you do not specify one, the code is deployed internally to a tab named `global`.
This means processing such as catch nodes and flow contexts that apply within a flow will not work correctly.
We recommend that you include a tab definition to better simulate a real-world environment.

Nodes that use credentials can be accommodated by passing arguments as shown in the following API request:

Load API request of Node Test Helper in Version 0.1.7

```javascript
load(testNode, testFlows, testCredentials, cb)
```

| No. | Argument | Required | Description |
| --- | --- | ---| --- |
| 1 | `testNode` | Yes | Node to be tested |
| 2 | `testFlows` | Yes | Flow definition to be run by helper |
| 3 | `testCredentials` | No | Credentials to pass to helper |
| 4 | `cb` | Yes | Callback function executed after loading the flow |

#### 6. Run test flow in helper

Note: As in the preceding example, write the test code so that this step is executed after "7. Evaluate processing results".

Most nodes execute processing in response to a certain action, such as receiving a message from the preceding node.
This means that you need to write processing into the test case that triggers the execution of the node.
For nodes with input terminals (nodes whose processing is triggered by receiving a message from the preceding node), you can use `receive` to pass a msg object to the node being tested as follows:

``` javascript
lowerCase.receive({ payload: "UpperCase" });
```

For nodes without an input terminal, you need to write the processing that the node expects.
Because each node is executed in a different way, we have provided samples of core nodes for reference:

* [tail node](https://github.com/node-red/node-red/blob/master/test/nodes/core/storage/28-tail_spec.js#L69-L70)  
  A tail node monitors a specific file, and when information is added to the file, sends the additions as a message to the succeeding node.
  Node execution is triggered by using an `fs` module to add a character string to the file.

* [websocket node](https://github.com/node-red/node-red/blob/master/test/nodes/core/io/22-websocket_spec.js)  
  A websocket node can add a WebSocket server and send data received from a client to the succeeding node (or send data to the client).
  The node is executed by using a `ws` module to create a WebSocket client and sending data to it.

#### 7. Evaluate processing results

Use `should.js` to write an expression that evaluates the processing results of the node.
If you want to evaluate the messages output by the node being tested, you can do so in an `input` listener in the helper node, as shown in the example.
An `input` listener is an event that is called when there is output from the preceding node.
It is passed as an argument of the message output of the preceding node.

#### Sample test code

For reference, sample code for node testing is provided at the following locations:

* [core node test case](https://github.com/node-red/node-red/tree/master/test/nodes/core)
* [node-red-nodes test case](https://github.com/node-red/node-red-nodes/tree/master/test)
* [node-red-web-nodes test case](https://github.com/node-red/node-red-web-nodes/tree/master/test)

### 3. Running the test code

After creating the test code, you can run the test by executing the following command:

```bash
mocha \"test/**/*_spec.js\"
```

### Testing a node that calls a custom system (external service)

When testing a node that calls a custom system or other external service in the __local environment__, the processing of the node cannot be executed if the external service cannot be accessed from the local environment.
You can test this kind of node in a way that does not depend on the environment by creating test code that uses a stub.
Particularly in the case of unit testing, there is a good chance that the test code will be executed in different environments, such as that of another developer or a CI/CD environment.
For this reason, we recommend that you create test code that does not depend on the environment.
When the time comes to conduct integration testing or system testing, use the actual external system in the test instead of the stub.

#### Creating a stub

By way of example, this section explains how to create a stub for a custom system (external service) that has an HTTP API.

* Using [nock](https://github.com/nock/nock) to create a stub (recommended)  

  `nock` is a module created to test HTTP requests.
  It implements a request stub by partially overriding the standard `http` module.
  `nock` allows you to create stubs with relatively simple coding and is easier to learn than `express`.

  * Examples of test code creation
    * [node-red-web-nodes test code](https://github.com/node-red/node-red-web-nodes/tree/master/test)
      The test code for most nodes is created by using `nock`.

* Using [express](https://github.com/expressjs/express) to create a stub

  `express` is a framework for web application development.
  You can use `express` to create a web server deployed locally, and send requests to that web server during testing.
  The web server works as a stub web server, which makes the test non-dependent on external factors.
  Consider creating a stub web server in `express` when testing processing that includes special requests beyond the capabilities of `nock`.

  * Example of test code creation
    * [httprequest node](https://github.com/node-red/node-red/blob/master/test/nodes/core/io/21-httprequest_spec.js)
      By creating a `testServer` in the test code that returns a specific response and issuing any requests to `testServer`, you can perform testing without connecting to a web server outside the local environment.

### Notes on automatic testing by using test code

* Using a test double  
  The use of a test double offers many advantages, including freedom from dependencies and the ease with which behavior can be verified.
  Make sure that you have a thorough understanding of `nock` or `sinon` and are able to use it as the situation requires.

* Using settings.js during testing
  As of Version 0.1.7, Node Test Helper loads a substantially empty settings.js file that it creates internally.
  You cannot use a customized settings.js file during testing.
  If the node you are testing contains code that references settings in settings.js, you might be unable to test it using test code.

* OS dependence  
  Node-RED runs on the Node.js platform and is generally OS-independent provided that Node.js is available.
  However, when executing functions that use OS resources such as file access or command execution, the behavior might differ depending on the operating system, especially when testing things like timeouts.
  Testing should ideally be conducted in the most commonly used OS environments, namely Linux, Windows, and macOS.
  To test the node on the various environment, online workflow services like Travis CI are useful.

## Test items specific to node development

* Testing package.json  
  When Node-RED loads a custom node, it references the package.json file associated with the node.
  If the code in package.json contains an error, Node-RED will be unable to load the node correctly.
  We recommend that you conduct a test in which you use the `npm` command to create an npm package for the custom node and load it in Node-RED.
