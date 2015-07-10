---
layout: post
title: OAuth from Python to Build a Twitter Bot Flock: Part 3: The Multithreaded Hydra Bot Flock
date: 2014-05-23 01:15:15 -0700
comments: true
categories: [python, programming, oauth, three legged authentication, twitter, twitterbots]
---

_This is Part 3 of a 3-part series of articles on using OAuth from Python.
It describes the code behind the [Ginsberg Bot Flock](https://twitter.com/charlesreid1/lists/ginsbergbotflock),
all of which is available from my [imaginary-friends repository](https://github.com/charlesreid1/imaginary-friends/) 
on Github_

I'm just gonna say, right now, that I'm extremely proud of this 
blog post title: The Multithreaded Hydra Bot Flock sounds like something
straight out of Dwarf Fortress.

Okay, back to our regularly-scheduled program.

## The Multi-headed Bot Hydra

We discussed, in the past two posts, the model for using OAuth and 
the Twitter API to control a flock of Twitter bots. 

I implemented a [Sheep-Shepherd](http://charlesmartinreid.com/wordpress/2014/05/politically-incorrect-software-architecture/) 
object model to represent the bots and the bot controller.
In this sense, the bot controller is a kind of 
multi-headed hydra, each bot representing a
head that, while mostly autonomous, depends too 
on the whole hydra. 

In the same way, individual bots are autonomous in the 
sense that they decide what their own behavior will be,
but not autonomous in the sense that they only know when
to tweet because the Shepherd tells them to.
Not to get all Biblical, but 
[without the Shepherd, the Sheep will scatter](http://www.blueletterbible.org/Bible.cfm?b=Jer&c=23&t=KJV#s=t_conc_768001),
or something like that.

<!-- more -->

## The Multi-threaded Bot Hydra 

Once I had implemented the Sheep/Shepherd, I thought
to myself, it seems pretty BORING that all of these sheep
are all lined up nicely in their data containers, waiting
to be called one at a time. 

That's not how real sheep work! Real sheep are running around
freaking out, and making life difficult for the shepherd.

The computer analogy, _obviously_, is that our Sheep need to
each have their own thread, and be running 
independently of all the other Sheep.

And also, just because I wanted to brush up on my multithreading
Python skills.

Let's make our multi-headed hydra-bot into a 
multi-threaded hydra-bot.

Onto some code!

## The Multi-Threaded Python Hydra Bot 

These titles keep getting better and better.

First I'll cover our Sheep.

Note: I'm using the [python-twitter library](https://github.com/bear/python-twitter) 
from bear on Github, which is the official version of the 
python-twitter library that was formerly on Google Code.

### The Sheep 

The Sheep class takes a couple of arguments.
* ```json_file``` - the JSON file containing our bot's credentials
* ```line_interval``` - the interval (in seconds) to wait between tweets of each line of the poem
* ```poem_interval``` - the interval (in seconds) to wait, once the poem has finished, before starting again

First the imports:

```python
import twitter
import time
import simplejson as json
from numpy.random import rand
```

I'm importing the simplejson library because, if you recall from
Part 2, we exported the keys required to tweet for each bot account
into JSON files.

The time and random number imports are both useful for general purposes.

Then we'll write some code to process those parameters:

```python
class Sheep(object):

    def __init__(self,json_file,line_interval,poem_interval):

        self.line_interval = line_interval
        self.poem_interval = poem_interval

        # sheep require a JSON with keys
        with open(json_file, "r") as f:
            self.params = json.load(f)
```

Then we'll add more code to set up our Sheep.
Each Sheep manages its own connection with Twitter,
which means it manages its own instance of the 
Twitter API (which is an object provided by the 
python-twitter library):

```python
        # sheep interface with twitter
        self.setup_api()
```

We'll define this function later.

Each Sheep also knows one poem. The Sheep "memorizes" the poem
by loading it into memory, specifically, loading each line into a list.

```python
        # sheep has memory, which is a list of tokens
        # (lines, or sentences, however we tokenize the poem.)
        self.memory = []
        self.memorize()
```

Finally, we want each Sheep to have an age - how many times
it has tweeted (total), and how many times it has tweeted the 
complete poem.

This attribute can be used to change the bot's behavior - for example,
we might want a bot to become more erratic as it gets older,
or mix up lines, or forget lines, or get bored with the poem,
or become fixated on one line for a really long time.

```python
        # Sheep have an age, which controls how much
        # entropy they generate
        self.age = 0.0

        # tot tweet tracker for total lifetime
        # mod tweet tracker for mod N (N = number of lines, which changes with time)
        self.tot_tweet_tracker = 0
        self.mod_tweet_tracker = 0
```

Finally, our Sheep need to be able to sleep, when they're not busy 
tweeting Allen Ginsberg poems. Let's add a bolean that indicates
whether the Sheep is alseep or not:

```python
        # sheep can sleep
        self.sleeping = False
```

#### Sheep Methods

I'll run through the code for each method real quick, 
since most of it is self-explanatory. 

First, the Twitter API setup:

```python
    def setup_api(self):

        print "Setting up API for bot "+self.params['screen_name']
        self.api = twitter.Api( consumer_key        = self.params['consumer_token'],
                                consumer_secret     = self.params['consumer_token_secret'],
                                access_token_key    = self.params['oauth_token'],
                                access_token_secret = self.params['oauth_token_secret'])
```

Remember that we already grabbed these keys from the JSON file.

Next, the memorize method, which consists of two concise list comprehensions:

```python
    def memorize(self):

        # One-liner straight-shot list comprehension.
        self.memory = [line.strip() for line in open(self.params['poem_file'])]
        
        # Prune empty lines
        self.memory = [mem for mem in self.memory if mem <> ""]
```

The Shepherd needs some way of tellign the Sheep to start doing its
tweeting thing. To do that, it'll call the ```loop()``` method, which
puts the Sheep in an infinite tweeting loop:

```python
    def loop(self):
        while True:
            self.tweet_something()
            self.sleep()
```

We'll define sleep behavior using the intervals 
that we set in the constructor:

```python
    def sleep(self):
        self.sleeping = True

        # If we've finished the poem, longer wait.
        # If we're just between lines, shorter wait.

        if (self.mod_tweet_tracker == 0 and self.tot_tweet_tracker > 0):
            time.sleep(self.poem_interval)

        else:
            time.sleep(self.line_interval)

        self.sleeping = False
```

And finally, our tweet method grabs the next line out of Sheep's memory:


```python
    def tweet_something(self):
        """
        Really tweet!
        """
        try:
            stats = self.api.PostUpdates( self.memory[self.mod_tweet_tracker] )
```

## The Shepherd 

The Shepherd class has a master list of all of the Sheep 
(actually, the Shepherd instantiates all instances of Sheep).

Shepherd will use a threading library to spawn a new thread for 
each Sheep in the list. Shepherd does this using the 
multiprocessing library. Specifically,

```python
from multiprocessing import Pool
from multiprocessing.dummy import Pool as ThreadPool 
```

The model for multi-threading is to create a thread pool,
and a list of tasks are assigned to the thread pool.
New threads are then created for each task.

The SimpleShepherd will do this 

```python
class SimpleShepherd(object):
    def __init__(self,json_key_dir,line_interval=30,poem_interval=(1.5*3600)): 
        for jsonf in self.all_json:
            print "Making Sheep for file "+jsonf
            mysheep = Sheep(jsonf,
                        line_interval=self.line_interval,
                        poem_interval=self.poem_interval)
            self.all_sheep.append(mysheep)
```

And finally, the ```loop()``` function contains all the magic:

```python
    def loop(self):
        pool = ThreadPool(len(self.all_sheep))
        results = pool.map(runsheep,self.all_sheep)
```

Now, when we run our driver,

```python
s = Shepherd('keys/',
        line_interval = 60,
        poem_interval = 1800 )
s.loop()
```

and watch each bot print out its tweets, we can see
that they are all running concurrently, with absolutely
no order.

## Wrap-Up

Whew! We've covered a whole lot of the code that runs
the Ginsberg Bot Flock. Keep in mind it's all over at 
Github: 
[Ginsberg Bot Flock on Github](https://github.com/charlesreid1/imaginary-friends/tree/master/ginsberg-bot-flock)



