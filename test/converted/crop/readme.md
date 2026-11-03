---
name: crop
description: Image cropper with zoom and drag and drop for local files or URLs that outputs an image of a fixed width and height
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2015-08-18 12:13
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Crop

__Supports__:

- zoom
- drag and drop
- local files
- responsive
- automatically rotates image according to the EXIF information

__Configuration__:

- `width {Number}` target width, required
- `height {Number}` target height, required
- `dragdrop {Boolean}` enables drag&drop (default: `true`)
- `background {String}` a background color (default: transparent)
- `format {String}` a format for URL file generator (default: `{0}`)

__Attributes__
- `path="path-with-url-to-image"` - must contain URL to picture

__Methods__:

```js
// e.g.
var component = FIND('croper');

// Resize canvas
component.reconfigure('width:500;height:200');

// Get cropped image
// component.output([type], [return_object])
var png = component.output('image/png');
var jpg = component.output('image/jpeg');

// Below method automatically detects the transparency and sets the output
var data = component.output();

// var data = component.output(true);
// data.filename {String}
// data.data {String} base64

// New method for clearing of canvas
component.clear();
```
