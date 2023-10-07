## j-Typed

- Based on [typed.js](https://github.com/mattboldt/typed.js/) by [Matt Boldt](https://github.com/mattboldt)
- Value must be __array__

__Configuration__:

Config is the same as [typed.js](https://github.com/mattboldt/typed.js#customization). The only difference is that all keys are lowercase. This is to maintain consistency with other components. The only added configuration is `id`

- __NEW__: `selector {String}` can contain a nested element for rendering text
- `typespeed {Number}` in milliseconds (default: `0`)
- `startdelay {Number}` in milliseconds (default: `0`)
- `backspeed {Number}` in milliseconds (default: `0`)
- `smartbackspace {Boolean}` this would only backspace the words after "This is a" (default: `true`)
- `shuffle {Boolean}` shuffle the strings (default: `true`)
- `backdelay {String}` time before backspacing (default: `700`)
- `fadeout {Boolean}` fade out instead of backspace (default: `false`)
- `fadeoutclass {String}` css class for fade animation (default: `typed-fade-out`)
- `fadeoutdelay {Number}` fade out delay in milliseconds (default: `500`)
- `loop {Boolean}` loop strings (default: `false`)
- `loopcount {String/Number}` amount of loops (default: `Infinity`)
- `showcursor {Boolean}` show cursor (default: `true`)
- `cursorchar {String}` cursor character (default: `|`)
- `autoinsertcss {Boolean}` insert CSS for cursor and fadeOut into HTML `<head>` (default: `true`)
- `contenttype {String}` contentType `html` or `null` for plaintext (default: `html`)

__Global events__:

Again, same as [typed.js](https://github.com/mattboldt/typed.js#customization). Added `component` parameter

- `ON('typed.onComplete', function(typed, component) {})`
- `ON('typed.preStringTyped', function(pos, typed, component) {})`
- `ON('typed.onStringTyped', function(pos, typed, component) {})`
- `ON('typed.onLastStringBackspaced', function(typed, component) {})`
- `ON('typed.onTypingPaused', function(pos, typed, component) {})`
- `ON('typed.onTypingResumed', function(pos, typed, component) {})`
- `ON('typed.onReset', function(typed, component) {})`
- `ON('typed.onStop', function(pos, typed, component) {})`
- `ON('typed.onStart', function(pos, typed, component) {})`
- `ON('typed.onDestroy', function(typed, component) {})`

### Author

- Denis Granec <denis@granec.cz>
- [License](https://www.totaljs.com/license/)
