---
layout: post
title: Apollo 11 Space Junk
date: 2015-01-05 18:06:52 -0800
comments: true
categories: [python, web scraping, language, space, twitterbots]
---

## Apollo 11 Space Junk

If you haven't seen it, the [Apollo 11 Space Junk twitterbot](http://twitter.com/apollo11junk)
is a pretty amazing little wonder. [@apollo11junk](http://twitter.com/apollo11junk)
is a robot that creates and publishes Tweets. But the tweets it creates
are randomly generated. @apollo11junk learns how to speak by 
repeating and re-using language at the phrase level,
instead of the letter- or word-level that is used in a lot of
random text generation algorithms (e.g., the [Markov model of language](http://www.cs.princeton.edu/courses/archive/spr05/cos126/assignments/markov.html)).
What this allows you to do is generate phony random text 
with the same "look-and-feel" as the original.

<blockquote class="twitter-tweet" lang="en"><p>McCandless: Go ahead, 11. And I&#39;d like to pass up your Delta azimuth correction at this time if you&#39;re ready to copy.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/551686395681452032">January 4, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>McCandless: Say again, Columbia? We&#39;re going to go up through the Vanguard. Would you care to comment on some of these craters as we go by?</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/551685033199931392">January 4, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Evans: Apollo 11, Houston. Just about, though. We got about 2 minutes to LOS here, Mike. Over.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/551443999626915841">January 3, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[leonardr on github](http://github.com/leonardr/olipy) has done all the hard work
of writing the algorithm to train and generate language on the phrase level, 
called Queneau assembly, in a Python library
calleld [olipy](http://github.com/leonardr/olipy).
He also came up with an ingenious application -
he put all of the dialogue of the Apollo 11 
flight and ground radio transmissions into
JSON format, easily parsed by olipy, and packaged
it all up as an elegant 10-line script, 
[example.apollo.py](https://github.com/leonardr/olipy/blob/master/example.apollo.py).

The JSON-formatted dialogue is here, and is fascinating: [apollo 11.txt](https://raw.githubusercontent.com/leonardr/olipy/master/data/apollo_11.txt)

The logs of each Apollo mission are on the [NASA website](http://history.nasa.gov/afj/).

<blockquote class="twitter-tweet" lang="en"><p>Duke: Rog. I guess so, Buzz. Next three lines are NA. [Long pause.]</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/550201772229140481">December 31, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>McCandless: In the American League, Detroit beat Cleveland 4 to nothing; New York trounced Washington 5 to nothing; Baltimore out hit -</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/550302962858201089">December 31, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Boston out hit Baltimore to score 6 runs to the Orioles&#39; 2; and Chicago beat Kansas City 6 to 1. Loud and clear. It looks okay to us.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/550302963311181825">December 31, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Because @apollo11junk provides unaltered sentences from the original dialogue,
it presents a very interesting way to experience the history in those logs 
and peek into them in random and often fascinating flashes. 
We know that each phrase spoken by @apollo11junk 
has come verbatim from the transcripts, so the language it uses
is the language of the astronauts and mission control.

<blockquote class="twitter-tweet" lang="en"><p>Collins: I said the Czar is brushing his teeth, so I&#39;m filling in for him. Good.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305959511789569">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Collins: Let me know when it&#39;s lunch time, will you?</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/550850060582281217">January 2, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

What I love best about it is how densely, thickly technical
the transcrips are, dipping into them at any point,
and yet in so many places the humanity of the astronauts
comes through. @apollo11junk often sounds 
weirdly human.

<blockquote class="twitter-tweet" lang="en"><p>Duke: Rog. The instrument panels are coming into view behind. Over. We copy, 11. And the comments: This Entry PAD assumes no Midcourse 6.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548438293738565632">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Over.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548438294191554560">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Armstrong: (Joking) You can&#39;t get away with anything anymore, can you? Yes, it&#39;s about a second off.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548438652507152384">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Another interesting aspect is the way that it weaves together 
barely coherent but just-plausible-enough dialogue, 
like an astronaut's waking dream. Entire miniature 
dramas play out over long radio transmissions. 

<blockquote class="twitter-tweet" lang="en"><p>McCandless: There we go, the salmon salad, very good. Reading you loud and clear. One thing that we did miss in the drop-out in the noise</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305204193161216">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>here is your LM/CM Delta-P reading for about 28 hours GET. It&#39;s probably just going to keep on getting worse like that. That&#39;s the one down</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305205153656833">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>on panel 251 also. Roll for Sep 357, 107, 041; 301, 287, 319. [No answer.] The feature that I was describing to you - the small bright</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305205946368001">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>crater on the rim of the large, fairly old crater - would be about . Let us grind around a little while on it, and we&#39;ll report back to</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305206734897152">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>you, probably in a rev or two. Out.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552305207619878913">January 6, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

So much of what happens on board the spacecraft consists of routine checks, 
communication tests, diagnosing problems, reading off instruments, changing settings -
the dull routine tasks of the most exciting job in the universe.

The dialogue recycles, so if you keep watching long enough, you'll see the same problems crop up again forever. 

Then again, when you spend ten days in space, lots of problems crop up. So you might be watching a while.

<blockquote class="twitter-tweet" lang="en"><p>Duke: Houston. About 50 percent of the time, we&#39;re getting high bit rate off the omnis when you&#39;re in PTC. Copy, 11. [Long pause.] Copy.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548621624699011073">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Over.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548621626032783360">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Collins: That&#39;s affirmative.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548621859910975488">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On an imaginary circumlunar trajectory, forever.

<blockquote class="twitter-tweet" lang="en"><p>Aldrin: Hey, Charlie, I can see the snow on the - on the mountains out in California, and it looks like LA doesn&#39;t have much of a smog</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552163502605864960">January 5, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>problem today. Minus 50 and 270.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552163503029501953">January 5, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Collins: See that, Buzz?</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552163884207861761">January 5, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Aldrin: Roger.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552163999903514626">January 5, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" lang="en"><p>Armstrong: Yes.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/552164326107148288">January 5, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Apollo 12 Space Junk

<blockquote class="twitter-tweet" lang="en"><p>Collins: Mark it. This trip of ours to the Moon may have looked, to you, simple or easy. No.</p>&mdash; Apollo 11 Space Junk (@apollo11junk) <a href="https://twitter.com/apollo11junk/status/548438895998668800">December 26, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I reached the conclusion that if some human beings scale the linguistic mountain of linguistic theory 
to implement a Queneau generator, and some human beings tackle the glorious challenge of space flight,
surely, I can build a web scraper to build a Twitter robot to use their Python libraries and 
mimic their radio transmissions.

Plus there's only 9 Apollo missions on the web page.

I started with the [Apollo 12 Flight Journal](http://history.nasa.gov/ap12fj/index.htm), 
and a script for [Apollo 12 Lunar Surface Journal](http://www.hq.nasa.gov/alsj/a12/a12.html) 
will follow soon.

I'll keep chugging, until I've got all the transcripts.

And then... an Apollo Space Junk bot flock.


