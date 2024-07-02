## j-ListMenuEditable

Component for editable list menu

- You can change CSS for your needs.

- jComponent `v19|v20`

__Configuration__:

- `iconremove {String}` optional, change `remove` button icon. It's fontawesome icon without `ti-` part (default: `times`)
- `defaulticon {String}` optional, change `edit` button icon (default: `pencil-alt`)
- `addicon {String}` optional, will change `add` button icon (default: `plus-square`)
- `placeholder {String}` optional, a placeholder for input (default: `Write text and press ENTER`)
- `class {String}` CSS class for selected item (default: `selected`)
- `title {String}` optional, will add title on top of list menu (important if you want use `addicon` and `addclick`)
- `key {String}` optional, a default `key` for `text` value (default: `name`)
- `click {String}` optional, action after click on item in menu. Path to function(element, index)
- `addclick {String}` optional, action after click on `add `button. Path to function() executes when user click on `add` icon
- `editclick {String}` optional, action after click on `edit` button. Path to function(element, index)

__Methods__:

- `component.add(object)` - This function will push object into path (can be null)
- `component.edit(index)` - Function will enable edit on element
- `component.remove(index)` - Function will remove the index

__Good to know__:

Path __must be__ array of objects. After click on item in menu
Supports dynamic evaluation of the content of `<script type="text/html">`. The example below contains a script with HTML and the component evaluates the content when the component is creating (only once).
```
<ui-component name="listmenueditable" path="tags">
	<script type="text/html">
		{{ if mycolor }}
			<i class="ti ti-circle" style="color: {{ mycolor }}"></i>
		{{ fi }}
		{{ name }}
	</script>
</ui-component>
```

__Adding of custom class__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', classname: 'your_class_name' });
```

__Toggle editable__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', editable: true });
```

### Author

- Denis Granec <info@totalavengers.com>
- [License](https://www.totaljs.com/license/)