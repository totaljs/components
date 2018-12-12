## CSV export

```javascript
FUNC.csv(filename, columns, rows);
// @filename {String} A name for downloading
// @columns {String Array} Optional
// @rows {Object Array}
```

__Usage__:

```javascript
FUNC.csv('example.csv', ['name', 'price'], [{ name: 'Name 1', price: 1, date: new Date() }, { name: 'Name 2', price: 2, date: new Date() }, { name: 'Name 3', price: 3, date: new Date() }]);

// or

FUNC.csv('example.csv', [{ name: 'Name 1', price: 1, date: new Date() }, { name: 'Name 2', price: 2, date: new Date() }, { name: 'Name 3', price: 3, date: new Date() }]);
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT