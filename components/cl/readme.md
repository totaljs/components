---
name: cl
description: The component parses inline data defined in the component's element.
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2024-02-28 13:36
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# Cl

The component parses inline data defined in the component's element. Data is parsed to the code list format.

- Data source format: `id1|name1|icon1,id2|name2|icon2,id3|name3|icon3`
- Parsed to: `[{ id, name, icon }]`

__Example__:

```html
<ui-component name="cl" path="#mycodelist" value="SK|Slovakia,CZ|Czechia,DE|Germany,FR|France"></ui-component>
````
