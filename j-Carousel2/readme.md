# j-Carousel2

Is a simple carousel component optimized for desktop computers and mobile devices. Each elemet must be wrapped into the `<figure>` element (look to example).

__Configuration__:

- `selector` {String} a selector for cell element (default: `figure`)
- `count` {Number} count of visible items (default: `1`)
- `margin` {Number} left margin between items (default: `10`)
- `animate` {Number} animation timeout, `0` disables animation (default: `5000`)
- `delay` {Number} A delay between animation (default: `2000`)
- `parent` {String} optional, a selector for obtaining of height
- `marginheight` {Number} optional, a margin for `height` (default: `0`)

__Good to know__:

If the component's path is changed then the component summarizes all cells again.