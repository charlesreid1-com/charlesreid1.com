---
layout: post
title: Batting Stats and Empirical Models
date: 2014-09-14 01:34:35 -0700
published: false
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

In my previous three-part post, I attempted to answer the question: 
are batting stats worthless?



Derived stats.

This is the idea that, rather than using hits, or singles, or home runs, 
as the independent variable in a regression, why not *combine* these statistics
to create more useful aggregated statistical quantities?

This is not a new idea - quantities like on-base percentage, weighted on-base average,
or WHIP (these and more stats defined over at the [FanGraphs](http://www.fangraphs.com/library/offense/) page)
combine stats into a derived quantity. 

[Slugging percentage](http://en.wikipedia.org/wiki/Slugging_percentage) is an example 
of a derived statistic; slugging percentage is calculated according to the formula:

$$
\text{Slg%%} = \dfrac{\text{1B} + 2*\text{2B} + 3*\text{3B} + 4*\text{HR}}{\text{AB}}
$$

This uses some of the "primary statistics" like number of singles or number of at bats,
and combines them in a linear model.

Notice that the use of the word "model" here is deliberate: 
slugging percentage and other derived statistics are models 
in the sense of "models" as predictive quantities.



















