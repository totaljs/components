# j-Carousel2

Is a simple carousel component optimized for desktop computers and mobile devices. Each elemet must be wrapped into the `<figure>` element (look to example).

__Configuration__:

- `selector {String}` a selector for cell element (default: `figure`)
- `count {Number}` count of visible items (default: `1`)
- `margin {Number}` left margin between items (default: `10`)
- `animate {Number}` animation timeout, `0` disables animation (default: `5000`)
- `delay {Number}` A delay between animation (default: `2000`)
- `parent {String}` optional, a selector for obtaining of height
- `marginheight {Number}` optional, a margin for `height` (default: `0`)
- __NEW__: `scrolldivider {Number}` optional, if the `count` isn't declared then the __element width__ will be divided according to this value, and the value will be used for `scrollLeft` (default: `3`)
- __NEW__: `offsetwidth {Number}` optional, increases the content width (default: `0`)
- __NEW__: `duration {Number}` optional, animation duration between scrolling items (default: `300`)
- __NEW__: `durationsnap {Number}` optional, duration for snap animation (default: `200`)

__Methods__:

- `component.move('next|right/prev|left')` scrolls the content right or left
- `component.focus('data-id value')` scrolls to the specific figure with `data-id` attribute

__Good to know__:

If the component's path is changed then the component summarizes all cells again.