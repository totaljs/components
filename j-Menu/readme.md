## j-Menu

- easy usage for different cases
- works with touches
- supports __Dark mode__
- singleton

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`
// opt.hide {Function}     : NEW: is executed when the menu is hidden

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.items = ['Label', { name: 'Item 1', icon: 'print', classname: 'custom_class_name' }, { name: 'Item 2', icon: 'home' }, '-', { name: 'Item 3', icon: '!far fa-envelope' }];

opt.callback = function(item) {
	console.log(item);
};

SETTER('menu', 'show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT