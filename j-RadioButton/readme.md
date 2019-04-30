## j-RadioButton

- __NEW__ items can be datasource

__Configuration__:

- `items` {String} __required__, needs to contain `value 1|text 1;value 2|text 2` or `text 1;text 2` or `String` as link to data-source (can be `array` or `array of objects` with `object.name` and `object.value`)
- `required` {Boolean} enables `required`
- `disabled` {Boolean} disables this control
- `label` {String} can change the content (default: `innerHTML`)
- `type` {String} can contain `number`
- `inline` {Boolean} enables/disables inline position (default: `true`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT