# j-Parts

This content can handle multiple `parts` stored in the `Array` and focus on one specific part. It simulates something like browser tabs.

- jComponent `v19|v20`

__Configuration__:

- `parent {String}` parent area due to part size (default: `auto`)
- `margin {Number}` vertical margin (default: `0`)
- `create {String}` a link to the `function(part)`, it's executed if the part is created (called once)
- `focus {String}` a link to the `function(part)`, it's executed if the part is focused
- `close {String}` a link to the `function(part)`, it's executed if the part is closed

__Good to know 1__:

- all `~PATH~` phrases will be replaced by `item.path` automatically
- all `~ID~` phrases will be replaced by `item.id` automatically

__Item specification__:

- `item.id {String}` very important, part identifier
- `item.blur {String/Function(el, item)}` optional, a link to the `function(element, item)` if the part is focused out
- `item.focus {String/Function(el, item)}` or `item.reload {String}` optional, a link to the `function(element, item)` if the part is focused
- `item.remove {String/Function(el, item)}` optional, a link to the `function(element, item)` if the part is removed
- `item.html {String}` a HTML content or use `item.url`
- `item.import {String}` URL address for the part content
- `item.path {String}` optional, it replaces all `~PATH~` phrases automatically
- `item.delay {Number}` a delay for removing of `invisible` class
- __NEW__ `item.attrd {Object}` adds `data-key` attributes into the item element

__Extendend by the component__:

- `item.focused {Boolean}` determines if the part is focused or not
- `item.element {jQuery}` part element

__Methods__:

- `component.close(id)` closes part
- `component.focus(id)` focuses part
- `component.rename(id, name, [icon])` renames part