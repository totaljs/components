function smilefy(text) {
	var db = { ':-)': 1, ':)': 1, ';)': 8, ':D': 0, '8)': 5, ':((': 7, ':(': 3, ':|': 2, ':P': 6, ':O': 4, ':*': 9, '+1': 10, '1': 11, '\/': 12 };
	return text.replace(/(\-1|[:;8O\-)DP(|\*]|\+1){1,3}/g, function(match) {
		var clean = match.replace('-', '');
		var smile = db[clean];
		if (smile == null)
			return match;
		return '<span class="smiles smiles-' + smile + '"></span>';
	});
}