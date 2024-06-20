## j-FormTab

- The component moves the content of this component under `<body>` tag (because of positioning)
- The component expects array

- jComponent `v19|v20`

__Configuration__:

- `width {Number}` width of form
- `widthlg {Number}` width of form for `lg` devices (default: `config.width`)
- `widthmd {Number}` width of form for `md` devices (default: `config.width`)
- `widthsm {Number}` width of form for `sm` devices (default: `config.width`)
- `widthxs {Number}` width of form for `xs` devices (default: `config.width`)
- `height {Number}` height of form
- `heightlg {Number}` height of form for `lg` devices (default: `config.height`)
- `heightmd {Number}` height of form for `md` devices (default: `config.height`)
- `heightsm {Number}` height of form for `sm` devices (default: `config.height`)
- `heightxs {Number}` height of form for `xs` devices (default: `config.height`)
- `margin {Number}` a default margin between forms (default: `10`)
- `marginlg {Number}` a default margin for `lg` devices (default: `config.margin`)
- `marginmd {Number}` a default margin for `md` devices (default: `config.margin`)
- `marginsm {Number}` a default margin for `sm` devices (default: `config.margin`)
- `marginxs {Number}` a default margin for `xs` devices (default: `config.margin`)
- `marginfullscreen {Number}` a default margin for fullscreen mode (default: `20`)
- `marginfullscreenlg {Number}` a default fullscreen margin for `lg` devices (default: `config.marginfullscreen`)
- `marginfullscreenmd {Number}` a default fullscreen margin for `md` devices (default: `config.marginfullscreen`)
- `marginfullscreensm {Number}` a default fullscreen margin for `sm` devices (default: `config.marginfullscreen`)
- `marginfullscreenxs {Number}` a default fullscreen margin for `xs` devices (default: `config.marginfullscreen`)
- `submit {String}` link to a global function `function(meta, data, hide)` and it's executed if the submit button is pressed
- `cancel {String}` link to a global function and it's executed if the `cancel` button is pressed
- `enter {Boolean}` captures `enter` key automatically and virtually clicks on the submit button (default: `false`)
- `onclose {String}` a link to function `function(item, close)` (optional)
- `onopen {String}` a link to function `function(item, el)` (optional)
- `autofocus {Boolean}` enables auto-focus for the first input (default: `false`)
- __NEW__ `right {Number}` right margin (defualt: `0`)
- __NEW__ `bottom {Number}` bottom margin (defualt: `0`)
- __NEW__ `useminheight {Boolean}` use `min-height` instead of `height` CSS attribute (default: `false`)

__Good to know__:

- each element with `cancel` class will be used as a cancel button

__Data-Source__:

```javascript
[
	{
		// Required
		id: 'YOUR_ID_OF_THE_FORM',
		name: 'YOUR_NAME_OF_THE_FORM',

		// Optional
		minimized: true,
		data: { blabla: '"data" will be cloned into the form scope' }
		// NEW: scope: false (disables scope)
		// NEW: scope: mycustomscopepath
	}
]
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)