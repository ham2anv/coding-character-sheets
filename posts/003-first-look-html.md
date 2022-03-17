---
title: "A First Look at HTML"
date: 2022-03-14 10:02:41-05:00
excerpt: "We explore the very basics of Hypertext Markup Language, or HTML,
and learn about elements, tags, and attributes."
---

We've talked about [Markdown] and how the intent of that format is to make it
easy to convert from a human-readable plain text file to HTML. So, what is HTML
exactly? Let's take a look.

In this post, we'll be using an [example HTML file] that you can find on the
Coding Character Sheets GitHub repository. Grab it and follow along.


## What's In a Name?

Hypertext Markup Language (or HTML) is the primary language used to store,
transmit, and display web pages in a browser. To break down that name:

> Hypertext is text displayed on a computer display or other electronic devices 
> with references (hyperlinks) to other text that the reader can immediately
> access.

— Wikipedia, "[Hypertext]"

> Markup is often used to control the display of the document or to enrich its
> content to facilitate automated processing. A markup language is a set of
> rules governing what markup information may be included in a document and how
> it is combined with the content of the document in a way to facilitate use by
> humans and computer programs.

— Wikipedia, "[Markup language]"

So, HTML lets you define a document with both content and data that controls
and enriches the display of that content. Essentially, the HTML language tells
the web browser how to structure and display the document.


## Elements
HTML is made up of many <dfn title="element">elements</dfn>, blocks of text
that start and end with tags inside angled brackets `<>`. An element is a
single unit of information in the HTML file, and generally everything in your
document will be contained in an element.

In the following code from our example, we see a `<p>` element, representing
a paragraph of content.

```html
<p>Anyway, here's a picture of a kitten.</p>
```

See how the paragraph opens with a `<p>` tag and closes with a `</p>` tag?
Elements that hold content need that closing tag, but some elements can stand
alone with just the opening tag, as we'll see later.

The opening tag of an element may contain additional <dfn title="attribute">
attributes</dfn> that tell the browser more about the element. These take the
form of `attribute="value"`, and we'll see examples of them in action later.

If one element contains other elements, the outer element is called the
<dfn title="parent">parent</dfn>, while the elements inside it are called
<dfn title="child">children</dfn>. This relationship will be important when we
get to later topics like Cascading Style Sheets.


## Structure
Every valid HTML file requires a few elements that define the structure of the
document. First, we open with a special tag `<!DOCTYPE html>` that establishes
the file format. Then, the document begins with the `<html>` element.
Everything else in the document will be a child of `<html>`.

```html
<!DOCTYPE html>
<html lang="en">
```

The `<html>` element includes a `lang` attribute with a value of `"en"`. This
means that the language of the document will be English, a useful thing for the
browser to know so it can handle certain typographical features if you need it
to.

Then, we have the `<head>` element. On more complex sites, this section may
contain a lot of elements that provide information about the page as a whole,
including metadata and resources like scripts and stylesheets needed for
display and functionality. We'll talk more about some of those in later posts.

```html
<head>
    <title>A First Look at HTML</title>
</head>
```

In our example, the `<head>` element contains one child element, `<title>`.
This sets the title for our page, "A First Look at HTML", which is usually
displayed in the browser's title bar or tab.

Finally, we get to the `<body>` element. This is where all of the content is
found that we actually want to display in the browser. We'll dig into what's
inside this element in the next section.

```html
<body>
    ...content here...
</body>
</html>
```


## Content
Now we come to the good stuff: the content we actually display to the user. For
this first look, we're covering just the barest bones, but there's a wide world
of options waiting for you in later posts.

### Headings
[Headings] are used to structure your HTML document much like they are in
Markdown. In HTML, headings are defined by tags—`<h1>`,`<h2>`, and so
on, through `<h6>`—with the number in the tag corresponding to the level of the
heading.

```html
<h1>A First Look at HTML</h1>
```

In our example, we have an `<h1>` element at the start of the `<body>`. It is
good design to have one and only one `<h1>` element in your page. Search
engines and other tools look for that element as a landmark when analyzing your
page.

### Block vs. Inline Elements
An element that is intended to display as a single unit on the page is known as
a <dfn title="block element">block element</dfn>. By default, the layout of the
page puts each block element one after the other in the order they appear in
the HTML file.

In this code from our example, the `<p>` element is a block element.

```html
<p>
    This document shows you just a little bit of what HTML looks like. For
    a much more comprehensive reference (to HTML and other web
    technologies), I use <a href="https://developer.mozilla.org/en-US/">
    Mozilla Developer Network</a>.
</p>
```

<dfn title="inline element">Inline elements</dfn> are intended to display
_within_ other content without breaking the flow. If you have a block of text,
for example, an inline element will fit into that text, breaking to a new line
wherever necessary, just like the rest of the text around it.

In our example code above, there is an inline element, the `<a>` element, which
we'll talk about next.

### Links
The <dfn title="hyperlink">hyperlink</dfn>, or "link," is a key feature of
hypertext, connecting one page to another. In HTML, you represent a link with
the `<a>` element. Weird, I know! It's not `<link>`. Instead, `<a>` stands for
"anchor."

(There actually is a `<link>` element, but it's usually found in `<head>` and
links to external resources like style sheets. We'll get there.)

In our example, we see a link to the [Mozilla Developer Network]:

```html
<a href="https://developer.mozilla.org/en-US/">Mozilla Developer Network</a>
```

The `<a>` tag includes the attribute `href`. Whatever value is in this
attribute, that's what your browser will load when you click the link.
To make a new link, just copy an address from your browser's address bar and
paste it into the quotes after `href=`.

### Images
You'll eventually want more than just text on your page. The first thing you'll
likely reach for is an image. That's where the `<img>` element comes in.

```html
<img src="https://placekitten.com/400/299" alt="A picture of a kitten.">
```

The `src` attribute is the URL of the image file, while the `alt` attribute is
alternative text that should describe what's in the image. You include alt text
for visitors using screen readers or other assistive technology, so it's good
practice to include it for images whenever you can.

Note how the `<img>` tag here doesn't have a closing `</img>` tag? An image
will never contain other content, like text, so the `<img>` element doesn't
need a closing tag.


## Conclusion
This barely scratches the surface of what HTML can do, but it's important to
have a baseline knowledge of the language as we go forward to more complicated
topics. For now, play around with the example file. Add paragraphs. Create a
link to your favorite site. Find your own image and replace the adorable kitten
with it. Have fun!


<!-- Links & References -->
[Markdown]: posts/writing-in-markdown/
[example HTML file]: https://github.com/ham2anv/coding-character-sheets/blob/main/examples/introduction.html
[Hypertext]: https://en.wikipedia.org/wiki/Hypertext
[Markup language]: https://en.wikipedia.org/wiki/Markup_language
[Headings]: posts/writing-in-markdown/#headings
[Mozilla Developer Network]: https://developer.mozilla.org/en-US/
