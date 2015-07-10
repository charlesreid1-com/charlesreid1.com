---
layout: post
title: OAuth from Python to Build a Twitter Bot Flock: Part 1: The Concept
date: 2014-05-21 11:41:29 -0700
comments: true
categories: [python, programming, oauth, three legged authentication, twitter, twitterbots]
---

_This is Part 1 of a 3-part series of articles on using OAuth from Python.
It describes the code behind the [Ginsberg Bot Flock](https://twitter.com/charlesreid1/lists/ginsbergbotflock),
all of which is available from my [imaginary-friends repository](https://github.com/charlesreid1/imaginary-friends/) 
on Github_

> Toward the Key in the window--and the great Key lays its head of light
>    on top of Manhattan, and over the floor, and lays down on the
>    sidewalk--in a single vast beam, moving, as I walk down First toward
>    the Yiddish Theater--and the place of poverty 
>    you knew, and I know 
> - Allen Ginsberg, "Kaddish"

In case you haven't heard, the [Ginsberg Bot Flock](http://charlesreid1.github.io/imaginary-friends/#ginsberg)
is finished and [tweeting away on Twitter](http://twitter.com/charlesreid1/lists/ginsbergbotflock).

This post explains how to use OAuth from Python to interface with the
Twitter API Version 1.1. 

While most articles and exmaples on this topic 
focus on *single-user* OAuth authentication,
this will focus on *multi-user* authentication -
which is necessary to control a _flock_ of bots
rather than a _single_ bot.

<!-- more -->

## Bot Flock 101: How It Works

The Ginsberg Bot Flock is, in essence, [a humble Python script](http://github.com/charlesreid1/imaginary-friends)
running on a server somewhere. It consists of multiple instances of a Twitter API interface,
which each bot can call to do things like create and delete tweets, change profile pictures 
or biographical information, and so on.

The Python script makes calls to the Twitter API, specifically, makes calls 
to create Tweets. Each bot decides what they are going to tweet (in this case,
each bot owns their own poem, so they each decide what line from the poem 
they are going to tweet.)

## Twitterbot Flocks 101: How to Make Them 

### Create your Twitterbot Account(s)

Obviously, before you get started on all this, you'll need to create a Twitter account
for your Twitterbots. I'll assume you have done this.

### How to Create a Twitter API Instance 

There are lots of tutorials out there for creating Twitter robots and preparing to 
interface with Twitter's API. I'll give a whirlwind version for the sake of brevity,
but if you have trouble following it, there are plenty of other resouces out there.

First, you are going to create a Twitter application - meaning, some piece of code 
taht interfaces with Twitter to do things. 

Go to [dev.twitter.com](http://dev.twitter.com) and sign in. 

In the upper right-hand corner, you'll see a menu where you can manage your applications
(and create new ones). We will create a new one. Fill out all the necessary information
about your app (don't worry about the "Callback URL" field for now). 

Once you've created your app, you will need to change the app's permissions from "read"
to "read write". 

This is actually the slowest step, because it will require you to 
verify your account by associating it with a telephone number. It can take up to an hour
between the time Twitter texts you confirmation/receives your confirmation, and the 
time when your phone number shows up as verified.

But what, exactly, does "read" versus "read-write" mean? 

### Twitter API Permissions

Let's talk about permissions. 

You are going to be writing computer code that can interface with Twitter. 
Back in the old days of Twitter API Version 1.0, you could just 
hack together a script that asked Twitter's servers for information. 
Twitter's servers would respond, regardless of who you were. 

But Twitter doesn't want just any old computer to be able to bombard it with requests.
When Twitter rolled out the Twitter API Version 1.1, it changed the game.
Now you have to interface with Twitter's API _on behalf of a particular user_.

This means that if you ask Twitter for 5 random tweets with the hashtag ```#NYC```,
Twitter won't return those tweets until it knows who you are. 
Your app is required to make requests on behalf of a particular user.

This is why, when you want to use a Twitter app, it always asks you for 
permission. The app basically masquerades as you, and makes calls to the 
Twitter API on your behalf. 

Now we can return to the question of what "read" and "read write" mean.

"Read" permissions means that when a user gives the app permission to 
access their account, they are only giving the app permission to read 
information - the app cannot change any information abou the account, 
and cannot post any new tweets on behalf of the user.

(Read permissions would be useful if you were writing, say, a Twitter 
analytics app that gathered information about a particular account.)

"Read write" permissions means that the app has the ability to access
information about the account, but also change information about the account.
This includes modifying profile information, posting tweets, deleting tweets,
following people, etc.

### The Keys

Once this has been done, the next piece of information you'll need are your keys.

From the application's page (still at dev.twitter.com), click the "API Keys" tab.
This page will list a couple of keys.

But what are these "public" and "private" keys?

#### The Cryptography of Keys

The keys you see are actually for key-exchange cryptography. 
And these kinds of cryptographic keys come in pairs - 
a public key, and a private key.  

Let's suppose that Pee Wee Herman is trying to send a message to Large Marge
over the (public) CB radio, telling Large Marge to meet him by the big dinosaur. 
But Pee Wee doesn't want Andy to overhear and meet him at the big dinosaur 
to beat him up. (Note: if you have no idea what I'm talking about,
[you have some movie-watching do](https://www.youtube.com/watch?v=ZrzqBwuxHV8)

Pee Wee needs a way to send private messages to Large Marge, over a public
channel, *without telling Large Marge the encryption key over the public CB radio
channel*.

Pee Wee can use key-exchange cryptography to communicate with Large Marge. 
This requires that Pee Wee and Large Marge both have two keys: one private,
and one public. Pee Wee combines his private key with Large Marge's public key,
and uses both to encrypt his message. Then, Large Marge uses her private key 
with Pee Wee's public key to decrypt the message.

The reason this works is that mathematically, these two operations - 
these two key combinations - cancel each other out.

(If you're still wondering *why*, it has to do with the fact that 
the encryption/decryption process performs modular arithmetic over fields
of enormous and hard-to-factor numbers. Hence the immense interest that
mathematicians and security professions have in prime numbers, which can 
be used to create hard-to-factor numbers, and in extremely fast 
factorization of big numbers.)

### App Keys (Consumer Token)

You are the owner of your application. It is important that other people
can't build apps that look exactly like yours, and then pretend to be you,
and then do malicious things with your app. So apps, like Twitter users, 
need to be authenticated by Twitter.

The app keys are your app's pair of public and private keys. Anyone with your 
app's private key can write a different, malicious app and masquerade as you,
so the private key should be kept private. Duh.

"API Key" is your app's public key.

"API Secret" is your app's private key.

### User Keys (Access Token)

The other piece of your app, of course, is the user.
Once you've established with Twitter that you are who you say you are,
that's all well and good - but you still need to establish
that the user on whose behalf your app is acting has, in fact,
given you permission to masquerade as them.

If you own the account on whose behalf you are tweeting,
well, that's really convenient. You don't have to worry about
some stranger who wrote an app getting their hands on your 
private key (that sounds dirty).

But in general, the author of the app won't be the owner of the account.
So what to do?

### Where OAuth Sessions Come In

Enter OAuth Sessions.

You can create an OAuth session, which will give you a temporary key
with which to access an account that has given your app permissions.

Creating an OAuth session is actually a two-step process: the first
step is a request step, where you ask the user to give your app
permission. The second step, after you obtain permission from
the user, is to obtain a temporary key from Twitter 
that will allow you to temporarily access that user's account.

The OAuth session starts when the user elects to give your app
permission to access their account.
The OAuth session ends when your app deletes the session,
or when the user revokes permission.

This whole mess of authentication is also called "three-legged authentication" - 
one leg is Twitter, one leg is your app, and one leg is the user.

### The Final Piece: API Calls

Once you've gotten your app private and public keys, and your consumer 
private and public keys, you will have all the information that the Twitter API
requires to make calls.

At that point you can do whatever you want. Go nuts!






