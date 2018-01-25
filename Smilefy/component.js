function smilefy(str) {
	var db = { ':-)': 1, ':)': 1, ';)': 8, ':D': 0, '8)': 5, ':((': 7, ':(': 3, ':|': 2, ':P': 6, ':O': 4, ':*': 9, '+1': 10, '1': 11, '/': 12 };
	return str.replace(/(-1|[:;8O\-)DP(|*]|\+1){1,3}/g, function(match) {
		var smile = db[match.replace('-', '')];
		return smile === undefined ? match : '<i class="smiles smiles-' + smile + '"></i>';
	});
}