The component makes a simple table grid (composed from `div` elements) divided by a simple border that you can modify.

__Configuration__:

- `count {Number}` a default count of items per row
- `countxs {Number}` items per row for mobile display
- `countsm {Number}` items per row for small display
- `countmd {Number}` items per row for medium display
- `countlg {Number}` items per row for large display
- `parent {String}` for obtaining of size (default: `window`)
- `margin {Number}` a vertical margin (default: `0`)
- `scrollbar {Boolean}` enables custom scrollbar (default: `false`)
- `fill {Boolean}` fills the grid with empty rowsm need to define `row` and `scrollbar`
- `row {Number}` a default row height for all displays (default: `0`)
- `rowxs {Number}` a default row height for mobile display (default: `0`)
- `rowsm {Number}` a default row height for small display (default: `0`)
- `rowmd {Number}` a default row height for medium display (default: `0`)
- `rowlg {Number}` a default row height for large display (default: `0`)
- `scrolltop {Boolean}` scrolls to top after change data (default: `true`)


__Classes__:

- `ui-tablegrid-bl` means border-left
- `ui-tablegrid-bt` means border-top
- `ui-tablegrid-first` first item in the row
- `ui-tablegrid-last` last item in the row
- `ui-tablegrid-empty` empty item

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)