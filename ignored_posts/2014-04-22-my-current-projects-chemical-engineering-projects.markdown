---
layout: post
title: My Current Projects: Chemical Engineering Projects
date: 2014-04-22 22:55:14 -0700
comments: true
categories: [chemical engineering, projects, github, cantera, graph theory]
---

*This is part 2 of a multi-part series.*

This post is a rundown of some of my ongoing chemical engineering
projects that are hosted on Github.

## Graphene

[http://github.com/charlesreid1/Graphene](http://github.com/charlesreid1/Graphene)

Graphene is still in the conceptual phase.
It is a library that uses D3, Cantera, 
and Pandas for visualization and analysis of 
chemical reaction networks. 

This Python library would enable the generation of 
reaction networks for a region of thermochemical 
state space, or for a simulated reactor profile. 
It could reveal underlying patterns in the 
reaction network and their dependence on 
thermodynamic conditions.

Some basic work has gone into the abstraction
of chemical reaction networks as bivariate graphs,
with one group of nodes being reactions, 
and the other group of nodes being species.

This concept has been implemented using NetworkX.
The simulations are run with Cantera.
Pandas extracts information about the 
reaction rates, heat release rates, 
reactants, products, enthalpies, 
chemical potentials, etc., and stores 
all that information in Pandas DataFrames.

### Visualization with D3

D3 can be used to make force graphs where 
various nodes are connected with "springs"
(or edges). This is one of the clearest
ways to represent the reaction network: 
nodes can be manipulated by dragging/moving,
clicking or hovering can reveal additional
information about edges and nodes, 
such as net, forward, or reverse reaction rates,
stoichiometric coefficients, heat release rates,
and so on.

This could be made quite spiffy with some 
sliders, radio buttons, and other controls
to modify how the force graph works,
where in the reactor/thermochemical state 
space the current force graph is from,
or modifying the number of nodes or edges
shown on the graph (for more or less clutter).

None of this is stuff that I know how to do yet
with D3, however.

### Analysis with Pandas

The Pandas DataFrames can be analyzed using
less elaborate methods than D3. 

For example, a simple ranking of the 
reaction rates with the fastest 
mass production rate, or with the largest
heat release, can reveal important 
information.

## Pantera

[http://github.com/charlesreid1/pantera](http://github.com/charlesreid1/pantera)

Pantera (like the metal band!) is a Python toolbox for Cantera. 
It utilizes and extends Cantera functionality,
and was created in part to demonstrate the use
of object-oriented programming principles 
(inheritance) to extend Cantera's functionality
and to create new abstractions.

The idea for Pantera developed in parallel with the 
idea for the Cantera book (discussed below). 
Pantera was developed in part to illustrate 
how Cantera works and how it can be used,
so it is a central part of Part 2 of the book.

## The Cantera Book

[http://github.com/charlesreid1/cantera-book](http://github.com/charlesreid1/cantera-book)

This is still very much a work in progress,
but I have been assembling notes on the 
use of Cantera and have been developing 
them into a book.

What I've got so far is an outline, and 
it's here: [http://github.com/charlesreid1/cantera-book](http://github.com/charlesreid1/cantera-book)

I finally settled on Octopress as a format 
for the book, since it has a good interface,
free hosting via Github, and can use Markdown.

I've already got quite a bit of content on 
my webpage, [http://charlesmartinreid.com/wiki/CanteraOutline](http://charlesmartinreid.com/wiki/CanteraOutline),
so right now I'm converting what I've got.
Next steps include finishing the rest of the
book content, and further developing Pantera 
in parallel. 


