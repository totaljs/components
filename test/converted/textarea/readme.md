---
name: textarea
description: Multi-line text field with label, icon, placeholder, length limit, error text and optional monospace font
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-03-08 09:13
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Textarea

- __NEW__ supports hidden scrollbar

__Configuration__:

- `required {Boolean}` (optional) enables "required" (default: `false`)
- `icon {String}` (optional) icon for the label without `ti-` e.g. `home`, `cog`, etc.
- `label {String}` (optional) label (default `innerHTML`)
- `autofocus {Boolean}` (optional) focuses the input (default: `false`)
- `placeholder {String}` (optional) adds a `placeholder` text into the input
- `maxlength {Number}` (optional) sets a maximum length of chars
- `disabled {Boolean}` (optional) disables this component
- `height {Number}` (optional) a maximum height for the input
- `error {String}` (optional) adds an `error` text under the input
- `monospace {Boolean}` (optional) sets `monospace` font for the input (default: `false`)
- `readonly {Boolean}` optional, default `false`
- `scrollbar {Boolean}` optional, default `true`
