---
name: csv-export
description: Function that downloads an array of objects as a CSV file from the browser, with optional columns.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-11-04 19:17
updated: 2026-11-03 11:05
jcomponent: v19
---

# CSV export

```javascript
FUNC.csv(filename, columns, rows);
// @filename {String} A name for downloading
// @columns {String Array} Optional
// @rows {Object Array}
```

__Usage__:

```javascript
FUNC.csv('example.csv', ['name', 'price'], [{ name: 'Name 1', price: 1, date: new Date() }, { name: 'Name 2', price: 2, date: new Date() }, { name: 'Name 3', price: 3, date: new Date() }]);

// or

FUNC.csv('example.csv', [{ name: 'Name 1', price: 1, date: new Date() }, { name: 'Name 2', price: 2, date: new Date() }, { name: 'Name 3', price: 3, date: new Date() }]);
```
