## j-Printer

The component can print a HTML content.

- jComponent `v19|v20`
- singleton
- easy usage

__Configuration__:

- `delay {Number}` a delay for evaluating of printer (default: `500`)
- `delayprint {Number}` a delay for printing (default: `500`)
- `delayclose {Number}` a delay for closing window (default: `1000`)

__Methods__:

```js
// SETTER('printer/print', [title], html, test);

SETTER('printer/print', '<h1>Total.js Platform</h1>');

// Shows test window
SETTER('printer/print', '<h1>Total.js Platform</h1>', true);
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)