## j-Approve

- jComponent `v19|v20`
- easy usage
- singleton
- works with Bootstrap
- supports __dark mode__
- modal

__Configuration__:

- `cancel` {String} a label for cancel button (default: `Cancel`)
- __NEW__: `style` {Number} changes style (supported style `1` (default) and `2`)

__Methods__:

- `component.show(message, approve_button_label, [cancel_button_label], callback, [callback_cancel])`

__Usage__:

```js
SETTER('approve/show', message, 'Yes', function() {

});
````

## A simple styling of buttons

```js
// "Remove" button will be with Font-Awesome icon called: "trash-o"
SETTER('approve/show', 'Are you sure you want to remove selected item?', ':trash-o: Remove', REMOVE_FUNCTION);

// "Confirm" button will be "green" with Font-Awesome icon called: "checked-circle"
SETTER('approve/show', 'Are you sure you want to confirm selected items?', ':checked-circle: Confirm #2BA433', REMOVE_FUNCTION);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)