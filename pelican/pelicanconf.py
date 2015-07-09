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
THEME = 'cmr-theme'



# ------------
# iPython Notebooks:

HOME = os.environ.get('HOME')

PLUGIN_PATHS = [HOME+'/codes/pelican-plugins/']

PLUGINS = ['liquid_tags','render_math']

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

# hello angular world
TEMPLATE_PAGES['hello.html'] = 'hello/index.html'


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

TEMPLATE_PAGES['auto.html'] = 'about/auto.html'

# consulting
EXTRA_TEMPLATES_PATHS.append('consulting')
TEMPLATE_PAGES['consulting.html']           = 'consulting/index.html'
TEMPLATE_PAGES['consulting.css']            = 'consulting/consulting.css'
TEMPLATE_PAGES['consulting.json']           = 'consulting/consulting.json'
TEMPLATE_PAGES['consulting_modcontrol.js']  = 'consulting/consulting_modcontrol.js'



# writing
# a.k.a.
# blaaaaaaaaarg
EXTRA_TEMPLATES_PATHS.append('writing')
TEMPLATE_PAGES['writing.html'] = 'writing/index.html'

# time formats for blaaaarg
DATE_FORMATS = {'en': '%A %m/%d/%Y',}

# month formatting filter for blaaaaaaarg
from datetime import datetime
def int_to_month (m_int):
    """Turns an integer month into a long month."""
    d = datetime(year=2014, day=1, month=m_int)
    return d.strftime("%B")

JINJA_FILTERS = {'month_name':int_to_month}



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
