---
title: "JavaScript Example: Random Tables"
date: 2022-04-01 08:30:11-05:00
excerpt: "We walk through an example of using JavaScript to add a little
         interactivity to your page: a table that randomly selects one of its
         rows when you click it."
---

The time has come. We're going to walk through a small example script that does
something useful for GMs and designers: implement an HTML table that will select 
a random entry whenever you click. Grab the [example] from GitHub and follow
along.

## HTML
First, let's look at the HTML file for the example. It's a very barebones page. The `<head>` includes some boilerplate metadata, a `<title>`, and the JavaScript
and CSS files linked in.

```html
<title>Random Table</title>
<link rel="stylesheet" href="table.css">
<script src="table.js" defer></script>
```

In the `<body>`, we have two `<table>` elements, "random-table-1" and
"random-table-2". Those `id` attributes are important, so keep them in mind.

In the `<table>` tag for "random-table-2", we see another attribute,
`data-weighted`. What does that mean? It's a [custom data attribute] which we
can reference with JavaScript later. This attribute is a boolean (true/false)
attribute, and HTML assumes that an attribute name without a value defaults to
"true."

```html
<table id="random-table-1" data-weighted>
```

Similarly, each `<tr>` in "random-table-2" has a custom `data-weight` attribute,
but these have a number value listed. This number is how we calculate weighted
probability in the advanced form of the tool.

```html
<tr data-weight="15">
```

## CSS
In the CSS file, we have a few rules just for making the example look a little
neater, but the important styles start at the following:

```css
table[id^="random"] {
  cursor: pointer;
  border-collapse: collapse;
}
```

That selector is weird, right? What it means is "select each `<table>` element
with an id attribute that starts with 'random'." This rule makes the mouse cursor
turn into a pointer to indicate that the table is clickable. (It also removes
the gaps in our table that would be filled by borders, but that's just
cosmetic.)

The next couple styles are also cosmetic, and they use some advanced selector
tricks that might not be clear. `:first-of-type` is what's called a
"pseudo-class." This keyword tells CSS to only select the element if it is the
first of its siblings of that type. Similarly, `:not()` tells CSS to negate
the criterion inside the parentheses. So that will select the element only if it
is _not_ the first sibling of its type.

The final two styles are what we really care about for our example. Our script
is going to add and remove the `highlight` and `gray-out` classes to indicate
which row was selected. (`highlight` doesn't actually give any styling right
now, but you're free to customize it for your design.)

## JavaScript
Okay, here we go. We start with the `highlightRow()` function, which is the heart
of our script. It takes one argument, an Element object. We find all `<td>`
cells and store them in the `allCells` variable. Then we find all `<tr>` rows
inside the `<tbody>` and store them in the `bodyRows` variable. (We use `const`
because these values won't change once we set them.)

```javascript
const allCells = table.querySelectorAll("td");
const bodyRows = table.querySelectorAll("tbody tr");
```

Next, we pick a random number `rowNum` between zero and the number of body rows
minus one. (We use that range because arrays start at 0 in JavaScript.)

```javascript
let rowNum = Math.floor(Math.random() * bodyRows.length);
```

If the table isn't weighted, that's number we'll use. But if the table has the
`data-weighted` attribute, we have to pick a number based on the weights. We
check for that using the `dataset` property of the table element, which has a
`weighted` property if the element has the `data-weighted` attribute.

```javascript
if (table.dataset.weighted) {
```

Inside that block, we set up a couple variables. `totalWeight` will keep a tally
of the weights as we go through the body rows. `entries` will keep a list of
each entry's position and weight. For now, they're 0 and an empty array,
respectively. (We use `let` here because these values _will_ change.)

```javascript
let totalWeight = 0;
let entries = [];
```

Now we'll cycle through all of the rows using the `forEach()` method on
`bodyRows`. This method takes a callback function as its argument, and we use an
[arrow function] here. `forEach()` will run that function for each element in
the list.

The callback function takes two arguments, the row element we're working on `el`
and the `index` of that element in the list of rows. Then we check if `el` has
a `data-weight` attribute using the same `dataset` property:

```javascript
bodyRows.forEach((el, index) => {
    if (el.dataset.weight) {
```

If it has `data-weight`, we add that weight to the `totalWeight`. (We divide
`el.dataset.weight` by 1 because it's actually a string but we want to convert
it to a number.) Then we add an element to the `entries` array using the
`push()` method. This element is a custom object with a `row` property equal to
`index` and a `ceiling` property equal to `totalWeight`. (We indicate that it's
an object by wrapping those properties in curly braces `{}`. This is called an
[object literal].)

```javascript
totalWeight += el.dataset.weight/1;
entries.push({
    row: index,
    ceiling: totalWeight
});
```

Once we do that for each weighted row, we need to select a new row. First, we
generate a random number `rand` between zero and `totalWeight` minus one. Then
we find the first row with a `ceiling` property greater than `rand` and assign
its `row` property to `rowNum`.

```javascript
let rand = Math.floor(Math.random() * totalWeight);
rowNum = entries.find(el => el.ceiling > rand).row;
```

Now we have a randomly selected row, one way or another. First, we'll gray out
every row in our table by removing the `highlight` class and adding the
`gray-out` class to every `<td>` cell. Then, for every cell in our selected row,
we remove `gray-out` and add `highlight`.

```javascript
allCells.forEach(el => {
    el.classList.remove("highlight");
    el.classList.add("gray-out");
});
bodyRows[rowNum].querySelectorAll("td").forEach(el => {
    el.classList.remove("gray-out");
    el.classList.add("highlight");
});
```

Thus endeth `highlightRow()`. Next we have a quick function `clearTable()` that
just removes both `highlight` and `gray-out` from each cell in a table.

```javascript
function clearTable(table) {
    table.querySelectorAll("td").forEach(el => {
        el.classList.remove("highlight","gray-out");
    });
}
```

The last two bits of the script are complicated, but let's walk through them.
First, we are going to add an [event listener] to each table in our page with an
`id` attribute that starts with "random". (Told you that would be important.)
Clicking on such a table will run `highlightRow()` with the clicked table as
the argument.

```javascript
document.querySelectorAll("table[id^=\"random\"]").forEach(table => 
    table.addEventListener("click",ev => highlightRow(ev.currentTarget));
);
```

Finally, we add another event listener, this time to every `<td>` cell in each
table with an id attribute that starts with "random". When you click such a
cell, if it has the `highlight` class, the script runs `clearTable()` with the
cell's table as the argument.

```javascript
document.querySelectorAll("table[id^=\"random\"] td").forEach(cell => {
    cell.addEventListener("click", ev => {
        if (ev.currentTarget.classList.contains("highlight")) {
            clearTable(ev.currentTarget.closest("table"));
            ev.stopPropagation();
        }
    })
});
```

The `stopPropagation()` method is there because events normally "bubble up"
through the DOM. That means, if you click an element, the click event triggers
on that element, but then it triggers on that element's parent, then the
parent's parent, and so on, all the way back to the base of the tree.
`stopPropagation()` prevents this, so clicking on a selected row to clear the
table doesn't then proceed to select a new row (via the click event on the table
calling `highlightRow()`).

## Sample
Here's a sample of the tool at work. Click the table to select an entry at
random. Click that entry to clear the selection.

<style>
.highlight {
}

.gray-out {
  color: darkgray;
}
table[id^="random"] {
  cursor: pointer;
}
table[id^="random"] td {
  transition: all 300ms;
}
</style>
<script src="posts/random-tables/table.js" defer></script>

<table id="random-table-1">
        <thead>
            <tr>
                <th>Roll (1d6)</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>No effect</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Minor Effect</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Significant Effect</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Major Effect</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Extreme Effect</td>
            </tr>
            <tr>
                <td>6</td>
                <td>Two Major Effects</td>
            </tr>
        </tbody>
    </table>

## Conclusion
There you have it: a simple tool for adding a bit of interactivity to your page
with JavaScript. I encourage you to play around with it, add styling, maybe even
find a way to select multiple rows at once. I'll present more examples like this
in the future, but for now, have fun!

<!-- Links & References -->
[example]: https://github.com/ham2anv/coding-character-sheets/tree/main/examples/random-table
[custom data attribute]: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*
[arrow function]: posts/more-javascript/#arrow-functions
[object literal]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#object_literals
[event listener]: posts/more-javascript/#events
