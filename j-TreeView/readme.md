## j-TreeView (BETA)

This component is only a beta preview. It's still under construction.

__Configuration__:

- `parent` {String} a container with fixed height, can be `window`. Default value: `parent` element.
- `visibleY` {Boolean} still shows `Y` scrollbar (default: `true`)
- `movable` {Boolean} enables the moving of nodes (default: `true`)
- `cachexpand` {Boolean} remembers the previous state (default: `true`)
- `arrows` {Boolean} enables arrows for folders (default: `true`)
- `expanded` {Boolean} expands all nodes (default: `false`)
- `autosort` {Boolean} sorts nodes according to `item.sort` (if exists) or `item.name` (if exists), default: `true`
- `margin` {Number} top/bottom margin together (default: `0`)
- `marginxs` {Number} top/bottom margin together for `xs` screen width
- `marginsm` top/bottom margin together for `sm` screen width
- `marginmd` top/bottom margin together for `md` screen width
- `marginlg` top/bottom margin together for `lg` screen width
- `disabled` {Boolean} disables the entire component
- `parentselectable` {Boolean} parent will be selectable (default: `true`)

__Data structure__:

- Object Array
- Object has to contain `id:String` which is the main ID of each item
- Object has to contain `name:String` and `children:[another similar object]` or `children:null` (with no children)
- Object has to contain `html:String` is rendered as content (if it doesn't exist then `name` is rendered)
- Object item can contain `..., classname: 'css_custom_class' }`, it adds a CSS class onto the "label" element
- Object item supports property `actions: { expand: true, drop: true, move: true }`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)