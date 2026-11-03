---
name: parameters
description: This component can changed internal parameters.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-02-15 11:44
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# Parameters

This component can changed internal parameters.

__Configuration__:

- `dateformat {String}` optional, a date format (default: `yyyy-MM-dd`)
- `search {String}` optional, placeholder for search input (default: `Search`)
- `height {Number}` optional, a height of the element (default: `undefined`)
- `parent {String}` optional, jQuery selector for auto setup of height (can be `window`, `parent` or `custom`)
- `hidetype {Boolean}` optional, hides type (default: `false`)
- `margin {Number}` optional, vertical margin (default: `0`)

__Data declaration__:

```javascript
var form = [];
form.push({ name: 'user.firstname', label: 'First name', type: 'string', value: 'Peter Sirka' });
form.push({ name: 'user.age', type: 'number', value: 33, min: 18, max: 50 });
form.push({ name: 'user.birth', type: 'date', value: NOW });
form.push({ name: 'user.newsletter', type: 'boolean', value: true });
```

__Allowed types in data__:

- `string`
- `boolean`
- `number`
- `date`
