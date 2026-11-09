require('total5');

function parseMeta(meta) {
	let lines = meta.split('\n');
	let item = {};
	for (let line of lines) {
		let arr = line.split(':').trim();
		item[arr[0]] = arr[1];
	}
	return item;
}

function parseSource(html) {

	let beg = null;;
	let css = null;
	let js = null;
	let tmp;

	beg = html.indexOf('<style component>');

	if (beg !== -1) {
		tmp = Utils.minify_css(html.substring(beg + 17, html.indexOf('</style>', beg + 17)));
		if (!tmp.endsWith('{}'))
			css = tmp;
	}

	beg = html.indexOf('<script component>');
	if (beg !== -1)
		js = Utils.minify_js(html.substring(beg + 18, html.indexOf('</script>', beg + 18)));

	return { css: css, js: js };
}

Utils.ls('../components', async function(files) {

	let items = [];

	for (let filename of files) {
		if (!filename.endsWith('readme.md'))
			continue;
		let readme = await Total.readfile(filename, 'utf8');
		let beg = readme.indexOf('---');
		let end = readme.indexOf('---', beg + 3);
		let meta = parseMeta(readme.substring(beg + 3, end).trim());
		meta.readme = (readme.substring(0, beg) + readme.substring(end + 3)).trim();
		let dir = Total.Path.dirname(filename);
		meta.preview = await Total.readfile(PATH.join(dir, 'preview.jpg'), 'datauri');
		meta.html = await Total.readfile(PATH.join(dir, 'component.html'), 'utf8');
		let source = parseSource(meta.html);
		meta.js = source.js;
		meta.css = source.css;
		meta.created = meta.created.parseDate('yyyy-MM-dd HH:mm');
		meta.updated = meta.updated.parseDate('yyyy-MM-dd HH:mm');
		items.push(meta);
		await PROMISIFY(Total.Fs.writeFile, '../cdn/' + 'j-' + meta.name + '.html', (meta.css ? ('<style>' + meta.css + '</style>\n') : '') + (meta.js ? ('<script>' + meta.js + '</script>\n') : ''));
	}

	Total.Fs.writeFile('../components.json', JSON.stringify(items, null, '\t'), NOOP);
});