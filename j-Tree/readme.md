## j-Tree

__Configuration__:

Example: `data-jc-config="first:true;exec:your_callback"`

- `first` {Boolean} selects the first tree item, default: `true` (optional)
- `exec` {String} __required__: link to a function, this function is executed when the node is selected in the tree
- `autoreset` {Boolean} resets state when datas-source is changed (optional, default: `false`)
- `selected` {String} selected class (optional, default: `selected`)

__Data structure__:

- Object Array
- Object has to contain `name:String` and `children:[another similar object]` or `children:null` (with no children)

__Methods__:

- `component.expand([index])` - expands `index` or `all` (with no defined `index`) nodes
- `component.collapse([index])` - collapses `index` or `all` (with no defined `index`) nodes
- `component.clear()` - clears a cache for refreshing source
- `component.select(index)` - selects node
- `component.unselect()` - unselects node

__Good to know__:

Setter automatically extends each object by adding `.$pointer` property with the tree index.

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT