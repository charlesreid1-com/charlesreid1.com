---
layout: post
title: Are Batting Stats Worthless? Part 1 of 3
date: 2014-09-06 14:48:18 -0700
comments: true
categories: [baseball, math, sabermetrics, statistics, scipy]
---

In my previous two posts ([here](http://charlesreid1.github.io/blog/2014/09/03/using-multivariate-kdes-to-examine-how-baseball-is-changing/) 
and [here](http://charlesreid1.github.io/blog/2014/08/31/kernel-density-functions-and-the-oakland-athletics/)), 
I've been doing some statistical analysis of 
a century of baseball batting stats, with interesting results. 
But what I've focused on hasn't been batting, so much as trends in how
batting statistics have changed over the course of over a century, 
and the way that reflects changes in the way baseball is played.

Part of the reason I haven't yet focused on the batting stats and how they
correlate with how good teams are is, batting statistics are hardly
clear indicators or predictors of a team's performance.

I wanted to tackle the question: are batting stats actually significant indicators
of a team's performance? Or are they just meaningless noise? Do teams that bat better
have a more statistically significant chance of being winners? 

## First, Some Stats

What I want to investigate is whether there is a relationship between winning
and (an arbitrary batting stat). (Why wins? Well, because winning is what baseball is all about.)
I can start with a simple "eyeball norm" - that is, a visual inspection
of the multivariate wins-(arbitrary batting stat) KDE, which will give me an approximation of the joint PDF 
of these two quantities.

### The KDE

Let's suppose that there is no relationship between (arbitrary batting stat) and (another arbitrary batting stat).
Then the two variables are random and independent, and the joint PDF of the two
will look like a bivariate normal distribution:

{% img /assets/bivariate_normal_distribution.png Bivariate Normal Distribution %}

When plotted as a contour plot, this looks like a circular blob.

If we have discrete values of our variables, we can compute a KDE based on the data.
If our data are independent, their KDE will look like a circular blob.

### Univariate Linear Regression Modeling

The next step beyond the "eyeball norm" of looking at the KDE is to create a linear
regression model of the data, where x and y are independent and dependent variables, respectively. 
In practice, for our batting data set, these are arbitrary batting stats (though typically,
y is a batting stat related to outcomes, like winning, while x is a batting stat related to
performance, like number of hits).

To keep things simple, I'll just consider univariate linear regression modeling first.

A univariate linear regression model for y versus x postulates a very simple linear 
relationship between our independet variable x and our dependent variable y. 
This relationship will look like this:

$$
y = \beta_{0} + \beta_{1} x 
$$

where y is the observable (dependent variable), x is the performance stat (independent variable),
and $$\beta_{0}$$ and $$\beta_{1}$$ are the coefficeints of the linear regression model.
(Note we could also transform x to be $$log(x)$$ or some other transform.)

Our model will never predict the next value of y exactly, so we have to account for the fact that
when solving for $$\beta_0$$ and $$\beta_1$$, we will always miss some effects. We can express this
by rewriting the above expression with the actual, computed values of everything (denoted with hats):

$$
y = \hat{ \beta_0 } + \hat{ \beta_1 } x + \epsilon
$$

and the actual model predictions, which won't match the data, are given by $$\hat{y}$$:

$$
\hat{y} = \hat{ \beta_0} + \hat{ \beta_1 } x
$$

and the residual (difference between model predictions and data) is:

$$
r = y - \hat{y} = \epsilon
$$

The $$\epsilon$$ term accounts for error in our model.

Our coefficient $$\beta_1$$ is key to telling us about the relationship between x and y.
We can perform statistical tests to tell us whether $$\hat{\beta_1}$$ is big enough to translate 
into a statistically significant relationship between x and y. For a univariate 
linear regression, this test is a t-test.

We can also check the values of $$\epsilon$$ to ensure that any assumptions we've made 
in our statistical tests are valid (namely, that errors are random, and not systematically
changing as a result of terms we've neglected to include in our model). 
These checks consist of quantile-quantile plots and residual plots.

### T-Tests

Once we've performed a linear regression of y vs. x and determined values for $$\hat{\beta_1}$$,
we can compute the variance attributed to each term in the model. We can then use this term-wise error 
to compute a t value, and use a Student's T distribution to determine whether this t value indicates
a term is statistically significant, or whether it is small enough to be drowned out by random noise.

The t-test involves checking a criteria:

$$
- t_{\alpha/2, dof-1} < T < t_{\alpha/2, dof-1}
$$

If this criteria *is* met, then T is small enough - small enough that the variance a
attributed to the linear regression term drowns out the magnitude of the coefficient,
so that we can accept the null hypothesis, that is, that $$\hat{\beta_1} \equiv 0$$.
While this may sound a bit confusing, we'll illustrate this below with an example.

Okay, enough statistics for now, let's get down to some sabermetric calculations!

## An Illustrated Example: Hits-Wins Correlation

I'll illustrate an example of how we can determine whether a batting statistic
has a statistically significant correlation with winning.

First, we'll look at a multivariate KDE of hits-wins. We can use that to make a
qualitative judgement about whether the two are correlated. Then we'll use some
statistical tests to judge whether the relationship is quantitatively significant.

I'm interested in wins because, clearly, it is the most important outcomes 
in a baseball season (the only thing more significant, really, is wins in the postseason).  

Before we start I'll mention that I decided to partition the data into American and National League.
Since around 1973, the [Designated Hitter rule](https://en.wikipedia.org/wiki/Designated_hitter) 
took effect in the American League. 
This rule allows teams to substitute a (power) hitter for the pitcher in the batting 
order, which creates a difference in game dynamics and hitting stats.
(While we could use an F-test to determine whether this is actually a significant 
factor, I'm going to assume outright that it is.)

Now onto the plots.

### Wins and Hits

Here's the bivariate KDE of wins vs. hits for 1973-2013:

{% img /assets/ALNL_multivariate_kde_H_w_1973-2013.png KDE, Hits vs Wins, 1970-2000. %}

It looks pretty round and normal, although there's some slight positive upward trending 
(meaning more hits correlates to more wins), particularly for the American League.

(Code for this plot included [below](#plotcode).)

The American League subplot shows a bit more structure, but again, the relationships are
all pretty slight. Based on an eyeball norm, we might decide that there's not much of a 
correlation between wins and hits.

But we'd just be guessing! We can't know how significant the relationship is *quantitatively* 
unless we perform some kind of significance test. As mentioned above, for univariate linear 
regression, the significance test we'll use is the t-test.

### An Aside: The Null Hypothesis

As mentioned above, we're performing linear regression of our points by using the data to solve for 
the coefficients of the model:

$$
y = \beta_0 + \beta_1 x
$$ 

and ultimately we're trying to understand whether y and x are related - i.e., $$\beta_1 > 0$$ - or 
whether they're completely independent - i.e., $$\beta_1 = 0$$.

We devise a test, then, that tests our "null hypothesis" $$H_0$$: 

$$
H0 : \beta_1 = 0 \\
H1 : \beta_1 \neq 0
$$

In other words, we can determine how much variance in the observable comes from the $$\beta_1$$ term of our model,
and if that variance is significant, it means the $$\beta_1$$ term is statistically significant.

The Student's T distribution is used to test this null hypothesis. The distribution tabulates 
"significant" values of variance given the number of degrees of freedom of the problem, and given
a probability level threshold (e.g., 80% or 95% or whatever you want).

### Wins and Hits: Linear Regression Results

If we do a linear regression of our wins-hits distribution for 1973-2013, we get the following relationship 
for the American League (scaling hits by number of games, so it is actually hits per game):

$$
\text{Win Pct} = -0.037 + 0.059 \text{HpG} 
$$ 

and for the National League we get:

$$
\text{Win Pct} = -0.0047 + 0.057 \text{HpG} 
$$ 

(Code for linear regression calculations included [below](#linear_regression).)

Now the question is whether 0.059 and 0.057 are large, relative to the 
variance due to the hits per game term, for us to say there's a relationship
between hits per game and our observable (win percentage).

### Variance Budget and T-Test

We can create a "variance budget" that quantifies how much variance can be attributed to which terms,
by using the covariance matrix of our linear regression model. The covariance matrix diagonals gives us the 
variance due to each term (in this case, our linear model has two terms, so our covariance matrix
is a two-by-two matrix).

If we do this for our hits-wins relationship, we get the following standard error values:

American League, 1973-2013:

$$
SE_{\beta 0} = \sqrt{C_{00}} = 0.051
$$

$$
SE_{\beta 1} = \sqrt{C_{11}} = 0.0056
$$

(where $$C_{ii}$$ is the value of the covariance matrix at index $$(i,i)$$).

National League, 1973-2013:

$$
SE_{\beta 0} = \sqrt{C_{00}} = 0.055
$$

$$
SE_{\beta 1} = \sqrt{C_{11}} = 0.0063
$$

Now, we can compute a t value for our linear relationship term $$\hat{\beta_1} x$$ 
for a t-test with the formula:

$$
T = \dfrac{\hat{\beta_1}}{SE(\hat{\beta_1})}
$$

The values of T for our hits-wins cases are:

$$T(\text{AL, 1973-2013}) = 10.55$$

$$T(\text{NL, 1973-2013}) = 9.12$$

Our null hypothesis is accepted if the following condition is met:

$$
\vert T \vert < t_{\alpha/2, dof-1}
$$

where $$t_{\alpha/2,dof-1}$$ is the critical value for the two-sided hypothesis
from the Students' t distribution. In the case of hits-wins, I used an alpha value
of 10%, with the following results:

AL, 1973-2013:

$$
H0(\text{10\%) = 10.55 < 1.28 = \text{False}
$$

NL, 1973-2013:

$$
H0(\text{10\%) = 9.12 < 1.28 = \text{False}
$$

In both cases, our criteria for accepting the null hypothesis was not met.
This means the hits-wins relationship is statistically significant in both cases,
and the hits-wins linear coefficient is too large to ignore.

(Code for variance and t-test calculations included [below](#variance_ttest).)

Conclusion? Hits and wins *do* correlate, and the correlation *is* statistically significant. 

Here is the corresponding output of the program (code given [below](#variance_ttest)):

{% codeblock %}
Win Pct: Univariate Linear Regression Significance Test
Now on year [1973, 2013]
    Stat: Hits
        League: AL
            y = beta_0 + beta_1 x = -0.037 + 0.059 x
            MSE(beta_0) = 0.051
            MSE(beta_1) = 0.0056
            T = 11
            Null Hypothesis Accepted? (10%) = 10.55 < 1.28 = False
            Null Hypothesis Accepted? ( 5%) = 10.55 < 1.65 = False
        League: NL
            y = beta_0 + beta_1 x = -0.0047 + 0.057 x
            MSE(beta_0) = 0.055
            MSE(beta_1) = 0.0063
            T = 9.1
            Null Hypothesis Accepted? (10%) = 9.12 < 1.28 = False
            Null Hypothesis Accepted? ( 5%) = 9.12 < 1.65 = False
{% endcodeblock %}

Since the null hypothesis was not accepted, we know that the linear regression 
of wins vs. hits returned a statistically significant linear coefficient - 
so hits and wins *do* correlate, even though, on first glance at the multivariate 
KDE, we may not have thought so.

### Quantile-Quantile and Residual Plots

But wait! There's more!

One thing we need to do is make sure that the assumptions tied up with the t-test 
actually hold for our data and linear regression model. In particular, we need to 
verify that the linear regression errors are normally distributed.

Recall that the linear regression errors come from the deviation between
the model and the data, since the model can't go thruogh *every* data point.
For each data point $$y$$ the model predicts a value $$\hat{y}$$:

$$
\hat{y} = \hat{\beta_0} + \hat{\beta_1} x
$$

so that the residual for point j is computed as:

$$
r_j = y_j - \hat{y_j} = y_j - \hat{\beta_0} - \hat{\beta_1} x_j
$$

The quantile-quantile plot then sorts these residuals from lowest to highest,
and applies the law of large numbers, which states that any random error,
when sampled a sufficiently large number of times, will be normally distributed,
in order to sort the quantiles from lowest to highest and find the corresponding
"rank" from a normal distribution.

Deviations from a straight line on quantile-quantile plots indicates a particularly
large residual, which could be an outlier data; if large clusters of points deviate
from the straight line, or if the residuals exhibit a pattern (a bowl shap,e for example),
this is an indcation that the linear regression functional form is not capturing all 
effects of the independent variable, and therefore the residuals still retain some 
functional relationship to x.

The quantile-quantile and residual plots for the hits-wins distribution for 1973-2013 is given below:

{% img /assets/ALNL_qq_H_w_linreg_1973-2013.png Quantile-Quantile and Residual Plots, Hits vs Wins Linear Regression, 1973-2013 %}

From the quantile-quantile plots, we only see one or two points that are major outliers; 
the data match the conditions required for the t-test very nicely: the QQ plots show straight lines,
meaning they're all normally distributed, and we can't see any patterns in the residuals, 
indicating there isn't an inherent bias in the residuals, so for the most part our model 
maps inputs to outputs well.

## Conclusions

We've created a script that will perform significance tests to determine whether batting stats are, in fact, significant.
In this post, I was illustrating my approach with the hits-wins correlation. In the next part of this two-part post, 
I'll show the results of the same analysis, but applied to a wider range of batting stats, so we can uncover some 
interesting relationships between a team's batting performance and their ability to win games.

Below is the Python code I used.

## The Code

I've broken up the Python script I used to perform the above analysis into chunks, described below.

You can find the full, final script on Github: [https://github.com/charlesreid1/sabermetrics/tree/master/Wins.py](https://github.com/charlesreid1/sabermetrics/tree/master/Wins.py)

### Import Statements, and Bringing In Data

As with prior posts, I'm using historical batting data collected from the good folks 
at [Baseball-Reference.com](http://baseball-reference.com). 

You can download all the data I'm using (CSV formatted) at Github: [https://github.com/charlesreid1/sabermetrics/tree/master/data](https://github.com/charlesreid1/sabermetrics/tree/master/data)

{% codeblock lang:python Import Statements %}

print "Loading pandas..."
from pandas import *
print "Done loading pandas."

import re
import matplotlib.pylab as plt
import numpy as np
from scipy import stats
from scipy.optimize import curve_fit
import statsmodels.api as sm

{% endcodeblock %}

Next, I'll define some functions for loading the data.
I want to be able to filter data based on league, 
and also change the window of time at which I'm looking.
I'll pass in a two-item list of years, ```cutoff_yr```,
with the first element being the starting year and the second
element being the ending year.

Then I'll define two convenience functions for getting
AL and NL data.

{% codeblock lang:python Loading Data %}

def load_data(cutoff_yr,league):

    df = read_csv('data/master_team_batting.csv')

    # Ignore years of baseball strikes
    df = df[ df['Year'] != 1981 ]
    df = df[ df['Year'] != 1994 ]

    # Limit to cutoff years
    df = df[ df['Year'] > cutoff_yr[0] ]
    df = df[ df['Year'] < cutoff_yr[1] ]

    df = df[ (df['Lg'].str.contains(league) ) ]

    # Add in data about singles
    df['1B'] = df['H'] - df['2B'] - df['3B'] - df['HR']

    # Win pct
    df['Wpct'] = df['W']/df['G']

    # Add runs per game column
    df['RpG'] = df['R']/df['G']
    df['HpG'] = df['H']/df['G']

    return df

def load_AL_data(cutoff_yr):
    return load_data(cutoff_yr,'AL')

def load_NL_data(cutoff_yr):
    return load_data(cutoff_yr,'NL')

{% endcodeblock %}

### <a name="plotcode"></a>Multivariate KDE Plots

Next, I define a function for generating multivariate KDEs for 
various batting stats versus wins.

{% codeblock lang:python Import Statements %}

def wins_multivariate_kdes():
    """ 
    Look at how different stats are distributed 
    versus wins, from cutoff_yr to present,
    by plotting the multivariate KDE
    (this is an eyeball-norm test)
    """

    # Use these lines if you want to look at a whole slew of KDE plots
    keys = ['H','1B','2B','3B','BB','HR','AB','DP','SLG','SO','BA','OPS','R','RpG','RBI','Fld%']
    labels = ['Hits','Singles','Doubles','Triples','Walks','Home Runs','At Bats','Hit Into Doub Play','Slugging Pct','Strikeouts','Batting Avg','OBP+SP','Runs','Runs per Game','RBIs','Fielding Pct']

    # Use these lines if you only want to look at hits
    keys = ['HpG']
    labels = ['Hits']

    cutoff_yrs = [[1973,2013]]

    wins_key = 'Wpct'
    wins_label = 'Win Pct'

    print wins_label+": Multivariate KDEs"

    for cutoff_yr in cutoff_yrs:
    
        print "Now on year",cutoff_yr
    
        for key, label in zip(keys,labels):
    
            print "    Stat:",label
        
            fig = plt.figure(figsize=(12,5))
            
            # Subplot 1 = American League
            # Subplot 2 = National League
            ax1 = fig.add_subplot(121)
            ax2 = fig.add_subplot(122)

            axes = { 'AL' : ax1,
                     'NL' : ax2 }
            
            load_data_function = { 'AL' : load_AL_data,
                                   'NL' : load_NL_data }
        
            for league in ['AL','NL']:
    
                df = load_data_function[league](cutoff_yr)
                ax = axes[league]
        
                mx = df[key].values
                my = df[wins_key].values
    
                # ensure we have consistent axes across all cutoff years
                lim_df = load_data_function[league](cutoff_yrs[0])
                lim_x = lim_df[wins_key].values
                lim_y = lim_df[key].values
    
                xmin = lim_x.min()
                xmax = lim_x.max()
                ymin = lim_y.min()
                ymax = lim_y.max()
                
                X, Y = np.mgrid[xmin:xmax:200j, ymin:ymax:200j]
                positions = np.vstack([X.ravel(), Y.ravel()])
                values = np.vstack([mx, my])
                kernel = stats.gaussian_kde(values)
                Z = np.reshape(kernel(positions).T, X.shape)
            
                ax.imshow(np.rot90(Z), cmap=plt.cm.jet,
                                  extent=[xmin, xmax, ymin, ymax], 
                                  aspect='auto')
                ax.set_xlabel(label)
                ax.set_ylabel(wins_label)
                ax.set_title(league + ": "+label+"-"+wins_label+" Joint PDF, "+str(cutoff_yr[0])+"-"+str(cutoff_yr[1]))
            
                ax.set_xlim([xmin, xmax])
                ax.set_ylim([ymin, ymax])
    
            plt.show()
    
            fig.savefig('figs/ALNL_multivariate_kde_'+key+'_w_'+str(cutoff_yr[0])+'-'+str(cutoff_yr[1]))
        
        plt.close('all')

{% endcodeblock %}

### <a name="linear_regression"></a>Linear Regression Calculations

I'll define a new function for computing linear regression coefficients,
performing t-test, and making quantile-quantile and residual plots.

{% codeblock lang:python Import Statements %}

def wins_regression_significance_test():
    """
    Do regression for wins vs. X,
    and determine if the regression
    coefficient is statistically significant
    """

    # Use these lines if you want to look at a whole slew of KDE plots
    keys = ['H','1B','2B','3B','BB','HR','AB','DP','SLG','SO','BA','OPS','R','RpG','RBI','Fld%']
    labels = ['Hits','Singles','Doubles','Triples','Walks','Home Runs','At Bats','Hit Into Doub Play','Slugging Pct','Strikeouts','Batting Avg','OBP+SP','Runs','Runs per Game','RBIs','Fielding Pct']

    # Use these lines if you only want to look at hits
    keys = ['HpG']
    labels = ['Hits']

    cutoff_yrs = [[1973,2013]]

    wins_key = 'Wpct'
    wins_label = 'Win Pct'

    print wins_label+": Univariate Linear Regression Significance Test"

    for cutoff_yr in cutoff_yrs:
    
        print "Now on year",cutoff_yr
    
        for key, label in zip(keys,labels):

            print "    Stat:",label

            load_data_function = { 'AL' : load_AL_data,
                                   'NL' : load_NL_data }

            fig = plt.figure(figsize=(12,10))

            # Plot QQ/residual plots for both leagues on one plot
            ax1 = fig.add_subplot(221)
            ax2 = fig.add_subplot(222)
            ax3 = fig.add_subplot(223)
            ax4 = fig.add_subplot(224)

            axes = { 'AL' : [ax1, ax3],
                     'NL' : [ax2, ax4] }

            for league in ['AL','NL']:

                print "        League:",league

                df = load_data_function[league](cutoff_yr)
        
                mx = df[key].values
                my = df[wins_key].values

                # Use scipy curve fit
                coeff, covar_matrix = curve_fit(curve_fit_function,mx,my)

{% endcodeblock %}

### <a name="variance_ttest"></a>Variance Budget and T-Test

From the above code, our linear regression coefficients 
$$\hat{\beta_0}$$ and $$\hat{\beta_1}$$ are now stored
in ```coeff[0]``` and ```coeff[1]```. Now we begin the variance
budget and t-test calculations:

{% codeblock lang:python Import Statements %}

                # We are testing the null hypothesis: 
                # H0: slope = 0
                # H1: slope != 0

                # Test statistic:
                # T0 = \hat{\beta_1} / SE(\hat{\beta_1})
                # (SE = standard error)

                # Compute standard error,
                # which is the sqrt of the covariance matrix
                variance = np.diagonal(covar_matrix) 
                SE = np.sqrt(variance)

                # Null hypothesis test statistic
                b0 = coeff[0]
                SE_b0 = SE[0]

                b1 = coeff[1]
                SE_b1 = SE[1]

                T = b1/SE_b1

                # For effect to be insignificant,
                # and null hypothesis to be accepted,
                # -t_{alpha/2,n-2} < T0 < +t_{alpha/2,n-2}
                # or,
                # | T0 | < t_{alpha/2,n-2}
                #
                # For effect to be significant,
                # and null hypothesis to be rejected,
                # | T0 | >= t_{alpha/2,n-2}

                alpha = [0.10, 0.05]

                Nobs = len(my)
                Nparams = len(coeff)
                dof = Nobs - Nparams - 1
                t10, t05 = stats.t.isf(alpha,dof)
                
                print "            y = beta_0 + beta_1 x = %0.2g + %0.2g x"%(b0,b1)
                print "            MSE(beta_0) = %0.2g"%(SE_b0)
                print "            MSE(beta_1) = %0.2g"%(SE_b1)
                print "            T = %0.2g"%(T)
                print "            Null Hypothesis Accepted? (10%%) = %0.2f < %0.2f ="%(abs(T),t10), abs(T) < t10
                print "            Null Hypothesis Accepted? ( 5%%) = %0.2f < %0.2f ="%(abs(T),t05), abs(T) < t05


{% endcodeblock %}

### <a name="qqresid"></a>Quantile-Quantile and Residual Plots

Finally, let's compute our residuals, create a quantile-quantile plot
for the residuals, and plot them.

If our errors are normally distributed, the quantile-quantile plot will 
look like a straight line. Any deviation from the straight line is an 
indication that our model isn't capturing the entire relationship
between x and y. 

Plotting the residuals alongside the quantile-quantile plot can help us
immediately diagnose where the outliners are coming from.

{% codeblock lang:python Import Statements %}

                # Compute residuals
                resid = my - (b0 + b1*mx)

                # Quantile-quantile and residual plots
                axis1 = axes[league][0]
                axis2 = axes[league][1]

                # Quantile-quantile plot:
                axis1.set_title(league + ": "+label+"-Wins Lin Reg\nQQ/Resid Plots "+str(cutoff_yr[0])+"-"+str(cutoff_yr[1]))
                sm.qqplot(resid,ax=axis1)

                # Quantile-quantile line:
                osm, _ = stats.probplot(resid)
                quants = osm[0]
                sm.qqline(ax=axis1,line='s',x=quants,y=resid)

                # Residual plot
                axis2.plot(mx,np.abs(resid),'bo')
                
            fig.savefig('figs/ALNL_qq_'+key+'_w_linreg_'+str(cutoff_yr[0])+'-'+str(cutoff_yr[1])+'.png')

            # Remove the commented line to save memory 
            plt.show()
            plt.close('all')

{% endcodeblock %}

### <a name="linear_regression_function"></a>Linear Regression Function

We have to define the function to which we are trying to regress the data.
This function handle is then passed to the linear regression routine.
This is our simple linear relationship $$y = \beta_0 + \beta_1 x$$:

{% codeblock lang:python Linear Regression Function %}

def curve_fit_function(x,b0,b1):
    return b0 + b1*x

{% endcodeblock %}

### <a name="driver"></a>The Driver

Since all of our code is in functions, we need to define which functions
we want Python to run when we execute the command ```python Wins.py```.
This happens here:

{% codeblock lang:python Driver %}

if __name__=="__main__":
    wins_multivariate_kdes()
    wins_regression_significance_test()

{% endcodeblock %}

If you only want to run one analysis, comment out the other function calls.



