## j-Children

The component renders draggable items as a tree without the possibility of collapsing. Data-Source must be `Object Array` in the form: `{ id: String, children: [ ], YOUR PROPERTIES }, { ... }`

__Configuration__:

- `empty {String}` an empty text (default: `null`)

__Template__:

```html
{{ level }} contains a level (number)
{{ value }} contains an item (object)
```

Try to understand the functionality from the example.

__Good to know__:

- `component.items {Object}` contains all references of all items in the form `items[item.id] = item`
- `component.parents {Object}` contains all references of all parents in the form `parents[item.id] = parent`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)