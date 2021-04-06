Thelpers.counter = function(value, decimals) {

	if (decimals == null)
		decimals = 0;

	if (value > 999999)
		return (value / 1000000).format(decimals) + ' M';
	if (value > 9999)
		return (value / 1000).format(decimals) + ' K';
	return value.format(decimals);
};