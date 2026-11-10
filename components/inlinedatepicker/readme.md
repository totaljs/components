---
name: InlineDatePicker
description: Date picker rendered inline in the page with configurable first day of the week, day and month names, and optional badges per date
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2021-12-29 19:55
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# InlineDatePicker

__Configuration__:

- `required {Boolean}` required (default: `false`)
- `firstday {Number}` first day in the week (default: `DEF.firstdayofweek`)
- `today {String}` a label for `Set today` button
- `days {String}` days e.g. `SU,MO,TU,WE,TH,FR,SA` (default).
- `months {String}` months e.g. `January,February,...` (default).
- `badges {String}` a link to the `function(date, append)`
	- `append([date1, date2, date3])` (must be array of dates)
