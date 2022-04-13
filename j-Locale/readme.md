## j-Locale

This component sets current browser locale (number format, date format and time format) according to the `navigatior.language`.

- easy usage
- singleton
- `path` will contain current's browser locale
- sets `DEF.dateformat` and it creates environment value called `[ts]`

__Output__:

```js
{
	dt: 'yyyy–MM–dd', // date format
	nf: 1,  // number format: 1 = 100 000.123, 2 = 100 000,123, 3 = 100.000,123, 4 = 100,000.123
	fdw: 0, // first day of week
	tf: 24  // time format: 12, 24
}
````

__Methods__:

- `component.use(language)`

### Author

- Peter Širka <petersirka@gmail.com> and Lucia Širková
- [License](https://www.totaljs.com/license/)