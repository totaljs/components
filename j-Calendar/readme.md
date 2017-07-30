## j-Calendar

__Configuration__:

Example: `data-jc-config="required:true;icon:envelope;format:dd.MM.yyyy;type:date"`

- `firstday` {Number} (optional) first day in the week
- `today` {String} (optional) label for `Set today` button
- `days` {String} (optional) days e.g. `SU,MO,TU,WE,TH,FR,SA` (default).
- `months` {String} (optional) months e.g. `January,February,...` (default).

The component is need to call manually or works with `textbox` component automatically. The calendar component is a singleton and the browser works with the one instance only. Other instantes are not compiled and won't be used.

- works __only__ with Bootstrap Grid System (otherwise is need to fix CSS)

## Usage

```javascript
var ELEMENT = $(document);
var PATH = 'some.path.to.date';
var X_OFFSET = 100;
FIND('calendar').toggle(ELEMENT, PATH, function(date) {
   console.log('SELECTED DATE:', date);
}, X_OFFSET);
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT