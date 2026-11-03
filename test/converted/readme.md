# Converted components (evidence)

The result of `node tools/convert.js` over the components of the classic format of `totaljs/components` (branch `master`, folders `j-*`). Generated on 2026-11-03 10:46. Every folder has the new declaration: `component.html`, `readme.md` and `preview.jpg` (the old `picture.jpg`).

**This is the mechanical part only.** It is what the tool does without an AI: the code of every component is untouched (only the no-op `self.nocompile()` is removed). The rest (see "To finish") is done by an AI following [`SKILL.md`](../../SKILL.md).

```bash
for d in j-*/; do node tools/convert.js "$d" --out test/converted; done
node tools/check.js test/converted/<name> --legacy
```

## Numbers

| | |
| --- | --- |
| Components converted | **329** folders (330 components with `component.js` of 331 folders `j-*`; two of them share the name `qrcode`) |
| Open in Chrome with no JavaScript error of their own | **326** (3 report a message of the environment, see below) |
| Declare jComponent v20 (`spa.min@20`) | 259 |
| Declare only v19 (`spa.min@19`, they need an update to run on v20) | 70 |
| **Description added by the AI** (the old readme had none that was usable) | **171** |
| **Preview converted** (the old picture is `picture.gif` or `picture.png`, converted to `preview.jpg`; a gif keeps its first frame) | **17** (14 gif, 3 png) |
| **Preview generated** (the old component has no picture at all: `scanner`) | **1** |
| Still to finish: options of the default configuration not documented in the readme | 64 |
| Still to finish: `__Configuration__:` section missing | 10 |
| No errors in `check.js --legacy` | 261 |

The errors, warnings and messages that were seen are in [log.md](log.md).

Descriptions are written from the old readme and from the code, in one sentence. The old description was kept when the old readme had a usable first sentence ("old readme" in the table).

## What was not converted

- `j-ResponsiveLayout`: it has no `component.js`.
- `j-QRCodeGenerator`: it registers the same name as `j-QRCode` (`qrcode`), so both end in `qrcode/` (one overwrites the other).
- Tangular helpers and templates (`Tangular-*`, `URLify`, `Mailify`, `Smilefy`...): they are not jComponents.

## Warnings (rules for new components that the old code does not follow)

`check.js --legacy` reports them as warnings because converting must not change the behaviour: selectors that are not scoped under `.ui-<name>` (for example `datagrid`, `codemirror`), `id="..."` attributes, `self.release()`. They are listed per component in the `Warnings` column.

## Messages of the browser test

Opened from disk with Chrome, a few components report something that comes from the test environment and not from the conversion: `audio` (the browser does not allow sound without a click), `datasource` (CORS with the example URL), `svgicons` (loads a file with `file://`). The components that declare v19 only run on `spa.min@19`: forcing `spa.min@20` on them made 8 fail (`NOTMODIFIED is not defined`, `self.compile is not a function`...), so the tool keeps the version that each component declares.

## Per component

Folder | jComponent | Browser | Description | Preview | Still to finish | Warnings
--- | --- | --- | --- | --- | --- | ---
[ajaxloading](ajaxloading/component.html) | v20 | ok | old readme | picture.jpg | - | -
[animation](animation/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[approve](approve/component.html) | v20 | ok | added | picture.jpg | - | -
[aselected](aselected/component.html) | v20 | ok | added | picture.jpg | - | -
[attachments](attachments/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[audio](audio/component.html) | v20 | message | added | picture.jpg | - | -
[autocomplete](autocomplete/component.html) | v20 | ok | added | picture.jpg | options, config section | -
[autodarkmode](autodarkmode/component.html) | v20 | ok | old readme | picture.jpg | - | -
[autoexec](autoexec/component.html) | v20 | ok | old readme | picture.jpg | - | -
[autofill](autofill/component.html) | v20 | ok | added | picture.jpg | - | -
[autoselect](autoselect/component.html) | v20 | ok | old readme | picture.jpg | - | -
[avatar](avatar/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[backtotop](backtotop/component.html) | v20 | ok | added | converted from gif | - | -
[backup](backup/component.html) | v20 | ok | old readme | picture.jpg | options | -
[banners](banners/component.html) | v20 | ok | added | picture.jpg | options, config section | -
[barchart](barchart/component.html) | v20 | ok | old readme | picture.jpg | options | -
[box](box/component.html) | v20 | ok | added | picture.jpg | - | 2
[breadcrumb](breadcrumb/component.html) | v20 | ok | added | picture.jpg | options | -
[button](button/component.html) | v19 | ok | old readme | picture.jpg | options | 1
[calendar](calendar/component.html) | v19 | ok | old readme | picture.jpg | options | 1
[carousel](carousel/component.html) | v20 | ok | added | picture.jpg | - | -
[carousel2](carousel2/component.html) | v20 | ok | old readme | picture.jpg | options | -
[centered](centered/component.html) | v20 | ok | added | picture.jpg | - | -
[changer](changer/component.html) | v20 | ok | old readme | picture.jpg | - | -
[checkbox](checkbox/component.html) | v19 | ok | added | picture.jpg | - | 1
[checkboxlist](checkboxlist/component.html) | v19 | ok | added | picture.jpg | - | 2
[checkboxlistexpert](checkboxlistexpert/component.html) | v20 | ok | old readme | picture.jpg | - | -
[checkpath](checkpath/component.html) | v20 | ok | added | picture.jpg | - | -
[children](children/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[choose](choose/component.html) | v20 | ok | old readme | picture.jpg | options | -
[chunkyscroll](chunkyscroll/component.html) | v20 | ok | added | picture.jpg | options | 1
[cl](cl/component.html) | v20 | ok | old readme | picture.jpg | - | -
[clbind](clbind/component.html) | v20 | ok | added | picture.jpg | options | 13
[click](click/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[clickbox](clickbox/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[clipboard](clipboard/component.html) | v20 | ok | added | picture.jpg | - | 1
[clipboardimage](clipboardimage/component.html) | v20 | ok | old readme | picture.jpg | - | -
[clock](clock/component.html) | v19 | ok | added | picture.jpg | - | 1
[cloudeditor](cloudeditor/component.html) | v20 | ok | added | picture.jpg | - | -
[cloudeditorsimple](cloudeditorsimple/component.html) | v20 | ok | added | picture.jpg | - | -
[code](code/component.html) | v20 | ok | added | picture.jpg | - | -
[codemirror](codemirror/component.html) | v19 | ok | added | picture.jpg | - | 80
[colorpicker](colorpicker/component.html) | v20 | ok | added | picture.jpg | - | -
[colorpickerbutton](colorpickerbutton/component.html) | v20 | ok | added | picture.jpg | options | -
[colorselector](colorselector/component.html) | v20 | ok | added | picture.jpg | options | -
[columns](columns/component.html) | v20 | ok | old readme | picture.jpg | - | -
[configuration](configuration/component.html) | v20 | ok | added | picture.jpg | - | -
[confirm](confirm/component.html) | v20 | ok | added | picture.jpg | - | -
[console](console/component.html) | v20 | ok | added | picture.jpg | - | 1
[console2](console2/component.html) | v20 | ok | added | converted from gif | - | -
[contenteditable](contenteditable/component.html) | v19 | ok | added | picture.jpg | - | 2
[contentslider](contentslider/component.html) | v20 | ok | added | picture.jpg | - | -
[contextmenu](contextmenu/component.html) | v20 | ok | old readme | picture.jpg | - | -
[controls](controls/component.html) | v20 | ok | added | picture.jpg | - | -
[cookie](cookie/component.html) | v19 | ok | added | picture.jpg | - | 1
[cookie2](cookie2/component.html) | v19 | ok | added | picture.jpg | - | 1
[countdown](countdown/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[crop](crop/component.html) | v20 | ok | added | picture.jpg | - | -
[dashboard](dashboard/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[datagrid](datagrid/component.html) | v20 | ok | old readme | converted from gif | options | 183
[datasource](datasource/component.html) | v20 | message | added | picture.jpg | - | -
[datatable](datatable/component.html) | v20 | ok | added | picture.jpg | options | -
[datepicker](datepicker/component.html) | v20 | ok | old readme | picture.jpg | - | -
[detach](detach/component.html) | v20 | ok | old readme | picture.jpg | - | -
[detail](detail/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[developer](developer/component.html) | v19 | ok | added | picture.jpg | options, config section | 1
[diagram](diagram/component.html) | v20 | ok | added | picture.jpg | - | 2
[directory](directory/component.html) | v20 | ok | old readme | picture.jpg | options | -
[disable](disable/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[display](display/component.html) | v20 | ok | old readme | picture.jpg | - | 10
[dockable](dockable/component.html) | v20 | ok | old readme | picture.jpg | options | 1
[donutchart](donutchart/component.html) | v20 | ok | added | picture.jpg | - | -
[dragdropelement](dragdropelement/component.html) | v20 | ok | old readme | picture.jpg | - | -
[dragdropfiles](dragdropfiles/component.html) | v20 | ok | added | picture.jpg | - | 1
[draggable](draggable/component.html) | v20 | ok | old readme | picture.jpg | - | -
[drawer](drawer/component.html) | v20 | ok | added | picture.jpg | config section | -
[drawzone](drawzone/component.html) | v20 | ok | added | picture.jpg | options | -
[dropdown](dropdown/component.html) | v20 | ok | added | picture.jpg | - | 1
[dropdowncheckbox](dropdowncheckbox/component.html) | v20 | ok | added | picture.jpg | - | -
[dropdownlist](dropdownlist/component.html) | v20 | ok | added | picture.jpg | - | 1
[dropfiles](dropfiles/component.html) | v20 | ok | added | picture.jpg | - | -
[duplicator](duplicator/component.html) | v19 | ok | added | picture.jpg | - | 2
[dynamicvalue](dynamicvalue/component.html) | v20 | ok | old readme | picture.jpg | options, config section | -
[dynamicvaluelist](dynamicvaluelist/component.html) | v20 | ok | old readme | picture.jpg | options | -
[EAN13](EAN13/component.html) | v20 | ok | old readme | converted from png | options | -
[edit](edit/component.html) | v20 | ok | old readme | picture.jpg | options | -
[editable](editable/component.html) | v19 | ok | old readme | picture.jpg | - | 2
[elementid](elementid/component.html) | v20 | ok | old readme | converted from gif | - | -
[emoji](emoji/component.html) | v19 | ok | added | picture.jpg | - | 2
[emojibutton](emojibutton/component.html) | v19 | ok | added | picture.jpg | options | 1
[empty](empty/component.html) | v20 | ok | added | picture.jpg | - | -
[emptyinline](emptyinline/component.html) | v20 | ok | old readme | picture.jpg | - | -
[enter](enter/component.html) | v20 | ok | added | picture.jpg | options | -
[enterbox](enterbox/component.html) | v20 | ok | old readme | picture.jpg | - | -
[error](error/component.html) | v20 | ok | added | picture.jpg | - | -
[errorhandler](errorhandler/component.html) | v20 | ok | old readme | picture.jpg | - | -
[exec](exec/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[expander](expander/component.html) | v20 | ok | added | picture.jpg | - | -
[expansionpanel](expansionpanel/component.html) | v20 | ok | added | converted from gif | - | -
[extend](extend/component.html) | v20 | ok | old readme | picture.jpg | - | -
[faicons](faicons/component.html) | v19 | ok | added | picture.jpg | options | 1
[faiconsbutton](faiconsbutton/component.html) | v19 | ok | added | picture.jpg | - | 1
[faviconunread](faviconunread/component.html) | v20 | ok | added | picture.jpg | - | -
[features](features/component.html) | v20 | ok | added | picture.jpg | - | -
[feedbackbutton](feedbackbutton/component.html) | v20 | ok | added | picture.jpg | - | -
[filebrowser](filebrowser/component.html) | v20 | ok | old readme | picture.jpg | - | -
[filereader](filereader/component.html) | v20 | ok | added | picture.jpg | - | -
[filesaver](filesaver/component.html) | v20 | ok | added | picture.jpg | - | -
[fileupload](fileupload/component.html) | v19 | ok | old readme | picture.jpg | - | 2
[fileuploader](fileuploader/component.html) | v20 | ok | old readme | picture.jpg | - | -
[fileuploadlist](fileuploadlist/component.html) | v19 | ok | old readme | picture.jpg | - | 2
[filter](filter/component.html) | v19 | ok | added | picture.jpg | - | 1
[fixedmodal](fixedmodal/component.html) | v20 | ok | old readme | picture.jpg | - | 2
[floatingbox](floatingbox/component.html) | v20 | ok | added | picture.jpg | - | 4
[floatinginput](floatinginput/component.html) | v20 | ok | added | picture.jpg | options | -
[floatingpanel](floatingpanel/component.html) | v20 | ok | old readme | picture.jpg | options, config section | -
[floatingsearch](floatingsearch/component.html) | v20 | ok | old readme | picture.jpg | - | -
[flow](flow/component.html) | v20 | ok | added | picture.jpg | options | 2
[floweditor](floweditor/component.html) | v20 | ok | old readme | picture.jpg | options | -
[folder](folder/component.html) | v20 | ok | old readme | picture.jpg | - | -
[fontawesome](fontawesome/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[fontawesomebox](fontawesomebox/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[form](form/component.html) | v20 | ok | added | picture.jpg | - | 2
[formdata](formdata/component.html) | v20 | ok | old readme | picture.jpg | config section | -
[formtab](formtab/component.html) | v20 | ok | added | converted from gif | - | 1
[fullform](fullform/component.html) | v20 | ok | added | picture.jpg | options | 3
[gallery](gallery/component.html) | v20 | ok | added | picture.jpg | - | -
[gauge](gauge/component.html) | v20 | ok | added | picture.jpg | - | -
[gps](gps/component.html) | v20 | ok | old readme | picture.jpg | - | -
[grid](grid/component.html) | v19 | ok | added | picture.jpg | options | 4
[hashchange](hashchange/component.html) | v20 | ok | old readme | picture.jpg | - | -
[highlightsyntax](highlightsyntax/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[icons](icons/component.html) | v20 | ok | added | picture.jpg | options | -
[idletime](idletime/component.html) | v20 | ok | added | picture.jpg | - | -
[iframe](iframe/component.html) | v20 | ok | old readme | picture.jpg | - | -
[iframeeditable](iframeeditable/component.html) | v20 | ok | added | picture.jpg | - | 1
[iframepreview](iframepreview/component.html) | v20 | ok | added | picture.jpg | - | 1
[iframeviewer](iframeviewer/component.html) | v20 | ok | old readme | picture.jpg | - | -
[imageuploader](imageuploader/component.html) | v20 | ok | old readme | picture.jpg | - | -
[imageviewer](imageviewer/component.html) | v20 | ok | added | picture.jpg | - | -
[importcsv](importcsv/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[importer](importer/component.html) | v20 | ok | old readme | picture.jpg | - | -
[infinitescroll](infinitescroll/component.html) | v20 | ok | added | picture.jpg | - | 1
[info](info/component.html) | v19 | ok | added | converted from png | - | 1
[infowindows](infowindows/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[inlinedatepicker](inlinedatepicker/component.html) | v20 | ok | added | picture.jpg | - | -
[inlineform](inlineform/component.html) | v19 | ok | added | picture.jpg | - | 3
[inlineproperties](inlineproperties/component.html) | v20 | ok | added | picture.jpg | - | 1
[input](input/component.html) | v20 | ok | added | picture.jpg | options | -
[inputtags](inputtags/component.html) | v20 | ok | added | picture.jpg | - | -
[intro](intro/component.html) | v20 | ok | added | picture.jpg | - | 1
[isopen](isopen/component.html) | v19 | ok | added | picture.jpg | - | 1
[jsontree](jsontree/component.html) | v20 | ok | added | converted from png | - | 11
[kanban](kanban/component.html) | v20 | ok | added | picture.jpg | - | 2
[keyselection](keyselection/component.html) | v20 | ok | old readme | picture.jpg | - | -
[keyvalue](keyvalue/component.html) | v20 | ok | old readme | picture.jpg | - | -
[largeform](largeform/component.html) | v20 | ok | added | picture.jpg | options | 3
[layer](layer/component.html) | v19 | ok | added | converted from gif | options | 3
[layout](layout/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[layout2](layout2/component.html) | v20 | ok | old readme | picture.jpg | options | -
[lazycontent](lazycontent/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[lazyimages](lazyimages/component.html) | v20 | ok | added | picture.jpg | - | -
[lazyload](lazyload/component.html) | v20 | ok | added | picture.jpg | - | 1
[leaflet](leaflet/component.html) | v20 | ok | added | picture.jpg | - | 5
[linechart](linechart/component.html) | v20 | ok | old readme | picture.jpg | options | -
[listbox](listbox/component.html) | v19 | ok | added | picture.jpg | - | 1
[listdetail](listdetail/component.html) | v20 | ok | added | picture.jpg | - | -
[listform](listform/component.html) | v20 | ok | old readme | picture.jpg | - | -
[listing](listing/component.html) | v20 | ok | added | picture.jpg | - | -
[listmenu](listmenu/component.html) | v19 | ok | old readme | picture.jpg | - | 3
[listmenueditable](listmenueditable/component.html) | v20 | ok | old readme | picture.jpg | options | -
[livestats](livestats/component.html) | v20 | ok | added | picture.jpg | - | 1
[loadcontent](loadcontent/component.html) | v20 | ok | added | picture.jpg | - | -
[loading](loading/component.html) | v20 | ok | added | picture.jpg | - | -
[locale](locale/component.html) | v20 | ok | old readme | picture.jpg | - | -
[mainprogress](mainprogress/component.html) | v20 | ok | old readme | picture.jpg | - | -
[map](map/component.html) | v19 | ok | added | picture.jpg | - | 1
[mapmarker](mapmarker/component.html) | v19 | ok | added | picture.jpg | - | 1
[mapzones](mapzones/component.html) | v20 | ok | added | picture.jpg | - | -
[markdown](markdown/component.html) | v20 | ok | old readme | picture.jpg | - | 94
[markdowneditor](markdowneditor/component.html) | v19 | ok | added | picture.jpg | - | 6
[markdownpreview](markdownpreview/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[masonry](masonry/component.html) | v20 | ok | old readme | picture.jpg | - | -
[menu](menu/component.html) | v20 | ok | added | picture.jpg | - | -
[message](message/component.html) | v20 | ok | added | picture.jpg | - | -
[minheight](minheight/component.html) | v20 | ok | old readme | picture.jpg | - | -
[miniform](miniform/component.html) | v20 | ok | added | picture.jpg | - | 2
[mobilecarousel](mobilecarousel/component.html) | v20 | ok | old readme | converted from gif | - | -
[modal](modal/component.html) | v20 | ok | old readme | picture.jpg | - | 2
[modificator](modificator/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[monacoeditor](monacoeditor/component.html) | v20 | ok | added | picture.jpg | - | -
[monthlycalendar](monthlycalendar/component.html) | v20 | ok | old readme | picture.jpg | options | 1
[movable](movable/component.html) | v20 | ok | old readme | picture.jpg | - | -
[movement](movement/component.html) | v20 | ok | old readme | picture.jpg | - | -
[multioptions](multioptions/component.html) | v19 | ok | added | picture.jpg | - | 42
[nativenotifications](nativenotifications/component.html) | v20 | ok | added | picture.jpg | - | -
[navigation](navigation/component.html) | v20 | ok | added | picture.jpg | - | 1
[navlayout](navlayout/component.html) | v20 | ok | old readme | picture.jpg | - | -
[noscrollbar](noscrollbar/component.html) | v20 | ok | added | picture.jpg | - | 5
[nosqlcounter](nosqlcounter/component.html) | v19 | ok | added | picture.jpg | options | 1
[notifications](notifications/component.html) | v19 | ok | added | picture.jpg | - | 12
[notificationspanel](notificationspanel/component.html) | v20 | ok | added | picture.jpg | - | -
[notify](notify/component.html) | v20 | ok | added | picture.jpg | - | 1
[notifybar](notifybar/component.html) | v20 | ok | added | picture.jpg | - | -
[objecteditor](objecteditor/component.html) | v20 | ok | added | picture.jpg | - | 47
[objecttree](objecttree/component.html) | v20 | ok | old readme | picture.jpg | options | 1
[offline](offline/component.html) | v20 | ok | old readme | picture.jpg | - | -
[onetime](onetime/component.html) | v20 | ok | old readme | picture.jpg | - | -
[packeta](packeta/component.html) | v20 | ok | added | picture.jpg | - | -
[page](page/component.html) | v20 | ok | old readme | picture.jpg | - | 2
[pages](pages/component.html) | v20 | ok | old readme | picture.jpg | config section | -
[pagination](pagination/component.html) | v19 | ok | added | picture.jpg | - | 1
[panel](panel/component.html) | v20 | ok | added | converted from gif | options | 2
[paper](paper/component.html) | v20 | ok | added | picture.jpg | - | 1
[parameters](parameters/component.html) | v20 | ok | old readme | picture.jpg | options | -
[part](part/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[parts](parts/component.html) | v20 | ok | old readme | picture.jpg | - | -
[passwordmeter](passwordmeter/component.html) | v20 | ok | added | picture.jpg | options | -
[paste](paste/component.html) | v20 | ok | old readme | picture.jpg | - | -
[period](period/component.html) | v19 | ok | old readme | picture.jpg | options | 1
[permissions](permissions/component.html) | v20 | ok | added | picture.jpg | - | 1
[permissionsop](permissionsop/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[pictures](pictures/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[pictureupload](pictureupload/component.html) | v19 | ok | added | picture.jpg | options | 1
[pictureuploadexpert](pictureuploadexpert/component.html) | v19 | ok | added | picture.jpg | - | 1
[pin](pin/component.html) | v20 | ok | old readme | picture.jpg | options | -
[planner](planner/component.html) | v20 | ok | added | picture.jpg | - | 2
[preview](preview/component.html) | v20 | ok | old readme | picture.jpg | - | -
[pricerange](pricerange/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[printer](printer/component.html) | v20 | ok | old readme | picture.jpg | - | -
[progress](progress/component.html) | v20 | ok | added | picture.jpg | - | -
[prompt](prompt/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[properties](properties/component.html) | v19 | ok | old readme | picture.jpg | options | 3
[properties2](properties2/component.html) | v19 | ok | old readme | picture.jpg | options | 3
[qrcode](qrcode/component.html) | v20 | ok | added | picture.jpg | - | -
[radiobutton](radiobutton/component.html) | v19 | ok | added | picture.jpg | - | 1
[radiobuttonexpert](radiobuttonexpert/component.html) | v20 | ok | old readme | picture.jpg | - | -
[range](range/component.html) | v19 | ok | added | picture.jpg | - | 1
[rating](rating/component.html) | v20 | ok | added | picture.jpg | - | -
[raweditable](raweditable/component.html) | v20 | ok | added | picture.jpg | - | -
[rawinput](rawinput/component.html) | v20 | ok | added | picture.jpg | - | -
[ready](ready/component.html) | v20 | ok | old readme | picture.jpg | - | -
[recaptcha](recaptcha/component.html) | v20 | ok | added | picture.jpg | - | -
[releaser](releaser/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[remember](remember/component.html) | v20 | ok | old readme | picture.jpg | - | -
[repeater](repeater/component.html) | v19 | ok | added | picture.jpg | - | 1
[repeatergroup](repeatergroup/component.html) | v19 | ok | added | picture.jpg | - | 1
[resource](resource/component.html) | v20 | ok | old readme | picture.jpg | - | -
[restart](restart/component.html) | v20 | ok | old readme | converted from gif | - | -
[rows](rows/component.html) | v20 | ok | old readme | picture.jpg | - | -
[rules](rules/component.html) | v20 | ok | old readme | picture.jpg | options | -
[scanner](scanner/component.html) | v19 | ok | old readme | generated | - | 2
[scrollbar](scrollbar/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[scrollpercentage](scrollpercentage/component.html) | v20 | ok | old readme | converted from gif | - | -
[search](search/component.html) | v20 | ok | old readme | picture.jpg | - | -
[searchbox](searchbox/component.html) | v20 | ok | old readme | picture.jpg | - | -
[searchdata](searchdata/component.html) | v20 | ok | old readme | picture.jpg | options | -
[searchinput](searchinput/component.html) | v20 | ok | old readme | picture.jpg | - | -
[section](section/component.html) | v20 | ok | added | picture.jpg | - | 1
[selectbox](selectbox/component.html) | v20 | ok | added | picture.jpg | - | -
[selected](selected/component.html) | v20 | ok | old readme | picture.jpg | - | -
[selection](selection/component.html) | v20 | ok | old readme | picture.jpg | options | -
[servergrid](servergrid/component.html) | v20 | ok | added | picture.jpg | - | 1
[serverlist](serverlist/component.html) | v20 | ok | old readme | picture.jpg | options | 1
[serverlisting](serverlisting/component.html) | v20 | ok | old readme | picture.jpg | options | -
[serviceworker](serviceworker/component.html) | v20 | ok | added | picture.jpg | - | -
[shoppingcart](shoppingcart/component.html) | v20 | ok | added | picture.jpg | - | -
[shortcuts](shortcuts/component.html) | v20 | ok | old readme | picture.jpg | - | -
[singleupload](singleupload/component.html) | v19 | ok | added | picture.jpg | - | 2
[slider](slider/component.html) | v20 | ok | old readme | picture.jpg | - | -
[snackbar](snackbar/component.html) | v20 | ok | added | picture.jpg | - | -
[sounds](sounds/component.html) | v20 | ok | old readme | picture.jpg | - | -
[splashscreen](splashscreen/component.html) | v19 | ok | added | picture.jpg | options | 1
[spotlight](spotlight/component.html) | v20 | ok | added | picture.jpg | - | -
[stash](stash/component.html) | v20 | ok | old readme | picture.jpg | options | -
[stats12](stats12/component.html) | v20 | ok | added | picture.jpg | - | -
[stats24](stats24/component.html) | v20 | ok | added | picture.jpg | - | -
[stats7](stats7/component.html) | v20 | ok | added | picture.jpg | - | -
[statsbarsimple](statsbarsimple/component.html) | v20 | ok | old readme | picture.jpg | - | -
[statusinput](statusinput/component.html) | v20 | ok | added | picture.jpg | - | -
[sticker](sticker/component.html) | v20 | ok | added | picture.jpg | - | -
[submit](submit/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[suggestion](suggestion/component.html) | v20 | ok | old readme | picture.jpg | - | -
[svgicons](svgicons/component.html) | v20 | message | added | picture.jpg | - | 3
[swiper](swiper/component.html) | v20 | ok | added | picture.jpg | - | 3
[switchbutton](switchbutton/component.html) | v20 | ok | added | picture.jpg | - | -
[table](table/component.html) | v20 | ok | added | picture.jpg | options | -
[tablegrid](tablegrid/component.html) | v20 | ok | old readme | picture.jpg | options | -
[tabmenu](tabmenu/component.html) | v20 | ok | added | picture.jpg | - | -
[tabs](tabs/component.html) | v20 | ok | added | converted from gif | - | 1
[tagger](tagger/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[template](template/component.html) | v20 | ok | added | picture.jpg | - | -
[templates](templates/component.html) | v20 | ok | added | picture.jpg | - | -
[textarea](textarea/component.html) | v20 | ok | added | picture.jpg | - | -
[textbox](textbox/component.html) | v20 | ok | added | picture.jpg | - | 13
[textboxlist](textboxlist/component.html) | v19 | ok | added | picture.jpg | - | 1
[textboxtags](textboxtags/component.html) | v19 | ok | added | picture.jpg | - | 1
[time](time/component.html) | v20 | ok | old readme | picture.jpg | - | -
[timepicker](timepicker/component.html) | v20 | ok | old readme | picture.jpg | - | -
[title](title/component.html) | v20 | ok | added | picture.jpg | - | -
[togglebox](togglebox/component.html) | v19 | ok | old readme | converted from gif | - | 1
[togglebutton](togglebutton/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[togglemore](togglemore/component.html) | v20 | ok | old readme | picture.jpg | - | -
[tooltip](tooltip/component.html) | v19 | ok | added | picture.jpg | - | 1
[totaltemplates](totaltemplates/component.html) | v20 | ok | old readme | picture.jpg | - | -
[touchmove](touchmove/component.html) | v19 | ok | old readme | picture.jpg | options, config section | 1
[tour](tour/component.html) | v19 | ok | added | picture.jpg | - | 1
[tree](tree/component.html) | v20 | ok | old readme | picture.jpg | - | -
[treeview](treeview/component.html) | v20 | ok | old readme | picture.jpg | options | 2
[typed](typed/component.html) | v20 | ok | added | picture.jpg | - | -
[uibuilder](uibuilder/component.html) | v20 | ok | old readme | picture.jpg | - | -
[uieditor](uieditor/component.html) | v20 | ok | old readme | picture.jpg | options | -
[uistudio](uistudio/component.html) | v20 | ok | old readme | picture.jpg | options | -
[unsaved](unsaved/component.html) | v20 | ok | added | picture.jpg | - | -
[upload](upload/component.html) | v19 | ok | old readme | picture.jpg | - | 2
[validate](validate/component.html) | v20 | ok | old readme | picture.jpg | - | -
[validation](validation/component.html) | v20 | ok | old readme | picture.jpg | - | -
[view](view/component.html) | v20 | ok | old readme | picture.jpg | - | -
[viewbox](viewbox/component.html) | v20 | ok | added | picture.jpg | - | -
[virtualwire](virtualwire/component.html) | v20 | ok | old readme | picture.jpg | config section | -
[watch](watch/component.html) | v20 | ok | old readme | picture.jpg | - | -
[watcher](watcher/component.html) | v20 | ok | added | picture.jpg | - | -
[websocket](websocket/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[wiki](wiki/component.html) | v19 | ok | old readme | picture.jpg | options | 34
[window](window/component.html) | v20 | ok | added | converted from gif | - | 2
[windows](windows/component.html) | v20 | ok | old readme | picture.jpg | - | 1
[wizardexpert](wizardexpert/component.html) | v19 | ok | old readme | picture.jpg | - | 1
[wysiwyg](wysiwyg/component.html) | v20 | ok | added | picture.jpg | - | 1
[xterm](xterm/component.html) | v20 | ok | old readme | picture.jpg | - | -
