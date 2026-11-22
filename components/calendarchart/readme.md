---
name: calendarchart
description: Calendar of a year or of the last days as a grid of weeks with one coloured cell per day, like the activity of GitHub, with a legend, a total, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:38
updated: 2026-11-22 20:38
jcomponent: v20
---

# Calendarchart

Shows a value per day over months: visits, AI agent visits, orders, deployments. Every column is a week and every cell a day, coloured from light to dark in a few steps. The steps are quantiles of the days with a value, so a few big days do not leave the rest of the year pale. It re-renders on every change of the model.

The model is an `Object` with `yyyy-MM-dd` keys, or an `Array`:

```js
{ '2026-11-21': 1180, '2026-11-22': 1320 }
// or
[{ date: '2026-11-22', value: 1320 }, { date: new Date(2026, 10, 21), value: 1180 }]
```

- The range is the last `days` days until today, or the whole `year`.
- The weeks start on the first day of the locale (or `firstday`); month and day names come from `Intl` in the language of the page.
- The cells fill the width (from 10 to 18px); narrow boxes show the last weeks that fit.
- The grid has one tab stop: left and right move a week, up and down a day, `Home`/`End` go to the first and the last day, `Enter`/`Space` run `click`, and a screen reader announces the date and the value. A hidden table has the total of every month.
- The label is the content of the tag, so it can contain markup and `@(...)` translations.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `days {Number}` the count of days until today (default: `365`)
- `year {Number}` a whole calendar year instead of the last days, example: `2026` (default: `''`)
- `cell {Number}` the size of a cell in pixels, `0` fills the width (default: `0`)
- `steps {Number}` the count of colour steps with a value, from `2` to `6` (default: `5`)
- `color {String}` a hex colour instead of the primary colour of the app, example: `#6250D6` (default: `''`)
- `legend {Boolean}` shows the legend (default: `true`)
- `less {String}` the text before the legend, example: `Less`; empty shows `0` (default: `''`)
- `more {String}` the text after the legend, example: `More`; empty shows the value of the last step (default: `''`)
- `caption {String}` a text after the total, example: `visits` (default: `''`)
- `firstday {Number}` the first day of the week, `0` is Sunday and `1` Monday; empty is the one of the locale (default: `''`)
- `format {String}` `number` or `currency` (default: `number`)
- `decimals {Number}` the maximum count of decimals (default: `0`)
- `compact {Boolean}` values from 10,000 are shortened: `159.4K` (default: `true`)
- `currency {String}` the currency code for `format:currency` (default: `EUR`)
- `locale {String}` a language for the numbers and the dates, example: `es-ES`; empty is the language of the page (default: `''`)

__Callbacks__:

- `click {String}` link to a global `function(day, component)`, executed when the user clicks a day or presses `Enter`/`Space` on it; `day` is `{ date, key, value }` where `key` is `yyyy-MM-dd`

__Runtime__: jComponent v20, no dependencies.
