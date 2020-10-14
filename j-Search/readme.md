## j-Search

Simple fulltext search component. This component can show/hide elements according to the searching phrase.

__Configuration__:

- `selector` {String} jQuery selector for searching
- `attribute` {String} element attribute which contains a search phrase (default: `data-search`)
- `class` {String} this class will be used if the element is not found (default: `hidden`)
- `delay` {Number} typing delay (default: `50` ms)
- `exec` {String} a link to method which will be evaluated if the component searches for something
- __NEW__ `datasource` {String} a path to data-source for watching of changes

__Good to know__:

This component adds the classes below automatically when:

- class `ui-search-used` is added when the user searches for something
- class `ui-search-empty` is added when the user searches for something and at the same time nothing was found

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)