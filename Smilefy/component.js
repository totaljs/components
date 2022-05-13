FUNC.smilefy = function(str) {
	var db = { ':-)': '&#128512;', ':)': '&#128512;', ';)': '&#128521;', ':D': '&#128513;', '8)': '&#128515;', ';(': '&#128546;', ':(': '&#128531;', ':P': '&#128539;', ':O': '&#128558;', ':*': '&#128536;', '+1': '&#128077;' };
	return str.replace(/(^|\s)+(-1|[:;8O\-)DP(|*]|\+1){1,3}/g, function(match) {

		var index = arguments[3];
		var str = arguments[4];

		var c = str.charAt(index + 1);
		if (c !== ':' && c !== '8' && c !== ';' && c !== '+')
			return match;

		var beg = match.charAt(0);
		var end = match.charAt(match.length - 1);

		if (beg !== ' ')
			beg = '';

		if (end !== ' ')
			end = '';

		var smile = db[match.trim().replace('-', '')];
		return smile === undefined ? match : (beg + smile + end);
	});
};
