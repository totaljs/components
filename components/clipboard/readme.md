---
name: clipboard
description: Singleton that copies text to the clipboard using the Clipboard API, with a document.execCommand fallback
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-01-08 12:36
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Clipboard

- It works as singleton
- Uses `navigator.clipboard.writeText()` or `document.execCommand('copy')` as fallback

__Methods__:

- `SETTER('clipboard/copy', 'TEXT TO CLIPBOARD')` or `FIND('clipboard').copy('TEXT TO CLIPBOARD')`

__Configuration__:

- `oncopy {String}` a link to the `function(value)`
- `native {Boolean}` enables native clipboard (default: `false`)
