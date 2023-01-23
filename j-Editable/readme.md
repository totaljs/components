## j-Editable

This component can edit all elements with `editable` class. It works with `data-bind` or dynamic values. Learn more from example.

__Configuration__:

- `autofocus` {Boolean} focuses first item (default: `false`)
- `validate` {Boolean} can disable validation (default: `true`)
- `disabled` {Boolean} can disable editing (it adds `ui-editable-disabled` and `ui-editable-enabled` class), default: `false`
- `changed` {String} optional, a link to a method or path --> it will contain the object with changed values only
- `enter` {String} optional, a link to a method `method(path, value, el)`, the method is executed if the user presses `ENTER`
- `escape` {String} optional, a link to a method `method(path, value, el)`, the method is executed if the user presses `ESC`
- `can` {String} optional, a link to method `method(opt, el)` must return `boolean`, it means `can edit?`
- `error` {String} optional, a link to method `method(el, isInvalid, meta)` is evaluated when the item is invalid and vice-versa
- __NEW__ `class {String}` optional, adds a class name in the form `ui-editable-CLASS`  (default: `default`)

---

`data-editable` attribute describes behaviour:

- `path` {String} a __relative path__ to property (can be inherited from `data-bind` automatically)
- `required` {Boolean} optional, enables "required" (default: `false`)
- `type` {String} optional, can be `string` (default), `date`, `number`, `boolean`, `email` or `html` __NEW__ `tags`
- `can` {String} optional, a path to `function(opt, el)` must return `boolean`, it means `can edit?`
- `save` {String} optional, a path to `function(opt, accepted(boolean))`, `accepted` function must be evaluated
- `format` {String} optional, a format for `date`, default: `yyyy-MM-dd`
- `dirsource` {String} optional, path to a data-source
- `dircustom` {String/Boolean} optional, can contain a path to `function(val, next(new_val))` or can be `Boolean`. This option can enable adding a custom value (value not defined in data-source)
- `dirrender` {String} optional, a path to `function(item, text)` (must return HTML for `j-Directory`), this function can affect list of items in `j-Directory`
- `dirminwidth` {Number} optional, a minimum width for `j-Directory`, default: `200`
- `dirmaxwidth` {Number} optional, a maximum width for `j-Directory`
- `dirplaceholder` {String} optional, a placeholder for `j-Directory`
- `dirempty` {String} optional, adds an empty field for `j-Directory`
- `dirkey` {String} optional, a key name for reading of `text` in `dirsource` (default: `name`)
- `dirvalue` {String} optional, a key name for reading of `value` in `dirsource` (default: `id`)
- `dirsearch` {Boolean} optional, can disable search for `j-Directory`
- `autosource` {String} a path to `search` function in `autocomplete`, `function(search, render(arr))`
- `autovalue` {String} a property path for the value in `autosource`
- `maxlength` {Number} a maxlength
- `minvalue` {Number} a min. value for number type (default: `undefined`)
- `maxvalue` {Number} a max. value for number type (default: `undefined`)
- `rebind` {Boolean} if `true` rebinds `data-bind` on this element only (default: `0`)
- `validate` {String} optional, a condition for validating of value, can contain a link to `function(value)` or `!!value.match(/[a-z]+/)`
- `multiline` {Boolean} optional, enables multiline + appends class `editable-multiline` (`inline-block` + `width:100%`) when it's editing (default: `false`)
- `raw` {Boolean} optional, when `true` then the current HTML content will be as a placeholder if the value is `nullable` (default: `true`)
- `accept` {String} optional, a condition for accepting of value, can contain a link to `function(value)` or `!!value.match(/[a-z]+/)` is similar to `validate`
- `empty` {String} optional, enables empty value and can contain empty label or `1` or `true` for auto `rebind` of binder
- `invalid` {String} optional, a link to method `method(el, isInvalid, meta)` is evaluated when the item is invalid and vice-versa

__Methods__:

- __NEW__: `component.changed()` returns an object with changed data

__Good to know__:

- if the user presses some `key` then the editable element will contain `keypressed` class as long as they haven't left the control
- each changed element will contain class `changed`
- if the component changes some values, the main element will contain class `ui-editable-changed`
- if the element has `data-bind` with `empty`, it will be cleared after focus
- __NEW__ now supports `tags` type. For now supports only with `rebind` and `data-bind`. (data-bind `template` with `{jQuery selector}` works from `+v18`)
- __NEW__ if the element (__or parent, or parent of parent__) contains attribute `data-disabled="1"`, the control will be disabled
- __NEW__ hidden and disabled elements won't be validated

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)