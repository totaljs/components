COMPONENT('breadcrumb', 'icon:fa fa-home;historyapi:1', function(self, config, cls) {

	var nav;

	self.make = function() {

		self.aclass(cls);
		self.element.prepend('<nav></nav>');
		nav = self.find('> nav');

		self.event('click', 'a', function(e) {
			e.preventDefault();
			var url = $(this).attr('href');

			if (config.exec) {
				self.SEEX(config.exec, url);
				return;
			}

			if (config.historyapi)
				REDIRECT(url);
			else
				location.href = url;
		});
	};

	self.setter = function(value) {
		if (!value)
			value = EMPTYARRAY;

		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push('<a href="{0}">{1}</a>'.format(item.url, Thelpers.encode(item.name)));
		}

		var html = builder.join('<i class="fa fa-angle-right"></i>');

		if (config.icon)
			html = '<i class="{0}"></i>'.format(config.icon) + html;

		nav.html(html);
	};

});