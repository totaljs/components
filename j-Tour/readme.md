## j-Tour (BETA)

- Supports keyboard arrows
- Supports `tab` key
- Supports `esc` key

__IMPORTANT: Put this component on the bottom of the body element__

__Configuration__:

- `escape` {Boolean} toggle possibility to hide Tour with `esc` key (default: `true`)
- `skiptext` {String} a text of the `skip` button (default: `Skip`)
- `nexttext` {String} a text of the `next` button (default: `Next`)
- `backtext` {String} a text of the `back` button (default: `Back`)
- `endtext` {String} a text of the `end` button (default: `End`)
- `datasource` {String} path to data-source
- `bghide` {Number} toggle possibility to hide Tour by clicking on the background (default: `false`)
- `hide` {String} path to method `function(type)` (type - 0: by PATH (e.g. null) 1: end button 2: skip button 3: `esc` key 4: click on bg)

```javascript
// datasource
var example = [
	{
		target: '.test1',
		title: 'My title 1',
		text: 'Message 1'
	},
	{
		target: '.test2',
		title: 'My title 2',
		text: 'Message with offset',
		offsetY: 10
	}
];
```

__PATH is the actual tour `page`__

### Author

- Denis Granec <info@totalavengers.com>
- [License](https://www.totaljs.com/license/)
