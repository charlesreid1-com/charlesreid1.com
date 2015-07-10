---
layout: post
title: OAuth from Python to Build a Twitter Bot Flock: Part 2: The Code
date: 2014-05-22 21:08:01 -0700
comments: true
categories: [python, programming, oauth, three legged authentication, twitter, twitterbots]
---

_This is Part 2 of a 3-part series of articles on using OAuth from Python.
It describes the code behind the [Ginsberg Bot Flock](https://twitter.com/charlesreid1/lists/ginsbergbotflock),
all of which is available from my [imaginary-friends repository](https://github.com/charlesreid1/imaginary-friends/) 
on Github_

> Toward the Key in the window--and the great Key lays its head of light <br />
>    on top of Manhattan, and over the floor, and lays down on the <br /> 
>    sidewalk--in a single vast beam, moving, as I walk down First toward <br /> 
>    the Yiddish Theater--and the place of poverty  <br /> 
>    you knew, and I know  <br /> 
> <br />
> - Allen Ginsberg, "Kaddish"

## Python

This post assumes you have already read Part 1 and are familiar 
with the concepts behind OAuth and user authentication, 
why the Twitter API requires it, and the steps we'll need to take
to authenticate each Twitter bot in the bot flock.

Let's dive into some code of how this works.

<!-- more -->

### Pseudocode

My pseudocode will look something like this:

```
Initialize URLs and app keys (a.k.a. consumer token)
Create an OAuth client
Get a request token
Sign the request
User logs into Twitter account and grants app permission
Obtain temporary authorization token
Store temporary authorization token somewhere safe
```

And then we'll be ready to go.

### The Keymaker

> We do only what we are meant to do.
> - The Keymaker

The Keymaker is an object that handles the OAuth 
authentication mechanism and does three-legged authentication
with Twitter, your app, and your user.

First we'll define it:

```python

class Keymaker(object):
    def __init__(self):
        # We won't do much here
        self.request_token_url = 'https://api.twitter.com/oauth/request_token'
        self.authorize_url = 'https://api.twitter.com/oauth/authorize'
        self.access_token_url = 'https://api.twitter.com/oauth/access_token'

        consumer_token = {}
        consumer_token['consumer_token'] = 'AAA'
        consumer_token['consumer_token_secret'] = 'BBB'
        self.consumer_token = consumer_token
```

Next, we will need to go through the authentication 
procedure for each user. In my case, I am tying each user
to a file on my hard drive (a text file with a poem).
I have already created a Twitter account for each poem,
so now I go through the authentication process for each:

```python
    def make_keys(self,poems_dir):

        # 1. Get list of poem files
        raw_files = os.listdir(poems_dir) 
        poem_files = []
        for rfile in raw_files:
            if rfile[-4:] == '.txt':
                poem_files.append(rfile)

        consumer_token = self.consumer_token

        # 2. For each poem, ask the user if they want to make a key for it
        for poem_file in poem_files:

            full_poem_file = re.sub('//','/',poems_dir + '/' + poem_file)

            print "="*45
            print "Poem "+full_poem_file
            print 
            make_key = ''
            while make_key <> 'y' and make_key <> 'n':
                make_key = raw_input('Make key? (y/n) ')

            if make_key == 'n':
                print "Skipping keymaking for poem "+full_poem_file
            else:
                print "Starting keymaking for poem "+full_poem_file
```

It is convenient to define my key-making procedure in this way,
because I want to be able to authenticate each bot separately
(in case one or two need to be re-authenticated).

This is the good stuff: where our OAuth calls actually happen.
First, we have to create some OAuth objects that represent
our user and our app.

```python
                consumer = oauth.Consumer(consumer_key, consumer_secret)
                client = oauth.Client(consumer)

                # Step 2.1: Get a request token. This is a temporary token that is used for 
                # having the user authorize an access token and to sign the request to obtain 
                # said access token.
                # https://dev.twitter.com/docs/api/1/get/oauth/authenticate
                resp, content = client.request(self.request_token_url,"GET")
                if resp['status'] != '200':
                    raise Exception("Invalid response %s." % resp['status'])

                request_token = dict(urlparse.parse_qsl(content))
                #print "Request Token:"
                #print "    - oauth_token        = %s" % request_token['oauth_token']
                #print "    - oauth_token_secret = %s" % request_token['oauth_token_secret']
                #print 
```

Now we have our request token. Remember that this is *not* what we need
to tweet as a particular user - this is only the first step of our 
three-legged authentication. The request token only allows us
to request permission - it does not give us permission.

Next, the user must visit a Twitter page where they log in 
and agree to give read/write permission to our app.
In our case, we are not using a phone app, or a web app, 
we're using a script that runs on a desktop computer. 
That means we don't have any actions to perform,
so we don't have anywhere of our own to redirect the user
once they log in.

Instead, Twitter will show the user a PIN number, 
which can be entered through the terminal. 
That means that for each bot that we want to control
using our app, we have to get a request token, 
have the user visit a URL and grant permission 
through Twitter, and have them copy and paste the 
PIN number in the terminal. 

```python
                # Step 2.2: Redirect to the provider. Since this is a CLI script we do not 
                # redirect. In a web application you would redirect the user to the URL
                # below.
                
                print "Visit the following app authorization link:"
                print "%s?oauth_token=%s" % (self.authorize_url, request_token['oauth_token'])
                print 
                print "Sign in as the user to be associated with poem "+full_poem_file
                print 
```

Once we have that PIN number, we have everything we need to
get the token we really want - the authentication token that will
allow us to control that Twitter account via our Python application.

```python
                # After the user has granted access to you, the consumer, the provider will
                # redirect you to whatever URL you have told them to redirect to. You can 
                # usually define this in the oauth_callback argument as well.
                oauth_verifier = raw_input('What is the PIN? ')

                # Step 2.3: Once the consumer has redirected the user back to the oauth_callback
                # URL you can request the access token the user has approved. You use the 
                # request token to sign this request. After this is done you throw away the
                # request token and use the access token returned. You should store this 
                # access token somewhere safe, like a database, for future use.
                token = oauth.Token(request_token['oauth_token'],
                    request_token['oauth_token_secret'])
                token.set_verifier(oauth_verifier)
                client = oauth.Client(consumer, token)
                
                resp, content = client.request(self.access_token_url, "POST")
                access_token = dict(urlparse.parse_qsl(content))
```

Hooray!!! We now have our access token.

This access token is a simple string. But if we lose this 
access token, we have to ask the user to re-authenticate.
So we need to keep this in a safe place.

In my case, I decided to put all the necessary keys into a JSON,
and then dump that JSON to a file, so that we can reload 
our authentication keys later (and from somewhere other than
the Keymaker object).

```python
                # Step 2.4: Make a dict with all relevant Sheep info
                d = {}
                for key in consumer_token.keys():
                    d[key] = consumer_token[key]
                for key in access_token.keys():
                    d[key] = access_token[key]
                d['poem_file'] = full_poem_file
                
                # Step 2.5: Export our Sheep key info to a JSON file
                full_keys_file = re.sub('poems','keys',full_poem_file)
                keys_file = re.sub('txt','json',full_keys_file)
                with open(keys_file, 'w') as outfile:
                      json.dump(d, outfile)
                print "Successfully exported a key bundle for poem "+full_poem_file+" to JSON file "+ keys_file 
```





