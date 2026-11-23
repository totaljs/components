---
name: ScatterChart
description: Scatter and bubble chart to relate two measures (and a third as the size), with series in colours and shapes, trend lines, average lines, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:31
updated: 2026-11-23 13:07
jcomponent: v20
---

# ScatterChart

Shows if two measures move together: load time and bounce rate per page, visits and conversion per source, time on page and pages per visit per device. Every point is one item; with `bubbles:true` a third measure is the size of the point. Trend lines (least squares) and average lines (four quadrants) help to read it. It re-renders on every change of the model.

The model is an `Array` of points, or an `Object` with series:

```js
[{ x: 1830, y: 38.4, name: '/pricing' }]
// or
{ series: [{ name: 'AI agents', color: '#6250D6', points: [{ x: 4300, y: 4.8, size: 3900, name: 'ChatGPT' }] }] }
```

- Up to 8 series. Every series has a colour of a colour-blind safe palette (the first one is the primary colour of the app) and its own shape (circle, square, triangle, diamond...), so series are not told by colour alone. The palette has its own steps for dark mode.
- The bubbles have an area proportional to `size`; the big ones are drawn first so the small ones stay visible.
- Hovering finds the nearest point within 24px. The chart has one tab stop: the arrows go through the points from left to right, a screen reader announces the name and the values, `Enter`/`Space` run `click`. A hidden table has all the points.
- The label is the content of the tag, so it can contain markup and `@(...)` translations; the axis titles are texts of the configuration.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of the chart in pixels (default: `280`)
- `xlabel {String}` the title of the x axis (default: `''`)
- `ylabel {String}` the title of the y axis (default: `''`)
- `zlabel {String}` the name of the size of the bubbles (default: `''`)
- `xformat {String}` `number`, `percent` (values in percent), `currency`, `ms` (milliseconds) or `duration` (seconds) (default: `number`)
- `yformat {String}` the same for the y axis (default: `number`)
- `bubbles {Boolean}` the size of the points follows `size` (default: `false`)
- `trend {Boolean}` a trend line per series (default: `false`)
- `average {Boolean}` dashed lines at the average of x and y (default: `false`)
- `zero {Boolean}` both axes include zero (default: `false`)
- `legend {Boolean}` shows the legend when there are 2 or more series (default: `true`)
- `currency {String}` the currency code for `currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(point, component)`, executed when the user clicks a point or presses `Enter`/`Space` on it; `point` is the point of the model

__Runtime__: jComponent v20, no dependencies.
