// Checks a component folder and creates preview.jpg
// Usage: node tools/check.js <folder> [--preview]
// Needs: npm install playwright && npx playwright install chromium

var fs = require('fs');
var path = require('path');

var dir = path.resolve(process.argv[2] || '.');
var preview = process.argv.indexOf('--preview') !== -1;
var errors = [];
var KEYS = ['name', 'description', 'author', 'version', 'darkmode', 'license', 'created', 'updated', 'jcomponent'];

var fail = function(msg) {
	errors.push(msg);
};

var read = function(name) {
	try {
		return fs.readFileSync(path.join(dir, name), 'utf8');
	} catch (e) {
		fail('Missing file: ' + name);
		return '';
	}
};

var html = read('component.html');
var readme = read('readme.md');

if (!fs.existsSync(path.join(dir, 'preview.jpg')) && !preview)
	fail('Missing file: preview.jpg (use --preview to create it)');

// component.html
var name = (html.match(/COMPONENT\(\s*'([a-z0-9]+)'/) || [])[1];

if (!name)
	fail('component.html: COMPONENT(\'name\', ...) not found or the name is not lower case');

if (!/<link[^>]+spa\.min@20\.css/.test(html) || !/<script[^>]+spa\.min@20\.js/.test(html))
	fail('component.html: spa.min@20 css and js are required in <head>');

if ((html.match(/<style component>/g) || []).length !== 1)
	fail('component.html: exactly one <style component> is required');

if ((html.match(/<script component>/g) || []).length !== 1)
	fail('component.html: exactly one <script component> is required');

var markup = html.replace(/<script component>[\s\S]*?<\/script>/, '').replace(/<!--[\s\S]*?-->/g, '');

if ((markup.match(/<ui-component\b/g) || []).length !== (markup.match(/<\/ui-component>/g) || []).length)
	fail('component.html: <ui-component> tags are not balanced');

var code = (html.match(/<script component>([\s\S]*?)<\/script>/) || [])[1] || '';

code = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

if (/\bconsole\.log\(/.test(code))
	fail('component.html: console.log in the component');

['nocompile', 'release', 'bindvisible'].forEach(function(key) {
	if (new RegExp('self\\.' + key + '\\b').test(code))
		fail('component.html: self.' + key + '() is a no-op in jComponent v20, remove it');
});

if (/self\.readonly\(/.test(code) && /self\.setter\s*=/.test(code))
	fail('component.html: self.readonly() removes the setter, do not use it in a component that has one');

var style = (html.match(/<style component>([\s\S]*?)<\/style>/) || [])[1] || '';

if (name) {
	var selectors = style.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media[^{]*\{/g, '').split('}');
	selectors.forEach(function(block) {
		var sel = block.split('{')[0].trim();
		if (!sel)
			return;
		sel.split(',').forEach(function(s) {
			s = s.trim().replace(/^\.ui-dark\s+/, '');
			if (s && s.indexOf('.ui-' + name) !== 0)
				fail('component.html: selector "' + s + '" does not start with .ui-' + name);
		});
	});
}

// readme.md
var fm = (readme.match(/^---\n([\s\S]*?)\n---\n/) || [])[1];
if (!fm) {
	fail('readme.md: frontmatter is missing');
} else {
	var meta = {};
	fm.split('\n').forEach(function(line) {
		var index = line.indexOf(':');
		index !== -1 && (meta[line.substring(0, index).trim()] = line.substring(index + 1).trim());
	});
	KEYS.forEach(function(key) {
		if (!meta[key] || /^<.*>$/.test(meta[key]) || meta[key] === 'TODO')
			fail('readme.md: frontmatter key "' + key + '" is empty or still a placeholder');
	});
	if (name && meta.name !== name)
		fail('readme.md: name "' + meta.name + '" is not "' + name + '"');
	['created', 'updated'].forEach(function(key) {
		if (meta[key] && !/^\d{4}-\d\d-\d\d \d\d:\d\d$/.test(meta[key]))
			fail('readme.md: "' + key + '" must be yyyy-MM-dd HH:mm');
	});
	if (meta.darkmode && meta.darkmode !== 'true' && meta.darkmode !== 'false')
		fail('readme.md: darkmode must be true or false');
}

if (!/__Configuration__:/.test(readme))
	fail('readme.md: the __Configuration__: section is missing');

// Defaults of the configuration vs readme
var defaults = (html.match(/COMPONENT\(\s*'[a-z0-9]+'\s*,\s*'([^']*)'/) || [])[1];
if (defaults) {
	defaults.split(';').forEach(function(item) {
		var key = item.split(':')[0].trim();
		if (key && readme.indexOf('`' + key + ' ') === -1)
			fail('readme.md: option "' + key + '" is in the default configuration but is not documented');
	});
}

var finish = function(extra) {
	errors = errors.concat(extra || []);
	if (errors.length) {
		console.log('FAILED (' + errors.length + ')');
		errors.forEach(function(m) { console.log('- ' + m); });
		process.exit(1);
	}
	console.log('OK ' + dir);
};

// Browser
var pw;
try {
	pw = require('playwright');
} catch (e) {
	console.log('playwright is not installed: structure checked, the browser test was skipped');
	return finish();
}

(async function() {

	var browser;
	try {
		browser = await pw.chromium.launch();
	} catch (e) {
		// Falls back to the Chrome installed in the system
		browser = await pw.chromium.launch({ channel: 'chrome' });
	}

	var page = await browser.newPage({ viewport: { width: 300, height: 240 } });
	var logs = [];

	page.on('pageerror', function(e) { logs.push('Browser: ' + e.message); });
	page.on('console', function(m) { m.type() === 'error' && logs.push('Console: ' + m.text()); });

	await page.goto('file://' + path.join(dir, 'component.html'));
	await page.waitForTimeout(1500);

	var found = await page.evaluate(function() {
		return document.querySelectorAll('ui-component').length;
	});

	if (!found)
		logs.push('Browser: no <ui-component> in the example');

	// Dark mode must not throw
	await page.evaluate(function() { window.APPEARANCE && APPEARANCE({ dark: true }); });
	await page.waitForTimeout(200);
	await page.evaluate(function() { window.APPEARANCE && APPEARANCE({ dark: false }); });
	await page.waitForTimeout(200);

	if (preview) {
		await page.screenshot({ path: path.join(dir, 'preview.jpg'), type: 'jpeg', quality: 90 });
		console.log('preview.jpg created (300x240, light mode)');
	}

	await browser.close();
	finish(logs);

})().catch(function(e) {
	console.log('Browser test failed: ' + e.message);
	process.exit(1);
});
