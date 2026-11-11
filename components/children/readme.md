---
name: Children
description: Try to understand the functionality from the example.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2021-07-21 16:17
updated: 2023-12-06 12:03
jcomponent: v19,v20
---

# Children

The component renders draggable items as a tree without the possibility of collapsing. Data-Source must be `Object Array` in the form: `{ id: String, children: [ ], YOUR PROPERTIES }, { ... }`

__Configuration__:

- `empty {String}` an empty text (default: `null`)
- `onchange {String}` optional, a link to the `function(arr)` - captures items when resorted

__Template__:

```html
{{ level }} contains a level (number)
{{ value }} contains an item (object)
```

Try to understand the functionality from the example.

__Good to know__:

- `component.items {Object}` contains all references of all items in the form `items[item.id] = item`
- `component.parents {Object}` contains all references of all parents in the form `parents[item.id] = parent`
