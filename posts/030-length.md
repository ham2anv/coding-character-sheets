---
title: "CSS Length Units"
date: 2022-08-31 08:57:31-04:00
excerpt: We go over the basics of length and sizing in CSS, including both
  relative and absolute values.
---

One of the most important considerations in design is _size_. How big is a given
element? How big are the spaces between elements? We anser these questions in
CSS properties like `width`, `margin`, and so on. These properties take values
of the `<length>` type.

## Basics
A length unit is written as a number follwed by a few characters denoting the
unit, with no space between. If you wanted something to have a length of 1 inch,
you would write `1in`.

Some units, like `in` are absolute, relating to real-world measurements, pixels
on the display, and so on. Other units are relative, based on some other value
inherited from elsewhere in our style sheet or from the user agent, the
browser's default values.

## Relative Lengths
In most cases, you want to use relative length units. These let your design
respond fluidly to the user's particular setup. Relative units are given a
<dfn title="computed value">computed value</dfn> when the browser renders them,
derived from whatever reference is appropriate for the unit.

### Font-based Units
The most common length units based on font are `em` and `rem`. These refer to
the overall size of a particular font: the font of the current element for `em`
or the root element (usually the `<html>` element) for `rem`. (A typical
browser default for `1rem` is `16px`.)

I recommend basing as much of your design's sizing as possible on `rem`. It lets
you mainting a consistent visual rhythm even if the user changes the font size.
The user has good reasons for making such a change, whether its accessibility or
simple comfort, and your design shouldn't fight them.

Other font-relative units include:

- `ch`, equal to the width (or more accurately, the [advance measure]) of the
  `0` character in the current font;
- `ic`, equal to the advance measure of the `水` character in the current font;
- `ex`, equal to the x-height of the current font, which is usually the height
  of lower-case letters.

### Viewport-based Units
It is also possible to base lengths off of the size of the viewport using
relative units. The most common of these are the `vh` and `vw` units, where 
`1vh` is equal to 1% of the height of the viewport and `1vw` is 1% of its width.

Using `vh` and `vw` in a resizable viewport (a desktop browser as opposed to
mobile, for example) can give unintended results at times. In these cases, you
can use `vmin` and `vmax`, which are relative to the smaller viewport dimension
and the larger, respectively.

## Absolute Lengths
Sometimes, you'll need to use absolute lengths in your design. The best time for
them is when you know the specific dimensions you are targeting, such as when
you are designing for print. Available units include:

- real-world measures such as inches `in`, centimeters `cm`, or milimeters `mm`;
- print-based measures like the point `pt` (1/72nd of an inch) or the pica `pc`
  (12 points or 1/6th of an inch)
- or the pixel `px` (1/96th of an inch), which may be a single physical pixel on 
  a low-resolution device or multiple on high-resolution devices.

## Conclusion
Here we have the basics of CSS length units. Whenever you need to set a font
size, define an element's dimensions, or position something, you can use one of
these units. For more information, including discussion of how these units are
derived technically, check out the [MDN article] on length.

<!-- Links & References -->
[advance measure]: https://developer.mozilla.org/en-US/docs/Glossary/advance_measure
[MDN article]: https://developer.mozilla.org/en-US/docs/Web/CSS/length
