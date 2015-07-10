---
layout: post
title: Debugging Errors with Pelican
date: 2015-01-14 19:11:16 -0800
comments: true
categories: [pelican, python, programming, debugging, projects]
---

If you are using Pelican to build your site and Pelican is getting errors when building a site, 
when you're either using a template, or a plugin, or processing markdown,
[there is a Pelican "debug" option](https://github.com/getpelican/pelican/issues/1210) 
to print out a verbose description of what it is
doing, as well as an error traceback. Just run:

```
$ pelican -D
```

or 

```
$ pelican -D content
```

By the way, this option isn't mentioned in Pelican's documentation, at least no documentation that I read,
but it and other command line options can be found by running ```pelican --help```.

