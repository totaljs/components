---
name: loadcontent
description: The component loads a content from the template <script type="text/html"> and appends it into the element. It's a great solution for reusable content. Learn
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2022-05-03 21:31
updated: 2026-11-03 09:56
jcomponent: v19,v20
---

# LoadContent

The component loads a content from the template `<script type="text/html">` and appends it into the element. It's a great solution for reusable content. Learn from example.

__Configuration__:

- `selector {String}` a jQuery selector (it will use it for entire DOM)
- `wait {Number}` repeats finding of template in entered milliseconds (default: `0`)
- `replace {String}` replaces entered pharses in the form: `find1=replace1,find2=replace2` (default: empty)
- `exec {String}` a link to the `function(element)`, it's executed after the template is loaded

__Good to know__:

- all `SCR` pharses will be replaced to the `script` phrase
