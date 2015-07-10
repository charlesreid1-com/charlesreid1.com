---
layout: post
title: Kernel Density Functions and the Oakland Athletics
date: 2014-08-31 23:08:34 -0700
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

I've spent a lot of time doing statistical analysis of computer experiments - 
supercomputer simulations, to be precise 
(see [my dissertation](http://charlesreid1.com/dissertation) for some deets) -
which means I've been using a subdomain of statistics that focuses on situations
where you don't have a whole lot of data.

More recently, I've been learning more about statistics for cases where you have
much more data - piles of data - and how to dive into those piles of data
to make sense of them.

I'm putting together a series of posts that will be walking through an analysis
of a big pile of data. And what better source of big piles of data than Major League
Baseball?

In this post, I'll be illustrating the use of kernel density estimates (KDEs) 
to generate continuous probability distribution functions, and how that information
can be used to make sense of some batting statistics for the Oakland Athletics.



## A Bit of Stats

I downloaded a dataset consisting of per-year batting statistics for the Oakland Athletics,
ranging from their inception as the Philadelphia Athletics (1901) to the present day. 

While I have a pretty good idea of what the data should look like, I'm not familiar with 
historical baseball statistics, so there's a lot in the dataset that remains to be explored.
Naturally, the question arises: where to start?



### Histograms

A good first step when diving into a pile of data is to figure out how it is 
distributed. Histograms are a good way to do this, because that's exactly 
what they do. (As a reminder: histograms plot values of a random variable on the x-axis,
and the frequency of occurrence of particular values on the y-axis. This is done by
dividing the possible values the random variable can take on into a set of bins,
and counting the number of occurrences of the random variable falling into each bin,
which gives the frequency.)

This means histograms are discrete probability density functions (PDFs). 
As the number of samples (number of data points) increases, 
the histograms look more and more like the PDF.



### The Trouble with Histograms

While histograms are great in theory, because they're intuitively appealing,
they have a number of issues, some subtle and some not-so-subtle. These include:

* A good bin width can be difficult to determine, and does not
  have any real rules that govern it (although you can use things
  like Scott's rule, which relates the bin width to other statistical
  features of the data: $$w = \dfrac{3.5 \sigma}{N^{\frac{1}{3}}}$$)

* Bin placement can be tricky - do you center them? left-align them? 
  Should bins for a non-negative variable really be centered at zero?
  This ends up having a big impact on how the final histogram appears,
  and on how it is interpreted.

* Histograms are difficult to compare (it can be tricky to plot a set of boxes 
  superimposed on one another).

* Histograms wash out information in small data sets, and wash out
  information about outliers.

* Histograms are discrete probability frequency distributions,
  but computers like continuous probability distributions (i.e., functions).



### Kernel Density Estimates 

Kernel density estimates (KDEs) can help get around some of the issues 
that histograms raise. Rather than plotting the discrete data itself,
as is done with a histogram, a KDE turns discrete data into a continuous 
function by using each datapoint and its neighboring datapoints to 
create a probability and weight.

The kernel function has a bandwith parameter associated with it,
which controls the amount of data that the weighting function operates on.
A large bandwidth means a large amount of information is being weighted at any 
given time, and wider bandwidths tend to smooth out fluctuations in the 
data and result in a smoother, less interesting KDE. Small bandwidths
retain more of the original characteristics of the data, although at the cost
of looking (and being) more noisy.

Here, I'll illustrate the use of a Gaussian kernel function, 
which, when used as a weighting function, uses an exponentially decaying 
weight for neighboring data points - only nearby points have a significant
effect on the KDE.

$$
K(x) = \dfrac{1}{ \sqrt{2\pi} } \exp -\dfrac{1}{2} x^2
$$



## Creating a KDE 

I'll pick a team batting statistic from the dataset and create some KDEs from it.

Here's a link to the "finished product" source code I'll be stepping through: [http://charlesreid1.com/files/AthleticsKDE.py](http://charlesreid1.com/files/AthleticsKDE.py)

And here's a link to the dataset that I'm using: [http://charlesreid1.com/files/athletics_team_batting.csv](http://charlesreid1.com/files/athletics_team_batting.csv)

This data is provided by the good folks at [Baseball-Reference.com](http://www.baseball-reference.com/), 
specifically the [Teams Batting Stats](http://www.baseball-reference.com/teams/batteam.shtml) page.



### Libraries

I'll be using Pandas to load and manipulate the data. (If you aren't familiar with [Pandas](http://pandas.pydata.org/), check it out. No, really - right now.)

I'll use matplotlib, the go-to Python plotting library, to make some of the plots.

Scipy has a stats package that provides some very useful KDE functionality.

Numpy is always good to have handy.

{% codeblock lang:python Import Statements %}
from pandas import *
import matplotlib.pylab as plt
from scipy import stats
import numpy as np
{% endcodeblock %}



### The Data

I'll begin with a routine to load the data into a Pandas DataFrame, manipulate the data as needed, 
and return the manipulated data.

{% codeblock lang:python Load Data Function %}
def load_data():

    df = read_csv('data/athletics_team_batting.csv',index_col='Rk')

    # Data Cleanup:
    # -----------------------
    
    # Let's exclude some years:
    # - 2014 (incomplete season)
    # - 1994 (the baseball strike)
    df = df[ df['Year'] != 1994 ]
    df = df[ df['Year'] != 2014 ]

    return df

{% endcodeblock %}



### At Bats: Our First KDE

Let's start with something simple: the number of at bats the Athletics have had each season.

While this seems like a boring place to start, it is an important statistic that can reveal quite a bit about 
how the way baseball play has changed since 1901, and may indicate periods of time when the Athletics were
really bad/really good, or when baseball seasons were significantly shorter than they are today.

We'll use Scipy's builtin Gaussian KDE function, ```scipy.stats.gaussian_kde```, to compute our KDE.
This automatically uses Scott's Rule to determine an appropriate bandwidth. 
First we'll create the KDE function, and then we'll create a big 1D grid and evaluate the KDE at each grid location.
This will give us a nice plot.

{% codeblock lang:python Gaussian KDE for Athletics At-Bats %}
df = load_data()

# AB
# -----------------------

# We're going to start with something simple: 
# a kernel density function for number of at bats per season

ab = df['AB']
kernel_scott = stats.gaussian_kde(ab,'scott')
xx = np.linspace(4000,6000,500)

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(xx,kernel_scott(xx),'b-')
ax.set_xlabel("At Bats Per Season")
ax.set_ylabel(r"$P(N_{AB})$")
ax.set_title("Athletics At-Bats, "+str( min(df['Year']) )+"-"+str( max(df['Year']) ))

fig.savefig('kde_AB.png')
plt.show()

{% endcodeblock %}

The resulting plot is shown below:

{% img /assets/kde_AB.png 650px 650px Gaussian KDE for Atheltics At-Bats, All Time (1901-2013). %}

So far so good. We can see that the Athletics have pretty consistently had between 5000 and 6000 at bats each year,
with a couple of outliers.



### Comparing KDEs: At Bats for Different Eras

Let's see how we can compare KDEs (recall from above that comparing histograms can be difficult,
especially when the histograms have a different basis for binning, but it's really easy with KDEs).

### Athletics: An Historical Aside

A bit of history: the Oakland Athletics were not always from Oakland. 
The Athletics moved to Oakland in 1968; before that, they were the Kansas City Athletics from 1955 to 1967.
And before ''that'', they were the Philadelphia Athletics, a dominant team that won nine American League 
penants and five World Series. But the Philadelphia Athletics became pretty awful, at one point earning 
a record for the worst end-of-the-season record in baseball history (.263, 51-103, a record that still 
stands today).

So, what I want to do is compare the KDEs for two scenarios:

* Number of at bats per year over the course of the team's entire history

* Number of at bats per year after the team moved to Oakland in 1968

This was simple to do:

{% codeblock lang:python Gaussian KDE for Atheltics At-Bats, All Time versus Oakland %}

ab_post1968 = df['AB'][ df['Year'] >= 1968 ]
kernel_scott_1968 = stats.gaussian_kde(ab_post1968,'scott')

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(xx,kernel_scott(xx),'b-',label='All Years')
ax.plot(xx,kernel_scott_1968(xx),'r-',label='After 68')
ax.legend(loc='best')
ax.set_xlabel("At Bats Per Season")
ax.set_ylabel(r"$P(N_{AB})$")
ax.set_title("Athletics At-Bats, "+str( min(df['Year']) )+"-"+str( max(df['Year']) )+" vs Oakland (post-1968)")

fig.savefig('kde_AB_1968.png')
plt.show()

{% endcodeblock %}

And the plot produced by this script:

{% img /assets/kde_AB_1968.png 650px 650px Gaussian KDE for Atheltics At-Bats, All Time vs Oakland. %}



## Comparing KDEs: Three At Bat KDEs for Three Eras

Let's take this idea one step further, and plot the KDE for at bats in the modern era
(the team's at bats oer the past decade) to see how the modern Athletics stack up to
the older teams.

{% codeblock lang:python Gaussian KDE for Atheltics At-Bats, All Time versus Post 1968 vs Past Decade %}

ab_decade = df['AB'][ df['Year'] >= 2003 ]
kernel_scott_decade = stats.gaussian_kde(ab_decade,'scott')

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(xx,kernel_scott(xx),'b-',label='All Years')
ax.plot(xx,kernel_scott_1968(xx),'r-',label='After 68')
ax.plot(xx,kernel_scott_decade(xx),'g-',label='Last Decade')
ax.legend(loc='best')
ax.set_xlabel("At Bats Per Season")
ax.set_ylabel(r"$P(N_{AB})$")
ax.set_title("Athletics At-Bats (All Years, Post-1968, and Past Decade)")

fig.savefig('kde_AB_decade.png')
plt.show()

{% endcodeblock %}

This gives us an interesting trend in the number of at bats: 

{% img /assets/kde_AB_decade.png 650px 650px Gaussian KDE for Atheltics At-Bats, All Time vs Post 1968 vs Past Decade. %}

As we filter out historical data, our distribution shrinks - meaning, either the way baseball is played has gotten more consistent,
or the Athletics themselves have gotten more consistent. (Number of at bats per year is, obviously, going to go up as the team does better.)

Analyzing at bats per game will help to isolate the effects of differences in how the game was played (i.e., different numbers of games)
from the differences in Athletics performance (i.e, the ability to increase the number of at bats in a given game).
We'll get to that in a second. But first, let's look deeper into the "era" effect of the data.



## Further Filtering 

We can see right away from these three KDEs that the distribution of number of at bats is getting tighter over time. 
But is it really the case that the number of at bats per season is getting tighter? Remember, all three KDEs contain
redundant information - all three contain 2003-2013 data, and two contain 1968-2013 data.

To de-convolute the element of time, I split the Athletics batting history into a couple of different eras:

* 1901 - 1932: Philadelphia Athletics, covers the era of two dominant Athletics teams

* 1933 - 1954: Philadelphia Athletics, covers the wilderness years, during which the Athletics were a godawful team

* 1955 - 1967: Kansas City Athletics 

* 1968 - 2002: Oakland Athletics 

* 2003 - 2013: the "modern" Oakland Athletics, in the past decade

I created and plotted a KDE for each of these eras. First, the code:

{% codeblock lang:python Gaussian KDE for Atheltics At-Bats, Split Across Eras %}

ab_pre1933   = df['AB'][df['Year']<1933]
ab_1933_1954 = df['AB'][(df['Year']>=1933) & (df['Year']<1955)]
ab_1955_1967 = df['AB'][(df['Year']>=1955) & (df['Year']<1968)]
ab_1968_2002 = df['AB'][(df['Year']>=1968) & (df['Year']<2003)]
ab_2003_2013 = df['AB'][df['Year']>=2003]

kernel_pre1933   = stats.gaussian_kde(ab_pre1933  ) 
kernel_1933_1954 = stats.gaussian_kde(ab_1933_1954) 
kernel_1955_1967 = stats.gaussian_kde(ab_1955_1967) 
kernel_1968_2002 = stats.gaussian_kde(ab_1968_2002) 
kernel_2003_2013 = stats.gaussian_kde(ab_2003_2013) 

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(xx,kernel_pre1933(  xx), 'b-', label='Pre 1933') 
ax.plot(xx,kernel_1933_1954(xx), 'r-', label='33-54')
ax.plot(xx,kernel_1955_1967(xx), 'g-', label='55-67')
ax.plot(xx,kernel_1968_2002(xx), 'c-', label='68-02')
ax.plot(xx,kernel_2003_2013(xx), 'k-', label='03-Present')

ax.legend(loc='best')
ax.set_xlabel("At Bats Per Season")
ax.set_ylabel(r"$P(N_{AB})$")
ax.set_title("Athletics At-Bats, Split Over Eras")

fig.savefig('kde_AB_split.png')
plt.show()

{% endcodeblock %}

Now we can see the final result, which gives us a much clearer 
picture of what's happening: 

{% img /assets/kde_AB_split.png 650px 650px Gaussian KDE for Atheltics At-Bats, Split Over Eras. %}

The 1933-1954 era and the 2003-2013 era both show pretty consistent numbers of at bats - with 
the latter markedly better than the former. But the other eras have a wider distribution - 
meaning play was less consistent. What might cause that?

Each team has a minimum number of at bats per season, which is dictated by the number of games
played in the season. A team *must* have 27 at bats per game. But beyond that minimum,
at bats are due to runners on base, production of runs, and balls in play. The total number of 
at bats per season gives an integrated sense of the entire season, but a per-game number of 
at bats would reveal more information.

### At Bats Per Game

Let's repeat the analysis above, splitting the data into the same eras, but this time 
let's look at at bats per game.

First, we need to slightly modify our ```load_data()``` function to compute an 
at bats per game (ABpG) stat:

{% codeblock lang:python Modified Load Data Function %}

def load_data():

    df = read_csv('data/athletics_team_batting.csv',index_col='Rk')

    # Data Cleanup:
    # -----------------------
    
    # Let's exclude some years:
    # - 2014 (incomplete season)
    # - 1994 (the baseball strike)
    df = df[ df['Year'] != 1994 ]
    df = df[ df['Year'] != 2014 ]

    df['ABpG'] = df['AB']/df['G']

    return df

{% endcodeblock %}

Next, we can compute KDEs for the at bats per game stat:

{% codeblock lang:python At Bats Per Game KDEs %}

abpg_pre1933   = df['ABpG'][df['Year']<1933]
abpg_1933_1954 = df['ABpG'][(df['Year']>=1933) & (df['Year']<1955)]
abpg_1955_1967 = df['ABpG'][(df['Year']>=1955) & (df['Year']<1968)]
abpg_1968_2002 = df['ABpG'][(df['Year']>=1968) & (df['Year']<2003)]
abpg_2003_2013 = df['ABpG'][df['Year']>=2003]

kernel_pre1933   = stats.gaussian_kde(abpg_pre1933  ) 
kernel_1933_1954 = stats.gaussian_kde(abpg_1933_1954) 
kernel_1955_1967 = stats.gaussian_kde(abpg_1955_1967) 
kernel_1968_2002 = stats.gaussian_kde(abpg_1968_2002) 
kernel_2003_2013 = stats.gaussian_kde(abpg_2003_2013) 

xxpg = np.linspace(min(df['ABpG']),max(df['ABpG']),500)
fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(xxpg,kernel_pre1933(  xxpg), 'b-', label='Pre 1933') 
ax.plot(xxpg,kernel_1933_1954(xxpg), 'r-', label='33-54')
ax.plot(xxpg,kernel_1955_1967(xxpg), 'g-', label='55-67')
ax.plot(xxpg,kernel_1968_2002(xxpg), 'c-', label='68-02')
ax.plot(xxpg,kernel_2003_2013(xxpg), 'k-', label='03-Present')

ax.legend(loc='best')
ax.set_xlabel("At Bats Per Game")
ax.set_ylabel(r"$P(N_{ABpG})$")
ax.set_title("Athletics At-Bats Per Game, Split Over Eras")

fig.savefig('kde_ABpG_split.png')
plt.show()

{% endcodeblock %}

That results in the following plot:

{% img /assets/kde_ABpG_split.png 650px 650px Gaussian KDE for Atheltics At-Bats per Game, Split By Era %}

What's immediately obvious is that the number of games has been changing over the years, because on a per-game basis
the KDEs line up right on top of one another. And with the exception of the 1901-1933 Athletics, which had a very wide 
distribution, the rest of the plots remain remarkably tightly distributed between 33 and 35 over almost 70 years of data.

Another interesting observation is that although the Athletics absolutely stank during the 1933-1954 era,
they tended to have more at bats per game over that time period; and while the Athletics won six penants and four 
world series while in Oakland (1968-2002 era), they tended to have a lower number of at bats per game during that 
time period. Clearly, there is little correlation between the number of at bats the Athletics had, and what 
they were able to do during those at bats.



## What's To Come

In my next few posts, I'll continue with this dataset, showing how we can use the KDEs we generated above
to evaluate the cumulative distribution function (CDF), which can help answer quantitative questions about
relative performance. If we want to ask how the 1973 Athletics rank, historically, we can determine that
quantitatively using the CDF. 

I'll also be showing how we can use Scipy's Gaussian KDE functionality to compute multivariate KDEs.
This can tell us things like the distribution of home runs and wins, and whether there's a correlation 
between them.

Already some very interesting plots have come out of our simple exploration of a simple statistic.
Continuing with Scipy and Numpy, we'll expand the data we're looking at and delve into some more interesting
batting statistics, as well as bring in some datasets for other teams, too!

