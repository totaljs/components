---
name: iFrameViewer
description: This component show a layer (over the content) with a iframe.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-11-26 18:24
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# iFrameViewer

This component show a layer (over the content) with a iframe.

- singleton

__Options__:

- `name {String}` a label name to header
- `url {String}` URL address for iframe
- `ready {Function(iframe)}` optional, `onready` handler
- `close {Function}` optional, `onclose` handler
- `esc {Boolean}` can close the component with pressing of `ESC` key (defualt: `false`)
- `width {String}` a width of iframe (default: `100%`)
- `margin {Number}` a vertical (top/bottom) margin (default: `0`)
- __NEW__: `html {String}` a custom HTML content for the iframe
