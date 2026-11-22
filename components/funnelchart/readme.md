---
name: funnelchart
description: Conversion funnel with the value and the share of every step, the share that goes on and the share that is lost between steps, and the overall conversion
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:33
updated: 2026-11-22 20:44
jcomponent: v20
---

# Funnelchart

Shows where people leave a process: visits → product page → cart → purchase, a sign-up, the checkout of an AI agent. Every step has its value, a bar and its share of the first step; between two steps an arrow shows the share that goes on and, in brackets, the share that is lost. The overall conversion (last step / first step) is on top. The bars move when the model changes, so it works in real time.

The model is an `Array` of steps in the order of the funnel (or an `Object` with `steps`):

```js
[{ name: 'Visits', value: 48210 }, { name: 'Cart', value: 3210 }, { name: 'Purchase', value: 1180 }]
```

- The bars are relative to the biggest step, centred (a funnel) or from the left (`align:left`).
- For screen readers every step is read as "name: value, share of the first step, share of the previous step".
- With `click` the steps are buttons, so `Enter` and `Space` work.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `align {String}` `center` or `left` (default: `center`)
- `height {Number}` the height of the bars in pixels (default: `26`)
- `color {String}` a hex colour instead of the primary colour of the app, example: `#1BAF7A` (default: `''`)
- `drop {Boolean}` shows the share that goes on and the share that is lost between the steps (default: `true`)
- `caption {String}` a text after the overall conversion, example: `converted` (default: `''`)
- `format {String}` `number` or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `48.2K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(step, component)`, executed when the user clicks a step; `step` is `{ index, name, value, item }`

__Runtime__: jComponent v20, no dependencies.
