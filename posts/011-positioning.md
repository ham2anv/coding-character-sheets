---
title: "Everything In Its Place: Positioning with CSS"
date: 2022-03-25 09:08:08-05:00
excerpt: "An introduction to more precise positioning of elements with CSS."
---

Between normal flow layout and more advanced models like [Flexbox and Grid],
your browser does a pretty great job putting all the elements of your page
together in a sensible manner. But sometimes you want more control over where
certain elements get placed, even taking them out of the normal flow of content
entirely. That's where the `position` CSS property comes in.

Each of these positioning options uses the `top`, `bottom`, `left`, and `right`
properties to set the element's position. How those four properties works varies
with each type of positioning, however.

## Relative Positioning
An element with `position: relative` can be positioned by any amount offset from
its normal place in the content flow. Everything else on the page gets
positioned as if the relative element were in its normal place, but the element
is drawn offset from there.

For a relative element, `top` moves the object down for a positive value and up
for a negative one, relative where its box would normally be in the flow.
`left` moves the object right for a positive value and left for a negative one.
`bottom` and `right` are opposite these.

Say we have three boxes arranged in a line with Flexbox:

```html
<div class="flex">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</div>
```
```css
.flex {
    display: flex;
    margin-top: 2em;
}

.box {
    height: 2em;
    width: 2em;
    background-color: green;
    border: 1px solid blue;
    margin-right: 1ch;
}
```

<style>
.flex {
    display: flex;
    margin-top: 2em;
}

.box {
    height: 2em;
    width: 2em;
    background-color: green;
    border: 1px solid blue;
    margin-right: 1ch;
}
</style>

<div class="flex">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</div>

If we give the middle box `position: relative` and `top: -1em`, what happens?

<div class="flex">
    <div class="box"></div>
    <div class="box" style="position: relative; top: -1em;"></div>
    <div class="box"></div>
</div>

It moves up by `1em`. But you can see that its normal space in the content flow
is maintained. None of the elements around it are affected.

## Absolute Positioning
Both `position: absolute` and `position: fixed` take the element out of the
normal content flow. Everything around the element gets placed as if the element
didn't exist.

With `position: absolute`, the element is placed relative to the edges of its
closest positioned parent. If nothing else above it has `position` defined, it
will default to the <dfn title="initial containing block">initial containing
block</dfn>, which usually means the viewport of the browser. To control how
absolutely positioned elements are placed, you can give the parent element
`position: relative` without giving it any `top`, `bottom`, etc.

An element with `position: fixed` is always placed relative to the initial
containing block, even if one of its parents is positioned. (The exception to
this rule is if the fixed element's parent has a CSS transform effect applied,
but we'll have to talk about those some time in the future.)

For either of these options, `top`, `bottom`, `left`, and `right` work like they
do with `relative`, only they are counted from the corresponding edge
of the containing block (the parent or the viewport).

If we take those three boxes from before and make the second one
`position: absolute` (and make the flex container `position: relative` to keep
everything in check), we get this:

<div class="flex" style="position: relative">
    <div class="box"></div>
    <div class="box" style="position: absolute; top: -1em;"></div>
    <div class="box"></div>
</div>

The "middle" box has been removed from the content flow, so the other two boxes
are now placed next to each other. Then the positioned box is placed `1em` above
the top of the flex container. Since no `left` or `right` property was defined,
it defaults to the left edge of the container.


## Application
What can you do with these options? All sorts of neat tricks. But here's a quick
example.

Say you have a `<div>` that serves as important reminder text. You want to call
this out to the reader and make sure they read it carefully. To do this, you can
put in some kind of icon to draw their attention.

```html
<div class="note">
    ...icon goes here, some kind of image...
    ...text goes here...
</div>
```
```css
.note {
    position: relative;
    ...any other styling...
}
.icon {
    position: absolute;
    top: -1ch;
    left: -1ch;
    ...any other styling...
}

```

<style>
.note {
    margin: 1em 2em;
    position: relative;
    background-color: #DDFFDD;
    color: black;
    padding: 1.5em 1em 0.5em 1em;
}
.icon {
    position: absolute;
    top: -1ch;
    left: -1ch;
    color: white;
    background-color: red;
    border-radius: 30%;
    width: 2em;
    height: 2em;
}
</style>

<div class="note">
<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
</svg>
Ut id deserunt culpa cupidatat est ullamco. Officia laborum pariatur amet
esse esse et fugiat eiusmod elit qui voluptate ea. Consequat cupidatat commodo
irure aute eiusmod quis ex sint. Nulla pariatur ad enim elit quis ut dolor.
Ullamco duis aliqua nisi ullamco magna ipsum adipisicing dolore et ad proident.
Enim et sunt ea do cupidatat velit cupidatat consectetur proident dolor sint
quis.
</div>

So, we have a box of text with a prominent icon overlapping the upper left
corner. The icon doesn't affect the layout of the text inside the box.

## Conclusion
There's a lot more we can do with positioning properties, like making menu bars
that stay fixed to the edge of the screen even when you scroll. Those are
exercises for the future, however. For now, think about ways you might use them
in your own projects. I'm sure you'll come up with plenty of ideas.

<!-- Links & References -->
[Flexbox and Grid]: posts/css-display/
