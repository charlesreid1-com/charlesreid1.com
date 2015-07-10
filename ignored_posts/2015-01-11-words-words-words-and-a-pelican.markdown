---
layout: post
title: Words Words Words. And a Pelican.
date: 2015-01-11 23:19:55 -0800
comments: true
categories: [etymology, pelican, python, programming, language, projects]
---

My most recent project has led me down the 
rabbit hole of language processing. Specifically,
the project invovles parsing words in a block of 
website text, and tagging the resulting text
with the etymological root language of each word.

The project is complicated to explain, since there
are multiple moving parts. But that's not what this 
blog post is about.

You see, as part of my tinking on that project, 
I was led to think more deeply about how to create
a web site with static content, that would use 
Github Pages to host the final product of the 
marked-up HTML.

While Jekyll is a nice turnkey solution for 
Ruby enthusiasts, and I use Jekyll right here on 
this Octopress blog (Octopress is a flavor of 
Jekyll), I'm not very happy with it because I 
don't understand Ruby. All of this makes my ability
to keep the blogging and publishing process working
very preciarious. When things break, I generally go
straight to Google.

But I had heard a few people mention Pelican. 
Pelican is basically a Python equivalent to 
Jekyll - it even has an Octopress theme! - 
and Pelican itself is a small and easy to 
understand library that generally doesn't need 
to be hacked to make it work for you.

The site structure, content layout, and workflow
are all similar to Jekyll and Octopress. I have
all of my content in the ```content``` directory,
and I have all of my pages in the ```content/pages``` 
directory. Pelican can interpret Markdown or raw HTML 
files, and turn them into formatted, templated pages
(it extracts metadata from the raw HTML files, then 
shoves everything in the ```<body></body>``` tags 
into the template.

Pelican is also easy to theme, which is where you get 
to the real meat of a static web content system like
Pelican. You can use Jinja in HTML templates, and 
add aribtrary variables to your Markdown and HTML 
metadata that can be used with Jinja to construct 
conditionals. This allows you to easily style pages,
make a variety of layouts, and really customize 
your page.

Here, you can see the final page resulting from
all of Pelican's assembly:

{% img /assets/WWWPelican.png The Pelican site for the Words Words Words project. %}

The page was pretty easy to put together. 
The main CSS style is [Twitter Bootstrap](//getbootstrap.com),
in a custom color style called [Darkly](http://bootswatch.com/darkly/).

The jumbotron at the top is a static header,
the main text of the body ("What does it do?" "How does it work?") 
is all written in Markdown.

The tagged books sidebar is another chunk of 
static HTML that I have coded up by hand.







