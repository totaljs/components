require('total4');
const Fs = require('fs');
var filename = 'selection.json';

Fs.readFile(filename, function(err, buffer) {

	if (err) {
		console.error(err);
		return;
	}

	var items = JSON.parse(buffer.toString('utf8'));
	var list = [];

	for (var item of items.icons) {
		var name = item.properties.name.split(',').trim();
		list.push(name[0]);
	}

	list.sort();
	Fs.writeFile('icons-db.html', list.join(','), function() {});
	Fs.unlink(filename, NOOP);
});