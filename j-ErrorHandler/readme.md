## j-ErrorHandler

This component captures the `ON('ERROR', function(err` event trigger from the `ERROR()` method and tries to display form more comfortably.

- jComponent `v19|v20`
- easy usage
- singleton

__Configuration__:

- `keywords {String}` which will be searched in the error messages (default value: `401=login`)
	- must be in the form `search1=target_property,search2=target_property`
- `exec {String}` a link to the `function(response)`, output:
	- `response.items {String Array}`
	- `response.message {String}`
	- `response.keyword_target_property {Boolean}` optional, according to the `keywords` settings

The component tries using `j-Message`, `j-Snackbar`, `j-NotifyBar` or `j-Notify` for displaying of errors if you don't have defined `exec` configuration.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)