---
name: gps
description: The component tries to read GPS coordinates.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-09-28 13:29
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# GPS

- singleton
- readonly

The component tries to read GPS coordinates.

__Configuration__:

- `watcher {Boolean}` enables a real-time watcher for GPS (default: `true`)

__Good to know__:

The component emits `ON('gps', function(coords) {` event with a new GPS coordinates.
