## j-Tooltip

- singleton
- universal usage

__METHODS__

```javascript
// === Element binding:
SETTER('tooltip', 'show', element, 'HTML BODY', [width], [offsetX], [offsetY]);
// or
FIND('tooltip').show(element, 'HTML BODY', [width], [offsetX], [offsetY]);

// === Position:
SETTER('tooltip', 'show', x, y, 'HTML BODY', [width]);
// or
FIND('tooltip').show(x, y, 'HTML BODY', [width]);

// === Hide:
SETTER('tooltip', 'hide');
// or
FIND('tooltip').hide();
```

- default `width` is `140px`


### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT