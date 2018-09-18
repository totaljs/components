## j-Shortcuts

This component can help with creating keyboard shortcuts. The component __is singleton__.

__Methods__:
- `component.register(shortcut, callback(e), [prevent])` - registers a new shortcut
- `component.exec('shortcut')` - evaluates shortcut

__Shortcuts__:
- `enter`
- `esc`
- `tab`
- `cmd`, `meta`, `win`
- `shift`, `capslock`
- `ctrl`
- `alt`
- `space`
- `backspace`, `del`, `delete`
- `left`, `up`, `right`, `down`
- `F1`, `F2`, `F3`, `F4`, `F5`, `F6`, `F7`, `F8`, `F9`, `F10`, `F11`, `F12`
- or custom key-codes `{Number}` or key-characters `{String(1)}`
- __NEW__: `ins`

__Example__:

```javascript

// SETTER(true, ...) --> works in jComponent +v9.0.0

SETTER(true, 'shortcuts', 'register', 'cmd + enter', function(e) {
    console.log('PRESSED: CMD + ENTER');
});

SETTER(true, 'shortcuts', 'register', 'alt + p', function(e) {
    console.log('PRESSED: ALT + P');
});

SETTER(true, 'shortcuts', 'register', 'esc', function(e) {
    console.log('PRESSED: esc');
});

// +v3 supports multiple shortcuts at the one time:
SETTER(true, 'shortcuts', 'register', 'cmd+enter, ctrl+enter', function(e) {
    console.log('PRESSED: CMD + ENTER');
});

```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT