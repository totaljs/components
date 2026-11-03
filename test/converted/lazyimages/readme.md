---
name: lazyimages
description: The component tries to find all <img elements with data-src="" attribute and if the element is visible then the component will update src="" attribute with the
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-09-03 10:39
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# LazyImages

__Good to know__:

The component tries to find all `<img` elements with `data-src=""` attribute and if the element is visible then the component will update `src=""` attribute with the value from `data-src=""` attribute.

__Configuration__:

- `type {String}` a type (`position` or `offset`) for obtaining of position (default: `position`)
- `offsetter {String}` optional, a parent selector for obtaining of position
- `customscrollbar {Boolean}` have you used a custom scrollbar? (default: `false`)
