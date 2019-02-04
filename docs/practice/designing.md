---
layout: docs
toc: practice-toc.html
title: Designing a flow
---

### Development steps  
 
*If a project needs complicated logic, it is better to design flow before starting development. After that, you create flows based on the flow design. In this subsection, we show an overview of whole recommended steps of design and development.*  
 
* *Design*  
   - *Flow structure*  
   - *Message*  
* *Implementation*  
 
### Designing flow structure  
 
*As the size of flows in a tab gets larger, it can be difficult to recognize a function of each flow within a tab. To improve reusability of flows, it would be better to decide the responsibility of flows within each tab and the scale of one tab. To do this, it is helpful to sort out what kind of things, people, work, rules are in the target domain of the application, and relationship of them.*  
 
### Designing messages  
 
*There are risks that multiple nodes have dependencies by messages passing through nodes.*  
*For other developers to reuse flows, it is important to design messages so that dependencies get to be relaxed. This chapter proposes a guide about designing message.*  
 
*We have already written actual contents on [here](https://github.com/node-red/node-red.github.io/wiki/Flow-Guideline-Contents).*  
 
#### Designing key-value structure of `msg`  
 
*`msg` is a JavaScript object that contains a key-value structure like JSON. While a `msg` transits across multiple nodes, the nodes use some keys and values of the `msg`. If two or more nodes of them use the same key for different their own purposes, preparing `msg` for input of the nodes is so difficult.*  
 
*Therefore, policies of key-value structure are needed and this subsection describes it as followings,*   
 
* *Top-level keys of `msg` are used to control the functionality of node*  
* *`msg.payload` is used as input parameters of a process of a node*  
 
#### Keeping properties  
 
*In the case of using function node, you can prepare output messages by creating new `msg` objects. However, the output messages may not have some properties that the input message has. This means that properties that should be kept in your flow has lost. Since this can be a cause of serious bugs, preparing output messages based on an input message is better, instead of creating new `msg`.*  
 
#### Add tag into `msg` to distinguish a node that sent the `msg`  
 
*[Tips] If it is needed that a (latter) node executes a different process depending on a (former) node that send `msg`, former node adds tags describing the former node itself. With the tag, the latter node decide the process to execute.*  
 
#### Using persistent storage outside of Node-RED  
 
*If you handle the large amount of data, it is **not** recommended to set the data into `msg` since `msg` can exhaust available memory. Instead, you had better put the data on a persistent storage that is outside of Node-RED and use reference to the data for handling the data.*  
 
#### Processing messages in order of their arrival  
 
*Since Node-RED (JavaScript) processes asynchronously, a node cannot assume that it executes process for arrival `msgs` by the order of arrival.*    
 
<!--   
If you want to assume processes by the order of arrival, try this code. 
 
```javascript  
// Accumulation of messages  
var msgs = context.get('messages') || [];  
msgs.push(msg);  
if(msgs.length === ...) {  
  ... // Process messages  
}  
context.set('messages', msgs);  
 
```  
 -->  