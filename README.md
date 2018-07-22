[Base 2.2.0](http://base.gs/)
======

**Base is a semantic, lightweight and extensible framework to power the next generation of responsive websites.**

It's created and maintained by the team at [@agencysc](https://twitter.com/agencysc). Head over to [base.gs](http://base.gs) to try it out and follow [@BaseGS](https://twitter.com/basegs) for framework updates.

**Note:** this is Base v2 (SASS), for Base v1 (LESS) check [v1 Branch](https://github.com/agency/base/tree/v1)
## Get Started

Getting started building websites with Base is easy. You can:

* [Download the latest code](https://github.com/agency/Base/archive/master.zip)
* Clone the repo `git clone https://github.com/agency/base.git`

### What's Inside

When you download Base you'll see a boilerplate `index.html` file and a folder structure like this:

<pre>
├── grid.html
├── gulpfile.js
├── index.html
└── src
   ├── fonts
   │   ├── entypo.eot
   │   ├── entypo.svg
   │   ├── entypo.ttf
   │   └── entypo.woff
   ├── img
   │   ├── 1.jpg
   │   ├── 2.jpg
   │   ├── 3.jpg
   │   └── 4.jpg
   ├── js
   │   ├── modules
   │   │   └── theme.js
   │   └── site.js
   └── scss
       ├── base.scss
       ├── components
       │   ├── _buttons.scss
       │   ├── _forms.scss
       │   ├── _menus.scss
       │   └── _tooltips.scss
       ├── _fonts.scss
       ├── _global.scss
       ├── mixins
       │   ├── _grid.scss
       │   └── _helpers.scss
       ├── partials
       │   ├── _footer.scss
       │   └── _grid.scss
       ├── _reset.scss
       ├── _type.scss
       └── _variables.scss

</pre>

### Installation

```
git clone https://github.com/agency/base
cd base
npm install
npm start
```

Update your development workflow, view, and make changes to gulp tasks in `gulpfile.js`

## Using Base

Base is easiest to learn by playing with the code. The default `index.html` file contains a quick reference for the reset and grid mixins and `grid.html` contains grid examples. For more detail view the instructions below.

To run the development server, simply run `npm start` from the command line. This will compile assets and load
a BrowserSync instance on localhost. BrowserSync, as well as many aspects of the build process can be configured
directly in the gulpfile.

### Grid

Base grid system allows you to build responsive layouts without having to overwrite column styles for every breakpoint. Based on your grid settings Base will automatically generate column styles and grid widths for all of your breakpoints, responding to different grid configurations (ie. 12 columns on desktop and 1 on mobile).

Grid settings can be found and updated in `_variables.scss`. You can add as many breakpoints as you like!

```scss
// Breakpoints
// -------------------

$breakpoints: (
	'mobile': (max-width: 736px),
	'tablet': (max-width: 1024px),
	'desktop': (min-width: 1200px),
);

// Include gutter on outside
$gutterOnOutside: true;

// Breakpoints Grid Settings
// -------------------

$grid-settings: (
	base: (
		container-columns: 12,
		gutter: 1%,
		max-width: 1100px,
	),
	desktop: (
		container-columns: 12,
		gutter: 1%,
		max-width: 1200px,
	),
	tablet: (
		container-columns: 12,
		gutter: 5%,
	),
	mobile: (
		container-columns: 1,
		gutter: 5%,
	)
);

```

There are two grid systems that you can use - one with outer gutters and one without. Update `$gutterOnOutside: true;` in `_variables.scss` value to change grid setttings.

Use `@include container();` to create centered container with an optional `max width` set in the breakpoint.

`Base` and other breakpoints (mobile, tablet, etc) styles are automatically generated based on your grid settings.

```scss
.container {
  @include container();
}

```

```css
/* Compiled CSS */
container {                   /* Base */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.container:after {
  content: "";
  display: table;
  clear: both;
}
@media (max-width: 1024px) {  /* Tablet  */
  .container {
    max-width: 100%;
  }
}
@media (max-width: 736px) {   /* Mobile */
  .container {
    max-width: 100%;
  }
}
```

Use `@include columns($columns)` to specify the number of columns your element should take.

`Base` and other breakpoints (mobile, tablet, etc) styles are automatically generated based on your grid settings.


```scss
.element {
	@include columns(5);
}
```

```css
/* Compiled CSS */
.element {                     /* Base */
  display: block;
  float: left;
  width: 39.6666666667%;
  margin-left: 1%;
  margin-right: 1%;
}
@media (max-width: 1024px) {   /* Tablet */
  .element {
    display: block;
    float: left;
    width: 31.6666666667%;
    margin-left: 5%;
    margin-right: 5%;
  }
}
@media (max-width: 736px) {    /* Mobile */
  .element {
    display: block;
    float: left;
    width: 94%; /* Creates full width element because mobile $container-columns equals 1 */
    margin-left: 3%;
    margin-right: 3%;
  }
}
```

Use `@include columns($columns, $offset, $gutter)` to modify offset and default gutter values


```scss

.second-element {
	@include columns(5, 3, 4%);
}

```

Use `@include responsive-columns('breakpoint', $columns, $offset, $gutter);` to modify default breakpoint settings

For example, to create two 50% columns on mobile view with `$container-columns: 1` use:

```scss
.sibling-element {
	@include responsive-columns('mobile', 0.5);
}
```

```css
/* Compiled CSS */
@media (max-width: 736px) { /* Mobile */
  .sibling-element {
    display: block;
    float: left;
    width: 44%;
    margin-left: 3%;
    margin-right: 3%;
  }
}
```

For more grid examples check `grid.html`

## Bugs & Feature Requests

If you find bugs or have any feature requests please [open a new issue](https://github.com/agency/base/issues). It helps if you’re clear about how to reproduce the issue, and what might be causing it.

## Contributing

Pull requests are very welcome. Please follow the same coding style already set within the Base files and keep commits as clean as possible with a detailed explanation of what your pull request is doing.

Base is maintained through the `master` branch, bundled into releases as required. Experimental or major features will split out into separate branches.

## Authors & Key Contributors

* [Tom Maitland](http://tommaitland.net) / [@tommaitland](https://twitter.com/tommaitland)
* [Katia Shatoba](https://github.com/katiaeirin) / [@KatiaEirin](https://twitter.com/KatiaEirin)
* [Scott Sanders](https://twitter.com/scottsanders)
* [Murray Bunton](http://murraybunton.com/) / [@murraybunton](https://twitter.com/murraybunton)
* [Flynn Buckingham](https://flynnbuckingham.com) / [@flynnbuckingham](https://twitter.com/flynnbuckingham)

## Copyright

Copyright 2016 [Agency Strategic Creative](http://agency.sc/) under the [Apache 2.0 license](https://github.com/agency/base/blob/master/LICENSE).
