## j-Calendar

- supports __dark mode__
- supports __touch gestures (swipe)__ and fixed full size on mobile

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope;format:dd.MM.yyyy;type:date"`

- `firstday` {Number} (optional) first day in the week
- `today` {String} (optional) label for `Set today` button
- `days` {String} (optional) days e.g. `SU,MO,TU,WE,TH,FR,SA` (default).
- `months` {String} (optional) months e.g. `January,February,...` (default).
- `yearselect` {Boolean} (optional) dropdown with years (default `true`).
- `monthselect` {Boolean} (optional) dropdown with months (default `true`).
- `yearfrom` {String} (optional) set minimum year limit in dropdown e.g. `-5 years` `current`  (default `-100 years`).
- `yearto` {String} (optional) set maximum year limit in dropdown  `+5 years` `current` (default `current`).

The component must be called manually or works with `textbox` or `j-Input` component automatically. The component is a singleton.

- works __only__ with Bootstrap Grid System (otherwise is need to fix CSS)
- __important__ add the calendar component under `<body>` element

## Usage

```javascript
var ELEMENT = $(document);
var PATH = 'some.path.to.date';
var X_OFFSET = 100;
FIND('calendar').toggle(ELEMENT, PATH, function(date) {
	console.log('SELECTED DATE:', date);
}, X_OFFSET);

// OR

FIND('calendar').toggle(ELEMENT, 'path.to.date OR date object', 'path.to.binding.date');
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT
