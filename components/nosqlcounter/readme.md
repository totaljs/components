---
name: nosqlcounter
description: Bar chart of monthly counts from year, month and value records, with optional month names and a maximum value limit
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-04-23 20:10
updated: 2026-11-03 10:36
jcomponent: v19
---

# NoSQLcounter

- easy usage
- datasource must be in the form: `[{ id: 201702, year: 2017, month: 2, value: 1690 }]`

__Configuration__:

- `count {Number}` a maximum bars in the chart (default: `0` === `auto-count`)
- `lastvalues {Boolean}` shows only the last values (default: `false`)
- `months {String}` months e.g. `January,February,etc.`
- __NEW__ `limit` {Number} a maximum limit for `value` (default: `0` - disabled)
