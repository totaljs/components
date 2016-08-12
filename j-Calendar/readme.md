## j-Calendar

The component is need to call manually or works with `textbox` component with the attribute `data-component-type="date"`. The calendar component is singleton and the browser works with one instance only. Other instantes are not compiled and won't be used.

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

__IMPORTANT__: all attributes `data-days`, `data-months`, `data-firstday` and `data-today` are required.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT