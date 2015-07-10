---
layout: post
title: Using Multivariate KDEs to Examine How Baseball is Changing
date: 2014-09-03 21:40:47 -0700
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

In my [last post](http://charlesreid1.github.io/blog/2014/08/31/kernel-density-functions-and-the-oakland-athletics/), 
I was doing some basic statistical analysis of batting statistics for the Oakland Athletics to figure out
what the data was really saying. One of the interesting things that came out of this analysis was the 
way that the kernel density function (the first statistical tool I applied) of the number of at bats (the first 
batting stat that I looked at) showed that over time, the distribution of number of at bats in a season 
changed pretty dramatically - sometimes it was short and fat, sometimes it was tall and skinny.

This got me thinking more about the nature of the data set that I was looking at. The data contained a 
season-by-season breakdown of batting statistics, so time is obviously one of the most interesting variables
in the data set.

Taking this a step further, I decided to build some multivariate kernel density estimates to see how 
the distributions changed over time. But I took the analysis a step further, by including *all* teams - 
not just the Oakland Athletics. This should give us a more interesting set of data on which to draw.



## Multivariate Kernel Density Functions

To understand how the distribution of different batting statistics were changing over time, 
I wanted to use a multivariate kernel density function. My [last post](http://charlesreid1.github.io/blog/2014/08/31/kernel-density-functions-and-the-oakland-athletics/)
explained what kernel density functions are - continuous representations of discrete histograms,
i.e., approximated probability functions - and multivariate kernel density functions are no different.
These are continuous, approximated joint PDFs constructed from discrete data.

I used the multivariate kernel density functions to look at the joint PDF of batting stats with year,
and I found some very surprising results.



## Hits 

The plot below shows a joint PDF of hits versus year as a heat map:

{% img /assets/multivariate_kde_H_yr.png 650px 650px Joint PDF, Hits vs Year, All Teams. %}

And the same plot, but with the discrete data plotted on top as black points: 

{% img /assets/multivariate_kde_H_yr_points.png 650px 650px Joint PDF with Source Data, Hits vs Year, All Teams. %}

(Code for this plot included [below](#hcode).)

One of the first things that stood out to me was, in the discrete data, the three vertical stripes 
for years with significantly fewer hits. The second and third, in 1981 and 1994, respectively,
correspond to baseball labor disputes ([1981](https://en.wikipedia.org/wiki/1981_Major_League_Baseball_strike) 
and [1994-1995](https://en.wikipedia.org/wiki/1994%E2%80%9395_Major_League_Baseball_strike)). 

I wasn't sure what was causing the other big dip in hits. I guessed it was around 1918, 
and sure enough, a Google search for the 1918 baseball season turned up 
[some information](http://entertainment.howstuffworks.com/1918-baseball-season.htm) 
about the season being cut short due to World War I.

After that 1918 season, the hits change pretty dramatically, skyrocketing to numbers that 
haven't been seen since, even today. From the 1920s to the 1950s, the number of hits slid downward, 
though they began to pick back up throughout the 60s through 90s. 

Another feature of the data is the way the distribution becomes more strongly peaked after about 1950,
creating a large red spot. Part of this is a tightening of the distribution, but part of it is
simply due to more teams being added, meaning there is a higher concentration of data in latter years.



## Home Runs

A similar plot of the joint PDF of home runs and year show an interesting bimodal distribution:

{% img /assets/multivariate_kde_HR_yr.png 650px 650px Joint PDF, Home Runs vs Year, All Teams. %}

and with the discrete data as black points: 

{% img /assets/multivariate_kde_HR_yr_points.png 650px 650px Joint PDF with Source Data, Home Runs vs Year, All Teams. %}

(Code for this plot included [below](#hrcode).)

There's an obvious and dramatic upward trend of home runs with time - which makes perfect sense. 

But another interesting trend is the bimodal nature of the joint PDF: in addition to the 
strong peak starting around 1970 (when many new teams joined baseball, thereby creating a greater density of data),
there is also a peak in the joint PDF between 1900 and 1920.

To show this more clearly, I plotted the variance in home runs versus time:

{% img /assets/variance_HR_yrs.png 650px 650px Variance in Home Runs vs Year, All Teams. %}

(Code for this plot included [below](#hrcode).)

It is clear from this plot what's going on: between 1900 and 1920, the variance in home runs hit by each team
is very low (meaning, pretty much everyone's hitting the same number of home runs). But starting in the late 
1920s, the variance jumps. 

Plotted as a big red vertical line is Babe Ruth's record 60 home run season in 1927, which was 
a significant, long-term baseball record that corresponds closely to the significant jump in 
home run variance.  



## Striking Out Getting Home Runs

It's clear from the plots above that something drastic changed about hitters in the 1920s:
they started going for long balls. As detailed by David Getz in his article, ["Going, Going, Gone!: How the Home Run has Changed Baseball"](http://digitalcommons.iwu.edu/cgi/viewcontent.cgi?article=1089&context=constructing),
before Babe Ruth, hitters like Ty Cobb and Honus Wagner aimed for control over power when batting. 
But in the 1920s, the home run craze began.

Getz also mentions something interesting: hitters began to strike out more in their attempts 
to hit the long ball. And the data bear this out - take a look at the following plot of 
the correlation between strikeouts and home runs, and compare it to the correlation between 
strikeouts and hits.

{% img /assets/corr_HRSOH_yrs.png Correlation Between Strikeouts and Hits, Strikeouts and Home Runs vs. Year %}

First, let's look at the strikeouts-hits correlation: it's negative throughout much of baseball 
history, for obvious reasons. A negative correlation means the more hits you get, the fewer strikeouts you get.
Naturally - these are two of four possible outcomes at an at-bat (hit, strikeout, field out, or walk).
Teams with more hits had fewer strikeouts.

But what's interesting is that starting around 1920, home runs correlated *positively* with strikeouts,
meaning teams with more home runs also had more strikeouts. Furthermore, this trend continued for two decades. 
The data bears out precisely the phenomena Getz alludes to: batters were striking out more frequently 
in an attempt to go for long balls.

While this trend died down sometime in the 1950s, the correlation remained positive. Consider
the same plot, with a filter applied to smooth the data: 

{% img /assets/corr_smoothedHRSOH_yrs.png Correlation Between Strikeouts and Hits, Strikeouts and Home Runs (Smoothed) vs. Year %}

It's important to note that when the strikehout-home run correlation went up, the strikeout-hits 
correlation also went up, reinforcing the fact that this is just correlation - not causation. 
There are plenty of other factors involved, like evolving hitting and pitching skill levels, 
advances in strategies among managers, changing baseball rules, the nature of newly-constructed 
ballparks, and an increase in the information available to teams. But the fact that home runs and 
strikeouts are positively correlated is still significant.



## Conclusions

So far, we've just scratched the surface of this data set - we haven't looked at a whole lot of quantities - and yet,
we're already uncovering some very interesting trends. We've been able to use batting statistics to identify 
anomolous years (1918, World War I, and the two baseball strikes, 1981 and 1994). We've also been able to use some
statistical functions to validate [a claim made by David Getz](http://digitalcommons.iwu.edu/cgi/viewcontent.cgi?article=1089&context=constructing)
that batters were striking out more often when they began swinging for the fence.

So far, so good! Stay tuned for further sabermetric analysis...




## The Python Code

As before, I'm using [Pandas](http://pandas.pydata.org/) to organize and manipulate the data. 
I'm using [Scipy](http://www.scipy.org/) and [Numpy](http://www.numpy.org/) to do statistical and numerical
computations. Finally, I'm using [Matplotlib](matplotlib.org/) for the plots.



### Import Statements, and Bringing In Data

I combined historical batting data for all major league teams available from the good folks 
at [Baseball-Reference.com](http://baseball-reference.com). The ```load_data()``` function 
below brings in all of this data.

If you'd like to download data for all teams, or data for a particular team, it's all available 
in CSV format at Github: [https://github.com/charlesreid1/sabermetrics/tree/master/data](https://github.com/charlesreid1/sabermetrics/tree/master/data)

{% codeblock lang:python Import Statements %}

print "Loading pandas..."
from pandas import *
print "Done loading pandas."

import matplotlib.pylab as plt
import numpy as np
from scipy import stats
from scipy import interpolate



def load_data():

    df = read_csv('data/master_team_batting.csv')

    # Data Cleanup:
    # -----------------------
    
    # Let's exclude some years:
    # - 2014 (incomplete season)
    # - 1994 (the baseball strike)
    # - 1981 (the other baseball strike)
    df = df[ df['Year'] != 1981 ]
    df = df[ df['Year'] != 1994 ]
    df = df[ df['Year'] != 2014 ]

    # Remove pre-1900 data, since it's noisy for the quantities we'll be looking at
    df = df[ df['Year'] >= 1900 ]   

    # Add in data about singles
    df['1B'] = df['H'] - df['2B'] - df['3B'] - df['HR']

    df['ABpG'] = df['AB']/df['G']
    df['BBpG'] = df['BB']/df['G']
    df['1BpG'] = df['1B']/df['G']
    df['2BpG'] = df['2B']/df['G']
    df['3BpG'] = df['3B']/df['G']
    df['HRpG'] = df['HR']/df['G']


    return df

{% endcodeblock %}



### <a name="hcode"></a><a name="hrcode"></a>Plotting Multivariate KDEs 

To make the multivariate KDE plots, I wanted to loop through a whole bunch of variables 

{% codeblock lang:python Multivariate KDE Plots %}

# Multivariate KDEs
# ------------------------------

# Let's look at how different stats
# are distributed versus year

keys = ['H','1B','2B','3B','BB','HR','AB','DP','SLG','SO']
labels = ['Hits','Singles','Doubles','Triples','Walks','Home Runs','At Bats','Hit Into Double Plays','Slugging Pct','Strikeouts']


for key, label in zip(keys,labels):

    mx = df['Year'].values
    my = df[key].values
    
    xmin = mx.min()
    xmax = mx.max()
    ymin = my.min()
    ymax = my.max()
    
    # Create a 100x100 grid spanning the min/max of our data
    X, Y = np.mgrid[xmin:xmax:100j, ymin:ymax:100j]
    positions = np.vstack([X.ravel(), Y.ravel()])
    values = np.vstack([mx, my])

    # create a Gaussian KDE from our data
    kernel = stats.gaussian_kde(values)

    # evaluate the KDE at all points on our 100x100 grid
    Z = np.reshape(kernel(positions).T, X.shape)

    # ------------------
    # First, we'll only plot the KDE 
    
    fig = plt.figure()

    ax = fig.add_subplot(111)
    ax.imshow(np.rot90(Z), cmap=plt.cm.jet,
                      extent=[xmin, xmax, ymin, ymax], 
                      aspect='auto')

    ax.set_ylabel(label)
    ax.set_xlabel("Year")
    ax.set_title(label+", "+str( min(df['Year']) )+"-"+str( max(df['Year']) ))

    ax.set_xlim([xmin, xmax])
    ax.set_ylim([ymin, ymax])
    
    fig.savefig('figs/multivariate_kde_'+key+'_yr.png')

    # ------------------
    # Now plot the multivariate KDE with the data points

    fig = plt.figure()

    ax = fig.add_subplot(111)
    ax.imshow(np.rot90(Z), cmap=plt.cm.jet,
                      extent=[xmin, xmax, ymin, ymax], 
                      aspect='auto')

    # Now plot the data as black dots
    ax.plot(mx, my, 'k.', markersize=3)

    ax.set_ylabel(label)
    ax.set_xlabel("Year")
    ax.set_title(label+", "+str( min(df['Year']) )+"-"+str( max(df['Year']) ))

    ax.set_xlim([xmin, xmax])
    ax.set_ylim([ymin, ymax])
    
    fig.savefig('figs/multivariate_kde_'+key+'_yr_points.png')

    plt.show()

{% endcodeblock %}



### <a name="hrvar"></a>Home Run Variance Plot

{% codeblock lang:python Home Run Variance Plot %}

# Change the aspect ratio to make time-variance trends more obvious 
fig = plt.figure(figsize=(10,3))
ax1 = fig.add_subplot(111)

# Compute a year-by-year variance (among all teams) for number of home runs 
hr_var = [np.var(df['HR'][df['Year']==yr]) for yr in unique(df['Year'])]

ax1.plot(unique(df['Year']),hr_var,'k-')

ax1.set_title('Variance, Home Runs Per Season')
ax1.set_xlabel('Year')
ax1.set_ylabel('HR Var')

# Add a red vertical line for Babe Ruth's 1927 60 home run record
ax1.axvline(x=1927,linewidth=2,color='r')

fig.savefig('figs/variance_HR_yrs.png')
plt.show()

{% endcodeblock %}



### <a name="socorr"></a>Strikeouts-Home Runs/Strikeouts-Hits Correlation Plot

To make the correlation plot, I had to loop over each year, extract the relevant pair of batting stats, 
then compute the covariance matrix with ```np.corrcoef()```. This returns a 2x2 matrix (the number of 
elements of the covariance matrix is equal to the number of dimensions, with each column and each row 
corresponding to a dimension).

The first element of the covariance matrix ```cov[0][0]``` is the autocorrelation of the first variable
with itself, while the second element of the covariance matrix ```cov[0][1]``` is the correlation of the 
first and second variable.

The covariance matrix is also symmetric, so we can use ```cov[0][1]``` and ```cov[1][0]``` interchangably.

See the [Numpy documentation](http://docs.scipy.org/doc/numpy/reference/generated/numpy.corrcoef.html) for more info.

{% codeblock lang:python Strikeouts-Home Runs/Strikeouts-Hits Correlation Plots %}

years = unique(df['Year'])
so_hr_corr = np.zeros(len(years),)
so_h_corr = np.zeros(len(years),)

for ii,yr in enumerate(years):

    strikeouts = df['SO'][df['Year']==yr].values

    home_runs = df['HR'][df['Year']==yr].values
    hits = df['H'][df['Year']==yr].values

    # Compute correlation between # of strikeouts team had
    # and number of home runs/hits a team had
    so_hr_corr[ii] = np.corrcoef(strikeouts,home_runs)[0][1]
    so_h_corr[ii] = np.corrcoef(strikeouts,hits)[0][1]

fig = plt.figure(figsize=(11,3))
ax1 = fig.add_subplot(111)

ax1.plot(years,so_hr_corr,'b-',label='SO-HR')
ax1.plot(years,so_h_corr,'r-',label='SO-H')

ax1.set_ylabel('SO-HR Corr')
ax1.set_xlabel('Year')
ax1.legend(loc='best')
ax1.set_xlim([1900,2020])

ax1.axhline(y=0,linewidth=1,color='k')

fig.savefig('figs/corr_HRSOH_yrs.png')

plt.show()

{% endcodeblock %}

### <a name="smoothedcorr"></a>Smoothing the Correlations

{% codeblock lang:python Strikeouts-Home Runs/Strikeouts-Hits Correlation Plots %}

# Same plot as above, but with smoothed data 
smoothed_so_hr_corr = interpolate.UnivariateSpline(years,so_hr_corr,k=5)
smoothed_so_h_corr  = interpolate.UnivariateSpline(years,so_h_corr ,k=5)

fig = plt.figure(figsize=(11,3))
ax1 = fig.add_subplot(111)

ax1.plot(years,so_hr_corr,'b-',label='SO-HR')
ax1.plot(years,so_h_corr,'r-',label='SO-H')

ax1.plot(years,smoothed_so_hr_corr(years),'b--')
ax1.plot(years,smoothed_so_h_corr(years),'r--')

ax1.set_ylabel('SO-HR Corr')
ax1.set_xlabel('Year')
ax1.legend(loc='best')

ax1.axhline(y=0,linewidth=1,color='k')

fig.savefig('figs/corr_smoothedHRSOH_yrs.png')

plt.show()

{% endcodeblock %}
