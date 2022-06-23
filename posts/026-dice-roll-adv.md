---
title: "Tool: Inline Dice Rolls, updated"
date: 2022-06-23 07:22:52-04:00
excerpt: "An update to the inline dice rolls tool, with new features including
 exploding dice and counting successes."
---

I presented a basic tool for inline [dice rolls] previously, but there was
plenty of room for improvement. Now I've revisited it and added a number of
new features.

You can grab the new [code] from GitHub, if you want to follow along.

## Using the Tool
The basics of the tool are the same: wrap a dice expression in a `<span>` with
the `dice-roll` class. One big improvement is that the tool now recognizes more
complicated expressions. It can handle multiple groups of dice, and dice of
different sizes. So, an expression like <span class="dice-roll">2d6+1d8</span>
now functions as you'd expect. The tool also handles subtracting dice, so
<span class="dice-roll">2d6-1d8</span> works as well.

Another UX improvement is the expansion of the `title` attribute on the inline
dice rolls and  results. If you hover over a die roll, the title shows what
features are set for that roll. On a result, the title displays the original
expression, the individual dice rolls, and the result based on the type of
roll.

### Exploding Dice
Many rules systems use a concept called "exploding" dice. That is, if a die
rolls the maximum possible result, you roll it again and add that result to
the total. Rerolls of the maximum result explode, as well.

To model such dice in our new tool, add the `data-explode="true"` attribute to 
the `<span>`. So, the following code...

```html
<span class="dice-roll" data-explode="true">4d4</span>
```

...creates this: <span class="dice-roll" data-explode="true">4d4
</span>. If you hover over the result, you'll see in the list of results
whether any dice exploded.

### Counting Successes
In some systems, rather than total all of the dice rolled, you instead check
each die against a target number. Each die that rolls that number or higher is
called a "success" or "hit."

To produce a roll like this, add the `data-success` property to the span. Its
value is the target number. So, the following code...

```html
<span class="dice-roll" data-success="5">10d6</span>
```

...will roll 10d6 and count the dice that roll 5 or 6: <span class="dice-roll" 
data-success="5">10d6</span>. The result overlay shows the number of successes.
(To set this kind of roll apart, I gave it a different text and border color.)

Some systems that count successes allow for a variant of exploding dice where
a die that rolls a certain value or higher counts as a success _and_ is
rerolled and checked for additional successes. To model this, add the
`data-again` attribute along with `data-success`. (A `data-again` value lower
than `data-success` will lead to weird results. Probably don't do that.) This
code...

```html
<span class="dice-roll" data-success="8" data-again="10">6d10</span>
```

...produces this: <span class="dice-roll" data-success="8" data-again="10">6d10</span>.

### Keeping Highest or Lowest
Sometimes, you want to roll some number of dice but only count a few of them,
either the highest or lowest results. Examples of this include rolling 4d6 and
keeping the highest 3 for ability scores, or rolling with advantage or
disadvantage in D&D 5e.

To model rolls like this, add the `data-highest` or `data-lowest` attribute to
the span. The value is the number of dice you want to total. You can't combine
`data-highest` and `data-lowest`. These options work with `data-explode` but
not with `data-success`. This...

```html
<span class="dice-roll" data-highest="3">4d6</span>
```

...yields this: <span class="dice-roll" data-highest="3">4d6</span>.


## New Concepts
There are only a few small new concepts I'll touch on in this post. But there's
more I can cover in this code in future posts.

### CSS
Since we're using attributes in our spans to trigger these new features, its
possible to use CSS selectors to style different types of inline rolls
differently. The JavaScript code is still looking for the `dice-roll` class
and adding the `dice-overlay` class, so we can't get rid of those. But,
remember earlier how I said I gave rolls that count successes a different
color? I did that by using an attribute selector to select elements with the
`data-success` attribute:

```css
[data-success], [data-success] .dice-overlay {
    border-color: blue;
}

[data-success] .dice-overlay {
    color: blue;
}
```

Since these rules only define single properties, everything else from our base
styles cascades through. The only things that change are the border color and
the text color on the result overlay.

### JavaScript
Much of the JavaScript code works as it did before, but it needed to be
restructured to account for the new features. The biggest change you'll notice
right away is that I broke sections of code out into their own functions. This
is a good practice to get into, as it hopefully makes the code easier to follow
when individual processes are called out by name.

The two main functions are `getHits()` and `rollTotal()`. The first is for
rolls that count successes, and the second is for rolls that want to add up
dice. Each uses [regular expressions] to extract the dice expressions from
our span.

A lot of the tricks in this code rely on various object methods to break
apart, sort, process, and recombine arrays of dice results. Frankly, it's too
much to cover in this post, but I promise to go further into array methods
later.

The one new concept that I did want to go over is the `while` loop and the
`continue` statement. In the `explodeDice()` function, I have the following
code: 

```javascript
while (i < num) {
    if (sides === "F") {
        roll = fate[Math.floor(Math.random() * 3)] 
            * (sign==="-" ? -1 : 1);
        rollList.push(roll);
        if (roll == 1 * (sign==="-" ? -1 : 1) 
            || (again && roll >= again)) continue;
    }
    else {
        roll = (Math.floor(Math.random() * sides) + 1) 
            * (sign==="-" ? -1 : 1);
        rollList.push(roll);
        if (roll == sides * (sign==="-" ? -1 : 1) 
            || (again && roll >= again)) continue;
    }
    i++;
}
```

A `while` loop is a kind of loop that checks a condition (in this case `i <
num`), and as long as that condition is true, it keeps looping. I use it here
because exploding dice keep exploding as long as the result is the maximum
possible. Inside this loop, I check each roll, and if it is the maximum and
should explode, I give the `continue` statement. This tells the `while` loop
to immediately skip to the start of the next loop, ignoring any code left in
the `while` block. Since `i` is not increased until the very end of the loop
(where it says `i++`), the loop will only end once all dice have finished
exploding.


## Conclusion
Now the inline dice rolls tool is even better. If there's a feature you'd like
to see added, let me know. If you're inclined to help out, put in a pull
request on GitHub. I'd love to see what you have!


<!-- Links & References -->
[dice rolls]: /posts/dice-roll/
[code]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/dice-roll-adv
[regular expressions]: /posts/dice-roll/#regular-expressions
