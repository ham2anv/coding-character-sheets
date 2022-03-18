---
title: "Thinking Inside the Box"
date: 2022-03-18 10:53:53-05:00
excerpt: "An introduction to <DIV>s and some of the ways you can style these
         plain boxes."
---

In HTML, the `<div>` element is also called the [Content Division] element.
It's a basic container without any specific styling by default. And it's going
to be your best friend as you move into more sophisticated designs.

`<div>` is a block element, so it will start immediately after the element
before it, but unlike the paragraph element `<p>`, a `<div>` has no default
spacing (margin or padding). It inherits properties like color and font from
its parent. A `<div>` is a blank slate. (Everything in this post also applies
to other elements like `<p>`.)

You will almost never need to select every `<div>` in your page. Instead, each
one should get a class, or more likely multiple classes. And `<div>`s can
share classes, styling multiple elements in similar ways.

_Note_: Semantic markup is a more advanced topic we'll cover in a future post,
but for now, keep in mind that a `<div>` has no meaning in and of itself. It
only serves as a container. If there is an element that more accurately
represents your content, use that element. You still want to put a block of
text in a `<p>` element, for example. 


## Sizes & Borders
By default, a `<div>` is as wide as the area bounded by its parent's padding,
with its height determined by its contents. You can define height and width
yourself:

```css
.box {
    height: 200px;
    width: 300px;
}
```

I mentioned in a [previous post] that if an element's content needs more space
than it has, it will overflow. You can adjust this using the [overflow] property:

```css
.box {
    height: 200px;
    width: 300px;
    overflow: hidden; 
}
```

A `<div>`, like many elements, can have borders, which are drawn around the
whole height and width. A border has three components: a width (in any length
unit), a style (solid, dotted, etc.), and a color (or transparent). A single
[border] property sets the border for all sides of the element, or you can set
each side individually. You can set each border component individually, or even
each component _for each side_.

```css
.border {
    border: 1px solid black;
}

.top-and-bottom-border {
    border-top: 0.5rem solid blue;
    border-bottom: 1rem dotted red;
}

.color-wheel-border {
    border: 2px solid;
    border-top-color: blue;
    border-right-color: green;
    border-bottom-color: yellow;
    border-left-color: red;
}
```


## Backgrounds
You can set the background color of a `<div>` with the `background-color`
property. Give it any valid [color] keyword or hex code and the entire area
of the element will turn that color.

```css
.green-box {
    background-color: green;
}
```

Instead of a solid color, you can make an image serve as the background of an
element using the `background-image` property. You must supply the location of
the image using the `url()` function:

```css
.image-box {
    background-image: url("my-bg-img.png");
}
```

You can even make a gradient background using a [gradient function]. There are
a few of these functions, and they can handle pretty complex gradient patterns
if you want them to. But `linear-gradient()` starts out pretty simple. All you
need to give it is a starting color and an end color. Optionally, you can give
a direction or angle before the colors, if you want the gradient to go some way
other than top-to-bottom. So, this CSS...

```css
.gradient-box {
    height: 200px;
    width: 300px;
    background-image: 
        linear-gradient(to bottom right, red, blue);
}
```

...would render like this:

<div style="height: 200px;
    width: 300px;
    background-image: linear-gradient(to bottom right, red, blue);"></div>


## Conclusion
We've gradually built up a set of tools to make our first documents. Maybe
you've already put enough pieces together to do something simple. Definitely
give it a try. Next time, we'll look at a complete worked example, from
Markdown to final styled page.


<!-- Links & References -->
[Content Division]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[previous post]: posts/basic-css-typography/#spacing-and-the-box-model
[overflow]: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
[border]: https://developer.mozilla.org/en-US/docs/Web/CSS/border
[color]: posts/basic-css-typography/#color
[gradient function]: https://developer.mozilla.org/en-US/docs/Web/CSS/gradient
