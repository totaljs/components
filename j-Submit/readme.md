## j-Submit

This component is very similar to `j-Validation` but it adds additional features which can simplify the creation of SPA.

__Configuration__:

- `if` {String} can contain a condition for evaluation (optional)
- `selector` {String} jQuery selector for disabling (optional, default: `button[name="submit"]`)
- `delay` {Number} a delay for validation (optional, default: `100`)
- `flags` {String} `+v13.0.0` flags for better validation, can contain `visible,hidden,enabled,disabled` components
	- `enabled` validates all components which are enabled `input`, `textarea` or `select` elements
	- `disabled` validate all components which are disabled `input`, `textarea` or `select` elements
	- `hidden` validates all components which are hidden
	- `visible` validate all components which are visible
- `track` {String} can contain paths divided by a comma which evaluates validation (executors for paths aren't components, but these methods `SET()`, `UPD()`, `INC()`, etc.)
- `enter` {String} the closest selector for the element where will be captured `ENTER` event (default: empty)
- `exec` {String} a link to the function `function(response, el)`, executed if the response is processed
- `fail` {String} a link to the function `function(response, el)`, executed if the response contains an error
- `done` {String} a link to the function `function(response, el)`, executed if the response is successful
- `prepare` {String} a link to the function `function(data)`, it's used for editing of data before sending (keep a reference)
- `sending` {String} a link to the function `function(issending, data)`, executed when the AJAX begins and ends
- `default` {Boolean} resets the form if the response is successful (default: `true`)
- `loading` {Boolean} shows loading via `j-Loading` when the form is sending (default: `true`)
- `messages` {Boolean} shows messages via `j-Message` when the form is processed, contains an error handling (default: `true`)
- `url` {String} a default URL address to submit data, must contain a method with URL, e.g. `POST /api/users/` (default URL for `create/update`)
- `create` {String} URL address for creating of an item, e.g. `POST /api/users/`
- `update` {String} URL address for updating of an item, e.g. `PUT /api/users/{id}/` or `PATCH /api/users/{id}/`
- `newbie` {String} Arrow function which determines `create` (is a newbie?) or `update` URL, (default: `data => !data.id`)
- `create_success` {String} A Tangular message, it's displayed if the response of the new item is successful
- `update_success` {String} A Tangular message, it's displayed if the response of the updated item is successful
- `success` {String} A Tangular message, it's displayed if the response is successful (default for create/update)
- `update_modified` {Boolean} copies only modified data if: `update` url contains `PATCH`
- `blocked` {Number} in milliseconds and it's simple prevention for double clicking on submit button (default: `2000`)
- `null` {String} A path to the value which will be nulled

__Good to know__:

- component toggles `ui-submit-ok` class if the model is valid
- component toggles `ui-submit-no` class if the model is invalid
- component toggles `ui-submit-modified` class if the model is modified

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)