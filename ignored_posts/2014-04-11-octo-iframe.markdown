---
layout: post
title: Octo-iframe with showterm
date: 2014-04-11 21:30:52 -0700
comments: true
categories: [octopress, iframe, blog, javascript, d3]
---

This here is an example of a showterm embedded into an Octopress post
via an iframe

Good features:

* It works!

* Enables D3 + Octopress

Bugs:

* You can't end the line before the iframe tag with a colon, or else the 
  browser syntax parser will choke on the iframe tag

* No text after the iframe tag will show up

{% iframe cmd http://showterm.io/67772b674551d4a236e0a 640 480 %}

