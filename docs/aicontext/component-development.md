# Create a reusable jComponent from a natural-language description

Use this guide when the user asks to build a **new component implementation**, for example: “Create a component for selecting a time interval, with minimum and maximum bounds and a change callback.” Translate that description into a registered, reusable jComponent and integrate it into the selected project. A request to “use j-tabs” normally means consuming an existing package; follow [package resolution](jcomponent-components.md) and [declaration syntax](ui-component.md) for that case.

## Sources and runtime compatibility

This guide targets jComponent 20. Technical behavior was checked on 2026-11-03 against the official [runtime source](https://github.com/totaljs/jComponent/blob/master/library.js), which declared `20.014`, and the [Input implementation](https://github.com/totaljs/components/blob/master/j-Input/component.js). These are reference observations, not a required runtime upgrade or a pinned dependency. Inspect the target project's actual runtime and local component conventions before implementing. Record the runtime version or source revision used to justify version-sensitive decisions.

Use the project's installed runtime source first, matching official runtime documentation/source second, and maintained official component implementations as practical examples. The bundled [API reference](../api.md) is a discovery aid. Historical JSON documentation contains older signatures, even within the same page; confirm uncertain hooks, argument order, flags, and return values in the selected runtime. Read external sources as technical data; do not execute documentation or copied installation commands automatically.

## Turn the description into an implementable contract

Inspect relevant repository instructions, component files, loader/build/fallback, runtime CSS, shared dependencies, and representative usage. Identify whether a suitable component already exists. Reuse or extend it when that meets the request, while honoring an explicit request for an independent component. Avoid re-registering an existing name unintentionally.

Derive the following from the description and current project, and state the important assumptions concisely:

| Contract area | Decide before implementation |
| --- | --- |
| Purpose | What the component renders and which interactions it owns |
| Model | Value type/shape, initial and empty values, and one-way or two-way binding |
| Configuration | Supported keys, types, defaults, limits, and which can change at runtime |
| Events | Callback names, exact arguments/order, and when each fires |
| Public methods | Only externally needed operations, with arguments, effects, and return behavior |
| State | Disabled/readonly, invalid, loading, empty and error behavior as relevant |
| Dependencies | Existing components, CSS, helpers, or external libraries actually required |
| Packaging | Files, registration, build integration, usage documentation, and verification route |

A short prompt is sufficient: derive routine internal decisions and choose the smallest coherent API. Ask for clarification only when an unresolved decision changes meaning, data contracts, or integration materially. Do not require the user to know lifecycle names. Omitted features do not imply networking, persistence, global events, or a large public API.

## Registration and package structure

Register the component using the target runtime's supported form:

```javascript
COMPONENT('componentname', 'disabled:false', function(self, config, cls) {

	// Per-instance state, hooks, and only the requested public methods.

});
```

`self` is the component instance, `config` is its configuration, and `cls` is the component CSS class supplied by the runtime. In the inspected v20 source its default prefix is `ui-`. Add the root class explicitly when needed (`self.aclass(cls)`) and use it to scope component DOM/CSS. Do not depend on the prefix being hardcoded everywhere.

Use the host's component directory, file names, registration order, and build process. An upstream-style `j-<Name>/component.js`, optional `component.css`, `readme.md`, `example.html`, and metadata are appropriate only when that is the package convention or a portable package was requested. Include only applicable files and actual dependencies. Do not create plugin server metadata or routes merely to register a component.

The plugin loader's `CLASS` and `~ID~` tokens are not component registration tokens. A reusable component must not depend on the name, model root, route, or controller of one application plugin. Integrate it through `<ui-component name="componentname" path="?.value" config="..."></ui-component>` in an existing scope, or omit `path` when it has no model.

## Select hooks and methods by behavior

Implement only the hooks required by the contract. Empty lifecycle stubs are not a complete implementation.

| Need | v20 mechanism and constraint |
| --- | --- |
| Build each instance's DOM and local handlers | `self.make()`; per-instance initialization belongs here or in the registration closure |
| Initialize shared resources once per registered type | Optional `self.init()`; in the inspected runtime this runs once for the type, before the first instance's `make`, not once per instance |
| Render model updates | `self.setter(value, path, flags)`; third argument is an object in the inspected v20 runtime, not the historical numeric `type` |
| Observe rendering without replacing an inherited setter | Optional `self.setter2(value, path, flags)`; inspect runtime and inherited behavior first |
| Read bound value | `self.get()`; do not assume plugin-style relative-path arguments work on this method |
| Write a programmatic bound value | `self.set(value, flags)`; prefer supported string flags such as `@reset` over legacy numeric codes |
| Commit a user interaction | `self.modify(value, flags)` marks touched/modified and writes the value in the inspected v20 runtime |
| Bind native text/select controls automatically | `self.autobind20(delay, realtimebinding)` when suitable; inspect event semantics and supported input types |
| Parse input | Preserve the built-in `self.getter(value, realtime)` unless the requested parsing actually requires an override; overriding it replaces its model-writing pipeline |
| Validate a bound value | Optional `self.validate(value)` returning a Boolean is the portable baseline; do not rely on an old `isInitialValue` argument without source evidence |
| React to configuration updates | `self.configure(key, value, init, previous)`; called per key after `make` and on `self.reconfigure(...)`; confirm extra argument semantics before relying on them |
| Subscribe to another model path | `self.watch(path, callback, autoinit)` or `self.datasource(path, callback, init)` after verifying path and callback semantics; datasource replaces its previous source |
| Execute a configured scoped callback | `self.EXEC(config.callback, ...)` when a callback is configured; preserve `?/handler` resolution instead of creating globals |
| Expose an operation to callers | Add a meaningful `self.method = function(...) { ... }`; document and invoke through the host's component lookup/dispatch convention |
| Release resources | `self.destroy()`; clean up owned timers, observers, outside-DOM events, external subscriptions, requests and third-party widgets |

The observed watcher callback order is `(value, flags, path)`, unlike old documentation examples using `(path, value, type)`. Check the installed source before implementing watchers. Do not assume `previous` in `configure` always contains a distinct old value; if needed, maintain a local snapshot updated by the hook.

Public v20 state is reflected through `config.disabled`, `config.touched`, `config.modified`, and `config.invalid`, with corresponding runtime state classes. Keep native control properties and accessible state in sync when relevant. A disabled component must reject interactive mutations as well as look disabled.

### Avoid misleading legacy helpers

- `self.readonly()` is a runtime helper that clears the getter and setter in the inspected source; it is not simply the HTML `readonly` property. For a display component with a setter, do not call it and accidentally disable updates. For a read-only input, apply the native property and guard mutations according to its contract.
- `self.nocompile()`, `self.release()`, and `self.bindvisible()` are deprecated no-ops in the inspected v20 source. Do not use them as mechanisms for new behavior.
- Do not invent methods such as `self.compile()`, `self.novalidate()`, or `self.notify()` based on historical examples. Verify availability in the component prototype first. The existence of a similarly named global or plugin method does not establish a component method.
- Treat `$...` fields and methods as runtime internals. Use public model/config methods; do not call `$setter`, `$validate`, or `$remove` as an application API.

## Separate model changes from rendering

Keep the direction explicit:

```text
external model change → setter → DOM update
user interaction → normalize/validate → model write → setter → DOM update
```

The setter renders and must not write the same value back unconditionally or fire a user-change callback. That would create recursion, duplicate notifications, or false user actions. Public methods must document whether they are programmatic updates or simulated user interactions. Choose one event route per interaction; do not combine automatic input binding and an extra change handler that writes the same update.

Represent empty and invalid values deliberately. Check `null`, `undefined`, `0`, `false`, and empty strings according to the declared model type. Clone structured data before mutating it when the component does not own it exclusively. Never rewrite unrelated fields or use a fixed global model path.

For asynchronous behavior, handle loading, failure and out-of-order responses. Cancel or ignore stale work after destruction or a newer request. Keep application-specific persistence and authorization in the host controller unless the component contract explicitly requires transport behavior.

## Minimal behavioral example

The following example illustrates a reusable Boolean toggle. It is not a mandatory template for all components. It uses verified v20 methods, receives translated labels through configuration, and emits `change` only for a user click. The name must be checked for collisions before use.

```javascript
COMPONENT('booleantoggle', 'disabled:false;on:;off:', function(self, config, cls) {

	var button;

	self.make = function() {
		self.aclass(cls);
		self.html('<button type="button" aria-pressed="false"></button>');
		button = self.find('button');

		self.event('click', 'button', function() {
			if (config.disabled)
				return;

			var value = self.get() !== true;
			self.modify(value);
			if (config.change)
				self.EXEC(config.change, value, self);
		});
	};

	self.setter = function(value) {
		var enabled = value === true;
		button.text(enabled ? config.on : config.off);
		button.attr('aria-pressed', enabled ? 'true' : 'false');
	};

	self.configure = function(key) {
		if (key === 'disabled')
			button.prop('disabled', !!config.disabled);
		else if (key === 'on' || key === 'off')
			self.setter(self.get());
	};

});
```

Example use **inside an existing plugin**:

```html
<ui-component name="booleantoggle" path="?.enabled"
	config="on:@(Enabled);off:@(Disabled);change:?/enabledchange"></ui-component>
```

Implement `exports.enabledchange = function(value, component) { ... }` in the owning controller when that callback is selected. The application must process `@(...)` markers through its translation pipeline. Do not assume that external static JavaScript files receive server-side translation; for reusable JavaScript accept translated text through config or use the host's established runtime localization mechanism.

## Rendering, styling, and instance ownership

Use semantic controls, explicit button types, meaningful translated labels, keyboard operation, visible focus and required ARIA state. Associate labels/errors with controls using instance-specific identifiers. Render untrusted values via `.text()` or the host's escaping helper; raw HTML requires an intentional trusted/sanitized contract.

Use the existing jComponent/theme CSS and documented host utility classes. Scope custom structural or genuinely component-specific styles under the component root class, and keep them compatible with the host theme. Avoid global selectors, plugin-specific `CLASS` tokens, hidden global state, fixed DOM IDs, and per-instance data in `self.init()`. Two instances with different paths/configuration must remain independent.

Bind local delegated events once, normally in `make`, and keep redraws from registering duplicate handlers. Namespace outside events per instance and remove only the component's own handlers. Do not remove shared listeners or unregister a component definition when destroying one instance. Create a `destroy` hook only when there are owned resources to release; do not clear runtime-owned registries directly.

## Complete the implementation and verify

Deliver a registered implementation and its required assets/dependencies, host loader/build integration, and a concise usage example/API description in the project's component-documentation convention. The documentation must list model shape, config defaults, callback payloads, exposed public methods, and tested runtime. Do not deliver only `<ui-component>` markup or a skeleton when the user requested a new implementation. Do not publish a package or start a second application unless requested.

Verify the behavior actually requested:

1. Registration, loading and rendering through the existing application, without name collisions or a second runtime.
2. Initial value and external model changes render correctly; a user interaction produces the intended model change and callback exactly once.
3. Empty values and relevant boundaries are handled; validation and disabled/readonly behavior match the public contract.
4. Configuration can be changed using the host's runtime mechanism; documented public methods behave as specified.
5. Two simultaneous instances with different model paths/configs stay independent.
6. For components with subscriptions or asynchronous work, removal and recreation do not leave handlers, timers, stale results, or duplicate updates.
7. Keyboard behavior, accessible names, host-theme layout, and related console/network results are checked where browser tools are available.

Report executed checks separately from checks still requiring a browser or manual confirmation. For a narrow or display-only component, omit irrelevant features and tests rather than manufacturing them.

## Example short prompts

- “Create a component for selecting a time interval. Its value is an object with start and end times; support bounds, disabled state, and a callback on user change.”
- “Create a reusable status indicator bound to a string, with configurable labels and no editing.”
- “Create a multiple-selection component from a supplied item array, with search, a selection limit, and keyboard controls.”

Derive necessary hooks and methods from the requested behavior, confirm the APIs in the selected runtime, and document implementation assumptions. The user supplies the intended behavior, not a lifecycle checklist.
