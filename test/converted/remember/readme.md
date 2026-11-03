---
name: remember
description: The component calls a function within the repeat interval.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2026-01-02 12:56
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Remember

The component calls a function within the repeat interval. Information about the previous call is stored in `localStorage`.

- easy usage

__Configuration__:

- `id {String}` a remember identifier
- `repeat {String}` a repeat time e.g. `session` or `5 minutes` or `1 day`
- `exec {String}` a link to the function that will be called
- `delay {Number}` a caller delay in ms (default: `3000`)

__Methods__:

- `SETTER('remember/clear', 'id')`
