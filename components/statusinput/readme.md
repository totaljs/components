---
name: StatusInput
description: Singleton input bar with placeholder, icon, validation and a callback that receives the entered value
author: Peter Širka
version: 1
darkmode: true
license: https://www.totaljs.com/license/
created: 2019-07-11 11:32
updated: 2026-11-03 10:36
jcomponent: v19,v20
---

# StatusInput

- easy usage for different cases
- supports __Dark mode__
- singleton

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
