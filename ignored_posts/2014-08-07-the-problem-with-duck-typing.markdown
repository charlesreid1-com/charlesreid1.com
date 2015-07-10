---
layout: post
title: Duck Typing is a Bunch of Quack
date: 2014-08-07 07:13:56 -0700
comments: true
categories: Python C++ ducktyping programming 
---

Over the course of the past year, I've been using Python almost exclusively,
for both work and personal projects. When I have new problems to approach,
my tactic is usually to see, first, if Python has the capability to do whatever
it is that I need done. If Python can't do it, it can't do it, and I'll switch
to the right tool for the job. But so far, Python has been capable of handling
just about every problem I've thrown at it. (There has been one exception, 
but it was actually not due to Python, but due to a license limitation 
that prevented the use of external scripts from interacting with a database.)

I set the bar high: my projects deal with a diverse range of computational and data 
problems. I require a language that can run on a lot of different hardware, 
interact with the various commercial software programs, and behave similarly
across operating systems.

Compared with where I came from (C++), Python has been a dream. (See my 
[previous post on this topic](http://charlesreid1.github.io/blog/2014/04/10/the-ghost-of-c-plus-plus-past/)).
Now, keep in mind, I'm a chemical engineer, and not a computer scientist, so I haven't
studied computer languages from an academic perspective - only from an end-user perspective.
But in my opinion, Python and C++ are largely similar: I was able to transfer much of my
coding experience and best practices from C++ directly to Python. 

<!-- more -->

(Contrast this with languages I consider dissimilar, such as Perl or Javascript; 
my experiences with these languages has been that I spend most of my time 
just trying to figure out how to structure my code. Not that different is a bad thing, 
it's just... different.) 

## Python, C++, and Duck Typing

But one huge difference between Python and C++ is [duck typing](http://en.wikipedia.org/wiki/Duck_typing). 
The "duck" here refers to the saying, "If it looks like a duck, if it walks like a duck, 
if it quacks like a duck, it is probably a duck." Applying this to computer code,
it means that code should not focus on the object type (i.e., "Can I classify this animal as a duck?"), 
but rather, should focus on object attributes and methods (i.e., "Does it quack?"). 

Duck typing helps you escape from one of the most tedious aspects of C++, which is that 
you have to be very meticulous about function definitions, declaring the type of each
object that is operated on. If you want to define a C++ function that will operate 
on multiple primitive types, you must define one function for each primitive type.
In Python, you don't. Not that big a deal, right?

The tediousness and restrictions set in when you move beyond primitive types. 
When you are defining methods that take your own objects, or objects from libraries, 
as arguments, the number of potential methods you have to define begins to balloon.
Even if two objects implement the same method, and the functions for those two 
object types look the exact same, they must be defined separately.

## Inheritance, Templating, and C++ Duck Typing

But not to worry! This problem can be resolved in C++ using object inheritance: we can define a method for a 
base class, and then we can pass in any child class and it will have the same methods defined
(even if the methods are implemented differently for the child classes.)
This is limited duck typing: "My father was a duck, therefore I am a duck." 

It sounds great - in theory. But as before, when our code gets more complex, and we have
complicated inheritance schemes (e.g., I want child type X to extend methods of 
parent type A and parent type B, but I want it to extend all methods of A, and only
certain methods of B, and I have another child type Y that should extend 
type A and type C), keeping track of the logic of C++ inheritance turns into a nightmare.
(How do I override the parent method entirely? How do I add to the parent method? 
What if both parent types have the same function defined? What is the default behavior?)
At one point during my grad school days of coding in C++, I had a C++ program of about 300 lines 
that was specifically for testing inheritance schemes to understand what the default
behavior was and how to override these behaviors. I referenced it often.)

If things get really complicated, don't worry: C++ has yet another solution: templating!
Duck typing in C++ is possible with C++ templates, which operate on generic types.
In theory, it will all work out great!

Except... have you tried to debug a C++ program that uses templating? 
You aren't actually debugging during ''execution'' - you're debugging during ''compilation''.
This is like hostage negotiation, where your compiler is a hostage-taker 
who is spewing a stream of insane and incomprehensible demands, 
and whose motives and psychological makeup are unknown, and you are the 
negotiator, trying to figure out how to get everyone to stand down
and return to business as usual. If you can get your templated code 
past the compilation phase, you're pretty much good to go. But good luck getting to that point.

## Const

Oh yeah. I didn't even mention const. Don't get me started on the use of const in C++ programs,
or someone is going to lose an eye.

## Why Duck Typing is a Bunch of Quack

I've just mentioned a lot of reasons why duck typing is great. 
But duck typing is (depending on your environment) simultaneously not so great.
Allow me to explain.

My development environment involves writing a lot of prototype code to do a lot of different things.
I write computational physics codes to simulate chemical kinetics in large reactors,
I write web servers to create RESTful APIs to control hardware,
I create instrument communication networks so that two computers connected to different 
instruments can share data with a single data agglomeration and processing script,
and I do statistics calculations for experimental design and data analysis.

I don't work with a team of 20 other developers on a single complex code base or on a framework,
I don't write libraries that will be used by ten thousand developers,
and I don't write code that requires 100% uptime and stability.

For these purposes, duck typing is great. I can be sloppy, I can be lazy,
and I can change my code rapidly without getting bogged down in 
inheritance diagrams, template debugging, and other time-consuming messes.

BUT.

I've been expanding my understanding of the software engineering
universe, and coming to a deeper understanding of how my software development role 
in a chemical technology startup firm is, in essence, completely orthogonal to 
the role of a software engineer at a tech startup making web apps or the like.

In those environments, writing stable, bomb-proof code is simply a way of life.
Software engineers in software companies building internet infrastructure or 
social networks ''must'' deal with corner cases, because they are writing 
applications that will be used by millions of people, 24/7. 
People will throw everything imaginable (and many more unimaginable things) 
at it, so it must be robust enough to handle all of that.

After spending almost a decade writing research or protoype codes intended for 
use by a small (3 or fewer) user base for research applications, I've learned to throw caution
to the wind, because more often than not, "the user" and "the developer" are synonyms.
Why bother dealing with corner cases that the user might pass in,
when the user is also the developer who can add in a hotfix?

## The Way

The problem with duck typing, then, is that it lulls you into complacency.
Don't sweat the details, says duck typing; just focus on implementing that 
new feature, or swapping out old code chunks with new code chunks. 
Is this ''really'' a problem? No.

Unless, of course, you spend most of your time developing for developers,
and suddenly you find yourself faced with the obstacle of writing bombproof,
stable code and needing to find corner cases. 

Then duck typing will ham-string you.

