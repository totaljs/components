---
name: sharechart
description: Parts of a whole as a donut or a segmented bar, with a legend of values and shares, the small parts folded into one and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 19:50
updated: 2026-11-22 19:50
jcomponent: v20
---

# Sharechart

Shows how a whole is split into parts: devices, browsers, traffic sources, AI agents, sales by country... One component draws a donut (`type:donut`) or a segmented bar (`type:bar`), and both have a legend with the value and the share of every part, so every number can be read as text without hovering.

The model is an `Array` of parts, or an `Object` with the parts in `items`:

```js
[
	{ name: 'Desktop', value: 18240 },
	{ name: 'Mobile', value: 24310 },
	{ name: 'Tablet', value: 2120, color: '#6250D6' } // color is optional
]
```

- Only positive values are drawn; the total is the sum of the parts.
- The parts are sorted from the biggest one (`sort`), and from `limit` parts on the smallest ones are folded into one grey part (`other`).
- The colour follows the part, not its position: the first part of the model takes the primary colour of the app, the others a colour-blind safe palette in a fixed order. The palette has its own steps for dark mode.
- Donut: the centre shows the total and the `caption`; hovering or focusing a part shows its share and its name.
- Segmented bar: every part prints its share inside when it fits, in white or near-black according to its colour.
- Hovering or focusing a part (in the chart or in the legend) highlights it in both places.
- The label of the chart is the content of the tag, so it can contain markup and `@(...)` translations: `<ui-component name="sharechart" path="share.devices">@(Devices)</ui-component>`.
- Numbers and shares are formatted with `Intl.NumberFormat` in the language of the page (`<html lang>`) or the `locale` option.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `type {String}` `donut` or `bar` (a segmented bar) (default: `donut`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `size {Number}` the diameter of the donut in pixels (default: `180`)
- `thickness {Number}` the width of the ring of the donut in pixels (default: `26`)
- `caption {String}` a text under the total in the centre of the donut, example: `visits` (default: `''`)
- `limit {Number}` the maximum count of parts; the rest is folded into one part, `0` disables it (default: `6`)
- `other {String}` the name of the folded part; empty shows the count of folded parts, example: `+3` (default: `''`)
- `sort {Boolean}` sorts the parts from the biggest one (default: `true`)
- `format {String}` `number`, `currency` or `duration` (the values are in seconds) (default: `number`)
- `decimals {Number}` the maximum count of decimals of the values (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.9K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(part, component)`, executed when the user clicks a part or its legend row (the rows are buttons then, so `Enter` and `Space` work); `part` is `{ index, name, value, share, other, item }` where `share` is in percent and `item` is the part of the model (an array of them for the folded part)

__Runtime__: jComponent v20, no dependencies.
