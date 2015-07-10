---
layout: post
title: Watergate Twitterbot 101
date: 2014-05-07 14:19:36 -0700
comments: true
categories: [twitter, twitterbots, python, programming, watergate]
---

Alright, now look here, we're gonna walk through <a href="//github.io/charlesreid1/watergate">the source code of this 
Watergate Twitterbot</a>, and we're gonna do this thing whether you like it or not. 

<img 
class="img-circle"
width="250px"
height="250px"
src="/assets/RichardNixon.jpg">

## What's the Watergate Twitterbot?

Holy smokes, kid, you haven't heard of the Watergate Twitterbot?

Lemme tell ya about it.

Watergate is a big political scandal where - aww hell, just 
read <a href="http://en.wikipedia.org/wiki/Watergate">the Wikipedia article on Watergate</a>
already, will ya? Alright, you all done reading it? Good.

Now, one of the key reasons Richard Nixon was forced to resign
were the White House tapes that he was forced by Congress to 
transcribe and turn over.

To this day, tapes are still being declassified and released.
This is a rich primary text source for language, words, and 
dialogue about shady acts between shady characters,
and is ripe for a machine learning and automatic text 
generation project.

That's where <a href="//github.io/charlesreid1/watergate">the Watergate Twitterbot source code</a> 
steps in. 

<!-- more -->

## The Watergate Twitterbot Source Code

### How It Works

This source code processes the text of multiple 
White House tape transcripts, parses it, and feeds it to a 
natural language machine learning algorithm that can 
automatically generate text. 

For more information, visit the <a href="http://github.io/leonardr/olipy">Olipy library</a>.

### Code Layout

The source code consists of four parts:

1. Primary texts - the raw material (PDF and text files) from which text will be extracted.
2. Scraping - scripts for scraping HTML websites to gather primary texts.
3. Extract JSON - scripts to extract and process the text, parse it, and turn it into a more structured JSON format.
4. Olipy - feed extracted text to Olipy library to teach the bot how to talk.

### Part 1: Primary Texts

The primary texts currently come from PDF files on two sites:

* [http://nixon.archives.gov/forresearchers/find/tapes/watergate/trial/transcripts.php](http://nixon.archives.gov/forresearchers/find/tapes/watergate/trial/transcripts.php)

* [http://nixon.archives.gov/forresearchers/find/tapes/watergate/wspf/transcripts.php](http://nixon.archives.gov/forresearchers/find/tapes/watergate/wspf/transcripts.php)

There are a number of other sites on the web that could
potentially have resources, but these two sites are the two
that I'm focusing on right now.

### Part 2: Scraping

The scraping scripts visit the above National Archives pages
and look for PDF files. When PDF files are found, they're
downloaded.

### Part 3: Extract JSON

This is where all the magic happens. 

First, the PDF files are turned into text.

Next, that text is parsed by a script that looks for
the names of participants in the conversation,
tokenizes the coversation into who said what,
and turns those tokens into JSON.

NOTE: I am currently working through the implementation
of Part 3. This should be done soon.

### Part 4: Olipy

This is the part where we feed the conversation data
in JSON forat to Olipy and create the brain of our
Twitterbot.


