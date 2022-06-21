---
title: On the Grid
date: 2022-06-21 10:13:25-04:00
excerpt: "We begin our deeper dive into the true design sorcery that is CSS
 Grid."
---

The CSS Grid layout system is probably my favorite tool for design these days.
With Grid, you can do so many amazing tricks that would have been nearly
impossible a decade ago. I discussed some of the [basics of Grid] in an earlier
post, but let's dig a little deeper today.

## What is Grid?
[CSS Grid] is a layout system for designing pages with content that needs to be
arranged in two dimensions. This sets it apart from the Flex layout system,
which is intended for arranging elements along a single dimensional axis. Grid
works like the traditional layout grid for which it's named, establishing rows
and columns and placing elements into cells or areas at the intersections.

Unlike traditional HTML tables, which also allow for arranging elements in two
dimensions, CSS Grid allows for more sophisticated relationships. Elements can
overlap each other and layer intelligently, for example. And a Grid layout can
be dynamic, adjusting itself based on varying numbers of elements or even the
size of the viewport.

## Setting Things Up
Any Grid layout first needs a <dfn title="grid container">grid container</dfn>,
an element with `display: grid`. This establishes that every direct child within
the container will be a <dfn title="grid item">grid item</dfn>. Without any
extra CSS, the browser uses a few important defaults to render this grid:

1. The grid has a single column that is as wide as the grid container.
2. Each grid item generates its own row, which display one after the next.
3. Each column starts and ends at invisible, vertical grid lines. Similarly,
   each row starts and ends at invisible, horizontal grid lines. These lines are
   numbered, starting at 1, so our single column starts at line 1 and ends at
   line 2. (We can reference these lines in CSS, and we will in a bit.)
   
Assuming all of the grid items are normal block elements, the result won't look
any different than normal flow layout. So how do we shake this up?

The `grid-template-rows` and `grid-template-columns` define tracks for our grid.
<dfn title="grid tracks">Grid tracks</dfn> are the spaces between the invisible
numbered lines. By default, the browser creates one vertical track (our single
column) and as many horizontal tracks as it needs to fit all child elements. But
we can deviate from that default by setting the `grid-template-*` properties.

The simplest way to do this is to set specific lengths for the width of each
column or the height of each row. That would look something like this:

```css
.grid-container-3x3 {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
```

This creates a grid with three columns, each 100 pixels wide, and three rows,
each 100 pixels tall. Where two tracks intersect, we get a 
<dfn title="grid cell">grid cell</dfn>, so this grid would have nine cells, each
100 pixels by 100 pixels.

Whatever grid items we have in our container will be placed into these cells one
by one, filling a row, then moving to the next. If there are fewer than nine
grid items, the rest of the grid is blank. Any completely empty rows [collapse].

But what if there's _more_ than nine grid items? In such a case, the browser has
to create new rows, and to do so, it relies on the <dfn title="implicit grid">
implicit grid</dfn>. This means that it creates a new row, but without a set
size, that row is automatically sized based on the content of the grid items in
it. These extra rows will probably not feature our ideal 100px-by-100px cells.

To avoid this, we can tell the browser what size to make the new rows in the
implicit grid using the `grid-auto-rows` property. In fact, `grid-auto-rows`
lets us simplify our grid above, if we don't always know that we'll have exactly
nine grid items.

```css
.grid-container-3-columns {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-auto-rows: 100px;
}
```

## Getting Flexible
Of course, setting exact measurements for our tracks will get tedious very fast,
if we have content of many different sizes. We're better off letting the browser
do the work for us, and that's where flexible sizes come in.

CSS Grid introduces a new length unit, the <dfn title="fractional unit">
fractional unit</dfn> or `fr`. If a track is `1fr` in size, that means it will
take up one full share of the available space, after accounting for anything
with an absolute size, like `100px`. If you have multiple tracks with `fr`
sizing, the browser adds up all of the `fr` units and divides the available
space proportionally. So, if you have the following grid...

```css
.grid-lopsided {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
}
```

...it would render with any item in the third column taking up half the total
width of the grid container, and the items in the first two columns getting a
quarter of the width each. If you had `grid-template-columns: 100px 1fr 1fr 2fr`
instead, then the first column would always be 100px, and any remaining width
would be divided up as before.

To simplify larger and more sophisticated layouts, CSS Grid introduces a few
functions you can use within your `grid-template-*` properties. The most
important when you're starting out is `repeat()`. This function takes two
arguments: a number of times to repeat, and the actual value to be repeated. So,
`repeat(3, 1fr)` is the equivalent of `1fr 1fr 1fr`.

The value to be repeated can be more complex, however. For example,
`repeat(3, 50px 1fr)` is the equivalent of `50px 1fr 50px 1fr 50px 1fr`.
No, I don't know why you would use that particular construction, but you can see
how you could quickly build up more complicated layouts using `repeat()`.

## More to Come
We've only scratched the surface of CSS Grid. It's such a powerful tool, that
I'll be following up on this in the next few posts. Until then, mess around with
Grid and see what you come up with!

<!-- Links & References -->
[basics of Grid]: /posts/css-display/#grid
[CSS Grid]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
[collapse]: /posts/basic-css-typography/#spacing-and-the-box-model
