Title: ImageMagick 
Date: 2015-06-06 13:50
Category: 

Here at Dox, we see all kinds of different technical document formats: LaTeX files,
Word documents, HTML documents, Github markdown files, MediaWiki and Drupal sites, 
even MathCAD reports. The one thing that remains constant across each of these formats?

Images.

Every document, every report, every website, has its share of images, 
all stuffed into a directory. We are visual creatures, after all, and what kind of 
monster writes a paper or report that neglects to include even a single figure?

But, as everyone who has dealt with technical documents and/or Murphy's Law knows, 
the more images there are and the more tedious it is to edit each image,
the more likely it is that you'll have to edit every single image.

**Not to worry!** Doxuments has a solution to save you hours cropping images one-by-one.
The solution is to combine the superpowers ImageMagick convert and the Unix 
command-line utility xargs.

ImageMagic is an all-in-one program that can do, well, image manipulations. 
If you need to add text, draw shapes, crop, scale, squeeze, push, slide, rotate,
flip, or any number of other image-related verbs, you use ImageMagick.
ImageMagick convert is the command-line version of ImageMagick.

We will cover ImageMagick convert first, and show how to perform 
image manipulation operations on single image files. 

And while ImageMagick convert is a pretty amazing tool in itself, we then show you 
how to combine it with xargs, a Unix power tool that every serious
Unix user should know. xargs allows you to parallelize command-line 
operations to perform operations on hundreds of files at a time.

## ImageMagick Convert 

Some of the most common image manipulation operations that are required are 
cropping and scaling. 

**Cropping** is commonly used if plots are being generated with too much 
white space on the borders - cropping a few centimeters off of each edge
can improve image resolution without throwing off your page layout.

You may also need to crop a large number of photographs if you have 
scanned documents. Often, scanners capture the entire scanner bed, leaving 
large empty areas on page after page after page.

**Scaling** is another handy operation to be able to perform on multiple images.
Why might you need to mass-scale a folder full of images?
Perhaps the script that generates your plots dumped out 
your images at the wrong resolution, and the incorrect size 
is squeezing all of the text off your page.

Alternatively, you may have a folder full of extremely high-resolution images.
You want to keep the originals, but you want to make lower-resolution copies 
to embed in your documents, so that you avoid the memory requirements and overhead 
of the high-resolution images. 

**Greyscale** versions of images are not as commonly used, 
but can be very useful for printing. Reviewing how color plots will look when rendered
in black and white, or creating minimalistic draft versions for editing, 
are all applications of this operation.

## Basics of ImageMagick Convert

Before we talk about the specifics of ImageMagick convert, we will cover how to use it.

ImageMagick can be installed on Mac from [this page](http://www.imagemagick.org/script/binary-releases.php), 
and on most Linux distributions using your distribution package manager (e.g., <code>apt-get install imagemagick</code>).

To use ImageMagick convert, you call it from the command line using the <code>convert</code> command, 
and you pass it different arguments. It has many, many arguments. If you call it without any arguments, 
it will print out its different options. 

<img src="/images/imagemagick_terminal.png" />

The crop, scale, and greyscale operations will be called using these arguments.

## The Example Image

I threw together a short example plot with matplotlib that prints a figure with extra whitespace
at the margins:

```
import matplotlib.pylab as plt
import seaborn as sns
import numpy as np
d = np.random.randn(1000,)
fig = plt.figure(figsize=(8,10))
ax = fig.add_subplot(111)
ax.hist(d)
subplots_adjust(bottom=0.2, right=0.8, top=0.9)
fig.savefig('whatevs.png')
```

<img src="/images/whatevs.png" style="border: solid 1px black;"/>

## ImageMagick Crop Operation

The first operation we want to perform on this image is to crop it.
There are actually many operations to choose from, including: 

* crop
* chop
* trim
* shave

In this case, we will stick with crop. 

To figure out how to call crop, we have to think through how we want to crop the image.
The easiest, most general, and most useful way to do this is to remove
a specified number of pixels from each edge. This will allow us to trim 
whitespace on each edge of the image until we have removed it all.

Crop is actually intended to be used when you want to specify the size of the 
resulting image. But if we call crop without specifying an x or y argument 
for the geometry (width by height), it will default to the x and y for the image
(the image width and image height).

In other words, instead of calling crop like this:

```
convert whatevs.png -crop 100x100 whatevs_result.png 
```

we can actually call crop like this:

```
convert whatevs.png -crop whatevs_result.png
```

and while this will not result in anything interesting,
we can now combine that with modifications to the 
crop area, like saying (reduce the crop area by 50 pixels).

To modify crop areas, we tack on an additional width and height,
prefixed by (+) or (-). 

* Widths start with 0 at the left, so a 
(+) prefix on width indicates number of pixels from zero, or from the left.
A (-) prefix on width indicates number of pixels from the right.

* Heights start with 0 at the top, 
so a (+) prefix on height indicates number of pixels from the top of the image.
A (-) prefix on height indicates the number of pixels from the bottom of the image. 

If we were specifying our crop area, our convert call would look like this:

```
convert whatevs.png -crop 300x300-90+10 whatevs_result.png
```

This says, "crop the image to 300 x 300, then remove 90 pixels from the right, and 10 pixels from the top".

But to avoid specifying the image size, we can just leave it out:

```
convert whatevs.png -crop -90+10 whatevs_result.png
```

This says, "crop the image to its original size (i.e. do nothing), then remove 90 pixels from the right, and 10 pixels from the top".

This gets us almost what we want. We have four convert commands
to remove the four edges of the image (with margin sizes that 
have already been worked out ahead of time):

```
convert whatevs.png -crop +30+0  whatevs_left.png
convert whatevs.png -crop -90+0  whatevs_right.png
convert whatevs.png -crop +0+50  whatevs_top.png
convert whatevs.png -crop +0-100 whatevs_bottom.png
```

Now we just need to figure out how to chain these convert commands together.

## Chaining ImageMagick Crop Commands Together

It turns out that we **can** chain ImageMagick commands together,
we just need to add a slight modifier to our convert command
to tell it not to send the resulting image to a file,
or read the target image from a file,
but rather to send it to or read it from stdout.

This will allow us to send the result of the first convert command
to the second convert command, and the result of the second command
to the third command, and so on.

The flag we need to send output to stdout is:

```
png:-
```

(Or, if we were using jpg images, images, we would use `jpg:-`.) 

The flag we need to get input from stdout is:

```
-
```

Yep, just a dash. Instead of specifying an image file name, we just put `-`.


Now we can chain two commands together, to crop the left and right margins:

```
convert whatevs.png -crop +30+0 png:- | convert - -crop -90+0 whatevs_leftright.png
```

Resulting image:

<img src="/images/whatevs_leftright.png" style="border: solid 1px black;"/>


Likewise, we can chain two command together to crop the top and bottom margins:

```
convert whatevs.png -crop +0+50 png:- | convert - -crop +0-100 whatevs_topbottom.png
```

Resulting image:

<img src="/images/whatevs_topbottom.png" style="border: solid 1px black;"/>

Now we are finally ready to put everything together into one big convert call
to trim all four edges of our image in one go:

```
convert whatevs.png -crop +30+0 png:- | \
    convert - -crop -90+0 png:- | \
    convert - -crop +0+50 png:- | \
    convert - -crop +0-100 whatevs_crop.png
```

This results in the image below:

<img src="/images/whatevs_crop.png" style="border: solid 1px black;"/>

Now that we've got the ability to crop a single image with ImageMagick
convert, let's explore how to combine it with xargs for even more power.

## The xargs Utility

The Unix xargs utility provides users with a way to construct 
and execute commands from stdin. This means you can pass
xargs a list of file names, and execute commands on each 
filename separately. 

Let me give you an example of how xargs works:

First, let's say we have a directory with a couple of files:

```
$ ls
file201.txt
file202.txt
file203.txt
file204.txt
file205.txt
```

Suppose I want to rename these, so that 201 becomes 001, 202 becomes 002,
and so on. But I don't want to do it by hand. I can use xargs to do this
by constructing and exeuting a rename command for each file.

First, I need a list of all the files I want to rename. Easy, I already
have that:

```
$ /bin/ls -1 
file201.txt
file202.txt
file203.txt
file204.txt
file205.txt
```

Next, I pipe that to sed. We will use sed to do some basic
text manipulation. Covering sed is outside the scope of this
document, but like xargs, sed is an extremely powerful Unix 
utility that is well worth spending the time to learn.

We will use sed to modify the filenames, by changing "2" to "0",
so that "201" becomes "001" as planned:

```
$ /bin/ls -1 | sed "p;s/2/0/"
file201.txt
file001.txt
file202.txt
file002.txt
file203.txt
file003.txt
file204.txt
file004.txt
file205.txt
file005.txt
```

This command first prints the original filename, then prints the 
new filename. We will then pass these file names two at a time
to xargs, so that it can construct a command in the form

```
mv [original filename] [new filename]
```

We can do that by telling xargs to take arguments two at a time,
and passing those arguments to the move command:

```
$ /bin/ls -1 | sed "p;s/2/0/" | xargs -n2 mv

$ 
```

xargs didn't say anything! By default, it stays quiet. 
We can modify xargs, though, to print out
each command that it's running with the <code>-t</code> flag:

```
$ /bin/ls -1 | sed "p;s/2/0/" | xargs -t -n2 mv
mv file201.txt file001.txt
mv file202.txt file002.txt
mv file203.txt file003.txt
mv file204.txt file004.txt
mv file205.txt file005.txt
```

Now that's more like it!

## Using Piped Commands with xargs

Wait! We still have one last thing to cover before we 
move on to cropping a folder full of images. And that is,
we still don't know how to use xargs when our command
isn't as simple as <code>mv</code> or <code>cp</code>.
Our convert commmand above contains four commands 
strung together by pipes, with the input arguments 
in particular spots. Can the all-powerful, all-flexible
xargs handle this tall order?

Of course.

Let's begin with a hypothetical directory 
full of images:

```
$ /bin/ls -1 
img001.jpg
img002.jpg
img003.jpg
img004.jpg
img005.jpg
img006.jpg
img007.jpg
img008.jpg
img009.jpg
```

Each of these images is identical to the example image shown above.
We want to perform the same cropping operation on each of these
images (the same cropping operation described with the ImageMagick
convert command above).

We will utilize two tricks. The first is, using xargs to run
a full shell environment for each image name passed to it.
This will enable us to run complicated commands with pipes.

The second is to use that same shell to access the arguments
passed to xargs, and construct custom commands by putting the 
filename in arbitrary locations.

To illustrate: first, we can call a shell using xargs to get
a new bash shell instance for each filename:

```
$ /bin/ls -1 | xargs -t -n1 sh
sh img001.jpg
sh img002.jpg
sh img003.jpg
sh img004.jpg
sh img005.jpg
sh img006.jpg
sh img007.jpg
sh img008.jpg
sh img009.jpg
```

Now if we pass the <code>-c</code> flag to <code>sh</code>,
we can run a command, and use the filename argument passed to 
the shell:

```
$ /bin/ls -1 img* | xargs -n1 sh -c 'echo "This file $0 can go anywhere"'
This file img001.jpg can go anywhere
This file img002.jpg can go anywhere
This file img003.jpg can go anywhere
This file img004.jpg can go anywhere
This file img005.jpg can go anywhere
This file img006.jpg can go anywhere
This file img007.jpg can go anywhere
This file img008.jpg can go anywhere
This file img009.jpg can go anywhere
```

## Putting It All Together

We can now combine our xargs shell command with our ImageMagick
convert command, to get our monstrous one-liner for cropping 
all of the images in a single directory:


```
/bin/ls -1 img* | xargs -n1 \
    sh -c 'convert $0 -crop +30+0 png:- | \
           convert  - -crop -90+0 png:- | \
           convert  - -crop +0+50 png:- | \
           convert - -crop +0-100 cropped_$0'
```

And there you go: the originals, and the new cropped images, 
side-by-side in the same directory. Now everything is all ready
for you to switch out those images!

<img src="/images/folder.png" width="100%"/>

And if you want to use the cropped images, you can always
swap the cropped and regular image files 
by using an xargs one-liner to rename everything! 



## The Conclusion

The ImageMagick convert command-line utility 
and the xargs Unix utility are two extremely powerful
utilities. The convert utility is capable of 
doing many, many image processing and image manipulation 
operations from the command line (and thus from scripts).
The xargs utility, likewise, is an extremely flexible 
utility that enables the construction and execution of 
complex commands, using input arguments 
(usually filename lists) to construct the commands.

By combining convert with xargs, we were able to achieve
a very sophisticated level of image manipulation, and a high
degree of control over the cropping operation; 
but thanks to xargs, we didn't have to sacrifice 
the ability to perform those image manipulation operations
on hundreeds or thousands of images at a time.

**convert and xargs**: a technical document power-tip brought to you by Doxuments.

<br />
<br />

Did you find this guide useful? Have questions or comments? Tweet at Doxuments:
[@doxuments](http://www.twitter.com/doxuments)

<br />
<br />

Are you doing complex image processing for your project?
Want some help using ImageMagick convert and xargs?
Contact Doxuments today! 
<a href="mailto:info@doxuments.com">info (at) doxuments.com</a>

