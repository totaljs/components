---
name: TangularTime
description: A simple Tangular template engine helper for rendering humanable date and time.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-11-18 10:30
updated: 2026-11-03 11:05
jcomponent: v19,v20
---

# Tangular-Time

A simple Tangular template engine __helper__ for rendering `humanable` date and time.

__Outputs__:

- `now`
- `5 minutes ago`
- `1 month ago`
- `2 years ago`

__Usage__:

```html
<h1>{{ name }}</h1>
<div>{{ created | time }}</div>
```

or

```js
console.log(Thelpers.time(new Date()));
```

### Improvements

__New__: Tangular helper `time2` performs updating of time every minute automatically.
