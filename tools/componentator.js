// Creates the package of a component for componentator.com from component.html and readme.md
// Usage: node tools/componentator.js <folder> [--out <dir>] [--email <email>] [--no-picture]
//
// The result (default: <folder>/componentator/) has the files of the classic component:
//   component.css, component.js, component.json, dependencies.html, example.html, readme.md, picture.jpg
//
// picture.jpg needs: npm install playwright (it uses Chrome if Chromium is not installed)

var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
var dir = path.resolve(args[0] || '.');
var option = function(name) {
	var index = args.indexOf(name);
	return index === -1 ? '' : args[index + 1];
};
var out = path.resolve(option('--out') || path.join(dir, 'componentator'));
var email = option('--email');

var read = function(name) {
	return fs.readFileSync(path.join(dir, name), 'utf8');
};

var die = function(msg) {
	console.log('FAILED: ' + msg + ' (run node tools/check.js first)');
	process.exit(1);
};

// Removes the common indentation of the block
var dedent = function(text) {
	var lines = text.replace(/^\n+|\s+$/g, '').split('\n');
	var min = Infinity;
	lines.forEach(function(line) {
		if (line.trim()) {
			var tabs = /^\t*/.exec(line)[0].length;
			tabs < min && (min = tabs);
		}
	});
	min = min === Infinity ? 0 : min;
	return lines.map(function(line) { return line.substring(min); }).join('\n') + '\n';
};

var html = read('component.html');
var readme = read('readme.md');

var css = (html.match(/<style component>([\s\S]*?)<\/style>/) || [])[1];
var js = (html.match(/<script component>([\s\S]*?)<\/script>/) || [])[1];
var head = (html.match(/<head>([\s\S]*?)<\/head>/) || [])[1] || '';

if (css == null || js == null)
	die('<style component> or <script component> not found');

// The example is everything after the component script until the end of the body
var example = html.substring(html.indexOf('</script>', html.indexOf('<script component>')) + 9).replace(/<\/body>[\s\S]*$/, '');

// readme.md: frontmatter + body
var fm = (readme.match(/^---\n([\s\S]*?)\n---\n/) || [])[1];
if (!fm)
	die('readme.md has no frontmatter');

var meta = {};
fm.split('\n').forEach(function(line) {
	var index = line.indexOf(':');
	index !== -1 && (meta[line.substring(0, index).trim()] = line.substring(index + 1).trim());
});

var body = readme.substring(readme.indexOf('\n---\n') + 5).trim();
var title = (body.match(/^# (.+)$/m) || [])[1];
if (!title)
	die('readme.md has no "# Title"');

var toISO = function(value) {
	var m = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)$/.exec(value || '');
	if (!m)
		die('"' + value + '" is not a date in the form yyyy-MM-dd HH:mm');
	return new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]).toISOString();
};

var name = 'j-' + title.replace(/\s+/g, '');
var versions = (meta.jcomponent || 'v20').split(',').map(function(v) { return v.trim().replace(/^v/, ''); }).join('|');
var cdn = head.match(/https:\/\/cdn\.componentator\.com\/spa\.min@\d+\.(css|js)/g) || [];

var json = {
	datecreated: toISO(meta.created),
	dateupdated: toISO(meta.updated),
	name: name,
	jcomponent: versions,
	color: 'white',
	version: /^\d+$/.test(meta.version) ? +meta.version : meta.version,
	darkmode: meta.darkmode === 'true',
	responsive: true,
	picture: 'picture.jpg',
	dependencies: '',
	author: meta.author
};

email && (json.email = email);
json.license = meta.license;

var deps = [];
cdn.forEach(function(url) {
	deps.push(/\.css$/.test(url) ? '<link href="' + url + '" rel="stylesheet" type="text/css" />' : '<script src="' + url + '"></script>');
});

var legacy = '## ' + name + '\n\n- jComponent `' + (versions.split('|').map(function(v) { return 'v' + v; }).join('|')) + '`\n\n' +
	body.replace(/^# .+\n+/, '').replace(/\s+$/, '') + '\n\n### Author\n\n- ' + meta.author + (email ? ' <' + email + '>' : '') + '\n- License: ' + meta.license + '\n';

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'component.css'), dedent(css));
fs.writeFileSync(path.join(out, 'component.js'), dedent(js));
fs.writeFileSync(path.join(out, 'component.json'), JSON.stringify(json, null, '\t'));
fs.writeFileSync(path.join(out, 'dependencies.html'), deps.join('\n'));
fs.writeFileSync(path.join(out, 'example.html'), dedent(example));
fs.writeFileSync(path.join(out, 'readme.md'), legacy);
console.log('Package ' + name + ' created in ' + out);

if (args.indexOf('--no-picture') !== -1)
	return;

// picture.jpg: the component in light and dark mode on a soft gradient (300x240, retina: 600x480)
var pw;
try {
	pw = require('playwright');
} catch (e) {
	console.log('playwright is not installed: picture.jpg was skipped');
	return;
}

(async function() {

	var browser;
	try {
		browser = await pw.chromium.launch();
	} catch (e) {
		browser = await pw.chromium.launch({ channel: 'chrome' });
	}

	var page = await browser.newPage({ viewport: { width: 300, height: 240 }, deviceScaleFactor: 2 });
	await page.goto('file://' + path.join(dir, 'component.html'));
	await page.waitForTimeout(1500);

	// Only the first instance of the example
	await page.evaluate(function() {
		var els = document.querySelectorAll('ui-component');
		for (var i = 1; i < els.length; i++)
			els[i].style.display = 'none';
	});

	var el = page.locator('ui-component').first();
	var box = await el.boundingBox();
	var color = (await page.evaluate(function() { return getComputedStyle(document.documentElement).getPropertyValue('--color'); })).trim() || '#4285F4';

	var light = (await el.screenshot({ type: 'png' })).toString('base64');
	await page.evaluate(function() { window.APPEARANCE && APPEARANCE({ dark: true }); });
	await page.waitForTimeout(400);
	var dark = (await el.screenshot({ type: 'png' })).toString('base64');

	// The cards (the component with a padding) are scaled to fit the picture
	var pad = 12;
	var scale = Math.min(176 / box.width, 128 / box.height, 1);
	var w = Math.round(box.width * scale) + pad * 2;
	var h = Math.round(box.height * scale) + pad * 2;

	var card = function(left, top, rotate, background, image, shadow) {
		return '<div style="position:absolute;left:' + left + 'px;top:' + top + 'px;width:' + w + 'px;height:' + h + 'px;box-sizing:border-box;padding:' + pad + 'px;background:' + background + ';border-radius:14px;transform:rotate(' + rotate + 'deg);box-shadow:' + shadow + '"><img style="width:100%;height:100%;display:block" src="data:image/png;base64,' + image + '"></div>';
	};

	var stage = await browser.newPage({ viewport: { width: 300, height: 240 }, deviceScaleFactor: 2 });
	await stage.setContent('<html><body style="margin:0;width:300px;height:240px;overflow:hidden;position:relative;background:' +
		'radial-gradient(circle at 12% 18%, ' + color + '66, transparent 55%),' +
		'radial-gradient(circle at 92% 88%, #FF9A8B88, transparent 52%),' +
		'radial-gradient(circle at 80% 10%, #A78BFA55, transparent 45%),' +
		'linear-gradient(135deg, #F3F6FF, #DCE5FB);">' +
		card(300 - w - 10, 240 - h - 62, 4, '#202020', dark, '0 14px 30px rgba(20,30,70,.35),0 2px 6px rgba(20,30,70,.25)') +
		card(12, 240 - h - 22, -3, '#FFF', light, '0 14px 30px rgba(20,30,70,.3),0 2px 6px rgba(20,30,70,.2)') +
		'</body></html>');
	await stage.waitForTimeout(200);
	await stage.screenshot({ path: path.join(out, 'picture.jpg'), type: 'jpeg', quality: 92 });
	await browser.close();
	console.log('picture.jpg created (600x480, 2x of 300x240)');

})().catch(function(e) {
	console.log('picture.jpg failed: ' + e.message);
	process.exit(1);
});
