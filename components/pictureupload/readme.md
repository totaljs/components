---
name: PictureUpload
description: Picture drop zone that uploads a raw image file at a fixed width and height, with an optional icon, URL and background color
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-09-02 01:55
updated: 2026-11-03 10:36
jcomponent: v19
---

# PictureUpload

- easy usage
- works with Bootstrap Grid System
- drag and drop support
- uploads a raw file (without resizing)

__Configuration__:

- `width {Number}` a picture width (required)
- `height {Number}` a picture height (required)
- `icon {String}` (optional) the label icon without `ti`, (default: `null`)
- `url {String}`" (optional) upload URL (default: current URL)
- `background {String}` (optional) a background color (default: white)
- `src {String}` an image path (default: `null`), e.g. `/img/{0}.jpg`
- `extension {Boolean}` response without file extension (default: `false`)
- `singlefile {Boolean}` response will be string instead of array (default: `true`)
- __new__ `type` {String} preview: output type (default: `png`)
- __new__ `quality` {Number} preview: output quality
