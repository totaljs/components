## j-Tree

- jComponent `v19|v20`

__Configuration__:

- `first {Boolean}` selects the first tree item, default: `true` (optional)
- `exec {String}` __required__: link to a function, this function is executed when the node is selected in the tree
- `autoreset {Boolean}` resets state when datas-source is changed (optional, default: `false`)
- `selected {String}` selected class (optional, default: `selected`)
- `checked {String}` optional, a path to `function(arr, component)` or path to `property`
- `checkednested {Boolean}` optional, checks all nested items (default: `true`)
- `upload {String}` optional, a path to `function(item, files)` (enables drag & drop files)
- `dragdrop {String}` optional, a path to `function(item, target_item, itemel, targetel)` (enables drag & drop items)
- `options {String}` optional, a path to `function(item, el)` enables a small button for an inline context menu for each item
- `rename {String}` optional, a path to `function(item, newname, fn_accept(true))`
- `unselectexpand {Boolean}` optional, can `unselect` selected item when the user clicks on the expandable item (default: `false`)
- `reselect {Boolean}` optional, evaluates `exec` again if the tree is refreshed (default: `false`)
- `selectexpand {Boolean}` optional, enables adding `selected` class to expandable items (default: `false`)
- __NEW__ `iconoptions {String}` icon to options (default: `ti ti-ellipsis-h`)
- __NEW__ `expanded {Boolean}` expands all children (default: `false`)

__Data structure__:

- Object Array
- Object has to contain `name:String` and `children:[another similar object]` or `children:null` (with no children)
- Object item can contain `..., icon: 'home' }`, it can change a file icon
- Object item can contain `..., classname: 'css_custom_class' }`, it adds a CSS class onto the "label" element
- Object item can contain `..., html: 'RAW_HTML'` {String} renders HTML tags instead of `name` field

__Methods__:

- `component.expand([index])` - expands `index` or `all` (with no defined `index`) nodes
- `component.collapse([index])` - collapses `index` or `all` (with no defined `index`) nodes
- `component.clear()` - clears a cache for refreshing the source
- `component.select(index)` - selects node
- `component.unselect()` - unselects node
- `component.rename(index)` - shows `input` for name renaming (it works with `config.rename`)

__Good to know__:

Setter automatically extends each object by adding `.$pointer` property with a tree index.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
