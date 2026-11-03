---
name: loading
description: TODO
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-02-19 14:24
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# Loading

- it automatically assigns flags `@showloading` and `@hideloading`

__Configuration__:

- __NEW__: `style {Number}` a loading style (default: `1`)
	- `1`: basic with animated spin
	- `2`: a blue line at the top of window

__Usage__:

- `SETTER('loading/show', [text])` - shows loading (`text` optional)
- `SETTER('loading/hide', [sleep])` - hides loading (`sleep` optional and in milliseconds)
