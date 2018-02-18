## j-AutoComplete

- easy usage
- works with `<input` tags only
- singleton

```javascript
component.attach(selector|input|jComponent, onSearchDelegate(value, render(array)), onSelectedDelegate(value, input), [customOffsetTop], [customOffsetLeft], [customIncrementWidth]);
```

__Example__:

```javascript
function onSearch(query, render) {
	// `query` contains a value from the input
	// `render` is a function
	// Here we have to find a datasource and render argument helps with rendering HTML

  	AJAX('GET /cities/', { q: query }, render);

    // or e.g.
	// render([{ name: 'Item 1', type: 'Pages' }, { name: 'Item 2', type: 'Widgets' }]);
}

function onSelected(value, input) {
    console.log('---> selected value:', value);
    // input.val('');
}

var plusOffsetTop = 14;
// FIND('autocomplete').attach(input, onSearch, onSelected, [offsetY], [offsetX], [width]);
FIND('autocomplete').attach('input', onSearch, onSelected, plusOffsetTop);

// or
// FIND('autocomplete').attachelement(element, input, onSearch, onSelected, [offsetY], [offsetX], [width]);
FIND('autocomplete').attachelement('offset-element', 'input', onSearch, onSelected);
```

__Improved example__:

- each `textbox` component contains `autocomplete:LINK_TO_FN` in configuration
- as `value` is used `name` if the `value` is not defined in `render()`

```javascript
function LINK_TO_FN(component) {

	SETTER('autocomplete', 'attach', component, function(query, render) {
		render([{ name: '', category: '', value: 'value to bind to a textbox' }]);
	});

	// OR

	SETTER('autocomplete', 'attach', component, function(query, render) {
		render([{ name: '', category: '', value: 'value to bind to a textbox' }]);
	}, 'path.to.property');

}
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT