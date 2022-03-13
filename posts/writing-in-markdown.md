---
layout:  post.njk
title:   "Writing in Markdown"
tags:    [post, markdown]
date:    2022-03-12T14:39:00-05:00
image:   pen-notebook.jpg
excerpt: "A primer on Markdown, a great format for writing your text without
         worrying about complicated markup languages or layout."
---
[Markdown] is a text format created to make it easier to convert from plain
text to HTML (**H**yper**t**ext **M**arkup **L**anguage)—the language web pages
are written in and a topic we'll discuss in the future. By using Markdown and
a converter program, you can take a file that is highly readable and turn it
into a properly formatted web page without any knowledge of HTML itself.

Once upon a time, nearly all communications on the internet were sent in plain
text. People had to come up with their own ways to convey meaning without any
typographical tools such as **bold** or _italic_. Over time, conventions arose
that mimicked those tools through the use of text characters or spacing.
Markdown uses many of those conventions.

## What Do You Need?
A Markdown file is just a plain text file saved with a particular file
extension: usually `.md` or `.markdown`. You can create and edit Markdown in
any text editor—Notepad on Windows, TextEdit on Mac, even nano in a Linux
terminal.

To convert to another format like HTML, you'll need a converter program. There
are many options available on Windows, Mac, or Linux, but I recommend [pandoc].
It can read and convert dozens of file formats, not just Markdown.

For now, though, we'll focus on creating your Markdown. So open up your
favorite text editor, and let's go.

## The Basics of Markdown
Markdown provides a surprising range of features, but we're just going to cover
the basics here, to let you get started fast.

The first rule of Markdown text is there must be a blank line between one
paragraph and the next. If you only put a single line break after a paragraph,
Markdown assumes whatever comes next is still part of that paragraph. So, the
following Markdown...

```markdown
This is the start of a new paragraph. You can put in a line break whenever you
want.
But this will still be the same paragraph.
```

...will render like this in the final web page:

This is the start of a new paragraph. You can put in
a line break whenever you want.
But this will still be the same paragraph.

### Formatting
You will probably need to use **bold** and _italic_ more than any other
formatting in your Markdown files. You indicate both by using asterisk `*` or
underscore `_` characters. Surrounding any piece of text with one of these on
either side will make the text italic, while surrounding the text with two will
make it bold. This...

```markdown
This text will be **bold**.

This text will be _italic_.
```

...renders like this: 

This text will be **bold**.

This text will be _italic_.

### Headings
You use headings to structure your text, and Markdown provides a few different
ways to show headings at various levels. If you begin a line with one or more
hash symbols `#`, you will create a heading of that level.

```markdown
# Heading 1

## Heading 2

### Heading 3

etc. ...
```

Alternately, for the first two levels of heading, you can type the heading on
one line, then a row of equal signs `=` for level 1 or hyphens `-` for level 2
on the following line.


### Lists
Markdown handles both ordered and unordered lists—that is, lists with numbers
and lists with bullets.

To make an unordered list, you begin each list item with one of an asterisk
`*`, a plus `+`, or a hyphen `-`. The following Markdown...

```markdown
- List item 1.
+ List item 2.
* List item 3.
```

...is rendered like this:

- List item 1.
- List item 2.
- List item 3.

To make an ordered list, begin each list item with a number and a period. This
can be any number—Markdown will figure out the order for you. So, this...

```markdown
1. List item 1.
2. List item 2.
1. List item 3.
```

...becomes this:

1. List item 1.
2. List item 2.
1. List item 3.


### Links
To make some text in your document link to another page (or another point in
your page), surround the text in square brackets `[]`, then follow it with
either the URL of the link in parentheses or an id in square brackets. If you
use an id, that id must appear somewhere else in your document in square
brackets followed by a colon and the address.

The following Markdown...

```markdown
Check out my store on [itch](https://nvg.itch.io).

Look at the [MD reference][Markdown].

[Markdown]: https://daringfireball.net/projects/markdown/
```

...becomes this: 

Check out my store on [itch.io](https://nvg.itch.io).

Look at the [MD reference][Markdown].


## Why use Markdown?

> The overriding design goal for Markdown’s formatting syntax is to make it as
> readable as possible. The idea is that a Markdown-formatted document should
> be publishable as-is, as plain text, without looking like it’s been marked up 
> with tags or formatting instructions.

— John Gruber, [daringfireball.net][Markdown]

The first and best reason to write your text in Markdown is that a clean,
readable plain text file is _the_ most accessible format you can publish in. As
we discussed [above]({{page.url | url}}#what-do-you-need), anyone with a computer can open and
read a Markdown file. And since the goal of Markdown is to make a readable
product, it should be easy for them to use when they do.

Second, being able to convert easily to other formats—particularly HTML—
means you have many more options for distribution. And Markdown conversion is
easy to automate, so with a little bit of effort, you can create scripts that
will convert to multiple formats with a single command. You can even pipe your
output into other programs, converting to more sophisticated formats, like PDF.
(But that's a more advanced topic for another day.)

Finally, working in plain text removes a lot of the distraction of other tools.
You don't have to worry about complicated formatting or layout choices. You can
just focus on writing.

I challenge you to give Markdown a try. We'll be covering other tools in future
posts, but almost all of them will start from a plain Markdown file. Get
started with Markdown now, and you'll understand later topics a lot better.


<!-- Links & References -->
[Markdown]: https://daringfireball.net/projects/markdown/
[pandoc]:   https://pandoc.org/installing.html