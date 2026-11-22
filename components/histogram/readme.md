---
name: histogram
description: Histogram of how values are spread, such as load times or time on page, with round bins, percentile marks, zones of good and poor, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:29
updated: 2026-11-22 20:29
jcomponent: v20
---

# Histogram

Shows how many values fall in each range: the load times of the visits, the time on page, the size of the orders... Averages hide the slow visits; a histogram shows them. It counts the bins itself from the raw values (with round edges), marks the percentiles (p50, p75, p95) and can colour the bins by zones of good, needs improvement and poor, for example with the thresholds of the Core Web Vitals. It re-renders on every change of the model.

The model is an `Array` of raw values, or bins already counted:

```js
[1830, 2140, 950, 4100, ...]
// or
{ bins: [{ from: 18, to: 25, count: 410 }, { from: 25, to: 35, count: 980 }] }
```

- The count of bins is `bins`, or automatic (Sturges' rule, between 6 and 40). The edges are round numbers.
- By default the axis ends at the 99th percentile (`clip`) and the slower values go into the last bin, so a few outliers do not squeeze the chart.
- Counted bins can have different widths; every bar is as wide as its range, so the chart stays honest. Percentile marks need the raw values.
- With `zones` the bars take the colour of their zone; the middle zone is striped, so the zones are not told by colour alone.
- The chart has one tab stop: the arrows go through the bins and a screen reader announces the range, the count and the share; a hidden table has all the bins.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of the bars area in pixels (default: `180`)
- `bins {Number}` the count of bins, `0` is automatic (default: `0`)
- `min {Number}` the start of the axis; empty is the lowest value (default: `''`)
- `max {Number}` the end of the axis; empty is the percentile of `clip` (default: `''`)
- `clip {Number}` the percentile where the axis ends when `max` is empty, `100` shows everything (default: `99`)
- `marks {String}` percentiles to mark, separated with commas; empty hides them (default: `50,75,95`)
- `zones {String}` two limits of the zones separated with a comma, example: `2500,4000` (default: `''`)
- `goodup {Boolean}` higher values are better; `false` for times and sizes (default: `true`)
- `format {String}` `number`, `ms` (milliseconds, shown in seconds from 1 s), `duration` (seconds) or `percent` (default: `number`)
- `unit {String}` a unit after numbers, example: `years` (default: `''`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
