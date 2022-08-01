---
title: "Tool: Inline Variants"
date: 2022-08-01 10:11:02-04:00
excerpt: We take a look at a tool for displaying different content based on a 
  page's URL search parameters.
---

If you have an adventure or supplement that you want to distribute for multiple
game systems, you can always create different document for each set of rules.
But that gets tedious fast, especially if you want people to be able to switch
between them easily.

With a tiny amount of JavaScript, however, you can actually write a single HTML
document and let the user choose which variant of the material they want to see
when they load the page. Let's dig in.

As with all our tools, you can find this one at [GitHub].

## JavaScript
The code for this one is actually so short that I'm just going to put it right
here:

```javascript
const params = (new URL(document.location)).searchParams;

if (params.has("system")) loadVariant(params.get("system"));

function loadVariant(v) {
    const variantList = document.querySelectorAll(`.${v}`);
    const hiddenList = document.querySelectorAll(`*:where(.variant):not(.${v})`);
    hiddenList.forEach(el => document.body.removeChild(el));
}
```

Walking through it, we first grab the [search parameters] of the loaded page and
store them in `params`. This means anything after the normal URL of the page,
starting with a question mark `?`. Each parameter has a key and a value,
joined by an equal sign `=`, and multiple parameters are separated by an
ampersand `&`.

Our code only cares about the parameter `system`. If the URL has this parameter,
we run the `loadVarian()` function with the value of `system` as the argument.
This function finds any element on our page with the CSS class `variant` and
another class equal to the value of `system`. Any other element with the
`variant` class but _without_ the class equal to `system` is deleted from the
page.

## Using the Tool
It's so simple to use this tool. Anywhere in your document that you want to have
variant content, just wrap it in a `<div>` (or another appropriate element) with
the `variant` class and another class called whatever you want to name the
variant.

You can style these classes if you'd like. In our example, I styled `variant`
with a border just to call it out, and each system got a `::before`
pseudo-element labeling which rules it uses.

To access a particular variant, all you have to do is put the search parameter
at the end of the URL, in the form `?system=value`. When you do this, the page
will load with only the chosen content with the class `value`. (Without this
parameter, _all_ content will be in place. That's why I added the label
pseudo-elements.)

In the example, loading the page with `?system=fate` will display stats for an
adult red dragon in my Fate-based game [Crashing Beasts & Crumbling Halls]. With
`?system=pf2e`, you get the stats for Pathfinder 2nd Edition.

## Conclusion
There you have it: an incredibly simple way to serve one document to multiple
audiences. This version is most useful if you are providing links to the
document on a web server, and you control the search parameters. In the future,
I plan to make an alternative to this tool that lets you toggle between
different variants interactively.

<!-- Links & References -->
[GitHub]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/variants
[search parameters]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[Crashing Beasts & Crumbling Halls]: https://nothingventuredgames.com/products/cb&ch/
