---
name: UptimeBar
description: Availability of a service in the last 90 days as one bar per day, with the uptime, the current state, notes of incidents, a tooltip and keyboard access
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:26
updated: 2026-11-23 13:07
jcomponent: v20
---

# UptimeBar

The status line of a service: one bar per day for the last 90 days (website, API, the MCP server of the AI agents...), coloured by the uptime of the day, with the average uptime and the current state on top. Degraded days are striped and down days solid, so the state is not told by colour alone. In narrow boxes it shows the last 60 or 30 days, so a bar is never thinner than 3px.

The model is an `Array` with one item per day, the last one is today:

```js
[100, 99.98, null, 97.1, ...]
// or
[{ uptime: 98.3, note: 'Database maintenance', date: '2026-10-25' }, ...]
```

- `uptime` is in percent; `null` is a day without data (grey). Without `date`, the dates are counted back from today.
- With fewer items than `days`, the first days are days without data.
- The state of a day: from `good` up it is operational, from `warn` up degraded, below it down. The current state is the state of the last day with data.
- The bars have one tab stop: the arrows go through the days, `Home` and `End` to the first and the last one, a screen reader announces the date, the uptime, the state and the note.
- The label is the content of the tag, so it can contain markup and `@(...)` translations. The texts under the bars ("89 days ago", "Today") come from `Intl` in the language of the page.

__Configuration__:

- `label {String}` the label when the content of the tag is empty (default: `''`)
- `style {String}` `card` (a box) or `minimal` (no box) (default: `card`)
- `days {Number}` the count of days (default: `90`)
- `height {Number}` the height of the bars in pixels (default: `32`)
- `good {Number}` the uptime in percent from which a day is operational (default: `99.9`)
- `warn {Number}` the uptime in percent from which a day is degraded; below it is down (default: `99`)
- `states {String}` the names of the states from down to operational separated with `|`, example: `Down|Degraded|Operational` (default: `''`)
- `caption {String}` a text after the average uptime, example: `uptime` (default: `''`)
- `decimals {Number}` the maximum count of decimals of the uptime (default: `2`)
- `locale {String}` a language for the numbers and dates, example: `es-ES`; empty is the language of the page (default: `''`)

__Runtime__: jComponent v20, no dependencies.
