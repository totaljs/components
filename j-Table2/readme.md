## j-Table

A simple table, which displays the data from an array of objects

__Component Configuration__:

- `margin` - {Number} - The height of the table2 component by default equals to its parent height. The **margin** specifies the number of pixels, which will be deducted from the height of the table.
- `click` - {String} - The parameter string represents **path** to a callback function, which will be executed when a particular table row is clicked. This function receives **id** as a parameter

__Columns Configuration__

Configuration for one particular column is described in a div element in `data-colconfig` attribute. The inner content of this "configurational" div - will be displayed as a column header.

The `data-colconfig` attribute can contain the following properties:

- `value` - {String} - **required** - This property represents a key of the object, the value of which will be displayed in this particular column.
- `width` - {Number} - specifies the width of the column in pixels. The default value - 200px 
- `bold` - {Boolean} - the content of the column will be displayed in bold font
- `monospace` - {Boolean} - specifies the **font-family: monospace;** property for the column
- `align` - {String} - possible options: **center**, **right**. The default value - **left**. Specifies the text alignment of the column
