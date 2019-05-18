## j-Filter

- singleton
- uses `j-DatePicker`, `j-TimePicker` and `j-Directory`

__Configuration__:

- `reset` {String} a label for Reset button
- `apply` {String} a label for Apply button
- `cancel` {String} a label for Cancel button

__Options__:

```javascript
var opt = {};

opt.element = YOUR_ELEMENT;

// opt.offsetX {Number}    : "x" offset
// opt.offsetY {Number}    : "y" offset
// opt.width {Number}      : width (default: 280)
// opt.align {String}      : align `left` (default), `center` or `right`
// opt.position {String}   : position `top` (default) or `bottom`

// Can contain preddefined values for filter
opt.value = { from: new Date(), price: 10, brand: 'VWFS', city: 1 };

// Fields in filter:
opt.items = [];
opt.items.push({ label: 'Brand', name: 'brand', type: ['Audi', 'VWFS', 'Porsche', 'Škoda'] }); // String array
opt.items.push({ label: 'City', name: 'city', placeholder: 'Choose a city', type: [{ name: 'Banská Bystrica', id: 1 }, { name: 'Bratislava', id: 2 }] }); // Object array
opt.items.push({ label: 'From', name: 'from', type: Date, format: 'dd.MM.yyyy' });
opt.items.push({ label: 'Time', name: 'start', type: 'Time', format: 'HH:mm' });
opt.items.push({ label: 'Search', name: 'search', type: String, placeholder: 'Search items' });
opt.items.push({ label: 'Removed', name: 'removed', type: Boolean });
opt.items.push({ label: 'Price', name: 'price', type: Number });

// Fields:
// item.label {String} A label for the field
// item.name {String} A name/key in the object
// item.icon {String} A font-awesome icon, if the icon starts with '!' for e.g. '!RAW_TEXT' then 'RAW_TEXT' will be a raw value
// item.placeholder {String} A placeholder
// item.type {Function or String} supported types: Array, String, Date, Number, Boolean, 'Time'
// item.format {String} A format for Date or 'Time' type
// item.dirkey {String} A property name for "text" for Array type (default: 'name')
// item.dirvalue {String} A property name for "value" for Array type (default: 'id')
// item.dirempty {String} Adds an empty value for Array type (empty string will contain a placeholder)

opt.callback = function(obj, changed) {

	if (obj == null) {
		// THIS IS RESET
		return;
	}

	// @obj {Object} with all values from the filter
	// @changed {String Array} contains changed keys only

	for (var i = 0; i < changed.length; i++)
		console.log('changed:', obj[changed[i]]);
};
```

### Author

- Peter Širka <petersirka@gmail.com>
- License: MIT