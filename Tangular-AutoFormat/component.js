Thelpers.autoformat = function(value) {

	if (value === false || value === true)
		return '<i class="ti ti-{0}"></i>'.format(value ? 'check-square' : 'square');

	if (!value || typeof(value) != 'string')
		return value;

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