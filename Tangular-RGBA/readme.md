# Tangular-RGBA

A simple Tangular template engine __helper__ for transforming `hex` colors to `RGBA colors`.

- jComponent `v19|v20`

__Usage__:

```html
<div style="background:{{ name | color | rgba(0.5) }}">{{ name }}</div>
<div style="background:{{ username | color | rgba(0.5) }}">{{ username }}</div>
```