---
name: ObjectTree
description: Expandable/Collabsible object tree.
author: Martin Smola
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2022-03-25 11:08
updated: 2024-06-14 12:34
jcomponent: v19,v20
---

# ObjectTree

Expandable/Collabsible object tree.

__Configuration__:

- `exec {String}` function to call when a user clicks on icon

__Usage__:

```js
function exec_function(type, value) {
    type; // 'path' or 'data'
    value;// copied path(string) or property value(any datatype)
}
```
