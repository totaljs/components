# j-Enterbox

A simple EnterBox. Each value needs to be confirmed via `enter` key or clicking on the button.

__Configuration__:

Example: `data-jc-config="maxlength:30;exec:function_name;icon:home"`

- `maxlength` {Number} (optional) a maximum length of value (default: `50`)
- `icon` {String} icon without `fa-`, default: `keyboard-o`
- `placeholder` {String} a placeholder for the input control
- `exec` {String} (optional) a link to a function in the window scope (otherwise `data-jc-path` is required)