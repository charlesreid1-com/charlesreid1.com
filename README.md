# charlesreid1-src

charlesreid1.com website repo and template.


## the main idea

`charlesreid1-src/README.md` - you are here

`charlesreid1-src/pelican/pelicanconf.py` - configuration file for Pelican site

`charlesreid1-src/pelican/content/index.html` - main index page.


## Hosting

The hosting for this website is handled by the charlesreid1 docker pod.
See the [docker/pod-charlesreid1](https://git.charlesreid1.com/docker/pod-charlesreid1)
repo for details.


## Make the Site

Go to the `pelican/` directory

Run the command `pelican content`

Site content is generated in the `output/` directory

The content needs to be copied into the live web content directory
`/www/charlesreid1.com/htdocs`.

**Prefererd method:** Use the `git_pull_www.sh` script in the [dotfiles/debian](https://git.charlesreid1.com/dotfiles/debian)
repository. Go to `dotfiles/krash_scripts/`.

**If you must:** If you absolutely must you can manually copy files into the `htdocs/`
directory. But really, everything there should be from the `gh-pages` branch of
this repo, so you should not do that.


## Theme 

The pelican theme for this site is defined in a separate repo:

<https://git.charlesreid1.com/charlesreid1/charlesreid1.com-theme>

To install, cloen that directory and run

```
pelican -i charlesreid1.com-theme
```

