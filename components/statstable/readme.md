---
name: statstable
description: Table of statistics with sorting, search, inline bars, changes with arrows, sparklines, totals, links and a show more button, for any dashboard
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:18
updated: 2026-11-22 20:18
jcomponent: v20
---

# Statstable

The table of a dashboard: pages, campaigns, products, countries... with the numbers formatted, bars to compare a column, changes with arrows, a sparkline per row, sorting by any column, a search, totals and a show more button. It re-renders on every change of the model and keeps the sorting, the search and the expanded state.

The model is an `Object` with the columns and the rows:

```js
{
	columns: [
		{ id: 'page', name: 'Page', type: 'text', url: 'url' },
		{ id: 'views', name: 'Views', type: 'number', bar: true },
		{ id: 'change', name: 'Change', type: 'delta' },
		{ id: 'bounce', name: 'Bounce', type: 'percent', decimals: 1 },
		{ id: 'trend', name: 'Trend', type: 'sparkline' }
	],
	rows: [
		{ page: '/pricing', url: 'https://example.com/pricing', views: 2980, change: 2.8, bounce: 44.2, trend: [210, 230, 220] }
	]
}
```

A column has:

- `id {String}` the property of the row
- `name {String}` the header
- `type {String}` `text`, `number`, `percent` (the value is in percent), `currency`, `duration` (the value is in seconds), `delta` (a change in percent with an arrow and a sign) or `sparkline` (an array of numbers)
- `bar {Boolean}` a bar behind the value, relative to the biggest value of the column (number types)
- `goodup {Boolean}` for `delta`: a growing value is good (green arrow); `false` for metrics where less is better (default `true`)
- `decimals {Number}` the maximum count of decimals
- `url {String}` for `text`: the property of the row with a link; the text opens it in a new tab (only `http(s)://` and relative URLs, and not with `click`)
- `align {String}` `left` or `right`; numbers are on the right by default
- `sortable {Boolean}` `false` disables the sorting of the column; sparklines are not sortable
- `hidden {Boolean}` hides the column

Notes:

- Clicking a header sorts by it (numbers from the biggest, texts from A) and clicking again reverses it; `aria-sort` tells screen readers. Texts are sorted with `Intl.Collator` in the language of the page, so `é` and numbers inside texts are in the right order. Empty values always go last.
- The search filters the rows by the text columns. The totals are the sum of the `number` and `currency` columns of the filtered rows.
- With `click` every row is focusable: `Enter`/`Space` runs it and the arrows move between rows.
- The label of the table is the content of the tag, so it can contain markup and `@(...)` translations; it is the caption of the table for screen readers too.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `search {String}` the placeholder of the search, example: `Search pages`; empty hides the search (default: `''`)
- `limit {Number}` the count of visible rows, `0` shows all of them (default: `0`)
- `more {String}` the text of the button that shows all the rows, example: `Show all`; empty hides it (default: `''`)
- `less {String}` the text of the button that shows only `limit` rows again; empty hides it (default: `''`)
- `sort {String}` the initial sorting, the id of a column and `asc` or `desc`, example: `views desc` (default: `''`)
- `totals {Boolean}` a row with the totals (default: `false`)
- `compact {Boolean}` values from 10,000 are shortened: `12.8K` (default: `true`)
- `currency {String}` the currency code of `currency` columns (default: `EUR`)
- `locale {String}` a language for the numbers and the sorting, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(row, component)`, executed when the user clicks a row or presses `Enter`/`Space` on it; `row` is the row of the model

__Runtime__: jComponent v20, no dependencies.
