---
title: "Model Kit: Objects & Arrays"
date: 2022-03-29 07:29:02-05:00
excerpt: "An introduction to objects and arrays, ways to collect and model your
         data in JavaScript."
---

An important concept in programming is how you organize and collect data.
JavaScript gives two main structures: objects and arrays. Each presents tools
for accessing and manipulating that data.

## Objects
In theory, almost everything in JavaScript is an object, even the basic strings
and numbers you store in variables. An <dfn title="object">object</dfn>
represents a collection of data and has two important features for manipulating
that data: properties and methods. Every object has a name, like a variable
does, and you reference the object by that name.

A <dfn title="property">property</dfn> is like a variable that is bundled in the
object. It has its own name and value, with some properties being read-only and
others able to be reassigned. To access an object's properties, you use a "dot"
notation. That is, you start with the object name, then a dot `.`, then the name
of the property.

```javascript
let objectProperty = object.property;
```

Some properties are themselves objects, with their own properties and methods.
You can chain property objects together with dot notation, digging deeper and
deeper with each dot.

```javascript
let subProperty = object1.propertyObj.property;
```

Where a property is like a variable, a <dfn title="method">method</dfn> is like
a function. You use the same dot notation to call an object's method, and you
may pass the method parameters inside parentheses. Methods may return a value as
well.

```javascript
let methodReturn = object.method(param1, param2);
```

In most cases, you can create a new object using the `new` keyword and assign
it to a variable name. This keyword calls the <dfn title="constructor">
constructor</dfn> method of the object type. For some objects, including the
basic data types we talked about last time, you can use a shorthand of just the
value. This is called a "literal constructor." In the following code, both lines
create a new string:

```javascript
let strA = new String("String A"); 
let strB = "String B";
```

JavaScript presents all sorts of objects, and they all have different properties
and methods defined for them. Learning them is the bulk of learning JavaScript.
For now, though, just understand the basics here, and we'll describe specific
objects in later posts.

## Arrays
An <dfn title="array">array</dfn> is an ordered collection of other objects or
values. Think of an array as a row of filing cabinets, with each one containing
one <dfn title="element">element</dfn>. Each element in an array has an <dfn
title="index">index</dfn>, a number that refers to its place in the array. You
reference an element with the name of the array followed by the element's index
in square brackets `[]`. Array indexes start at 0 and count up.

```javascript
let element1 = arr[0]; // first element of array
```

An array is an object, so you can create it using `new Array()`. You can also
create an array using a literal constructor by just assigning a list of values
inside square brackets to a variable name. In the following code, both lines
create identical arrays:

```javascript
let arrA = new Array(1,2,3);
let arrB = [1,2,3];
```

One of the most important properties of an array is the `length` property. This
holds the number of elements in the array, and it changes whenever an element is
added or removed.

As an object, every array also has a number of default methods. You can add an
element to the end of an array with the [push()] method, for example. Some of
the methods of an array allow for very powerful data manipulation tricks,
but that's a topic for the future.


## Conclusion
Okay. Now we have a basic grounding in objects and arrays. Next time, we'll look
at how JavaScript interacts with your HTML page using something called the
"document object model" or DOM.

<!-- Links & References -->
[push()]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
