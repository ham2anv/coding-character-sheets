---
title:  "Pseudo Science: Stupid CSS Tricks"
date: 2022-05-02 10:07:37-04:00
excerpt: "Let's look at some powerful features of CSS that let you do creative
         and sophisticated tricks with your designs."
---

We've talked about CSS [selectors] before, and you can do a lot of powerful work
with combinations of basic selectors. But there's an even deeper level of
selectors that let you respond to user actions, style elements based on their
position in the document tree, and even create new content from scratch.

## Pseudo-Classes
Pseudo-classes let you select elements based on criteria other than types,
classes, or identifiers. Pseudo-class selectors always start with a colon `:`.
If you append a pseudo-class to another selector, it matches only the elements
that fit that selector and the pseudo-class criteria. If you use a pseudo-class
on its own, it will match any element that fits its rule.

### First, Last, and Nth
The direct child `>`, sibling `~`, and direct sibling `+` selectors let you
select an element relative to another element, but what if you want to select
for elements based on their absolute position in a tree? That's where the
tree-structural pseudo-classes come in, particularly `:first-*`, `:last-*`, and
`:nth-*`.

The `:first-*` and `:last-*` pseudo-classes select the first or last element
that matches. `:first-child` matches an element only if it is the first child
of its parent. `:first-of-type` matches an element if it is the first
child of its type, even if it is not the very first child of the parent element.
`:last-*` similarly match from the end of the tree of children.

The `:nth-*` pseudo-class lets you select elements using math. `:nth-child()`
and `:nth-of-type()` take a number in parentheses in the format `An+B`:

- `n` means "count all elements, starting at 0."
- `A` is the integer _step size_, meaning "count elements that are a
  multiple of _A_."
- `B` is an integer _offset_, and can be positive or negative. It means "start
  counting _B_ elements after (or before) 0."

The following CSS...

```css
li:nth-child(3n) {
    color: blue;
}
li:nth-child(3n+1) {
    color: green;
}
li:nth-child(5) {
    color: pink;
}
```

...would color the text of list item `<li>` elements as follows:

- Every third element (3, 6, 9, etc.) will be blue <span style="display:
  inline-block; height: 1em; width: 1em; background-color: blue;"></span>.
- The fourth element and every three elements thereafter (4, 7, 10, etc.) will
  be green <span style="display: inline-block; height: 1em; width: 1em;
  background-color: green;"></span>.
- The fifth element will be pink <span style="display: inline-block; height: 
  1em; width: 1em; background-color: pink;"></span>. (Without the `n` factor,
  the pseudo-class only selects a single element, `B`.)

`:nth-last-child()` and `:nth-last-of-type()` similarly count backward from the
last matching element.

<style>
#links-and-targets:target {
    border-block-end: 1px solid black;
}
</style>

### Links and Targets
The `:link` and `:visited` pseudo-classes select unvisited links and visited
links, respectively. This lets you change the styling of a link `<a>` element
based on whether the user has been to the linked URL.

The `:target` pseudo-class selects an element if it is the current target of the
page&mdash;meaning the URL ends with an anchor that matches the element's `id`
attribute. Click this [link] and you should see the heading for this section
gain a border.

### User Actions
Pseudo-classes can also select elements based on how the user is interacting
with them.

The `:active` pseudo-class selects the element when the user is actively using
it&mdash;for example, while actually clicking a link. `:focus` selects when the
element is the target of the user's input, most often when dealing with forms.

The `:hover` pseudo-class selects the element if the user's cursor is over it.
This is useful for highlighting links and other interface elements. The
following...

```html
<p>Hover over the spoiler text to read it:
<span class="spoiler">Rosebud was his sled.</span></p>
```
```css
.spoiler {
  color: black;
  background-color: black;
}
.spoiler:hover {
  background-color: white;
}
```

...produces this:

<style>
.spoiler {
  color: black;
  background-color: black;
}
.spoiler:hover {
  background-color: white;
}
</style>

<p>Hover over the spoiler text to read it:
<span class="spoiler">Rosebud was his sled.</span></p>


## Pseudo-Elements
Pseudo-elements let you style _parts_ of an element. They should start with two
colons `::`, but most browsers will correctly implement them with a single
colon. Pseudo-elements must be appended to another selector.

### Before and After
`::before` and `::after` create new pseudo-elements directly before or after the
selected element. You can style these pseudo-elements like you would any other
element, including size, position, colors, and typography. The content of
the pseudo-element is defined by the `content` property.

The following HTML and CSS...

```html
<div class="example">This is an example.</div>
```
```css
.example {
    font-style: italic;
    margin: 1rem;
    border: 1px solid red;
    padding: 1ch;
    position: relative;
}
.example::before {
    content: "Example: ";
    font: bold normal 1rem "Roboto";
}
.example::after {
    content: "*";
    font: bold normal 2.5rem "Roboto";
    text-align: center;
    color: red;
    position: absolute;
    top: -1rem;
    left: -0.5rem;
}
```

produces the following:

<style>
.example {
    font-style: italic;
    margin: 1rem;
    border: 1px solid red;
    padding: 1ch;
    position: relative;
}
.example::before {
    content: "Example: ";
    font: bold normal 1rem "Roboto";
}
.example::after {
    content: "*";
    font: bold normal 2.5rem "Roboto";
    text-align: center;
    color: red;
    position: absolute;
    top: -1rem;
    left: -0.5rem;
}
</style>

<div class="example">This is an example.</div>


### First Lines and First Letters
`::first-letter` and `::first-line` will select the first letter and the first
line of text in an element, respectively. The following...

```html
<p class="drop-cap">
  Dolore consequat velit duis mollit exercitation ad tempor esse
  cillum cillum mollit non. Amet eu esse sunt sunt tempor velit
  culpa in in voluptate eu. Elit dolor ea consectetur dolor
  consequat id laboris qui adipisicing est. Lorem ullamco culpa
  qui est officia non ipsum. Aliqua quis aliquip quis ullamco
  nostrud eu reprehenderit nostrud veniam Lorem fugiat ea proident.
  Ipsum dolore aute laboris mollit laborum esse deserunt in.
</p>
```
```css
.drop-cap::first-letter {
  float: left;
  font-size: 4em;
}
.drop-cap::first-letter, .drop-cap::first-line {
  font-weight: bold;
  color: green;
}
```

...produces this:

<style>
.drop-cap::first-letter {
  float: left;
  font-size: 4em;
}
.drop-cap::first-letter, .drop-cap::first-line {
  font-weight: bold;
  color: green;
}
</style>

<p class="drop-cap">
  Dolore consequat velit duis mollit exercitation ad tempor esse
  cillum cillum mollit non. Amet eu esse sunt sunt tempor velit
  culpa in in voluptate eu. Elit dolor ea consectetur dolor
  consequat id laboris qui adipisicing est. Lorem ullamco culpa
  qui est officia non ipsum. Aliqua quis aliquip quis ullamco
  nostrud eu reprehenderit nostrud veniam Lorem fugiat ea proident.
  Ipsum dolore aute laboris mollit laborum esse deserunt in.
</p>


### Markers
The `::marker` pseudo-element selects the marker of a list item&mdash;the bullet
in an unordered list or the number in an ordered list. `::marker` only allows
a small set of [properties], primarily typography and color. An important
property it _does_ allow is `content`, which lets you replace the default marker
with any content you want.

The following code...

```html
<ul>
  <li class="poop">"Pile of poo" emoji</li>
  <li class="rocket">Rocket emoji</li>
</ul>
```
```css
.poop::marker {
  content: "💩";
}
.rocket::marker {
  content: "🚀";
}
```

produces this:

<style>
.poop::marker {
  content: "💩";
}
.rocket::marker {
  content: "🚀";
}
</style>

<ul>
  <li class="poop">"Pile of poo" emoji</li>
  <li class="rocket">Rocket emoji</li>
</ul>


## Conclusion
Psuedo-classes and pseudo-elements let you do a lot of creative things with your
pages. This grows even more powerful when you combine them. Consider the
following code:

```html
<ul class="d6-list">
  <li>Bard</li>
  <li>Cleric</li>
  <li>Druid</li>
  <li>Fighter</li>
  <li>Thief</li>
  <li>Wizard</li>
</ul>
```
```css
.d6-list li::marker {
  color: red;
  font-weight: bold;
}
.d6-list li:nth-child(1)::marker {
  content: "⚀";
}
.d6-list li:nth-child(2)::marker {
  content: "⚁";
}
.d6-list li:nth-child(3)::marker {
  content: "⚂";
}
.d6-list li:nth-child(4)::marker {
  content: "⚃";
}
.d6-list li:nth-child(5)::marker {
  content: "⚄";
}
.d6-list li:nth-child(6)::marker {
  content: "⚅";
}
```

<style>
.d6-list li::marker {
  color: red;
  font-weight: bold;
}
.d6-list li:nth-child(1)::marker {
  content: "⚀";
}
.d6-list li:nth-child(2)::marker {
  content: "⚁";
}
.d6-list li:nth-child(3)::marker {
  content: "⚂";
}
.d6-list li:nth-child(4)::marker {
  content: "⚃";
}
.d6-list li:nth-child(5)::marker {
  content: "⚄";
}
.d6-list li:nth-child(6)::marker {
  content: "⚅";
}
</style>

<ul class="d6-list">
  <li>Bard</li>
  <li>Cleric</li>
  <li>Druid</li>
  <li>Fighter</li>
  <li>Thief</li>
  <li>Wizard</li>
</ul>

See what else you can do with these features!

<!-- Links & References -->
[selectors]: posts/selectors/
[link]: posts/pseudo/#links-and-targets
[properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/::marker#allowable_properties