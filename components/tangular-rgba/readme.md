---
name: TangularRGBA
description: A simple Tangular template engine helper for transforming hex colors to RGBA colors.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-01-11 14:48
updated: 2026-11-03 11:05
jcomponent: v19,v20
---

# Tangular-RGBA

A simple Tangular template engine __helper__ for transforming `hex` colors to `RGBA colors`.

__Usage__:

```html
<div style="background:{{ name | color | rgba(0.5) }}">{{ name }}</div>
<div style="background:{{ username | color | rgba(0.5) }}">{{ username }}</div>
```
