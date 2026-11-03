---
name: idletime
description: Emits idle when the page has no mouse, keyboard, touch or focus activity for a set time, and reload when a hidden page is shown again
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2021-02-11 21:34
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# IdleTime

This component emits event `ON('idletime', function(is) {})` when the website is in idle. It reacts on mouse, keyboard, touch events or focusing of window. And the component sets `Boolean` according to the path with the current idle state.

__Configuration__:

- `count {Number}` in seconds, default: `300` 5 minutes)

__Events__:

- `ON('idletime', function(is))` is emitted if the document is idle (`is=true`) / active (`is=false`)
- `ON('reload', function() {})` is emitted if the document is transformed from invisible to visible state within `config.count` interval
