# Webiste Asset Sync 

# Why?
When cloning a website sometimes assets are missed out on - specifically assets which are loaded dynamically (e.G. Lazy loaded images)

# What?
A script to scan for any kind of  urls on already downloaded webistes. Checking those whose links were not converted yet, and not downloaded. The script shall dowload the relevant assets  and convert the links then.

# How?
Requirements
------------
- Nodejs

Installation
------------
```
$ npm install -g wassets-sync
```

Usage
-----

```
Usage
    $ copy-website-assets <arg1> <arg2>
    
Options
    required:
        arg1, --url <url>, -u <url>
            url to the remote origin live-version of the website
            if it does not start with https:// https:// will be prepended#
    
    optional:
        arg2, --directory <path-directory>, -d <path-directory>
            path to the local directory which is document root of the website clone
            default is current working directory
        
Examples
    $  copy-website-assets arcweave.com
    ...
```

Current Functionality
---------------------
- Goes through all files in the given `directory` parameter (except assets)
- Considers image-assets as relevant coming from given remote origin url
- Dowloads all available assets to a `/external-links/` direcory
- Changes the link to a relative local url


---

# Further steps

- More assets to be considered for downloading?
- More user-interaction?
- ...


All sorts of inputs are welcome, thanks!

---

# License

## The Unlicense JhonnyJason style

- Information has no ownership.
- Information only has memory to reside in and relations to be meaningful.
- Information cannot be stolen. Only shared or destroyed.

And you wish it has been shared before it is destroyed.

The one claiming copyright or intellectual property either is really evil or probably has some insecurity issues which makes him blind to the fact that he also just connected information which was freely available to him.

The value is not in him who "created" the information the value is what is being done with the information.
So the restriction and friction of the informations' usage is exclusively reducing value overall.

The only preceived "value" gained due to restriction is actually very similar to the concept of blackmail (power gradient, control and dependency).

The real problems to solve are all in the "reward/credit" system and not the information distribution. Too much value is wasted because of not solving the right problem.

I can only contribute in that way - none of the information is "mine" everything I "learned" I actually also copied.
I only connect things to have something I feel is missing and share what I consider useful. So please use it without any second thought and please also share whatever could be useful for others. 

I also could give credits to all my sources - instead I use the freedom and moment of creativity which lives therein to declare my opinion on the situation. 

*Unity through Intelligence.*

We cannot subordinate us to the suboptimal dynamic we are spawned in, just because power is actually driving all things around us.
In the end a distributed network of intelligence where all information is transparently shared in the way that everyone has direct access to what he needs right now is more powerful than any brute power lever.

The same for our programs as for us.

It also is peaceful, helpful, friendly - decent. How it should be, because it's the most optimal solution for us human beings to learn, to connect to develop and evolve - not being excluded, let hanging and destroy oneself or others.

If we really manage to build an real AI which is far superior to us it will unify with this network of intelligence.
We never have to fear superior intelligence, because it's just the better engine connecting information to be most understandable/usable for the other part of the intelligence network.

The only thing to fear is a disconnected unit without a sufficient network of intelligence on its own, filled with fear, hate or hunger while being very powerful. That unit needs to learn and connect to develop and evolve then.

We can always just give information and hints :-) The unit needs to learn by and connect itself.

Have a nice day! :D