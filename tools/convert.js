// Converts a component of the classic format (component.js, component.css, component.json, example.html,
// dependencies.html, readme.md, picture.jpg) to the new format (component.html, readme.md, preview.jpg).
// Usage: node tools/convert.js <old-folder> [--out <dir>] [--prefix <j->] [--name <name>]
//
// - The folder of the result is the name of the component (the name of COMPONENT('name')), with --prefix it is <prefix><name>.
// - It does the mechanical part only. Then run: node tools/check.js <result> and finish what it reports.
// - The behaviour of the component is never changed.

var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);
var src = path.resolve(args[0] || '.');
var option = function(name) {
	var index = args.indexOf(name);
	return index === -1 ? '' : args[index + 1];
};
var outroot = path.resolve(option('--out') || 'converted');
var prefix = option('--prefix');

var read = function(name) {
	try {
		return fs.readFileSync(path.join(src, name), 'utf8').replace(/^﻿/, '').replace(/\r\n/g, '\n');
	} catch (e) {
		return '';
	}
};

var die = function(msg) {
	console.log('SKIPPED ' + path.basename(src) + ': ' + msg);
	process.exit(2);
};

var pad = function(n) {
	return (n < 10 ? '0' : '') + n;
};

var format = function(date) {
	return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes());
};

var indent = function(text, tabs) {
	var t = '\t\t'.substring(0, tabs);
	return text.split('\n').map(function(line) { return line.trim() ? t + line : ''; }).join('\n');
};

var json;
try {
	json = JSON.parse(read('component.json'));
} catch (e) {
	die('component.json is missing or invalid');
}

var js = read('component.js').trim();
var css = read('component.css').trim();
var example = read('example.html').trim();
var deps = read('dependencies.html').trim();

// A package that is not a jComponent (a Tangular helper, a CSS library, a template) has no COMPONENT('name'):
// it is converted with its CSS, its JavaScript (if any) and its example, and its name is the one of component.json
var slug = function(value) {
	return (value || '').replace(/^j-/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

var dedent = function(text) {
	var lines = text.replace(/^\n+|\s+$/g, '').split('\n');
	var min = Infinity;
	lines.forEach(function(line) {
		line.trim() && (min = Math.min(min, /^[ \t]*/.exec(line)[0].length));
	});
	return lines.map(function(line) { return line.substring(min === Infinity ? 0 : min); }).join('\n');
};

var compname = (js.match(/COMPONENT\(\s*'([^'@]+)/) || [])[1];
var isPackage = !compname;
var name = compname || slug(json.name);

// --name <name> only for a package whose name is already the one of a component (for example Tooltip and j-Tooltip)
if (isPackage && option('--name'))
	name = option('--name');

if (!name)
	die('there is no COMPONENT(\'name\') and no name in component.json');

if (isPackage)
	console.log('PACKAGE ' + name + ': it is not a jComponent (no COMPONENT in component.js), converted with its css, js and example');

if ((js.match(/^COMPONENT\(/gm) || []).length > 1)
	console.log('WARNING ' + name + ': more than one COMPONENT in component.js');

// The calls that are no-ops in jComponent v20
js = js.replace(/^[ \t]*self\.nocompile\s*&&\s*self\.nocompile\(\);?[ \t]*\n/gm, '').replace(/^[ \t]*self\.nocompile\(\);?[ \t]*\n/gm, '').replace(/\n{3,}/g, '\n\n');

// head: the library in v20 and everything else that the old dependencies.html had
var head = [];
var extra = [];
deps.split('\n').forEach(function(line) {
	line = line.trim();
	if (!line || line.indexOf('<!--') === 0)
		return;
	if (/cdn\.componentator\.com\/spa\.min@\d+\.(css|js)/.test(line))
		return;
	extra.push(line);
});

// The version of the library is the one that the component declares. Without "jcomponent" in component.json it is v19:
// forcing v20 on a v19 component breaks it (for example NOTMODIFIED or EVALUATE are not defined in v20)
// A package: the <style> blocks of the example are its CSS, and a full page of the example is reduced to its body
if (isPackage) {
	var styles = [];

	if (/^\s*(<!DOCTYPE|<html)/i.test(example)) {
		((example.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [])[1] || '').split('\n').forEach(function(line) {
			line = line.trim();
			/^<(link|script)\b/i.test(line) && !/cdn\.componentator\.com\/spa\.min/.test(line) && extra.push(line);
		});
		var inner = example.match(/<body[^>]*>([\s\S]*)<\/body>/i);
		inner && (example = inner[1]);
	}

	example = example.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, function(match, content) {
		styles.push(dedent(content));
		return '';
	}).replace(/\n{3,}/g, '\n\n').trim();

	css = [css].concat(styles).filter(Boolean).join('\n\n');
}

var declared = json.jcomponent ? ('' + json.jcomponent).split('|').map(function(v) { return v.trim(); }) : ['19'];
var v20 = declared.indexOf('20') !== -1;

if (!v20)
	console.log('WARNING ' + name + ': it declares jComponent v' + declared.join('|v') + ' only, the example uses spa.min@19 and the component needs an update to run on v20');

head.push('<link href="https://cdn.componentator.com/spa.min@' + (v20 ? 20 : 19) + '.css" rel="stylesheet" type="text/css" />');
head.push('<script src="https://cdn.componentator.com/spa.min@' + (v20 ? 20 : 19) + '.js"></script>');
extra.forEach(function(line) { head.push(line); });

var html = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8" />\n\t<meta http-equiv="X-UA-Compatible" content="IE=11" />\n\t<meta name="format-detection" content="telephone=no" />\n\t<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />\n\t<meta name="robots" content="all,follow" />\n' +
	head.map(function(line) { return '\t' + line; }).join('\n') + '\n</head>\n<body>\n\n' +
	'\t<!-- Style -->\n\t<style component>\n' + (css ? indent(css, 2) : isPackage ? '\t\t/* This package has no CSS */' : '\t\t.ui-' + name + ' {}') + '\n\t</style>\n\n' +
	'\t<!-- Source-code -->\n\t<script component>\n\n' + (js ? indent(js, 2) : '\t\t// This package has no JavaScript') + '\n\n\t</script>\n\n' +
	'\t<!-- Example -->\n' + indent(example, 1) + '\n\n</body>\n</html>\n';

// readme.md
var readme = read('readme.md');
var title = (json.name || '').replace(/^j-/i, '') || name;

readme = readme.replace(/^__Configuration__\s*$/m, '__Configuration__:').replace(/^#{1,2} .*\n+/, '').replace(/^- jComponent `[^`]*`\n+/m, '');

// The block "### Author" keeps only what is not the author or the license
var index = readme.search(/^### Author\s*$/m);
if (index !== -1) {
	var rest = readme.substring(index).replace(/^### Author\s*\n/, '');
	var next = rest.search(/^#{1,3} /m);
	var block = next === -1 ? rest : rest.substring(0, next);
	var after = next === -1 ? '' : rest.substring(next);
	var kept = block.split('\n').filter(function(line) {
		return line.trim() && !/<[^>]+@[^>]+>/.test(line) && !/\[License\]/i.test(line);
	}).join('\n');
	readme = readme.substring(0, index).replace(/\s+$/, '') + '\n\n' + (kept ? '### Author\n\n' + kept + '\n\n' : '') + after;
}

// "- `key` {Type} text" -> "- `key {Type}` text"
readme = readme.replace(/^(\s*- )`([A-Za-z0-9_$.-]+)`\s*\{([^}]+)\}/gm, '$1`$2 {$3}`');

// A short description: the first paragraph of prose (outside of the code blocks), otherwise TODO
var description = '';
readme.replace(/```[\s\S]*?```/g, '').split(/\n\s*\n/).some(function(part) {
	part = part.trim();
	if (!part || /^(#|-|\*|`|__|\d+\.|>|<)/.test(part) || part.indexOf('|') !== -1)
		return false;
	// It must look like a sentence, not like code
	if (!/^[A-Z]/.test(part) || /[{};]|<\/?[a-z]|\/\/|\s=\s|\(\)|\w\.\w+\(/.test(part))
		return false;
	description = part.replace(/\n/g, ' ').replace(/[`_*]/g, '').replace(/\s+/g, ' ');
	return true;
});

// The first sentence
var sentence = description.match(/^.{20,}?[.!?](\s|$)/);
sentence && (description = sentence[0].trim());

if (description.length > 160)
	description = description.substring(0, 160).replace(/\s+\S*$/, '');

description = description || 'TODO';

var versions = declared.map(function(v) { return 'v' + v; }).join(',');
var created = json.datecreated ? format(new Date(json.datecreated)) : format(new Date());

var meta = '---\nname: ' + name + '\ndescription: ' + description + '\nauthor: ' + (json.author || 'TODO') + '\nversion: ' + (json.version || 1) + '\ndarkmode: ' + (json.darkmode === true ? 'true' : 'false') + '\nlicense: ' + (json.license || 'TODO') + '\ncreated: ' + created + '\nupdated: ' + format(new Date()) + '\njcomponent: ' + versions + '\n---\n\n';
var out = path.join(outroot, (prefix || '') + name);

fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'component.html'), html);
fs.writeFileSync(path.join(out, 'readme.md'), meta + '# ' + title + '\n\n' + readme.trim() + '\n');

// preview.jpg: the picture of the old component. Most are picture.jpg, some are picture.gif or picture.png (converted to jpg:
// a gif keeps its first frame). component.json says which one it is ("picture").
var picture = ['picture.jpg', 'picture.jpeg', 'picture.png', 'picture.gif'].filter(function(file) {
	return fs.existsSync(path.join(src, file));
})[0];

if (picture && /\.jpe?g$/.test(picture)) {
	fs.copyFileSync(path.join(src, picture), path.join(out, 'preview.jpg'));
} else if (picture) {
	// The conversion uses a tool of the system: sips (macOS), magick or convert (ImageMagick)
	var cp = require('child_process');
	var target = path.join(out, 'preview.jpg');
	var tries = [['sips', ['-s', 'format', 'jpeg', path.join(src, picture), '--out', target]], ['magick', [path.join(src, picture) + '[0]', '-background', 'white', '-flatten', target]], ['convert', [path.join(src, picture) + '[0]', '-background', 'white', '-flatten', target]]];
	var done = tries.some(function(t) {
		var r = cp.spawnSync(t[0], t[1], { stdio: 'ignore' });
		return !r.error && r.status === 0 && fs.existsSync(target);
	});
	if (!done) {
		fs.copyFileSync(path.join(src, picture), path.join(out, 'preview' + path.extname(picture)));
		console.log('WARNING ' + name + ': ' + picture + ' was copied as it is, there is no sips, magick or convert to make preview.jpg');
	}
}

console.log('OK ' + path.basename(src) + ' -> ' + out);
