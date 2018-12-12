## j-Menu

- easy usage for different cases
- supports 3 orientations `left`, `center` and `right`
- singleton
- works with Bootstrap Grid System
- works with touches

__Methods__:

Method: `component.show(orientation, targetElement, [items], clickCallback, [offsetX], [offsetY])`
- `orientation {String}` can be `left`, `center` or `right`
- `targetElement {Selector/jQuery/Element}` a target where the component will be visible
- `items {Array}` optional and must have this structure: `[{ name: String, value: String, icon: String }]` otherwise will be items read from the target's `data-options` attribute.
- `callback(selectedValue) {Function}` is triggered when the user clicks on the item
- `offsetX` {Number} optional can change offset X
- `offsetY` {Number} optional can change offset Y

Method: `component.showxy(x, y, [items], clickCallback)`
- `x {Number}` position `x`
- `y {Number}` position `y`
- `items {Array}` optional and must have this structure: `[{ name: String, value: String, icon: String }]` otherwise will be items read from the target's `data-options` attribute.
- `callback(selectedValue) {Function}` is triggered when the user clicks on the item

Method: `component.hide()`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT