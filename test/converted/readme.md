# Converted components (evidence)

The result of `node tools/convert.js` over the components of the classic format of `totaljs/components` (branch `master`, folders `j-*`). Generated on 2026-11-03 11:12. Every folder has the new declaration: `component.html`, `readme.md` and `preview.jpg` (the old `picture.jpg`).

**This is the mechanical part only.** It is what the tool does without an AI: the code of every component is untouched (only the no-op `self.nocompile()` is removed). The rest (see "To finish") is done by an AI following [`SKILL.md`](../../SKILL.md).

```bash
for d in j-*/; do node tools/convert.js "$d" --out test/converted; done
node tools/check.js test/converted/<name> --legacy
```

## Numbers

| | |
| --- | --- |
| jComponents converted | **329** folders (330 components with `component.js` of 331 folders `j-*`; `j-QRCode` and `j-QRCodeGenerator` register the same name, see below) |
| Packages that are not jComponents, converted with their css, js and example (Tangular helpers, CSS, templates) | **19** (`package` in the table; the CSS package `Tooltip` is `tooltip-css` because `tooltip` is a jComponent) |
| Open in Chrome with no JavaScript error of their own | **345** of 348 (3 report a message of the environment, see [log.md](log.md)) |
| jComponents that declare v20 (`spa.min@20`) | 259 |
| jComponents that declare only v19 (`spa.min@19`, they need an update to run on v20) | 70 |
| **Description added by the AI** | **180** |
| **Preview converted** (the old picture is `picture.gif` or `picture.png`; a gif keeps its first frame) | **18** |
| **Preview generated** (the old component has no picture at all: `scanner`) | **1** |
| Still to finish: options of the default configuration not documented in the readme | 64 |
| Still to finish: `__Configuration__:` section missing | 10 |
| No errors in `check.js --legacy` | 280 |

The errors, warnings and messages that were seen are in [log.md](log.md), and all the warnings, one by one, in [warnings.md](warnings.md).

Descriptions are written from the old readme and from the code, in one sentence. The old description was kept when the old readme had a usable first sentence ("old readme" in the table).

## Not converted

- `j-QRCodeGenerator`: it registers the same name as `j-QRCode` (`qrcode`), so both would end in `qrcode/` and one would overwrite the other. Only `qrcode` (from `j-QRCode`) is here. For Peter to review: they could be `qrcode` and `qrcodegenerator`, but then the name inside `COMPONENT(...)` and the CSS classes of the second one have to change.
- `0cdn`, `0dependencies`, `0emptycomponent`: the files of the CDN and the empty template of the old repository, not components.

The packages that are not jComponents (`csv-export`, `html-5-template`, `intranet-css`, `mailify`, `print-custom-html`, `responsivelayout`, `smilefy`, `tags`, `tangular-*`, `tooltip-css`, `urlify`) are converted the same way: the CSS goes to `<style component>`, the JavaScript (if it has) to `<script component>` and the example is the body of the page. The `<style>` blocks that their examples had are their CSS. They have no `COMPONENT(...)`, so `check.js` does not ask for the selectors or the options.

## Per component

Folder | Type | jComponent | Browser | Description | Preview | Still to finish | Warnings
--- | --- | --- | --- | --- | --- | --- | ---
[ajaxloading](ajaxloading/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[animation](animation/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[approve](approve/component.html) | component | v20 | ok | added | picture.jpg | - | -
[aselected](aselected/component.html) | component | v20 | ok | added | picture.jpg | - | -
[attachments](attachments/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[audio](audio/component.html) | component | v20 | message | added | picture.jpg | - | -
[autocomplete](autocomplete/component.html) | component | v20 | ok | added | picture.jpg | options, config section | -
[autodarkmode](autodarkmode/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[autoexec](autoexec/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[autofill](autofill/component.html) | component | v20 | ok | added | picture.jpg | - | -
[autoselect](autoselect/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[avatar](avatar/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[backtotop](backtotop/component.html) | component | v20 | ok | added | converted from gif | - | -
[backup](backup/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[banners](banners/component.html) | component | v20 | ok | added | picture.jpg | options, config section | -
[barchart](barchart/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[box](box/component.html) | component | v20 | ok | added | picture.jpg | - | 2
[breadcrumb](breadcrumb/component.html) | component | v20 | ok | added | picture.jpg | options | -
[button](button/component.html) | component | v19 | ok | old readme | picture.jpg | options | 1
[calendar](calendar/component.html) | component | v19 | ok | old readme | picture.jpg | options | 1
[carousel](carousel/component.html) | component | v20 | ok | added | picture.jpg | - | -
[carousel2](carousel2/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[centered](centered/component.html) | component | v20 | ok | added | picture.jpg | - | -
[changer](changer/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[checkbox](checkbox/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[checkboxlist](checkboxlist/component.html) | component | v19 | ok | added | picture.jpg | - | 2
[checkboxlistexpert](checkboxlistexpert/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[checkpath](checkpath/component.html) | component | v20 | ok | added | picture.jpg | - | -
[children](children/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[choose](choose/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[chunkyscroll](chunkyscroll/component.html) | component | v20 | ok | added | picture.jpg | options | 1
[cl](cl/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[clbind](clbind/component.html) | component | v20 | ok | added | picture.jpg | options | 13
[click](click/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[clickbox](clickbox/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[clipboard](clipboard/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[clipboardimage](clipboardimage/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[clock](clock/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[cloudeditor](cloudeditor/component.html) | component | v20 | ok | added | picture.jpg | - | -
[cloudeditorsimple](cloudeditorsimple/component.html) | component | v20 | ok | added | picture.jpg | - | -
[code](code/component.html) | component | v20 | ok | added | picture.jpg | - | -
[codemirror](codemirror/component.html) | component | v19 | ok | added | picture.jpg | - | 80
[colorpicker](colorpicker/component.html) | component | v20 | ok | added | picture.jpg | - | -
[colorpickerbutton](colorpickerbutton/component.html) | component | v20 | ok | added | picture.jpg | options | -
[colorselector](colorselector/component.html) | component | v20 | ok | added | picture.jpg | options | -
[columns](columns/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[configuration](configuration/component.html) | component | v20 | ok | added | picture.jpg | - | -
[confirm](confirm/component.html) | component | v20 | ok | added | picture.jpg | - | -
[console](console/component.html) | component | v20 | ok | added | picture.jpg | - | -
[console2](console2/component.html) | component | v20 | ok | added | converted from gif | - | -
[contenteditable](contenteditable/component.html) | component | v19 | ok | added | picture.jpg | - | 2
[contentslider](contentslider/component.html) | component | v20 | ok | added | picture.jpg | - | -
[contextmenu](contextmenu/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[controls](controls/component.html) | component | v20 | ok | added | picture.jpg | - | -
[cookie](cookie/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[cookie2](cookie2/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[countdown](countdown/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[crop](crop/component.html) | component | v20 | ok | added | picture.jpg | - | -
[csv-export](csv-export/component.html) | package | v19 | ok | added | picture.jpg | - | 1
[dashboard](dashboard/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[datagrid](datagrid/component.html) | component | v20 | ok | old readme | converted from gif | options | 182
[datasource](datasource/component.html) | component | v20 | message | added | picture.jpg | - | -
[datatable](datatable/component.html) | component | v20 | ok | added | picture.jpg | options | -
[datepicker](datepicker/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[detach](detach/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[detail](detail/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[developer](developer/component.html) | component | v19 | ok | added | picture.jpg | options, config section | 1
[diagram](diagram/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[directory](directory/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[disable](disable/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[display](display/component.html) | component | v20 | ok | old readme | picture.jpg | - | 10
[dockable](dockable/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[donutchart](donutchart/component.html) | component | v20 | ok | added | picture.jpg | - | -
[dragdropelement](dragdropelement/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[dragdropfiles](dragdropfiles/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[draggable](draggable/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[drawer](drawer/component.html) | component | v20 | ok | added | picture.jpg | config section | -
[drawzone](drawzone/component.html) | component | v20 | ok | added | picture.jpg | options | -
[dropdown](dropdown/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[dropdowncheckbox](dropdowncheckbox/component.html) | component | v20 | ok | added | picture.jpg | - | -
[dropdownlist](dropdownlist/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[dropfiles](dropfiles/component.html) | component | v20 | ok | added | picture.jpg | - | -
[duplicator](duplicator/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[dynamicvalue](dynamicvalue/component.html) | component | v20 | ok | old readme | picture.jpg | options, config section | -
[dynamicvaluelist](dynamicvaluelist/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[EAN13](EAN13/component.html) | component | v20 | ok | old readme | converted from png | options | -
[edit](edit/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[editable](editable/component.html) | component | v19 | ok | old readme | picture.jpg | - | 2
[elementid](elementid/component.html) | component | v20 | ok | old readme | converted from gif | - | -
[emoji](emoji/component.html) | component | v19 | ok | added | picture.jpg | - | 2
[emojibutton](emojibutton/component.html) | component | v19 | ok | added | picture.jpg | options | 1
[empty](empty/component.html) | component | v20 | ok | added | picture.jpg | - | -
[emptyinline](emptyinline/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[enter](enter/component.html) | component | v20 | ok | added | picture.jpg | options | -
[enterbox](enterbox/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[error](error/component.html) | component | v20 | ok | added | picture.jpg | - | -
[errorhandler](errorhandler/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[exec](exec/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[expander](expander/component.html) | component | v20 | ok | added | picture.jpg | - | -
[expansionpanel](expansionpanel/component.html) | component | v20 | ok | added | converted from gif | - | -
[extend](extend/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[faicons](faicons/component.html) | component | v19 | ok | added | picture.jpg | options | 1
[faiconsbutton](faiconsbutton/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[faviconunread](faviconunread/component.html) | component | v20 | ok | added | picture.jpg | - | -
[features](features/component.html) | component | v20 | ok | added | picture.jpg | - | -
[feedbackbutton](feedbackbutton/component.html) | component | v20 | ok | added | picture.jpg | - | -
[filebrowser](filebrowser/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[filereader](filereader/component.html) | component | v20 | ok | added | picture.jpg | - | -
[filesaver](filesaver/component.html) | component | v20 | ok | added | picture.jpg | - | -
[fileupload](fileupload/component.html) | component | v19 | ok | old readme | picture.jpg | - | 2
[fileuploader](fileuploader/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[fileuploadlist](fileuploadlist/component.html) | component | v19 | ok | old readme | picture.jpg | - | 2
[filter](filter/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[fixedmodal](fixedmodal/component.html) | component | v20 | ok | old readme | picture.jpg | - | 2
[floatingbox](floatingbox/component.html) | component | v20 | ok | added | picture.jpg | - | 3
[floatinginput](floatinginput/component.html) | component | v20 | ok | added | picture.jpg | options | -
[floatingpanel](floatingpanel/component.html) | component | v20 | ok | old readme | picture.jpg | options, config section | -
[floatingsearch](floatingsearch/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[flow](flow/component.html) | component | v20 | ok | added | picture.jpg | options | 2
[floweditor](floweditor/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[folder](folder/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[fontawesome](fontawesome/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[fontawesomebox](fontawesomebox/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[form](form/component.html) | component | v20 | ok | added | picture.jpg | - | 2
[formdata](formdata/component.html) | component | v20 | ok | old readme | picture.jpg | config section | -
[formtab](formtab/component.html) | component | v20 | ok | added | converted from gif | - | 1
[fullform](fullform/component.html) | component | v20 | ok | added | picture.jpg | options | 3
[gallery](gallery/component.html) | component | v20 | ok | added | picture.jpg | - | -
[gauge](gauge/component.html) | component | v20 | ok | added | picture.jpg | - | -
[gps](gps/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[grid](grid/component.html) | component | v19 | ok | added | picture.jpg | options | 4
[hashchange](hashchange/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[highlightsyntax](highlightsyntax/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[html-5-template](html-5-template/component.html) | package | v19 | ok | added | picture.jpg | - | 1
[icons](icons/component.html) | component | v20 | ok | added | picture.jpg | options | -
[idletime](idletime/component.html) | component | v20 | ok | added | picture.jpg | - | -
[iframe](iframe/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[iframeeditable](iframeeditable/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[iframepreview](iframepreview/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[iframeviewer](iframeviewer/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[imageuploader](imageuploader/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[imageviewer](imageviewer/component.html) | component | v20 | ok | added | picture.jpg | - | -
[importcsv](importcsv/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[importer](importer/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[infinitescroll](infinitescroll/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[info](info/component.html) | component | v19 | ok | added | converted from png | - | 1
[infowindows](infowindows/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[inlinedatepicker](inlinedatepicker/component.html) | component | v20 | ok | added | picture.jpg | - | -
[inlineform](inlineform/component.html) | component | v19 | ok | added | picture.jpg | - | 3
[inlineproperties](inlineproperties/component.html) | component | v20 | ok | added | picture.jpg | - | -
[input](input/component.html) | component | v20 | ok | added | picture.jpg | options | -
[inputtags](inputtags/component.html) | component | v20 | ok | added | picture.jpg | - | -
[intranet-css](intranet-css/component.html) | package | v20 | ok | added | picture.jpg | - | -
[intro](intro/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[isopen](isopen/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[jsontree](jsontree/component.html) | component | v20 | ok | added | converted from png | - | 11
[kanban](kanban/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[keyselection](keyselection/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[keyvalue](keyvalue/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[largeform](largeform/component.html) | component | v20 | ok | added | picture.jpg | options | 3
[layer](layer/component.html) | component | v19 | ok | added | converted from gif | options | 3
[layout](layout/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[layout2](layout2/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[lazycontent](lazycontent/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[lazyimages](lazyimages/component.html) | component | v20 | ok | added | picture.jpg | - | -
[lazyload](lazyload/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[leaflet](leaflet/component.html) | component | v20 | ok | added | picture.jpg | - | 5
[linechart](linechart/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[listbox](listbox/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[listdetail](listdetail/component.html) | component | v20 | ok | added | picture.jpg | - | -
[listform](listform/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[listing](listing/component.html) | component | v20 | ok | added | picture.jpg | - | -
[listmenu](listmenu/component.html) | component | v19 | ok | old readme | picture.jpg | - | 3
[listmenueditable](listmenueditable/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[livestats](livestats/component.html) | component | v20 | ok | added | picture.jpg | - | -
[loadcontent](loadcontent/component.html) | component | v20 | ok | added | picture.jpg | - | -
[loading](loading/component.html) | component | v20 | ok | added | picture.jpg | - | -
[locale](locale/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[mailify](mailify/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[mainprogress](mainprogress/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[map](map/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[mapmarker](mapmarker/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[mapzones](mapzones/component.html) | component | v20 | ok | added | picture.jpg | - | -
[markdown](markdown/component.html) | component | v20 | ok | old readme | picture.jpg | - | 94
[markdowneditor](markdowneditor/component.html) | component | v19 | ok | added | picture.jpg | - | 6
[markdownpreview](markdownpreview/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[masonry](masonry/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[menu](menu/component.html) | component | v20 | ok | added | picture.jpg | - | -
[message](message/component.html) | component | v20 | ok | added | picture.jpg | - | -
[minheight](minheight/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[miniform](miniform/component.html) | component | v20 | ok | added | picture.jpg | - | 2
[mobilecarousel](mobilecarousel/component.html) | component | v20 | ok | old readme | converted from gif | - | -
[modal](modal/component.html) | component | v20 | ok | old readme | picture.jpg | - | 2
[modificator](modificator/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[monacoeditor](monacoeditor/component.html) | component | v20 | ok | added | picture.jpg | - | -
[monthlycalendar](monthlycalendar/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[movable](movable/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[movement](movement/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[multioptions](multioptions/component.html) | component | v19 | ok | added | picture.jpg | - | 42
[nativenotifications](nativenotifications/component.html) | component | v20 | ok | added | picture.jpg | - | -
[navigation](navigation/component.html) | component | v20 | ok | added | picture.jpg | - | -
[navlayout](navlayout/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[noscrollbar](noscrollbar/component.html) | component | v20 | ok | added | picture.jpg | - | 5
[nosqlcounter](nosqlcounter/component.html) | component | v19 | ok | added | picture.jpg | options | 1
[notifications](notifications/component.html) | component | v19 | ok | added | picture.jpg | - | 11
[notificationspanel](notificationspanel/component.html) | component | v20 | ok | added | picture.jpg | - | -
[notify](notify/component.html) | component | v20 | ok | added | picture.jpg | - | -
[notifybar](notifybar/component.html) | component | v20 | ok | added | picture.jpg | - | -
[objecteditor](objecteditor/component.html) | component | v20 | ok | added | picture.jpg | - | 47
[objecttree](objecttree/component.html) | component | v20 | ok | old readme | picture.jpg | options | 1
[offline](offline/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[onetime](onetime/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[packeta](packeta/component.html) | component | v20 | ok | added | picture.jpg | - | -
[page](page/component.html) | component | v20 | ok | old readme | picture.jpg | - | 2
[pages](pages/component.html) | component | v20 | ok | old readme | picture.jpg | config section | -
[pagination](pagination/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[panel](panel/component.html) | component | v20 | ok | added | converted from gif | options | 2
[paper](paper/component.html) | component | v20 | ok | added | picture.jpg | - | -
[parameters](parameters/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[part](part/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[parts](parts/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[passwordmeter](passwordmeter/component.html) | component | v20 | ok | added | picture.jpg | options | -
[paste](paste/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[period](period/component.html) | component | v19 | ok | old readme | picture.jpg | options | 1
[permissions](permissions/component.html) | component | v20 | ok | added | picture.jpg | - | -
[permissionsop](permissionsop/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[pictures](pictures/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[pictureupload](pictureupload/component.html) | component | v19 | ok | added | picture.jpg | options | 1
[pictureuploadexpert](pictureuploadexpert/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[pin](pin/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[planner](planner/component.html) | component | v20 | ok | added | picture.jpg | - | 2
[preview](preview/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[pricerange](pricerange/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[print-custom-html](print-custom-html/component.html) | package | v20 | ok | added | picture.jpg | - | -
[printer](printer/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[progress](progress/component.html) | component | v20 | ok | added | picture.jpg | - | -
[prompt](prompt/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[properties](properties/component.html) | component | v19 | ok | old readme | picture.jpg | options | 3
[properties2](properties2/component.html) | component | v19 | ok | old readme | picture.jpg | options | 3
[qrcode](qrcode/component.html) | component | v20 | ok | added | picture.jpg | - | -
[radiobutton](radiobutton/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[radiobuttonexpert](radiobuttonexpert/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[range](range/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[rating](rating/component.html) | component | v20 | ok | added | picture.jpg | - | -
[raweditable](raweditable/component.html) | component | v20 | ok | added | picture.jpg | - | -
[rawinput](rawinput/component.html) | component | v20 | ok | added | picture.jpg | - | -
[ready](ready/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[recaptcha](recaptcha/component.html) | component | v20 | ok | added | picture.jpg | - | -
[releaser](releaser/component.html) | component | v20 | ok | old readme | picture.jpg | - | 1
[remember](remember/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[repeater](repeater/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[repeatergroup](repeatergroup/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[resource](resource/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[responsivelayout](responsivelayout/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[restart](restart/component.html) | component | v20 | ok | old readme | converted from gif | - | -
[rows](rows/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[rules](rules/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[scanner](scanner/component.html) | component | v19 | ok | old readme | generated | - | 2
[scrollbar](scrollbar/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[scrollpercentage](scrollpercentage/component.html) | component | v20 | ok | old readme | converted from gif | - | -
[search](search/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[searchbox](searchbox/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[searchdata](searchdata/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[searchinput](searchinput/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[section](section/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[selectbox](selectbox/component.html) | component | v20 | ok | added | picture.jpg | - | -
[selected](selected/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[selection](selection/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[servergrid](servergrid/component.html) | component | v20 | ok | added | picture.jpg | - | -
[serverlist](serverlist/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[serverlisting](serverlisting/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[serviceworker](serviceworker/component.html) | component | v20 | ok | added | picture.jpg | - | -
[shoppingcart](shoppingcart/component.html) | component | v20 | ok | added | picture.jpg | - | -
[shortcuts](shortcuts/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[singleupload](singleupload/component.html) | component | v19 | ok | added | picture.jpg | - | 2
[slider](slider/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[smilefy](smilefy/component.html) | package | v20 | ok | added | picture.jpg | - | -
[snackbar](snackbar/component.html) | component | v20 | ok | added | picture.jpg | - | -
[sounds](sounds/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[splashscreen](splashscreen/component.html) | component | v19 | ok | added | picture.jpg | options | 1
[spotlight](spotlight/component.html) | component | v20 | ok | added | picture.jpg | - | -
[stash](stash/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[stats12](stats12/component.html) | component | v20 | ok | added | picture.jpg | - | -
[stats24](stats24/component.html) | component | v20 | ok | added | picture.jpg | - | -
[stats7](stats7/component.html) | component | v20 | ok | added | picture.jpg | - | -
[statsbarsimple](statsbarsimple/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[statusinput](statusinput/component.html) | component | v20 | ok | added | picture.jpg | - | -
[sticker](sticker/component.html) | component | v20 | ok | added | picture.jpg | - | -
[submit](submit/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[suggestion](suggestion/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[svgicons](svgicons/component.html) | component | v20 | message | added | picture.jpg | - | 3
[swiper](swiper/component.html) | component | v20 | ok | added | picture.jpg | - | 3
[switchbutton](switchbutton/component.html) | component | v20 | ok | added | picture.jpg | - | -
[table](table/component.html) | component | v20 | ok | added | picture.jpg | options | -
[tablegrid](tablegrid/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[tabmenu](tabmenu/component.html) | component | v20 | ok | added | picture.jpg | - | -
[tabs](tabs/component.html) | component | v20 | ok | added | converted from gif | - | -
[tagger](tagger/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[tags](tags/component.html) | package | v20 | ok | added | picture.jpg | - | -
[tangular-autoformat](tangular-autoformat/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-badge](tangular-badge/component.html) | package | v20 | ok | added | converted from gif | - | -
[tangular-color](tangular-color/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-counter](tangular-counter/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-filesize](tangular-filesize/component.html) | package | v20 | ok | added | picture.jpg | - | -
[tangular-initials](tangular-initials/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-jsonformat](tangular-jsonformat/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-rgba](tangular-rgba/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[tangular-time](tangular-time/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[template](template/component.html) | component | v20 | ok | added | picture.jpg | - | -
[templates](templates/component.html) | component | v20 | ok | added | picture.jpg | - | -
[textarea](textarea/component.html) | component | v20 | ok | added | picture.jpg | - | -
[textbox](textbox/component.html) | component | v20 | ok | added | picture.jpg | - | 13
[textboxlist](textboxlist/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[textboxtags](textboxtags/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[time](time/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[timepicker](timepicker/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[title](title/component.html) | component | v20 | ok | added | picture.jpg | - | -
[togglebox](togglebox/component.html) | component | v19 | ok | old readme | converted from gif | - | 1
[togglebutton](togglebutton/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[togglemore](togglemore/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[tooltip](tooltip/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[tooltip-css](tooltip-css/component.html) | package | v20 | ok | added | picture.jpg | - | -
[totaltemplates](totaltemplates/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[touchmove](touchmove/component.html) | component | v19 | ok | old readme | picture.jpg | options, config section | 1
[tour](tour/component.html) | component | v19 | ok | added | picture.jpg | - | 1
[tree](tree/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[treeview](treeview/component.html) | component | v20 | ok | old readme | picture.jpg | options | 1
[typed](typed/component.html) | component | v20 | ok | added | picture.jpg | - | -
[uibuilder](uibuilder/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[uieditor](uieditor/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[uistudio](uistudio/component.html) | component | v20 | ok | old readme | picture.jpg | options | -
[unsaved](unsaved/component.html) | component | v20 | ok | added | picture.jpg | - | -
[upload](upload/component.html) | component | v19 | ok | old readme | picture.jpg | - | 2
[urlify](urlify/component.html) | package | v20 | ok | old readme | picture.jpg | - | -
[validate](validate/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[validation](validation/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[view](view/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[viewbox](viewbox/component.html) | component | v20 | ok | added | picture.jpg | - | -
[virtualwire](virtualwire/component.html) | component | v20 | ok | old readme | picture.jpg | config section | -
[watch](watch/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[watcher](watcher/component.html) | component | v20 | ok | added | picture.jpg | - | -
[websocket](websocket/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[wiki](wiki/component.html) | component | v19 | ok | old readme | picture.jpg | options | 34
[window](window/component.html) | component | v20 | ok | added | converted from gif | - | 2
[windows](windows/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
[wizardexpert](wizardexpert/component.html) | component | v19 | ok | old readme | picture.jpg | - | 1
[wysiwyg](wysiwyg/component.html) | component | v20 | ok | added | picture.jpg | - | 1
[xterm](xterm/component.html) | component | v20 | ok | old readme | picture.jpg | - | -
