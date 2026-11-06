---
name: title
description: Sets the browser document title from a bound value, combined with a site name and a separator
author: Pavol Danko
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-12-14 11:27
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Title

- easy usage
- singleton

__Configuration__:

- `separator {String}` a character for separation (default: `-`)
- `name {String}` a name of the website (default: `document.title`)
- `empty {String}` a string, which is filled, if there is no value in the path
- `plus {Boolean}` adds a default title as a plus phrase (default: `true`)

__Methods__:

- `component.rename(value)`
