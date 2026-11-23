---
name: BulletChart
description: Bullet chart for a value against a target with bands of bad, fair and good and the previous value, as one bar or a list of goals, updated in real time
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:23
updated: 2026-11-23 13:07
jcomponent: v20
---

# BulletChart

Shows how far a value is from its goal: a bar for the value, a tick for the target, grey bands behind for bad, fair and good, and a thin mark for the previous value. It takes less space than a gauge and reads better in lists (goals of the month, budgets, page speed by page). The bars move when the model changes, so it works in real time.

The model is a `Number`, an `Object` or an `Array` of objects (one row each):

```js
{ name: 'Visitors', value: 38420, target: 45000, previous: 34100, max: 50000, bands: [30000, 40000], decimals: 0 }
```

- `target`, `previous`, `max`, `bands` and `decimals` are optional; without `max` the axis ends at a round number over the biggest value.
- `bands` are two limits: with `goodup:true` below the first is bad (the darkest band) and over the second is good (the lightest); with `goodup:false` it is the other way round (load times, costs).
- A value that reaches its target gets a check mark next to it.
- Every row is a `meter` for screen readers, named by its name, with "value / target" as its text.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `height {Number}` the height of a bar in pixels (default: `18`)
- `max {Number}` the end of the axis for rows without `max`; empty is automatic (default: `''`)
- `bands {String}` the two limits of the bands for rows without `bands`, separated with a comma, example: `6000,9000` (default: `''`)
- `goodup {Boolean}` a higher value is better (default: `true`)
- `target {Number}` the target of rows without `target` (default: `''`)
- `axis {Boolean}` shows the start, the middle and the end of the axis (default: `true`)
- `format {String}` `number`, `percent` (the values are in percent) or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals; a row can have its own (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `38.4K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
