---
name: LiveStats
description: Live SVG line chart with one colored line per key, updated from incoming values, with dark mode support
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-03-16 11:42
updated: 2023-01-31 15:00
jcomponent: v19,v20
---

# LiveStats

- supports __dark mode__
- responsive

__Configuration__:

- `width {Number/String}` width of svg, you don't need to change it (default: `500`) or `{String}` jQuery selector for obtaining of height
- `height {Number/String}` height of svg, you don't need to change it (default: `100`) or `{String}` jQuery selector for obtaining of height
- `colors {String}` defines custom colors for each key in the form `KEY=COLOR,KEY=COLOR,KEY=COLOR`
- `max {Number}` a max. limit (default `0` - disabled)
- `axislines {Number/String}` a count of X axis lines (default: `20`) or `auto` automatically counts count of lines
- `marginW {Number}` a margin for `width`
- `marginH {Number}` a margin for `height`
