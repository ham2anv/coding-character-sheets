---
title: "Sample: Dragon Statblock"
date: 2022-03-19 14:20:56-05:00
excerpt: "We look at a complete sample document, a stablock for an adult black
         dragon from the 5e SRD, with complete Markdown, HTML converted from
         that Markdown, and CSS to style it all."
---

Now it's time to put everything together and look at an example of turning a
plain text Markdown document into a fully styled document ready for your game
notes. For this post, you'll want to grab the sample files from [GitHub] so you
can follow along. 

## Markdown
I started with the simplest front-matter, a title. Pandoc wants each file you
convert have its own title, and in fact it throws a warning message and assigns
a title itself if you don't. So I put one in.

The rest of the file follows everything we've gone over before about Markdown,
with two small additions. The first is really minor, and you might not see it
depending on settings in your text editor. Notice how some lines are hard
wrapped without a blank line between them? Those lines actually end in two
spaces, which signals to Markdown that they are part of the same paragraph but
to add a line break between them. (In HTML, this is a `<br>` element, which you
can see in the sample HTML file.)

Also, you may notice that the first section, from "Armor Class" to "Challenge,"
starts and ends with lines of three colons `:::`. This is part of pandoc's
extended version of Markdown, and it tells pandoc to wrap everything inside
those colons in a `<div>` element. The first line also has some text in curly
braces `{.stats}`. This assigns a class "stats" to the `<div>` that we can
reference later.

Other than those additions, we just have ordinary Markdown. We've discussed
tables, and you can see one for the six ability scores. We have a few headings,
and plenty of bold and italic text throughout.

## HTML
The sample HTML file is just the direct output from pandoc. If you're using
pandoc, you can recreate it with the following command:

```
pandoc statblock.md -o statblock.html -s --css=statblock.css
```

Compare this output to the Markdown file, and you should begin to see a little
bit of how pandoc converts from one format to the other. The `<em>` and
`<strong>` elements make things italic and bold, respectively. Paragraphs get
their own `<p>` elements. That `<div>` we noted above is there with
`class="stats"`.

We haven't talked about how to do tables in HTML, but you can see a very simple
example here. The `<table>` element marks the whole thing. The `<thead>` and
`<tbody>` elements seperate the heading row from the body of the table. And
inside those, each `<tr>` element is a row, with each `<td>` element being a
cell. (Pandoc adds a class to each row in the `<tbody>`, either "odd" or "even"
as appropriate. These don't do anything unless you style them in your CSS,
though.)

## CSS
Our CSS is short and sticks mostly to things we've discussed. `<h1>` and `<h2>`
elements get the color `darkred`<span style="display: inline-block;
height: 1em; width: 1em; background-color: darkred"></span>. Anything with the
"stats" class (in our case, just that `<div>` element we talked about above)
gets a dark red border on the top and bottom, as do any tables.

I will call out the `body` style. It has the property `max-width` which does
something interesting. It sets the maximum width of the `<body>` element to
65 "character widths." The `ch` unit is a special one in CSS. `1ch` is the
width of the zero character `0` in whatever font and size is defined for the
element. Setting the body to no more than `65ch` means that you'll never have
more than about 65 characters on a line. Most people read comfortably when
lines have between around 50 and 70 characters. And using `max-width` means
that if the browser window is ever narrower than that `65ch`, the body will
shrink it's width to fit, rather than staying fixed at a single value.

## Conclusion
There we have it: a complete game-ready document from Markdown to style HTML.
This should give you a good idea of what the process looks like at a basic
level. It should also tell you that HTML can look pretty good with even the
barest styling. An excellent place to be going forward from.

<!-- Links & References -->
[GitHub]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/statblock
