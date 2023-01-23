## j-Paper (BETA)

- a very complex component
- output is a simple `Object Array` structure:
	- `[{ id: String, widget: String, newbie: Boolean, changed: Boolean, config: Object }]`
- widgets repository: https://github.com/totaljs/parts/tree/main/paper

__Configuration__:

- `readonly {Number}` enables/disables readonly mode `0=disabled`, `1=partially enabled`, `2=fully enabled`
- `parent {String}` optional, a parent element for min-height (default: `null`)
- `margin {Number}` additional margin for min-height (default: `0`)
- `autosave {Boolean}` changes are serialized according to the path automatically
- `widgets {String}` a link to the widgets (default: Componentator CDN)
	- it can contain multiple addresses divided by the comma `mywidget1.html,/mywidget2.html,etc..`
	- or you can keep [CDN structure](https://github.com/totaljs/parts/blob/main/cdn/paper/db.json)
- `icon {String}` a link to the `function(opt, callback)`
	- `opt.element {jQuery element}`
	- __IMPORTANT__: call the `callback` argument if the icon has been changed in the element
- `link {String}` a link to the `function(opt)`
	- `opt.element {jQuery element}`
	- `opt.href {String}`
	- `opt.target {String}`
	- `opt.widget {Object}` a widget instance
- `command {String}` a link to the `function(cmd)`
	- `cmd.widget {Object}` a temporary widget instance
	- `cmd.widgets {Array}` a list of registered widgets
	- `cmd.remove() {Function}` removes widget
	- `cmd.append(name)` replaces the current temporary widget with a new widget (`name` name of widget)
- `format {String}` a link to the `function(toolbar)`
	- `toolbar` can be `null`
	- `toolbar.element {jQuery element}` a current element
	- `toolbar.node {HTML element}` a current element
	- `toolbar.widget {Object}` a widget instance
	- `toolbar.style {Object}` contains a current style e.g. `bold: 1, link: 1`
- `upload {String}` a link to the `function(opt, callback)`
	- `opt.accept {String}` optional
	- `opt.files {FileList}` optional
	- `opt.multiple {Boolean}` optional, default: `false`
	- `opt.width {Number}` optional
	- `opt.height {Number}` optional
	- __IMPORTANT__: `callback` argument must be executed after upload with the `files {Array}` argument
- `change {String}` a link to the `function(change)`
	- `change.id {String}` identifier
	- `change.block {String}` a block identifier
	- `change.blockprev {String}` a previous block identifier
	- `change.widget {String}` a widget id
	- `change.type {String}` operation type (insert, update, remove)
- `contextmenu {String}` a link to the `function(widget)` when the user pressed the right mouse button on the widget
- `check {String}` a link to the `function(widget)` that decides whether to enable editing or not

__Methods__:

- `component.save(function(data, ischange) {` for saving content
- `component.import(url or url_array, [callback])` for importing additional widgets

__Good to know__:

The component creates a global variable called `window.papercache {Object}` used by all `j-Paper` instances.

- the component compares the content when you change data, so you can change data in real-time
- the component assigns (in the form) `paper-yourwidgetname` class to every widget element
- reserved HTML classes `readonly`, `widget`, `selected`
- `htmlelement.$widget {Object}` contains a widget instance
	- `widget.remove()` method will remove the widget

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)