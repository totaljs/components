Thelpers.autoformat = function(value, format) {

	if (value === false || value === true)
		return '<i class="ti ti-{0}"></i>'.format(value ? 'check-square' : 'square');

	if (value instanceof Date)
		return value.format(format || '[date]');

	if (value instanceof Array) {
		var builder = [];
		for (let m of value)
			builder.push('<span class="badge badge-medium mr5">{0}</span>'.format(m.toString().encode()));
		return builder.join('');
	}

	var type = typeof(value);

	if (!value || typeof(value) === 'object')
		return value;

	if (type === 'number')
		return typeof(format) === 'string' ? value.currency(format) : value.format(format || 0);

	value = value.trim();

	if (value.includes('@'))
		return '<a href="mailto:{0}">{0}</a>'.format(value);

	if ((/^http(s)\:\//).test(value))
		return '<a href="{0}" target="_blank">{0}</a>'.format(value);

	if (value.charAt(0) === '#')
		return '<i class="ti ti-square-alt" style="color:{0}"></i>'.format(value);

	if ((/[0-9\s\-\+]/).test(value))
		return '<a href="tel:{0}">{0}</a>'.format(value.replace(/\s/g, ''));

	return value;
};