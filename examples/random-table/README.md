# Random Tables


## What You Need
- A `<table>` element with an id attribute that starts with "random"
  - (Optional) A `<thead>` with one or more `<tr>` elements containing `<th>`
    cells
  - A `<tbody>` with two or more `<tr>` elements containing `<td>` cells
- A CSS file with `.highlight` and `.gray-out` class styles
- The included JavaScript

If you want to use weighted distribution, you must also include:

- On your `<table>`, a `data-weighted` attribute set to "true"
- On each `<tr>` in your `<tbody>`, a `data-weight` attribute with a number
  value