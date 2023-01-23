Thelpers.time = function(value) {

	if (!value)
		return value;

	var diff = Date.now() - (value instanceof Date ? value : value.parseDate()).getTime();

	var minutes = ((diff / 1000) / 60) >> 0;
	if (minutes < 60) {
		if (minutes < 3)
			return 'now';
		return Thelpers.pluralize(minutes, '# minutes ago,# minute ago,# minutes ago,# minutes ago');
	}

	var hours = (minutes / 60) >> 0;
	if (hours < 24)
		return Thelpers.pluralize(hours, '# hours ago,# hour ago,# hours ago,# hours ago');

	var days = (hours / 24) >> 0;
	if (days < 30)
		return Thelpers.pluralize(days, '# days ago,# day ago,# days ago,# days ago');

	var months = (days / 29) >> 0;
	if (months < 12)
		return Thelpers.pluralize(months, '# months ago,# month ago,# months ago,# months ago');

	var years = (months / 12) >> 0;
	return Thelpers.pluralize(years, '# years ago,# year ago,# years ago,# years ago');
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