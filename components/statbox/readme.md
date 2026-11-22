---
name: statbox
description: Statistic box for dashboards with the value, the change against a previous period, a sparkline, a goal meter and five styles, updated in real time
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 19:40
updated: 2026-11-22 20:44
jcomponent: v20
---

# Statbox

A box that shows one metric of a dashboard: visitors, page views, bounce rate, average time, sales... It reads the value from the model and re-renders on every change, so it works in real time (`SET()` the new value and the number counts to it). One component per box: put several of them in a grid.

The model is a `Number` (only the value) or an `Object`:

```js
{
	value: 1284,            // {Number} the metric
	previous: 1143,         // {Number} optional, the value of the previous period: the change is computed from it
	delta: 12.3,            // {Number} optional, the change in percent; it wins over "previous"
	trend: [820, 932, ...], // {Number[]} optional, values for the sparkline (2 or more, the last one is the current one)
	target: 10000           // {Number} optional, a goal: shows a meter with value / target
}
```

- `null`, `undefined` or a missing `value` shows the `empty` text.
- The change is shown with an arrow and a sign (`+12.3 %`), not only with a colour. The colour says if the change is good or bad according to `goodup`.
- The label is the content of the tag, so it can contain markup and `@(...)` translations: `<ui-component name="statbox" path="stats.visitors">@(Visitors)</ui-component>`.
- The numbers are formatted with `Intl.NumberFormat` in the language of the page (`<html lang>`) or the `locale` option.
- The count animation, the meter transition and the live pulse are disabled when the user prefers reduced motion.
- With `click` the box is a button: it is focusable and works with `Enter` and `Space`.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `icon {String}` Total.js icon of the label, example: `ti ti-users` (default: `''`)
- `style {String}` `card`, `accent` (a coloured bar on the left), `soft` (tinted background), `solid` (coloured background) or `minimal` (no box) (default: `card`)
- `size {String}` `small`, `normal` or `large` (a hero number of 48px) (default: `normal`)
- `color {String}` a hex colour of the box instead of the primary colour of the app, example: `#6250D6` (default: `''`)
- `format {String}` `number`, `percent` (the value is in percent, `38.4` is `38.4 %`), `currency` or `duration` (the value is in seconds, `185` is `3 m 05 s`) (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `12.9K`, `1.5M` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)
- `unit {String}` a unit after the value, example: `ms` (default: `''`)
- `period {String}` a text next to the change, example: `vs yesterday` (default: `''`)
- `live {String}` a text with a pulsing dot that marks the box as live, example: `Live`; empty hides it (default: `''`)
- `goodup {Boolean}` a growing value is good (green); set `false` for metrics where less is better, such as the bounce rate or the load time (default: `true`)
- `animate {Boolean}` the number counts from the previous value to the new one (default: `true`)
- `empty {String}` the text without a value (default: `—`)

__Callbacks__:

- `click {String}` link to a global `function(value, component)`, executed when the user clicks the box or presses `Enter`/`Space` on it; `value` is the model

__Runtime__: jComponent v20, no dependencies.
