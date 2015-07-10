---
layout: post
title: Rainbow Mind Machine
date: 2015-02-21 23:29:36 -0800
comments: true
categories: 
---

I have quite a few Twitter bots going, and some of them
were beginning to break or go down or otherwise behave 
erratically. Up until this point, I've been writing 
and re-writing code on a bot-by-bot and case-by-case basis,
but with so many bots and so many scripts, this was becoming
a headache to manage.

Thus I set out to create an extensible Twitter Bot Flock library,
which I called [Rainbow Mind Machine](http://github.com/charlesreid1/rainbow-mind-machine).

Rainbow Mind Machine is a Python library that provides three 
essential components required by every Bot flock:

1. Keymaker - for interfacing with the Twitter API and obtaining keys.

2. Shepherd - for managing the bot flock and performing flock-level actions.

3. Sheep - one Sheep represents one Twitter bot account. 
    Twitter bot flocks are composed of multiple Sheep.

## Library Functionality

The functionality I needed in the library had become clear
over the course of creating five Twitter Bot Flocks (the 
[Milton](http://github.com/charlesreid1/milton)
and [Ginsberg](http://github.com/charlesreid1/ginsberg) 
bot flocks, the [Apollo Space Junk](http://github.com/charlesreid1/apollospacejunk) 
bot flock, the [Watergate bot flock](http://github.com/charlesreid1/watergate)
bot flock, and my Flickr photobot flock.

## Flock Functionality 

Each bot flock shares similarities:

* Each flock must manage app-level information 
    (like the Twitter Consumer App API key)
* Each bot must manage account-level information
    (like the Twitter account name, the account key,
    the file associated with the bot, etc.)

The flock stores app-level information with the Shepherd, 
and account-level information with each Sheep.

## Bot Functionality

Each bot I have created has followed a similar 
pattern of behavior. Its actions are composed of an outer loop
and an inner loop.

In the outer loop, there is some long-term "action" the bot
is taking - creating a conversation, tweeting an entire poem, etc.

In the inner loop, the bot is tweeting an individual piece 
of the "action" - a line of conversation, or a line of the poem.

The bots are therefore structured to follow this pattern.

In the outer loop, the bot constructs a tweet queue,
and does anything necessary to prepare the tweets
(e.g., uploading media files).
The outer loop behavior is defined differently for each bot flock.

In the inner loop, the bot simply tweets from the queue.

## Performing Actions

Bot actions can be grouped into two classifications:

* Parallel actions - actions that each bot performs in parallel, usually forever
* Sequential actions - actions that each bot performs in sequence, usually quick 

These actions are fundamentally different, so the Shepherd
needs to be able to account for that. 

Additionally, because of the two-layered Shepherd-Sheep 
architecture, I wanted to avoid having to implement 
each action twice, meaning I didn't want to 
perform actions this way:

```python
def main():
    s = Shepherd()
    s.do_something()
    s.do_something_else()

class Shepherd:
    def do_something(self):
        for sheep in all_sheep:
            sheep.do_something()
    def do_something_else(self):
        for sheep in all_sheep:
            sheep.do_something_else()

class Sheep:
    def do_something(self):
        pass
    def do_something_else(self):
        pass
```

Instead, I wanted a cleaner implementation,
where Sheep implement actions, but the user
can "pass" actions through the Shepherd, 
instead of having to define them in the Shepherd.

I also wanted to be able to pass arbitrary parameters
to the actions.

Putting together all of these requirements, I ended up
with a solution where the Shepherd has two methods
to abstractly pass actions through to Sheep:
a sequential perform action method, and a parallel
(pool) perform action method.

This ended up looking something like this:

```python
from multiprocessing import Pool
from multiprocessing.dummy import Pool as ThreadPool 

def main():
    s = Shepherd()
    s.perform_action('something', {'param1':'value'})
    s.perform_action('something else', {'param1':'value'})

class Shepherd:

    def perform_action(self,action,**kwargs):
        for sheep in self.all_sheep:
            sheep.perform_action(action,**kwargs)

    def perform_pool_action(self,action,**kwargs):
        def do_it(sheep):
            sheep.perform_action(action,**kwargs)

        pool = ThreadPool(len(self.all_sheep))
        results = pool.map(do_it,self.all_sheep)

class Sheep:

    def perform_action(self,action,**kwargs):
        if action=='something':
            self.do_something(**kwargs)
        elif action=='something else':
            self.do_something_else(**kwargs)

    def do_something(self,**kwargs):
        pass

    def do_something_else(self,**kwargs):
        pass
```

This makes for a significantly cleaner abstraction that cuts
down on crusty code.

## Bot Tweet Queues 

Each bot populates a queue with tweets.

It made the most sense to implement the population of
the tweet queue happen all at once, in the "outer loop" 
I mentioned above.

The pseudocode for the bot publishing action looked like this:

```
outer loop:
    populate queue
    inner loop:
        publish from queue
        inner sleep interval
    outer sleep interval
```

Simple enough.

To construct the queue, I decided to use something 
from the Python [collections](https://docs.python.org/2/library/collections.html) 
module, which provides "high-performance container datatypes."

Specifically, I decided to implement the tweet queue using 
a [deque](https://docs.python.org/2/library/collections.html#collections.deque)
(pronounced "deck") object, which is a double-ended queue.

## End Result

Rainbow mind machine is still a work in progress.

Check out this blog for status updates on this project in the next week or two.

Check out the [Rainbow Mind Machine repo on Github](http:github.com/charlesreid1/rainbow-mind-machine).

Check out the [Ginsberg Bot Flock](http:github.com/charlesreid1/ginsberg).

Check out the [Milton Bot Flock](http:github.com/charlesreid1/ginsberg).

Check out the [Watergate Bot Flock](http:github.com/charlesreid1/watergate).

Check out the [Apollo Space Junk Bot Flock](http:github.com/charlesreid1/apollospacejunk).











