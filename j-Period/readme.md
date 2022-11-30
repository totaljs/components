## j-Period

The component for picking a time period.

-singleton

__Methods__:

Method: `component.show(options)`

- `options.element` {Element/jQuery Element} - all allignment calculations will be relative to this element
- `options.align` Align the component relatively to the element in `options.element` property. Available properties: 'center', 'left' and 'right'. The default value - 'right'
- `options.callback` Function, which will be executed by clicking on 'Apply' button of the component - receives two parameters: start and end date objects


__Configuration__:

- `format` - {String} - Allows to set the format of the calendar. The defaul value is 'eu' - Days of the week start from Monday. 'us' -  Days of the week start from Sunday.
- `dateformat` - {String} - Specifies the date format
- `apply` - {String} - Label for "Apply" button
- `cancel` - {String} - Label for "Cancel" button
- `custom` - {String} - Label for "Custom" filter button
- `month` - {String} - Label for "Current month" filter button
- `thisY` - {String} - Label for "This year" filter button
- `lastY` - {String} - Label for "Last year" filter button
