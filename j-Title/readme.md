## j-Title

- easy usage
- singleton

__Configuration__:

- `separator {String}` a character for separation (default: `-`)
- `name {String}` a name of website (default: `document.title`)
- `empty {String}` a string, which is filled, if there is no value in path (default: `Welcome`)

__Methods__:

- `component.rename(value)`

__Usage__:

```javascript
SETTER('title/rename', 'Title');

OR

SET('common.name', 'Title');
````

### Author

- Pavol Danko <palodanko5@gmail.com>
- [License](https://www.totaljs.com/license/)