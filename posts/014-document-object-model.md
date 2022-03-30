---
title: "Turn the Page: Document Object Model"
date: 2022-03-30 08:31:02-05:00
excerpt: "An introduction to basic concepts of the DOM, the model that
         JavaScript uses to understand and manipulate the elements on your HTML
         page."
---

When your browser loads a web page, it reads the HTML and creates a model of all
the elements in it. This is known as the <dfn title="document object
model">document object model</dfn> (or DOM), and you can access it through
JavaScript to manipulate the page.


## Document
The page as a whole is represented by the `document` object. You can think of
it like a tree graph, with `document` at the base, each of its children on its
own branch, each of their children on a branch, and so on. The various
properties and methods of `document` let you navigate, search, and change this
tree.

A few of the the document's child elements are called out as explicit
properties:

- `document.body` represents the `<body>` element
- `document.head` similarly represents the `<head>` element

And a few properties give you collections of child elements, which can be
accessed like an array:

- `document.children` is _all_ child elements on the page
- `document.forms` is all `<form>` elements
- `document.links` is all links (`<a>` elements) on the page

But it's possible to search for a specific element or group of elements. Lets
look at that.

## Finding Elements
Every element on a page, including `document`, has methods that let you find
specific children: `querySelector()` and `querySelectorAll()`. These each take a
string containing one or more [selectors], just like you use in CSS to style an
element. `querySelector()` returns the _first_ child element that matches the argument, while `querySelectorAll()` returns a collection of every child element
that matches.

```javascript
// find each element on the page with the "box" class
let boxes = document.querySelectorAll(".box");
```

If you use `querySelectorAll()`, it returns a NodeList object, which works like
an array in some ways but not all. The NodeList has a `length` property that
tells you how many elements are in it, but you can't do a lot of the tricks
we'll talk about in the future for arrays.


## Elements & Their Properties
Individual [elements] have properties reflecting pretty much every facet about
them you'd want to know. One of the most important for our purposes at present
is `Element.classList`, which contains all of the CSS classes assigned to the
element.

You'll interact with `Element.classList` primarily through its methods. These
let you `add()`, `remove()`, or `toggle()` specific classes on the element,
restyling in response to user input. (We'll use this in our random tables
example in the future.)


## Conclusion
All right. This was an _extremely_ brief intro to the DOM. It's one of those
topics that you really only learn through examples. We're building to one at the
end of the week, but first, we'll cover a couple of topics that were a little
beyond our earlier intros. Until next time.


<!-- Links & References -->
[selectors]: posts/introducing-css/#selectors-and-specificity
[elements]: https://developer.mozilla.org/en-US/docs/Web/API/Element
