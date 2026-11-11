---
name: TangularCounter
description: This helper can create a short value from big numbers.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-11-03 22:48
updated: 2021-04-06 12:52
jcomponent: v19,v20
---

# Tangular-Counter

This helper can create a short value from big numbers.

```js
Thelpers.counter([value], [decimals]);
// @value {Number} a value
// @decimals {Number} optional, count of decimals (default: `0`)
```

__Outputs__:

- `10 K`
- `1 024`
- `1 M`

__Usage__:

```html
<h1>{{ name }}</h1>
<div>{{ userscount | counter }}</div>
```

or

```js
console.log(Thelpers.counter(134000));
```
