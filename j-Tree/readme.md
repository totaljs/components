## j-Tree

__Configuration__:

Example: `data-jc-config="first:true;exec:your_callback"`

- `first` {Boolean} selects the first tree item, default: `true` (optional)
- `exec` {String} __required__: link to a function, this function is executed when the node is selected in the tree

__Data structure__:

- Object Array
- Object has to contain `name:String` and `children:[another similar object]` or `children:null` (with no children)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT