---
title:   "My Markdown Habits"
date:    2022-03-13 10:00:55-05:00
excerpt: "A look at my personal rules and best practices when writing in
         Markdown."
---

When I'm working in Markdown, I tend to follow a few simple rules. These aren't
required by any Markdown standard, but they are accepted options that help me
stay organized and productive. You can use these if they make sense, but I urge
you to come up with your own rules that let you do your best work.

## Setup
For most of my work in Markdown, I include some extra data at the top of the
file. This always includes the document's title, and it may have other entries
as required by whatever tool I'm using. For example, the beginning of the `.md`
file for this post starts like this:

```yaml
---
title:   "My Markdown Habits"
date:    2022-03-13 10:00:55-05:00
excerpt: "A look at my personal rules and standard procedures when writing in
         Markdown."
---
```

Technically, this is known as "YAML front-matter." [YAML]---"YAML Ain't Markup
Language"---is a language designed to present metadata about a file in a
standard, easily readable format. The text before the colon is the name of an
attribute, and everything after the colon is the value of that attribute. This
can all be referenced in code during the conversion process.

As I'm writing Markdown, I hard wrap each line to no more than 80 characters.
This is purely for readability on my own part. The 80 character limit goes way
back to old [punch card] programmaing, and is commonly used as a default
setting for modern terminal programs on systems like Linux (which I use on my
main computer).

## Formatting
I differentiate between **bold** and _italic_, strictly using double asterisks
`**` for bold and single underscores `_` for italic. This is, again, purely for
my own readability. Every editor I use provides some additional visual
formatting for Markdown, and they don't care which symbol I use where, but I
stick to it out of habit.

I make use of a few other types of formatting when I'm working on files I plan
to process with pandoc. I don't always use them for their intended purpose,
though, and I'll talk more about how I use them in a later post.

- The backtick symbol `` ` `` is normally used to define a piece of code inside
  other normal text. That's how I use it in these posts, but I use it in other
  files to define game traits, like [aspects] in Fate, that should have special
  typography applied.
- The tilde symbol `~` normally denotes a subscript (text set below the normal
  baseline for the text around it, often used in chemical formulas). I mainly
  use it in my conversion projects to denote special characters that need to
  be displayed in a glyph font, like the [Fate glyph font].

## Headings
I use the hash symbol style of headings almost exclusively. It's still pretty
readable, and most editors highlight headings in this style well, making them
stand out from the rest of the text.

_Exception_: If I intend for the file to only ever be read as text, and it
won't have more than two levels of heading, I'll use the "underline" style.

## Lists
I used to start list items with asterisks `*`, but I've moved to using hyphens
`-` exclusively of late. I still hard wrap lines in list items, and indent the
additional lines with two spaces so they line up with the start of the text
above.

While Markdown can handle the numbering of ordered lists automatically, I use
the correct numbers in my original file anyway. It just looks better and makes
the original Markdown more usable.

## Links
Lately, I've moved to preferring the "reference" style of links in Markdown.
That is, I use the form where the link text is in square brackets `[ ]` and
followed by an id also in square brackets. The id is then included somewhere
else in the file followed by a colon and the link URL. This keeps the Markdown
file clean and readable without interruptions for long, complicated URLs.

It's technically legal to omit the id and second set of brackets. If you do,
the initial link text is used as the id as well. You just have to include it
in brackets again somewhere else in the file, followed by a colon and the URL.
(If I use the same link again elsewhere with different text, I'll include the
original as an id.)

Finally, I put all of my referenced links at the very end of my file, after a
comment. It looks like this (the links section from this very post):

```markdown
...rest of the file here...

<!-- Links & References -->
[YAML]: https://yaml.org/spec/1.2.2/#11-goals
[punch card]: https://en.wikipedia.org/wiki/Punched_card#IBM_80_column_punched_card_formats_and_character_codes
[aspects]: https://fate-srd.com/fate-condensed/aspects-and-fate-points
[Fate glyph font]: https://www.faterpg.com/licensing/
```

## Conclusion
Those are my Markdown habits. I don't suggest that everyone should use them,
because some of them are just me being more strict that I need to be. But you
will definitely come up with your own best practices as you explore the format.
If you find something that works really well, I'd love to hear about it. A link
to my Twitter profile is in the footer.

<!-- Links & References -->
[YAML]: https://yaml.org/spec/1.2.2/#11-goals
[punch card]: https://en.wikipedia.org/wiki/Punched_card#IBM_80_column_punched_card_formats_and_character_codes
[aspects]: https://fate-srd.com/fate-condensed/aspects-and-fate-points
[Fate glyph font]: https://www.faterpg.com/licensing/
