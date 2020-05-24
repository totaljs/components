## j-RadioButton

- for custom design you can use __j-RadioButtonExpert__
- now you can use datasource

__Configuration__:

- `items` {String} needs to contain `text 1|value 1;text 2|value 2` or `text 1;text 2`
- `required` {Boolean} enables `required`
- `disabled` {Boolean} disables this control
- `label` {String} can change the content (default: `innerHTML`)
- `type` {String} can contain `number`
- `inline` {Boolean} enables/disables inline position (default: `true`)
- `datasource` {String} path to data-source (must be array or array of objects)
- `text` {String} determines a property name for text (in data-source), default: `name`
- `value` {String} determines a property name for value (in data-source) default: `id`

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
