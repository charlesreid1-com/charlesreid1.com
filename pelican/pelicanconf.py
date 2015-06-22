#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
import re
import os

SITEURL = ''
AUTHOR = u'charlesreid1'
SITENAME = u'charlesreid1'

PATH = 'content'
TIMEZONE = 'America/Los_Angeles'
DEFAULT_LANG = u'en'

# the theme 
THEME = 'simple-angular'


# -------------------
# ipython notebooks

HOME = os.environ.get('HOME')

PLUGIN_PATHS = [HOME+'/codes/pelican-plugins/']

PLUGINS = ['liquid_tags','render_math']

MARKUP = ('md')


# Don't try to turn HTML files into pages
READERS = {'html': None}


# --------------------
# Templates


# template locations 
EXTRA_TEMPLATES_PATHS = ['angular']

# template files 
TEMPLATE_PAGES = {}



# ---------------------
# Blaaaaaarg 

# blaaarg
TEMPLATE_PAGES['blog.html'] = 'blog/index.html'

# time formats for blaaaarg
DATE_FORMATS = {'en': '%A %m/%d/%Y',}

# month formatting filter for blaaaaaaarg
from datetime import datetime
def int_to_month (m_int):
    """Turns an integer month into a long month."""
    d = datetime(year=2014, day=1, month=m_int)
    return d.strftime("%B")

JINJA_FILTERS = {'month_name':int_to_month}




# -------------------------
# Pages

# our custom index page
TEMPLATE_PAGES['index.html'] = 'index.html'
#TEMPLATE_PAGES['dox.css'] = 'dox.css'


# hello angular world
TEMPLATE_PAGES['hello.html'] = 'hello/index.html'






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
