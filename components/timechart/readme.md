---
name: TimeChart
description: Chart of values over time with lines, areas or bars (grouped or stacked), several series, a tooltip, a legend and keyboard access, updated in real time
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 19:46
updated: 2026-11-23 13:07
jcomponent: v20
---

# TimeChart

A chart for data that changes over time: visits per day, visitors per second, page views per month... One component draws lines, areas or bars, so a dashboard keeps the same look in every chart. It re-renders on every change of the model, so for a live chart you `SET()` the new data (for example the last 60 seconds) as often as you need.

The model is an `Object`:

```js
{
	labels: [Date, Date, ...],          // {Date[]|String[]} optional, one per point: dates (Date or ISO strings) or texts
	series: [
		{ name: 'Visitors', data: [1200, 1350, ...] },
		{ name: 'Page views', data: [3100, 2980, ...], color: '#EB6834' } // color is optional
	]
}
```

- A plain array of numbers is also accepted as a single series.
- `null` in `data` is a gap: the line breaks there.
- Up to 8 series. The first one takes the primary colour of the app, the others a colour-blind safe palette in a fixed order (a series keeps its colour when another one is hidden). The palette has its own steps for dark mode.
- Dates are formatted with `Intl.DateTimeFormat` in the language of the page (`<html lang>`) or the `locale` option. The `auto` mode picks seconds, hours, days or months according to the time span of the labels.
- The label of the chart is the content of the tag, so it can contain markup and `@(...)` translations: `<ui-component name="timechart" path="charts.month">@(Visits)</ui-component>`.
- With 2 or more series there is a legend; each item is a button that hides or shows its series.
- The chart is focusable: the arrow keys, `Home` and `End` move through the points and show the tooltip, a screen reader announces the values, and `Escape` hides it. A hidden table with all the values is there for screen readers.
- It redraws itself when its container changes size.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `type {String}` `line`, `area` or `bar` (default: `line`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` height of the chart in pixels (default: `260`)
- `stacked {Boolean}` stacks the series of `area` and `bar` charts (default: `false`)
- `curve {Boolean}` smooth lines; the curve never goes beyond the data (default: `true`)
- `markers {Boolean}` a dot on every point of a line (default: `false`)
- `grid {Boolean}` horizontal grid lines (default: `true`)
- `legend {Boolean}` shows the legend when there are 2 or more series (default: `true`)
- `min {Number}` the minimum of the y axis; empty is `0` or the lowest value when it is negative (default: `''`)
- `max {Number}` the maximum of the y axis; empty is automatic (default: `''`)
- `format {String}` `number`, `percent` (the values are in percent, `38.4` is `38.4 %`), `currency` or `duration` (the values are in seconds) (default: `number`)
- `decimals {Number}` the maximum count of decimals in the tooltip (default: `0`)
- `compact {Boolean}` the axis shortens big numbers (`12K`) and the tooltip shortens values from 10,000 (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for numbers and dates, example: `es-ES`; empty is the language of the page (default: `''`)
- `dates {String}` the format of date labels: `auto`, `seconds`, `time`, `datetime`, `date` or `month` (default: `auto`)

__Callbacks__:

- `click {String}` link to a global `function(point, component)`, executed when the user clicks a point or presses `Enter`/`Space` on it; `point` is `{ index, label, values }` where `values` is an object `{ seriesname: value }`

__Runtime__: jComponent v20, no dependencies.
