## j-FloatingPanel

- singleton
- supports custom scrollbars
- supports __dark mode__

__Methods__:

Method: `component.show(options)`

- `options.element {Element/`jQuery Element}
- `options.offsetX {Number}` optional, `x` offset (default: `0`)
- `options.offsetY {Number}` optional, `y` offset (default: `0`)
- `options.offsetWidth {Number}` optional, `width` offset (default: `0`)
- `options.minwidth {Number}` optional, a minimal width (default `200`)
- `options.maxwidth {Number}` optional, a maximal width (default `infinite`)
- `options.height {Number}` optional, a height (default: `200`)
- `options.callback(element) {Function}` is triggered when the user clicks on the element with `.selectable` class
- `options.init {Function}` is triggered before the component is displayed
- `options.close {Function}` optional, can determine closing of panel
- `options.align {String}` optional, `left` (default), `right` or `center`
- `options.position {String}` optional, `top` (default), `bottom`
- `options.classname {String}` optional, a custom container class for all items

Method: `component.hide()`

__HTML rendering__:

```js
var opt = {};
opt.html = 'Your HTML code';
```

__RAW element rendering__:

```js
var opt = {};
opt.html = YOUR_DOM_ELEMENT;
// IMPORTANT: if the FloatingBox will be closed, then the element will be moved to the previous parent.
```

__Importing content__:

```js
var opt = {};
opt.import = '/url/part.html';
// IMPORTANT: the content will be cached for the future usage
```

### Good to know

- elements with `selectable` class will be selectable

__Methods__:

- `component.up()` selects item above
- `component.down()` selects item below
- `component.select([el])` selects item

You can combine methods with `j-Shortcuts` component.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)