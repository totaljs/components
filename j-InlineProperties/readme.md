## j-InlineProperties

- easy usage for different cases
- singleton

__Configuration__:

- `close {String}` a label for close button (default: `Close`)
- `dateformat {String}` a default date format (default: `[date]`)
- `dirsearch {String}` a default placeholder for j-Directory (default: `Search`)
- `width {Number}` a default width (default: `180`)

## Usage

```js
var opt = {};

// opt.offsetX {Number}      : adds X offset (default: 0)
// opt.offsetY {Number}      : adds Y offset (default: 0)
// opt.align {String}        : align "left" (default), "center" or "right"
// opt.position {String}     : position "top" (default) or "bottom"

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}            : "x" position
// opt.y {Number}            : "y" position

opt.items = []
opt.items.push({ id: 'firstname', name: 'First name', type: 'string', value: 'Peter' });
opt.items.push({ id: 'lastname', name: 'Last name', type: 'string', value: 'Širka', placeholder: 'String' });
opt.items.push({ id: 'age', name: 'Age', type: 'number', value: 33 });
// |---- id {String}               : identifier/a property name
// |---- name {String}             : label
// |---- value {Object}            : a value
// |---- type {String}             : supported types: string, number, boolean, icon, color, date, list
// |---- items {String/Array}      : a list for "list" type

// If you want to assign values from a model instead of filling a value in the "items" field, you can use:
// opt.value {Object}

opt.callback = function(model, changed) {
	// @model {Object}
	// @changed {String Array}
	console.log(model);
};

SETTER('inlineproperties/show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
