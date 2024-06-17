## j-Detach

- jComponent `v19|v20`

The component can detach/attach all children (HTML elements). For example, if you have elements inside a panel, you can move the elements e.g., to the `j-Windows`.

The component `watch` path `{Boolean}` and if the value contains `true`, elements will be detached otherwise attached.

__Configuration__:

- `detach {String}` a link to the `function(children, element)`
- `attach {String}` a link to the `function(children, element)`
- `remove {String}` a link to the `function(children)`

---

- `detach` is executed when the content is detached
- `attach` is executed when the content must be returned back
- `remove` is executed when the component (or a parent element) is removed

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)