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

function normalizeTabs(text) {
    if (typeof text !== 'string' || !text.length)
        return text;

    var lines = text.split('\n');

    var indent = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (!line.trim())
            continue;
        var match = line.match(/^[ \t]+/);
        if (match)
            indent = match[0];
        break;
    }

    if (!indent)
        return text;

    var result = [];
    for (var j = 0; j < lines.length; j++) {
        var l = lines[j];
        if (l.substring(0, indent.length) === indent)
            result.push(l.substring(indent.length));
        else
            result.push(l);
    }

    return result.join('\n').trim();
}

function parseSource(html) {

	let beg = null;;
	let css = null;
	let js = null;
	let tmp;

	beg = html.indexOf('<style component>');

	if (beg !== -1) {
		tmp = html.substring(beg + 17, html.indexOf('</style>', beg + 17));
		if (!tmp.trim().endsWith('{}') && !tmp.includes('has no CSS'))
			css = normalizeTabs(tmp);
	}

	beg = html.indexOf('<script component>');
	if (beg !== -1) {
		js = html.substring(beg + 18, html.indexOf('</script>', beg + 18));
		if (js.includes('no JavaScript'))
			js = '';
		else
			js = normalizeTabs(js);
	}

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
		await PROMISIFY(Total.Fs.writeFile, '../cdn/' + 'j-' + meta.name.toLowerCase() + '.html', (meta.css ? ('<style>' + Utils.minify_css(meta.css) + '</style>\n') : '') + (meta.js ? ('<script>' + Utils.minify_js(meta.js) + '</script>\n') : ''));
	}

	Total.Fs.writeFile('../cdn/components.json', JSON.stringify(items, null, '\t'), NOOP);
});