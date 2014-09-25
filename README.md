Raster.gs [![Build Status](https://travis-ci.org/webfactory/Raster.gs.svg)](https://travis-ci.org/webfactory/Raster.gs)
=========

Raster.gs is an SCSS based grid system with the following features:
* you can use more than one grid and choose different grids for different devices
* have multiple grids
* nest grids as deep as you want
* create grids with uniform-width columns or completely weird ratio-based ones
* leave columns out, no need for `offset`-classes
* independence of any frameworks
* toggle different options to avoid creation of unneeded classes
* clever extends avoid messing up compiled css
* support for older browsers

## Demo
Play with it on [codepen] (http://codepen.io/wfmarc/pen/ACrhv).

Or see some prepared demos in `demos/`. 

## Requirements
Sass > 3.4.5

## Installation
Import the `_raster.scss` file into your Sass files to import the needed mixins and start creating your own grids.
```SCSS
@import 'PATH/raster.gs/dist/_raster.scss';
```

### Package manager
Raster.gs is registered in Packagist and Bower.
#### Install via Bower
Go to your project folder and type the following command in your console
```
bower install raster.gs
```

#### Install via Composer
Add this line to your requirements in composer.json
```
"webfactory/raster.gs": "dev-master"
```

## Using the grid
### Create a new grid system
Include the mixin `raster()` in your Sass to generate a new grid. Raster.gs uses [configuration objects] (http://hugogiraudel.com/2014/05/05/bringing-configuration-objects-to-sass/).
```SCSS
$conf: (
    columns: 12,
    prefix: 'column',
    gutter: 4,
    combinations: true,
    helpers: true
);
@include raster($conf);
```

##### `$columns`
This defines the number of your columns which must be either a number or a list of percentages (remember: do not go higher than 100%). 
<code>$columns: 4</code> means that you want a grid with 4 columns with equal widths. You could express the same with a list of ratios <code>$columns: (1,1,1,1)</code>.
<code>$columns: (75,25)</code> means that you want a grid with 2 columns where first column makes three quarters and the second one makes one quarter.

##### `$prefix`
This is a prefix for the CSS classes that are created, it must be a string. The default is `'column'`.
```SCSS
$conf: (
    columns: 4,
    prefix: 'test'
);
@include raster($conf);
```
The code above creates the following CSS classes which present columns from 1 to 4:
* test-1
* test-2
* test-3
* test-4
* and their combinations (more on this below)

Giving your grids unique names makes it possible to generate an infinite number of grids, that way you can even use them in your mediaqueries like this:
```SCSS
@media (max-width:768px){
    $tablet: (
        columns: 4, 
        prefix: 'tablet'
    );
    @include raster($tablet);
}
@media (min-width:769px){
    $desktop: (
        columns: 8, 
        prefix: 'desktop'
    );
    @include raster($desktop);
}
```
Because of that you could even use a grid for different purposes, maybe one grid for layout and another one for a gallery.
```SCSS
$layout: (
    columns: 4,
    $prefix: layout
);
@include raster($layout);
$gallery: (
    columns: 8,
    prefix: gallery
);
@include raster($gallery);
```

##### `$gutter`
This is the width of your gutters between your columns. It must be a number.
```SCSS
$conf: (
    columns: 4,
    gutter: 10
);
@include raster($conf);
```
The code above creates a grid with four columns where the gutters are 10% width.

##### `$combinations`
This decides whether to create CSS classes with combinations of your columns or not. It must be a boolean (true or false). By default this is set to true.
```SCSS
$conf: (
    columns: 4,
    combinations: true
);
@include raster($conf);
```
Additionally to the generated CSS classes mentioned before the above code creates the following classes:
* test-1-2
* test-1-3
* test-1-4
* test-2-3
* test-2-4
* test-3-4

These classes represent the combinations of your columns. For example: test-1-2 fills the space of the first two columns, test-1-4 fills the space of all four columns.

If you have many columns this option could blow up your css file size. So turn it off, if you don't need them.

##### `$helpers`
Every grid that is generated brings the following helper classes
* raster: this is a wrapper for your columns (it will only be generated once)
* PREFIX-pad: apply a padding that fits your grid gutters to column 
* PREFIX-hidden: hides an element
* PREFIX-full: sets an element to full width
* PREFIX-first: clears the floating of an element. Use this if you want a row to start at another column instead of column one

##### Nesting
As all grid classes are based on relative units (percentages) you can simply nest them.
```HTML
<div class="raster">
    <div class="desktop-1">
        <div class="desktop-1"></div>
        <div class="desktop-2"></div>
        <div class="desktop-3-4"></div>
    </div>
</div>
```
You can also nest different grids
```HTML
<div class="raster">
    <div class="desktop-1">
        <div class="tablet-1"></div>
        <div class="tablet-2-4"></div>
    </div>
</div>
```

### Use standalone mixins
Want to create a more semantic layout without generation of unneeded grid classes? I've prepared some mixins for you!

##### `row`
This creates a new row which contains columns.
```SCSS
.example {
    @include row;
}
```

##### `column($conf, $column, $span)`
Create a new column.

```SCSS
$conf: (
    columns: 4,
    gutter: 10
);
aside {
    @include column($conf, 1) //this is placed in the first column
}

main {
    @include column($conf, 2, 4) //this goes from the first to the fourth column
}
```

##### `pad($conf)`
This adds a padding which fits the gutter of the grid system.

```SCSS
$conf: (
    columns: 4,
    gutter: 10
);
.example {
    @include pad($conf)
}
```

##### `full`
Creates a column filling the full width of its parent.

```SCSS
.example {
    @include full;
}
```

##### `hidden`
This hides a column.

```SCSS
.example {
    @include hidden;
}
```

## Settings
The following variables can be overwritten in your project:
```SCSS
$rgs-grid-row: 'grid-row'; //set the name of a row
```

## Use in your framework
Raster.gs is splitted in two parts: public and private. The public parts can be used by anyone without any dependency, 
These have _human-readable_ names and include things like parameter validation and so forth. If you want to use your own names
and don't want or need parameter validation you can use the files in the private dir. I only recommend this for experienced users.

## Browsersupport
Raster.gs works from Internet Explorer 8 and up.

## Todo
Want to help? Got some things to do!
* include SassDoc

## Changelog
### 3.0.0
* $gutter default is now 4 (was 2 before)
* replaced $quiet mode with column mixins
* removed `first` helper
* cleaned the code up
* introduced configuration objects
* create percentage based ratios (was factor based before)
* fixed width bug with combined columns
* splitted code in private and public parts
* included pad classes
* `.grid-row` is now `.raster`
* added some demos

### 2.1.0
* $gutterWidth is now $gutter
* gutters are now two paddings

### 2.0
* mixin `grid` is now `raster`
* introduced `$quiet` mode
* prefixed private functions with underscore
* improved documentation
    - docblock documentation
* testing
    - input validation and error messages
    - bootcamp unit testing
    - continuous integration with travis ci
    - css linting
* concatenated main file for bower
* extracted functions in partials
* improved performance
    - cleaner code
    - clever use of placeholders
