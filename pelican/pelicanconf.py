#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import re
import os

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'charlesreid1'

PATH = 'content'
DEFAULT_LANG = u'en'

# the theme 
THEME = 'cmr-theme'



# ------------
# iPython Notebooks:

HOME = os.environ.get('HOME')

PLUGIN_PATHS = [HOME+'/codes/pelican-plugins/']

PLUGINS = ['render_math']

MARKUP = ('md')

# Don't try to turn HTML files into pages
READERS = {'html': None}




# --------------------
# Static stuff

STATIC_PATHS = ['img']




# --------------------
# Templates

# template stuff 
EXTRA_TEMPLATES_PATHS = []
TEMPLATE_PAGES = {}





# index 
EXTRA_TEMPLATES_PATHS.append('angular')
TEMPLATE_PAGES['index.html'] = 'index.html'
TEMPLATE_PAGES['contact.html'] = 'contact/index.html'
#TEMPLATE_PAGES['pgp.html'] = 'pgp/index.html'


# projects
EXTRA_TEMPLATES_PATHS.append('projects')
TEMPLATE_PAGES['projects.html'] = 'projects/index.html'
TEMPLATE_PAGES['projects.json'] = 'projects/projects.json'
TEMPLATE_PAGES['projects.css']  = 'projects/projects.css'
TEMPLATE_PAGES['projects_modcontrol.js'] = 'projects/projects_modcontrol.js'
 
# about
EXTRA_TEMPLATES_PATHS.append('about')
TEMPLATE_PAGES['about.html'] = 'about/index.html'
TEMPLATE_PAGES['about.css']  = 'about/about.css'
TEMPLATE_PAGES['about.json'] = 'about/about.json'
TEMPLATE_PAGES['about_modcontrol.js'] = 'about/about_modcontrol.js'





# --------------8<---------------------

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

TIMEZONE = 'America/Los_Angeles'
