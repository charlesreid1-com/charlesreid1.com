import re
import os

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
TEMPLATE_PAGES['page_edits.csv']      = 'wiki_calendar/page_edits.csv'

TEMPLATE_PAGES['git_calendar.html']   = 'git_calendar/index.html'
TEMPLATE_PAGES['commit_counts.csv']   = 'git_calendar/commit_counts.csv'

TEMPLATE_PAGES['life.html'] = 'life/index.html'
TEMPLATE_PAGES['json-sans-eval.js'] = 'life/json-sans-eval.js'




##########################
### Just an example of
### how to add an app folder
### # about
### EXTRA_TEMPLATES_PATHS.append('about')
### TEMPLATE_PAGES['about.html'] = 'about/index.html'
### TEMPLATE_PAGES['about.css']  = 'about/about.css'
### TEMPLATE_PAGES['about.json'] = 'about/about.json'
### TEMPLATE_PAGES['about_modcontrol.js'] = 'about/about_modcontrol.js'





# --------------8<---------------------

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
DEFAULT_PAGINATION = False
TIMEZONE = 'America/Los_Angeles'
