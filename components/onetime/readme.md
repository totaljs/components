---
name: OneTime
description: This component executes a method only once and it waits for expiration.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-07-02 12:54
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# OneTime

This component executes a method only once and it waits for expiration.

- Download templates: https://github.com/totaljs/templates

__Configuration__:

- __required__ `exec {String}` a path to the method that will be executed
- `expire {String}` expiration, default `1 year`
- `delay {Number}` a delay for executing method in milliseconds, default: `1000` ms
