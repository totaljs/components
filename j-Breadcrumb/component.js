COMPONENT('breadcrumb', 'icon:fa fa-home;historyapi:1;root:Root;rooturl:/', function(self, config, cls) {

	var nav;

	self.make = function() {

		self.aclass(cls + (config.style === 2 ? (' ' + cls + '-style2') : ''));
		self.element.prepend('<nav></nav>');
		nav = self.find('> nav');

		nav.on('click', 'a,span', function(e) {
			e.preventDefault();
			var el = $(this);
			var url = el.attrd('id') || el.attr('href');
			var items = self.get();
			var item = items.findItem('url', url);
			if (item && item.callback) {
				item.callback(el, e);
				return;
			}

			if (config.exec) {
				self.SEEX(config.exec, url, el);
				return;
			}

			if (config.historyapi)
				REDIRECT(url);
			else
				location.href = url;
		});
	};

	self.add = function(name, url, callback) {
		var arr = [];

		config.root && arr.push({ name: config.root, url: config.rooturl });

		var fn = function(name, url, callback) {
			if (name && url)
				arr.push({ name: name, url: url, callback: callback });
			return fn;
		};

		setTimeout(function() {
			self.set(arr);
		}, 1);

		return fn(name, url, callback);
	};

	self.setter = function(value, path, type) {

		if (!value)
			value = EMPTYARRAY;

		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push('<{0}="{1}"{4}>{2}</{3}>'.format(config.exec ? 'span data-id' : 'a href', item.url || item.id, Thelpers.encode(item.name), config.exec ? 'span' : 'a', item.callback ? ' class="{0}-children"'.format(cls) : ''));
		}

		var html = builder.join('<i class="fa fa-angle-right"></i>');

		if (config.icon && html)
			html = '<i class="{0}"></i>'.format(config.icon) + html;

		nav.html(html);

		if (!type)
			self.rclass('hidden invisible');
	};

});