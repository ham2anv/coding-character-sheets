---
layout: post.njk
title: "Advanced Markdown Topics"
date: 2022-03-15 08:18:56-05:00
tags: [post, markdown, html]
image: crayonbox.jpg
excerpt: "You may not use these options in every document, but they're nice to
have around: images, blockquotes, tables, and more."
---
In our initial [Markdown post], we covered the basics, but there are a few more
options in standard Markdown and a ton more in extended versions of the format,
like the one used by [pandoc]. We're only going to go over a few in this post,
but they're the ones you're going to want to use fairly frequently when writing
games.

## Link Titles
There's one extra option for links that we didn't cover before: titles. A title
is text describing the link that will appear as a tooltip when the visitor
hovers their mouse cursor over the link. To include a title with your link, add
the text after the URL like this...

```markdown
Visit my store on [itch.io](https://nvg.itch.io "Nothing Ventured Games Store on itch.io").
```

...which renders like this (hover over the link to see the title):

Visit my store on [itch.io](https://nvg.itch.io "Nothing Ventured Games Store on itch.io").

You can do the same thing with a reference link:

```markdown
Visit my store on [itch.io].

[itch.io]: https://nvg.itch.io "Nothing Ventured Games Store on itch.io"
```


## Images
Including an image in your Markdown works a lot like making a link, with the
addition of a leading exclamation point `!`. The following Markdown text...

```markdown
![A cute kitten.](https://placekitten.com/400/299)
```

...turns into this HTML `<img>` tag...

```html
<img src="https://placekitten.com/400/299" alt="A cute kitten.">
```

...which renders like this in the browser:

![A cute kitten.](https://placekitten.com/400/299)

The text in square brackets is the "alt text" for the image. This is used by
non-visual browsers and screen readers to provide an accessible description of
the image. An image can also take a title like we talked about for links above.
If you _only_ include a title, the browser will use that for accessibility, but
it's good practice to use the alt text first and the title only if you need the
tooltip.

_Note_: Conversion programs may treat alt text and titles differently for
images. With pandoc, for example, if you put an image with alt text by itself
as a paragraph, the output will include a `<figure>` element with the `<img>`
as a child as well as a `<caption>` element containing the alt text. The
`<caption>` will be visible text in your final HTML file. Check the
documentation for your conversion program if you get strange results.

You can also include images by reference, just like links: 

```markdown
![A cute kitten.][kitten]

[kitten]: https://placekitten.com/400/299 "A cute kitten."
```


## Blockquotes
A <dfn title="blockquote">blockquote</dfn> is a block element that calls its
contents out as a quote. By default, a blockquote will be indented.

To use a blockquote in Markdown, take your normal Markdown text and put a right
angle bracket `>` at the beginning of each line. Everything marked as a
blockquote gets converted like it normally would, but the whole thing is wrapped
in a `<blockquote>` element. This Markdown...

```markdown
> A blockquote is a block element that calls its contents out as a quote. By
> default, a blockquote will be indented.
```

...turns into this HTML...

```html
<blockquote>
<p>
    A blockquote is a block element that calls its contents out as a quote. By
    default, a blockquote will be indented.
</p>
</blockquote>
```
If you hard-wrap your paragraphs, you only need to put the bracket on the first
line. I find putting on each line it makes the Markdown look cleaner, though.


## Tables
Tables are not part of the strict Markdown definition, but they are a common
extended feature supported by many conversion programs, including pandoc. In
fact, pandoc supports _four_ different [ways to write tables][pandoc tables],
but I'm only going to cover one. It's the form I use most frequently, and I
feel it's the easiest to use.

To make a table, simply arrange your text into columns separated by pipe
characters `|`. The first line will be the header row of your table (which is
usually highlighted in bold by default). The second line is a seperator of
hyphens `-` for each column. And each line after that is another row in your
table.

So, for example, the following Markdown text...

```markdown
Column 1 | Column 2 | Column 3
---|---|---
Data | More data | Yet more data
```

...renders in the browser like this:

Column 1 | Column 2 | Column 3
---|---|---
Data | More data | Yet more data

As you can see, your column widths (defined by the placement of pipes `|`) do
not have to line up for each line. You _can_ make them line up by adding extra
spaces, and everything should process just fine.

It is also possible to right-align text within a column by putting a colon at
the end of the column's hyphens on the seperator line. To center a column,
put colons on both sides of the hyphens. For example, this...

```markdown
Column 1 | Column 2 | Column 3
---|:---:|---:
Left-aligned | Centered | Right-aligned
```

...renders as this:

Column 1 | Column 2 | Column 3
:--------|:--------:|---------:
Left-aligned | Centered | Right-aligned


Finally, you can put a pipe `|` at the beginning and end of a line, but you
don't have to. I do, and I pad columns with spaces, so that everything lines up
nicely in my text editor.

```markdown
| Column 1     | Column 2 | Column 3      |
|--------------|:--------:|--------------:|
| Left-aligned | Centered | Right-aligned |
```

## Custom HTML
Markdown can do a lot, but it doesn't handle anything close to the full HTML
standard. And that's okay, because Markdown lets you add your own tags into
your text, and it will put them into your final file just the way you wrote
them. As you learn more HTML, you'll be able to put more complicated elements
in your file by just typing them in your Markdown.

There are a few special rules, however, and they apply to block elements
specifically.

1. A block element must have blank lines both before and after it, so Markdown
   doesn't confuse it with another paragraph.
2. The opening and closing tags for the block element cannot be indented.
3. Markdown will not process any text inside the block element, meaning it will
   ignore the normal formatting you would use to make `**bold**` **bold** and
   so on.


## Conclusion
That's a few more things you can do in Markdown to make your documents more
robust but still nicely readable. Beyond this, we must venture deeper into the
realm of HTML. Onward!


<!-- Links & References -->
[Markdown post]: posts/writing-in-markdown/
[pandoc]: https://pandoc.org/MANUAL.html#pandocs-markdown
[pandoc tables]: https://pandoc.org/MANUAL.html#tables