# Tangular-Initials

A simple Tangular template engine __helper__ for rendering `initials` from the name (firstname + lastname).

- jComponent `v19|v20`

__Usage__:

```html
<h1>{{ name }}</h1>
<div>{{ username | initials }}</div>
```

## Initials as Image

I have added a new helper called `initialsbase64` which creates an image encoded via base64. So you can apply it to `<img` tag directly.

```html
<img src="{{ username | initialsbase64(200, 200) }}" />
```