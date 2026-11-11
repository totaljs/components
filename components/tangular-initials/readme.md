---
name: TangularInitials
description: A simple Tangular template engine helper for rendering initials from the name (firstname + lastname).
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2018-11-08 23:39
updated: 2023-02-19 23:28
jcomponent: v19,v20
---

# Tangular-Initials

A simple Tangular template engine __helper__ for rendering `initials` from the name (firstname + lastname).

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
