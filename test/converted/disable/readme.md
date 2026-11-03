---
name: disable
description: The component disables nested controls like input, select and textarea.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-02-16 06:35
updated: 2026-11-03 09:56
jcomponent: v19
---

# Disable

The component disables nested controls like `input`, `select` and `textarea`.

__Configuration__:
- `if` can contain a condition for validating
- `selector` can contain custom element selector, default: `input,texarea,select`
- `validate` can contain only paths separated with comma, e.g. `form.email,form.name`, the component performs `RESET(path)`
