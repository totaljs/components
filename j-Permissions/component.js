COMPONENT('permissions', 'placeholder:Search;types:R,W,RW;default:R', function(self, config) {

	var cls = 'ui-permissions';
	var cls2 = '.' + cls;
	var tbody;
	var skip = false;

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass(cls + '-disabled', value);
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		config.disabled && self.aclass(cls + '-disabled');

		var builder = ['<tr data-index="{{ index }}"><td class="{0}-text"><i class="ti ti-times red"></i>{{ text | raw }}</td>'];
		var types = config.types.split(',').trim();

		for (var i = 0; i < types.length; i++)
			builder.push('<td class="{0}-type{{ if value === \'{1}\' }} {0}-checked{{ fi }}" data-type="{1}"><i class="ti"></i>{1}</td>'.format(cls, types[i]));

		builder.push('</tr>');
		self.template = Tangular.compile(builder.join('').format(cls));
		self.html('<div class="{0}-header"><i class="ti ti-plus-circle green"></i><span>{1}</span></div><div class="{0}-container"><table><tbody></tbody></table></div>'.format(cls, self.html()));
		tbody = self.find('tbody');

		self.event('click', cls2 + '-header', function() {

			if (config.disabled)
				return;

			var opt = {};
			opt.raw = !!config.dirraw;
			opt.element = $(this);
			opt.placeholder = config.placeholder;
			opt.items = GET(config.dirsource);
			opt.callback = function(value) {
				var items = self.get();
				if (!items || !items.findItem(config.pk, value[config.pk])) {
					if (!value.text)
						value.text = value.name;
					value.value = config.default;
					value && self.push(value);
				}
			};
			SETTER('directory', 'show', opt);
		});

		self.event('click', cls2 + '-type', function() {

			if (config.disabled)
				return;

			var el = $(this);
			var tr = el.closest('tr');
			tr.find(cls2 + '-checked').rclass(cls + '-checked');
			el.aclass(cls + '-checked');
			var index = +tr.attrd('index');
			GETU(self.path)[index].value = el.attrd('type');
		});

		self.event('click', '.ti-times', function(e) {

			if (config.disabled)
				return;

			var el = $(this);
			var index = +el.closest('tr').attrd('index');
			var items = GETU(self.path);
			items.splice(index, 1);
		});
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		tbody.empty();

		if (!value || !value.length) {
			config.empty && tbody.append('<tr><td class="{0}-empty"><i class="ti ti-database"></i>{1}</td></tr>'.format(cls, config.empty));
			return;
		}

		var types = config.types.split(',');
		var builder = [];
		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			builder.push(self.template({ index: i, text: item.text || item.name, value: item.value || types[0] || 'R' }));
		}

		tbody.html(builder.join(''));
	};

});