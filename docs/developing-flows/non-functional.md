---
layout: docs
toc: developing-flows-toc.html
title: Responding to strict non-functional requirements
---

*Node-RED does not strongly focus on applications with strict non-functional requirements.*    
*However, there are cases that it is necessary to satisfy high level non-functional requirements.*    
*This chapter explains techniques and others to satisfy non-functional requirements.*  
 
### Precautions due to single thread  
 
*If a node takes long time for execution, the process of the entire Node-RED instance stops.*  
*Therefore, it is advisable to outsource the processing with running other services.*  
 
### Sequential guarantee  
 
*Node - RED does not guarantee the arrival order of messages. Therefore, it is better to design related messages in a format expressing the order relation of messages. (Separated message format)*  
 
<!--  
This content was included in this wiki. However, we have determined that it is better to add this section to the other document existing. We will discuss it next time.   
 
## Managing state  
 
You need to manage the execution status of the program for following cases:  
 
* Calculation processing targeting multiple messages  
* Sharing information among multiple nodes  
* Process depending on Node-RED External state  
* Recovery processing at error occurrence  
 
This section describes the policy of state management about following points.  
 
* Type of state  
* Maintaining flow state  
* Maintaining node state  
 -->  