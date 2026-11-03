# Log of the conversion

What was seen while converting 329 components with `tools/convert.js` and checking them with `tools/check.js --legacy` and in Chrome. Generated on 2026-11-03 10:52. The summary is in [readme.md](readme.md).

## 1. Warnings (style rules of the new components that the old code does not follow)

**703 warnings** in 122 components. They are warnings, not errors, because converting must not change the behaviour of a component: `check.js --legacy` reports them and does not rewrite anything.

| Warning | Count |
| --- | --- |
| selector "..." is not scoped under .ui-<name> | 572 |
| it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20 | 72 |
| id="..." attributes in the component, use aria-label or a wrapping <label> | 32 |
| self.release() is a no-op in jComponent v20, remove it | 20 |
| selector "..."text"..." is not scoped under .ui-<name> | 3 |
| selector "..."password"..." is not scoped under .ui-<name> | 2 |
| console.log in the component | 1 |
| self.bindvisible() is a no-op in jComponent v20, remove it | 1 |

Top components by number of warnings:

| Component | Warnings |
| --- | --- |
| [datagrid](datagrid/component.html) | 183 |
| [markdown](markdown/component.html) | 94 |
| [codemirror](codemirror/component.html) | 80 |
| [objecteditor](objecteditor/component.html) | 47 |
| [multioptions](multioptions/component.html) | 42 |
| [wiki](wiki/component.html) | 34 |
| [textbox](textbox/component.html) | 13 |
| [clbind](clbind/component.html) | 13 |
| [notifications](notifications/component.html) | 12 |
| [jsontree](jsontree/component.html) | 11 |
| [display](display/component.html) | 10 |
| [markdowneditor](markdowneditor/component.html) | 6 |
| [noscrollbar](noscrollbar/component.html) | 5 |
| [leaflet](leaflet/component.html) | 5 |
| [grid](grid/component.html) | 4 |

`datagrid` has so many because its CSS uses its own prefixes (`.dg`, `.dg-col`, `.dg-pagination`...) instead of `.ui-datagrid`; the same happens with `markdown`, `codemirror`, `objecteditor` and `multioptions`. Renaming them would change the CSS and the JavaScript of the component, so it was not done.

### Detail per component

All of them, one by one, are in [warnings.md](warnings.md).

## 2. Messages of the browser test

Each `component.html` was opened from disk in Chrome (headless, 800x600) and the JavaScript errors and console errors were collected.

Result of the run that is reported in the readme: **326 without messages, 3 with a message**. They come from the test environment, not from the conversion:

| Component | Message |
| --- | --- |
| audio | `ERR play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD` |
| datasource | `CON Access to XMLHttpRequest at 'https://www.totaljs.com/dashboard.json' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn` |
| svgicons | `CON Unsafe attempt to load URL file:///svgicons.svg#phone from frame with URL file:///private/tmp/claude-501/-Volumes-Grey-GitHub-forge/fb219623-c588-470a-b816-` |

Other messages seen in earlier runs, with the same cause (the environment): `map` and `mapmarker` (`Google Maps JavaScript API error: ApiProjectMapError`, the example needs a key), `iframe` (`Permissions policy violation: accelerometer is not allowed in this document`).

14 components have no `<ui-component>` tag in the example (popups, forms and singletons that are opened from code): box, changer, floweditor, form, formtab, fullform, largeform, miniform, panel, permissionsop, serviceworker, uieditor, uistudio, websocket. They load without errors, but the browser test does not show anything of them.

## 3. What failed and was fixed in the process

| What was seen | Cause | Fix |
| --- | --- | --- |
| `windows` (and 25 more) reported `id="..." attributes` although they have none | The rule looked for `id=` with a word boundary, and `data-id="..."` matched (the hyphen is a boundary) | The rule only matches an `id` attribute, not `data-id` or `aria-...`: the warnings of this kind went from 58 to 32, and 19 components have no warning anymore |
| 8 components failed in Chrome after converting: `NOTMODIFIED is not defined` (`repeatergroup`, `textboxtags`), `EVALUATE is not defined` (`disable`), `self.compile is not a function` (`repeater`), `self.path.replace is not a function` (`submit`), `Maximum call stack size exceeded` (`pagination`), `Cannot read properties of undefined (reading setCenter)` (`mapmarker`), a syntax error in `filter` | They are v19 components: their `component.json` has no `jcomponent` (or `19`) and the tool put `spa.min@20` on them. In the old format (`spa.min@19`) they were clean | The tool keeps the version that the component declares: 70 components stay on `spa.min@19` and `jcomponent: v19` |
| `crop` and about 30 more had code as the description (`// Resize canvas component.reconfigure(...)`) | The first block of the old readme was taken as the description, and a code block with blank lines gave a piece of code | Code blocks are ignored, it has to look like a sentence and only its first sentence is used; otherwise `TODO` (then written by the AI) |
| 18 components had no preview | Their picture is `picture.gif` (14) or `picture.png` (3); the tool only looked for `picture.jpg` | They are converted to `preview.jpg`. `scanner` has no picture at all and got a generated one |
| `check.js` reported `self.readonly()` in 127 components | The rule said it removes the setter, but it only does it when it is called after the setter is defined | It is only reported when it is called after `self.setter`/`self.getter` |
| The preview of `datagrid` was blank | The first `<ui-component>` of its example is `LAZY directory` (it loads a dependency and shows nothing) | `check.js --preview` ignores the `LAZY ...` components |

## 4. Not converted

- `j-QRCodeGenerator`: it registers the same name as `j-QRCode` (`qrcode`), so both would end in `qrcode/` and one would overwrite the other. Only `qrcode` is here; Peter decides (they could be `qrcode` and `qrcodegenerator`).
- `0cdn`, `0dependencies`, `0emptycomponent`: files of the CDN and the empty template of the old repository.
- The packages that are not jComponents (Tangular helpers, CSS, templates, `j-ResponsiveLayout`) **are** converted (19, `package` in the table; the CSS package `Tooltip` is `tooltip-css` because `tooltip` is a jComponent), with their CSS, JavaScript and example; they open in Chrome without messages.

## 5. Still to finish

Options of the default configuration that the readme does not document (98 options in 64 components):

| Component | Options |
| --- | --- |
| autocomplete | `height` |
| backup | `btnsave`, `btnload` |
| banners | `class`, `interval`, `icon` |
| barchart | `axisX`, `axisY` |
| breadcrumb | `usetitle` |
| button | `flags` |
| calendar | `close` |
| carousel2 | `snapping` |
| choose | `event` |
| chunkyscroll | `limit` |
| clbind | `key` |
| colorpickerbutton | `default`, `align`, `position` |
| colorselector | `colors`, `empty` |
| datagrid | `buttonreset`, `fullwidth_xs`, `dirplaceholder` |
| datatable | `rowheight`, `clickid` |
| developer | `interval`, `position` |
| directory | `minwidth`, `create` |
| dockable | `menuicon` |
| drawzone | `margin`, `geolocation` |
| dynamicvalue | `loading` |
| dynamicvaluelist | `loading`, `limit` |
| EAN13 | `visibility` |
| edit | `padding` |
| emojibutton | `default`, `align`, `position` |
| enter | `flags` |
| faicons | `scrollbarshadow` |
| floatinginput | `minwidth` |
| floatingpanel | `minwidth`, `height` |
| flow | `horizontal` |
| floweditor | `margin` |
| fullform | `padding` |
| grid | `fillcount`, `rowheight` |
| icons | `scrollbarshadow` |
| input | `checkicon`, `height` |
| largeform | `padding` |
| layer | `offset` |
| layout2 | `scrollbar` |
| linechart | `axisY`, `axisX` |
| listmenueditable | `defaulticon` |
| monthlycalendar | `badgecolor` |
| nosqlcounter | `height` |
| objecttree | `copydata`, `copypath` |
| panel | `padding` |
| parameters | `offset` |
| passwordmeter | `sequence` |
| period | `firstday`, `apply`, `cancel`, `custom`, `month`, `thisY`, `lastY` |
| pictureupload | `type` |
| pin | `blank` |
| properties | `offset`, `modalalign` |
| properties2 | `encodenotes` |
| rules | `dirsearch` |
| searchdata | `class` |
| selection | `event` |
| serverlist | `prop` |
| serverlisting | `pluralizeitems`, `pluralizepages` |
| splashscreen | `timeout`, `autoremove` |
| stash | `internal` |
| table | `visibleY`, `pluralizepages`, `pluralizeitems`, `margin` |
| tablegrid | `visibleY` |
| touchmove | `diff` |
| treeview | `droppable` |
| uieditor | `margin` |
| uistudio | `loading`, `inputdelay` |
| wiki | `margin` |

Components with a default configuration and without the `__Configuration__:` section (10): autocomplete, banners, developer, drawer, dynamicvalue, floatingpanel, formdata, pages, touchmove, virtualwire.
