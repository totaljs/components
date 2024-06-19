## j-Rules (BETA)

The component can create a simple rules which you can transform to some engines like Total.js Flow. The component uses `j-Directory` component.

- jComponent `v19|v20`

__Configuration__:

- `dirsearc {String}h` A placeholder for search input in `j-Directory`, default: `search`

__Data declaration__:

```js
var form = [];
form.push({ enabled: true, label: 'CPU', name: 'cpu', type: 'number', comparer: '==', value: 0, note: 'Value in mega bytes' });
form.push({ enabled: false, label: 'Memory', name: 'memory', type: 'number', comparer: '>', value: 0 });
form.push({ enabled: true, label: 'Error', name: 'error', type: 'string', comparer: '==', items: [{ name: 'Error', id: 'error' }, { name: 'Obsolete', id: 'obsolete' }] });
form.push({ enabled: false, label: 'Offline', name: 'offline', type: 'boolean', comparer: '==', value: 0 });
```

__Data properties in data declaration__:

- `name {String}` an item identifier (required)
- `label {String}` a label (required)
- `note {String}` a small note under control
- `type {String}` a type, lower-case (required)
- `items {Object Array}` items for `string` type only  in the form `[{ id: String, name: String }]`
- `enabled {Boolean}` enables item
- `comparer {String}` can be `==`, `!=`, `>`, `>=`, `<=`, `<` (required)
- `value {Number/Boolean/String}` a value

__Allowed types in data__:

- `string`
- `boolean`
- `number`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
