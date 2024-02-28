## j-CL

The component parses inline data defined in the component's element. Data is parsed to the code list format.

- Data source format: `id1|name1|icon1,id2|name2|icon2,id3|name3|icon3`
- Parsed to: `[{ id, name, icon }]`

__Example__:

```html
<ui-component name="cl" path="#mycodelist" value="SK|Slovakia,CZ|Czechia,DE|Germany,FR|France"></ui-component>
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
