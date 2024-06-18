# Tangular-FileSize

A simple Tangular template engine __helper__ for rendering `humanable` size of file or directory. `Number` contains prototype `Number.filesize()`.

- jComponent `v19|v20`

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