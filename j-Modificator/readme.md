# j-Modificator

This component can modify behaviour of element according to the preddefined schema. The component can be hooked on a `body` element (because it's singleton) and it's optimized for the performance.

__Supported attributes__:

- `data-m="SOME.PATH"` - the component will watch this path
- `data-m-schema="schema_name"` - modificator uses this registered schema
- `data-m-selector=".ui-textbox-label"` (optional) a target element will be an element according to the selector (default: `null`)
- __NEW UPDATE__: `data-m="SOME.PATH + schema_name"` this attribute can contain `path` and `schema_name` together

__Supported classes__:

- `modify` enables `click` event for this element `e.type` will contain `click` type

__Registering schema__:

- you can define multiple schemas

```javascript
instance.register('schema_name', function(value, element, e) {

    // value: according to the "data-m"
    // element: jQuery element (target)
    // e: contains additional data { type: 'init/click/bind' } and can be used as a repository

    // here you can modify the element
});
```

For more info look into the example.

__Scopes__:

j-Modificator supports jComponent scopes but each path in the scope needs to contain `?` question mark e.g. `data-m="?.name"` which is replaced with a scope path. __Important:__ jComponent scope needs to contain some jComponents.

```html
<div data-jc-scope="user">
	<div data-jc="textbox" data-jc-path="name">Your name</div>
	<div data-m="?.name"></div>
</div>
```