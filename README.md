Raster.gs
=========

Raster.gs is a SCSS based grid system with the following features:
* you can use more than one grid and choose different grids for different devices (breakpoints!)
* nest grids (but never more than three levels deep; cue Inception Soundtrack)
* create grids with uniform-width columns or completely weird ratio-based ones
* possibility to leave columns out
* independence of any frameworks
* support for older browsers

## Requirements
A mixin "clearfix" which contains the micro clearfix from Nicolas Gallagher is required. 
If you already have one in your project you can just use that one.
If you don't have one, you can get it from here: https://github.com/mmintel/clearfix

## Installation
Import the _raster.scss file into your Sass files and you are done.
```SCSS
@import 'PATH/Raster.gs/_raster.scss';
```

## Using the grid
### The SCSS part
Include the mixin _grid_ in your Sass to generate a new grid. You can pass the number of columns, the prefix for your grid, the width for your gutters and choose whether combinations should be generated.
```SCSS
@include grid($columns, $prefix:g, $gutterWidth: 2, $combinations: true);
```

#### $columns
This defines the number of your columns which must be either a number or a list of ratios. 
<code>$columns: 4</code> means that you want a grid with 4 columns with equal widths. You could express the same with a list of ratios <code>$columns: (1,1,1,1)</code>.
<code>$columns: (2,1)</code> means that you want a grid with 2 columns where the second column is half of the first column.

#### $prefix
This is a prefix for the CSS classes that are created, it must be a string. The default is _g_.
```SCSS
@include grid($columns: 4, $prefix: test);
```
The code above creates the following CSS classes:
* test-1
* test-2
* test-3
* test-4
* and their combinations (more on this later)

Giving your grids unique names makes it possible to generate an infinite number of grids, so you can even use them in your mediaqueries like this:
```SCSS
@media (max-width:768px){
    @include grid($columns:4, $prefix: tablet);
}
@media (min-width:769px){
    @include grid($columns:8, $prefix: desktop);
}
```
Because of that you could even use a grid for different purposes, maybe one grid for layout and another one for a gallery.
```SCSS
@include grid(4, $prefix: layout);
@include grid(8, $prefix: gallery);
```

#### $gutterWidth
This is the width of your gutters between your columns. It must be a number.
```SCSS
@include grid($columns: 4, $gutterWidth: 10);
```
The code above creates a grid with four columns where the gutters are 10% width.

#### $combinations
This decides whether to create CSS classes with combinations of your columns or not. It must be a boolean (true or false). By default this is set to true.
```SCSS
@include grid($columns: 4, $combinations:true);
```
Additionally to the generated CSS classes mentioned before the above code creates the following classes:
* test-1-2
* test-1-3
* test-1-4
* test-2-3
* test-2-4
* test-3-4

If you have many columns this option could blow up your css file size. So turn it off, if you don't need them.

#### Helper Classes
Every grid that is generated brings the following helper classes
* PREFIX-hidden: hides an element.
* PREFIX-full: sets an element to full width.
* PREFIX-first: clears the floating of an element. Use this if you want a row to start at another column instead of column one.

### The HTML part
On the contrary to usual grids like the one from Twitter Bootstrap or Foundation this grid system creates "real" columns and not just ranges. Imagine your content does not go from this column to that column, but your content fills in each column. By that you get the advantage to reposition content for different grids. In the following code example your content fills the first column for desktop, the first and the second column for tablets and all columns for mobile.
```HTML
<div class="desktop-1 tablet-1-2 mobile-full">Here is your content</div>
```

#### Nesting
As all grid classes are based on relative units (percentages) you can simply nest them.
```HTML
<div class="desktop-1">
    <div class="desktop-1"></div>
    <div class="desktop-2"></div>
    <div class="desktop-3-4"></div>
</div>
```
You can also nest different grids
```HTML
<div class="desktop-1">
    <div class="tablet-1"></div>
    <div class="tablet-2-4"></div>
</div>
```

## Browsersupport
Raster.gs should work  in all modern browsers and in old browsers down to Internet Explorer 7.
We tested it in the following ones and didn't find a bug yet:
* Internet Explorer 7, 8, 9, 10, 11 Preview
* Firefox 3.0, 3.6, 8.0, 24 (Windows)
* Firefox 4, 24 (Mac)
* Chrome 14, 30 (Mac)
* Chrome 14, 24 (Windows)
* Chrome (Android 1.5, 2.2, 4.0)
* Safari 4, 5, 6 (Mac)
* Safari 4 (Windows)
* Safari (iOS 3.0, 6.0, 7.0)
* Opera 11.1, 16 (Mac)
* Opera 10 (Windows)
* Opera Mobile 11.5

## See it in action
* http://www.webfactory.de
