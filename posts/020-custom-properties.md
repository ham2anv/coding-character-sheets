---
title: "CSS Custom Properties"
date: 2022-05-08 08:39:12-04:00
excerpt: "We look at a flexible and powerful feature of modern CSS that lets you
         write cleaner code and do some really sophisticated styling."
---

There is a powerful feature in CSS that essentially lets you define variables
just like in JavaScript: custom properties. In CSS, a <dfn title="custom property">custom property</dfn> is a user-defined property that holds a value
that can be reused elsewhere in your stylesheet. Custom properties leverage the
power of the cascade to let you alter the value within different scopes without
affecting it elsewhere on your page.

Let's take a look at how you use custom properties and give a few examples of
what you might do with them.

## Setting Properties
You create a custom property by giving it a name starting with two dashes `--`.
Its value can be whatever string you want to reuse later. For example, a custom
property for a color could take a value of a color keyword like `red`, a hex
value like `#FF0000`, or any other valid color.

Let's say we want to define two colors to use throughout our site: a `highlight`
color and a darker `shadow`. The following lines do that for a blue color
palette:

```css
--highlight: #29F;
--shadow: #259;
```

Anything using `--highlight` will be a brighter blue <span style="
background-color: #29F; height: 1em; width: 1em; display: inline-block"></span>.
And `--shadow` will be a darker, muted blue <span style="background-color: #259;
height: 1em; width: 1em; display: inline-block"></span>.

But remember: custom properties use the cascade just like anything else in CSS.
That means you can redefine a custom property in a given element and the new
value passes down to all of that element's children. If I want a value to apply
to the entire page, I generally put the custom property in the `:root`
[pseudo-class] so that it cascades down to everything else.

So, the following code...

```css
:root {
    --highlight: #29F;
    --shadow: #259;
}
.contrast {
    --highlight: #F92;
    --shadow: #952;
}
```

...means that most of the page uses the blues we defined before. But any element
with the `contrast` class will instead use orange <span style="background-color:
#F92; height: 1em; width: 1em; display: inline-block"></span> and brown <span
style="background-color: #952; height: 1em; width: 1em; display: inline-block">
</span>.


## Calling Properties
Now that we've defined our custom properties, how do we use them? By calling the
`var()` function inside other values. `var()` takes one argument, the name of a
custom property, and may take an optional second argument, a default value. So
the following code...

```css
a {
    color: var(--highlight);
}
```

...means that every link uses the value of `--highlight` for its text color.
With our code above, that means most links are going to be blue <span style="
background-color: #29F; height: 1em; width: 1em; display: inline-block"></span>,
unless they are inside an element with the `contrast` class, in which case
they'll be orange <span style="background-color: #F92; height: 1em; width: 1em;
display: inline-block"></span>.

The optional default value is only used if the custom property isn't defined
within the current scope. In some cases, you may want to define a custom
property only in the scope where you need it, but you can still reference it in
styles that do not always overlap.

For example, let's say we're using `<dfn>` elements to define game terms. In most
of the text, we want these terms to use a basic `darkgrey` color <span style="
background-color: darkgrey; height: 1em; width: 1em; display: inline-block">
</span>. But in the section on creating characters, we want them to be
`goldenrod` <span style="background-color: goldenrod; height: 1em; width: 1em;
display: inline-block"></span> to match several other elements in that section.
The following code does just that (leaving out whatever those other elements
may be):

```css
dfn {
    color: var(--trait, darkgrey);
}
.characters {
    --trait: goldenrod;
}
```

It's even possible to call `var()` inside another `var()` function. For example,
in the above code, you could have `<dfn>` elements default to `--highlight`
instead of `darkgrey`:

```css
dfn {
    color: var(--trait, var(--highlight));
}
```


## Example
Here's a specific use case for custom properties that you should be able to
extrapolate into a more general design style. Let's build a background gradient
using utility classes.

A <dfn title="utility class">utility class</dfn> is a CSS class that typically
imparts a single stylistic rule and can be combined safely with other classes.
Rather than defining a single class for an element with many different styles in
it, you could build up an element's styles from multiple utility classes.

When you combine the idea of utility classes with custom properties, you can
build up sophisticated design patterns very quickly. This example is inspired by
the [Tailwind] design system, which I am fond of and use for this site.

We've talked about background [gradients] before. Normally, one would build a
bespoke gradient for a specific element. But with utility classes, we can
compose one almost like writing a sentence. We start with a `bg-gradient` class.
(CSS is generally cool with line breaks, so I added them for readability.) 

```css
.bg-gradient {
  background-image: 
    linear-gradient(
        var(--gradient-direction,to right), 
        var(--from-color,transparent), 
        var(--to-color,transparent));
}
```

Here, each of the three arguments for `linear-gradient()` is a `var()` function
calling a custom property. Each also includes a default value, because
`linear-gradient()` doesn't really work if any of the values is left out.

We define those custom properties in a number of additional utility classes. We
need one or more `from-{color}` classes, one or more `to-{color}` classes, and
some number of `to-{direction}` classes. That looks something like: 

```css
.to-bottom-right {
  --gradient-direction: to bottom right;
}

.from-blue {
  --from-color: blue;
}

.to-red {
  --to-color: red;
}

.to-green {
  --to-color: green;
}
```

With all of these utilities, you could build this...

```html
<div class="bg-gradient from-blue to-red"></div>
<div class="bg-gradient to-bottom-right to-green"></div>
```

...which looks like this (with the addition of `height` and `width`):

<style>
.bg-gradient {
  background-image: 
    linear-gradient(
        var(--gradient-direction,to right), 
        var(--from-color,transparent), 
        var(--to-color,transparent));
}
.to-bottom-right {
  --gradient-direction: to bottom right;
}

.from-blue {
  --from-color: blue;
}

.to-red {
  --to-color: red;
}

.to-green {
  --to-color: green;
}
.box {
  height: 100px;
  width: 100px;
}
</style>

<div class="box bg-gradient from-blue to-red"></div>
<div class="box bg-gradient to-bottom-right to-green"></div>

## Conclusion
Custom properties let you create cleaner, more elegant CSS code, and they can
help you solve some sticky problems. While entirely optional, they are worth
the time it takes to learn their particular ins and outs. Give them a try!

<!-- Links & References -->
[pseudo-class]: posts/pseudo/
[Tailwind]: https://tailwindcss.com/
[gradients]: posts/think-in-boxes/#backgrounds
