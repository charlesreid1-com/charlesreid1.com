---
layout: post
title: New Pojects
date: 2014-04-08 18:38:21 -0700
comments: true
categories: [chemical engineering, projects, pantera, github]
---

This post is a rundown of some of the new projects I've gotten started lately.


## Technical (Chemical Engineering) Projects

### Pantera

At work, I use the [Cantera library](http://code.google.com/p/cantera) for doing calculations related to thermochemistry and
chemical kinetics. While the Cantera library is a good starting point, its real power comes
through extending its types and abstracting increasingly sophisticated tasks.

Pantera is a Python library for extending Cantera. It provides a set of classes for handling
more sophisticated reactors for piston-cylinder problems, calculating heat duties, and
creating reactors for packed catalyst beds or for simulating autoignition. 

The whole idea behind Pantera is to make Cantera more useful for engineering calculations.

[Find the Pantera code over at GitHub](http://www.github.com/charlesreid1/pantera)

### The Cantera Book

In conjunction with my development of the Pantera library, I am also
undertaking witing a Cantera "book," consisting of a set of iPython 
notebooks.

This book covers a couple of things:

* Cantera Core Library - its parts, how it works, what it can do

* Cantera for Python - ways of using object-oriented programming concepts 
  and Python libraries to extend/do amazing things with Cantera

* Cantera for Engineering Calculations - some hands-on engineering 
  calculations, and illustrations of how to apply Cantera to solve them

The book is already underway over at the 
[Cantera page on the CMR wiki](http://www.charlesmartinreid.com/wiki/CanteraOutline).

[Find the code for the Cantera book and its notebooks on GitHub](http://www.github.com/charlesreid1/cantera-book)



## Non-Technical Projects

### Octopress via GitHub

A good blogging platform is hard to find.

I've been iterating on a few, and stayed with Wordpress because I was largely happy with it.
However, I was looking for GitHub integration for some websites for projects, 
so I recently decided to give [Octopress](http://octopress.org/) (which uses [Jekyll](http://jekyllrb.com/) 
and [Ruby](https://www.ruby-lang.org/en/) under the hood) 
a try.

#### Why I Like Wordpress

I'm a fan of Wordpress, which I 
[already use for the CMR blog on my website](http://www.charlesmartinreid.com/wordpress).

I like it for a couple of reasons:

* Ubiquity - lots and lots and lots of people use Wordpress. If I have permissions problems,
  or if I want to understand how some piece of the Wordpress engine works, a solution is always
  close at hand.

* User Interface - the UI for Wordpress is very easy to use, as well as sophisticated.

* PHP - I love PHP, and use it on my site. My Wordpress skin/theme can be hacked so that 
  I can use my own header/footer, navbar, and style sheets, all written in PHP, and it is
  integrated directly with Wordpress.

#### What I Don't Like About Wordpress

Problems with Wordpress are limited, and not particularly serious. They include:

* Difficult, though possible, to post stuff with computer code.

* <s>No version control capabilities.</s> (Scratch that - most recent version of Wordpress now has version control capabilities.)

* No capability to edit/write in a native plain text editor (like vim or emacs) and push to Wordpress, unless you copy-and-paste.

* Page content is not static and is server-side (PHP), meaning lots of page requests can swamp the server.

The main advantage of Octopress over Wordpress is the ability to integrate
the site with GitHub and keep version control over the static pages.

I don't plan to abandon Wordpress, but I do plan to keep my Wordpress blog limited to
quotes, photos, reading fragments, essays, and other photography- and writing-specific posts,
and use this OctoPress for technical/code-related posts.

#### Why Octopress

I like Octopress because it uses GitHub-flavored Markdown, which is a markup language
that I've been using at work. It's also got some really nice, really easy templates that
are ready-to-go.



### Watergate Twitterbot

One of the most fascinating aspects of the whole Watergate scandal was the
contents of the White House Tapes. These tapes contained recordings made in
the offices, plane, and vacation homes of the President. They provide an
unfiltered view of President Nixon.

The Watergate Twitterbot is a project intended to hook up the transcripts
of the Watergate tapes with a text generation library in Python to make
fake Watergate tape dialogue, and post that to a twitter account.

This is similar in spirit to the [Apollo 11 Space Junk](http://www.twitter.com/apollo11junk)
twitterbot, which is another twitterbot that I made (see the
[CMR wiki page on Apollo 11 Space Junk](http://www.charlesmartinreid.com/wiki/Apollo11Junk).

[Find the code for the Watergate Twitterbot at GitHub](http://www.github.com/charlesreid1/watergate)



### Time-lapse Imagery

Okay, I'll admit it. I am addicted to Netflix's TV show, House of Cards.  

One of the reasons I find it so difficult to stop watching an episode of House of Cards 
once it starts is because of its mesmerizing opening sequence, which consists of a series
of time-lapse images of Washington, D.C. It is impossible to look away from the screen
while it is playing.

The sequence got me interested in making my own time-lapse photos. Accordingly, I've
begun to accumulate the necessary expertise and equipment to create time-lapse photos.

[Find my time-lapse image videos over at Vimeo](http://www.charlesmartinreid.com/vimeo)

