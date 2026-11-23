---
name: RankChart
description: Ranking with horizontal bars for top lists such as pages, referrers or AI agents, with shares, changes, links, a show more button and smooth real time updates
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 19:53
updated: 2026-11-23 13:07
jcomponent: v20
---

# RankChart

A ranked list where every row has a bar proportional to its value: top pages, referrers, countries, AI agents, slowest pages... Every number is text (value, share and change), the bar only helps to compare. The rows keep their DOM node between updates, so in real time the bars grow and shrink and the rows move instead of jumping.

The model is an `Array` of rows, or an `Object` with the rows in `items`:

```js
[
	{ name: '/blog/agentic-web', value: 2210, previous: 980, sub: 'The agentic web' },
	{ name: 'google.com', value: 18200, url: 'https://www.google.com' },
	{ name: 'ChatGPT', value: 2100, icon: 'ti ti-robot' }
]
```

- `name {String}` the text of the row
- `value {Number}` the value; the bars are relative to the biggest value
- `previous {Number}` optional, the value of the previous period: shows the change in percent with an arrow
- `sub {String}` optional, a second line under the name
- `icon {String}` optional, a Total.js icon before the name
- `image {String}` optional, a URL of a 16x16 image before the name (a favicon, a flag)
- `url {String}` optional, the name becomes a link that opens in a new tab (only `http(s)://` and relative URLs; ignored with `click`)
- `id {String|Number}` optional, keeps the row identity when two rows have the same name

Rows with a negative or empty value are skipped. The label of the list is the content of the tag, so it can contain markup and `@(...)` translations: `<ui-component name="rankchart" path="rank.pages">@(Top pages)</ui-component>`. Numbers are formatted with `Intl.NumberFormat` in the language of the page (`<html lang>`) or the `locale` option.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `bars {String}` `fill` (the bar is the background of the row) or `line` (a thin bar under the name) (default: `fill`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `color {String}` a hex colour of the bars instead of the primary colour of the app, example: `#6250D6` (default: `''`)
- `limit {Number}` the count of visible rows, `0` shows all of them (default: `10`)
- `more {String}` the text of the button that shows all the rows, example: `Show all`; empty hides the button (default: `''`)
- `less {String}` the text of the button that shows only `limit` rows again; empty hides it (default: `''`)
- `columns {String}` the headers of the name and value columns separated with `|`, example: `Page|Visitors` (default: `''`)
- `sort {Boolean}` sorts the rows from the biggest value (default: `true`)
- `share {Boolean}` shows the share of every row in the total (default: `true`)
- `goodup {Boolean}` a growing value is good (green arrow); set `false` for metrics where less is better (default: `true`)
- `format {String}` `number`, `percent`, `currency` or `duration` (the values are in seconds) (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.9K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(item, component)`, executed when the user clicks a row (the rows are buttons then, so `Enter` and `Space` work); `item` is the row of the model

__Runtime__: jComponent v20, no dependencies.
