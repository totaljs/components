---
name: dropfiles
description: Singleton that captures files dropped anywhere on the window and passes them to a handler, with an optional check before accepting the drop
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2022-06-11 13:19
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# DropFiles

- singleton
- captures all dropped files into the `window`
- must be located under `<body>` element due to positioning

__Configuration__:

- `exec {String}` a link to the `function(files, e)`
- __NEW__: `check {String}` optional, a link to the `function(e)` that must return `true` (allows drag&drop) or `false` (disallow)
