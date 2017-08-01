## j-Cookie

- singleton
- uses __localStorage__
- supports `cancel` operation (removes cookies, localStorage and redirects to `about:blank`)

__Configuration__

- `agree` {String} a label for the agree button (default: `OK`)
- `cancel` {String} a label for the cancel button (default: `Cancel`)
- `redirect` {String} URL to redirect if the user pressed cancel button (default: `about:blank`)

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT