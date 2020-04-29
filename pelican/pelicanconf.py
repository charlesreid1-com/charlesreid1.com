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

PLUGIN_PATHS = [HOME+'/codes/pelican-plugins/']

PLUGINS = ['render_math']

MARKUP = ('md')

# Don't try to turn HTML files into pages
READERS = {'html': None}

# Static stuff

STATIC_PATHS = ['img']


# --------------------
# Templates

# template stuff 
TEMPLATE_PAGES = {}

TEMPLATE_PAGES['index.html'] = 'index.html'
TEMPLATE_PAGES['about.html'] = 'about/index.html'
TEMPLATE_PAGES['life.html'] = 'life/index.html'
TEMPLATE_PAGES['json-sans-eval.js'] = 'life/json-sans-eval.js'

TEMPLATE_PAGES['logo.html'] = 'life/logo.html'


# -----------------------
# Strategies for data directory:
# X a) clone data-master/ as a submodule in charlesreid1:master (htdocs branch)
#       PROS: not checking huge amounts of (duplicate) information into htdocs
#       CONS: awkward workflow (esp. since htdocs not linked directly)
#   b) clone data-master/ directly into htdocs folder
#       PROS: not checking data into repo, simple workflow
#       CONS: ...
# X c) clone data-master/ as submodule in charlesreid1-src, add to static paths
#       PROS: simple workflow
#       CONS: ugh, too much data duplication
#
# Final answer: clone data-master/ directly into charlesreid1 htdocs folder
# charlesreid1.com/data/
# 
# now any data can be referenced from web applications on charlesreid1.com!



THEME_TEMPLATES_OVERRIDES = []

### ######################
### # Just an example of
### # how to add an app folder.
### # This assumes your app is 
### # in foobar/
### THEME_TEMPLATES_OVERRIDES.append('foobar')
### TEMPLATE_PAGES['foobar.html'] = 'foobar/index.html'
### TEMPLATE_PAGES['foobar.css']  = 'foobar/foobar.css'
### TEMPLATE_PAGES['foobar.json'] = 'foobar/foobar.json'
### TEMPLATE_PAGES['foobar_modcontrol.js'] = 'foobar/foobar_modcontrol.js'
### ######################


## --------------------
## Example map app
#THEME_TEMPLATES_OVERRIDES.append('examplemap')
#TEMPLATE_PAGES['map.html']      = 'examplemap/index.html'
#TEMPLATE_PAGES['map.js']        = 'examplemap/map.js'
#TEMPLATE_PAGES['map.css']       = 'examplemap/map.css'
#TEMPLATE_PAGES['map.geojson']   = 'examplemap/map.geojson'








# --------------8<---------------------

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
DEFAULT_PAGINATION = False
TIMEZONE = 'America/Los_Angeles'
