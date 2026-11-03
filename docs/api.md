# jComponent API reference

Short reference for writing components for the Total.js UI library (jComponent `v20`, `https://cdn.componentator.com/spa.min@20.js`). The part below "Generated list" is extracted from the doc comments of the library source; the rest comes from how the existing components use it.

## The component function

```js
COMPONENT(name, config, function(self, config, cls, element) { ... });
```

- `name` is lower case, without `j-`. It is used in HTML as `<ui-component name="name" path="path" config="key:value;key2:value">`.
- `config` is a configuration string `key:value;key2:value` with the defaults. Values are parsed: `10` is a number, `true`/`false` booleans. The tag's `config` attribute overrides them.
- `self` is the instance, `config` the parsed configuration object, `cls` the CSS class `ui-<name>`, `element` the jQuery element.
- `self.element` is the jQuery element, `self.dom` the DOM element, `self.path` the bound path, `self.id` the instance id.

## Members you implement (all optional)

| Member | When it runs |
| --- | --- |
| `self.init = function()` | once for the component type, before the first instance (globals, `Thelpers`, shared state) |
| `self.make = function()` | once per instance when it is created (build the DOM, register events) |
| `self.setter = function(value, path, type)` | the value on `path` changed (including the first time) |
| `self.getter = function(value, ...)` | the user changed something; calls `self.set` through the default implementation |
| `self.validate = function(value)` | returns `true` when valid (used with `config.required`) |
| `self.configure = function(key, value, init)` | a configuration key changed; `init` is `true` on the first pass |
| `self.state = function(type, what)` | the state changed (dirty, valid, ...) |
| `self.destroy = function()` | the element was removed, clean timers and global events |
| `self.resize = function()` | the window or the parent was resized |

Declarations called inside the component function: `self.nocompile()` (do not compile the HTML inside the tag), `self.readonly()` (no validation or state), `self.singleton()` (one instance for the whole page).

## Helpers on `self` (jQuery-like)

`self.aclass(cls)` add class, `self.rclass(cls)` remove, `self.tclass(cls, bool)` toggle, `self.hclass(cls)` has, `self.find(selector)`, `self.event(events, [selector], handler)`, `self.html(value)`, `self.append(html)`, `self.css(obj)`, `self.attr`, `self.get()`, `self.set(value)`, `self.dirty(false)`, `self.check()`, `self.makepath(path)` (resolves `?` and `*` in paths), `self.on(name, fn)`, `self.watch(path, fn)`, `self.change(true)`. Plus the ones in the generated list.

## Paths

- `path="form.name"` binds to `GET('form.name')` and `SET('form.name', value)`.
- `?` is replaced by the path of the parent `<ui-plugin>` (`self.makepath('?.items')`). A leading `*` is the common path prefix of the library (the example uses `path="*form"`).
- `SET`, `GET`, `UPD`, `PUSH`, `CMD`, `SETTER('component/method', ...)` and `EXEC` work from outside the component.

## Dark and large mode

The library toggles classes on `body`: `ui-dark` and `ui-large`. To try them in an example:

```js
APPEARANCE({ dark: true });
APPEARANCE({ dark: false, large: true });
```

The CSS variables `--color`, `--rgb`, `--radius`, `--gap` and `--margin` can be changed in the same call (`APPEARANCE({ color: '#E91E63' })`).

## Icons

Total.js icons: `<i class="ti ti-home"></i>`. `self.icon(value)` adds the prefix when the config value has none.

## Generated list

## Component

- `instance.readonly()`: The method disables validation.
- `instance.singleton()`: The method enables changes the component instance to a singleton.
- `instance.set(value, [flags])` (value {String}; [flags] {String} with @): The method assigns a value to the model and calls `setter`.
- `instance.rewrite(value, [flags])` (value {String}; [flags] {String} with @): The method assigns a value to the model without calling the setter.
- `instance.get()`: The method reads a value from the model.
- `instance.on(name, callback)`: The method registers a global event.
- `instance.watch(path, callback)`: The method registers a new watcher to capture changes based on the path.
- `instance.unwatch(path, [callback])`: The method unregisters an existing watcher.
- `instance.emit(name, [a], [b], [c], [d])`: The method emits a global event within Total.js UI library.
- `instance.parent(selector)` (selector {String}): The method tries to find parent element according to the selector.
- `instance.modify(value, [type])`: The method assigns a value to the model, sets a state to `touched` and calls `setter`.
- `instance.touch()`: The method simulates user "touch".
- `instance.reset()`: The method resets the state.
- `instance.reconfigure(value)`: The method reconfigures the component. The `value` can be `String` or `Object`.
- `instance.refresh()`: The method refreshes value (in other words, it calls instance.setter()).
- `instance.command(name, callback)` (name {String}; callback {Function(a, b, c, d, e)}): The method registers a new command.
- `instance.CMD(name, [a], [b], [c], [d])` (name {String}; [a] {Object}; [b] {Object}; [c] {Object}; [d] {Object}): The method executes a command with custom arguments.
- `instance.icon(value)` (value {String}): The method checks if it is needed to add the icon prefix defined in `DEF.iconprefix`.
- `instance.caniuse(name)` (name {String}; return {String}): The method checks if the component `name` is defined or not. You can use multiple names in the form `message|notify`.
- `instance.replace(target, [remove])` (target {Element/jQuery}; [remove] {Boolean}): The method moves the component into another element defined in the `target` argument.

## Globals

- `NOOP()` (return {Function}): The method returns empty function that means "no operation".
- `inDOM(element)` (element {Element}; return {Boolean}): The method returns if the element is attached in the DOM.
- `ON(name, callback)` (name {String}; callback {Function(a, b, c, d)}): The method registers a new handler for capturing a specific event.
- `OFF(name, [callback])` (name {String}; [callback] {Function}): The method removes the existing handler for capturing a specific event.
- `EMIT(name, [a], [b], [c], [d])` (name {String}; [a] {Object}; [b] {Object}; [c] {Object}; [d] {Object}): The method emits a specific event to all plugins and components.
- `ATTRD(el, attrd)` (el {jQuery/Element}; attrd {String} attribute name (default: `id`); return {String}): The method tries to read closest `data-{attrd}` value.
- `SET(path, value)` (path {String}; value {Object}): The method sets and notifies all UI components and watchers based on the path.
- `GET(path)` (path {String}; return {Object}): Based on the path, the method returns a value.
- `UPD(path)` (path {String}): The method notifies all UI components and watchers based on the path.
- `COMPONENTS(path)` (path {String}): The method returns all components on the specific path. It supports flags @touched, @visible, @modified, @invalid, @disabled, @enabled, @required
- `COMPONENT(name, [config], callback, [dependencies])` (path {String}; [config] {Object}; callback {Function(self, config, cls, element)}; [dependencies] {String}): The method registers a new component declaration.
- `PLUGIN(path, [config], callback, [dependencies])` (path {String}; [config] {Object}; callback {Function(self, config, element, cls)}; [dependencies] {String}): The method registers a new plugin declaration.
- `ERRORS(path, callback)` (path {String|jQuery Element}; callback {Function(arr)}): The method returns errors based on the path in the callback argument.
- `HIDDEN(el)` (el {jQuery/Element}): The method determines whether the element is visible or not.
- `VISIBLE(el, [threshold], [mode])` (el {jQuery/Element}; [threshold] {Number}; mode {visible|above|below}; return {Boolean}): The method checks if the element is visible on the screen.
- `NOTFOCUSED()` (return {Boolean}): The method checks if the browser window is focused or not.
- `SCROLLBAR(element, options)` (element {String/jQuery/Element}; options {Object}; return {Scrollbar}): The method wraps the `element` with a custom scrollbar.
- `SCROLLBARWIDTH()` (return {Number}): The method returns the width of the scrollbar.
- `WIDTH(element)` (element {String/jQuery}; return {Number}): The method returns the element's width.
- `ENV(name, value)` (name {String}; value {String}): The method registers a new environment variable.
- `ENV(name)` (name {String}; returns {String}): The method reads the value of the environment variable.
- `HASH(value)` (value {String/Number/Boolean/Object/Date}): The method creates a hash from the `value`.
- `WARN(a, [b], [c], [d])` (a {Object}; [b] {Object}; [c] {Object}; [d] {Object}): The method prints a warning on the web dev console.
- `GUID([length])` (length {Number}): The method generates a unique identifier randomly. The `length {Number}` argument can affect its length.
- `AJAX(url, [data], callback)` (url {String}; [data] {Object}; callback {Function(response)}, #onprogress {Function(percentage)}): The method parsers JSON and converts all dates to `Date` object.
- `ADAPT(path, id, text)` (path {String}; id {String}; text {String}; return {String}): The method replaces all keywords `CLASS` and `~PATH~` for the `path` value, and `~ID~` for the `id` value in the `text` argument.
- `IMPORT(url, [target], callback)` (url {String}; [target] {String/jQuery/Element}; callback {Function}): The method imports external sources like JavaScript libaries, CSS libraries, UI components or parts. Supported flags: @prepend, @singleton, <global_variable_name>, url .extension, .
- `PARSE(value)` (value {String}; return {Object}): The method parsers JSON and converts all dates to `Date` object.
- `CACHE(key, value, expire)` (key {String}; value {Object}; expire {String}): @Method: CACHE(key); #key {String}; #return {Object}; The method reads or writes persistent data into the `localStorage`.
- `LOCALIZE(text)` (text {String}; return {String}): The method loads a localization dictionary. The format must be the same as the Total.js resource file.
- `LOCALIZE(text)` (text {String}; return {String}): The method translates the Total.js localization markup as `@(text to translate)`. The localization dictionary must be loaded via the `LOCALIZE()` method.
- `ERROR(response, success, error)` (response {Object}; success {Function(response)}; error {Function(response)}): The method processes errors.
- `EXTENSION(name, config, callback)` (name {String}; config {String/Object}; callback {Function(instance, config, element, cls)}): The method extends UI components `component_name` or plugins `@plugin_name`.
- `CONFIG(selector, config)` (selector {String/Function(instance)}; config {String/Object}): The method reconfigure all existing and new components. Possible selectors: `#component_id`, `.component_path`, `component_name`.

## Path

- `instance.includes(path)` (path {String}; partially {Boolean}; return {Boolean}): The method checks to see if the path is part of the route.
- `instance.assign(path)` (path {String}): The method assigns a new path to the current path instance.
- `instance.get(scope)` (scope {Object}): The method reads a `value` based on a `path` in the defined `scope`.
- `instance.set(scope, value)` (scope {Object}; value {String/Number/Boolean/Object/Date}): The method assigns a `value` based on a `path` to the defined `scope`.
- `instance.notify(scope)` (scope {Object}): The method notifies all watchers based on the path.
- `instance.exec([callback])` ([callback] {Function()}): The method executes flags and code lists.
- `instance.find(scope, callback)` (scope {object}; callback {Function(arr)}): The method returns in the callback all component instances defined in the path scope.

## jQuery extensions

- `$(selector).multiple({ input: 'selector', textarea: 'selector' })`: The method searches for all elements based on the object keys.
- `$(selector).autofocus([selector])`: The method performs auto-focus for `selector`. Default: `selector` value `input,textarea,select`.
- `$(selector).plugin()`: The method finds the closest plugin.
- `$(selector).aclass(cls, [timeout])`: The method appends CSS class to the current element.
- `$(selector).rclass(cls, [timeout])`: The method removes CSS class from the current element.
- `$(selector).rattr(name)`: The method removes attribute.
- `$(selector).rattrd(name)`: The method removes `data` attribute.
- `$(selector).rclass2(find, [timeout])`: The method removes all CSS classes that contain the `find` phrase.
- `$(selector).hclass(name)`: The method checks if the element contains a defined CSS class.
- `$(selector).tclass(name, [enable])`: The method toggles the CSS class for the current element.
- `$(selector).attrd(name, value)`: The method assigns a `value` to the current element's specific attribute `name`.
- `$(selector).attrd2(name, value)`: The method tries to find a data attribute value in the parent tree of the current element.
- `$(selector).asvg(tag)`: The method creates an SVG element.

## String.prototype

- `String.prototype.parseConfig([def], [noconvert])` (def {String|Object} a default configuration; noconvert {Boolean} disables number/boolean/datetime conversation; returns {Object}): The method parses Total.js UI library configuration in the form `key1:value;key2:value`.
- `String.prototype.isJSONDate()` (return {Boolean}): The method checks if the string is a serialized JSON date.
- `String.prototype.VARIABLES(args)` (args {Object}; return {String}): The method applies `--VARIABLE--` defined in the `args` argument in the current string.
- `String.prototype.args(obj, [encode])` (obj {Object} payload, #encode {String/Function(key, value)} supported values `json`, `escape` and `encode`; return {String}): The method checks if the string is a serialized JSON date.

## String prototype

- `String.prototype.format([index0], [index1], [index2])`: The method replaces all indexes in the form `{index}` with values defined as arguments.
- `String.prototype.env()`: The method replaces all phrases `[key]` with values defined in the environment.

## Array.prototype

- `Array.prototype.group(key)` (return {Array}): The method groups items according to the @key field.
- `Array.prototype.trim()` (return {Array}): The method trims all string values, and empty values will be skipped.

## Date.prototype

- `Date.prototype.add(value)` (value {String} #return {Date}): The method extends the current `Date` with the declared `value`.

## Plugin

- `instance.parent(selector)` (selector {String}): The method tries to find parent element according to the selector.
- `instance.get(path)`: The method reads a value from the plugin model.
- `instance.set(path, value)`: The method assigns a `value` based on a `path` to the defined plugin `scope`.
- `instance.push(path, value)`: The method pushes a `value` based on a `path` to the defined plugin `scope`.
- `instance.inc(path, value)`: The method increments a `value` based on a `path` to the defined plugin `scope`.
- `instance.toggle(path)`: The method toggles a `value` based on a `path` to the defined plugin `scope`.
- `instance.set(path, value)`: The method assigns a `value` based on a `path` to the defined plugin `scope`.
- `instance.update(path)`: The method notifies all components and watchers based on the path.
- `instance.on(name, callback)`: The method registers a global event.
- `instance.emit(name, [a], [b], [c], [d])`: The method emits a global event within Total.js UI library.
- `instance.watch(path, callback)`: The method registers a new watcher to capture changes based on the path.

## Core

- `jComponent.free()`: The method clears all removed components, binders and plugins.
- `jComponent.set(scope, path, value)` (scope {Object}; path {String}; value {Object}): The method assigns a `value` based on a `path` to the defined `scope`.
- `jComponent.get(scope, path)` (scope {Object}; path {String}; return {String/Boolean/Object}): The method reads a `value` based on a `path` in the defined `scope`.
- `jComponent.find(scope, path, callback)` (scope {object}; path {String}; callback {Function(arr)}): The method returns in the callback all component instances defined in the path scope.
- `jComponent.notify(scope, path, [onlyflags])` (scope {Object}; path {String}; onlyflags {Boolean} optional default "false"): The method notifies all watchers based on a `path` ot the defined `scope`.
- `jComponent.cl(name, callback)` (name {String}; callback {Function()}): The method inicializes codelists.
