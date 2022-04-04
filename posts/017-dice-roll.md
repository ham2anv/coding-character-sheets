---
title: "Tool: Inline Dice Rolls"
date: 2022-04-04 06:38:32-05:00
excerpt: "A worked example of assorted JavaScript techniques that you can drop
         right into your page to add inline dice rolls to your game."
---

This tool lets you include inline dice notation in your page. When the user
clicks on this text, the script generates a random result as if a player had
rolled the listed dice. It then lays that result over the original text.
Clicking this result clears it and restores the original.

Grab the [files] from GitHub.

## Using the Tool
It's pretty easy to get started with this tool. Once you link the `dice-roll.js`
script in your page and either link the included CSS file _or_ include its
contents in your own style sheet, all you need to do is wrap each dice notation
in a `<span>` with the `dice-roll` class.

<dfn title="dice notation">Dice notation</dfn> is basically what you'd expect if
you're familiar with RPGs at all. The tool can read anything with the format
"XdY," where X is the number of dice and Y is the size of the dice. It also
accepts modifiers to the roll in the "dice + adds" format. For example,
<span class="dice-roll">1d8+3</span> or <span class="dice-roll">1d10-1</span>.
Finally, it will roll Fudge/Fate dice when Y is "F": <span class="dice-roll">
4dF</span>.

The `showRoll()` function accepts one or two arguments: the `<span>` element to
parse, and an optional default size for dice where Y is not given. If you do not
include this second argument, the function uses a default die size of 6. So, if
your dice notation is <span class="dice-roll">5d+2</span>, the tool assumes you
mean "5d6+2" unless you set a different default when you call `showRoll()`.


## New Concepts
This tool uses a few new JavaScript concepts, and they're not all intuitive. But
let's walk through them and see how they work.

### Spread Syntax
Right off the line, we have this weird bit of code:

```javascript
const parse = [...span.innerText.matchAll(/(\d+)d([\d|F]*)([+-]\d+)*/g)];
```

Those three dots there at the start of the array. What's up with that, anyway?
That is what's called "[spread syntax]." It's a way to spread out an array or
object into its elements. In this case, the `matchAll()` method returns what's
called an [iterator], which among other things includes a list of results. But
by using the spread syntax `...` here, we turn those results into elements of
our `parse` array.


### Regular Expressions
That same line of code above also includes an example of a [regular expression],
or _regex_, a complicated and very powerful programming tool for working with
strings of text. Let's take a look again at just this part toward the end of the
line:

```javascript
/(\d+)d([\dF]*)([+-]\d+)*/g
```

This is a regular expression literal. In JavaScript, you can define a regular
expression between forward slashes `/` like this. But what does it all mean?

A regular expression matches patterns in a string of text. It can match actual
characters or special codes that represent types of character or other text
features (like line breaks). In this expression, `\d` means "match any digit character, 0-9."

You can group characters as a category to match using square brackets `[]`, and
the regex will match any character that falls in that category. So in our
expression, `[+-]` means "match '+' or '-'" and `[\dF]` means "match any digit
character or 'F'."

A few special characters in a regex are quantifiers that tell how many times the
pattern needs to appear before it counts as a match. In our example, the plus
sign `+` means "at least one time." The asterisk `*` means "0 or more times."
Any character or group not followed by one of these quantifiers must appear
exactly once to match.

Regular expressions can also keep track of individual matching groups inside the
expression. These are marked with parentheses `()`. Each set of parentheses will
be noted seperately in the final match. In our expression, these matching groups
return X, Y, and the modifier for our dice notation.

Finally, the regular expression ends with 0 or more "flags" that change how the
match is processed and returned. In our expresion, the `g` at the end means this
is a global search and will return every part of the string that matches, not
just the first group.

### Ternary Conditionals
Next up, we have this weird expression:

```javascript
const sides = (parse[0][2])?parse[0][2]:defaultSides;
```

This is what's called a <dfn title="ternary conditional">ternary conditional
</dfn> expression. This is a shorthand to get one of two values based on a
condition. If the condition before the question mark `?` is true, the expression
evaluates to the first value. Otherwise, it evaluates to the second value, after
the colon `:`.

In this case, `sides` equals whatever value is in `parse[0][2]` _if there is
one_. If not, it equals `defaultSides`. Similarly, in this line...

```javascript
const adds = (parse[0][3])?parse[0][3]:0;
```

...`adds` equals whatever value is in `parse[0][3]`, if any. Otherwise, it's 0.

### Template Literals
A [template literal] is, among other things, an advanced way to create a string
out of embedded expressions, in a process called string interpolation. You define a template literal by wrapping a string in backticks `` ` ``. For
example:

```javascript
overlay.title = `Roll: ${span.innerText}\nResult: ${result}`;
```

This line sets the overlay element's `title` attribute to a string that includes
the original dice notation as well as the result of the roll. Those values are
found in the nested expressions inside curly braces starting with a dollar sign
`${}`.

## Conclusion
Now we have a tool for adding inline dice rolls to your page. And we've gone
through a few new advanced JavaScript concepts that power it. I hope this is a
useful tool for GMs and designers to plus up your games. Keep on rolling!

<!-- Links & References -->
[files]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/dice-roll
[spread syntax]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
[regular expression]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[template literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
