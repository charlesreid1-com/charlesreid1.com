---
layout: post
title: The Ghost of C++ Past
date: 2014-04-10 13:25:39 -0700
comments: true
categories: [C++, Python, programming, duck typing]
---

In graduate school, my dissertation work focused on a program called Arches,
a reacting flow and combustion code, written as a component in a C++ framework
called Uintah, which was designed for running massively parallel simulations 
on supercomputers.

The complexity of what the Uintah computational framework was trying to do,
coupled with a young research professor in our group who was gung-ho about
using some of the more advanced features of C++ (like templating), meant 
I was forced to become familiar - VERY familiar - with the inner workings of C++.

I managed to escape the graviational pull of C++ (for a while there, I was afraid 
I would end up programming in C++ for the rest of my days - AAAAAAAAAAHH!!!!) 
and when I changed to a new job, I also changed to a new programming language - Python.

I look back with fondness on my C++ days. It's a bit twisted - like reminiscing 
about an ex-girlfriend who I know made me miserable, but somehow doesn't seem 
so bad in hindsight because my mind has been actively scrubbing negative memories
associated with her. 

What, in paticular, do I miss about C++? Mainly what made it such a pain in the
ass to program in C++: you can (actually, you have to) be very specific with your
syntax, how you pass arguments, what you change, what you declare, and so on.
You have to manage you memory yourself - are you passing an object as a reference? 
a pointer? a copy? Who has permission to change the object? How is the work 
divided up? How is the data distributed in memory?

Pogramming in C++ is like living with an extemely safety-conscious helicopter parent. You learn to 
loathe the inefficiency of creating code from scratch, because implementing even simple programs
or incorporating simple changes can take a really long time and require a lot of
effort to get going (due mainly to the helicopter parent effect of the C++ compiler... 
"Hey! You implicitly cast that type! Let me dump out ten thousand warning messages!"). 
But once you leave it, you realize that it created a 
safety net. Sure, you don't have to deal with the 
gory details of memory management -
but sometimes you need to.
Sure, you can use duck typing and throw caution to the wind -
until you accidentally pass in a goose, raise an uncaught exception,
and crash your up-until-just-a-second-ago bombproof, polished production code.

This is not to say that Python is not capable of any of these things. 
It can, it is, and if I were interested in spending the time to learn
those features of Python, I'm sure it would do it with flying colors.
(To those who say Python can do anything, I wholeheartedly agree:
Python can even be a helicopter parent.)
But I find it interesting the way that the grueling task of programming in a 
syntax-heavy lanuage like C++ can, in retrospect, seem like a good experience.

As Calvin's dad (and many academic advisors) would say: 
"Write your program in C++. It builds character."

