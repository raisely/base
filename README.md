[Base 2.0.0](http://base.gs/)
======

**Base is a semantic, lightweight and extensible framework to power the next generation of responsive websites.**

It's created and maintained by the team at [@agencysc](https://twitter.com/agencysc). Head over to [base.gs](http://base.gs) to try it out and follow [@BaseGS](https://twitter.com/basegs) for framework updates.

This is Base V2 (SASS), for Base V1 (LESS) check [v1 Branch](https://github.com/agency/base/tree/v1)
## Get Started

Getting started building websites with Base is easy. You can:

* [Download the latest code](https://github.com/agency/Base/archive/master.zip)
* Clone the repo `git clone https://github.com/agency/base.git`

### What's Inside

When you download Base you'll see a boilerplate `index.html` file and a folder structure like this:

```
├── js
│   ├── main.js
│   ├── modules
│   │   └── theme.js
│   └── plugins
└── scss
    ├── _fonts.scss
    ├── _layout.scss
    ├── _reset.scss
    ├── _tooltips.scss
    ├── _type.scss
    ├── _variables.scss
    ├── base.scss
    ├── components
    │   ├── _buttons.scss
    │   ├── _forms.scss
    │   └── _menus.scss
    └── mixins
        ├── _grid.scss
        └── _helpers.scss

```

## Compiling SASS

This can be done with [Grunt](http://gruntjs.com/) *(instructions below)*, [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) or one of these third-party GUI tools:

* [Codekit (OS X)](http://incident57.com/codekit/)
* [Simpleless (Windows & OS X)](http://wearekiss.com/simpless)

### Compiling with Grunt

[Grunt](http://gruntjs.com/) is an automated Javascript task-runner installed and managed by [npm](https://npmjs.org/) (the Node.js package manager). If you're unfamiliar with `npm` you can install it from the [Node.js website](http://nodejs.org/download/).

**In the command line**

1. Install `grunt-cli` with `npm install -g grunt-cli`
2. Navigate to your Base install and run `npm install` to load dependencies.
3. Run `grunt dev` to start watching and compiling files

`Grunt dev` will run the following tasks:
- compile `base.scss` into `site.min.css` and create source maps 
- autoprefix CSS properties that require vendor prefixes
- Compile Javascript modules with [Broserify](https://github.com/substack/node-browserify) into `site.min.js`
- Compile ES6 with [Babel](https://babeljs.io/)
- concatenate and uglify Javascript files
- watch for changes and automatically synchronise browsers and devices with [Browsersync](https://www.browsersync.io/docs/grunt/)


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
