# Tangular-Counter

This helper can create a short value from big numbers.

```javascript
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

```javascript
console.log(Thelpers.counter(134000));
```