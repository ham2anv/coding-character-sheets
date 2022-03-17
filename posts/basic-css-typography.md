---
title: "Basic CSS Typography"
date: 2022-03-17 07:45:16-05:00
excerpt: "Let's look at some of the basic CSS properties you'll want to use
         in just about every document."
---

Now that we've covered the basics of how to use CSS, let's take a look at
some properties you'll use in nearly every document you make. In fact, these
may be _all_ you need for simple documents like player handouts. Let's go.

## Color
We talked about the `color` property [before][Intro CSS]. You can apply it to
just about any element that contains text. There are two main formats for the
value: keywords and hex codes.

Color [keywords] are names found on a list of 140 predefined colors. Examples
include the basics you'd expect to find, like `red`<span style="display:
inline-block; height: 1em; width: 1em; background: red"></span>, `green`<span
style="display: inline-block; height: 1em; width: 1em; background: green">
</span>, and `blue`<span style="display: inline-block; height: 1em; width: 1em;
background: blue"></span>, plus others with more interesting names, from
`aliceblue`<span style="display: inline-block; height: 1em; width: 1em;
background: aliceblue"></span> to `rebeccapurple`<span style="display:
inline-block; height: 1em; width: 1em; background: rebeccapurple"></span>.

Hex codes are a way to represent colors as a string of six [hexadecimal]
digits (0-9, A-F). Every hex code starts with a hash character `#` followed by
two digits for the red value of the color, two digits for the green value,
and two digits for the blue value. Each pair of hexadecimal digits gives a
decimal value between 0 (`00`) and 255 (`FF`).

_Examples_: Pure red<span style="display: inline-block; height: 1em; width:
1em; background: #FF0000"></span> is `#FF0000`. Pure green<span style="display:
inline-block; height: 1em; width: 1em; background: #00FF00"></span> is
`#00FF00`. Mixing pure red with pure green (`#FFFF00`) gives you yellow<span
style="display: inline-block; height: 1em; width: 1em; background: #FFFF00">
</span>.

If you want to understand color hex codes better, I recommend this [fantastic
talk][DeSandro] by David DeSandro on YouTube.

There are a few more advanced ways to define color in CSS, including the
[rgba()] and [hsl()] functions, but we'll talk about them in a future post.

## Weight, Style, & Size
Varying the weight (boldness), style (italic, etc.), and size of your text does
so much work to make your document easier to read and understand. Browsers set
a lot of defaults that can serve you decently well, but eventually you'll want
to take finer control over your elements.

The `font-weight` property sets the weight of your text. If you know the
weights you have available from your fonts (which we'll cover in a bit), you
can use specific numbers. But you should always be able to use keywords like
`bold`. The following CSS...

```css
.term {
    font-weight: bold;
}
```

...makes any element with the `term` class bold.

Most typefaces will provide normal and italic styles. Use the `font-style`
property to set which style an element should use.

```css
.definition {
    font-style: italic;
}
```

Font size can get a bit more complicated, but the basics are simple. The
`font-size` property can take explicit values in different units, including
pixels `px`, points `pt`, or even centimeters `cm` or inches `in`. Or you can
define it relative to the font-size of the parent element with the `em` unit
or the root element (usually the `<html>` element) with the `rem` unit. So, the
following CSS...

```css
body {
    font-size: 12pt;
}

h1 {
    font-size: 3.5em;
}
```

...sets the base size of text in the whole body of the document to 12 points
and sets the size of all `<h1>` elements to 3.5 times the font size of their
parent element. So `<h1>` elements directly within the `<body>` would be 42
points.


## Typeface
Browsers set a number of default typefaces, but these vary from browser to
browser and from operating system to operating system. If you want to take more
control, you'll need to provide your own fonts.

Use the `font-family` property to set the typeface for an element. The value
can be one or more of a font family name in quotes `""` or a keyword for a
generic font family, like `serif` or `monospace`, not in quotes. If you use a
name for a specific family, that font must be installed on the target's system,
or you must load it in your CSS.

If you have a local font file you want to use, you can define it in your CSS
with the `@font-face` rule:

```css
@font-face {
    font-family: "Roboto";
    src: url("/fonts/Roboto.ttf");
}
```

This makes the Roboto family available if the `Roboto.ttf` file is located in
the `/fonts/` directory of your site.

It's also possible to import fonts from other sites using the `@import` rule. A
great source of fonts to import this way is [Google Fonts]. If you choose a
font there, Google provides the CSS you need. For example, if you wanted to
import Roboto from Google Fonts, you could use this CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
```

## Spacing & the Box Model
In HTML/CSS, every element that displays on page is treated as a box. It has a
height and a width, which by default are determined by its content. You can
define specific values for height and width...

```css
.box {
    height: 200px;
    width: 300px;
}
```

...but if the element's content would take up more space than you've defined,
it will "overflow" and be displayed at least partially outside of the element's
box.

Each box can have additional space around it, called the <dfn title="margin">
margin</dfn>, and space within it between its border and its content, called
the <dfn title="padding">padding</dfn>. You can define these individually for
each side of the box or with a single value for all sides:

```css
.margin-box {
    margin-top: 2em;
    margin-bottom: 3em;
    margin-left: 1em;
    margin-right: 0;
}

.padding-box {
    padding: 1em;
}
```

CSS has a special rule called "margin collapse":

- If two adjacent sibling elements have overlapping top and bottom margins, the
  total space between them will be the greater of the two overlapping margins,
  not both added together.
- If there is nothing between the top of a parent element and the top of its
  first child element (including padding in the parent), the top margin of the
  parent and the top margin of the child will collapse to a single margin equal
  to the greater of the two.
- If an element is empty and there would be nothing between its top and bottom
  margins (including padding or height), the top and bottom margins will
  collapse to a single margin equal to the greater of the two.

You don't have to memorize this, but remember it exists if you start getting
unexpected spacing between elements.

## Conclusion
You can do so much with just these simple typographical properties. Play around
with a small document with some headings and some paragraphs and see what they
look like with different text sizes, weights, font families, and margins.
Have fun with it!



<!-- Links & References -->
[Intro CSS]: posts/introducing-css/#defining-styles
[keywords]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords
[hexadecimal]: https://en.wikipedia.org/wiki/Hexadecimal
[DeSandro]: https://youtu.be/eqZqx6lRPe0
[rgba()]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba()
[hsl()]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()
[Google Fonts]: https://fonts.google.com
