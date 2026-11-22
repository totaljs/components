---
name: scoregauge
description: Gauge for a score or a value with thresholds, such as an SEO score, agent readiness, CPU or response time, with the state shown as an icon and a text
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:21
updated: 2026-11-22 20:21
jcomponent: v20
---

# Scoregauge

A dial for one value inside a range: a score from 0 to 100 (SEO, performance, agent readiness), the load of a server, a response time... The arc takes the colour of the state (bad, needs work, good) according to two thresholds, and the state is also an icon and a text, so it is never told by colour alone. It re-renders on every change of the model, with a short animation.

The model is a `Number`, or an `Object` with `value`. An empty model shows `—` and no state.

- `bands:50,90` means: below 50 is bad, from 50 to 90 needs work, from 90 good. With `goodup:false` the order is reversed (for CPU, response times, errors): up to 50 is good, up to 90 needs work, above it is bad.
- `states` names the three states, from bad to good, separated with `|`: `Poor|Needs work|Good`. Without it, only the icon is shown.
- For screen readers it is a `meter` with the value, the unit and the state.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `size {Number}` the diameter of the dial in pixels (default: `150`)
- `thickness {Number}` the width of the arc in pixels (default: `12`)
- `min {Number}` the minimum of the range (default: `0`)
- `max {Number}` the maximum of the range (default: `100`)
- `bands {String}` the two thresholds separated with a comma; empty draws the arc in the primary colour without a state (default: `50,90`)
- `goodup {Boolean}` a higher value is better (default: `true`)
- `states {String}` the names of the states from bad to good separated with `|`, example: `Poor|Needs work|Good` (default: `''`)
- `unit {String}` a text under the value, example: `ms` or `of 100` (default: `''`)
- `scale {Boolean}` shows the minimum and the maximum under the dial (default: `false`)
- `format {String}` `number` or `percent` (the value is in percent) (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
