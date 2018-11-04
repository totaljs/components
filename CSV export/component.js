FUNC.csv = function(filename, columns, arr) {
	IMPORT('ONCE https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js', function() {

		var builder = [];
		var tmp = [];

		if (arr == null) {

			// get columns

			arr = columns;
			columns = {};

			for (var i = 0; i < arr.length; i++) {
				var keys = Object.keys(arr[i]);
				for (var j = 0; j < keys.length; j++) {
					var key = keys[j];
					columns[key] = 1;
				}
			}

			columns = Object.keys(columns);
		}

		for (var i = 0; i < columns.length; i++)
			tmp.push('"{0}"'.format(columns[i]));

		builder.push(tmp.join(';'));

		for (var i = 0; i < arr.length; i++) {
			tmp = [];
			for (var j = 0; j < columns.length; j++) {
				var val = arr[i][columns[j]];
				switch (typeof(val)) {
					case 'string':
						tmp.push('"{0}"'.format(val.trim()));
						break;
					case 'number':
						tmp.push(val.toString().replace('.', ','));
						break;
					case 'boolean':
						tmp.push(val ? 'true' : 'false');
						break;
					case 'object':
						if (val instanceof Date)
							tmp.push(val.format('yyyy-MM-dd'));
						else
							tmp.push(val == null ? 'null' : val.toString());
						break;
					default:
						tmp.push('');
						break;
				}
			}
			builder.push(tmp.join(';'));
		}

		var file = new Blob(['\uFEFF' + builder.join('\n')], { type: 'application/vnd.ms-excel;charset=utf-8' });
		saveAs(file, filename);
	});
};