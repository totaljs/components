# j-Enter

This component evaluates some method if the user press `enter`. Important: component finds all `input` elements and performs `CAN()` for the path.

__Configuration__:
- `exec {String}` a method name for execution
- `validate {Boolean}` enables validate (default: `true`)
- `trigger {String}` can contain a selector for triggering a real `click` event (default: `button[name="submit"]`)
- `timeout {Number}` a timeout as a prevention for multi-press of `enter` key (default: `1500`)
- __NEW__ `delay {Number}` a delay for submitting data (default: `500` ms)