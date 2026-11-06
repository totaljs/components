---
name: monacoeditor
description: Monaco code editor bound to a path, with a configurable language and theme and a fixed or parent-based height
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-07-15 12:04
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# MonacoEditor

The component renders [Monaco editor](https://microsoft.github.io/monaco-editor/).

__Configuration__:

- `theme {String}` a default theme (default: `vs-light`)
- `language {String}` language / mode (default: `javascript`)
- `height {Number}` a default/minimal height (default: `200`)
- `parent {String}` optional, a container with fixed height, can be `window` (default value: `auto`)
- `margin {Number}` optional, a top/bottom margin together (default: `0`)
