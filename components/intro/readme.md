---
name: Intro
description: Step-by-step guided tour shown in a popup with next and done buttons, displayed when the value of its path matches the if condition
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-05-16 16:10
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Intro

__Configuration__:

- `if {String}` condition for showing of the intro, it's compared with the value within of `path`
- `next {String}` optional, text for the next step button (default: `Next`)
- `close {String}` optional, text for the close step button (default: `Done`)
- `page {String}` optional, a link to method `function(page) {}` it's executed when page is changed
- `exec {String}` optional, a link to method `function() {}` it's executed when the intro is closed
- `check {String}` optional, a link to method `function(done) {}` it's executed when is clicked on button last button
- `remove {Boolean}` optional, when `true` then the component will be removed after close (default: `false`)
- `closebutton {Boolean}` shows close button at the right top corner (default: `false`)
- `width {Number}` a maximum width (default: `400`)
- `height {Number}` height (default: `300`)
- __NEW__: `delay {Number}` a delay for `next` button between clicks
- __NEW__: `nexticon {String}` a done icon (default: `ti ti-chevron-right`)
- __NEW__: `doneicon {String}` a done icon (default: `ti ti-check-circle`)

__Good to know__:
- each button with `name="next"` will be used as `next` button
- each button with `name="close"` will be used as `close` button
- a link with `next` class provides will be used as a `next` button
- a link with `close` class provides will be used as a `close` button
