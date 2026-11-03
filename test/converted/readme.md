# Converted components (evidence)

The result of `node tools/convert.js` over the components of the classic format of `totaljs/components` (branch `master`, folders `j-*`). Generated on 2026-11-03 10:10. Every folder has the new declaration: `component.html`, `readme.md` and `preview.jpg` (the old `picture.jpg`).

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
| Complete after the tool (no errors in `check.js --legacy`) | 160 |
| To finish by the AI: `description: TODO` | 108 |
| To finish by the AI: options of the default configuration not documented in the readme | 64 |
| To finish by the AI: `__Configuration__:` section missing | 10 |
| To finish by the AI: no `preview.jpg` (the old one did not exist) | 18 |

## What was not converted

- `j-ResponsiveLayout`: it has no `component.js`.
- `j-QRCodeGenerator`: it registers the same name as `j-QRCode` (`qrcode`), so both end in `qrcode/` (one overwrites the other).
- Tangular helpers and templates (`Tangular-*`, `URLify`, `Mailify`, `Smilefy`...): they are not jComponents.

## Warnings (rules for new components that the old code does not follow)

`check.js --legacy` reports them as warnings because converting must not change the behaviour: selectors that are not scoped under `.ui-<name>` (for example `datagrid`, `codemirror`), `id="..."` attributes, `self.release()`. They are listed per component in the `Warnings` column.

## Messages of the browser test

Opened from disk with Chrome, a few components report something that comes from the test environment and not from the conversion: `audio` (the browser does not allow sound without a click), `datasource` (CORS with the example URL), `svgicons` (loads a file with `file://`). The components that declare v19 only run on `spa.min@19`: forcing `spa.min@20` on them made 8 fail (`NOTMODIFIED is not defined`, `self.compile is not a function`...), so the tool keeps the version that each component declares.

## Per component

Folder | jComponent | Browser | To finish | Warnings
--- | --- | --- | --- | ---
[ajaxloading](ajaxloading/component.html) | v20 | ok | - | -
[animation](animation/component.html) | v20 | ok | - | 1
[approve](approve/component.html) | v20 | ok | - | -
[aselected](aselected/component.html) | v20 | ok | - | -
[attachments](attachments/component.html) | v20 | ok | - | 1
[audio](audio/component.html) | v20 | message | description | -
[autocomplete](autocomplete/component.html) | v20 | ok | options, config section | -
[autodarkmode](autodarkmode/component.html) | v20 | ok | - | -
[autoexec](autoexec/component.html) | v20 | ok | - | -
[autofill](autofill/component.html) | v20 | ok | - | -
[autoselect](autoselect/component.html) | v20 | ok | - | -
[avatar](avatar/component.html) | v20 | ok | - | 1
[backtotop](backtotop/component.html) | v20 | ok | description, preview | -
[backup](backup/component.html) | v20 | ok | options | -
[banners](banners/component.html) | v20 | ok | description, options, config section | -
[barchart](barchart/component.html) | v20 | ok | options | -
[box](box/component.html) | v20 | ok | - | 2
[breadcrumb](breadcrumb/component.html) | v20 | ok | description, options | -
[button](button/component.html) | v19 | ok | options | 1
[calendar](calendar/component.html) | v19 | ok | options | 1
[carousel](carousel/component.html) | v20 | ok | description | -
[carousel2](carousel2/component.html) | v20 | ok | options | -
[centered](centered/component.html) | v20 | ok | - | -
[changer](changer/component.html) | v20 | ok | - | -
[checkbox](checkbox/component.html) | v19 | ok | description | 1
[checkboxlist](checkboxlist/component.html) | v19 | ok | description | 2
[checkboxlistexpert](checkboxlistexpert/component.html) | v20 | ok | - | -
[checkpath](checkpath/component.html) | v20 | ok | description | -
[children](children/component.html) | v20 | ok | - | 1
[choose](choose/component.html) | v20 | ok | options | -
[chunkyscroll](chunkyscroll/component.html) | v20 | ok | description, options | 1
[cl](cl/component.html) | v20 | ok | - | -
[clbind](clbind/component.html) | v20 | ok | options | 13
[click](click/component.html) | v19 | ok | - | 1
[clickbox](clickbox/component.html) | v19 | ok | - | 1
[clipboard](clipboard/component.html) | v20 | ok | description | 1
[clipboardimage](clipboardimage/component.html) | v20 | ok | - | -
[clock](clock/component.html) | v19 | ok | - | 1
[cloudeditor](cloudeditor/component.html) | v20 | ok | - | -
[cloudeditorsimple](cloudeditorsimple/component.html) | v20 | ok | - | -
[code](code/component.html) | v20 | ok | - | -
[codemirror](codemirror/component.html) | v19 | ok | description | 80
[colorpicker](colorpicker/component.html) | v20 | ok | - | -
[colorpickerbutton](colorpickerbutton/component.html) | v20 | ok | description, options | -
[colorselector](colorselector/component.html) | v20 | ok | description, options | -
[columns](columns/component.html) | v20 | ok | - | -
[configuration](configuration/component.html) | v20 | ok | - | -
[confirm](confirm/component.html) | v20 | ok | - | -
[console](console/component.html) | v20 | ok | description | 1
[console2](console2/component.html) | v20 | ok | description, preview | -
[contenteditable](contenteditable/component.html) | v19 | ok | description | 2
[contentslider](contentslider/component.html) | v20 | ok | description | -
[contextmenu](contextmenu/component.html) | v20 | ok | - | -
[controls](controls/component.html) | v20 | ok | - | -
[cookie](cookie/component.html) | v19 | ok | description | 1
[cookie2](cookie2/component.html) | v19 | ok | description | 1
[countdown](countdown/component.html) | v20 | ok | - | 1
[crop](crop/component.html) | v20 | ok | - | -
[dashboard](dashboard/component.html) | v20 | ok | - | 1
[datagrid](datagrid/component.html) | v20 | ok | options, preview | 183
[datasource](datasource/component.html) | v20 | message | - | -
[datatable](datatable/component.html) | v20 | ok | description, options | -
[datepicker](datepicker/component.html) | v20 | ok | - | -
[detach](detach/component.html) | v20 | ok | - | -
[detail](detail/component.html) | v20 | ok | - | 1
[developer](developer/component.html) | v19 | ok | options, config section | 1
[diagram](diagram/component.html) | v20 | ok | description | 2
[directory](directory/component.html) | v20 | ok | options | -
[disable](disable/component.html) | v19 | ok | - | 1
[display](display/component.html) | v20 | ok | - | 10
[dockable](dockable/component.html) | v20 | ok | options | 1
[donutchart](donutchart/component.html) | v20 | ok | description | -
[dragdropelement](dragdropelement/component.html) | v20 | ok | - | -
[dragdropfiles](dragdropfiles/component.html) | v20 | ok | description | 1
[draggable](draggable/component.html) | v20 | ok | - | -
[drawer](drawer/component.html) | v20 | ok | description, config section | -
[drawzone](drawzone/component.html) | v20 | ok | options | -
[dropdown](dropdown/component.html) | v20 | ok | description | 1
[dropdowncheckbox](dropdowncheckbox/component.html) | v20 | ok | description | -
[dropdownlist](dropdownlist/component.html) | v20 | ok | description | 1
[dropfiles](dropfiles/component.html) | v20 | ok | description | -
[duplicator](duplicator/component.html) | v19 | ok | description | 2
[dynamicvalue](dynamicvalue/component.html) | v20 | ok | options, config section | -
[dynamicvaluelist](dynamicvaluelist/component.html) | v20 | ok | options | -
[EAN13](EAN13/component.html) | v20 | ok | options, preview | -
[edit](edit/component.html) | v20 | ok | options | -
[editable](editable/component.html) | v19 | ok | - | 2
[elementid](elementid/component.html) | v20 | ok | preview | -
[emoji](emoji/component.html) | v19 | ok | - | 2
[emojibutton](emojibutton/component.html) | v19 | ok | description, options | 1
[empty](empty/component.html) | v20 | ok | description | -
[emptyinline](emptyinline/component.html) | v20 | ok | - | -
[enter](enter/component.html) | v20 | ok | options | -
[enterbox](enterbox/component.html) | v20 | ok | - | -
[error](error/component.html) | v20 | ok | description | -
[errorhandler](errorhandler/component.html) | v20 | ok | - | -
[exec](exec/component.html) | v20 | ok | - | 1
[expander](expander/component.html) | v20 | ok | description | -
[expansionpanel](expansionpanel/component.html) | v20 | ok | description, preview | -
[extend](extend/component.html) | v20 | ok | - | -
[faicons](faicons/component.html) | v19 | ok | options | 1
[faiconsbutton](faiconsbutton/component.html) | v19 | ok | description | 1
[faviconunread](faviconunread/component.html) | v20 | ok | description | -
[features](features/component.html) | v20 | ok | - | -
[feedbackbutton](feedbackbutton/component.html) | v20 | ok | description | -
[filebrowser](filebrowser/component.html) | v20 | ok | - | -
[filereader](filereader/component.html) | v20 | ok | description | -
[filesaver](filesaver/component.html) | v20 | ok | - | -
[fileupload](fileupload/component.html) | v19 | ok | - | 2
[fileuploader](fileuploader/component.html) | v20 | ok | - | -
[fileuploadlist](fileuploadlist/component.html) | v19 | ok | - | 2
[filter](filter/component.html) | v19 | ok | - | 1
[fixedmodal](fixedmodal/component.html) | v20 | ok | - | 2
[floatingbox](floatingbox/component.html) | v20 | ok | description | 4
[floatinginput](floatinginput/component.html) | v20 | ok | options | -
[floatingpanel](floatingpanel/component.html) | v20 | ok | options, config section | -
[floatingsearch](floatingsearch/component.html) | v20 | ok | - | -
[flow](flow/component.html) | v20 | ok | options | 2
[floweditor](floweditor/component.html) | v20 | ok | options | -
[folder](folder/component.html) | v20 | ok | - | -
[fontawesome](fontawesome/component.html) | v19 | ok | - | 1
[fontawesomebox](fontawesomebox/component.html) | v19 | ok | - | 1
[form](form/component.html) | v20 | ok | - | 2
[formdata](formdata/component.html) | v20 | ok | config section | -
[formtab](formtab/component.html) | v20 | ok | preview | 1
[fullform](fullform/component.html) | v20 | ok | options | 3
[gallery](gallery/component.html) | v20 | ok | description | -
[gauge](gauge/component.html) | v20 | ok | description | -
[gps](gps/component.html) | v20 | ok | - | -
[grid](grid/component.html) | v19 | ok | description, options | 4
[hashchange](hashchange/component.html) | v20 | ok | - | -
[highlightsyntax](highlightsyntax/component.html) | v20 | ok | - | 1
[icons](icons/component.html) | v20 | ok | options | -
[idletime](idletime/component.html) | v20 | ok | - | -
[iframe](iframe/component.html) | v20 | ok | - | -
[iframeeditable](iframeeditable/component.html) | v20 | ok | description | 1
[iframepreview](iframepreview/component.html) | v20 | ok | description | 1
[iframeviewer](iframeviewer/component.html) | v20 | ok | - | -
[imageuploader](imageuploader/component.html) | v20 | ok | - | -
[imageviewer](imageviewer/component.html) | v20 | ok | description | -
[importcsv](importcsv/component.html) | v20 | ok | - | 1
[importer](importer/component.html) | v20 | ok | - | -
[infinitescroll](infinitescroll/component.html) | v20 | ok | - | 1
[info](info/component.html) | v19 | ok | description, preview | 1
[infowindows](infowindows/component.html) | v20 | ok | - | 1
[inlinedatepicker](inlinedatepicker/component.html) | v20 | ok | description | -
[inlineform](inlineform/component.html) | v19 | ok | - | 3
[inlineproperties](inlineproperties/component.html) | v20 | ok | - | 1
[input](input/component.html) | v20 | ok | description, options | -
[inputtags](inputtags/component.html) | v20 | ok | description | -
[intro](intro/component.html) | v20 | ok | description | 1
[isopen](isopen/component.html) | v19 | ok | description | 1
[jsontree](jsontree/component.html) | v20 | ok | description, preview | 11
[kanban](kanban/component.html) | v20 | ok | description | 2
[keyselection](keyselection/component.html) | v20 | ok | - | -
[keyvalue](keyvalue/component.html) | v20 | ok | - | -
[largeform](largeform/component.html) | v20 | ok | options | 3
[layer](layer/component.html) | v19 | ok | description, options, preview | 3
[layout](layout/component.html) | v19 | ok | - | 1
[layout2](layout2/component.html) | v20 | ok | options | -
[lazycontent](lazycontent/component.html) | v19 | ok | - | 1
[lazyimages](lazyimages/component.html) | v20 | ok | - | -
[lazyload](lazyload/component.html) | v20 | ok | description | 1
[leaflet](leaflet/component.html) | v20 | ok | - | 5
[linechart](linechart/component.html) | v20 | ok | options | -
[listbox](listbox/component.html) | v19 | ok | description | 1
[listdetail](listdetail/component.html) | v20 | ok | - | -
[listform](listform/component.html) | v20 | ok | - | -
[listing](listing/component.html) | v20 | ok | description | -
[listmenu](listmenu/component.html) | v19 | ok | - | 3
[listmenueditable](listmenueditable/component.html) | v20 | ok | options | -
[livestats](livestats/component.html) | v20 | ok | description | 1
[loadcontent](loadcontent/component.html) | v20 | ok | - | -
[loading](loading/component.html) | v20 | ok | description | -
[locale](locale/component.html) | v20 | ok | - | -
[mainprogress](mainprogress/component.html) | v20 | ok | - | -
[map](map/component.html) | v19 | ok | description | 1
[mapmarker](mapmarker/component.html) | v19 | ok | description | 1
[mapzones](mapzones/component.html) | v20 | ok | - | -
[markdown](markdown/component.html) | v20 | ok | - | 94
[markdowneditor](markdowneditor/component.html) | v19 | ok | - | 6
[markdownpreview](markdownpreview/component.html) | v19 | ok | - | 1
[masonry](masonry/component.html) | v20 | ok | - | -
[menu](menu/component.html) | v20 | ok | - | -
[message](message/component.html) | v20 | ok | - | -
[minheight](minheight/component.html) | v20 | ok | - | -
[miniform](miniform/component.html) | v20 | ok | - | 2
[mobilecarousel](mobilecarousel/component.html) | v20 | ok | preview | -
[modal](modal/component.html) | v20 | ok | - | 2
[modificator](modificator/component.html) | v19 | ok | - | 1
[monacoeditor](monacoeditor/component.html) | v20 | ok | - | -
[monthlycalendar](monthlycalendar/component.html) | v20 | ok | options | 1
[movable](movable/component.html) | v20 | ok | - | -
[movement](movement/component.html) | v20 | ok | - | -
[multioptions](multioptions/component.html) | v19 | ok | - | 42
[nativenotifications](nativenotifications/component.html) | v20 | ok | description | -
[navigation](navigation/component.html) | v20 | ok | description | 1
[navlayout](navlayout/component.html) | v20 | ok | - | -
[noscrollbar](noscrollbar/component.html) | v20 | ok | description | 5
[nosqlcounter](nosqlcounter/component.html) | v19 | ok | description, options | 1
[notifications](notifications/component.html) | v19 | ok | description | 12
[notificationspanel](notificationspanel/component.html) | v20 | ok | description | -
[notify](notify/component.html) | v20 | ok | - | 1
[notifybar](notifybar/component.html) | v20 | ok | - | -
[objecteditor](objecteditor/component.html) | v20 | ok | description | 47
[objecttree](objecttree/component.html) | v20 | ok | options | 1
[offline](offline/component.html) | v20 | ok | - | -
[onetime](onetime/component.html) | v20 | ok | - | -
[packeta](packeta/component.html) | v20 | ok | - | -
[page](page/component.html) | v20 | ok | - | 2
[pages](pages/component.html) | v20 | ok | config section | -
[pagination](pagination/component.html) | v19 | ok | description | 1
[panel](panel/component.html) | v20 | ok | options, preview | 2
[paper](paper/component.html) | v20 | ok | - | 1
[parameters](parameters/component.html) | v20 | ok | options | -
[part](part/component.html) | v20 | ok | - | 1
[parts](parts/component.html) | v20 | ok | - | -
[passwordmeter](passwordmeter/component.html) | v20 | ok | description, options | -
[paste](paste/component.html) | v20 | ok | - | -
[period](period/component.html) | v19 | ok | options | 1
[permissions](permissions/component.html) | v20 | ok | description | 1
[permissionsop](permissionsop/component.html) | v19 | ok | - | 1
[pictures](pictures/component.html) | v20 | ok | - | 1
[pictureupload](pictureupload/component.html) | v19 | ok | description, options | 1
[pictureuploadexpert](pictureuploadexpert/component.html) | v19 | ok | description | 1
[pin](pin/component.html) | v20 | ok | options | -
[planner](planner/component.html) | v20 | ok | description | 2
[preview](preview/component.html) | v20 | ok | - | -
[pricerange](pricerange/component.html) | v19 | ok | - | 1
[printer](printer/component.html) | v20 | ok | - | -
[progress](progress/component.html) | v20 | ok | description | -
[prompt](prompt/component.html) | v20 | ok | - | 1
[properties](properties/component.html) | v19 | ok | options | 3
[properties2](properties2/component.html) | v19 | ok | options | 3
[qrcode](qrcode/component.html) | v20 | ok | description | -
[radiobutton](radiobutton/component.html) | v19 | ok | description | 1
[radiobuttonexpert](radiobuttonexpert/component.html) | v20 | ok | - | -
[range](range/component.html) | v19 | ok | description | 1
[rating](rating/component.html) | v20 | ok | description | -
[raweditable](raweditable/component.html) | v20 | ok | description | -
[rawinput](rawinput/component.html) | v20 | ok | description | -
[ready](ready/component.html) | v20 | ok | - | -
[recaptcha](recaptcha/component.html) | v20 | ok | description | -
[releaser](releaser/component.html) | v20 | ok | - | 1
[remember](remember/component.html) | v20 | ok | - | -
[repeater](repeater/component.html) | v19 | ok | description | 1
[repeatergroup](repeatergroup/component.html) | v19 | ok | description | 1
[resource](resource/component.html) | v20 | ok | - | -
[restart](restart/component.html) | v20 | ok | preview | -
[rows](rows/component.html) | v20 | ok | - | -
[rules](rules/component.html) | v20 | ok | options | -
[scanner](scanner/component.html) | v19 | ok | preview | 2
[scrollbar](scrollbar/component.html) | v19 | ok | - | 1
[scrollpercentage](scrollpercentage/component.html) | v20 | ok | preview | -
[search](search/component.html) | v20 | ok | - | -
[searchbox](searchbox/component.html) | v20 | ok | - | -
[searchdata](searchdata/component.html) | v20 | ok | options | -
[searchinput](searchinput/component.html) | v20 | ok | - | -
[section](section/component.html) | v20 | ok | description | 1
[selectbox](selectbox/component.html) | v20 | ok | description | -
[selected](selected/component.html) | v20 | ok | - | -
[selection](selection/component.html) | v20 | ok | options | -
[servergrid](servergrid/component.html) | v20 | ok | description | 1
[serverlist](serverlist/component.html) | v20 | ok | options | 1
[serverlisting](serverlisting/component.html) | v20 | ok | options | -
[serviceworker](serviceworker/component.html) | v20 | ok | - | -
[shoppingcart](shoppingcart/component.html) | v20 | ok | description | -
[shortcuts](shortcuts/component.html) | v20 | ok | - | -
[singleupload](singleupload/component.html) | v19 | ok | description | 2
[slider](slider/component.html) | v20 | ok | - | -
[snackbar](snackbar/component.html) | v20 | ok | - | -
[sounds](sounds/component.html) | v20 | ok | - | -
[splashscreen](splashscreen/component.html) | v19 | ok | options | 1
[spotlight](spotlight/component.html) | v20 | ok | - | -
[stash](stash/component.html) | v20 | ok | options | -
[stats12](stats12/component.html) | v20 | ok | description | -
[stats24](stats24/component.html) | v20 | ok | description | -
[stats7](stats7/component.html) | v20 | ok | description | -
[statsbarsimple](statsbarsimple/component.html) | v20 | ok | - | -
[statusinput](statusinput/component.html) | v20 | ok | - | -
[sticker](sticker/component.html) | v20 | ok | description | -
[submit](submit/component.html) | v19 | ok | - | 1
[suggestion](suggestion/component.html) | v20 | ok | - | -
[svgicons](svgicons/component.html) | v20 | message | - | 3
[swiper](swiper/component.html) | v20 | ok | description | 3
[switchbutton](switchbutton/component.html) | v20 | ok | description | -
[table](table/component.html) | v20 | ok | description, options | -
[tablegrid](tablegrid/component.html) | v20 | ok | options | -
[tabmenu](tabmenu/component.html) | v20 | ok | description | -
[tabs](tabs/component.html) | v20 | ok | description, preview | 1
[tagger](tagger/component.html) | v19 | ok | - | 1
[template](template/component.html) | v20 | ok | description | -
[templates](templates/component.html) | v20 | ok | - | -
[textarea](textarea/component.html) | v20 | ok | description | -
[textbox](textbox/component.html) | v20 | ok | description | 13
[textboxlist](textboxlist/component.html) | v19 | ok | description | 1
[textboxtags](textboxtags/component.html) | v19 | ok | description | 1
[time](time/component.html) | v20 | ok | - | -
[timepicker](timepicker/component.html) | v20 | ok | - | -
[title](title/component.html) | v20 | ok | description | -
[togglebox](togglebox/component.html) | v19 | ok | preview | 1
[togglebutton](togglebutton/component.html) | v19 | ok | - | 1
[togglemore](togglemore/component.html) | v20 | ok | - | -
[tooltip](tooltip/component.html) | v19 | ok | - | 1
[totaltemplates](totaltemplates/component.html) | v20 | ok | - | -
[touchmove](touchmove/component.html) | v19 | ok | options, config section | 1
[tour](tour/component.html) | v19 | ok | description | 1
[tree](tree/component.html) | v20 | ok | - | -
[treeview](treeview/component.html) | v20 | ok | options | 2
[typed](typed/component.html) | v20 | ok | - | -
[uibuilder](uibuilder/component.html) | v20 | ok | - | -
[uieditor](uieditor/component.html) | v20 | ok | options | -
[uistudio](uistudio/component.html) | v20 | ok | options | -
[unsaved](unsaved/component.html) | v20 | ok | description | -
[upload](upload/component.html) | v19 | ok | - | 2
[validate](validate/component.html) | v20 | ok | - | -
[validation](validation/component.html) | v20 | ok | - | -
[view](view/component.html) | v20 | ok | - | -
[viewbox](viewbox/component.html) | v20 | ok | description | -
[virtualwire](virtualwire/component.html) | v20 | ok | config section | -
[watch](watch/component.html) | v20 | ok | - | -
[watcher](watcher/component.html) | v20 | ok | - | -
[websocket](websocket/component.html) | v19 | ok | - | 1
[wiki](wiki/component.html) | v19 | ok | options | 34
[window](window/component.html) | v20 | ok | preview | 2
[windows](windows/component.html) | v20 | ok | - | 1
[wizardexpert](wizardexpert/component.html) | v19 | ok | - | 1
[wysiwyg](wysiwyg/component.html) | v20 | ok | description | 1
[xterm](xterm/component.html) | v20 | ok | - | -
