## j-Icons

- Total.js Icons list
- singleton

__Configuration__:

- `search {String}` a placeholder for search field (default: `Search`)
- `list {String}` URL address for obtaining list of icons (default: Total.js Icons CDN)
- `clist {String}` URL address for obtaining custom list of icons same format as Total.js Icons
- `clist2 {String}` URL address for obtaining second custom list of icons same format as Total.js Icons
- `clistprefix {String}` custom icons prefix separated by commas (far fa- fas fa-,....)
- `clist2prefix {String}` second custom icons prefix separated by commas (far fa- fas fa-,....)

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`
// opt.empty {Boolean}     : adds empty icon (default: false)

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.callback = function(icon) {
	console.log(icon);
};

SETTER('icons/show', opt);
```


### Author

- Peter Širka <info@totaljs.com>
- [License](https://www.totaljs.com/license/)
