## j-TotalTemplates

This component can render Total.js Templates.

- jComponent `v19|v20`
- Download templates: https://github.com/totaljs/templates

__Render__:

- `SETTER('totaltemplates/render', 'template', { model: 'custom' }, callback(response))` renders a template
- `SETTER('totaltemplates/render', 'HTML_or_URL', model, [callback])`

__Preview__:

- `SETTER('totaltemplates/preview', 'template', { model: 'custom' })` opens a template in a new tab
- `SETTER('totaltemplates/preview', 'HTML_or_URL', model, [print {Number_delay/Boolean}])`

__Good to know__:

- the `~CDN~` keyword will only be replaced by the value of `DEF.CDN` for external HTML templates.

### Author

- Peter Širka <petersirka@gmail.com>
- [License](https://www.totaljs.com/license/)