## j-TimePicker

- supports __dark mode__

- jComponent `v19|v20`

__Configuration__:

- `seconds {Boolean}` optional, enables seconds (default: `false`)
- `ampm {Boolean}` optional, enables 12 hours time format (default: `false`)

The component must be called manually or works with `j-Input` component automatically. This component is a singleton.

- __important__ add the component under `<body>` element

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.seconds {Boolean}   : shows seconds (default: false)
// opt.ampm    {Boolean}   : shows 12 hours time format (default: false)
// opt.align   {left|center|right} (default: left)

opt.value = new Date();
// or
// opt.value = 'path.to.date' (in this case you don't need to declare "opt.callback")

opt.element = YOUR_ELEMENT;

opt.callback = function(date) {
	console.log(date);
};

// opt.close {Function} optional, this function can determine the closing of TimePicker

SETTER('timepicker/show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
