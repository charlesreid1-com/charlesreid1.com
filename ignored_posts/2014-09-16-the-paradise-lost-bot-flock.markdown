---
layout: post
title: The Paradise Lost Bot Flock
date: 2014-09-16 12:37:26 -0700
comments: true
categories: [twitter, twitter bots, poetry, Paradise Lost]
---

The Paradise Lost bot flock is a flock of 12 twitterbots, each tweeting 
one book of John Milton's [Paradise Lost](http://www.gutenberg.org/files/26/26.txt) 
in perpetuity.

## A List of Milton Bot Flock Twitterbots

A list of all Milton Bot Flock Twitterbots: 

* [Book 1](//twitter.com/milton_book1)

* [Book 2](//twitter.com/milton_book2)

* [Book 3](//twitter.com/milton_book3)

* [Book 4](//twitter.com/milton_book4)

* [Book 5](//twitter.com/milton_book5)

* [Book 6](//twitter.com/milton_book6)

* [Book 7](//twitter.com/milton_book7)

* [Book 8](//twitter.com/milton_book8)

* [Book 9](//twitter.com/milton_book9)

* [Book 10](//twitter.com/milton_book10)

* [Book 11](//twitter.com/milton_book11)

* [Book 12](//twitter.com/milton_book12)

## The Rundown

Running this bot flock consists of four steps:

* Create accounts

* Create Twitter app 

* One-time setup step (using the Keymaker to create private keys for each bot)

* Run the bots

and the optional fifth step:

* Update bot profiles

## Step 1: Create Twitter Accounts for Bots

This is the most time-consuming step, but it should go pretty quickly anyway.

Because each Twitter account and each bot requires its own email address,
you'll probably want your own domain and email setup, so that you can 
quickly create email aliases.

I created email aliases for my main domain email address, root@charlesreid1.com, 
so that emails going to twitterbot@charlesreid1.com are redirected to root@charlesreid1.com.
That way, I only have to check one email address to verify all the twitterbot accounts.

I also had to make use of my browser's Privacy Mode to keep logins from being persistent.

One other trick: after you create your account, Twitter will walk you through three or four
annoyingly time-consuming steps where it will try and force you to follow people or link 
your Twitter account to your email account. When you get to that point, just go to 
Twitter.com, and it will bypass those steps.

## Step 2: Create Twitter App

To use a single app to tweet as other accounts, you'll need to create a Twitter app.
Instructions to do this are pretty easy to find.

You'll need to get your ```consumer_key``` and ```consumer_secret```,
and put those as variables in ```apikeys.py```.

There is an example in ```apikeys.py.example```.

## Step 3: (One-Time) Key Generation Process

Keys that allow an app to tweet as a Twitter account require a one-time generation 
of a set of keys.

File ```Keymaker.py``` contains code to generate these keys. It creates an authorization URL, 
you log in as your bot, and you get an authorization PIN number. You then give that authorization
PIN number to the Keymaker. The Keymaker can then get a key that allows it to tweet as your bot.

Here's what it looks like when you run it:

```
 $ python Keymaker.py

=============================================
Poem poems/book01.txt

Make key? (y/n) y
Starting keymaking for poem poems/book01.txt
Visit the following app authorization link:
https://api.twitter.com/oauth/authorize?oauth_token=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Sign in as the user to be associated with poem poems/book01.txt

What is the PIN? 0000000
Successfully exported a key bundle for poem poems/book01.txt to JSON file keys/book01.json
```

The PIN is a number that shows up after you log in with your bot's account.

To keep things moving quickly (if you have a lot of bots), use your browser's Privacy Mode
to visit the authorization link.

### The Keymaker

The Keymaker goes through each poem and asks if you want to create a key associated with that poem.
(That is, a key associated with a Milton Bot that owns that poem.)

If you decide to create a key, the Keymaster creates a custom Twitter authorization URL.
You then log in as the Milton Bot, visit that link, and grant permission for the Python application
to use your account.

The ability for the app to tweet using that account is dependent on its having the right keys.
The app needs an app-specific key (the consumer token) and a user-specific key (the authorization token).
Then the app can tweet as any user that's granted permission for the app to do so.

That information is stored in a JSON file in the ```keys/``` folder.

## Step 4: Run the Bot Army

File ```Milton.py``` contains code to run the bot flock.  

File ```Shepherd.py``` is the shepherd, which runs the bot flock. 

File ```Sheep.py``` is the sheep, one sheep per bot. 

### The Shepherd

The Shepherd is a single controller that creates and manages the flock of Sheep.
The Shepherd decides the schedule, tells Sheep when to tweet and when to sleep,
and decides... other stuff.

### The Sheep 

Sheep are pretty stupid (read: simple). One Sheep is tied to one Twitter account,
and tweets one poem.

## Step 5: Perform Actions on the Bots

File ```Ring.py``` allows you to make changes to the bots: 
change their profile photos, update their bios, etc.




