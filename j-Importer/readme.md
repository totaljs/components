## j-Importer

__j-Import__ is a great component for importing HTML templates, scripts or styles according to the path and condition. The component can help with SPA applications because you can easily import templates, scripts or styles dynamically.

__Configuration__:

- `if` {String} needs to contain a value
- `url` {String} relative/absolute URL to a subpage or subpart
- `reload` {String} a link to method in the global scope, it's executed if the __condition__ is valid
- `cleaner` {Number} (optional) idle time (in minutes) for running of cleaning (default: `0`)
- `clean` {String} (optional) a link to function, it's executed before the importer is cleaned
- __NEW__: `id` {String} a custom identifier for replacing `~ID~` phrases in the imported HTML (default: empty)

__New update__:

j-Importer can contain `<script type="text/html">` with a content which will be evaluated as HTML if the condition will be valid.

__Good to know 1__:

- all `~PATH~` phrases will be replaced by `config.path` or `config.if` automatically
- all `~ID~` phrases will be replaced by `config.id` automatically

__Good to know 2__:

If the part component isn't within scope then the value from the `config.if` will replace `?` characters in all config keys.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)