## j-Extend

- jComponent `v19|v20`

This component is a specific component with powerful functionality. When the component is evaluated then it executes two events in the form below. The component can be helpful in web applications that can be dynamically extended.

__Configuration__:

- `name {String}` A name for extend, the component will emit `ON('extend_' + name)` event

The component emits only two events that you can catch somewhere:

```js
// NAME: is defined in the component configuration
ON('extend_NAME', function(opt) {
	// opt.name {String} with a value according to the "config.name"
	// opt.component {Instance of j-Extend}
	// opt.element {jQuery element}
	// opt.dom {Node}
});

ON('extend', function(opt) {
	// opt.name {String} with a value according to the "config.name"
	// opt.component {Instance of j-Extend}
	// opt.element {jQuery element}
	// opt.dom {Node}
});
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)