## j-Tooltip

- singleton
- universal usage
- __NEW__ hide (`SETTER('tooltip', 'hide', [force])`) now supports the `force` parameter for instant hide.

__METHODS__

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `bottom` (default), `top`, `left` or `right`
// opt.center {Boolean}    : centered position for `left` and `right` align (default: false)
// opt.timeout {Number}    : hide timeout (in milliseconds), default: `undefined`

opt.element = YOUR_ELEMENT;
opt.html = 'YOUR_HTML_CONTENT';

SETTER('tooltip', 'show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)