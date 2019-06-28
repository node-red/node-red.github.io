---
layout: about-survey
title: 2019 Node-RED Community Survey
slug:
  - url: /about/community
    label: community
  - 2019 survey
redirect_from:
  - /2019survey
---

<script src="./charts.js"></script>
<script src="//d3js.org/d3.v3.min.js" charset="utf-8"></script>

### Introduction

These are the results of our first ever community-wide survey.

We talk to lots of users through our interactions on slack, the forum and elsewhere.
This gives us good insight on specific tasks our users are trying to achieve. But
it is often in the context of them asking for advice or guidance on how to complete
the task. This can give a misleading view on what users are actually doing; we
don't always get to hear about the users who are successfully doing things without
the community's help. Nor do we get the background context of the questions we do
see.

The goal of this survey was to get a better overall picture of how and where
Node-RED is being used, and whether that fitted with our own perceptions. It was
also a goal to validate the priorities of the project's future roadmap.

### Summary

 - The survey received a good number of responses (871) from a reasonably wide
   cross section of the community
 - Whilst there were no major surprises in the results, it did reaffirm many of
   our perceptions.
 - Most respondents use Node-RED in a personal capacity, for home automation and
   similar tasks.
 - However, Node-RED is being used in production and there is a growing amount
   of commercial usage.
 - JavaScript is the prominent language used alongside Node-RED, but Python and
   Java are also well represented.
 - Devices are the most common platform for running Node-RED, with the Raspberry Pi
   way out in the lead.
 - Almost of third of respondents use separate 'development' and 'production' systems,
   however they do not have any automation to move between them. This was
   also reflected in the written comments looking for workflow improvements around
   version control, CI/CD integration testing and documentation to support these
   scenarios


### You and Node-RED

A clear majority of the users we have daily contact with are using Node-RED in
some sort of personal capacity and this is reflected in the survey responses.

But we don't always get a sense of is the wider context that someone is using
Node-RED in. This section sought to get a sense of that context.


<div class="chart" id="you-and-nr-01"></div>

As with many of the questions in the survey, respondents could pick all answers
that applied to them. We did not further define the terms 'in-production' or
'proof-of-concept' and left it to the respondents' own interpretation.

<div class="chart" id="you-and-nr-02"></div>

We then wanted to dig a little deeper in the non-personal scenarios - namely
use in education and commercial/professional settings.

Broadly speaking, these results reflect our own impressions of how Node-RED is
being used. At its core, we have lots of individual users, but there is an
ever growing number of companies adopting Node-RED in various forms.

### Educational Use

There's a rich potential for Node-RED in educational settings, but it is not one
we have dedicated much of the project's resources to in the past.

These results show there are a handful of settings using Node-RED as part of their
course material. We plan to follow up with those respondents to find out more
details to see what else the project could do to support these activities.

<div class="chart" id="educational-use-01"></div>
<div class="chart" id="educational-use-02"></div>

### Professional Use

This section was intended for those using Node-RED in professional settings.
However many respondents completed this section regardless of how they responded
to the previous question.

This gives us a good background view of the wider respondent set, which can also be
filtered to just the 'professional' identifying set.

However, having done that filtering, the trends in the results were largely
unchanged. The charts below reflect the complete response set.

<div class="chart" id="professional-use-01"></div>

Unsurprisingly, most respondents self-identify as Developers. But there is good
representation across the whole range of roles.

<div class="chart" id="professional-use-02"></div>
<div class="chart" id="professional-use-03"></div>

<div class="chart" id="professional-use-04"></div>
<div class="chart" id="professional-use-05"></div>

There's a natural correlation between use of Node-RED and JavaScript elsewhere
in the technology stack. The high proportion of Python is also unsurprising - there
are a small number of Python related nodes available in the library and does come
up on the forum more so than other languages. We don't do anything in the core
of the project to support the python integration, but that may be something we
want to review. For example, the available python-function nodes are not actively
maintained and have fallen behind the core Function node in terms of available
functionality.


### You and Node-RED 2

Naming things is hard. It was only after we closed the survey and started compiling
these results that I noticed we had two sections called the same thing. But no matter.

<div class="chart" id="you-and-nr2-01"></div>

This shows we've managed to reach a good representation of experience with this
survey.

<div class="chart" id="you-and-nr2-02"></div>
<div class="chart" id="you-and-nr2-03"></div>

There were no real surprises in our users experiences with these related technologies.

The relative inexperience around Docker, Serverless and Kubernetes is worth noting
as we consider possible future plans around how we can help users manage deployments
across larger scale installations.

<div class="chart" id="you-and-nr2-04"></div>

The large proportion of Home Automation usages correlates strongly with the
personal usage responses. Edge device logic is also worth noting.

### How do you use Node-RED?

<div class="chart" id="use-nr-01-a"></div>
<div class="chart" id="use-nr-01-b"></div>

Respondents predominantly run Node-RED locally in some form, with Raspberry Pi 2/3
being the most popular. In the cloud arena, IBM Cloud is the most popular, reflecting
the project's heritage and that we provide a Starter Kits application in the IBM Cloud
catalog.

<div class="chart" id="use-nr-02"></div>

The distribution of operating systems is a somewhat natural reflection of the types
of devices being run on. The popularity of Windows 10 should be noted - we don't
routinely develop and test on Windows in the core of the project and rely on the
community to feedback issues. That isn't ideal and we need to find a way to address it.

<div class="chart" id="use-nr-03"></div>

An important thing to note here is the high proportion of 'not sure' responses -
this implies a user base that is less interested in node.js itself and takes
whatever it is given.

<div class="chart" id="use-nr-04"></div>

The range of responses here will help us identify where we need to provide
more documentation and examples. A decent proportion of respondents who asked
about version control were unaware of the Projects feature. We need to improve
some of the Projects user experience and think about how we can enable it by
default at some point.

<div class="chart" id="use-nr-05"></div>

A key requirement for the project will be to make it much easier for users to
have a proper development workflow that can maintain separate development and
production instances.


The following questions help us to identify what nodes are important to users.

<div class="chart" id="use-nr-06"></div>
<div class="chart" id="use-nr-07"></div>
<div class="chart" id="use-nr-08"></div>

### Publishing Nodes

Publishing nodes is a key way the community contributes back. Many users have
published one or two nodes, with a small number of users who have published
more.

<div class="chart" id="publish-node-01"></div>
<div class="chart" id="publish-node-02"></div>
<div class="chart" id="publish-node-03"></div>

The reasons for publishing a node are fairly varied. The high proportion of respondents
says they made a copy of an existing node is slightly surprising. We'd like to
be able to dig into those responses a bit more to find out *why* a copy was needed.


### Node-RED Community

Understanding how the community has engaged with the development activities of the
project will help us towards our goal of getting more people contributing.

<div class="chart" id="nr-community-01"></div>
<div class="chart" id="nr-community-02"></div>

Many issues faced by users are more how-to type questions rather than quality issues
in the code. That's a good reflection of the code quality, but reflects less well
on the documentation and learning resources we provide.

<div class="chart" id="nr-community-03"></div>

### About You

<div class="chart" id="about-you-01"></div>
<div class="chart" id="about-you-02"></div>
<div class="chart" id="about-you-03"></div>

### Feedback

The survey asked respondents what three things they felt Node-RED was missing,
as well as any other feedback they wanted to share. This resulted in 1475 comments
of which 1166 were identified as feedback we can learn from. Those comments were
then classified into a hierarchy of categories. The chart below shows the relative
number of comments under each category - click on each one to see more details.

There are no immediate conclusions to draw from this, but these results will
help us to shape on the roadmap for the future of the project.

<div class="treemap-label">Click a category to see more detail</div>
<div id="comments-treemap"></div>


---

### Methodology

The  survey was open for submissions for 45 days from March 12th
to April 26th, 2019. It was publicised across all of our social channels - the forum,
slack channel and Twitter account. It was also shared in the unofficial Node-RED
Facebook group as well as amongst the Node-RED Japan User Group members.

In total, there were 871 responses.

No information was collected on how a respondent found out about the survey so we
don't know which were the more effective methods.

The questions were written and review by the core Node-RED team. The goal was
to get a general picture of the Node-RED user community. Through the forum we
see a lot of activity from the user community. But it tends to be users asking
questions when they are stuck, so it doesn't give us a good view of the wider
community.

As this was the first time we've done such a survey, inspiration was sought from
various, more established, tech community surveys. This helped identify the sorts
of questions we could be asking, albeit tailored to Node-RED.





<script>

$(function() {
    $.getJSON("data.json", function(data) {
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
    .chart-bar-fill:not(:first-child) {
        border-left: 1px solid #f9f9f9
    }
    .chart-bar-fill-series-0 { border-color: #B68181; background: #B68181; }
    .chart-bar-fill-series-1 { border-color: #FCD0A1; background: #FCD0A1; }
    .chart-bar-fill-series-2 { border-color: #B1B695; background: #B1B695; }
    .chart-bar-fill-series-3 { border-color: #A393BF; background: #A393BF; }
    .chart-bar-fill-series-4 { border-color: #AFD2E9; background: #AFD2E9; }

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
        width: 50px;
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
        left: calc(50% - 25px);
        font-size: 12px;
        padding: 5px 7px;
        line-height: 1.8em;
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
