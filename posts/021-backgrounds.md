---
title: Fun With Backgrounds
date: 2022-05-12 14:50:30-04:00
excerpt: "We have fun with the `background-image` property and some features of
         CSS that let us mix and match our background to create more
         sophisticated effects."
---


## Background Tricks
Three important properties let us adjust where and how our background appears
relative to the element: `background-position`, `background-size`, and
`background-repeat`.

Normally, a background starts at the top left corner of the element. With
`background-position`, we can [offset] this starting point using absolute
lengths, percentages of the height or width of the element, or with a list of
preset keywords like `bottom`, `right`, or `center`.

Some backgrounds, like images, have a set size, and by default they will display
at that size whether the element itself is larger or smaller. The
`background-size` property lets us adjust this, setting width (and optionally,
height) to absolute lengths or percentages, or with special keywords `contain`
and `cover`.

Setting `background-size` to `contain` scales the image to be as big as it can
be without having to crop or stretch. Setting it to `cover` scales the image to
the smallest size that covers the whole element without any empty space.

Finally, `background-repeat` has a number of values that let you define how the
background [repeats], either horizontally, vertically, or both.

## Gradients
We've gone over gradients a few times now, but there's more we can talk about.
You can create them using other functions than just `linear-gradient()`, and you
can build them out of multiple colors and even set specific points at which the
colors change.

In addition to the straight-line `linear-gradient()`, you can also use the
`radial-gradient()` and `conic-gradient()` functions to create a gradient. A
[radial gradient] is a circular or elliptical shape where the colors change from
the center toward the edge. A [conic gradient] starts with one color at the
origin and changes around the full circumference of a circle. Here are two
examples:

```css
.radial {
    background-image:
        radial-gradient(blue,red);
}
.conic {
    background-image:
        conic-gradient(blue,red);
}
```

<style>
.radial {
    background-image: radial-gradient(blue,red);
}
.conic {
    background-image: conic-gradient(blue,red);
}
.box {
    width: 200px;
    height: 100px;
    margin-bottom: 1em;
}
</style>

<div class="box radial"></div>
<div class="box conic"></div>

Any of the gradient functions can take more than just two colors to blend
betweeen. You can pass any number of colors, and the function will blend from
one to the next to the next.

You can also define color stops with absolute lengths or percentages that make
the gradient blend to the full color at a given point. To do so, you follow the
color with one or two lengths or percentages, seperated by a comma. For
example...

```css
.stripey {
    background-image: linear-gradient(45deg,
        blue, 
        white 15%, 25%, 
        green, 
        white 60%, 80%, 
        blue
    );
}
```

<style>
.stripey {
    height: 100px;
    width: 200px;
    background-image: linear-gradient(45deg,
        blue, 
        white 15%, 25%, 
        green, 
        white 60%, 80%, 
        blue
    );
}
</style>
<div class="stripey"></div>

If one color ends at a given stop, and the next color begins at the same point,
there will be a sharp change at that point, rather than a blend.

There are also `repeating-` [variants] of the [gradient] [functions] that let
you define a smaller portion of gradient with color stops and then repeat it as
much as you need to fill the element.

Finally, the `background-image` property can take more than one function,
seperated by commas. Earlier functions are drawn "above" later functions, so
later ones may not be visible. Let's take a look at a small example of how to
put these ideas together...


## Example

```html
<div class="logo">Whoosh</div>
```
```css
.logo {
    /* ...typography and such... */
    color: transparent;
    background-image:
        linear-gradient(
            transparent 0, 0.43em,
            white 0.43em, 0.45em,
            transparent 0.45em, 0.5em,
            white 0.5em, 0.55em,
            transparent 0.55em, 0.6em,
            white 0.6em, 0.62em,
            transparent 0.62em
        ),
        linear-gradient(cyan, darkblue);
    background-clip: text;
    -webkit-background-clip: text;
}
```

<style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@900&display=swap');
.logo {
    all: initial;
    font-family: "Exo 2";
    font-size: 60px;
    color: transparent;
    text-transform: uppercase;
    background-image:
        linear-gradient(
            transparent 0, 0.43em,
            white 0.43em, 0.45em,
            transparent 0.45em, 0.5em,
            white 0.5em, 0.55em,
            transparent 0.55em, 0.6em,
            white 0.6em, 0.62em,
            transparent 0.62em
        ),
        linear-gradient(cyan, darkblue);
    background-clip: text;
    -webkit-background-clip: text;
}
</style>
<div class="logo">Whoosh</div>


The `background-clip` property tells the browser to restrict the background of
the element, in this case to the shape of the element's text. (Some browsers
only recognize `background-clip` with the `-webkit-` prefix, so we include both
just to be safe.) Normally, the text would then cover the background completely,
so we make the text `transparent` to let the background show through.

Let's look at the `background-image`, now. We use two `linear-gradient()`
functions. The "bottom" gradient simply blends `cyan` to `darkblue` from top
to bottom. The "top" gradient sets a number of color stops, creating three
stripes of white of varying sizes. Since the other colors are all `transparent`,
the gradient underneath can show through.

You can use these same ideas to make even more complicated backgrounds,
combining various gradient functions and even images with transparency. In a
future post, we'll go into CSS features like blend modes that let you get even
artsier.

## Conclusion
There you have a few new tools to create element backgrounds, and even combine 
them in fun ways. We'll go deeper into this topic in future posts. CSS has a lot
of features for doing things directly inside the browser without needing complex
and expensive third-party software. Until then, play around with some of these
properties and see what you come up with!

<!-- Links & References -->
[offset]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#values
[repeats]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
[radial gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient
[conic gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient
[variants]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient
[gradient]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-radial-gradient
[functions]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-conic-gradient
