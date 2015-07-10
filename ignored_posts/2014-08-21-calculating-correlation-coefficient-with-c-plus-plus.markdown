---
layout: post
title: Calculating Correlation Coefficients with C++
date: 2014-08-21 15:22:08 -0700
comments: true
published: false
categories: [math, programming, statistics, correlation, correlation coefficient, github, gist, C++]
---

## Correlation Coefficient Definition

For two T-dimensional data vectors,

$$
x = \left( x_0, x_1, \dots, x_{T-1} \right) \\
y = \left( y_0, y_1, \dots, y_{T-1} \right)
$$

The linear correlation coefficient $r$ of the two vectors is:

$$
r \equiv \dfrac{ T \sum_{t=0}^{T-1} x_t y_t - \sum_{t=0}^{T-1} x_t \sum_{t=0}^{T-1} y_t }{ \sqrt{ \left( T \sum_{t=0}^{T-1} x_t^2 - \left[ \sum_{t=0}^{T-1} x_t \right]^2 \right) \left( T \sum_{t=0}^{T-1} y_t^2 - \left[ \sum_{t=0}^{T-1} y_t \right]^2 \right) }}
$$

The correlation is a measure of how strong the linear relationship is between $x$ and $y$. A correlation coefficient of 1 means that the two quantities are exactly linearly related:

y = cx implies r = 1

Likewise, an inverse relationship leads to a negative correlation coefficient:

y = - cx implies r = -1

and if there is absolutely no correlation between $x$ and $y$, the correlation coefficient is zero.

It is typical to report the value of r squared, to give a sense of the magnitude of r, independent of the sign.

## Calculating with C++ 

Here is a C++ function and driver for computing a correlation coefficient for user-entered data.


{% gist 365ba77ca0bb14a62ec6 %}


