---
name: AutoExec
description: This component automatically executes a method defined in exec option.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-01-24 16:03
updated: 2023-06-13 17:56
jcomponent: v19,v20
---

# AutoExec

This component automatically executes a method defined in `exec` option.

__Configuration__:

- __IMPORTANT__ `exec {String}` a path to the method `function(el, value)`
- `delay {Number}` a delay for evaluating code (default: `0`)
- `init {Boolean}` executes initial value (default: `false`)
- `input {Boolean}` executes value binded by the input (default: `true`)
- `manually {Boolean}` executes value binded manually via e.g. `SET()` method (default: `false`)
- `track {String}` can contain partial paths divided by the comma
