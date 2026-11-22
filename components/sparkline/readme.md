---
name: sparkline
description: Small inline chart as a line, an area or bars for tables, lists and texts, with the last value marked, the lowest and highest points and a tooltip
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:16
updated: 2026-11-22 20:16
jcomponent: v20
---

# Sparkline

A word-sized chart: the trend of a value inside a table cell, a list or a sentence. It has no axes and no legend; the shape is the message. It re-renders on every change of the model, so it works in real time.

The model is an `Array` of numbers, or an `Object` with labels for the tooltip:

```js
[40, 52, 61, 90, 120]
// or
{ data: [40, 52, 61], labels: ['Nov 20', 'Nov 21', 'Nov 22'] }
```

- `null` in the data is a gap: the line breaks there.
- The line takes the range of the data, so small changes are visible; with `zero:true` (and always for bars) the scale includes zero. Negative bars are red.
- The last point has a dot; with `minmax:true` the lowest and highest points have one too.
- For screen readers it is an image named by the label and a summary: first value → last value (lowest – highest).
- `width:0` fills the width of the parent, for example a card.
- The label is the content of the tag, so it can contain `@(...)` translations: `<ui-component name="sparkline" path="row.trend">@(Views)</ui-component>`. It is not shown, it names the chart for screen readers.

__Configuration__:

- `label {String}` the accessible name when the content of the tag is empty (default: `''`)
- `type {String}` `line`, `area` or `bar` (default: `line`)
- `width {Number}` width in pixels, `0` fills the parent (default: `100`)
- `height {Number}` height in pixels (default: `28`)
- `color {String}` a hex colour instead of the primary colour of the app, example: `#EB6834` (default: `''`)
- `zero {Boolean}` the scale includes zero (default: `false`)
- `dot {Boolean}` a dot on the last value (default: `true`)
- `minmax {Boolean}` dots on the lowest and highest values (default: `false`)
- `tooltip {Boolean}` hovering shows the value (and its label) of the nearest point (default: `true`)
- `format {String}` `number`, `percent` (the values are in percent) or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.9K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
