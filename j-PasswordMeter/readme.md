## j-PasswordMeter

__Configuration__:

- `numbers` {Boolean} password must contain min. 1 numbers (default: `true`)
- `chars` {Boolean} password must contain min. 1 chars (default: `true`)
- `special` {Boolean} password must contain min. 1 special char (default: `false`)
- `min` {Number} password must have min. length of characters (default: `4`)
- `casesensitive` {Boolean} password must contain min. 1 lower and upper char (default: `true`)
- `weak` {String} a label for weak password (default: `Weak`)
- `good` {String} a label for good password (default: `Good`)
- `strong` {String} a label for strong password (default: `Strong`)
- `short` {String} a label for short password (default: `Short password`)
- `text` {String} a label for label (default: `Password strength`)
- `valid` {Number} min. valid criteria in percentage (default: `40`)

__Good to know__:
This component evaluates password according to the rating. Rating is counted as a percentage: `100%` = Strong, `50%` = Good, `0%` = Weak.

- `weak` rating is lower than `30`
- `good` rating is between `30` and `70`
- `strong` rating is greater than `70`

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT