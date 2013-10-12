[Base](http://base.gs/)
======

**Base is a semantic, lightweight and extensible framework to power the next generation of responsive websites.**

It's created and maintained by the team at [@agencysc](https://twitter.com/agencysc). Head over to [base.gs](http://base.gs) to try it out and follow [@BaseGS](https://twitter.com/basegs) for framework updates.

## Get Started

Getting started building websites with Base is easy. You can:

* [Download the latest code](https://github.com/agency/Base/archive/master.zip)
* Clone the repo `git clone https://github.com/agency/base.git`

### What's Inside

When you download Base you'll see a boilerplate `index.html` file and a folder structure like this:

```
| js/
    vendor/
      jquery-1.10.2.min.js
      modernizr-2.6.2.min.js
| less/
    _buttons.less
    _forms.less
    _layout.less
    _mixins.less
    _menus.less
    _reset.less
    _type.less
    _variables.less
    base.less (compiles)
    desktop.less (compiles)
    mobile.less (compiles)
    tablet.less (compiles)
```

**To note:**
* Files prefixed with ‘_’ do not directly compile.
* The latest versions of jQuery and Modernizr are included for convenience.
* Base supports all major modern browsers and IE7+.

## Compiling LESS

Base requires a [LESS CSS](http://lesscss.org/) compiler to work its magic. This can be done with [Grunt](http://gruntjs.com/) *(instructions below)* or one of these third-party GUI tools:

* [Codekit (OS X)](http://incident57.com/codekit/)
* [Simpleless (Windows & OS X)](http://wearekiss.com/simpless)
* [WinLess (Windows)](http://winless.org/)

### Compiling with Grunt

[Grunt](http://gruntjs.com/) is an automated Javascript task-runner installed and managed by [npm](https://npmjs.org/) (the Node.js package manager). If you're unfamiliar with `npm` you can install it from the [Node.js website](http://nodejs.org/download/).

**In the command line**

1. Install `grunt-cli` with `npm install -g grunt-cli`
2. Navigate to your Base install and run `npm install` to load dependencies.
3. Run `grunt dev` to start watching and compiling the 4 main `.less` files.

## Using Base

Base is easiest to learn by playing with the code. The default `index.html` file contains a quick reference for the reset and grid mixins. For more detail view the **[Base Wiki](https://github.com/agency/base/wiki)**.

## Bugs & Feature Requests

If you find bugs or have any feature requests please [open a new issue](https://github.com/agency/base/issues). It helps if you’re clear about how to reproduce the issue, and what might be causing it.

## Contributing

Pull requests are very welcome. Please follow the same coding style already set within the Base files and keep commits as clean as possible with a detailed explanation of what your pull request is doing.

Base is maintained through the `master` branch, bundled into releases as required. Experimental or major features will split out into separate branches.

## Authors & Key Contributors

* [Tom Maitland](http://tommaitland.net) / [@tommaitland](https://twitter.com/tommaitland)
* [Scott Sanders](https://twitter.com/scottsanders)
* [Murray Bunton](http://murraybunton.com/) / [@murraybunton](https://twitter.com/murraybunton)

## Copyright

Copyright 2013 [Agency Strategic Creative](http://agency.sc/) under the [Apache 2.0 license](https://github.com/agency/base/blob/master/LICENSE).
