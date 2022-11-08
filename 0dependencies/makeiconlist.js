const Fs = require('fs');

Fs.readFile('totaljs.json', function(err, buffer) {

	var items = JSON.parse(buffer.toString('utf8'));
	var list = [];

	for (var item of items.icons)
		list.push(item.properties.name);

	Fs.writeFile('icons.json', JSON.stringify(list), function() {});
});