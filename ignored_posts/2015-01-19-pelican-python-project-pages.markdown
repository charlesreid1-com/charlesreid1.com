---
layout: post
title: Pelican Python Project Pages
date: 2015-01-19 21:11:57 -0800
comments: true
categories: [python, pelican, projects, html, github]
---

## TL; DR

All my project pages use [Pelican](pelican.readthedocs.org), a sweet Python
library for creating/maintaining static pages.

[Apollo 11 Space Junk Bot Flock project page](http://charlesreid1.github.io/apollospacejunk/)

[Milton Bot Flock project page](http://charlesreid1.github.io/milton/)

[Ginsberg Bot Flock project page](http://charlesreid1.github.io/ginsberg/)

## What's Motivating the Latest Pelican Moves

In my free time, I build bots. I've written a couple of other blog posts about 
[Apollo 11 Space Junk](http://charlesreid1.github.io/blog/2015/01/05/apollo11spacejunk/),
the [Paradise Lost bot flock](http://charlesreid1.github.io/blog/2014/09/16/the-paradise-lost-bot-flock/)
(now known as the Milton Bot Flock), and the 
[Ginsberg bot flock](http://charlesreid1.github.io/blog/2014/05/20/the-ginsberg-bot-flock/).
I also wrote three blog posts ([Part 1: The Concept](http://charlesreid1.github.io/blog/2014/05/21/oauth-from-python/),
[Part 2: The Code](http://charlesreid1.github.io/blog/2014/05/22/oauth-from-python2/), and
[Part 3: The Multithreaded Hydra Bot Flock](http://charlesreid1.github.io/blog/2014/05/23/oauth-from-python3/))
that covered all the gory details of getting OAuth to work
for controlling large crowds of bots.

But I quickly realized that this was all getting very complicated,
and not only did I need a landing page for each bot that would describe
what it did and how it worked and gather all of these links in one place,
but I needed to do so in a way that was portable and extendable.

While lots of folks like Ruby, and would use [Jekyll](http://jekyllrb.com/) to manage 
project sites like these, I don't, and I wouldn't. I use Jekyll
to make this Octopress blog, so I am eating that dog food.
Don't.

I'm a Python guy, so I was looking for the Python equivalent of Jekyll.
I found it in [Pelican](pelican.readthedocs.org/en/3.5.0/quickstart.html).

Pelican sets up a similar (though, to me, simpler) directory structure, 
in which you put content (in various formats, mainly markdown). You can 
then edit the pages that wrap that Markdown when it is rendered to HTML
(that's your theme). There are lots of themes available, but I'm a nitpicker,
and wanted some nice pictures on my project pages, so I opted to use [Twitter Bootstrap](http://getbootstrap.com/2.3.2/)
and [Bootswatch's](http://bootswatch.com) [Darkly theme](http://bootswatch.com/darkly/) 
to build my own theme and page structure.

On top of all that, I wanted this to be a static site, but Pelican is 
built to be a blog by default. That's ok - I set the main landing page 
to be a static page (one of my Markdown files), then I never use the 
blog features. I just set up my site to be some static pages (which is
actually just a pile of Markdown files), and voila, a static, non-blog 
page with Pelican.

I started using Pelican because I wanted to be able to hack whatever tool
I was using, as I figured I would inevitably need to.
But Pelican is surprisingly (refreshingly) flexible, and it is very easy 
to make it do what you want. Just about anything but the most complicated
stuff can be accomplished with Pelican or with a Pelican plugin. And writing
a Pelican plugin is really easy, if you know Python. I got one up and running
in about 10 minutes, and doing what I wanted in about 20.

So there ya go. Pelican. It's the answer to all your (static website scripting) 
desires.

## Arranging The Pelican

In each of the three repositories for my three bot flocks, I have the same 
directory structure. There are two directories: one for the bot code, and one for 
the pelican site.

The bot code directory is just a pile of Python objects and scripts.

The pelican directory is a standard Pelican site directory, which I set up 
by running ```pelican-quickstart``` in the directory.

The ```content``` folder contains the Markdown for all of my static pages.
When I tell Pelican to generate the static content, it turns this Markdown 
into HTML.

The ```XYZ-theme``` contains the HTML files and templates for my project page's theme.
This is the content that is applied to all of the pages - the header, the footer,
the top title, the background image, and so on.  Each bot has its own theme, since 
each bot has different pictures and different needs.

Finally, there is a pelican configuration file. This is an important file!

## Pelican Workflow

### Linking Pelican with Github Pages

The first thing you want to do (and you only need to do this once) is to set up 
Pelican to generate the site in your Github Pages repository branch. Each Github project
has a special branch called ```gh-pages```, and any static HTML/CSS/JS in that branch 
will be rendered at the site ```username.github.io/projectname```. 

But before we can use this feature, we have to create the ```gh-pages``` branch. Do this
by creating an orphan branch (i.e., a branch with different content from other branches
and thus unconnected to them):

```bash
#!/bin/sh
git clone http://github.com/username/projectname output
cd output
git checkout --orphan gh-pages
rm -rf *
echo "<h1>Hello world!</h1>" > index.html
git add index.html
git commit index.html -m 'too legit to init commit'
git push origin gh-pages
``` 

Now, when you generate new content in output (which Pelican does by default), it will be 
going into a local copy of your static Github Pages site. When you've created your final
Pelican content, you just have to run git add/git commit/git push to make changes live.

### Testing on Localhost

When I'm happy with my theme and with my content, I first want to test it out on my 
local machine to make sure it looks good.

In my Pelican config file, I need to add the project name to my site url (so it conforms
to the URL scheme above, ```username.github.io/projectname```). I can do this by 
adding the following line to my ```pelicanconf.py```:

```
SITEURL = '/projectname'
```

However, to test changes locally, I don't want the URL prefix, since it will break all my 
links, images, and stylesheet references. So I comment it out to test changes locally:

```
#SITEURL = '/projectname'
```

Now I generate my Pelican content:

```
pelican content
```

and my static site is now in ```output/```. If I run a web server from ```output/```, I can
see the site live at localhost. And Python conveniently has a built-in web server!

```
cd output
python -m SimpleHTTPServer
```

This will serve up the site at http://localhost:8000.

### Pushing Changes to the Live Site

Once you're happy with the changes, re-include the site url line in your config file:

```
SITEURL = '/projectname'
```

and re-create your pelican content:

```
pelican content
```

Now push any new changes in your output directory to the gh-pages branch:

```
cd output
git add *
git commit -a -m 'Adding the latest widget'
git push origin gh-pages
```

## Take-Home

If you like the concept behind Jekyll but Ruby is a complete mystery to you, 
never fear! A better library written in a more sensible language is available 
with Python, through Pelican!

Onward, comrades!

