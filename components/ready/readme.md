---
name: Ready
description: This component executes some operations when the component is ready.
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2020-12-29 12:35
updated: 2026-11-19 16:03
jcomponent: v19,v20
---

# Ready

This component executes some operations when the component is ready. If the element has the `invisible` class, a loading animation is shown in the center of the element until the content is displayed.

__Configuration__:

- `rclass {String}` A list of CSS classes to remove divided by space
- `rdelay {Number}` A delay for removing of classes, including `invisible` and the loading animation (default: `config.delay`)
- `aclass {String}` A list of CSS classes to add divided by space
- `adelay {Number}` A delay for adding of classes (default: `config.delay`)
- `delay {Number}` Initializatin delay in milliseconds (default: `800`)
- __NEW__: `loading {Boolean}` Shows a loading animation in the center of the element while the content is `invisible` (default: `true`). The color is taken from the CSS variable `--color`, otherwise from `DEF.color`
