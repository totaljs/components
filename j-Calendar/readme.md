## j-Calendar

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

The component is need to call manually or works with `textbox` component automatically. The calendar component is a singleton and the browser works with the one instance only. Other instantes are not compiled and won't be used.

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

## Date parsing from String

```javascript
// Registers a parser
// for example: "dd-MM-yyy"
SETTER(true, 'calendar', 'parser', function(path, value, type) {
    var arr = value.split('-');
    var dt = new Date((arr[2] || '').parseInt(NOW.getFullYear()), ((arr[1] || '').parseInt(NOW.getMonth() + 1) - 1), (arr[0] || '').parseInt(NOW.getDate()));
    return dt;
});
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT