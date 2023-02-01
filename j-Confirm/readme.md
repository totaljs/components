## j-Confirm

- easy usage
- singleton
- works with Bootstrap
- supports __dark mode__
- modal

__Usage__:

```javascript
SETTER('confirm', 'show', message, ['Yes', 'No'], function(index) {
	// @index {Number} a button index

	// In this case:
	// index == 0: Yes
	// index == 1: No
});

SETTER('confirm', 'show2', message, ['Yes', 'No'], function() {
	// In this case will be the callback executed if the user will click on "yes" button only
});
````

## A simple styling of buttons

```javascript
// "Remove" button will be with Font-Awesome icon called: "trash-o"
SETTER('confirm', 'show2', 'Are you sure you want to remove selected item?', ['"trash" Remove', 'Cancel'], REMOVE_FUNCTION);

// "Confirm" button will be "green" with Font-Awesome icon called: "checked-circle"
SETTER('confirm', 'show2', 'Are you sure you want to confirm selected items?', ['"checked-circle" Confirm #2BA433', 'Cancel'], REMOVE_FUNCTION);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)