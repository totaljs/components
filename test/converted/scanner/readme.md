---
name: scanner
description: The component for scanning documents.
author: Kirill Zlobin
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-12-01 16:41
updated: 2026-11-03 10:36
jcomponent: v19
---

# Scanner

The component for scanning documents.

- singleton

__Methods__:

- `component.show(opt)`
	- `opt.points = [left+right {Number}, top+bottom {Number}]` mask size defined in the percentage
	- `opt.callback = function(base64)` The callback function, which will be executed when the user approves taken document. This callback function thakes an image in **base64** format as a parameter
