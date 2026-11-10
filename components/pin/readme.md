---
name: Pin
description: A simple PIN maker.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-07-19 00:00
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Pin

# j-Pin

A simple PIN maker.

__Configuration__:

- `count {Number}` a count of PIN inputs (default: `6`)
- `required {Boolean}` enables "required" (default: `false`)
- `disabled {Boolean}` can disabled this control
- `hide {Boolean}` disables displaying of numbers (default: `false`)
- `mask {Boolean}` disables the mask (default: `true`)
- __NEW__ `exec {String}` a path to `function(pin)`
- __NEW__ `allowpaste {Boolean}` enables pin pasting (default: `true`)

__Good to know__:

- input with no value creates a space
- it expects `String`

__Methods__:

- `component.focus()` focuses the first input
