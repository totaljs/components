## j-StatusInput

- easy usage for different cases
- supports __Dark mode__
- singleton

- jComponent `v19|v20`

## Usage

```javascript
var opt = {};

// opt.placeholder {String}  : A placeholder and can be HTML (optional)
// opt.icon {String}         : An icon (optional)
// opt.hide {Function}       : Is executed when the StatusInput is hiding (optional)
// opt.validate {RegExp}     : A validator, must be RegExp or nullable (optional)
// opt.valuel {String}       : A default value for the input (optional)
// opt.callback {Function}   : A callback

opt.callback = function(newvalue) {
	console.log(newvalue);
};

SETTER('statusinput/show', opt);
```

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)