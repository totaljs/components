## j-Suggestion

- easy usage for different cases
- supports 3 orientations `left`, `center` and `right`
- singleton
- works with Bootstrap Grid System
- works with touches
- supports __dark mode__

__Methods__:

Method: `component.show(orientation, targetElement, [items/function(search, next)], clickCallback)`

- `orientation {String}` can be `left`, `center` or `right`
- `targetElement {Selector/jQuery/Element}` a target where the component will be visible
- `items {Array}` optional and must have this structure: `[{ name: String, value: String, icon: String }]` otherwise will be items read from the target's `data-options` attribute.
- `callback(selectedItem) {Function}` is triggered when the user clicks on the item

Method: `component.hide()`

__Attributes__:
- `targetElement` can contain `data-options="Name 1|ti-building|Value 1;Name 2|ti-github|Value 2;"` attribute with all items of the context menu.

__Configuration__:
- `placeholder` - a placeholder for the search input

__Server-side searching__:

```javascript
SETTER('suggestion', 'show', element, function(search, next) {
	next([{ name: 'Item 1' }, { name: 'Item 2' }]);
}, function(selected) {
	console.log(selected);
});
````

If the `value` isn't defined then the component uses `name` as `value`.

__Global events__:

```javascript
ON('suggestion', function(visible, component, target) {
	console.log('Suggestion is', visible ? 'visible' : 'hidden');
});
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)