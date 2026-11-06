---
name: autocomplete
description: Shows search suggestions under an input or contenteditable field from a search function and passes the chosen value to a callback
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2016-05-06 12:22
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# AutoComplete

- works with `<input` tags only
- singleton
- __NEW__: works with `contenteditable` attribute

```javascript
var opt = {};

opt.element = 'YOUR_ELEMENT';

opt.search = function(query, render) {
	// `query` contains a value from the input
	// `render` is a function
	// Here we have to find a datasource and render argument helps with rendering HTML

	AJAX('GET /cities/', { q: query }, render);

	// or e.g.
	// render([{ name: 'Item 1', type: 'Pages' }, { name: 'Item 2', type: 'Widgets' }]);
};

opt.callback = function(value, input) {
	console.log('---> selected value:', value);
	// input.val('');
};
// opt.callback {Function}
// OR:
// opt.path {String} a path to variable (for result)

// opf.offsetWidth {Number} "width" offset
// opt.offsetX {Number} "x" offset
// opt.offsetX {Number} "y" offset
// opt.autoselect {Boolean} selects first suggestion automatically (default: false)

SETTER('autocomplete/show', opt);
```
