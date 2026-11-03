---
name: example
description: <simple component description>
author: <author of the component>
version: <version>
darkmode: <true|false>
license: <license type>
created: <yyyy-MM-dd HH:mm>
updated: <yyyy-MM-dd HH:mm>
jcomponent: v19,v20
---

# Example

A small stepper with `-` and `+` buttons. It is a template that shows the structure and the most used patterns of a component: defaults, `make`, `setter`, `configure`, `validate`, `state`, events, a link to a global function and `destroy`. Every part of `component.html` is commented.

- The value of the `path` is a number.
- Clicking the buttons changes the model, marks the component as changed and executes `exec`.
- `required` validates that the value is greater than `0`.

__Configuration__:

- `title {String}` a label above of the control (default: `Title`)
- `icon {String}` Total.js icon of the label, example: `ti ti-home` (default: `ti ti-warning`)
- `step {Number}` a value added or subtracted by one click (default: `1`)
- `min {Number}` the minimal value (default: `0`)
- `max {Number}` the maximal value (default: `100`)
- `disabled {Boolean}` disables the component (default: `false`)
- `required {Boolean}` enables the validation, the value must be greater than `0` (default: `false`)
- `exec {String}` link to a global `function(value, element)`, executed after each change by the user

__Good to know__:

- The configuration can be changed in runtime: `SETTER('example/reconfigure', 'title:New title;disabled:true')`.
- The component supports dark mode (`.ui-dark`).
