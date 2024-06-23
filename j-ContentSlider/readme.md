## j-ContentSlider

- easy usage
- supports great features
- works with Bootstrap Grid System

- jComponent `v19|v20`

__Configuration__:

- `selector {String}` Optional, default `a`
- `interval {Number}` Optional, refresh interval (default `3000`)
- `cache {String}` Optional, when it's filled then the component saves a current state into the `localStorage` - so when the user refreshes the page then the component continues from the last state

__Redraw__:
The code below solves a problem with rendering component when the the component is dynamically displayed.

```javascript
SETTER('contentslider/refresh');
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)