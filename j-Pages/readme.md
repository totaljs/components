## j-Pages

The component is a better alternative to the `j-Section` component. As a result, you can easily make a multi-page app with dynamic content loading when needed. The result looks very intuitive for mobile devices or desktop computers.

- jComponent `v19|v20`

__Main configuration__:

- `margin {Number/String}` a top margin (default: `0`)
	- `auto` will applied `offset.top` value
- `margintype {String}` can contain `offset` (default) or `position` value
- `delay {Number}` animation delay (default: `220`)
- `parent` {String} optional, a selector to an element with a fixed height (default: `parent` element)
- `scrollbarshadow {Boolean}` enables shadow for the scrollbar (default: `false`)
- `loading {String}` optional, a link to the `function(show_loading {Boolean})`

__Section attribute configuration `data-config`__:

- `if {String}` a condition for displaying of page
- `url {String}` URL address for getting HTML content
- `path {String}` the value will replace `~PATH~` pharses (default: `config.if`)
- `id {String}` the value will replace `~ID~` pharses
- `anim {String}` animation type, supported values `left` (default), `right`, `top` or `bottom`
- `scrollbar {Boolean}` appends a custom scrollbar into the content (default: `true`)
- `scrolltop {Boolean}` enables auto-scroll
- `reload {String}` a link to the `function(el)`, it's executed when the page is displayed
- `hide {String}` a link to the `function(el)`, it's executed when the page is hidden
- `check {String}` a link to the `function(next, el)`
	- `next {Function}` continues with page displaying

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)