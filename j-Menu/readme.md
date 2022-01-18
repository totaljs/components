## j-Menu

- easy usage for different cases
- works with touches
- supports __Dark mode__
- singleton
- __NEW__ supports large mode

__Configuration__:

- __NEW__ `style` {Number} changes style (supported style `2` (default) and `1`)

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`
// opt.hide {Function}     : NEW: is executed when the menu is hidden
// opt.classname {String}  : NEW: adds class to the parent
// opt.large {Boolean}     : NEW: it'll make menu bigger

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.items = ['Label', { name: 'Item 1', icon: 'print', classname: 'custom_class_name' }, { name: 'Item 2', icon: 'home', note: 'A simple description for this item' }, '-', { name: 'Item 3', icon: 'far fa-envelope', children: [{ name: 'Submenu item 1', icon: 'cog' }, { name: 'Submenu item 2', icon: 'home' }] }, { name: 'Selected', icon: 'check-circle', selected: true }, { name: 'Item 4', icon: 'gear', disabled: true }];
// Item properties
// name {String}           : Item name
// icon {String}           : Icon
// classname {String}      : class to be added to li element
// note {String}           : text bellow Item name
// selected {Boolean}      : item will be highlighted
// disabled {Boolean}      : item will be disabled(not clickable)
// children {Array}        : array of subitems

opt.callback = function(item) {
	console.log(item);
};

SETTER('menu', 'show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
