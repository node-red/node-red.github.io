---
layout: docs
toc: practice-toc.html
title: Implementation of flow
---

### Cooperation between flows  
 
*One application may be constructed by integration of small flows that provide small functions. Since each small flow may be created by a different team, deciding how to integrate the small flows is important for smooth collaborative development.*    
 
*Http in/out/request nodes are useful for the integration. However, if you do not want to expose endpoints of small flows, you can make sub flows from the small flows and create an additional flow to integrate sub flows.*  
 
### Managing environmental variables  
 
*Global context can be used as an environmental variable of flow execution. However, if you use the global context in various nodes, identifying dependencies between nodes becomes a hard work, and it can lead to bugs. To minimize the dependence on the global context, it is necessary to make it easier to see where the global context is used.*    
 
### Flows that can have adverse effects  
 
*With Node-RED, even non-programmers can easily enjoy coding. However, Node-RED (as of 0.19.5) does not strict restrictions on creating flows and debugging tools such as a lint, you can easily create dangerous flows that can cause bugs. In particular, it is also possible to lead to resource exhaustion of Node-RED engine.*      
 
*This chapter shows certain cautions and principles not to create such dangerous flows.*    
 
### Error Handling  
 
*To create reliable flows, error handling is essential. This chapter explains its implementation method and arrangement of error handling flow to easily distinct between nominal flow and anomaly flow.*    