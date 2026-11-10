---
name: KeySelection
description: This component allows user to select some items by up/down keys and confirm selection by the enter key.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-01-31 20:16
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# KeySelection

This component allows user to select some items by up/down keys and confirm selection by the `enter` key.

- supports auto-scroll

__Configuration__:
- `selectoritem {String}` a selector for browsing items (default: `.item`)
- `selector {String}` a default selector for capturing keys (default: `input`)
- `class {String}` a selection class (default: `selected`)
- `autoselect {Boolean}` it should select first item (default: `true`)
- `autoscroll {Boolean}` enables/disables auto-scroll (default: `true`)
- `exec {String}` a link to the `function(jqueryel)`, evaluated by the `enter` key (optional, otherwise will be trigger `click` event)
- `delay {Number}` a delay for auto-selecting first value
- `datasource {String}` a link to the data-source that can help you with a dynamic list
