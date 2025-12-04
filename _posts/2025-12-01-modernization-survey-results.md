---
layout: blog
title: Modernization Survey Results
author: Dimitrie Hoekstra
description: Conclusions for Node-RED's Modernization Survey 2025 Results
image: /blog/content/images/2025/12/state-of-node-red-2025.jpeg
---

Earlier this year, we ran [a community survey](https://discourse.nodered.org/et/node-red-survey-shaping-the-future-of-node-reds-user-experience/98346) with a focus on how we could modernize the Node-RED user experience. We revealed some of the results at [Node-RED Con](https://www.youtube.com/watch?v=lwhHYPVgc2w&list=PLyNBB9VCLmo2yvFdVZOv41NUEzuw-CAZX), but now we wanted to share the full set of results with you.

<div class="doc-callout">
    If you want to go ahead and dive into the survey results completely unbiased, you can go ahead and view them on this page: <a href="https://nodered.org/community-survey">Node-RED Community Survey</a>. We invite you to share your thoughts in this <a href="https://discourse.nodered.org/t/modernization-survey-results-now-available/99830">blogpost</a>.
</div>

## Focusing in on userbase segments

For this blogpost, we want to stay relatively high level and do a kind of retrospective if you will. We will zoom in specifically on the differences between our userbase segments, meaning; everyone who responded, hobbyists, and people using Node-RED in bigger production environments (henceforth called "production-users"). The differences between those are interesting and let us know where to put focus for different use cases.

To start off with, we can look at the level of programming experience and how that differs between the segments. 

<img src="/blog/content/images/2025/12/What's-your-programming-experience-level.jpeg" style="margin-left:-1.5%;">

We can see that the level of comfort with code is balanced differently for people using Node-RED in bigger production environments which is no surprise. It is important to keep in mind though going forward.

In the end, the goal is to improve Node-RED together, so it can further enhance us all and make true on its potential. Whether growth comes from professional use, where Node-RED development can get a boost due to funding, or hobbyists use, where growth through community contributions means a widening of applications and usefulness. Both are important.

### What is working well

<img src="/blog/content/images/2025/12/What-do-you-love-most-about-Node-RED-right-now.jpeg" style="margin-left:-1.5%;">

Node-RED is famous for its visual node based workflow, which comes as no surprise that it is the most beloved feature across all segments. Where it gets interesting is where most value is placed across segments. The general userbase and hobbyists value the ease of working with Node-RED and its versatility, where the production-users value Node-RED especially for prototyping, connectivity, efficiency, and debugging capabilities.

<img src="/blog/content/images/2025/12/What-makes-Node-RED-feel-like-'Node-RED'-to-you.jpeg" style="margin-left:-1.5%;">
    
Moving on, we can see that the community and ecosystem, especially sharing flows is especially important for hobbyists. Meanwhile, the effectiveness of Node-RED to get from idea to production through ease of use, ease of debugging, and deployment simplicity is valued more on the production-users side. Dashboards seem to be equally valued across segments.

<img src="/blog/content/images/2025/12/What-aspects-of-Node-RED-should-ideally-never-change.jpeg" style="margin-left:-1.5%;">
    
The open-source aspect is valued more by the community than the production-users segment. Not surprising, but something where I do think we are going to see a change in the years to come. Open-source will continue to become more and more important, also for companies using software. The community is ahead of the curve in this one, as is Node-RED.

Production-users value the stability that Node-RED and its development methodology brings. This is something we are looking into formalising more. We expect this to become an increasingly important factor going forwards due to an increasing AI influence. 

Lastly, we want to highlight a more subtle data point: "resistance to change". Which is surprisingly low across all segments, though we need to take into account all things that Node-RED does well! The Node-RED community is an especially supportive one.

### What is not working as well

<img src="/blog/content/images/2025/12/What-frustrates-you-most-about-Node-RED.jpeg" style="margin-left:-1.5%;">

The most striking difference is version control and diffing; it frustrates 42% of production-users compared to just 23% of hobbyists. This makes sense when you consider teams working on the same flows and needing to track changes over time. Similarly, managing large or complex flows (32% vs 20%) and understanding performance impact (28% vs 15%) are significantly bigger pain points in production environments. 

On the flip side, we can see that mobile and tablet usability frustrates hobbyists more (26%) than production-users (16%), which suggests more varied device usage. The same goes for UI navigation and management where hobbyists seem more frustrated with this at 22% while production-users only at 5%. Debugging flows is the top frustration for hobbyists at 27%, while production-users seem more comfortable here at 20%, likely due to their higher programming experience levels. For hobbyists, this points at problems getting acquainted with Node-RED, both when starting out and when starting to use Node-RED for more use cases. Even for production-users it is a point of attention.

One thing that stands out across all segments: the lack of UI customisation and concerns about community/custom node availability both sit around 21-24% - these are universal pain points regardless of how you use Node-RED.

<img src="/blog/content/images/2025/12/Is-there-anything-that-holds-back-production-adoption.jpeg" style="margin-left:-1.5%;">

Moving on to what holds back production adoption. This section will naturally focus more on production-users, plus some results here, for hobbyists, must be taken with a grain of salt. 

We can see that version control appears again as the #1 blocker with 40% for production-users versus only 16% for hobbyists. This might also point at that Node-RED might not be informing well enough about what upgrade paths there are in the community for more advanced use cases. FlowFuse being the main one, where they extend Node-RED for enterprises, and already solve for this pain point.

We continue to see a clear pattern of enterprise concerns emerging for production-users: uncertainty about third-party node quality and security (32%), lack of monitoring and management tools (28%), limited enterprise security features (25%), and compliance/auditing concerns (18%). These are areas where hobbyists show significantly less concern, which makes sense given the different stakes involved. The exception being "third-party node quality and security" which is a theme we are sure to improve upon as soon as possible.

Furthermore, management skepticism about viability affects 20% of production-users. Meaning one in five face internal resistance to adopting Node-RED. The perception of Node-RED as "a hobby tool, not professional" affects 11% of production-users. Collaboration and team features are also notably more important for production-users (19%) than hobbyists (7%), highlighting the need for better multi-user workflows and an expectation of modern user workflows.

<img src="/blog/content/images/2025/12/What-would-draw-you-away-from-Node-RED.jpeg" style="margin-left:-1.5%;">

This question reveals something important about satisfaction levels across segments. Hobbyists are considerably more satisfied - 28% said "nothing" would draw them away, compared to only 10% of production-users. This gap tells us that while Node-RED serves hobbyists better, there is more work to do, especially for production use cases.

Production-users are significantly more concerned about performance and technical issues (26% vs 10%), security and safety concerns (13% vs 5%), and community/ecosystem sustainability (13% vs 8%). Meanwhile, superior alternative platforms would draw away 16% of production-users versus 13% of hobbyists - competition is felt more strongly in the enterprise space.

One thing that remains consistent across all segments: licensing and pricing concerns sit at 23-27%. This reflects the strong value our community places on Node-RED's open-source nature. It is important to note here that Node-RED is owned by the [OpenJS foundation](https://openjsf.org/) which protects it from a lot of pitfalls of profit driven projects or projects that can be bought out. It is a move we have seen across the industry with the [open home foundation](https://www.openhomefoundation.org/blog/announcing-the-open-home-foundation/) and the [react foundation](https://openjsf.org/blog/celebrating-the-react-foundation). We can improve on making sure this is as apparent as possible.

### What we should focus on

Though this section can feel a bit duplicative considering the previous section, we think it is important to see how more directed questions unveil additional information or validate previous points.

<img src="/blog/content/images/2025/12/Which-missing-features-would-most-improve-your-Node-RED-experience.jpeg" style="margin-left:-1.5%;">

Better dashboard creation tools tops the list for hobbyists and is also important for production users. This aligns with UI customisation needs. Production-users' needs are confirmed again with version control and diffing (28%) and enhanced debugging (28%). Where it gets interesting is AI-powered assistance in-app: production-users want this at 27% compared to hobbyists at 16%. This suggests production-users see more potential for AI to help with complex flow development. To reinforce this: hobbyists put a lot of value on the documentation and help system which indicates a bigger reliance at traditional support tooling.

We can see that better performance with large flows is significantly more important for production-users (26%) than hobbyists (10%), which aligns with the frustrations we saw earlier. Mobile and tablet interface improvements matter more to hobbyists (23% vs 11%), again reflecting their more varied usage contexts.

One thing that stands out: improved collaboration features are twice as important for production-users (14%) compared to hobbyists (7%), reinforcing the need for better team workflows in enterprise settings.

<img src="/blog/content/images/2025/12/What's-the-single-biggest-improvement-Node-RED-needs.jpeg" style="margin-left:-1.5%;">

UI/UX and visual improvements clearly lead across all segments at around 40%. This is a strong signal that modernizing the interface should be a priority. AI integration and LLM support comes second at 25-28% across segments, showing the community's interest in keeping Node-RED current with modern technology trends regardless of current biases.

Performance and scalability shows a surprising pattern: hobbyists care more (11%) than production-users (7%). This might indicate that production-users have already found workarounds or are using extended solutions like FlowFuse for their scaling needs. Home users will often be more reliant on single instances, indicating also at the need for better understanding of Node-RED instance capacity-usage.

<img src="/blog/content/images/2025/12/What-aspects-of-Node-RED-must-be-changed-or-be-updated.jpeg" style="margin-left:-1.5%;">

Dashboard enhancement shows the starkest contrast: 23% for hobbyists versus only 5% for production-users. This suggests hobbyists rely more heavily on Node-RED's built-in dashboard capabilities, while production environments likely use external visualization tools.

Configuration and settings management is notably more important for production-users (18% vs 4%), as is core architecture and language support (16% vs not in top results for hobbyists). These point toward needs for better deployment configuration and TypeScript/ESM modernization in enterprise contexts.

<img src="/blog/content/images/2025/12/If-you-could-change-one-thing-about-Node-RED-what-would-it-be.jpeg" style="margin-left:-1.5%;">

This open-ended question brings everything together and reinforces what we have learned already. Other than that, Hobbyists are more satisfied overall: 21% said "nothing/no changes" compared to only 9% of production-users. The focus on debugging and development tools remains high across both segments (22% and 16%), suggesting this is a universal improvement area that would benefit everyone.

## Including the community

We have worked hard at figuring out a comprehensive way to let you in on all the information gathered. We are curious about the interesting community takes and initiatives that might surface as a result from it. 

For your information: 
- The results follow the same order as the survey
- It has a filterable "Table of Contents" to be found in the right sidebar
- Any result is filterable, even survey questions with qualitative answers
- There are quick filters in the left sidebar to change segments easily

It is important to us that not only we can derive conclusions, and instead we would much rather see an active discussion pop-up from it to collectively discuss conclusions coming from a diverse set of perspectives. 

<div class="doc-callout">
    Dive into the survey results on this page: <a href="https://nodered.org/community-survey">Node-RED Community Survey</a>. We invite you to share your thoughts in this <a href="https://discourse.nodered.org/t/modernization-survey-results-now-available/99830">blogpost</a>.
</div>

### Gratitude and staying in contact

We want to thank everyone that contributed to the survey. We think the amount of input we have received was simply astonishing and of great value.

Alongside the [forum](https://discourse.nodered.org/) and [GitHub](https://github.com/node-red), the community survey invited participants to share their contact information so we can reach out more directly in the future when we want to gather feedback from particular groups of the community. This will be an invaluable resource for the continued development of the project. 

<div class="doc-callout">
    If you'd like to join this group, you can join the over-200 people who have already signed up [here](https://tally.so/r/7RXl0L).
</div>

You can see here how the user segments signed up originally with the survey:

<img src="/blog/content/images/2025/12/Contact-&-Follow-up-Preferences.jpeg" style="margin-left:-1.5%;">

---

Thank you for your support and engagement. We are looking forward to improving Node-RED together.
