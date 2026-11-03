// Converts a component of the classic format (component.js, component.css, component.json, example.html,
// dependencies.html, readme.md, picture.jpg) to the new format (component.html, readme.md, preview.jpg).
// Usage: node tools/convert.js <old-folder> [--out <dir>] [--prefix <j->]
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

if (!js)
	die('there is no component.js');

var name = (js.match(/COMPONENT\(\s*'([^'@]+)/) || [])[1];
if (!name)
	die('COMPONENT(\'name\') not found');

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
var declared = json.jcomponent ? ('' + json.jcomponent).split('|').map(function(v) { return v.trim(); }) : ['19'];
var v20 = declared.indexOf('20') !== -1;

if (!v20)
	console.log('WARNING ' + name + ': it declares jComponent v' + declared.join('|v') + ' only, the example uses spa.min@19 and the component needs an update to run on v20');

head.push('<link href="https://cdn.componentator.com/spa.min@' + (v20 ? 20 : 19) + '.css" rel="stylesheet" type="text/css" />');
head.push('<script src="https://cdn.componentator.com/spa.min@' + (v20 ? 20 : 19) + '.js"></script>');
extra.forEach(function(line) { head.push(line); });

var html = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8" />\n\t<meta http-equiv="X-UA-Compatible" content="IE=11" />\n\t<meta name="format-detection" content="telephone=no" />\n\t<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />\n\t<meta name="robots" content="all,follow" />\n' +
	head.map(function(line) { return '\t' + line; }).join('\n') + '\n</head>\n<body>\n\n' +
	'\t<!-- Style -->\n\t<style component>\n' + (css ? indent(css, 2) : '\t\t.ui-' + name + ' {}') + '\n\t</style>\n\n' +
	'\t<!-- Source-code -->\n\t<script component>\n\n' + indent(js, 2) + '\n\n\t</script>\n\n' +
	'\t<!-- Example -->\n' + indent(example, 1) + '\n\n</body>\n</html>\n';

// readme.md
var readme = read('readme.md');
var title = (json.name || '').replace(/^j-/i, '') || name;

readme = readme.replace(/^__Configuration__\s*$/m, '__Configuration__:').replace(/^## .*\n+/, '').replace(/^- jComponent `[^`]*`\n+/m, '');

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

// A short description: the first paragraph, otherwise TODO
var description = '';
readme.split('\n\n').some(function(part) {
	part = part.trim();
	if (!part || /^(#|-|\*|```|__|\d+\.)/.test(part) || part.indexOf('|') !== -1)
		return false;
	description = part.replace(/\n/g, ' ').replace(/[`_*]/g, '').replace(/\s+/g, ' ');
	return true;
});

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

if (fs.existsSync(path.join(src, 'picture.jpg')))
	fs.copyFileSync(path.join(src, 'picture.jpg'), path.join(out, 'preview.jpg'));

console.log('OK ' + path.basename(src) + ' -> ' + out);
