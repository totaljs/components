Thelpers.time = function(value) {
	var diff = Date.now() - (value instanceof Date ? value : value.parseDate()).getTime();

	var minutes = ((diff / 1000) / 60) >> 0;
	if (minutes < 60) {
		if (minutes < 3)
			return 'now';
		return minutes + ' minutes ago';
	}

	var hours = (minutes / 60) >> 0;
	if (hours < 24)
		return hours + ' ' + Tangular.helpers.pluralize(hours, 'hours', 'hour', 'hours', 'hours') + ' ago';

	var days = (hours / 24) >> 0;
	if (days < 30)
		return days + ' ' + Tangular.helpers.pluralize(days, 'days', 'day', 'days', 'days') + ' ago';

	var months = (days / 29) >> 0;
	if (months < 12)
		return months + ' ' + Tangular.helpers.pluralize(months, 'months', 'month', 'months', 'months') + ' ago';

	var years = (months / 12) >> 0;
	return years + ' ' + Tangular.helpers.pluralize(years, 'years', 'year', 'years', 'years') + ' ago';
};