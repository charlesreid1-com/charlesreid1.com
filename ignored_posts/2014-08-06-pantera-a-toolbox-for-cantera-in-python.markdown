---
layout: post
title: Pantera: A Toolbox for Cantera in Python
date: 2014-08-06 21:41:44 -0700
published: false
comments: true
categories: [python, engineering, chemical engineering, cantera, pantera]
---

You'll notice that the two hardly correlate. Narrowing the window of time over which 
we are looking at the data doesn't lead to any clarity or any stronger a relationship, either.

If a team scrapes through the season with 1200 hits, you can probably rest assured they'll be losers; 
and if a team powers through a season smashing 1600, they'll probably be winners. But anything 
in-between, and there's really no telling. In fact, even if a team gets an extreme
number of hits, be it 1200 or 1600, things could easily go either way.

Ultimately, hitting isn't what helps a team win games.

### Wins and Home Runs

Ah, the satisfying crack of the bat as a batter hits it out of the park.
Long balls must help teams win, right?

In fact, they do - though their impact has much to do with which league
you're in (American or National). 

Going back to 1970 (keep in mind here, the biggest difference between batting in the two leagues
is the [designated hitter rule](https://en.wikipedia.org/wiki/Designated_hitter), which was 
implemented in 1973), you can see there's a difference in the impact of home runs on wins 
between the two leagues - even National League teams that finished the season with fewer wins 
hit home runs with the same frequency as teams with more wins. 
(Hence the big blob of a multivariate KDE - if the two variables are completely independent, i.e., 
completely random, the distribution will be a normal distribution, and form a circular 
bimodal normal/Gaussian distribution, which is precisely how the blob looks.)

{% img /assets/ALNL_multivariate_kde_HR_w_since1970.png Joint PDF, Home Runs vs Wins since 1970. %}

In fact, by connecting the two maximum peaks in the National League KDE, it actually looks as though home runs
are *negatively* correlated with winning games!

Interestingly, the KDE for batting since 2000 shows a sharper correlation between home runs 
and wins in the American League, while also showing a stronger (relative to the prior time period) 
relationship between home runs and wins in the National League:

{% img /assets/ALNL_multivariate_kde_HR_w_since2000.png Joint PDF, Home Runs vs Wins since 1950. %}

But even with the home run batting stat, there is still only a weak correlation 
between wins and home runs.

While hitting home runs can directly contribute to winning in a powerful way by putting runs on the board,
it is not the key to winning: the most likely estimate for numbers of home runs hit, even for the American League,
remains about the same for teams winning 45% of their games as it does for teams winning 65% of their games.

### Wins and Walks

So far we've seen that the ability to hit, and/or hit with power, when at bat is not 
what's key to winning - you can win without an overwhelming number of hits or home runs. 

But what about patience? Patient batters will draw more walks during their plate appearances,
so how do walks correlate with winning?

Here's 1970 to the present:

{% img /assets/ALNL_multivariate_kde_BB_w_since1970.png Joint PDF, Walks vs Wins since 1970. %}

and 2000 to the present:

{% img /assets/ALNL_multivariate_kde_BB_w_since2000.png Joint PDF, Walks vs Wins since 2000. %}

Again, there's a noticeable difference between the American League and 
National League KDEs, particularly after 2000. If you're hitting in the American League, 
there is a stronger correlation between being more patient and getting more wins - 
unlike in the National League, where the multivariate distribution shows only a weak
correlation between the two. 

### Wins and Runs

Any batting statistic that measures numbers of runs will surely have an impact on winning.
It is much harder to lose a game when your team scores 10 runs than it is when your team
scores 1 run. 

Let's look at the KDE of runs and wins for data from 1970 to the present:

{% img /assets/ALNL_multivariate_kde_R_w_since1970.png Joint PDF, Runs vs Wins since 1970. %}

and the corresponding KDE for 2000 to the present:

{% img /assets/ALNL_multivariate_kde_R_w_since2000.png Joint PDF, Runs vs Wins since 2000. %}

We can see a clear positive correlation. And we'd see the same thing if we showed
the multivariate KDE of runs and runs batted in, because runs that aren't batted in
are rare (due to the fact that they occur due to rare events like fielder errors or 
wild pitches).

But here's the thing: while this is the first batting stat that clearly correlates well 
with wins, this is also completely obvious. You win by scoring more runs than the other team.
The more runs you score, the more likely you are to win. 

## Are Batting Stats Worthless?

Batting stats aren't telling us anything we didn't already know, and they certainly
aren't revealing any patterns. So are batting stats worthless?

Not necessarily - you've just got to use them correctly. And this is where
the concept of models becomes important.

If you've got a data set of x's and y's, ultimately you want to determine
how x affects y. You want to come up with a mathematical expression for y as a function of x.
That's your model.

But sometimes, x is a vector - that is, there are a lot of different inputs to the model.
In that case, there are a lot of different ways that each x can affect values of y.
You need to create models that can account for the different ways that the different
x's can interact.

It's for this reason that sabermetrics literature has come up with a whole slew of 
strange acronyms, like OPS, wOBA, wRAA, UBR, and BABIP. These are all measures that
combine various batting stats (i.e., create linear combinations of x's) to make 
relationships with y more clear. y may be any number of things, and may be a player stat
or a team stat: wins, or runs, or an individual player's individual run production.
But in any case, these derived statistics create combinations of different x's - 
that is, they create new mathematical models for relating x's to y's. 

### OPS and Wins

let's look at a relatively simple derived stat: [OPS](http://www.fangraphs.com/library/offense/ops/). 
OPS stands for On-base Plus Slugging:
the [on-base percentage](https://en.wikipedia.org/wiki/On-base_percentage) 
of a team (basically the ratio of number of times runners reached base divided by number of opportunities,
disconting special cases like fielder errors) plus the [slugging percentage](https://en.wikipedia.org/wiki/Slugging_percentage),
which is a ratio of total number of bases to number of oppertunities.

The OPS shows a much stronger relationship to wins, 

{% img /assets/ALNL_multivariate_kde_OPS_w_since1970.png Joint PDF, OPS vs Wins since 1970. %}
{% img /assets/ALNL_multivariate_kde_OPS_w_since2000.png Joint PDF, OPS vs Wins since 2000. %}






