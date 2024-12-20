COMPONENT('permissions', 'placeholder:Search;types:R,RW;default:R', function(self, config, cls) {

	var cls2 = '.' + cls;
	var skip = false;
	var dirsource = EMPTYARRAY;
	var types = EMPTYARRAY;
	var tbody;

	self.configure = function(key, value) {
		switch (key) {
			case 'types':
				types = value.split(',');
				for (let i = 0; i < types.length; i++) {
					let tmp = types[i].split('|');
					types[i] = { id: tmp[0], name: tmp[1] || tmp[0] };
				}
				self.recompile();
				break;
			case 'disabled':
				self.tclass(cls + '-disabled', value);
				break;
			case 'dirsource':
				if (value) {
					if (value.includes(',')) {
						dirsource = value.parseSource();
						self.redraw();
					} else {
						self.datasource(value, function(value, path) {
							dirsource = M.is20 ? value : path;
							self.redraw();
						});
					}
				}
				break;
		}
	};

	self.redraw = function() {

		if (!dirsource)
			return;

		let items = self.get();
		tbody.empty();

		if (!items || !items.length) {
			config.empty && tbody.append('<tr><td class="{0}-empty"><i class="ti ti-database"></i>{1}</td></tr>'.format(cls, config.empty));
			return;
		}

		var builder = [];

		for (let m of items) {
			let arr = m.split('|');
			// arr[0]; Permission
			// arr[1]; who
			let name = dirsource.findValue('id', arr[1], 'name');
			if (name)
				builder.push(self.template({ id: arr[1], name: name, value: arr[0] || 'R' }));
		}

		tbody.html(builder.join(''));
	};

	self.recompile = function() {
		var builder = ['<tr data-id="{{ id }}"><td class="{0}-text"><i class="ti ti-trash {0}-remove red"></i>{{ name | raw }}</td>'];
		for (let type of types)
			builder.push('<td class="{0}-type{{ if value === \'{1}\' }} {0}-checked{{ fi }}" data-type="{1}"><i class="ti"></i>{2}</td>'.format(cls, type.id, type.name));
				builder.push('</tr>');
		self.template = Tangular.compile(builder.join('').format(cls));
	};

	self.make = function() {
		self.aclass(cls);
		config.disabled && self.aclass(cls + '-disabled');
		self.html('<div class="{0}-header"><i class="ti ti-plus-circle green"></i><span>{1}</span></div><div class="{0}-container invisible"><table><tbody></tbody></table></div>'.format(cls, self.html()));
		tbody = self.find('tbody');

		self.event('click', cls2 + '-header', function() {

			if (config.disabled)
				return;

			var opt = {};
			opt.raw = !!config.dirraw;
			opt.element = $(this);
			opt.placeholder = config.placeholder;
			opt.items = dirsource;
			opt.callback = function(selected) {
				var items = self.get();
				for (let m of items) {
					if (m.split('|')[1] === selected.id)
						return;
				}
				items.push(types[0].id + '|' + selected.id);
				self.bind('@modified @touched @setter', items);
			};

			SETTER('directory/show', opt);
		});

		self.event('click', cls2 + '-type', function() {

			if (config.disabled)
				return;

			var el = $(this);
			var tr = el.closest('tr');
			tr.find(cls2 + '-checked').rclass(cls + '-checked');
			el.aclass(cls + '-checked');

			var id = ATTRD(el);
			var items = self.get();

			for (let i = 0; i < items.length; i++) {
				let item = items[i];
				let arr = item.split('|');
				if (arr[1] === id) {
					items[i] = el.attrd('type') + '|' + id;
					self.bind('@modified @touched', items);
					break;
				}
			}

		});

		self.event('click', cls2 + '-remove', function(e) {
			if (config.disabled)
				return;
			var el = $(this);
			var index = +el.closest('tr').attrd('index');
			var items = self.get();
			items.splice(index, 1);
			self.bind('@modified @touched @setter', items);
		});
	};

	self.setter = function(value) {
		self.redraw();
		self.find(cls2 + '-container').rclass('invisible');
	};

});