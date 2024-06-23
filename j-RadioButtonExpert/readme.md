## j-RadioButtonExpert

Perfect component for radiobutton with custom styles. It's a little bit advanced but absolutely worth it!

- jComponent `v19|v20`

__Configuration__

- `label {String}` can change the title label
- `required {Boolean}` enables `required` (default: `false`)
- `disabled {Boolean}` disables this control (default: `false`)
- `type {String}` can contain `number` (default: `string`)
- `class {String}` inserts a class into an element with class `.ui-radiobuttonexpert-container`
- `datasource {String}` path to data-source (must be array or array of objects) or __NEW__: `id|name,id|name`
- `value {String}` determines a property name for value (in data-source) (default: `id`)
- `disabledkey {String}` determines a property name for disabled item (in data-source) (default: `disabled`)
- __NEW__ `selector {String}` a jQuery selector for custom template (outside of the component). Works like `custom template` in [data-binding](https://wiki.totaljs.com/jcomponent/08-data-binding/)

__Good to know__

- You must write **all the styles**
- Example object `{ name: 'My item', id: 1, disabled: false, classname: 'color-highlighted' }`
- You can use `$index` and `$path` in template

__Basic Styles__

```css
.my-button { display: inline-block; padding: 20px; margin-right: 10px; border: 1px solid gray; cursor: pointer; border-radius: 2px; }
.my-button:hover { border-color: #4285F4; }
.my-button.selected { color: white; background: #4285F4; border-color: rgba(0, 0, 0, 0.2); }
.my-button[data-disabled="1"] { background-color: #dcdcdc; color: gray; border-color: #dcdcdc; cursor: not-allowed;}
.ui-disabled .my-button { background-color: #dcdcdc; color: gray; border-color: #dcdcdc; cursor: not-allowed; }
.ui-disabled .my-button:hover { background-color: #dcdcdc; color: gray; border-color: #dcdcdc; }
.ui-disabled .my-button.selected { border-color: gray; background: #efefef; color: #5a5a5a; }

/* Dark mode */
.ui-dark .my-button { border-color: 1px solid #404040; color: #adadad; }
.ui-dark .my-button.selected { color: white; }
.ui-dark .my-button[data-disabled="1"] { background-color: #525252; color: gray; border-color: #525252; }
.ui-dark .ui-disabled .my-button { background-color: #525252; color: gray; border-color: #525252; }
.ui-dark .ui-disabled .my-button:hover { background-color: #525252; color: gray; border-color: #525252; }
.ui-dark .ui-disabled .my-button.selected { border-color: rgba(0, 0, 0, 0.2); background: #969696; color: #ffffff; }

/* Large mode */
.ui-large .my-button { font-size: 16px; }
```

### Author

- Denis Granec <denis@totalavengers.com>
- [License](https://www.totaljs.com/license/)
