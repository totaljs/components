---
name: detach
description: The component can detach/attach all children (HTML elements).
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-10-03 22:25
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Detach

The component can detach/attach all children (HTML elements). For example, if you have elements inside a panel, you can move the elements e.g., to the `j-Windows`.

The component `watch` path `{Boolean}` and if the value contains `true`, elements will be detached otherwise attached.

__Configuration__:

- `detach {String}` a link to the `function(children, element)`
- `attach {String}` a link to the `function(children, element)`
- `remove {String}` a link to the `function(children)`

---

- `detach` is executed when the content is detached
- `attach` is executed when the content must be returned back
- `remove` is executed when the component (or a parent element) is removed
