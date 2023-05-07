---
layout: about-survey
title: 2023 Node-RED Community Survey
slug:
  - url: /about/community
    label: community
  - 2023 survey
redirect_from:
  - /2023survey
---

<script src="./charts.js"></script>
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

### Introduction

The following are the results from the second Node-RED community survey. The goal
of the survey was to gain a better understanding of who is using Node-RED, how
they are using Node-RED and collect general feedback from the community.

The survey asked for feedback from the Node-RED community during the month of
March 2023. A total of 780 individuals completed the survey. The [first survey](../2019/)
was run in 2019. We have included some comparisons between the surveys to show any
general trends in the community.

If you have any questions or feedback about this report or the survey please
contact us at [team@nodered.org](mailto:team@nodered.org).

### Summary

 - Node-RED continues to be used by individuals creating DIY home automation systems.
   However, recent trends would show an increasing use of Node-RED for professional use cases in a 
   variety of industries
 - Node-RED is a well established community. Over half of the respondents have been
   using Node-RED for over 2 years and more than 75% use Node-RED on a regular basis.
 - The most common messaging technologies using Node-RED are MQTT and HTTP. This
   is consistent with previous survey results and also protocols used for IoT use
   cases. Modbus and OPC-UA, both industrial protocols, did see growth in usage
   from the 2019 survey indicating more industrial usage of Node-RED.
 - InfluxDB gained considerable adoption in the Node-RED community since the 2019
   survey. InfluxDB is now the most popular database used within the Node-RED
   community.
 - Two key reasons for lack of more adoption in organizations appears to be
   perception Node-RED is a proof of concept tool and missing some key features.
 - Overall, Node-RED scored very high on community satisfaction. Over two-thirds
   of the respondents scored Node-RED a 5 out of 5 and just under 95% gave a score
   of 4 or 5. Node-RED is definitely appreciated by the community.


### About Yourself

Close to half the respondents use Node-RED for personal use and the other half
is using for professional purposes and some personal use. For those using it for
professional purposes, the two main reasons appear to be developing internal
solutions and developing external products for their company.

<div class="chart" id="you-and-nr-01"></div>

### Professional Use

When used in a professional setting, Node-RED is typically used by software
developers or manufacturing engineers. It is interesting to note that the role
of Team Leader / Project Manager is also well represented, likely due to the
low-code nature of Node-RED.

Node-RED teams tend to be relatively small with the majority of respondents
reporting teams of less than 10 developers.

Node-RED is being used in small and large companies across a variety of industries.
Of interest since the last 2019 survey is the rise in the Manufacturing and Transportation industries. 

<div class="chart" id="professional-use-01"></div>
<div class="chart" id="professional-use-02"></div>
<div class="chart" id="professional-use-03"></div>
<div class="chart" id="professional-use-04"></div>

### You and Node-RED

The community of users is well established. Over 60% of the respondents have
been using the tool for more than 2 years. A large majority (76.7%) claim to use
Node-RED on a regular basis and close to 80% claim intermediate to advanced knowledge.

<div class="chart" id="you-and-nr2-01"></div>
<div class="chart" id="you-and-nr2-02"></div>
<div class="chart" id="you-and-nr2-03"></div>

### Node-RED Use Cases

The types of applications appear to be diversifying. Home automation continues
to be the number one use case but other more business oriented applications appear
to be growing in importance. It appears this continues the pattern of Node-RED
becoming a tool that is moving from the personal DIY space into the corporate arena.

<div class="chart" id="you-and-nr2-04"></div>
 
### How do you use Node-RED?

Consistent with the home automation use case, a majority of the community members
use Node-RED with less than 10 instances and deploy to a Raspberry Pi or a local
computer. Compared to 2019 results there is a trend to establish processes to
maintain separate development and production environments, indicating more
corporate use cases. 


<div class="chart" id="use-nr-01"></div>
<div class="chart" id="use-nr-02"></div>
<div class="chart" id="use-nr-03"></div>

It appears to be a consistent pattern for less than half of the community to
deploy the same Node-RED flow out to multiple target devices and environments.
This would be consistent with increased usage of Node-RED in industry, especially
the manufacturing industry where Node-RED is being used to track metrics of
industrial equipment.


<div class="chart" id="use-nr-04"></div>
<div class="chart" id="use-nr-05"></div>

### Node-RED Features and Other Technologies

<div class="chart" id="use-nr-06"></div>

HTTP and MQTT continue to be the top messaging technologies used with Node-RED.
Of particular interest is the rise of Modbus and OPC-UA. For database technologies
there has been a significant increase in the usage of InfluxDB and to a lesser
extent Postgres within the Node-RED community. In general InfluxDB has seen a
growth in adoption for IoT use cases.

<div class="chart" id="use-nr-07"></div>
<div class="chart" id="use-nr-08"></div>

### Node-RED Community Nodes

A benefit of using Node-RED is the extensive library of Nodes, which is currently
over 4300. It is very apparent that most community members take full advantage
of using the Node-RED flow library. A total of 57.5% use more than 5 nodes from
the library, including 10.3% that use more than 15 different nodes.

<div class="chart" id="use-nr-09"></div>
 
### Publishing Nodes

Publishing nodes is a key way the community contributes back. Many users have
published one or two nodes, with a small number of users who have published
more.

<div class="chart" id="publish-node-01"></div>
<div class="chart" id="publish-node-02"></div>
<div class="chart" id="publish-node-03"></div>

### Node-RED Community


The Node-RED community forum continues to be the go-to place for getting help
using Node-RED. The community forum is very active and questions are typically
answered very quickly by other community members. Google Search, GitHub Issues
and Stack Overflow are the other popular communication channels for getting help
with Node-RED. 

<div class="chart" id="nr-community-01"></div>

### Feedback

This year's survey asked a question about what was limiting adoption of Node-RED
in organizations.

Just over a quarter of respondents (27.9%) selected that there was no need for
more use of Node-RED. Perception of Node-RED (19.9%) and missing features in
Node-RED (13.3%) were the next two most popular reasons. This may indicate that
the Node-RED community might need to communicate more about the adoption and
capabilities of Node-RED.  Interestingly enough, the fact Node-RED is open source
was only mentioned by 1.5% of respondents.

<div class="chart" id="nr-feedback-01"></div>

Node-RED is well regarded by the community members. Two thirds of respondents
scored Node-RED a 5 out 5 and just under 95% of the respondents scored Node-RED
with a 4 or 5.  The high level satisfaction re-enforces the vibrancy of the
Node-RED community.

<div class="chart" id="nr-feedback-02"></div>


<!-- <div class="treemap-label">Click a category to see more detail</div>
<div id="comments-treemap"></div> -->

### About You

The survey asked for additional demographic information about respondents. Although
over 60% of the respondents reside in Europe, we do believe Node-RED is used
worldwide. A large percentage of respondents are employed full-time or are
self-employed.

<div class="chart" id="about-you-01"></div>
<div class="chart" id="about-you-02"></div>


<script>

$(function() {
    $.getJSON("data-2023.json", function(data) {
        for (var id in data) {
            if (data.hasOwnProperty(id)) {
                var el = $("#"+id);
                if (el.length) {
                    var opts = data[id];
                    opts.id = "#"+id;
                    RED.chart.histogram(opts)
                }
            }
        }
    });
    $.getJSON("comments.json", function(data) {
        RED.chart.treeMap({id:"#comments-treemap",data:data})
    })
})

</script>
<style>
    h3 {
        padding-top: 20px;
    }

    .chart {
        padding: 10px 0 20px;
    }
    .chart h4 {
        margin: 2px 0 20px;
    }
    .chart ol {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .chart ol li {
        margin-bottom: 2px;
    }
    .chart-label {
        font-size: 0.8em;
        padding-left: 255px;
        color: #aaa;
    }
    .chart-key {
        margin: 0 5px 5px;
    }
    .chart-key-swatch {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 1px;
        margin-right: 3px;
    }
    .chart-bar-label {
        text-align: right;
        width: 250px;
        padding: 5px;
        margin-bottom: 1px;
        display: inline-block;
        font-size: 0.8em;
        vertical-align:middle;
        line-height: 1em;
        border-right: 1px solid #B68181;
        min-height: 30px;
    }
    .chart-bar-value {
        font-family: monospace;
        vertical-align:middle;
        display: inline-block;
        width: 50px;
        padding: 5px;
        font-size: 0.8em;
        line-height: 1em;
        border-right: 1px solid #B68181;
        min-height: 30px;
    }
    .chart-bar {
        vertical-align:middle;
        display: inline-block;
        width: calc(100% - 310px);
        margin-left: 5px;
        background: #f9f9f9;
        border-radius: 2px;
        height: 30px;
    }
    .chart-bar-previous {
        display: inline-flex;
        flex-direction: column;
    }
    .chart-bar-fill {
        position: relative;
        display: inline-block;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #000;
        font-size: 0.6em;
        color: #eee;
        padding-left: 2px;
    }
    .chart-bar-fill:first-child {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
    }
    .chart-bar:not(.chart-bar-previous) .chart-bar-fill:not(:first-child) {
        border-left: 1px solid #f9f9f9
    }
    .chart-bar-previous .chart-bar-fill:first-child {
        border-bottom-left-radius: 0;
        margin-botton: 2px;
        height: calc(30% - 2px);
    }
    .chart-bar-previous .chart-bar-fill:not(:first-child) {
        border-bottom-left-radius: 2px;
        height: calc(70% - 2px);
    }

    .chart-bar-fill-series-0 { border-color: #B68181; background: #B68181; }
    .chart-bar-fill-series-1 { border-color: #FCD0A1; background: #FCD0A1; }
    .chart-bar-fill-series-2 { border-color: #B1B695; background: #B1B695; }
    .chart-bar-fill-series-3 { border-color: #A393BF; background: #A393BF; }
    .chart-bar-fill-series-4 { border-color: #AFD2E9; background: #AFD2E9; }
    .chart-bar-fill-series-previous { border-color: #f3e0e0; background: #f3e0e0; }

    .chart-legend {
        margin-top: 5px;
        text-align: center;
        font-size: 0.8em;
        color: #666;
        margin-left: 280px;
    }
    .chart-legend-label {
        margin-left: 3px;
        margin-right: 15px;
        vertical-align: middle;
    }

    .chart-legend-swatch {
        display: inline-block;
        width: 20px;
        height: 10px;
        vertical-align: middle;
    }

    .chart-bar-fill:hover .popover {
        opacity:1;
    }

    .popover {
        pointer-events: none;
        width: 100px;
        text-align: center;
        opacity:0;
        transition: opacity 1s;
        position: absolute;
        height: auto;
        background: #333;
        color: #eee;
        border-radius: 4px;
        z-index: 1000;
        border-color: #333;
        top: -120%;
        left: calc(50% - 50px);
        font-size: 12px;
        padding: 5px 7px;
        line-height: 1.8em;
    }
    .chart-bar-previous .popover {
        /* inline-flex means the positioning has to be absolute */
        top: -38px;
    }
    .popover:after, .popover:before {
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        top: 100%;
        left: 50%;
    }


    .popover:after {
        border-color: transparent;
        border-top-color: #333;
        border-width: 7px;
        margin-left: -7px;
    }
    .popover:before {
        border-color: transparent;
        border-top-color: #333;
        border-width: 8px;
        margin-left: -8px;
    }


    #comments-treemap {
        background: #ddd;
        height: 500px;
    }
    .treemap-label {
        font-size: 0.8em;
        color: #aaa;
    }
    text {
        fill: #f3f3f3;
        font-size: 11px;
        pointer-events: none;
    }
    .titleBar text {
        fill: #555;
        font-size: 14px;
    }
    rect {
        stroke: #fff;
        fill-opacity: 0.6;
    }
    rect.parent,
    .titleBar rect {
        stroke-width: 2px;
    }

    .titleBar rect {
        fill: white;
    }

    .children rect.parent,
    .leaf:hover rect.child,
    .titleBar rect {
        cursor: pointer;
    }

    .children rect.parent {
        <!-- fill-opacity: .5; -->
    }

    .children:hover rect.child {
        fill-opacity: 1;
    }
    .leaf:hover rect.child {
        fill-opacity: 1;
    }

</style>
