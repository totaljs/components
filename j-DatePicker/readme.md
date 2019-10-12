## j-DatePicker

- it's improved clone of `j-Calendar`
- supports __dark mode__
- supports __touch gestures (swipe)__ and fixed full size on mobile

__Configuration__:

- `firstday` {Number} optional, first day in the week
- `today` {String} optional, label for `Set today` button
- `days` {String} optional, days e.g. `SU,MO,TU,WE,TH,FR,SA` (default).
- `months` {String} optional, months e.g. `January,February,...` (default).
- `yearselect` {Boolean} optional, dropdown with years (default `true`).
- `monthselect` {Boolean} optional, dropdown with months (default `true`).
- `yearfrom` {String} optional, set minimum year limit in dropdown e.g. `-5 years` `current`  (default `-100 years`).
- `yearto` {String} optional, set maximum year limit in dropdown  `+5 years` `current` (default `current`).

The component must be called manually or works with `j-Input` component automatically. The component is a singleton.

- __important__ add the calendar component under `<body>` element

## Usage

```javascript
var opt = {};
opt.element = YOUR_ELEMENT;
opt.value = new Date();
// or opt.value = 'path.to.date'; --> then "opt.callback" is disabled
// opt.align {String}      : align "left" (default), "center" or "right"
// opt.position {String}   : position "top" (default) or "bottom"

opt.callback = function(newdate) {
	console.log('date has been changed');
};

// opt.offsetX {Number} "x" offset
// opt.offsetY {Number} "y" offset
// opt.close {Function} optional, this function can determine closing of DatePicker

SETTER('datepicker', 'show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
