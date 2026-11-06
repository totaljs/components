---
name: contentslider
description: Content slider that cycles through links at a set interval and can remember its state in localStorage
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-10-30 18:23
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# ContentSlider

- easy usage
- supports great features
- works with Bootstrap Grid System

__Configuration__:

- `selector {String}` Optional, default `a`
- `interval {Number}` Optional, refresh interval (default `3000`)
- `cache {String}` Optional, when it's filled then the component saves a current state into the `localStorage` - so when the user refreshes the page then the component continues from the last state

__Redraw__:
The code below solves a problem with rendering component when the the component is dynamically displayed.

```javascript
SETTER('contentslider/refresh');
```
