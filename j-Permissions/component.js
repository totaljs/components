COMPONENT('permissions', 'placeholder:Search;types:C,R,U,D;default:R;autoremove:1;autoexclude:1', function(self, config, cls) {

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
							dirsource = CLONE(M.is20 ? value : path);
							self.redraw();
						});
					}
				}
				break;
		}
	};

	self.redraw = function() {
		setTimeout2(self.ID, self.redrawforce, 50);
	};

	self.redrawforce = function() {

		if (!dirsource)
			return;

		let items = self.get();
		tbody.empty();

		if (!items || !items.length) {
			config.empty && tbody.append('<tr><td class="{0}-empty"><i class="ti ti-database"></i>{1}</td></tr>'.format(cls, config.empty));
			return;
		}

		let builder = [];
		let remove = [];
		let cache = {};

		for (let m of items) {
			let op = m.substring(0, 1);
			let who = m.substring(1);
			if (cache[who])
				cache[who].push(op);
			else
				cache[who] = [op];
		}

		for (let key in cache) {
			// arr[0]; operation (single character only)
			// arr[1]; who
			let name = dirsource.findValue('id', key, 'name');
			if (name)
				builder.push(self.template({ id: key, name: name, value: cache[key] }));
			else if (config.autoremove)
				remove.push(key);

		}

		if (remove.length) {
			for (let m of remove)
				items.splice(items.indexOf(m), 1);
		}

		if (items.length)
			tbody.html(builder.join(''));
		else
			config.empty && tbody.append('<tr><td class="{0}-empty"><i class="ti ti-database"></i>{1}</td></tr>'.format(cls, config.empty));

	};

	self.recompile = function() {
		var builder = ['<tr data-id="{{ id }}"><td class="{0}-text"><i class="ti ti-trash {0}-remove red"></i>{{ name | raw }}</td>'];
		for (let type of types)
			builder.push('<td class="{0}-type{{ if value.includes(\'{1}\') }} {0}-checked{{ fi }}" data-type="{1}"><i class="ti"></i>{2}</td>'.format(cls, type.id, type.name));
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

			let items = self.get() || [];
			let opt = {};
			let used = {};

			for (let m of items) {
				let id = m.substring(1);
				used[id] = 1;
			}

			opt.raw = !!config.dirraw;
			opt.element = $(this);
			opt.placeholder = config.placeholder;
			opt.items = dirsource;

			if (config.autoexclude)
				opt.exclude = item => used[item.id];

			opt.callback = function(selected) {
				if (!used[selected.id]) {
					items.push(types[0].id + selected.id);
					self.bind('@modified @touched @setter', items);
				}
			};

			SETTER('directory/show', opt);
		});

		self.event('click', cls2 + '-type', function() {

			if (config.disabled)
				return;

			let el = $(this);
			let tr = el.closest('tr');
			let is = false;

			// tr.find(cls2 + '-checked').rclass(cls + '-checked');
			el.tclass(cls + '-checked');

			let id = ATTRD(el);
			let items = self.get();
			let types = [];

			tr.find(cls2 + '-checked').each(function() {
				let checked = $(this);
				let type = ATTRD(checked, 'type');
				types.push(type);
			});

			let rem = [];

			for (let item of items) {
				if (item.substring(1) === id)
					rem.push(item);
			}

			for (let item of rem)
				items.splice(items.indexOf(item), 1);

			for (let type of types)
				items.push(type + id);

			self.bind('@modified @touched', items);

		});

		self.event('click', cls2 + '-remove', function(e) {
			if (config.disabled)
				return;
			var el = $(this);
			var id = el.closest('tr').attrd('id');
			var items = self.get();
			items = items.remove(n => n.substring(1) === id);
			self.bind('@modified @touched @setter', items);
		});
	};

	self.setter = function(value) {
		self.redraw();
		self.find(cls2 + '-container').rclass('invisible');
	};

});