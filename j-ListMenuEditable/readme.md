## j-ListMenuEditable

Component for editable list menu

- You can change CSS for your needs.

__Configuration__:

- `iconremove` {String} optional, change remove icon. It's fontawesome icon without `fa-` part (default: `times`)
- `addicon` {String} optional, will change `add` icon (default: `plus-square`)
- `defaulticon` {String} optional, change "edit" icon. You can disable this icon with value `0`. ONLY FOR NEW ITEMS (default: `pencil-alt`)
- `placeholder` {String} optional, a placeholder for input (default: `Write text and press ENTER`)
- `title` {String} optional, will add title on top of list menu
- `key` {String} optional, a default `key` for `text` value (default: `name`)
- `addclick` {String} optional, a path to function() executes when user click on `add` icon
- `editclick` {String} optional, a path to function(element, index)

__Methods__:

- `component.add()`
- `component.edit(element, index)`

__Good to know__:

Path __must be__ array of objects.

__Formatting via Tangular__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', template: '<b>{{ name }}</b>' });
```

__Adding of custom class__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', classname: 'your_class_name' });
```

__Setting selected__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', selected: true });
```

__Adding edit icon__:

```javascript
var opt = {};
opt.items = [];
opt.push({ name: 'Total.js', icon: 'pencil-alt' });
```

### Author

- Denis Granec <info@totalavengers.com>
- License: MIT