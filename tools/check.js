// Checks a component folder and creates preview.jpg
// Usage: node tools/check.js <folder> [--preview] [--no-browser] [--legacy]
//
// --legacy is for a converted component: the rules about the style of the code (selectors, id attributes,
// no-op helpers, console.log) are reported as warnings because converting must not change the behaviour.
// Needs: npm install playwright && npx playwright install chromium

var fs = require('fs');
var path = require('path');

var dir = path.resolve(process.argv[2] || '.');
var preview = process.argv.indexOf('--preview') !== -1;
var nobrowser = process.argv.indexOf('--no-browser') !== -1;
var legacy = process.argv.indexOf('--legacy') !== -1;
var errors = [];
var warnings = [];
var KEYS = ['name', 'description', 'author', 'version', 'darkmode', 'license', 'created', 'updated', 'jcomponent'];

var fail = function(msg) {
	errors.push(msg);
};

// A rule of the style of the code: an error for a new component, a warning for a converted one
var style = function(msg) {
	(legacy ? warnings : errors).push(msg);
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
var name = (html.match(/COMPONENT\(\s*'([A-Za-z0-9]+)'/) || [])[1];

// A package that is not a jComponent (a Tangular helper, a CSS library) has no COMPONENT
var isPackage = !/COMPONENT\(/.test((html.match(/<script component>([\s\S]*?)<\/script>/) || [])[1] || '');

if (!name && !isPackage)
	fail('component.html: COMPONENT(\'name\', ...) not found or the name is not alphanumeric');

if (!/<link[^>]+spa\.min@20\.css/.test(html) || !/<script[^>]+spa\.min@20\.js/.test(html)) {
	if (legacy && /<link[^>]+spa\.min@19\.css/.test(html) && /<script[^>]+spa\.min@19\.js/.test(html))
		warnings.push('component.html: it uses spa.min@19 (the component declares v19 only): it needs an update to run on jComponent v20');
	else
		fail('component.html: spa.min@20 css and js are required in <head>');
}

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
	style('component.html: console.log in the component');

// An id attribute, not data-id or aria-labelledby. The message says where it is.
var idmatch = /(^|[^\w-])id\s*=\s*\\?["']/.exec(code);

if (idmatch) {
	var idpos = idmatch.index + idmatch[1].length;
	style('component.html: id="..." attribute in the code, near: ' + code.substring(Math.max(0, idpos - 25), idpos + 45).replace(/\s+/g, ' ').trim() + ' (use aria-label or a wrapping <label>, an id is shared by every instance)');
}

['nocompile', 'release', 'bindvisible'].forEach(function(key) {
	if (new RegExp('self\\.' + key + '\\b').test(code))
		style('component.html: self.' + key + '() is a no-op in jComponent v20, remove it');
});

// self.readonly() clears getter and setter at the moment it is called: it must be called before they are defined
var readonly = code.search(/self\.readonly\(/);
var defined = code.search(/self\.(setter|getter)\s*=/);

if (readonly !== -1 && defined !== -1 && readonly > defined)
	style('component.html: self.readonly() is called after self.setter/self.getter were defined and removes them, call it before');

var css = (html.match(/<style component>([\s\S]*?)<\/style>/) || [])[1] || '';

if (name) {
	var selectors = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@(-webkit-)?keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '').replace(/@[a-z-]+[^{;]*\{(?=\s*[^{}]*\{)/g, '').split('}');
	selectors.forEach(function(block) {
		var sel = block.split('{')[0].trim();
		if (!sel)
			return;
		sel.split(',').forEach(function(s) {
			s = s.trim();
			if (s && s.indexOf('.ui-' + name) === -1)
				style('component.html: selector "' + s + '" is not scoped under .ui-' + name);
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
	var toDate = function(value) {
		var m = /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)$/.exec(value || '');
		return m ? new Date(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]) : null;
	};

	var created = toDate(meta.created);
	var updated = toDate(meta.updated);

	// A model does not know the current date: it must be the real one
	if (created && created.getTime() > Date.now() + 120000)
		fail('readme.md: "created" is in the future, use the current date and time of the system');

	if (updated && updated.getTime() > Date.now() + 120000)
		fail('readme.md: "updated" is in the future, use the current date and time of the system');

	if (created && updated && updated < created)
		fail('readme.md: "updated" is older than "created"');

	if (meta.darkmode && meta.darkmode !== 'true' && meta.darkmode !== 'false')
		fail('readme.md: darkmode must be true or false');
}

// Defaults of the configuration vs readme
var defaults = (html.match(/COMPONENT\(\s*'[A-Za-z0-9]+'\s*,\s*'([^']*)'/) || [])[1];

if (defaults && !/__Configuration__:/.test(readme))
	fail('readme.md: the __Configuration__: section is missing');

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
		warnings.forEach(function(m) { console.log('~ ' + m); });
		process.exit(1);
	}
	console.log('OK ' + dir + (warnings.length ? ' (' + warnings.length + ' warnings)' : ''));
	warnings.forEach(function(m) { console.log('~ ' + m); });
};

// Browser
var pw;
try {
	if (nobrowser)
		throw new Error('skipped');
	pw = require('playwright');
} catch (e) {
	console.log(nobrowser ? 'structure checked, the browser test was skipped (--no-browser)' : 'playwright is not installed: structure checked, the browser test was skipped');
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

	if (!found && !isPackage)
		logs.push('Browser: no <ui-component> in the example');

	// Dark mode must not throw
	await page.evaluate(function() { window.APPEARANCE && APPEARANCE({ dark: true }); });
	await page.waitForTimeout(200);
	await page.evaluate(function() { window.APPEARANCE && APPEARANCE({ dark: false }); });
	await page.waitForTimeout(200);

	if (preview) {
		// The preview shows the first instance of the example (the components that only load dependencies, "LAZY ...", are ignored)
		await page.waitForTimeout(1000);
		await page.evaluate(function() {
			var els = Array.prototype.filter.call(document.querySelectorAll('ui-component'), function(el) {
				return (el.getAttribute('name') || '').indexOf('LAZY') !== 0;
			});
			for (var i = 1; i < els.length; i++)
				els[i].style.visibility = 'hidden';
		});
		await page.screenshot({ path: path.join(dir, 'preview.jpg'), type: 'jpeg', quality: 90 });
		console.log('preview.jpg created (300x240, light mode)');
	}

	await browser.close();
	finish(logs);

})().catch(function(e) {
	console.log('Browser test failed: ' + e.message);
	process.exit(1);
});
