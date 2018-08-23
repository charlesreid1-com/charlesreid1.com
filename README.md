# charlesreid1-src

charlesreid1.com website repo and template.


## the main idea

`charlesreid1-src/README.md` - you are here

`charlesreid1-src/pelican/pelicanconf.py` - configuration file for Pelican site

`charlesreid1-src/pelican/content/index.html` - main index page.


## hosting

The hosting for this website is handled by the charlesreid1 docker pod.
See the [docker/pod-charlesreid1](https://git.charlesreid1.com/docker/pod-charlesreid1)
repo for details.


## Make the Site

Go to the `pelican/` directory

Run the command `pelican content`

Site content is generated in the `output/` directory

The content needs to be copied into the live web content directory
`/www/charlesreid1.com/htdocs`.

**Prefererd method:** Ideally, there will be nothing in the `htdocs` folder except this
Pelican site. If that is the case, the old `htdocs` directory contents
can be emptied and the new directory contents copied in.

**If you must:** If there are already files living in `htdocs`, you should probably just
copy everything from the `output/` directory into the `htdocs/` directory
without deleting anything (this will create problems if you remove pages
from the Pelican site though.) 


## theme 

The pelican theme for this site is defined in a separate repo:

<https://git.charlesreid1.com/charlesreid1/charlesreid1.com-theme>

To install, cloen that directory and run

```
pelican -i charlesreid1.com-theme
```

