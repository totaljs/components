## j-Emoji

- Using UTF emoji
- Personal history with frequently used emoticons
- Great search tool
- Changeable skin tones

__Configuration__:

- `categories {String}` change emoticons in categories. Use unicode without special characters (default: `128342,128578,128161,127944,128008,128690,128172,127828,127937`)
- `height {Number}` set component height (default: `295`)
- `history {Number}` history limit for frequently used emoticons (default: `49`)
- `empty {String}` a message when no emoticons are found  (default: `No emoji match your search`)
- `emptyemoji {Number}` change emoticon when no emoticons are found. Use unicode without special characters (default: `128557`)
- `speed {Number}` scroll speed in ms (default: `500`)
- `footer {String}` footer message (default: `Choose skin tone`)
- `toneemoji {String}` skin tones emoticon. Use unicode without special characters (default: `9995`)
- `search {String}` a placeholder for search field (default: `Search`)

__Good to know__:

- This component implements `FUNC.parseASCI(string)` function. The function will parse string and transform text like `:D` or `:joy:` into UTF emoticons.

```javascript
var message = 'This one was good. :joy: See you soon :P';
console.log(FUNC.parseASCI(message)); // This one was good. &#128514; See you soon &#128539;
```

## Usage

```javascript
var opt = {};

// opt.offsetX {Number}    : adds X offset (default: 0)
// opt.offsetY {Number}    : adds Y offset (default: 0)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`

opt.element = YOUR_ELEMENT;
// or if you want to use a fixed position:
// opt.x {Number}          : `x` position
// opt.y {Number}          : `y` position

opt.callback = function(emoji) {
	console.log(emoji); // callback parameter has String.fromCodePoint() value
};

SETTER('emoji/show', opt);
```

### Author

- Denis Granec <info@totalavengers.com>
- [License](https://www.totaljs.com/license/)