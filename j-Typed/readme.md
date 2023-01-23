## j-Typed

- Based on [typed.js](https://github.com/mattboldt/typed.js/) by [Matt Boldt](https://github.com/mattboldt)
- Value must be __array__

__Configuration__:

Config is the same as [typed.js](https://github.com/mattboldt/typed.js#customization). The only difference is that all keys are lowercase. This is to maintain consistency with other components. The only added configuration is `id`

- `id` {String} (optional) set custom (css) id (default: generated)

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
