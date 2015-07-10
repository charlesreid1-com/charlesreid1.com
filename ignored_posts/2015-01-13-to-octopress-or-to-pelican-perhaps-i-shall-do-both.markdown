---
layout: post
title: To Octopress? Or To Pelican? Perhaps I shall do both.
date: 2015-01-13 18:24:00 -0800
comments: true
categories: [github, octopress, pelican, blogging, python, jekyll, ruby]
---

If you've been looking for a simple, command-line based blog 
for generating static content for web pages, you've probably
run across a zoo of libraries: Jekyll, Hyde, Octopress, 
Pelican. 

These libraries all do the same thing: they take a pile of 
marked-up text, chunks of HTML, pieces of code, instructions,
and turn them into static web pages (meaning, stuff that either
loads in a browser, or runs in a browser; nothing is run 
server-side).

But if you dig deper you find there are two paths that diverge:
the Python path, and the Ruby path.

Down the Ruby path is Jekyll, a tool that uses Ruby's
ecosystem of gems, rake files, and other stuff. 
Octopress is a particularly attractive-looking
theme of Jekyll that has a couple of 
goodies thrown in - particular markdown 
syntax, etc.

Being new to Ruby and using Jekyll is a bit confusing,
and programming Ruby is a lot like watching a magic trick, 
then trying to perform it yourself.
When Ruby put on top of another confusing tool like
git, it all creates an impossibly fragile mess of 
stuff that just works... until it doesn't.

It reminds me of how Hunter S. Thompson described
Richard Nixon:

    Nixon, at least, was blessed with a mixture of arrogance
    and stupidity that caused him to blow the boilers almost
    immediately after taking command. By bringing in
    hundreds of thugs, fixers, and fascists to run
    the Government, he was able to crank almost every problem 
    he touched into a mind-bending crisis. 
    
Mind-bending crisis is exactly how every problem in git appears to me, even after using it for 2 years.

In any case, my day-to-day language is Python, and I knew there 
had to be a Pythonic way out of this unfortunate situation.

Pelican is the library I've found that provides a Python tool
equivalent to Jekyll or Octopress. While Hyde is another Python 
library with a pithy name, Pelican (an anagram of ''calepin'', 
French for "notebook") does a superb job.

First, it is portable code, small and easily hackable. 
The Pelican extension functionality means you don't 
even need to hack Pelican itself, you just add your own
code to organize your site the way you want it.
Themes are also a breeze.

I built a template repository called [Cyborg Pelican](https://github.com/charlesreid1/cyborg-pelican)
as a sandbox for testing,
and to create templates for easily creating Pelican sites
for other Github projects. 

But I'm still using good ol' Octopress for my 
main Github page, which is still billed as an 
Octopress blog, after all.

I like Pelican a lot, and eventually I'll switch.
But for now, I'll keep riding two horses.
Or rather, I'll keep riding an octopus and a pelican. 

