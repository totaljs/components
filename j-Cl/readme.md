## j-CL

The component parses inline data defined in the component's element. Data is parsed to the code list format.

- Data source: `<ui-component name="cl" path="#mycodelist" value="id|name|icon,id|name|icon"></ui-component>`
- Parsed to: `[{ id, name, icon }]`

__Example__:

```html
<ui-component name="cl" path="#mycodelist" value="SK|Slovakia,CZ|Czechia,DE|Germany,FR|France"></ui-component>
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
