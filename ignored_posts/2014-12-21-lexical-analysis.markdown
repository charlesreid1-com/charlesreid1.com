---
layout: post
title: Lexical Analysis
date: 2014-12-21 05:15:03 -0800
comments: true
categories: [math, statistics, nltk, linguistics]
---

I keep track of all my reading over at [my wiki](http://charlesreid1.com/wiki/My_Reading_List). 
Some of the books I've been reading lately are on Gutenberg,
and I was interested in doing some lexical analysis to 
throw into the mix of understanding what I'm reading,
and how I read.

I fired up Python and started writing a script using the 
[Natural Language Toolkit (NLTK)](http://www.nltk.org/).

You can load entire files with Gutenberg books into strings
and clean them up using built-in Python functions:

```
filenames=['crimeandpunishment.txt',
           'brotherskaramazov.txt',
           'theidiot.txt']

for filename in filenames:

    with open('data/'+filename) as f:

        bk = f.read()
        bk = bk.replace('\r',' ')
        bk = bk.replace('\n',' ')
```

NLTK lets you turn that huge string into word tokens, 

```
tok = PunktWordTokenizer().tokenize(bk)
```
and that gets you things like the total number of words:

```
ln = len(tok)
print "Length of "+filename+":",ln
```

or total number of unique words:

```
nw = len(set(tok))
print "Num Words "+filename+":",nw
```

One of the first things that occurred to me to look at 
is a measure of the lexical complexity:
the ratio of number of unique words to number of total words.

This is a measure of how much variety the reader is getting 
with the book. I am coming into this with some extensive knowledge
as a reader, and can attest that sentence complexity, 
word density, and the level of writing can vary quite a bit,
and can make 300 pages feel like a breeze or like a trek through
Mordor.

{% img /assets/crimeandpunishment.jpg Word Density, Crime and Punishment. %}

{% img /assets/brotherskaramazov.jpg Word Density, Brothers Karamazov. %}

{% img /assets/theidiot.jpg Word Density, The Idiot. %}

