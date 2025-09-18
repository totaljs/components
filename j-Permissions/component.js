COMPONENT('permissions', 'placeholder:Search;types:C,R,U,D;default:R;autoremove:1;autoexclude:1;label:Add', function (self, config, cls) {

	var cls2 = '.' + cls;
	var dirsource = EMPTYARRAY;
	var types = EMPTYARRAY;
	var tbody;

	self.configure = function (key, value, cls) {
		switch (key) {
			case 'types':
				types = value.split(',');
				for (let i = 0; i < types.length; i++) {
					let tmp = types[i].split('|');
					types[i] = { id: tmp[0], name: tmp[1] || tmp[0] };
				}
				self.recompile();
				break;
			case 'dirsource':
				if (value) {
					if (value.includes(',')) {
						dirsource = value.parseSource();
						self.redraw();
					} else {
						self.datasource(value, function (value, path) {
							dirsource = CLONE(M.is20 ? value : path);
							self.redraw();
						});
					}
				}
				break;
		}
	};

	self.redraw = function () {
		setTimeout2(self.ID, self.redrawforce, 50);
	};

	self.redrawforce = function () {

		if (!dirsource)
			return;

		let items = self.get();
		tbody.empty();
		tbody.append(self.header);

		if (!items || !items.length) {
			config.empty && tbody.append('<div class="{0}-row"><div class="{0}-cell {0}-empty" style="grid-column:1 / span {1}"><i class="ti ti-database"></i>{2}</div></div>'.format(cls, types.length + 1, config.empty));
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
			tbody.append(builder.join(''));
		else
			config.empty && tbody.append('<div class="{0}-row"><div class="{0}-cell {0}-empty" style="grid-column:1 / span {1}"><i class="ti ti-database"></i>{2}</div></div>'.format(cls, types.length + 1, config.empty));
	};

	self.recompile = function () {
		var builder = ['<div class="{0}-row" data-id="{{ id }}">'];
		builder.push('<div class="{0}-cell {0}-text"><i class="ti ti-trash {0}-remove red"></i>{{ name | raw }}</div>');
		
		for (let type of types) {
			builder.push('<div class="{0}-cell {0}-type{{ if value.includes(\'{1}\') }} {0}-checked{{ fi }}" data-type="{1}"><i class="ti"></i></div>'.format(cls, type.id));
		}

		builder.push('</div>');
		self.template = Tangular.compile(builder.join('').format(cls));

		self.find('.' + cls + '-container').css('--permissions-cols', types.length);

		self.header = '<div class="{0}-headerrow">'.format(cls);
		self.header += '<div class="{0}-cell {0}-headercell"><button class="{0}-headerbutton"><i class="ti ti-plus-circle mr5"></i>{1}</button></div>'.format(cls, config.label || 'Add');
		
		for (let type of types) {
			self.header += '<div class="{0}-cell {0}-headercell" title="{1}">{1}</div>'.format(cls, type.name);
		}

		self.header += '</div>';
	};

	self.make = function () {
		self.aclass(cls);

		self.html('<div class="{0}-container invisible"></div>'.format(cls));
		tbody = self.find('.' + cls + '-container');

		self.event('click', cls2 + '-type', function () {

			if (config.disabled)
				return;

			let el = $(this);
			let row = el.closest(cls2 + '-row');

			el.tclass(cls + '-checked');

			let id = row.attrd('id');
			let items = self.get() || [];
			let typesel = [];

			row.find('.' + cls + '-checked').each(function () {
				let checked = $(this);
				let type = checked.attrd('type');
				typesel.push(type);
			});

			items = items.remove(n => n.substring(1) === id);

			for (let type of typesel)
				items.push(type + id);

			self.bind('@modified @touched', items);
			config.exec && self.EXEC(config.exec, items);
		});

		self.event('click', cls2 + '-headerbutton', function() {

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
			opt.element = $(this).closest('.' + cls + '-headercell');
			opt.placeholder = config.placeholder;
			opt.items = dirsource;

			if (config.autoexclude)
				opt.exclude = item => used[item.id];

			opt.callback = function(selected) {
				if (!used[selected.id]) {
					items.push(types[0].id + selected.id);
					self.bind('@modified @touched @setter', items);
					config.exec && self.EXEC(config.exec, items);
				}
			};

			SETTER('directory/show', opt);
		});

		self.event('click', cls2 + '-remove', function () {
			if (config.disabled)
				return;
			
			var el = $(this);
			var id = el.closest(cls2 + '-row').attrd('id');
			var items = self.get();
			items = items.remove(n => n.substring(1) === id);
			self.bind('@modified @touched @setter', items);
			config.exec && self.EXEC(config.exec, items);
		});
	};

	self.setter = function () {
		self.redraw();
		self.find(cls2 + '-container').rclass('invisible');
	};
});
