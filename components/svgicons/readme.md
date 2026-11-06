---
name: svgicons
description: Registers the ui-svgicon element that displays icons from an SVG sprite file, with name, size and selected state
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2023-03-31 12:51
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# SVGIcons

This component registers a new Web component in the form `<ui-svgicon name="icon_name"></ui-svgicon>`.

- Use SVG sprites generator <https://svgsprit.es/>

__Configuration__:

- `url {String}` a URL address to the SVG file (default: `empty`)
- `size {Number}` a default image width (default: `empty`)

__Attributes `<ui-svgicon>`:__

- `name {String}` optional, icon name
- `size {Number}` optional, a size of image (default: `config.size`)
- `selected {String}` optional, selected icon name (it will be displayed if the parent element will contain `.selected` class)
