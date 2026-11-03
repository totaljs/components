---
name: clock
description: TODO
author: Denis Granec
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2017-12-19 04:32
updated: 2026-11-03 10:36
jcomponent: v19
---

# Clock

- supports __dark mode__
- works __only__ with Bootstrap Grid System (otherwise is need to fix CSS)
- thanks [weareoutman](https://github.com/weareoutman/) for some things

__Configuration__:

- `twelvehour {Boolean}` (optional) the clock will be 12-hour (default `false`).

## Usage

```javascript
var ELEMENT = $(document);
var PATH = 'some.path.to.date';
var X_OFFSET = 100;

SETTER('clock', 'toggle', ELEMENT, PATH, function(date) {
	console.log('SELECTED DATE:', date);
}, X_OFFSET);
```
