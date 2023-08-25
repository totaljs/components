COMPONENT('exec', function(self, config) {

	var regparent = /\?\d/;
	var extensions = [];
	var skiptimeout;

	self.readonly();
	self.blind();
	self.singleton();

	self.register = function(fn) {
		extensions.push(fn);
	};

	self.make = function() {

		var scope = null;

		var scopepath = function(el, val) {
			if (!scope)
				scope = el.scope();
			return val == null ? scope : scope ? scope.makepath ? scope.makepath(val) : val.replace(/\?/g, el.scope().path) : val;
		};

		var fn = function(plus, forceprevent) {
			return function execlick(e) {

				var el = $(this);

				if (!plus && skiptimeout)
					return;

				if (!e.$force && !plus && el.hclass('exec2')) {
					skiptimeout && clearTimeout(skiptimeout);
					skiptimeout = setTimeout(function(ctx, e) {
						skiptimeout = null;
						e.$force = true;
						execlick.call(ctx, e);
					}, 300, this, e);
					return;
				}

				var attr = el.attrd('exec' + plus);
				var path = el.attrd('path' + plus);
				var href = el.attrd('href' + plus);
				var def = el.attrd('def' + plus);
				var reset = el.attrd('reset' + plus);

				if (skiptimeout) {
					clearTimeout(skiptimeout);
					skiptimeout = null;
				}

				scope = null;

				var prevent = forceprevent ? '1' : el.attrd('prevent' + plus);
				if (prevent === 'true' || prevent === '1') {
					e.preventDefault();
					e.stopPropagation();
				}

				if (attr) {

					if (extensions.length) {
						for (var ext of extensions) {
							if (ext(attr, el, e, plus))
								return;
						}
					}

					// Run for the current component
					if (attr.charAt(0) === '@') {
						attr = attr.substring(1);
						var com = el.component();
						if (com && typeof(com[attr]) === 'function')
							com[attr](el, e);
						return;
					}

					if (attr.indexOf('?') !== -1) {
						var tmp = scopepath(el);
						if (tmp) {
							var isparent = regparent.test(attr);
							attr = tmp.makepath ? tmp.makepath(attr) : attr.replace(/\?/g, tmp.path);
							if (isparent && attr.indexOf('/') !== -1)
								M.scope(attr.split('/')[0]);
							else
								M.scope(tmp.path);
						}

						if (scope && scope.plugin) {
							var index = attr.indexOf('/');
							if (index !== -1) {
								var method = attr.substring(index + 1).trim();
								if (method) {
									var fn = scope.plugin[method];
									if (fn)
										fn.call(scope.plugin, el, e);
									else
										WARN('The method "{0}" not found'.format(attr));
									return;
								}
							}
						}
					}

					EXEC(attr, el, e);
				}

				href && REDIRECT(href);

				if (def) {
					if (def.indexOf('?') !== -1)
						def = scopepath(el, def);
					DEFAULT(def);
				}

				if (reset) {
					if (reset.indexOf('?') !== -1)
						reset = scopepath(el, reset);
					RESET(reset);
				}

				if (path) {
					var val = el.attrd('value');
					if (val) {
						if (path.indexOf('?') !== -1)
							path = scopepath(el, path);
						var v = GET(path);
						SET(path, new Function('value', 'return ' + val)(v), true);
					}
				}
			};
		};

		var el = $(document.body);
		el.on('contextmenu', config.selector3 || '.exec3', fn('3', true));
		el.on('dblclick', config.selector2 || '.exec2', fn('2'));
		el.on('click', config.selector || '.exec', fn(''));
	};
});