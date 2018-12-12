Thelpers.filesize = function(value, decimals, type) {
	return value ? value.filesize(decimals, type) : '...';
};

Number.prototype.filesize = function(decimals, type) {

	if (typeof(decimals) === 'string') {
		var tmp = type;
		type = decimals;
		decimals = tmp;
	}

	var value;
	var t = this;

	// this === bytes
	switch (type) {
		case 'bytes':
			value = t;
			break;
		case 'KB':
			value = t / 1024;
			break;
		case 'MB':
			value = filesizehelper(t, 2);
			break;
		case 'GB':
			value = filesizehelper(t, 3);
			break;
		case 'TB':
			value = filesizehelper(t, 4);
			break;
		default:

			type = 'bytes';
			value = t;

			if (value > 1023) {
				value = value / 1024;
				type = 'KB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'MB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'GB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'TB';
			}

			break;
	}

	type = ' ' + type;
	return (decimals === undefined ? value.format(2).replace('.00', '') : value.format(decimals)) + type;
};

function filesizehelper(number, count) {
	while (count--) {
		number = number / 1024;
		if (number.toFixed(3) === '0.000')
			return 0;
	}
	return number;
}