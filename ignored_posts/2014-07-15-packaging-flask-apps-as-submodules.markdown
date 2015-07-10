---
layout: post
title: Packaging Flask Apps as Submodules
date: 2014-07-15 23:09:07 -0700
comments: true
categories: [flask, python, webapps, web, modules]
---

Recently, I was creating a Python module that contained code for doing various tasks. On top of the rest of the module, I wanted to be able to run a Flask web server to interface with the rest of the module using internet widgets through a browser.

Flask is a Python module for running a lightweight web server/web app, and makes it really simple to define routes and incorporate templates. But all of the Flask examples I had seen online showed how to use Flask for a standalone app, not as a part of a module. It took some detective work to figure out how to do that.

The following article gives instructions for how to deploy your Flask web app as part of a submodule in Python.

## The Goal

Let’s say you’ve got a module with the incredibly creative name of mymodule. It consists of several submodules, as well as a web app submodule.

We want to be able to import submodules and our web app like this:

```python
from mymodule.submodule1 import *
from mymodule.submodule2 import *

from mymodule.webapp import *

app.run()
```

<!-- more -->

## Module Directory Structure

First things first: where should everything go?

Your module directory structure will look something like this:

```
README.md
setup.py
mymodule/
  __init__.py
  submodule1/
  submodule2/
  webapp/
    __init__.py
    additional_routes.py
    templates/
      [...]
    static/
      [...]
```

Next, your setup.py file will look something like this:

```python
from disttools import setup
config = {
    'description': 'My Module',
    'install_requires': ['flask'],
    'packages': ['mymodule','mymodule.submodule1','mymodule.submodule2','mymodule.webapp'],
    'include_package_data' : True,
    'package_data' : {
        'templates' : 'mymodule/webapp/templates/*',
        'static' : 'mymodule/webapp/static/*'
        },
    'scripts': [],
    'name': 'mulch',
    'zip_safe' : False
}

setup(**config)
```

The key lines here are include_package_data and package_data, which will also install your non-Python template and static files with your module. (You can also create a list of all package data files to copy over in ```MANIFEST.in```, which goes in the same location as ```setup.py```.)

Now you can install your module with ```python setup.py install```, and your module is available to use from anywhere.

To create an instance of your module’s web app from anywhere, follow these steps:

1. Install the module

```
python setup.py install # from your module directory
```

2. Import the webapp submodule:

```python
from mymodule.webapp import *
```

3. Start the webapp:

```python
app.run()
```
Voila!

# References

You can find more information [here](http://www.plankandwhittle.com/packaging-a-flask-web-app/) and [here](http://flask.pocoo.org/docs/patterns/distribute/)
