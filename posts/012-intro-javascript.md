---
title: "Cracking the Code: Introduction to JavaScript"
date: 2022-03-28 08:57:58-05:00
excerpt: "We take our first steps toward adding interactive features using JavaScript. In this post, we go over some of the very basic concepts of programming."
---

JavaScript is the main programming language for letting web pages include
interactive elements or dynamic data. It can be complex and very powerful, but
the basics are easy to pick up.

Over the next several posts, we'll approach building a feature that may be of
use to GMs and designers: a table that selects a random result when you click
on it. To begin, however, let's talk about the very building blocks.

## What Is JavaScript?
JavaScript is a <dfn title="programming language">programming language</dfn>,
which means it is a language that can be read and written by human beings but
which also tells a computer how to input, manipulate, and output data. It is an
<dfn title="interpreted">interpreted</dfn> language, which means you don't have
to compile it into its own standalone program. Instead, other programs (like
your browser) read it and use its instructions to do work.

For our purposes, we'll focus on how JavaScript works in a web browser.
JavaScript is used in other ways and on other platforms, but GMs and designers are most likely to want to use it on the web.

You can include JavaScript in a web page by adding an external file or by
writing the code directly in the HTML file. In either case, you use the
`<script>` element.

```html
<script src="app.js"></script>
<script>..some JavaScript code here...</script>
```

## Types & Variables
JavaScript handles data of a [variety] of <dfn title="type">types</dfn>, 
including but not limited to:

- <dfn title="string">Strings</dfn> of letters and other characters, to
  represent text
- <dfn title="number">Numbers</dfn>, which can be integers (whole numbers) or
  floating point numbers (with decimal places)
- <dfn title="boolean">Booleans</dfn>, which are either `true` or `false`

A <dfn title="variable">variable</dfn> is a name which can be assigned a value.
JavaScript does not require you to define a type for each variable. It can
generally figure out a variable's type from its value. In fact, if you assign a
variable a new value, its type changes accordingly.

To create a variable, use the `let` or `const` keywords. Both of these define a
variable, but they differ in how those variables can be used:

- With `let`, the variable can assigned new values after it is initially
  defined.
- With `const`, the variable is fixed and can't be changed after you define it.

```javascript
let a = 10;  // a is 10
const b = 5; // b is 5
a = b;       // a is now 5
```

## Operators
An <dfn title="operator">operator</dfn> is a symbol or group of symbols that
tell the program to do some basic manipulation to two things. The operator
typically comes between the two. The equal sign `=` above is an
operator that says "assign the second value to the first variable."

Other operators include the arithmetic operators (addition `+`, subtraction
`-`, multiplication `*`, division `/`) and conditional operators. Those deserve
their own section, so here we go.

## Equality and Conditionals
A single equal sign `=` is used to assign a value to a variable, as we saw above. To check if one thing is equal to another, use two `==` or three `===`
equal signs. These are the <dfn title="equality operator">equality operators</dfn>.

Because JavaScript does not require variables to have strict types, it can
compare different types fairly intelligently. If you don't care if the values
in your condition are the same type, use equality `==`. If they _must_ be the same type, use strict equality `===`.

Other conditional operators include:

- Inequality `!=` and strict inequality `!==`, to check if two things are
  _not_ equal.
- Greater than `>` or greater than or equal `>=`
- Less than `<` or less than or equal `<=`

All of the conditional operators will give a value of `true` or `false`. At
some point, you'll want to check a value and execute a piece of code based
on whether it's true. The basic <dfn title="conditional">conditional</dfn>
structure in JavaScript is `if`. Start with the `if` keyword followed by a
condition you want to check, often involving an equality. Whatever code you
want to perform goes after the condition in curly braces `{}`.

```javascript
if (a <= 5) {
    a = 0;
}
```

You can follow an `if` with `else` and some code in curly braces. That code
will run if the initial condition is false.

```javascript
if (a <= 5) {
    a = 0;
}
else {
    a = 6;
}
```

## Functions
A <dfn title="function">function</dfn> is a bit of code you want to use
multiple times. You give it a name, and you can call that name somewhere else
in your code to run the function at that point.

```javascript
function commonCode() {
    // some code goes here
}

// somewhere else
commonCode();
```

A function can take parameters inside the parentheses `()`. These act like
variables inside the function with whatever value you passed in the function
call.

```javascript
function doThing(a, b) {
    if (a === b) {
        // code to run if a is exactly equal to b
    }
}

// somewhere else
doThing(variable1, variable2);
```

Finally, a function can `return` some value. That is, when you call the
function, treat the function call as whatever value it returns.

```javascript
function highest(a, b) {
    if (a > b) {
        return a;
    }
    else {
        return b;
    }
}

let a = 10;
let b = 5;
let c = highest(a, b);
// c is 10
```

If `return` is ever run inside your function, the function immediately ends, returning that value.

## Conclusion
So far, we can create variables, perform arithmetic, and define functions that
can be reused. Next time, we'll cover the basics of objects and other data
structures, such as arrays.

<!-- Links & References -->
[variety]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
