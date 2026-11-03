---
name: iframeeditable
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-01-22 11:57
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# iFrameEditable

- can edit HTML safely
- height of iframe is automatically counted from the `body`
- __important__: content must contain `contenteditable` attribute

__Configuration__:

- `bind {String}` can contain `body` (default), `html` or `contenteditable`

__Methods__:

- `component.resize()`
