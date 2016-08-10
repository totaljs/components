- easy usage
- works with `<input` tags only
- singleton

```html
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
	// render([{ name: 'Item 1', category: 'Pages' }, { name: 'Item 2', category: 'Widgets' }]);
}

function onSelected(value, input) {
    console.log('---> selected value:', value);
    // input.val('');
}

var plusOffsetTop = 14;
FIND('autocomplete').attach('jquery-selector', onSearch, onSelected, plusOffsetTop);
```

### Author

Peter Širka <petersirka@gmail.com>
License: MIT