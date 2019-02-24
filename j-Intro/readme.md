## j-Intro

__Configuration__:

- `if` {String} condition for showing of the intro, it's compared with the value within of `path`
- `next` {String} optional, text for the next step button (default: `Next`)
- `close` {String} optional, text for the close step button (default: `Done`)
- `page` {String} optional, a link to method `function(page) {}` it's executed when page is changed
- `exec` {String} optional, a link to method `function() {}` it's executed when the intro is closed
- `remove` {Boolean} optional, when `true` then the component will be removed after close (default: `false`)

__Good to know__:
- each button with `name="next"` will be used as `next` button
- each button with `name="close"` will be used as `close` button

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT