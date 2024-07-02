# Exec

- jComponent `v19|v20`

The component executes a method when the user clicks on the same element with the `exec`, `exec2`, or `exec3` class. More information is below. The component is a singleton, and it works for the whole HTML document.

__Elements__:
- Elements can contain `data-exec` attribut with a method name which will be execute when the user click on the element.
- Elements can contain `data-href` attribute and the component performs `REDIRECT()`.

__Attributes__:
- `data-exec="METHOD_NAME"` executes a method when user clicks (supports plugin calls via `?` character)
- `data-prevent="true"` prevents continuing in the `click` event
- `data-href="URL"` performs `REDIRECT()`

__Attributes for the double click__:
- `data-exec2="METHOD_NAME"` executes a method when user clicks (supports plugin calls via `?` character)
- `data-prevent2="true"` prevents continuing in the `click` event
- `data-href2="URL"` performs `REDIRECT()`

__Attributes for the context-menu__:
- `data-exec3="METHOD_NAME"` executes a method when user clicks (supports plugin calls via `?` character)
- `data-href3="URL"` performs `REDIRECT()`

__Good to know__:

- the component executes a target function in the form `function(element, event)`
- `data-exec=`, `data-exec2=`, `data-exec3=` can contain `@METHOD_NAME` that will be executed in the current component plugin calls `component/METHOD_NAME(element, e)`


__NEW: Extensions__:

```js
SETTER('exec/register', function(exec, el, e, type) {

	// @exec {String} a value from data-exec
	// @el {jQuery element}
	// @e {Event}
	// @type {String} empty '': click, '2': double-click '3': context menu
	// registers a new extension

	if (exec.charAt(0) === '/') {

		EXEC('customplugin/' + exec.substring(1), el, e);

		// "return true" stops the next processing of Exec
		return true;

	}

});
```