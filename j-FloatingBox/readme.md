## j-FloatingBox

- singleton
- supports __dark mode__

__Configuration__:

- `zindex {Number}` a default z-index for forms (default: `10`)

### Boxes

```html
<div class="floatingbox" data-id="yourid" data-config="">
	Your content
</div>
```

__Configuration__:

- `init {String}` a link to the method, it's executed when the box is initialized the first time `function(element)`
- `reload {String}` a link to the method `function(element)`
- `hide {String}` a link to the method, it's executed when the box is going to hide `function(element)`
- `scope {String}` a custom scope/plugin name
- `zindex {Number}` a custom z-index for this box

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)