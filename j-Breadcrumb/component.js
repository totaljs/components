COMPONENT('breadcrumb', 'icon:fa fa-home;historyapi:1', function(self, config, cls) {

	var last;

	self.make = function() {
		self.aclass(cls);
		self.event('click', 'button', function() {
			var el = $(this);
			var index = +el.attr('name');
			last && last.buttons && last.buttons[index] && last.buttons[index].click(el);
		});

		self.event('click', 'a', function(e) {
			e.preventDefault();
			var url = $(this).attr('href');
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
		var buttons = '';

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push('<a href="{0}">{1}</a>'.format(item.url, Thelpers.encode(item.name)));
		}

		last = value[value.length - 1];

		if (last && last.buttons) {
			for (var i = 0; i < last.buttons.length; i++) {
				var btn = last.buttons[i];
				buttons += '<button name="{0}">{1}{2}</button>'.format(i, btn.icon ? '<i class="{0}"></i>'.format(btn.icon) : '', btn.name);
			}
		}

		if (buttons)
			buttons = '<nav>' + buttons + '</nav>';

		self.html(buttons + '<i class="{0}"></i>'.format(config.icon) + builder.join('<i class="fa fa-angle-right"></i>'));
	};

});