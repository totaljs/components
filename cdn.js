const Fs = require('fs');
require('total.js');

Fs.readdir(process.cwd(), function(err, dir) {
	var path = '0cdn/';
	U.ls(path, function(files) {
		files.wait((item, next) => Fs.unlink(item, next), function() {
			dir.wait(function(item, next) {
				if (item.substring(0, 2) !== 'j-')
					return next();

				var builder = [];
				Fs.readFile(item + '/component.css', function(err, css) {
						css && builder.push('<style>{0}</style>'.format(U.minifyStyle(css.toString('utf8'))));
					Fs.readFile(item + '/component.js', function(err, js) {
						js && builder.push('<script>{0}</script>'.format(U.minifyScript(js.toString('utf8'))));
						Fs.writeFile(path + item.toLowerCase() + '.html', builder.join('\n'), next);
						console.log('Processing:', item);
					});
				});
			}, () => console.log('100% done, you need to upload all files "{0}*.html" on CDN.'.format(path)));
		});
	});
});