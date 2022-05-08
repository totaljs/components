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
- `ins`
- `remove` means`backspace` or `delete`
- `save`
- `selectall`
- `clone`
- `undo`
- `redo`
-  supports `.shortcut`, read more below

__Example__:

```javascript
// SETTER(true, ...) --> works in jComponent +v9.0.0

SETTER(true, 'shortcuts/register', 'cmd + enter', function(e) {
    console.log('PRESSED: CMD + ENTER');
});

SETTER(true, 'shortcuts/register', 'alt + p', function(e) {
    console.log('PRESSED: ALT + P');
});

SETTER(true, 'shortcuts/register', 'esc', function(e) {
    console.log('PRESSED: esc');
});

// +v3 supports multiple shortcuts at the one time:
SETTER(true, 'shortcuts/register', 'cmd+enter, ctrl+enter', function(e) {
    console.log('PRESSED: CMD + ENTER');
});
```

__New inline declaration__:

```html
<button class="exec shortcut" data-shortcut="F1" data-exec="METHO_TO_CALL">Help</button>
```

- `.shortcut` class will emit `click` event
- property `e.shortcut` will contain Event instance from the `keydown` event

__New session shortcuts__:

```javascript
// Open session for new shortcuts
// The methods disables all registered shortcuts while session is not end
SETTER('shortcuts/session', function(register) {
	register('esc', function() {

		// Cancels session
		SETTER('shortcuts/end');

	});
});
````

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)