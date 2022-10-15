---
title: "Title Slate in HTML/CSS"
date: 2022-10-15 09:49:33-04:00
excerpt: "Let's walk through creating a title slate graphic for your next RPG
  campaign."
---

Recently, I was inspired to create a title slate graphic for a short Mage: the
Ascension game I'm starting. Rather than break out a graphics program like GIMP,
I thought I'd do it in HTML/CSS. So, I fired up [CodePen] and started playing
around. It's a neat exercise that I'd like to share with you.

First, a note. Everything I used in this project is free. I use CodePen whenever
I want to noodle on a quick prototype, and you can sign up for a basic account
for free.  For the typeface, I went to [Google Fonts], which provides its fonts
under open license. And for the graphic elements, I hit up [Unsplash], where you
can find tons of photographs free for personal and commercial use.

## HTML
To set things up, I start with a little bit of HTML:

```html
<div class="frame">
  <div class="shadow">The War The World Forgot</div>
  <div class="text">The War The World Forgot</div>
  <div class="subtitle">A Mage: The Ascension Story</div>
</div>
```

The outer `div` with class `frame` contains the whole graphic. The two `div`s
with classes `shadow` and `text` are going to overlap to form our title. The
`div` with class `subtitle` is, believe it or not, for the subtitle.

## CSS
All of the heavy lifting in this graphic comes from the CSS.

```css
@import url('https://fonts.googleapis.com/css2?family=Ruslan+Display&display=swap');
```

The first thing I do is import our font, [Ruslan Display], from Google Fonts.
The `@import` statement brings external CSS into our file to let us use those
rules in our document. Google Fonts provides a package of CSS to give us access
to the chosen font, so we're free to use it from now on.

```css
div.frame {
  height: 90vmin;
  aspect-ratio: 16/9;

  display: grid;
  grid-template: 1fr max-content / 1fr;
  place-items: center;
 
  background:
    linear-gradient(transparent,#81239350),
    linear-gradient(black, transparent),
    url("https://images.unsplash.com/photo-1610660385015-2998bdb71320?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80");
  background-size: cover;
}
```

For the `frame`, I start by defining its size. As we discussed in the post on 
[length units], `vmin` is a relative unit equal to 1% of the smaller dimension
of the viewport. Using it here lets the entire graphic maintain a regular height
even if the viewport is resized. The `aspect-ratio` property sets a ratio
between the object's width and height that it maintains even when resized.

I set the frame as `display: grid` and define both the rows and columns together
using the `grid-template` shorthand property. `place-items: center` centers all
children both horizontally and vertically.

The `background` property here needs a little explanation. I use two
`linear-gradient`s with `transparent` at opposite ends, because a single
function from `black` to `#81239350` would produce a slight different, muted
gradient, and I liked the result better with two. Finally, we include a `url()`
which brings in a texture image from Unsplash.

I should also explain that `#81239350`. This is an eight-digit [hex color code].
The first six digits define the color as normal, but the last two are the
<dfn>alpha component</dfn> which defines transparency for the color. These are
also in hexadecimal, so `50` is actually only 80 out of a possible 255, or a
transparency of just over 31%.

```css
div.text,div.shadow {
  grid-row: 1 / -1;
  grid-column: 1;
  font-family: "Ruslan Display";
  font-size: 18.35vmin;
  line-height: 0.5;
  text-align: center;
}
```

Here I define some size and position properties for both the `text` and `shadow`
`div`s. Setting `grid-row` to `1 / -1` means that these elements span both rows
we defined for our `frame`. With `grid-column: 1`, both elements are placed in
the single defined column. This places both `text` and `shadow` overlapping in
the center of the entire `frame`.

I set the text in Ruslan Display. As with the height of the `frame`, the text
here is sized in `vmin` units to maintain its size relative to the frame, even
if the viewport is resized. The `line-height` property brings the lines of the
text together to make them just touch.

```css
div.text {
  background:
    linear-gradient(transparent, white),
    url("https://images.unsplash.com/photo-1565992693506-aae6c395545e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80");
  background-position: center;
  background-clip: text;
  color: transparent;
}
```

The `background` property here works similarly to the one in `frame`, setting a
`linear-gradient` and bringing in a photograph from Unsplash. The
`background-position` sets _where_ the background is drawn from, with `center`
meaning the center of the background is fixed at the center of the `div`.

We use the same trick here with `background-clip` that we used in the example in
[Fun with Backgrounds]. We make the text transparent and clip the background to
only show in the shape of the text.

```css
div.shadow {
  text-shadow:
    2px 2px 0 #37A,
    -2px 2px 0 #159,
    2px -2px 0 #268,
    -2px -2px 0 #29B,
    10px 10px 7px #A5A9;
}
```

We need a separate `div` here to do a `text-shadow` effect, because we set `color`
to be `transparent` in the `text` `div`. We use four text shadows to draw an
outline around the text in a few relatively close colors, giving the impression
of directional lighting. The fifth shadow is a blurrier drop shadow.

```css
div.subtitle {
  font-family: "Ruslan Display";
  font-size: 5.505vmin;
  text-align: center;
  grid-row: 2;
  grid-column: 1;
  color: #EB4;
  letter-spacing: 5px;
  padding-bottom: 1rem;
  text-shadow:
    2px 2px 0 #95A,
    -2px 2px 0 #829,
    2px -2px 0 #738,
    -2px -2px 0 #A5B,
    7px 7px 5px #A5A9;
}
```

Finally, I define the `subtitle`. It's set in Ruslan Display with a size based
on `vmin` units again. I place it in the grid on the second row, so it aligns to
the bottom of the frame. The `letter-spacing` property puts a little space
between each character, spreading the text out a little. And finally I use a
similar `text-shadow` to give a colored outline and drop shadow to the text.

## Conclusion
So, there we have it. In about a half hour, I built a neat title slate graphic.
But more importantly, now that it's built out, I can reuse this pattern for
future graphics, just swapping out text, bringing in different fonts and
images, and tweaking the colors. Reusability is one of the benefits using
these technologies.

<!-- Links & References -->
[CodePen]: https://codepen.io/ham2anv/pen/VwxRbqe
[Google Fonts]: https://fonts.google.com
[Unsplash]: https://unsplash.com/
[Ruslan Display]: https://fonts.google.com/specimen/Ruslan+Display
[length units]: https://www.nothingventuredgames.com/coding/posts/length/#viewport-based-units
[hex color code]: https://www.nothingventuredgames.com/coding/posts/basic-css-typography/#color
[Fun with Backgrounds]: https://www.nothingventuredgames.com/coding/posts/fun-with-backgrounds/#example