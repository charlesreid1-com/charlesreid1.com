---
layout: post
title: Are Batting Stats Worthless? Part 3 of 3
date: 2014-09-16 21:20:22 -0700
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

_This is the third post in a three-part series. 
See part 1 [here](http://charlesreid1.github.io/blog/2014/09/06/are-batting-stats-worthless/)
and part 2 [here](http://charlesreid1.github.io/blog/2014/09/12/are-batting-stats-worthless-part-2-of-2/)._

[Jump straight to the conclusions: "Your Team Sucks Significantly. Statistically Significantly."](#sucks)

In this three-part series of posts, I set out to investigate the question 
of whether batting stats are worthless. I proposed to answer this question by
doing a linear regression of wins as a function of various batting stats,
and determining if the relationship between the batting stat and winning 
is statistically significant.

In part 1 of the post, I ran through a statistical significance test for
hits versus wins, to show how one might determine whether hits were a 
"worthless" batting stat. What I found was that hits, in fact, is statistically
significant, although, like any baseball statistic, it's hard to say much
beyond quantitive evidence of the statement, "Yes, the relationship 
is statistically significant."

So much for that idea.

Below I give a rundown of each batting stat, and its relative significance 
compared to a team's winning percentage. The results aren't all that interesting,
because the results show that virtually *every* batting stat exhibits a 
statistically significant relationship to wins.

The problem here, as mentioned in 
[part 2](http://charlesreid1.github.io/blog/2014/09/12/are-batting-stats-worthless-part-2-of-2/),
is that we're dealing with so much data, we're bound to find spurious relationships.
So after performing the statistical test for the entire American League and the entire 
National League (the results of which are shown below), I take this analysis a step further, 
and provide a team-by-team breakdown of the importance of batting stats to wins.
This serves to reduce the data set being analyzed, and provide a more meaningful
significance test.

[Skip to hitting stats](#hitting_stats)

[Skip to non-hitting stats](#non_hitting_stats)

[Skip to the code](#code)

## The Importance of Batting Stats: League-Wide

Just to refresh your memory, I am performing a linear regression of batting stats (x)
versus wins (y), and using a t-test to see if the linear regression coefficient 
that relates x to y is large enough, relative to the variance due to that batting stat,
to be statistically meaningful. 

We're doing this by testing the null hypothesis, the hypothesis that the linear regression
coefficient is not statistically meaningful. Another way of stating the null hypothesis is
that the linear regression coefficient is, for all intents and purposes, zero.

I won't bore you with the full results for each batting stat for the time period 1973-2013, 
because the results of the analysis show that *every* batting stat is important
(with the exception of triples and strikeouts (for the American League),
and hit into double plays (for the National League)).

Let's dig deper to see if we can learn something interesting. 

## The Importance of Batting Stats: Team by Team

Let's look at batting stats and their importance to winning, 
breaking down results team-by-team.

## <a name="hitting_stats"></a>Hitting Stats

If we narrow down the scope of our data for the significance test, 
we're less likely to end up with false positives (batting stats identified
as having a statistically significant relationship to wins, but that 
are in reality unimportant to winning).

Let's start with hits - you'll probably recognize these results 
from [part 2](http://charlesreid1.github.io/blog/2014/09/12/are-batting-stats-worthless-part-2-of-2/)
of this post.

{% codeblock %}

Stat Hits:
    For team ANA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.445 < 1.307) 
    For team ARI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.737 < 1.356) 
    For team ATL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.825 < 1.307) 
    For team BAL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.2799 < 1.307) 
    For team BOS: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.32 < 1.307) 
    For team CHC: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.839 < 1.307) 
    For team CHW: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.496 < 1.307) 
    For team CIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.557 < 1.307) 
    For team CLE: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.625 < 1.307) 
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1677 < 1.337) 
    For team DET: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.319 < 1.307) 
    For team FLA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.433 < 1.337) 
    For team HOU: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.745 < 1.307) 
    For team KCR: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.869 < 1.307) 
    For team LAD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.272 < 1.307) 
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.564 < 1.307) 
    For team MIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.701 < 1.307) 
    For team NYM: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.479 < 1.307) 
    For team NYY: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.152 < 1.307) 
    For team OAK: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.366 < 1.307) 
    For team PHI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.718 < 1.307) 
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.045 < 1.307) 
    For team SDP: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.694 < 1.307) 
    For team SEA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.309 < 1.309) 
    For team SFG: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.766 < 1.307) 
    For team STL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.641 < 1.307) 
    For team TBD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.345 < 1.356) 
    For team TEX: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.311 < 1.307) 
    For team TOR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.398 < 1.309) 
    For team WSN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.22 < 1.307) 

    Teams accepting null hypothesis: 3
    Teams rejecting null hypothesis: 27

{% endcodeblock %}

As we discussed in part 2, only the Baltimore Orioles, Colorado Rockies, and 
Kansas City Royals have no relationship between their hits stat and their
wins. We accept the null hypothesis for each of these teams.

### Singles

The next batting stat I looked at as a function of wins was number of singles,
which returned results that surprised me a bit:

{% codeblock %}

Stat Singles:
    For team ANA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.437 < 1.307) 
    For team ARI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.082 < 1.356) 
    For team ATL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.578 < 1.307) 
    For team BAL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.6799 < 1.307) 
    For team BOS: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.289 < 1.307) 
    For team CHC: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.8334 < 1.307) 
    For team CHW: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5071 < 1.307) 
    For team CIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.162 < 1.307) 
    For team CLE: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1364 < 1.307) 
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.494 < 1.337) 
    For team DET: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.89 < 1.307) 
    For team FLA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.07078 < 1.337) 
    For team HOU: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.7931 < 1.307) 
    For team KCR: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.298 < 1.307) 
    For team LAD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.857 < 1.307) 
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.59 < 1.307) 
    For team MIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.72 < 1.307) 
    For team NYM: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4315 < 1.307) 
    For team NYY: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.6144 < 1.307) 
    For team OAK: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3661 < 1.307) 
    For team PHI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.637 < 1.307) 
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.331 < 1.307) 
    For team SDP: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1681 < 1.307) 
    For team SEA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.754 < 1.309) 
    For team SFG: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1965 < 1.307) 
    For team STL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4704 < 1.307) 
    For team TBD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.13 < 1.356) 
    For team TEX: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.7012 < 1.307) 
    For team TOR: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.189 < 1.309) 
    For team WSN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.367 < 1.307) 

    Teams accepting null hypothesis: 19
    Teams rejecting null hypothesis: 11

{% endcodeblock %}

Quite a few teams had *no* relationship between singles and winning
(over half - 19 out of 30 teams). When you lump league data together 
and analyze the lumped data, the significance test gives you a 
false positive by stating that the singles-wins relationship 
is statistically significant. 
But when you pull apart the data, you discover that for a majority of teams,
the singles batting stat is a poor predictor of winning.

### Doubles

Doubles seemed to correlate with winning for more teams, though it was still 
less than a third:

{% codeblock %}

Stat Doubles:
    For team ANA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.227 < 1.307) 
    For team ARI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.00913 < 1.356) 
    For team ATL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.779 < 1.307) 
    For team BAL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.194 < 1.307) 
    For team BOS: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.337 < 1.307) 
    For team CHC: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.566 < 1.307) 
    For team CHW: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.284 < 1.307) 
    For team CIN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.139 < 1.307) 
    For team CLE: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.279 < 1.307) 
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.664 < 1.337) 
    For team DET: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.877 < 1.307) 
    For team FLA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.145 < 1.337) 
    For team HOU: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.714 < 1.307) 
    For team KCR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.354 < 1.307) 
    For team LAD: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5482 < 1.307) 
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.288 < 1.307) 
    For team MIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.529 < 1.307) 
    For team NYM: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.494 < 1.307) 
    For team NYY: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.083 < 1.307) 
    For team OAK: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.587 < 1.307) 
    For team PHI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.196 < 1.307) 
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.859 < 1.307) 
    For team SDP: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.867 < 1.307) 
    For team SEA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.661 < 1.309) 
    For team SFG: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.557 < 1.307) 
    For team STL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.74 < 1.307) 
    For team TBD: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5868 < 1.356) 
    For team TEX: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.685 < 1.307) 
    For team TOR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.599 < 1.309) 
    For team WSN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1918 < 1.307) 

    Teams accepting null hypothesis: 9
    Teams rejecting null hypothesis: 21

{% endcodeblock %}

The teams for which we accept the null hypothesis aren't surprising: 

* Arizona Diamondbacks - the D-backs (a frnachise team) had a borderline accept/reject 
    t-test for hits-wins;

* Baltimore Orioles - the O's had no relationship between hits and wins, which we'd expect 
    to extend to doubles as well;

* Colorado Rockies, Florida Marlins, Tampa Bay Devil Rays - these three franchise
    teams had little or no relationship between hits and wins (see [Part 2](http://charlesreid1.github.io/blog/2014/09/12/are-batting-stats-worthless-part-2-of-2/) 
    post)

So overall, the doubles results aren't all surprising, although we may want to keep an eye
on the Reds, Phillies, and Dodgers for future significance tests. 

It looks like doubles and wins are pretty closely correlated. This jives with 
what we know about the game: whereas singles put a runner on first, 
leaving quite a bit of work unfinished to bring them to home plate, 
doubles put a runner in scoring position, making it possible for runners
to score even on fly balls. Hits that are more likely to lead to runs
are more likely to lead to wins.

### Triples

The triples-wins significance test looks like the inverse of the doubles-wins significance test,
meaning there's a much weaker relationship between triples and wins:

{% codeblock %}

Stat Triples:
    For team ANA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.037 < 1.307) 
    For team ARI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4644 < 1.356) 
    For team ATL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.114 < 1.307) 
    For team BAL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.673 < 1.307) 
    For team BOS: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.24 < 1.307) 
    For team CHC: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5036 < 1.307) 
    For team CHW: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3599 < 1.307) 
    For team CIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.235 < 1.307) 
    For team CLE: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4579 < 1.307) 
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.03905 < 1.337) 
    For team DET: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9495 < 1.307) 
    For team FLA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.275 < 1.337) 
    For team HOU: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.2215 < 1.307) 
    For team KCR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.451 < 1.307) 
    For team LAD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.198 < 1.307) 
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.619 < 1.307) 
    For team MIN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5273 < 1.307) 
    For team NYM: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.4 < 1.307) 
    For team NYY: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.892 < 1.307) 
    For team OAK: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.7093 < 1.307) 
    For team PHI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.187 < 1.307) 
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 6.565 < 1.307) 
    For team SDP: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3727 < 1.307) 
    For team SEA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3053 < 1.309) 
    For team SFG: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.6755 < 1.307) 
    For team STL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9364 < 1.307) 
    For team TBD: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3567 < 1.356) 
    For team TEX: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4401 < 1.307) 
    For team TOR: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9686 < 1.309) 
    For team WSN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.352 < 1.307) 

    Teams accepting null hypothesis: 21
    Teams rejecting null hypothesis: 9

{% endcodeblock %}

Now we have less than a third of teams rejecting the null hypothesis.

But here's the unusual thing: teams with a weak hits-wins relationship
ended up having a *stronger* triples-wins relationship. A couple of teams
in particular:

* Baltimore Orioles and Kansas City Royals - whereas we were seeing the O's and the Royals
    before due to a weak hits-wins relationship, here they stick out because of a 
    strong triples-wins relationship 

* Boston Red Sox - like the Diamondbacks, the Red Sox had a borderline significant 
    hits-wins relationship, but here stand out because of a strong triples-wins relationship

* Cincinnati Reds and Los Angeles Dodgers - both of these teams had a weak doubles-wins relationship,
    and both have strong triples-wins connections

So it seems like there's a cluster of teams for whom hitting stats
are poor predictors of winning, and many of those same teams have a 
strong tie between triples and wins.

The Brewers, Mets, Pirates, and Nationals round out the crowd.

### Home Runs

Last but not least is the king of hits: the home run.

These are pretty overwhelmingly correlated to wins, but there are 
still a few exceptions:

{% codeblock %}

Stat Home Runs:
    For team ANA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.504 < 1.307) 
    For team ARI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.427 < 1.356) 
    For team ATL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.869 < 1.307) 
    For team BAL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4227 < 1.307) 
    For team BOS: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.84 < 1.307) 
    For team CHC: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.352 < 1.307) 
    For team CHW: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.325 < 1.307) 
    For team CIN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5455 < 1.307) 
    For team CLE: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.69 < 1.307) 
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.316 < 1.337) 
    For team DET: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.228 < 1.307) 
    For team FLA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.885 < 1.337) 
    For team HOU: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.415 < 1.307) 
    For team KCR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.315 < 1.307) 
    For team LAD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.534 < 1.307) 
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.006 < 1.307) 
    For team MIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.926 < 1.307) 
    For team NYM: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.235 < 1.307) 
    For team NYY: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.631 < 1.307) 
    For team OAK: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.169 < 1.307) 
    For team PHI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.551 < 1.307) 
    For team PIT: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1434 < 1.307) 
    For team SDP: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.164 < 1.307) 
    For team SEA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.443 < 1.309) 
    For team SFG: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.103 < 1.307) 
    For team STL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.683 < 1.307) 
    For team TBD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.118 < 1.356) 
    For team TEX: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.53 < 1.307) 
    For team TOR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.926 < 1.309) 
    For team WSN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.005285 < 1.307) 

    Teams accepting null hypothesis: 6
    Teams rejecting null hypothesis: 24

{% endcodeblock %}

The Orioles are showing up again - except this time, because of the usual lack of relationship
between wins and batting stats (home runs in this case). 

We also see the Colorado Rockies, who, like the Orioles, have little or no relationship
between wins and batting stats. The Rockies, at least, have the excuse
that their home ballpark (the mile-high Coors Field in Denver), with its thin air,
makes it easier to hit long balls there than in any other ballpark.

Indeed, the Rockies have watered down batting stats, packing on the hits
without the corresponding wins or playoff appearances.

The Reds, Pirates, Padres, and Nationals round out the remaining 
unfortunate teams for whom home runs have not translated into wins.

It is hard to imagine this situation: the home run is guaranteed 
to get your team at least 1 run, maybe as many as 4. The only
conclusion that I can seem to draw is that teams for whom 
home runs don't translate into wins either consistently
fall behind in games, or their pitching is so awful that 
every run the home runs put on the scoreboard are wiped out
by bad pitching.

### Summary

The Rockies and Orioles have the hardest time translating hits 
into wins - unless those hits are triples.



## <a name="non_hitting_stats"></a>Non-Hitting Stats

### Walks

Let's switch to some non-hitting stats:

{% codeblock %}

Stat Walks:
    For team ANA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1691 < 1.307) 
    For team ARI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.511 < 1.356) 
    For team ATL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.869 < 1.307) 
    For team BAL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.927 < 1.307) 
    For team BOS: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.872 < 1.307) 
    For team CHC: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.032 < 1.307) 
    For team CHW: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.934 < 1.307) 
    For team CIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.035 < 1.307) 
    For team CLE: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.922 < 1.307) 
    For team COL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.046 < 1.337) 
    For team DET: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.782 < 1.307) 
    For team FLA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.253 < 1.337) 
    For team HOU: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.062 < 1.307) 
    For team KCR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.761 < 1.307) 
    For team LAD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.623 < 1.307) 
    For team MIL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.05913 < 1.307) 
    For team MIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.746 < 1.307) 
    For team NYM: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.267 < 1.307) 
    For team NYY: Do we accept null hypothesis? False   (t-test: T < t_threshold, 4.262 < 1.307) 
    For team OAK: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.544 < 1.307) 
    For team PHI: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.632 < 1.307) 
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.372 < 1.307) 
    For team SDP: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3181 < 1.307) 
    For team SEA: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.617 < 1.309) 
    For team SFG: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.923 < 1.307) 
    For team STL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.918 < 1.307) 
    For team TBD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 5.627 < 1.356) 
    For team TEX: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.387 < 1.307) 
    For team TOR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.331 < 1.309) 
    For team WSN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.2039 < 1.307) 

    Teams accepting null hypothesis: 5
    Teams rejecting null hypothesis: 25

{% endcodeblock %}

Being able to draw walks is, apparently, pretty important to winning - 

### Strikeouts

Here's an unsurprisingly unimportant stat to winning: striking out. 
Two thirds of teams have no relationship between striking out and winning.

But the surprising part is not how strong the relationship is - rather, it's how many teams
actually *do* have a statistically significant relationship between striking out and winning!
Nine teams!

{% codeblock %}

Stat Strikeouts:
    For team ANA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4775 < 1.307)
    For team ARI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.182 < 1.356)
    For team ATL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.789 < 1.307)
    For team BAL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.918 < 1.307)
    For team BOS: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.3158 < 1.307)
    For team CHC: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1331 < 1.307)
    For team CHW: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.739 < 1.307)
    For team CIN: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.29 < 1.307)
    For team CLE: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4478 < 1.307)
    For team COL: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4188 < 1.337)
    For team DET: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9189 < 1.307)
    For team FLA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.478 < 1.337)
    For team HOU: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9674 < 1.307)
    For team KCR: Do we accept null hypothesis? False   (t-test: T < t_threshold, 5.557 < 1.307)
    For team LAD: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.9158 < 1.307)
    For team MIL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.639 < 1.307)
    For team MIN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.5451 < 1.307)
    For team NYM: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.4613 < 1.307)
    For team NYY: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.131 < 1.307)
    For team OAK: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.08898 < 1.307)
    For team PHI: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.065 < 1.307)
    For team PIT: Do we accept null hypothesis? False   (t-test: T < t_threshold, 3.66 < 1.307)
    For team SDP: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.1927 < 1.307)
    For team SEA: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.299 < 1.309)
    For team SFG: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.304 < 1.307)
    For team STL: Do we accept null hypothesis? False   (t-test: T < t_threshold, 1.533 < 1.307)
    For team TBD: Do we accept null hypothesis? False   (t-test: T < t_threshold, 2.632 < 1.356)
    For team TEX: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.948 < 1.307)
    For team TOR: Do we accept null hypothesis? True   (t-test: T < t_threshold, 1.168 < 1.309)
    For team WSN: Do we accept null hypothesis? True   (t-test: T < t_threshold, 0.817 < 1.307)

    Teams accepting null hypothesis: 21
    Teams rejecting null hypothesis: 9

{% endcodeblock %}

But check this out: look who the teams with a singificant relationship between 
striking out and winning are: the Baltimore Orioles, the Cincinnati Reds,
the Kansas City Royals, the Milwaukee Brewers, the Pittsburgh Pirates,
the Tampa Bay Devil Rays...!

Does this list sound familiar?

Yup. These are the *same* teams for which, [as noted above](#hitting_stats), 
hitting stats are poor predictors of winning. 

## <a name="sucks"></a> Your Team Sucks Significantly. Statistically Significantly.

We've picked out a couple of teams where the batting stats just aren't 
correlated to wins. There could be two reasons for that:

1. Wins and hits are uncorrelated because hits are unusually low.
These teams are winners, and they don't need hits to win; they kill it on the basepaths, 
they kill it in the running game, they play good, smart ball.

2. Wins and hits are uncorrelated because these teams suck. 
They simply can't produce wins.

Discovering which of these two is actually the case is quite simple.
If you look at the Wikipedia page for [MLB Postseason Drought records](http://en.wikipedia.org/wiki/List_of_Major_League_Baseball_franchise_postseason_droughts#Longest_current_Major_League_pennant_drought) - 
basically, teams that have been the biggest disappointments in baseball history - 
you see the same teams whose batting stats were poor predictors of winning: 

* Baltimore Orioles

* Kansas City Royals

* Cincinnati Reds

* Pittsburgh Pirates

* Milwaukee Brewers

* Los Angeles Dodgers

And up until a decade ago, that list included the Boston Red Sox as well,
another team that showed up on that list.

Unlike the Cubs, who (of course) top every list on that page because they're 
*the Cubs*, these teams have struggled to turn success in the batter's box
into success on the scoreboard. 

These teams aren't simply struggling to hit - if it were as simple as that, they'd
be losing all the time *and* struggling to get hits all the time, so in that sense,
the two would be correlated. 

Rather, these teams are specifically unable to turn hits and runs into wins.
That means they're blowing opportunities. And if you're a team that blows 
opportunities, as you can see from the MLB postseason droughts records, 
it comes back to haunt you.

## The Code 

The above statistial analysis was done using Python - specifically,
Pandas and Scipy.

The scripts I used are all on Github, in my [sabermetrics](http://github.com/charlesreid1/sabermetrics) repo.
The description that follows gives links to the relevant files in the Github repo.

I used the ```TeamWins.py``` [link](https://github.com/charlesreid1/sabermetrics/blob/master/TeamWins.py) 
script to perform the linear regression 
and to test the null hypothesis on each result. This script then stored 
the output in a CSV file ([link](https://github.com/charlesreid1/sabermetrics/blob/master/data/teamwins_hypothesis_test_df.csv)).

This CSV file was then parsed to print the results you see above,
using the ```NullHypothesisBattingStats.py``` script ([link](https://github.com/charlesreid1/sabermetrics/blob/master/NullHypothesisBattingStats.py)).


