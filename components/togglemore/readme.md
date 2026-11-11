---
name: ToggleMore
description: Is a simple component to toggle content.
author: Denis Granec
version: 1
darkmode: false
license: https://www.totaljs.com/license/
created: 2019-06-03 18:27
updated: 2023-01-21 23:07
jcomponent: v19,v20
---

# ToggleMore

Is a simple component to toggle content.

- You can change CSS for your needs.

__Methods__:

- `component.toggle(force)` can toggle the component. The parameter `force` is optional and will force the value. eg. `component.toggle(true);` will show `ui-togglemore-after`.

__Good to know__:

The content of the `j-ToggleMore` is divided into 2 parts: `before` and `after`. Each part must be defined. The component adds CSS classes to each part, for example first `div` will contain `ui-togglemore-before` and the second `ui-togglemore-after`.
To avoid "blink" add class `hidden` to the second `div`.

---

```html
<ui-component name="togglemore">
	<div>
		Content before
	</div>
	<div class="hidden">
		Content after
	</div>
</ui-component>
```
