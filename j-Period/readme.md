## j-Period

The component for picking a time period.

- singleton

__Methods__:

Method: `component.show(options)`

- `options.element` {Element/jQuery Element} - all allignment calculations will be relative to this element
- `options.align` Align the component relatively to the element in `options.element` property. Available properties: 'center', 'left' and 'right'. The default value - 'right'
- `options.callback` Function, which will be executed by clicking on 'Apply' button of the component - receives two parameters: start and end date objects
- `options.start`, `options.end` {Date} - In order to predifine selected period, **both** of these properties should be specified. 


__Configuration__:

- `firstday` - {String} - Allows to set the first day of the week to Monday. The defaul value is 'monday' - Days of the week start from Monday. 'sunday' -  days of the week start from Sunday.
- `dateformat` - {String} - Specifies the date format. The default value - `DEF.dateformat`
- `apply` - {String} - Label for "Apply" button
- `cancel` - {String} - Label for "Cancel" button
- `custom` - {String} - Label for "Custom" filter button
- `month` - {String} - Label for "Current month" filter button
- `thisY` - {String} - Label for "This year" filter button
- `lastY` - {String} - Label for "Last year" filter button
