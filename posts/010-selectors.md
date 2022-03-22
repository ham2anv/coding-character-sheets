---
title: "Hitting Your Target: Advanced CSS Selectors"
date: 2022-03-22 12:19:43-05:00
excerpt: "We dig into CSS selectors and look at more advanced ways to target
         elements and apply styles intelligently."
---

In our introduction to CSS, we touched briefly on [selectors], the way you tell
the browser which element(s) to style. Now it's time to get more advanced and
really leverage the power of CSS to target specific elements.

## Type & Class
To select an element that is of a certain type _and_ a certain class, use a
selector of the type followed by the class, seperated by a period `.`. The
following CSS makes all `<div>` elements with the `box` class have a solid blue 
<span style="display: inline-block; height: 1em; width: 1em; background-color:
blue;"></span> border.

```css
div.box {
    border: 1px solid blue;
}
```

## Multiple Selectors, One Style
If you have a style that you want to apply to multiple different kinds of
element, you don't have to repeat the style over and over again for each one.
You can just write the style once, and list every selector you want it to apply
to, seperated by commas `,`. The following CSS will make all of your heading
elements red <span style="display: inline-block; height: 1em; width: 1em;
background-color: red;"></span>.

```css
h1, h2, h3, h4, h5, h6 {
    color: red;
}
```

## Child Elements
If you want to select all elements of a given type that are _within_ an elemnent
of a given type, just list the selector of the parent element followed by the
selector for the target element, seperated by a space. The following CSS makes
any `<p>` elements inside a `<div>` element italic.

```css
div p {
    font-style: italic;
}
```

The above will select all `<p>` elements that are _anywhere_ within a `<div>`,
even if they are inside other elements. If you only want an element that is a
direct child of another element, seperate the selectors with a closing angle
bracket `>`. The following CSS makes `<p>` elements italic if they are inside a
`<div>` but not inside any other element inside that `<div>`.

```css
div > p {
    font-style: italic;
}
```

## Sibling Elements
Maybe you want to select elements that are _next to_ other elements (siblings).
To get an element that is directly after another element, seperate the selectors
with a plus `+`. The following CSS gives any element with the `indent` class a
left margin of `1em` only if it immediately follows a `<h2>` element.

```css
h2 + .indent {
    margin-left: 1em;
}
```

If you want to style an element that is _anywhere_ after another given sibling
element, seperate the two selectors with a tilde `~`. The following CSS selects
any `<blockquote>` elements that are after a sibling with the `citations` class
and gives them a light gray <span style="display: inline-block; height: 1em;
width: 1em; background-color: lightgray;"></span> background.

```css
.citations ~ blockquote {
    backgrdoun-color: lightgray;
}
```

## Wildcards
Sometimes you just want to select _everything_. Or at least "everything that
fits some other criteria." That's when you want to use an asterisk `*` as your
selector. An asterisk will select _every element_, so you should use it together
with one of the other combinations above.

The following CSS gives every element that is a direct child of any `<div>` with
the `spaced` class a top margin of `1em`.

```css
div.spaced > * {
    margin-top: 1em;
}
```

## Conclusion
Obviously, using these advanced selectors adds a good deal of complication to
your style sheet. But it also makes it possible to do a lot of sophisticated
design tricks. Depending on your document's structure, you may not need all of
these tools. But if you run into a problem selecting just the right elements,
try these options out.

<!-- Links & References -->
[selectors]: posts/introducing-css/#selectors-and-specificity
