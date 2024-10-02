## j-ClBind

The component reads an item with a linked data source. The component supports Tangular template inside the element (optional). As the value is stored in the `{{ value.something }}` variable.

- jComponent `v19|v20`

__Configuration__:

- `datasource {String}` or `dirsource {String}` __required__ a data-source
- `id {String}` a pair key (default: `id`)
- `nullable {Boolean}` renders `null` value (default: `true`)
- `exec {String}` executes `function(value, element)` method
- `bind {String}` binds a read value according to the defined path

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)