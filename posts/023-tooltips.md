---
title: "Pop-Up Tooltips"
date: 2022-06-03 12:08:59-04:00
excerpt: "A tool for adding interactive tooltips to your game, good for defining terms, etc."
---

<link rel="stylesheet" href="posts/tooltips/tooltips.css">
<script src="posts/tooltips/tooltips.js" defer></script>

Sometimes you want to provide additional, but optional, information in your
document, and a perfect way to do this is with a <dfn title="tooltip">tooltip
</dfn>. This is a small overlay that pops up when the user interacts with an
element, such as by hovering over it with their mouse pointer. HTML gives you a
simple method of adding such tooltips: the `title` attribute. (Hover over the
italicized word "tooltip" above, and you'll see such a title popup.)

But if you want to style your tooltips to better fit in with your page design,
even just to use your color palette, you'll need to do a little more work.
That's where this tool comes in. The CSS (and a little bit of JavaScript) here
will let you easily add tooltips wherever you need them.

Grab the example [files] at GitHub.

## HTML
It's simple to add a tooltip to any element in your page. All you have to do is
give the element the `tooltip` class and a `data-tooltip` attribute with the
text you want in the popup. It's probably easiest to use `<span>` elements, but
you can really do it to any element you need a popup for.

```html
Attacks against the dragon have
<span class="tooltip" data-tooltip="Roll two d20s and take the higher result.">
advantage</span>.
```

Attacks against the dragon have <span class="tooltip" data-tooltip="Roll two
d20s and take the higher result.">advantage</span>.


## CSS
This tool uses the `tooltip` class to denote an element that will have a popup
tooltip attached. This class can give whatever styling you want to the element.
In our example, we give a dotted border and turn the cursor into a question mark
to indicate that the popup is information about the element.

The most important parts of the `tooltip` class are `position: relative` and the
three [custom properties]: `--tt-space`, `--tt-bg`, and `--tt-text`. Setting the
`position` property creates a positioning [context] for the popup. The custom
properties are used to style the popup, with `--tt-bg` and `--tt-text` providing
colors and `--tt-space` used in our JavaScript later.

```css
.tooltip {
    cursor: help;
    border-block-end: 1px dotted crimson;
    position: relative;

    --tt-space: 0;
    --tt-bg: #DEE;
    --tt-text: #112;
}
```

Next, we use a `::before` [pseudo-element] to create a small arrow to connect
the popup to the base element. This relies on a quirk of CSS borders. Remember
that all elements on your page are actually rectangles. But by pairing
transparent borders with a colored border and 0 `width` and `height`, you can
make an empty element look like a triangle. For more, see this [article] on
CSS-Tricks.


```css
.tooltip::before {
    content: "";
    position:absolute;
    top: 1rem;
    left: calc(50% - 0.25rem);
    width: 0;
    height: 0;
    border-inline: 0.5rem solid transparent;
    border-block-end: 0.5rem solid var(--tt-bg);
    transition: all 400ms;
    opacity: 0;
}
```

The meat of this tool is in the `::after` pseudo-element. First, it draws its
`content` property from the `data-tooltip` attribute on the base element using
the `attr()` CSS function. The `background-color` and `color` properties use
those custom properties we defined earlier.

The one thing you might not be familiar with is the `transform` property. This
is used by our JavaScript below to nudge the popup to stay inside the
browser's viewport. We use that `--tt-space` custom property because JavaScript
can't reach inside pseudo-elements. We'll explain this more in a bit.

```css
.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    top: 1.3rem;
    left: 0;
    background-color: var(--tt-bg);
    color: var(--tt-text);
    width: max-content;
    max-width: 200%;
    padding: 0.3rem;
    border-radius: 0.3rem;
    text-align: center;
    font-size: 0.75rem;
    transform: translateX(var(--tt-space));
    transition: all 400ms;
    opacity: 0;
}
```

Finally, we include a small rule to make the popup fade in and out when you
hover over the base element.

```css
.tooltip:hover::after, .tooltip:hover::before {
    opacity: 1;
}
```

## JavaScript
We only need a small bit of JavaScript for this tool. Our CSS positioning
doesn't know where the edges of the browser's viewport are, so our popup might
end up overflowing the right edge of the window. To prevent that, we use a
little JS to nudge it back inside.

We've used `querySelectorAll()` to grab every element with a certain class
before. Here we're selecting everything with the `tooltip` class. Then we're
adding an event listener to each of them to check for whenever the pointer
enters the element's box.

When that happens, we check to see if the base element is too close to the
right edge of the viewport. If it is, we set the `--tt-space` custom property
on the base element to `-50%`. This property is called inside the `translateX()`
function on the `::after` pseudo-element, and when we set it here, it moves the
popup to the left by half its width. (If the base element is far enough from
the edge, we make sure to reset the `--tt-space` property.)

```javascript
const tips = document.querySelectorAll(".tooltip");
tips.forEach(tip => tip.addEventListener("pointerenter",ev => {
    const el = ev.target;
    const rect = el.getBoundingClientRect();
    if (rect.left > window.visualViewport.width - rect.width*2) el.style.setProperty("--tt-space",`-50%`);
    else el.style.setProperty("--tt-space",`0`);
}));
```


## Conclusion
And that's it. Just include the CSS and JS files in your page, then assign the 
`tooltip` class and a `data-tooltip` attribute to whatever element you want to
have a popup.

In the future, we'll combine this tool with a system for processing a page's
content to dynamically apply tooltips to any game term you care define globally.
But that's for later.

<!-- Links & References -->
[files]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/tooltips
[custom properties]: posts/custom-properties/ 
[context]: posts/positioning/
[pseudo-element]: posts/pseudo/#pseudo-elements
[article]: https://css-tricks.com/the-shapes-of-css/
