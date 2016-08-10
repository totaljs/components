- Works with Bootstrap
- Works with other jComponents
- The component validates a whole object and enables/disables all buttons according to the validation

__Additional validation__:

(optional) The component supports additional validation like this `data-if="value.isterms && value.isnewsletter"`. jComponent adds the model into the `value` attribute. So the component validates firstly a whole model and then evaluates additional condition.

__Disable selector__:
Default: `data-selector="button"`. You can restrict button by yourself e.g. `data-selector="button[name='submit']"`.

### Author

Peter Širka <petersirka@gmail.com>
License: MIT