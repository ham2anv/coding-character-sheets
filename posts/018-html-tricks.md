---
title: Stupid HTML Tricks
date: 2022-04-14 14:18:12-05:00
excerpt: "We look at a few specialized HTML elements that add a bit more detail
         and even interactivity to your page with very little overhead."
---

An HTML page can be so much more than just some headers, paragraphs, and the
occasional `<div>` for something weird. HTML provides many specialized elements
that let you present information in a sensible and usable way. In most cases,
too, accessibility is baked right into the standard.

## \<dl\>
A <dfn title="definition list">definition list</dfn> is a special kind of list
element that pairs one or more terms with one or more definitions. It is perfect
for glossaries, which greatly help the reader learn new game terms.

The following HTML code produces a definition list...

```html
<dl>
    <dt>dice pool</dt>
    <dd>
        A variable assortment of dice rolled at once to determine a result.
        The number (and perhaps size) of dice is usually set by a character's
        traits or the situation.
    </dd>
    <dt>difficulty</dt>
    <dd>
        A number that a result is compared against to determine the outcome of a
        roll.
    </dd>
</dl>
```

...that looks like this:

<dl>
    <dt>dice pool</dt>
    <dd>
        A variable assortment of dice rolled at once to determine a result.
        The number (and perhaps size) of dice is usually set by a character's
        traits or the situation.
    </dd>
    <dt>difficulty</dt>
    <dt>target (number)</dt>
    <dd>
        A number that a result is compared against to determine the outcome of a
        roll.
    </dd>
</dl>


The `<dl>` element is the container for the entire definition list. Each `<dt>`
element is a term. And each `<dd>` element is a definition. It is acceptable to
mix and match multiple `<dt>` terms and/or multiple `<dd>` definitions.

The default styling may vary a bit by browser. But typically, the terms are in a
bold font weight and aligned to the left margin, while the definitions are
indented from the left margin. These styles can, of course, be altered via CSS
on the `<dt>` and `<dd>` elements, respectively:

```css
dt {
    font-style: italic;
}
dd { 
    border-left: 3px solid lightgray;
}
```


## \<abbr\>, \<dfn\>, \<mark\>, and \<time\>
HTML offers a number inline elements to help you semantically define information
in your text.

The `<abbr>` elements represents an abbreviation. Whatever text is inside it
should be an abbreviation or acronym. The `<abbr>` tag can take a `title`
attribute, and it should have the full description or expansion of the
abbreviation, which may be displayed as a tooltip when the user hovers over the
term.

```html
<p><abbr title="HyperText Markup Language">HTML</abbr> stands for
"HyperText Markup Language."</p>
```

<abbr title="HyperText Markup Language">HTML</abbr> stands for
"HyperText Markup Language."

A `<dfn>` element represents a term that is defined in the immediate context:
the paragraph `<p>`, the current `<section>` element, etc. The `<dfn>` tag can
also take a `title` attribute, which should be the canonical form of the term,
in case you need to use an alternate form to make your text work.

```html
<p>The <dfn title="Game Moderator">GM</dfn> controls supporting
characters, establishes scenes, presents challenges, and performs
other tasks to facilitate play.</p>
```

The <dfn title="Game Moderator">GM</dfn> controls supporting characters,
establishes scenes, presents challenges, and performs other tasks to facilitate
play.

A `<mark>` element represents text that you want to call out for the reader to
take particular notice of as relevant, such as in a quotation. It is highlighted
or marked in some way, similarly to if someone took a highlighting marker to a
book. _Note_: this element is not announced by most screen reader software, and
you shouldn't rely on it alone to convey critical information.

```html
<blockquote>
If circumstances cause a roll to have both advantage and disadvantage, you are
considered to have neither of them, and you roll one d20. <mark>This is true even if
multiple circumstances impose disadvantage and only one grants advantage or vice
versa.</mark> In such a situation, you have neither advantage nor disadvantage. 
</blockquote>
```

> If circumstances cause a roll to have both advantage and disadvantage, you are
> considered to have neither of them, and you roll one d20. <mark>This is true
> even if multiple circumstances impose disadvantage and only one grants
> advantage or vice versa.</mark> In such a situation, you have neither
> advantage nor disadvantage. 

The `<time>` element represents a specific period of time, either a time on a
clock, a date on the calendar, or a duration. You should include a `datetime` 
attribute that translates this time into a [format] readable by programs like
search engines. A `<time>` element is not usually styled by default. It is
mainly used to provide information to other programs.

```html
<p>Our first session will be on <time datetime="2022-01-03">January
3rd</time>.<p>
```

Our first session will be on <time datetime="2022-01-03">January 3rd</time>.

## \<details\>
This last HTML trick provides a bit more interactivity at no cost. A `<details>`
element creates a box that can hide or show content with a click. (This is
sometimes called a "disclosure widget.")

The first thing inside the `<details>` element should be a `<summary>` element.
This gives a title to the widget, and clicking on this title will open or close
the content box. Anything else inside `<details>` other than the `<summary>` is
content to be hidden or shown.

```html
<details>
<summary>Improved Initiative [General]</summary>
<p><strong>Benefit</strong>: You get a +4 bonus on initiative checks.</p>
<p><strong>Special</strong>: A fighter may select Improved Initiative as one of his fighter bonus
feats.</p>
</details>
```

<details>
<summary>Improved Initiative [General]</summary>
<p><strong>Benefit</strong>: You get a +4 bonus on initiative checks.</p>
<p><strong>Special</strong>: A fighter may select Improved Initiative as one of his fighter bonus
feats.</p>
</details>

The brower handles the opening and closing as well as the marker that indicates
the widget's state (that little triangle on the summary that rotates). You can
apply styles to various parts of the widget, and you can even target styles
that only apply with the widget is open. See MDN for [more].

## Conclusion
These are just a few of the specialized elements available in HTML to better
represent the information in your game. We'll look at more in the future. I'm
particularly looking forward to building something with `<progess>` or
`<meter>`. Have fun digging into the [deeper pockets] of HTML!

<!-- Links & References -->
[format]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time#valid_datetime_values
[more]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details#customizing_the_appearance
[deeper pockets]: https://developer.mozilla.org/en-US/docs/Web/HTML
