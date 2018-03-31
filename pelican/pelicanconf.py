import os, re, glob

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'charlesreid1'

PATH = 'content'
DEFAULT_LANG = u'en'

# the theme 
THEME = 'charlesreid1.com-theme'



# ------------
# iPython Notebooks:

HOME = os.environ.get('HOME')

PLUGIN_PATHS = [HOME+'/codes/charlesreid1/pelican-plugins/']

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

TEMPLATE_PAGES['index.html'] = 'index.html'
TEMPLATE_PAGES['contact.html'] = 'contact/index.html'
TEMPLATE_PAGES['notes.html'] = 'notes/index.html'

TEMPLATE_PAGES['wiki_calendar.html']  = 'wiki_calendar/index.html'

TEMPLATE_PAGES['git_calendar.html']   = 'git_calendar/index.html'

TEMPLATE_PAGES['life.html'] = 'life/index.html'
TEMPLATE_PAGES['json-sans-eval.js'] = 'life/json-sans-eval.js'

TEMPLATE_PAGES['logo.html'] = 'life/logo.html'



# -----------------------
# Strategies for data directory:
#   a) clone data-master/ as a submodule in charlesreid1:master (htdocs branch)
#       PROS: not checking huge amounts of (duplicate) information into htdocs
#       CONS: awkward workflow (esp. since htdocs not linked directly)
#   b) clone data-master/ directly into htdocs folder
#       PROS: not checking data into repo, simple workflow
#       CONS: ...
#   c) clone data-master/ as submodule in charlesreid1-src, add to static paths
#       PROS: simple workflow
#       CONS: ugh, too much data duplication
#
# Final answer: clone data-master/ directly into charlesreid1 htdocs folder
# charlesreid1.com/data/
# 
# now any data can be referenced from web applications on charlesreid1.com!



# --------------------
# Example map app
EXTRA_TEMPLATES_PATHS.append('examplemap')
TEMPLATE_PAGES['map.html']      = 'examplemap/index.html'
TEMPLATE_PAGES['map.js']        = 'examplemap/map.js'
TEMPLATE_PAGES['map.css']       = 'examplemap/map.css'
TEMPLATE_PAGES['map.geojson']   = 'examplemap/map.geojson'


## --------------------
## Moar map apps
#EXTRA_TEMPLATES_PATHS.append('maps')
#TEMPLATE_PAGES['mapsindex.html'] = 'maps/index.html'
#TEMPLATE_PAGES['maps.html']      = 'maps/maps.html'
#TEMPLATE_PAGES['maps.js']        = 'maps/maps.js'
#TEMPLATE_PAGES['maps.css']       = 'maps/maps.css'
#TEMPLATE_PAGES['maps.geojson']   = 'maps/maps.geojson'








##########################
### Just an example of
### how to add an app folder
### # about
### EXTRA_TEMPLATES_PATHS.append('about')
### TEMPLATE_PAGES['about.html'] = 'about/index.html'
### TEMPLATE_PAGES['about.css']  = 'about/about.css'
### TEMPLATE_PAGES['about.json'] = 'about/about.json'
### TEMPLATE_PAGES['about_modcontrol.js'] = 'about/about_modcontrol.js'
##########################





# --------------8<---------------------

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
DEFAULT_PAGINATION = False
TIMEZONE = 'America/Los_Angeles'
