---
title: "Tricksy: More JavaScript Topics"
date: 2022-03-31 08:26:49-05:00
excerpt: "We explore a few slightly more advanced bit of JavaScript as we 
         prepare for our first worked example."
---

Don't be scared! There are just a couple more bits of JavaScript we should
cover before we get to our example script. These are only a bit more advanced
than what we've looked at before, but they're really useful (and funny enough,
we use them in the example.)


## Assignment Operators
We've talked about one of these before, the basic assignment operator `=`. But
there are others that will save you time all over your scripts. Generally, if
you would assign the value of an expression to one of the variables in that
expression, you can rewrite that statement using an assignment operator by just
adding an equal sign onto whatever operator you used in the expression.

For example, the following statements are functionally identical:

```javascript
a = a + 2;
a += 2;
```

This includes all of the arithmetic operators (`+=`, `-=`, `*=`, `/=`), but it
can also be used with logical operators like AND `&&`. So, in the case of `a
&&= b`, `a` will remain `true` if both `a` and `b` are `true`, or become `false`
if _either_ `a` or `b` are false.


## Arrow Functions
Sometimes you need the effects of a function, but only in one place in your
script. You don't want to define a full function somewhere else for this one
task. Enter the arrow function.

An <dfn title="arrow function">arrow function</dfn> is a shorthand that defines
a function in a compact way. You can use it anywhere you would otherwise call a
pre-defined function.

You start an arrow function with a list of parameters in parentheses `()`. This
is followed by an equal sign and a close angle bracket `=>`. That's where the
name comes from, because those two characters together look like an arrow,
right? Then you have a set of curly braces `{}` and the code of the
function inside.

The following two blocks of code are functionally identical:

```javascript
function addToMax(a, b, c) {
    if (a > b) {
        return a + c;
    }
    else {
        return b + c;
    }
}

let addToMax = (a, b, c) => {
    if (a > b) {
        return a + c;
    }
    else {
        return b + c;
    }
}
```

There are a couple more space-saving rules around arrow functions. First, if you
only have one argument, you don't need the parentheses `()`. (If your arrow
function needs _zero_ arguments, you need to put in a set of empty parentheses
to signal you're starting an arrow function.) Second, if the body of your
function would be a single `return` line, you don't need curly braces `{}` or
`return`.

So, this function...

```javascript
function double(a) {
    return a * 2;
}
```

...can be reduced to this arrow function:

```javascript
a => a * 2;
```

One of the more common uses for arrow functions is when you need to pass a
function as an argument of another function. We'll see an example shortly.

## Events
Perhaps the best reason to use JavaScript on your page is to respond to user
actions. Every time the user interacts with your page, it triggers an <dfn title="even">event</dfn>. That means every time they click and so much more.

Your browser handles a lot of events on its own, but you will want to run your
own code when the user takes certain actions. You do this by creating what's
called an <dfn title="event listener">event listener</dfn>. This basically
attaches a function to an event on a specific element.

You create an event listener on any element with the `addEventListener()`
method. This method takes two arguments: an [event] as a string, and a function
(called the "callback function"). The callback function can take a single
parameter sent from the listener, an [Event object], that describes the event
that triggered, what element it triggered on, and more. 

This callback function is a perfect place for an arrow function. Instead of
calling another function defined somewhere else in your script, you can write
the callback function directly in the `addEventListener()` method.

```javascript
let total = 0;
const plus = document.querySelector("#plus-button");
plus.addEventListener("click", () => total += 1);
```


## Chaining Methods
A function can return just about any type of data, including an object. That
object has methods and properties of its own, _its_ methods might return
objects, and so on. Using dot notation, you can reference the returned object of
a method directly after the method call itself.

For example, the `querySelectorAll()` method on `document` and other elements
returns a collection of child elements, a type of object called a NodeList.
Let's say you don't care about the specific elements, you just want to store how
many there are. A NodeList has a `length` property just like an array. You can
assign that to a variable like so:

```javascript
let divCount = document.querySelectorAll("div").length
```

You can keep going, chaining _methods_ of the returned objects and doing
operations down the chain, theoretically forever. If you do, you may want to
add line breaks and indentation for readability. This is fine, as JavaScript is
pretty forgiving about spacing. The one rule is that a semicolon `;` always
ends a statement. (That's why I generally end all of my statements with one,
just in case.)

The following example uses chained array methods, including one with an arrow
function, to find all of the fruits in an array that contain the string "apple",
and stores them in a new array called `apple` in alphabetical order.

```javascript
const fruits = ["pear", "pineapple", 
                "mango", "apple", "banana"];
let apples = fruits
              .filter(word => word.includes("apple"))
              .sort();
```

## Math
The `Math` object provides many useful methods for performing complex
mathematical operations. For example, if you wanted to take a number `x` and
drop all fractions, you would call `Math.floor(x)`.

An important method for games is `Math.random()`. This returns a pseudo-random
floating point number that is greater than 0 and less than 1. Obviously, it's
really useful for games, and we'll use it as the core of our example. But you
might be wondering how you could use a fraction less than 1.

If you have a range of whole numbers you want to choose from (like 1-6, the
equivalent of rolling a six-sided die), first you call `Math.random()` and
multiply the return by the highest number in the range. Then you use
`Math.floor()` to drop the fractions you have left over. The result is a whole
number from 0 to the highest number minus 1. Just add 1, and you have your
random selection.

```javascript
let deeSix = Math.floor(Math.random() * 6) + 1;
```

## Conclusion
That was kind of a lot, wasn't it? Well, buckle in, because tomorrow, we'll put
these pieces together and take a look at our example, a random table tool that
selects an entry when you click the table. But seriously, it'll be good to see
the kind of stuff you can do with this nonsense.


<!-- Links & References -->
[event]: https://developer.mozilla.org/en-US/docs/Web/Events
[Event object]: https://developer.mozilla.org/en-US/docs/Web/API/Event
