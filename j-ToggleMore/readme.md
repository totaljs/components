## j-ToggleMore

Is a simple component to toggle content.

- You can change CSS for your needs.

__Methods__:

- `component.toggle(force)` can toggle the component. Parameter `force` is optional and will force the value. eg. `component.toggle(true);` will show `ui-togglemore-after`.

__Good to know__:

The content of the `j-ToggleMore` is divided to 2 parts: `before` and `after`. Each part must be defined. The component adds CSS classes to each part, for example first `div` will contain `ui-togglemore-before` and second `ui-togglemore-after`.
To avoid "blink" add class `hidden` to second `div`.

---

```html
<div data---="togglemore__path__config">
	<div>
		Content before
	</div>
	<div class="hidden">
		Content after
	</div>
</div>
```

### Author

- Denis Granec <info@totalavengers.com>
- [License](https://www.totaljs.com/licenses/)