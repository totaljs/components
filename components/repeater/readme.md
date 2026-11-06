---
name: repeater
description: Renders a template for each item of an array, with index and path placeholders and an optional filter
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2015-09-25 12:34
updated: 2026-11-03 10:36
jcomponent: v19
---

# Repeater

- `$index` will be replaced for current `index` (Number)
- `$path` will be replaced for current `path` with `index`

__Configuration__:

- `hidden {Boolean}` adds `hidden` class when the data-source is `null` or `empty` (default: `true`)
- `check {Boolean}` checks changes between new and old renders (default: `true`)

### Contributors

- Martin Smola <smola.martin@gmail.com>

### License

- [License](https://www.totaljs.com/license/)
