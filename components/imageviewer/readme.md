---
name: ImageViewer
description: Singleton image viewer with previous and next navigation over a group of images, keyboard support and a default title for unnamed ones
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-07-22 15:58
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ImageViewer

- singleton
- place the component under `<body` element

__Configuration__:

- `container {String}` a container for group of images (default: `.img-container`)
- `selector {String}` a image selector, (default: `.img-viewer`)
- `loading {Boolean}` enables loading between slides (default: `true`)
- `unknown {String}` a title for unnamed images (default: `Unknown image`)

__Good to know__:

- image is loaded from the `data-src=""` or from the `src=""` attributes
- names are obtained from the `title=""` or from the `alt=""` attributes
