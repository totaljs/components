---
name: filebrowser
description: The component will open a file browser and returns selected files.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2021-05-11 16:53
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# FileBrowser

The component will open a file browser and returns selected files.

__Methods__:

- `component.open(opt)` - opens file browser
	- `opt.multiple {Boolean}` enables multiple files (default: `false`)
	- `opt.accept {String}` allows only specified content-type (default: `undefined`)
	- `opt.callback {Function(files, e)}` a callback
