---
name: heatmap
description: Grid of values coloured from light to dark, for visits by day and hour, retention cohorts or any table of numbers, with a tooltip, labels in the cells and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:14
updated: 2026-11-22 20:14
jcomponent: v20
---

# Heatmap

A table where every cell is coloured by its value, one hue from light (little) to dark (a lot): visits by day of the week and hour, AI crawlers by hour, retention cohorts, errors by page and day... It is a real HTML `<table>`, so screen readers read it as a table, and it re-renders on every change of the model.

With `type:grid` (default) the model is an `Object`:

```js
{
	rows: ['Oct 5', 'Oct 12'],          // labels of the rows
	columns: ['Week 0', 'Week 1'],       // labels of the columns
	data: [[100, 42], [100]]             // one array per row; a missing or null cell is empty (a cohort triangle)
}
```

With `type:week` only `data` is needed: 7 rows of 24 values (hours `0` to `23`), where `data[0]` is Sunday and `data[6]` Saturday, as `Date.getDay()`. The component orders the days from the first day of the week of the locale (or `firstday`), names them with `Intl` in the language of the page and labels the hours `00` to `23` (the tooltip uses the hour format of the locale).

- The colour goes from the minimum to the maximum of the data, or `min` and `max` (for percentages, `min:0;max:100`).
- With `labels:true` the values are printed in the cells, white on dark cells. Without it they are still in the table for screen readers.
- Hovering or focusing a cell shows its row, column and value. The table has one tab stop: the arrows move through the cells, `Home`/`End` go to the start and end of the row, `Enter`/`Space` run `click`, and a screen reader announces every cell.
- The label of the heatmap is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `type {String}` `grid` or `week` (default: `grid`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `color {String}` a hex colour of the scale instead of the primary colour of the app, example: `#1BAF7A` (default: `''`)
- `cell {Number}` the height of a cell in pixels (default: `22`)
- `labels {Boolean}` prints the values in the cells (default: `false`)
- `legend {Boolean}` shows the scale with the minimum and the maximum (default: `true`)
- `min {Number}` the value of the lightest colour; empty is the minimum of the data (default: `''`)
- `max {Number}` the value of the darkest colour; empty is the maximum of the data (default: `''`)
- `firstday {Number}` for `type:week`, the first day, `0` is Sunday and `1` Monday; empty is the one of the locale (default: `''`)
- `format {String}` `number`, `percent` (the values are in percent, `42` is `42 %`) or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` big values are shortened: `12K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, days and hours, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(cell, component)`, executed when the user clicks a cell or presses `Enter`/`Space` on it; `cell` is `{ row, column, rowlabel, columnlabel, value }`, where `row` is the index of the row in `data` (for `type:week` the day as `Date.getDay()`) and `column` the index of the column (the hour)

__Runtime__: jComponent v20, no dependencies.
