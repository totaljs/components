---
name: textboxlist
description: TODO
author: Peter Širka
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2016-07-21 06:39
updated: 2026-11-03 10:36
jcomponent: v19
---

# TextboxList

__Configuration__:

- `icon {String}` icon for label
- `label {String}` label (default `innerHTML`)
- `placeholder {String}` adds a `placeholder` text into the input
- `maxlength {Number}` sets a maximum length of chars
- `disabled {Boolean}` disables this component
- `limit {Number}` sets a maximum length of lists
- `error {String}` error message when a limit is reached (default `You reach the maximum limit`)
- `required {Boolean}` whether a list is required (default `false`)
- `type {String}` can be `email`, `url`, `currency`, `number`, `date`, `lower`, `upper`, `a-z` or empty (default)
- __NEW__ `movable {Boolean}` enables changing of position for existing items

## Contributor

- improvements by Pedro Maia Costa <https://github.com/pnmcosta>
- improvements by Denis Grance <denis@granec.cz>
