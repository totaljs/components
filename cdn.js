const Fs = require('fs');
require('total4');

Fs.readdir(process.cwd(), function(err, dir) {
	var path = '0cdn/';
	//	U.ls(path, function(files) {
	//		files.wait((item, next) => Fs.unlink(item, next), function() {
	dir.wait(function(item, next) {

		if (item.substring(0, 2) !== 'j-')
			return next();

		var builder = [];
		Fs.readFile(item + '/component.json', function(err, meta) {
			meta = meta.toString('utf8').parseJSON();
			Fs.readFile(item + '/component.css', function(err, css) {
				css && builder.push('<style>{0}</style>'.format(U.minify_css('/*auto*/\n' + css.toString('utf8'))));
				Fs.readFile(item + '/component.js', function(err, js) {
					js && builder.push('<script>{0}</script>'.format(U.minify_js(js.toString('utf8'))));
					var name = item.toLowerCase();
					Fs.writeFile(path + name + '.html', builder.join('\n'), function() {
						Fs.writeFile(path + name + '@{0}.html'.format(meta.version), builder.join('\n').replace('COMPONENT(\'' + name.substring(2), 'COMPONENT(\'' + name.substring(2) + '@' + meta.version), next);
						console.log('Processing:', item);
					});
				});
			});
		});
	}, () => console.log('100% done, you need to upload all files "{0}*.html" on CDN.'.format(path)));
	//		});
	//	});
});