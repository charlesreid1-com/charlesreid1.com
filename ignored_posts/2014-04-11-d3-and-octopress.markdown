---
layout: post
title: D3 and Octopress
date: 2014-04-11 21:41:36 -0700
comments: true
categories: [octopress, github, D3, javascript, iframe]
---

My first shot at embedding D3 into Octopress

I am using the [Octo-iframe](https://github.com/anchetaWern/octo-iframe) library
from Github user [anchetaWern](https://github.com/anchetaWern/).

It's a bit buggy, but here we go, this code ```{ % iframe cmd http://charlesmartinreid.com/d3/examples/parallel/parallel.html 650 500 % }``` will 
(assuming you eliminate the space betwen ```{ %``` in your markdown) produce this iframe

{% iframe cmd http://charlesmartinreid.com/d3/examples/parallel/parallel.html 650 500 %}


