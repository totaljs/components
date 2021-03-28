COMPONENT('breadcrumb', 'icon:fa fa-home;historyapi:1', function(self, config, cls) {

	var nav;

	self.make = function() {

		self.aclass(cls);
		self.element.prepend('<nav></nav>');
		nav = self.find('> nav');

		nav.event('click', 'a,span', function(e) {
			e.preventDefault();
			var el = $(this);
			var url = el.attrd('id') || el.attr('href');

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
			builder.push('<{0}="{1}">{2}</{3}>'.format(config.exec ? 'span data-id' : 'a href', item.url || item.id, Thelpers.encode(item.name), config.exec ? 'span' : 'a'));
		}

		var html = builder.join('<i class="fa fa-angle-right"></i>');

		if (config.icon)
			html = '<i class="{0}"></i>'.format(config.icon) + html;

		nav.html(html);
	};

});