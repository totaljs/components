Thelpers.time = function(value) {

	if (!value)
		return value;

	var diff = Date.now() - (value instanceof Date ? value : value.parseDate()).getTime();

	var minutes = ((diff / 1000) / 60) >> 0;
	if (minutes < 60) {
		if (minutes < 3)
			return 'now';
		return minutes + ' minutes ago';
	}

	var hours = (minutes / 60) >> 0;
	if (hours < 24)
		return hours + ' ' + Thelpers.pluralize(hours, 'hours', 'hour', 'hours', 'hours') + ' ago';

	var days = (hours / 24) >> 0;
	if (days < 30)
		return days + ' ' + Thelpers.pluralize(days, 'days', 'day', 'days', 'days') + ' ago';

	var months = (days / 29) >> 0;
	if (months < 12)
		return months + ' ' + Thelpers.pluralize(months, 'months', 'month', 'months', 'months') + ' ago';

	var years = (months / 12) >> 0;
	return years + ' ' + Thelpers.pluralize(years, 'years', 'year', 'years', 'years') + ' ago';
};

Thelpers.time2 = function(value) {
	return value ? '<span class="ta-time" data-time="{0}" title="{2}">{1}</span>'.format(value.getTime(), Thelpers.time(value), value.format(null)) : value;
};

ON('knockknock', function() {
	$('.ta-time').each(function() {
		var el = $(this);
		el.html(Thelpers.time(new Date(+el.attrd('time'))));
	});
});