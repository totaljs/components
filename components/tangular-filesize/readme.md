---
name: TangularFileSize
description: Tangular helper and Number prototype that render a file size in a human readable form.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-11-03 22:40
updated: 2026-11-03 11:05
jcomponent: v19,v20
---

# Tangular-FileSize

A simple Tangular template engine __helper__ for rendering `humanable` size of file or directory. `Number` contains prototype `Number.filesize()`.

```js
(100).filesize([type])
// type {String} optional, can contain bytes, KB, MB, GB or TB (default: __empty__)
```

__Outputs__:

- `1 kB`
- `5 bytes`
- `10 MB`
- `1.5 GB`

__Usage__:

```html
<h1>{{ name }}</h1>
<div>{{ size | filesize }}</div>
```

or

```js
console.log(Thelpers.filesize(1000));
```
