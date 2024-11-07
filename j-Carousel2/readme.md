# j-Carousel2

Is a simple carousel component optimized for desktop computers and mobile devices. Each elemet must be wrapped into the `<figure>` element (look to example).

- jComponent `v19|v20`

__Configuration__:

- `selector {String}` a selector for cell element (default: `figure`)
- `margin {Number}` left margin between items (default: `10`)
- `animate {Number}` animation timeout, `0` disables animation (default: `5000`)
- `delay {Number}` A delay between animation (default: `2000`)
- `parent {String}` optional, a selector for obtaining of height
- `marginheight {Number}` optional, a margin for `height` (default: `0`)
- `scrolldivider {Number}` optional, if the `count` isn't declared then the __element width__ will be divided according to this value, and the value will be used for `scrollLeft` (default: `3`)
- `offsetwidth {Number}` optional, increases the content width (default: `0`)
- `duration {Number}` optional, animation duration between scrolling items (default: `300`)
- `durationsnap {Number}` optional, duration for snap animation (default: `200`)
- `count {Number}` count of visible items (default: `1`)
__NEW__: `countxs {Number}` optional
__NEW__: `countsm {Number}` optional
__NEW__: `countmd {Number}` optional
__NEW__: `countlg {Number}` optional

__Methods__:

- `component.move('next|right/prev|left')` scrolls the content right or left
- `component.focus('data-id value')` scrolls to the specific figure with `data-id` attribute

__Good to know__:

If the component's path is changed then the component summarizes all cells again.