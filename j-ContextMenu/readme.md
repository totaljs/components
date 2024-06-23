## j-ContextMenu

- easy usage for different cases
- supports 3 orientations `left`, `center` and `right`
- singleton
- works with Bootstrap Grid System
- works with touches

- jComponent `v19|v20`

__Methods__:

Method: `component.show(orientation, targetElement, [items], clickCallback, [offsetX], [offsetY])`
- `orientation {String}` can be `left`, `center` or `right`
- `targetElement {Selector/jQuery/Element}` a target where the component will be visible
- `items {Array}` optional and must have this structure: `[{ name: String, value: String, icon: String }]` otherwise will be items read from the target's `data-options` attribute.
- `callback(selectedValue) {Function}` is triggered when the user clicks on the item
- `offsetX {Number}` optional can change offset X
- `offsetY {Number}` optional can change offset Y

Method: `component.hide()`

__Attributes__:
`targetElement` can contain `data-options="Name 1|fa-building|Value 1;Name 2|fa-github|Value 2;"` attribut with all items of the context menu.

If the `value` isn't defined then the component uses `name` as `value`.

__Global events__:

```javascript
ON('contextmenu', function(visible, component, target) {
    console.log('ContextMenu is', visible ? 'visible' : 'hidden');
});
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)