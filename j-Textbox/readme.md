## j-Textbox

- supports __dark mode__

__Configuration__:

- `type` {String} (optional) can be `email`, `phone`, `password`, `date`, `number`, `search`, `lower`, `upper` or empty (default)
- `required` {Boolean} (optional) enables "required" (default: `false`)
- `icon` {String} (optional) icon for label e.g. `home`, `cog`, etc.
- `icon2` {String} (optional) icon in the right box e.g. `home`, `cog`, etc.
- `label` {String} (optional) label (default is HTML content)
- `autofocus` {Boolean} (optional) focuses the input (default: `false`)
- `align` {String} (optional) `left` (default), `right` or `center`
- `autofill` {Boolean} (optional) enables the browser's autofill feature (default: `false`)
- `placeholder` {String} (optional) adds a `placeholder` text into the input
- `maxlength` {Number} (optional) sets a maximum length of chars
- `minlength` {Number} (optional) sets a minimum length of chars
- `validation` {String} (optional) a condition for `evaluation` e.g. `value.match(/[a-z]+/) !== null`
- `format` {String} (optional) output formatting e.g. for dates (default: `yyyy-MM-dd`)
- `increment` {Boolean} (optional) enables controls for incrementing of numbers (default: `false`)
- `keypress` {Boolean} (optional) can disable real-time binding values (default: `true`)
- `delay` {Number} (optional) can increase/decrease delay for real-time binding (default: `300` ms)
- `disabled` {Boolean} (optional) disables this component
- `error` {String} (optional) adds a `string` text under the input
- `iconclick` {String} (optional) needs to contain a link to a function
- `autocomplete` {String} (optional) needs to contain a link to a function, is triggered on the `focus` event
- `spaces` {Boolean} (optional) enables spaces otherwise it removes them (default: `true`)
- `readonly` {Boolean} optional, default `false`
- __NEW__ `innerlabel` {Boolean} optional, enables inner label (default: `true`)

__Interesting:__

- `type:date` uses the `calendar` component

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)
