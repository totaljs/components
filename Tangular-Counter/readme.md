# Tangular-Counter

This helper can create a short value from big numbers.

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