---
name: DragDropFiles
description: Drop zone that runs a method with the dropped files, toggles a class on drag over and opens a file dialog on click
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2017-07-04 21:18
updated: 2023-01-25 12:04
jcomponent: v19,v20
---

# DragDropFiles

__Configuration__:

- `exec {String}` - the component executes this method if the files are dropped
- `class {String}` - toggles class if the drag over is emitted
- `click {Boolean}` - causes open file dialog when the user click on the element (default: `true`)
- `accept {String}` - change accept attribute, e.g to only accept pdfs set to `application/pdf` (default: `*/*`)
