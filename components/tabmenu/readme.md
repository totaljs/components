---
name: TabMenu
description: Tab navigation that marks the selected element with a CSS class and runs a function when the tab changes
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-04-05 20:02
updated: 2025-01-09 21:00
jcomponent: v19,v20
---

# TabMenu

__Configuration__:

- `class {String}` optional, is a class name for a selected element (default: `selected`)
- `selector {String}` optional, is a jQuery selector (default: `li`)
- `datasource {String}` optional, a path to a data-source, content must be Tangular template
- `disabled {Boolean}` optional, it can disable tabs
- `exec {String}` optional, a link to the function (it will be executed when the tab is changed)
- `attr {String}` optional, a default attribute for obtaining tab identifier (default: `id`)
