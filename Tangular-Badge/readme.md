# Tangular-Badge

This helper makes a `<span class="badge"></span>` element (use [`IntranetCSS`](https://componentator.com/components/intranet-css/)) with colorized background.

- jComponent `v19|v20`
- Predefined colors can be changed via `DEF.badgecolors = [hex, hex, hex, ...]`

```js
Thelpers.badge(label, [size]);
// @label {String|String Array}
// @size {String} small, medium (large), large
```

__Tangular__:

```html
<div>{{ tag | badge }}</div>
<div>{{ tag | badge('large') }}</div>
```