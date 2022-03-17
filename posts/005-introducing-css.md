---
title: "Introducing Cascading Style Sheets"
date: 2022-03-16 12:10:03-05:00
excerpt: "We take our first look at Cascading Style Sheets, or CSS, the
         language that defines what a web page looks like."
---

So far, we've talked mainly about structuring your content, whether it's in
[Markdown] or [HTML]. Now, we can get into what your document actually looks
like with the next major web technology: Cascading Style Sheets, or CSS.

CSS controls pretty much every visual attribute of an HTML element in the
browser, from height and width to background color and so much more. It does
this by setting rules, or <dfn title="style">styles</dfn>, that apply to sets
of elements. Styles <dfn title="style">cascade</dfn>, meaning that a child
element will inherit all of the styles of its parents, unless another more
specific style overrides them.

## Defining Styles
What does this all look like? Here's an example of a simple CSS style that
turns all of the links on your page pink:

```css
a {
    color: pink;
}
```

The first bit there is the <dfn title="selector">selector</dfn>. A selector is
how you focus the style on a set of elements. We'll talk about it more in a
bit. For now, just know that `a` selects every `<a>` element in the document.

Everything within the curly braces `{}` defines the style. The text before the
colon is a property, and the text after the colon is the value. In this case,
`color` means the color of any text inside the element, and `pink` <span style=
"display: inline-block; height: 1em; width: 1em; background: pink"></span> is a
defined color name. Each property definition must end with a semicolon `;`.

To include a CSS style sheet in your document you can use a `<link>` element to
bring in an external file, or you can use a `<style>` element to write the CSS
directly in your HTML. A `<link>` goes in the `<head>` element. While `<style>`
can technically appear in the body, it's good practice to put it in `<head>` as
well.

`<link>` needs a few attributes to tell the browser what to do:

```html
<link href="main.css" rel="stylesheet">
```

`href` is the address of your CSS file. This can be a local file, in which case
the address is [relative] to the page you're viewing. Or it can be a file on
another server, in which case you'll use the file's full URL.

## Selectors & Specificity
You can find elements in a number of ways using CSS selectors, and the language
can get pretty complex once you know what you're doing. For now, we'll look at
the basics.

The broadest way to select an element is just with its type, like we did in the
example above. This will find _every_ element in your page of that type, so
make sure the style is something you want to show up a lot.

Then, you can search for elements that have a specific attribute. You do that
by putting the attribute in square brackets `[]`. If you just want to select
any element that has the attribute at all, leave it like that. But if you want
to find elements with an attribute that has a specific value, add `=` and the
value after the attribute name in the brackets.

As an example, if you wanted to find every checkbox in forms on your page, you
could use the following selector.

```css
[type="checkbox"] {

}
```

A special attribute that any element can have is `class`. This is for adding
CSS <dfn title="class">classes</dfn>, which let you group elements that would
otherwise not be grouped together. Every word in the `class` attribute is
treated as a seperate CSS class. Instead of using the square brackets attribute
selector, you reference classes in your CSS file with a period `.` at the
beginning of the class name:

```css
.class-name {

}
```

Finally, any element can have an `id` attribute. The value of this attribute
must be unique in the whole file. You reference an id in your CSS file with a
hash character `#` at the beginning of the id:

```css
#element-id {

}
```

Some selectors are more <dfn title="specificity">specific</dfn> than others,
and more specific selectors that would apply to the same element take
precedence over less specific ones. This is a complicated calculation, but the
basics are:

1. Type selectors are the least specific.
2. Class and attribute selectors are more specific than type selectors.
3. ID selectors are the most specific.

If two selectors are the same specificity and would apply to the same
element, the one that comes later in the style sheet will take effect.

There's a lot more to using selectors—pseudo-classes, chaining selectors,
combinators, etc.—but that's for another post.

## Conclusion
I've put together an example of an HTML file with an external CSS style sheet,
which you can grab at [GitHub]. Grab the files and take a look at some simple
styling, including specificity.

With these basics under our belts, we can move on to some topics that will help
you start making proper documents for your games. Until then, play around with
the example files and see what you can make of them.

<!-- Links & References -->
[Markdown]: posts/writing-in-markdown/
[HTML]: posts/first-look-html/
[relative]: https://www.w3schools.com/html/html_filepaths.asp
[GitHub]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/introducing-css
