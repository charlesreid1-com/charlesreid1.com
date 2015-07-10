---
layout: post
title: Using Python to Crack the Etymology of Dubliners
date: 2015-01-17 19:10:29 -0800
comments: true
categories: [python, etymology, language, html, beautifulsoup, web scraping, mechanize, pelican]
---

The short story collection <u>Dubliners</u> by Irish author James Joyce
has always been special to me. When I was a freshman in high school, 
my English teacher, Dr. Miller - Doctor Mike - assigned us <u>Dubliners</u>
as our required reading. Joyce can be bewildering to graduate students,
let alone a high school freshman, so needless to say, it was over my head.
But the stories were seared into my memory, and I have returned to them
again and again throughout my life. My changing understanding of each story
is a reflection of the evolution of my perspective.

I was inspired by [this post from the Ideas Illustrated blog](http://ideasillustrated.com/blog/2012/04/01/visualizing-english-word-origins/),
referenced in [a post on the Johnson (language) blog in the Economist](http://www.economist.com/blogs/johnson/2012/05/etymology),
to try my hand at tagging word etymology in the same way. 
My aim was to apply the technique to an entire book - 
or rather, to a set of short stories.

My aim was to tag the word etymologies of James Joyce's <u>Dubliners</u>.

I set to work, and created code and a web page for the 
[Words Words Words](https://github.com/charlesreid1/wordswordswords) 
project on GitHub. Here's a description of the project from its web page:
    
Words Words Words uses a couple of Python libraries to do its primary tasks: 
parse text, look up words on a web page, extract and process the result, 
and convert the original text into HTML, color-coding each word in the 
process with its etymological root language.

* To parse the text and extract unique words, I'm using the [Natural Language Toolkit](http://www.nltk.org).
* To scrape the web, I'm using [Mechanize](http://wwwsearch.sourceforge.net/mechanize/).
* To obtain etymological root languages for words, I'm using the [Online Etymology Dictionary](http://www.etymonline.com).
* To process the resulting HTML, I'm using [Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/bs4/doc/).
* To deal with all the data resulting from these tasks, I'm using [Pandas](http://pandas.pydata.org/).
* To tag each word, I'm just using Python's built-in ```list``` and ```string``` types.
* To pull all of the tagged HTML, CSS stylesheets, and JS together, I'm using [Pelican](http://blog.getpelican.com/) 
  (my preferred Python alternative to Ruby's Jekyll)

The result is something like what you see at the [header of the landing page](http://charlesreid1.github.io/wordswordswords/).
Python is used to tag words with root languages using the Online Etymology Dictionary. 
Each of Joyce's short stories are tagged in this way, and each story is on its own page. 
Here is the [table of contents for the tagged version of Dubliners](http://charlesreid1.github.io/wordswordswords/dubliners.html).

Right away it's clear that the dominant language in Joyce's writing is French - 
the entire text is awash in purple words. And unlike the smatterings of green 
German words or pale yellow English words, the French words are not commonly-recurring
articles or prepositions; they are the more complex words, like "priesthood" and "chalice,"
"scrupulous" and "mercy," containing the intellectual meat of the story.

There's also a steady smattering of Old Norse ("<span class="oldnorse">kitchen</span>," "<span class="oldnorse">hand</span>," "<span class="oldnorse">door</span>," "<span class="oldnorse">road</span>"), 
as well as the occasional word reaching 
way back in time to recall Old French roots, like "<span class="oldfrench">bazaar</span>." 

Somewhat surprisingly (to me, anyway) was the infrequency of <span class="latin">Latin</span> 
and <span class="greek">Greek</span> words.
I suppose that tagging text about Stephen Dedalus might dip more heavily into those
(<u>Ulysses</u> is on the list of books to tag next), but in <u>Dubliners</u> 
at least, words with Latin and Greek roots are somewhat rare.

Even Sanksrit shows up in <u>Dubliners</u>: in the roots of the word "<span class="sanskrit">tobacco</span>."
