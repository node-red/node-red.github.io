---
layout: docs
toc: practice-toc.html
title: Improving readability
---
### Align nodes  
 
*As the size of the application increases, the process of flow will become complicated, which decreases readability and understandability. One of the key points to improve readability and understandability is a proper node alignment such that flows of one function are adjacent to each other. This chapter shows effective node alignment.*  
 
### Naming rule  
 
*Name of nodes, tabs and subflow is important for readability and reusability of flows. This chapter presents some effective naming rules of them.(italic)*  
 
### Using proper nodes  
 
*Each node can be used flexibly. For example, a function node can cover the same function of Change node, Switch node and so on. However, using a proper specialized node for your objective contributes improving understandability of your flows. This chapter introduces the roles and usage of core nodes such as **Change, Switch, Template, Link, HTTP**.*  

*The **Function** node and **Exec** node are useful for JavaScript and other language developers because they can write JavaScript codes and commands directly. However, heavy use of them makes understanding flow difficult for other developers. This chapter describes a caution of these nodes and shows examples of alternative methods against Function node and Exec node.*  
 
#### Link node

*You can divide the flows when it be too long by using Link node. And it allows you create flows accroding to the size of the display and makes the layout clean.*  

### Changing icon  
 
*When the same kind nodes are in the flow (e.g. a case that managing a large number of devices with MQTT nodes), it is difficult to distinguish nodes. But, it can be solved by designating different icons for each node. This chapter introduces the procedure for changing the icon and some Use Cases.*  

### Comment  
 
* *Comment on tab*  
* *Comment on flow (Comment node)*  
* *Comment on subflow*  
* *Logging strategy*  
 
### Refactoring  
 
*It is better to check and refactor the developed flows before presenting it to other developers. This section shows refactoring points such as followings,*  
 
1. *Coding Style*  
2. *Flow implementation*  
3. *Readability and reusability*  