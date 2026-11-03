---
name: objecteditor
description: TODO
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2018-06-22 21:13
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ObjectEditor

__Configuration__:

- `null {Boolean}` optional, shows `null` values (default: `true`)
- `skip {String}` optional, skips properties divided by commas
- `dateformat {String}` optional, a default date/time format (default: `yyyy-MM-dd HH:mm:ss`)
- __NEW__: `exec {String}` a path to the `function(key, value)` and it's executed if the value is changed
