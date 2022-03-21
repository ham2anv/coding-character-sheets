---
title: "On Display"
date: 2022-03-21 10:54:32-05:00
excerpt: "A brief introduction to Flexbox and Grid layout systems for CSS."
---

The `display` property is one of the most important for creating sophisticated
layouts with CSS. It determines both how the element fits into the content flow
(is it a block element or inline?) as well as a layout context for the element's
children. And that's where its real power lies.

## Outside Display
We've talked about block vs. inline elements before. This is where you set that
value. Elements have their usual defaults, but you can use `display: block` to turn a
`<strong>` element into a block of its own, for example.

There's not a lot of reason to change this part of the property without also
changing the inside display context, which we'll discuss shortly. If you need a
generic block element, you have our friend the `<div>`. And it has a cousin,
`<span>`, that serves as a generic inline element.

## Inside Display
You are much more likely to use `display` to set the layout context for the
element's children. There's a lot of options here, but the two most important
that we'll talk about today are `flex` and `grid`. (By default, both are blocks,
but you can make either one inline by using `inline-flex` or `inline-grid`. I
don't recommend doing this while you're still learning, though, because things
can get weird.)

### Flex
Flex layout, or flexbox layout, is a layout context for arranging child elements
along a single one-dimension axis, either a row or a column. It's called "flex"
because those children have flexible sizing, able to grow or shrink to best use
the available space. By setting `display: flex`, you turn an element into a
<dfn title="flex container">flex container</dfn>. All of its child elements are
called <dfn title="flex item">flex items</dfn>.

```css
.flex-row {
    display: flex;
}
```

By default, flexbox arranges items in the direction text is normally written
for the document language (left-to-right in English). You can change this with
the `flex-direction` property on the flex container. So this CSS...

```css
.flex-column {
    display: flex;
    flex-direction: column;
}
```

...would create a flex container that arranges its items in the direction that
blocks are normally arranged in the document's language (top-to-bottom in
English).

A flex container has two axes of alignment. The main axis runs in the direction
of the flex context as defined by `flex-direction`, while the cross axis runs
perpendicular to the main axis. By default, flex items stretch to the full width
of the cross axis, but they don't stretch to fill the full width of the main
axis.

The `justify-content` property of the flex container changes how items are
spaced along the main axis. The default is `flex-start`, which aligns all items
as close to the start of the main axis as possible. `flex-end` does the same but
at the end of the main axis, and `center` aligns everything as close to the
center of the main axis as possible. Three other values, `space-around`,
`space-between`, and `space-evenly`, will spread the items out along the main
axis in different ways. The following HTML and CSS...

```html
<div class="flow-space-around">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
```
```css
.flow-space-around {
    display: flex;
    justify-content: space-around;
}
```

...will render like this:

<div style="display: flex;
    justify-content: space-around;">
<div>Item 1</div>
<div>Item 2</div>
<div>Item 3</div>
</div>

Similarly, the `align-content` property aligns items along the cross axis.
`flex-start`, `flex-end`, and `center` work as you'd expect. However,
`align-content` doesn't have the `space-*` options. `align-content` really only
matters if some of your flex items are larger than the others along the cross
axis.

There's so much more to learn about flexbox, and I'm going to cover more
advanced examples of it in the future, but if you want to dig in on your own, I
recommend [A Complete Guide to Flexbox][flexbox] on css-tricks.com as an
excellent guide to the various properties and values involved.

### Grid
So, flexbox has you covered is you just want to line things up in a row or a
column. But what if you want to lay things out in _two_ dimensions? That's where
CSS grid comes in. I'll be honest, when I first discovered grid, I
thought it was total sorcery. It's completely changed how I do my work.

If you've done any amount of layout before, you're certainly familiar with the
idea of a grid. CSS Grid Layout lets you create one for your web page and lay
elements out in specific positions along a grid of rows and columns.

Like with flexbox, you make a <dfn title="grid container">grid container</dfn>
by assigning `display: grid`. All of the container's child elements become
<dfn title="grid item">grid items</dfn>.

By default, a grid container has a single column and as many rows as are needed
to fit all of the grid items. To make a more complex grid, you must define
<dfn title="grid track">grid tracks</dfn> using the `grid-template-columns` and
`grid-template-rows` properties. Each of these let you list any number of length
values that define how wide a column is or how tall a row is. So, the following
CSS...

```css
.grid-1 {
    display: grid;
    grid-template-columns: 200px 300px 200px;
    grid-template-rows: 200px 200px;
}
```

...would create a grid with three columns and two rows. From start to end, the
cells would be 200 pixels, 300 pixels, and 200 pixels wide respectively, and
each cell would be 200 pixels tall.

Grid also introduces a new length unit, the `fr` unit. `1fr` is defined as one
equal fraction of the available space in a grid track. The algorithm calculates
how much of the container's width (for example) is left after subtracting any
absolute sizes (like `200px`), divides it by the total `fr` units defined for
the track, and assigns the fractional cells appropriately. So, the following
CSS...

```css
.grid-1 {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
}
```

...would give a grid with one 200-pixel column on either end, but the column in
the middle would stretch to fill whatever space is left.

Grid items are then laid out along the grid tracks, each item filling one cell.
Grid follows the document's normal flow directions by default. So, in English,
it would fill columns from left to right until it hit the end of the track, then
it would go down to the next row and continue left to right.

You can control the position of an element manually, instead. Imagine that every
column and every row in the grid is divided by numbered lines. The start of the
first column is numbered 1, then 2, 3, and so on. Same with the rows. You can
position a grid item at one of these lines using the `grid-column` and
`grid-row` properties. So the following CSS...

```css
.grid-item-2 {
    grid-column: 2;
    grid-row: 2;
}
```

...would position an item in the second column of the second row, regardless of
where it would have been positioned normally. You can mix and match manually
positioned elements with automatically positioned ones, as well. The algorithm
will skip over a cell if you've already assigned an item there.

If you manually position two items in the same cell, they will overlap.
Whichever item is defined in the HTML source later will appear on top, by
default.

You can also make items span multiple columns and/or rows. If you give
`grid-column` or `grid-row` two numbers seperated by a forward slash `/`, that
item will start at the first numbered line and end at the second.

You can use spanning and overlapping cells to create complex layouts. The
following code...

```html
<div class="grid-overlap">
    <div class="item-1">Ullamco reprehenderit Lorem ullamco veniam enim dolor minim.</div>
    <div class="item-2">Lorem esse ipsum aliquip proident veniam ad sint commodo excepteur ipsum.</div>
</div>
```
```css
.grid-overlap {
    display: grid;
    grid-template-columns: 10em 1fr 1fr 10em;
    grid-template-rows: 1fr 1fr 1fr;
}

.item-1 {
    grid-column: 1 / 3;
    grid-row: 1 / 4;
    background-color: pink;
    color: black;
}

.item-2 {
    grid-column: 2 / 5;
    grid-row: 2 / 3;
    background-color: skyblue;
    color: black;
}
```

...renders like this, for example.

<div style="display: grid;
    grid-template-columns: 10em 1fr 1fr 10em;
    grid-template-rows: 1fr 1fr 1fr;">
    <div style="grid-column: 1 / 3;
    grid-row: 1 / 4; background-color: pink; color: black;">Ullamco reprehenderit Lorem
    ullamco veniam enim dolor minim.</div>
    <div style="grid-column: 2 / 5;
    grid-row: 2 / 3; background-color: skyblue; color: black;">Lorem esse ipsum aliquip
    proident veniam ad sint commodo excepteur ipsum.</div>
</div>

Much like with flexbox, Grid Layout has many more options and permutations. I
recommend css-tricks.com's [A Complete Guide to Grid][grid] as a resource for
learning how to use this powerful tool.

## Conclusion
Hopefully you can already see uses for both flexbox and grid in your designs.
We'll look at more concrete examples in the future, but I challenge you to play
around with both and get a feel for them.

<!-- Links & References -->
[flexbox]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[grid]: https://css-tricks.com/snippets/css/complete-guide-grid/
