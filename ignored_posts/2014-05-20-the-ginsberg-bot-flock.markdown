---
layout: post
title: The Ginsberg Bot Flock
date: 2014-05-20 00:45:34 -0700
comments: true
categories: [twitter, python, programming, allen ginsberg, twitterbots]
---

Ladies and gentlemen, I am pleased to introduce to you: [The Ginsberg Bot Flock](http://charlesreid1.github.io/imaginary-friends/#ginsberg).

You can visit the Ginsberg Bot Flock on Twitter by [visiting the Ginsberg Bot Flock Twitter List](http://twitter.com/charlesreid1/lists/GinsbergBotFlock)

## What is a bot? And what is a bot flock?

A "bot" is a collection of code that runs on a machine. In particular, Twitterbots are scripts that people write 
to automatically tweet things. For example, [@denverclocktower](http://twitter.com/denverclocktower) tweets once 
an hour, with the word "DONG" repeated once for each hour - a transcription of the real clock tower.

A bot flock is a collection of such "bots" - in this case, a single script controls multiple bots, instead of
a single bot. This requires giving a single script the ability to masquerade as multiple users.

And of course, this requires authentication using OAuth and interfacing with the Twitter API to make some calls.

<!-- more -->

## How does it work?

The bot flock is implemented entirely in Python, using [bear's python-twitter library](https://github.com/bear/python-twitter)
from Github for interfacing with the Twitter API and using 
[simplegeo's python-oauth2 repository](https://github.com/simplegeo/python-oauth2) for OAuth authentication with Twitter.

I am going to write a blog post covering the OAuth concept, first the basics (single-user authentication) 
then the advanced (mulit-user authentication). I'll explain how this works from the standpoint of 
the developer/app writer, and how it works from the standpoint of the end user.

It also took quite a bit of effort to hash out the details of Twitter's API, since the Twitter API documentation 
is about as helpful as a Soviet Army technical manual for using a mortar. I will cover some of the major 
sticking points and post some examples of how I got my bot flock working in another, separate blog post.

