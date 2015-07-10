---
layout: post
title: Are Batting Stats Worthless? Part 2 of 3
date: 2014-09-12 14:26:30 -0700
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

_This is the second post in a three-part series. See part 1 [here](http://charlesreid1.github.io/blog/2014/09/06/are-batting-stats-worthless/)._

Last time we looked at the results of some statistical tests of batting data 
to see if there was a statistically significant relationship between 
a team's wins and a team's batting stats.

We looked at a simple example, wherein we aggregated batting stats across all teams on a 
per-league basis, and found that in all cases, the linear coefficients of regression 
between hits and wins were statistically significant.

## Too Much Data?

There's a slight problem, however: we were aggregating a lot of data. 
As the data set gets bigger, as the number of degrees of freedom goes up, 
we run the risk of *always* finding a significant regression coefficient,
and of our "significance" becoming... well, insignificant.

With large data sets, we often end up finding spurious relationships, 
so the question is no longer *whether* there is a relationship (i.e., 
do we reject the null hypothesis), but whether the relationships we find
are actually significant.

What this means, in practice, is that we should trim our data set
by blocking - separating the data into distinct groups - and we have
some convenient blocks with our baseball data set, in the form of teams.

## Blocked By Team

I repeated the same analysis as before, performing a linear regression of wins versus 
hits, but this time I did it by team, to reduce the amount of data being regressed.
This gives the results of the significance test a little more meaning. 

It also leads to some results that spotlight how a few teams in particular perform
much differently than the others.

Here's the plan of attack: we'll look at how aggregating batting stats for 
all teams led to conclusions about correlations between wins and hits, 
then we'll examine the team-by-team results and see if things look different
and why.

## The Hypothesis Test

We'll perform the same hypothesis test as before. Here's a rundown:

First, we are linearly regressing the data $$x$$ and $$y$$ to the function:

$$
y = \beta_{0} + \beta_{1} x 
$$

which results in parameter estimates for $$\beta_0$$ and $$\beta_1$$.
The estimates are indicated by a hat, and our regression model is given by:

$$
\hat{y} = \hat{ \beta_0 } + \hat{ \beta_1 } x
$$

Our significance test determines whether the variance (error) due to the linear term
$$\hat{\beta1} x$$ is significant when compared to the coefficient value $$\hat{\beta_1}$$.

This is the same thing as testing the null hypothesis:

$$
H0 : \beta_1 = 0 \\
H1 : \beta_1 \neq 0
$$

We perform this test by calculating the standard error due to the linear term, 
$$SE(\beta_1)$$, and constructing a t-test value,

$$
T = \frac{\hat{\beta_1}}{SE(\hat{\beta_1})}
$$

then we check a condition to see if we accept the null hypothesis:

$$
\vert T \vert < t_{\alpha/2, dof-1}
$$

where $$t_{\alpha/2,dof-1}$$ is the critical value for the two-sided hypothesis
from the Students' t distribution.

$$y$$ will be wins, as before, because wins are the most important stat a team has.

## Hits-Wins T-Test

As in the last post, I performed a t-test to see if a linear regression of 
hits versus wins creates a statistically significant regression coefficient.
I'm looking at the date range of 1973-2013, i.e., the date when the 
[Designated Hitter rule](https://en.wikipedia.org/wiki/Designated_hitter) 
took effect all the way up to the present.

There are basically three cases:

* Null hypothesis is accepted - this team's record shows that there's no connection
    between how many hits they got and how many wins they got

* Null hypothesis is rejected - the data indicates that hits and wins have a significant
    coefficient of linear regression, meaning their relationship is significant 

* Null hypothesis is borderline accepted/rejected - sometimes we might accept or reject 
    the null hypothesis depending on the significance level (the $$\alpha$$ value) that we pick.

### Null Hypothesis Accepted

There are a couple of teams whose batting data lead us to accept the null hypothesis.
Here's some selected output from the Python t-test code:

{% codeblock %}

Now on year [1973, 2013]
  Stat: Hits
    Team: bal
            y = beta_0 + beta_1 x = 1418.4 + 50.5 x
            MSE(beta_0) = 90.4656024659
            MSE(beta_1) = 180.487757242
            T = 0.279902158516
            Null Hypothesis Accepted? (10%) = 0.28 < 1.31 = True
            Null Hypothesis Accepted? ( 5%) = 0.28 < 1.6909 = True
    Team: col
            y = beta_0 + beta_1 x = 1565.6 - 71.7 x
            MSE(beta_0) = 203.469679458
            MSE(beta_1) = 427.633619553
            T = -0.167700646757
            Null Hypothesis Accepted? (10%) = 0.17 < 1.34 = True
            Null Hypothesis Accepted? ( 5%) = 0.17 < 1.7459 = True
    Team: kcr
            y = beta_0 + beta_1 x = 1408.4 + 153.7 x
            MSE(beta_0) = 85.4595587073
            MSE(beta_1) = 176.853435084
            T = 0.868968936535
            Null Hypothesis Accepted? (10%) = 0.87 < 1.31 = True
            Null Hypothesis Accepted? ( 5%) = 0.87 < 1.6909 = True

{% endcodeblock %}

Here, bal refers to the Baltimore Orioles, col the Colorado Rockies, and 
kcr the Kansas City Royals.

The Rockies and Royals are both franchise teams who sprouted up 
after 1973, meaning they'll have fewer data points in their batting stats.
But the Orioles have been around for over a century, and are a well-established
baseball team.

You can see, just from the magnitude of the slope $$\beta_1$$ relative to the intercept $$\beta_0$$, that
these teams are bound to have a pretty weak relationship between hits and wins. The advantage of the 
t-test, of course, is that we can account for all the variance information contained in the model to quantify 
values at which those slopes are insignificant.

So, what causes the null hypothesis to be rejected? Let's look at the multivariate
hits-wins KDE of these three teams.

First, the Orioles:

{% img /assets/teamwins_multivariate_kde_bal_H_w_1973-2013.png Baltimore Orioles Hits vs. Wins KDE, 1973-2013. %}

This is a bimodal distribution, with no distinct trend - the data are scattered all over the place. 
Take a look at the linear regression quantile-quantile plot and residuals plot for the Orioles:

{% img /assets/teamwins_qq_bal_H_w_linreg_1973-2013.png Baltimore Orioles QQ and Residual Plots, 1973-2013. %}

Clearly, the residuals are all normal and don't exhibit any trends. Based on our acceptance of the null hypothesis,
and the fact that our residuals are all normally distributed, it means that for the Orioles, hits and wins are 
completely random, in a statistical sense, and are completely independent.

We can see the same thing with the Colorado Rockies data, also bimodal:

{% img /assets/teamwins_multivariate_kde_col_H_w_1973-2013.png Colorado Rockies Hits vs. Wins KDE 1973-2013. %}

However, the quantile-quantile and residuals plots show that the residuals aren't normally distributed:

{% img /assets/teamwins_qq_col_H_w_linreg_1973-2013.png Colorado Rockies QQ and Residual Plots, 1973-2013. %}

We can see that the quantiles fall into two groups: residuals for one group are smaller than normal, 
and residuals for the other group are larger than normal. These two clusters show up on the KDE as 
two modes. But if we *were* to split these data into two groups, and we performed a linear regression 
on the individual groups, we would find a trend that is the opposite of what we'd expect: for both groups,
the slope $$\hat{\beta_1}$$ is *negative*! The more hits they get, the more likely they are to lose!
I'd hate to be a Rockies fan.

Lastly, the Kansas City Royals data show the same trend. The KDE is not bimodal, but it is completely flat:

{% img /assets/teamwins_multivariate_kde_kcr_H_w_1973-2013.png Kansas City Royals Hits vs. Wins KDE 1973-2013. %}

and the quantile-quantile and residuals plot show normally distributed residuals (with a single outlier point, 
which we can identify from the KDE plot above):

{% img /assets/teamwins_qq_kcr_H_w_linreg_1973-2013.png Kansas City Royals QQ and Residual Plots, 1973-2013. %}

meaning, once again, that for the Kansas City Royals, hits and wins are statistically independent. 



### Null Hypothesis Borderline Accepted/Rejected

To understand the influence of the significance level $$\alpha$$, I was testing two different values:
5% (more conservative) and 10% (less conservative). This led to a couple of teams for which the null hypothesis 
was rejected for the less conservative 10%, meaning we're more likely to have a false-positive identification of 
relationships, but accepted at 5%, where we have set more stringent criteria.

{% codeblock %}

Now on year [1973, 2013]
  Stat: Hits
    Team: ari
            y = beta_0 + beta_1 x = 1256.7 + 340.8 x
            MSE(beta_0) = 98.9963093294
            MSE(beta_1) = 196.19568386
            T = 1.73684123252
            Null Hypothesis Accepted? (10%) = 1.74 < 1.36 = False
            Null Hypothesis Accepted? ( 5%) = 1.74 < 1.7823 = True
    Team: bos
            y = beta_0 + beta_1 x = 1353.8 + 332.6 x
            MSE(beta_0) = 137.291176683
            MSE(beta_1) = 252.029296168
            T = 1.3197768809
            Null Hypothesis Accepted? (10%) = 1.32 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 1.32 < 1.6909 = True
    Team: fla
            y = beta_0 + beta_1 x = 1261.7 + 332.9 x
            MSE(beta_0) = 111.265276592
            MSE(beta_1) = 232.384840583
            T = 1.43267122465
            Null Hypothesis Accepted? (10%) = 1.43 < 1.34 = False
            Null Hypothesis Accepted? ( 5%) = 1.43 < 1.7459 = True

{% endcodeblock %}

Once again, we have two franchise teams that sprouted up after 1973 (Arizona Diamondbacks
and Florida Marlins), and one well-established baseball team (Bostom Red Sox).

All three teams have similar slopes for their linear regression models, around 330. 
But looking at the T value, we can see that the Diamondbacks hits-wins correlation
is stronger - meaning, our $$\alpha$$ value has to be more conservative (close to 5%) 
for us to accept the null hypothesis and conclude there's no relationship between 
hits and wins for the Diamondbacks.

The Diamondbacks hits-wins KDE also gives the impression, on first glance, that
hits and wins are correlated:

{% img /assets/teamwins_multivariate_kde_ari_H_w_1973-2013.png Arizona Diamondbacks Hits vs. Wins KDE, 1973-2013. %}

but the quantile-quantile plot shows the residuals aren't randomly distributed, 
meaning our t-test may not even be fair to run:

{% img /assets/teamwins_qq_ari_H_w_linreg_1973-2013.png Arizona Diamondbacks QQ and Residual Plots, 1973-2013. %}

The QQ plot is important because it tells us the linear relationship isn't the right relationship
to regress on - if we were to use something like a second order polynomial, we'd end up with a better fit.
This would lead to a significance test on both the first order and second order terms,
which would probably show us that there is, in fact, a strong relationship between 
hits and wins - confirming our initial impression from looking at the KDE.

For the Red Sox, by contrast, the T value (1.32) is just a hair above the critical t value
for the 10% level (1.31), meaning we don't have to be as conservative to accept the null
hypothesis. It's borderline even at a level of 10%. 

Is this splitting hairs? Not exactly. Take a look at the hits-wins KDE for the Red Sox:

{% img /assets/teamwins_multivariate_kde_bos_H_w_1973-2013.png Boston Red Sox Hits vs. Wins KDE, 1973-2013. %}

Notice the three major outlier points: the position of these outliers 
means they end up strengthening the hits-wins relationship (i.e., increasing the 
regression coefficient $$\beta_1$$). If we removed any or all of them, we would end up 
with a smaller slope $$\beta_1$$, and therefore a smaller T, and therefore 
we would accept the null hypothesis at the higher significance level. 
This would put the Red Sox in the same category as the Orioles, the Rockies,
and the Royals, of teams whose hitting stats are independent of wins.

In other words, a couple of poor seasons (few hits and few wins) is what ended up 
strengthening the relationship between Red Sox hits and Red Sox wins.

You can see the three outliers on the quantile-quantile plot:

{% img /assets/teamwins_qq_bos_H_w_linreg_1973-2013.png Boston Red Sox QQ and Residual Plots, 1973-2013. %}

Other than those three points, however, the residuals are all normally
distributed, meaning our linear regression model describes the data well,
and the conclusions of our t-test are valid.

### Null Hypothesis Rejected

For the remaining teams, the null hypothesis was rejected - so the regression coefficient 
of wins vs. hits is large enough to be significant. Here's some output from the Python code:

{% codeblock %}

Now on year [1973, 2013]
  Stat: Hits
    Team: ana
            y = beta_0 + beta_1 x = 1064.0 + 766.9 x
            MSE(beta_0) = 114.135542395
            MSE(beta_1) = 222.597033096
            T = 3.44540393458
            Null Hypothesis Accepted? (10%) = 3.45 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.45 < 1.6909 = False
    Team: atl
            y = beta_0 + beta_1 x = 1197.0 + 413.8 x
            MSE(beta_0) = 77.3537176191
            MSE(beta_1) = 146.503553215
            T = 2.82454728414
            Null Hypothesis Accepted? (10%) = 2.82 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.82 < 1.6909 = False
    Team: chc
            y = beta_0 + beta_1 x = 1229.9 + 431.5 x
            MSE(beta_0) = 73.2267711631
            MSE(beta_1) = 151.974707581
            T = 2.83928341829
            Null Hypothesis Accepted? (10%) = 2.84 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.84 < 1.6909 = False
    Team: chw
            y = beta_0 + beta_1 x = 1192.8 + 518.2 x
            MSE(beta_0) = 105.352721234
            MSE(beta_1) = 207.659445924
            T = 2.49555528054
            Null Hypothesis Accepted? (10%) = 2.50 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.50 < 1.6909 = False
    Team: cin
            y = beta_0 + beta_1 x = 1207.2 + 422.4 x
            MSE(beta_0) = 85.1239691159
            MSE(beta_1) = 165.205155753
            T = 2.55665473004
            Null Hypothesis Accepted? (10%) = 2.56 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.56 < 1.6909 = False
    Team: cle
            y = beta_0 + beta_1 x = 1173.4 + 624.9 x
            MSE(beta_0) = 84.9828829945
            MSE(beta_1) = 172.353289328
            T = 3.625447849
            Null Hypothesis Accepted? (10%) = 3.63 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.63 < 1.6909 = False
    Team: det
            y = beta_0 + beta_1 x = 1145.6 + 643.0 x
            MSE(beta_0) = 72.5203656996
            MSE(beta_1) = 148.885401688
            T = 4.31865956481
            Null Hypothesis Accepted? (10%) = 4.32 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.32 < 1.6909 = False
    Team: hou
            y = beta_0 + beta_1 x = 1206.6 + 416.3 x
            MSE(beta_0) = 76.5402963656
            MSE(beta_1) = 151.651834834
            T = 2.74487518766
            Null Hypothesis Accepted? (10%) = 2.74 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.74 < 1.6909 = False
    Team: lad
            y = beta_0 + beta_1 x = 1164.0 + 472.5 x
            MSE(beta_0) = 110.648795848
            MSE(beta_1) = 207.970967409
            T = 2.27172184729
            Null Hypothesis Accepted? (10%) = 2.27 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.27 < 1.6909 = False
    Team: mil
            y = beta_0 + beta_1 x = 1078.7 + 750.5 x
            MSE(beta_0) = 80.2553078111
            MSE(beta_1) = 164.421144006
            T = 4.56440091379
            Null Hypothesis Accepted? (10%) = 4.56 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.56 < 1.6909 = False
    Team: min
            y = beta_0 + beta_1 x = 1214.2 + 581.4 x
            MSE(beta_0) = 61.0149326907
            MSE(beta_1) = 123.668665082
            T = 4.70101831412
            Null Hypothesis Accepted? (10%) = 4.70 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.70 < 1.6909 = False
    Team: nym
            y = beta_0 + beta_1 x = 1157.1 + 488.8 x
            MSE(beta_0) = 70.511441672
            MSE(beta_1) = 140.508742501
            T = 3.47897333209
            Null Hypothesis Accepted? (10%) = 3.48 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.48 < 1.6909 = False
    Team: nyy
            y = beta_0 + beta_1 x = 1091.4 + 730.7 x
            MSE(beta_0) = 100.386815897
            MSE(beta_1) = 175.959299028
            T = 4.15243326874
            Null Hypothesis Accepted? (10%) = 4.15 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.15 < 1.6909 = False
    Team: oak
            y = beta_0 + beta_1 x = 1226.4 + 335.2 x
            MSE(beta_0) = 73.4215233383
            MSE(beta_1) = 141.710392159
            T = 2.36573315057
            Null Hypothesis Accepted? (10%) = 2.37 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.37 < 1.6909 = False
    Team: phi
            y = beta_0 + beta_1 x = 1122.5 + 605.6 x
            MSE(beta_0) = 84.3663214197
            MSE(beta_1) = 162.888686871
            T = 3.71780920179
            Null Hypothesis Accepted? (10%) = 3.72 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.72 < 1.6909 = False
    Team: pit
            y = beta_0 + beta_1 x = 1191.9 + 483.8 x
            MSE(beta_0) = 76.6513500717
            MSE(beta_1) = 158.875262553
            T = 3.04491718449
            Null Hypothesis Accepted? (10%) = 3.04 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.04 < 1.6909 = False
    Team: sdp
            y = beta_0 + beta_1 x = 1247.1 + 291.3 x
            MSE(beta_0) = 82.9578827209
            MSE(beta_1) = 171.945490381
            T = 1.69402583587
            Null Hypothesis Accepted? (10%) = 1.69 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 1.69 < 1.6909 = False
    Team: sea
            y = beta_0 + beta_1 x = 1086.7 + 768.7 x
            MSE(beta_0) = 84.7709697217
            MSE(beta_1) = 178.406792349
            T = 4.30856015621
            Null Hypothesis Accepted? (10%) = 4.31 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.31 < 1.6955 = False
    Team: sfg
            y = beta_0 + beta_1 x = 1081.0 + 643.3 x
            MSE(beta_0) = 87.5451794563
            MSE(beta_1) = 170.795303548
            T = 3.76631022295
            Null Hypothesis Accepted? (10%) = 3.77 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 3.77 < 1.6909 = False
    Team: stl
            y = beta_0 + beta_1 x = 1139.4 + 609.2 x
            MSE(beta_0) = 121.252724351
            MSE(beta_1) = 230.684787081
            T = 2.64100529394
            Null Hypothesis Accepted? (10%) = 2.64 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.64 < 1.6909 = False
    Team: tbd
            y = beta_0 + beta_1 x = 1627.3 - 440.5 x
            MSE(beta_0) = 86.7986021937
            MSE(beta_1) = 187.886144299
            T = -2.34451802769
            Null Hypothesis Accepted? (10%) = 2.34 < 1.36 = False
            Null Hypothesis Accepted? ( 5%) = 2.34 < 1.7823 = False
    Team: tex
            y = beta_0 + beta_1 x = 1179.3 + 629.1 x
            MSE(beta_0) = 136.339221006
            MSE(beta_1) = 272.265176226
            T = 2.3105689686
            Null Hypothesis Accepted? (10%) = 2.31 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.31 < 1.6909 = False
    Team: tor
            y = beta_0 + beta_1 x = 1124.8 + 674.4 x
            MSE(beta_0) = 77.1147661731
            MSE(beta_1) = 153.33284599
            T = 4.39843257515
            Null Hypothesis Accepted? (10%) = 4.40 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 4.40 < 1.6955 = False
    Team: wsn
            y = beta_0 + beta_1 x = 1248.2 + 304.7 x
            MSE(beta_0) = 66.4421617912
            MSE(beta_1) = 137.261013328
            T = 2.21995908609
            Null Hypothesis Accepted? (10%) = 2.22 < 1.31 = False
            Null Hypothesis Accepted? ( 5%) = 2.22 < 1.6909 = False

{% endcodeblock %}

But wait - did you notice something unusual about the Devil Rays t-test results?

{% codeblock %}

Now on year [1973, 2013]
  Stat: Hits
    Team: tbd
            y = beta_0 + beta_1 x = 1627.3 - 440.5 x
            MSE(beta_0) = 86.7986021937
            MSE(beta_1) = 187.886144299
            T = -2.34451802769
            Null Hypothesis Accepted? (10%) = 2.34 < 1.36 = False
            Null Hypothesis Accepted? ( 5%) = 2.34 < 1.7823 = False

{% endcodeblock %}

Notice the negative slope - like the Rockies, the Devil Rays have a negative hits-wins relationship! 
And like the Rockies, the Devil Rays are a young franchise team. The Devil Rays have a short history 
of poor win-loss stats. In some sense, their whole team history is all a statistical fluke.

## Conclusions

We split up the data into blocks, team-by-team, to reduce the number of data points and potentially
identifying spurious relationships. This analysis led to some interesting conclusions about particular
teams - we saw that five franchise teams had some unusual hits-wins relationships, in contrast to
the majority of other major league teams. But we also saw that this wasn't due only to being a franchise 
team: the Orioles and Red Sox lacked strong relationships between hits and wins as well.

Overall, it is difficult to draw strong conclusions about the hits-wins relationship, but for most teams
and with a large sample size, the two tend to be positively correlated. And that's a start - 
without the statistical analysis we've performed, it would be next to impossible to say anything 
quantitative about the relationship between the two stats.

