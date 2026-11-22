---
name: daterange
description: Period selector for dashboards with presets in the language of the page, a calendar for custom ranges, the comparison with the previous period and an inline mode
author: Gera G. Güiles
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2026-11-22 20:12
updated: 2026-11-22 20:44
jcomponent: v20
---

# Daterange

Chooses the period of a dashboard: a preset (today, 7 days, this month...) or any range in the calendar, and optionally the comparison with the previous period. It is a button with a dropdown, or with `inline:true` a calendar that is always visible (a sidebar of filters).

The model is an `Object`:

```js
{
	from: Date,          // the first day (00:00 local time)
	to: Date,            // the last day, included (00:00 local time)
	preset: 'last30',    // the preset, or '' for a custom range
	compare: true,       // the comparison is on
	previous: { from: Date, to: Date } // the period before with the same length; null without the comparison
}
```

- To set the period from the code, `{ preset: 'last7' }` is enough, or `{ from, to }` with `Date` objects or `yyyy-MM-dd` strings. The component always writes the full object.
- An empty model takes the `preset` of the configuration once, so the dashboard has a period from the start.
- The previous period has the same length just before; `month`, `lastmonth`, `year` and `lastyear` keep the calendar shape (this month until today is compared with the same days of the month before).
- Presets: `today`, `yesterday`, `lastN` (any count of days: `last7`, `last30`, `last90`...), `month`, `lastmonth`, `year`, `lastyear`. Their names come from `Intl` in the language of the page ("Today", "Hoy", "Heute", "30 days"...), so they need no translation; `labels` replaces them.
- The week starts on the first day of the locale (`Intl.Locale` week info), or on `firstday`.
- Keyboard: the button opens the panel on the selected preset; in the calendar the arrows move by day and week, `PageUp`/`PageDown` by month, `Home`/`End` to the start and end of the week, `Enter` chooses the first and then the last day; `Escape` cancels the range in progress or closes the panel. Clicking outside closes it too.

__Configuration__:

- `label {String}` the accessible name of the selector, example: `Period` (default: `''`)
- `presets {String}` the presets in the list, separated with commas; empty shows only the calendar (default: `today,yesterday,last7,last30,last90,month,lastmonth,year`)
- `preset {String}` the preset of an empty model; empty leaves the model empty (default: `last30`)
- `labels {String}` names of the presets separated with `|`, in the order of `presets`; empty uses the names of `Intl` (default: `''`)
- `compare {String}` the text of the option to compare with the previous period, example: `Compare with the previous period`; empty hides it (default: `''`)
- `inline {Boolean}` the panel is always visible, without the button (default: `false`)
- `future {Boolean}` allows days after today (default: `false`)
- `firstday {Number}` the first day of the week, `0` is Sunday and `1` Monday; empty is the one of the locale (default: `''`)
- `locale {String}` a language for the names and dates, example: `es-ES`; empty is the language of the page (default: `''`)
- `disabled {Boolean}` disables the selector (default: `false`)

__Callbacks__:

- `change {String}` link to a global `function(value, component)`, executed after a change by the user (a preset, a custom range or the comparison); `value` is the model

__Runtime__: jComponent v20, no dependencies.
