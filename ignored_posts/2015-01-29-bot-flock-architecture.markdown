---
layout: post
title: Bot Flock Architecture
date: 2015-01-29 17:32:00 -0800
comments: true
categories: [python, twitter, bot flock, twitterbots, architecture, software]
---

This post discusses the structure of the code that runs my Twitter Bot flocks, 
gropus of accounts that tweet together and are controlled by a Python script.

In order to create a new Twitter bot, you need an email address. Assuming you have 
your own domain, you can create email addresses or email aliases for each Twitter bot
account you want to create. 

Next, you will create the Twitter account for your bots. This will require an 
email address that you can check (email aliases mean you only have to check one 
email address for all your bots - much less of a headache!).

Once you've finished with this, you can authenticate the account with the ```Keymaker``` 
script. This will iterate through a list of poem files or bodies of text and 
ask if a bot should be assigned to each one. If a new bot should be assigned,
it will generate an authentication token link, which you can visit, 
log in with the bot account you just created, and copy and paste the PIN number
that results in the terminal.

Once that's finished, a set of keys is created - literally, the keys to your Twitter bot 
account. This is stored in a JSON file. These keys allow Python to tweet 
using your bot's account.

The next step is to update the bot's biography, profile photo, etc., and make it 
presentable. This is what the ```Ring``` script does. The details get a little complicated
(to upload a photo, you have to manually sign headers with your authentication token,
and upload the raw binary of the image - not tasks for the faint of heart).

Once you've updated your bot's profile information, you can start up the 
Bot Flock with a Shepherd instance. The Shepherd instance creates one Sheep 
for each key it finds in your ```keys/``` directory. It then manages the sheep
using multithreading - one Sheep runs on one thread. This allows the Sheep to be
autonomous once they've been instantiated. 

Sheep define their tweet behavior, which is usually very simple:

* tweet
* sleep

For poems, the sleep interval between lines can be defined differently from the sleep interval 
between successive restarts of the poem.

For more complicated sheep, like dialogue-generating sheep, the tweet behavior is usually to
decide ahead of time on a number of lines of dialogue (a "conversation") to generate. 
These are then tweeted, with some sleep interval between lines. Once the "conversation" is done,
there is another sleep interval between conversations.

There is some functionality in the Shepherd class to perform other operations, like wiping out
the entire history of each Sheep (this is performed by a function called ```jonestown()```).
This is handy if the process of starting up your bot doesn't go as smoothly as you planned.

And that's about all there is to it.

