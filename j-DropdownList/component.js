COMPONENT('dropdownlist', 'limit:3;check:true', function(self, config, cls) {

	var cls2 = '.' + cls;
	var items;
	var nocheck = false;

	self.template = Tangular.compile('<div class="{0}-item" data-id="{{ id }}"><span class="{0}-control {0}-remove"><i class="ti ti-times"></i></span><div class="name">{{ if icon }}<i class="{{ icon }}"></i>{{ fi }}{{ name }}</div></div>'.format(cls));
	self.getter = null;

	self.validate = function(value) {
		return (!config.required || config.disabled) ? true : (value && value.length > 0);
	};

	self.uncheck = function() {
		var items = self.get();
		nocheck = false;
		self.tclass(cls + '-limited', items && config.limit ? items.length >= config.limit : false);
	};

	self.make = function() {

		var label = self.element.text() || config.label;
		self.aclass(cls + (config.required ? (' ' + cls + '-required') : ''));
		self.html('<label>{2}:</label><div class="{0}-values"><div class="{0}-add"><span class="{0}-control"><i class="ti ti-angle-down"></i></span>{1}</div><div class="{0}-items"></div></div>'.format(cls, config.placeholder, label));
		items = self.find(cls2 + '-items');
		self.event('click', cls2 + '-add', function() {

			if (self.hclass(cls + '-limited') || config.disabled)
				return;

			var items = self.get();
			var datasource = typeof(config.datasource) === 'string' ? GET(self.makepath(config.datasource)) : config.datasource;
			var opt = {};

			opt.element = $(this);

			if (config.dirplaceholder)
				opt.placeholder = config.dirplaceholder;

			if (config.dirsearch)
				opt.search = config.dirsearch;

			opt.offsetX = -1;
			opt.offsetY = -1;
			opt.offsetWidth = 12;
			opt.items = datasource.slice(0);

			if ((items && items.length)) {
				opt.items = opt.items.remove(function(item) {
					return items && items.length && items.findIndex('id', item.id) !== -1;
				});
			}

			opt.callback = function(value) {

				value = CLONE(value);

				delete value.selected;
				delete value.checked;
				delete value.template;

				var items = self.get() || [];

				if (items.findItem('id', value.id))
					return;

				items.unshift(value);

				if (config.limit && items.length > config.limit)
					items.splice(config.limit);

				nocheck = true;
				self.bind('@touched @modified @setter', items);
				setTimeout(self.uncheck, 100);
			};

			SETTER('directory/show', opt);
		});

		self.event('click', cls2 + '-remove', function() {

			if (config.disabled)
				return;

			var el = $(this).closest(cls2 + '-item');
			var id = ATTRD(el);
			var arr = self.get();
			var index = arr.findIndex('id', id);
			arr.splice(index, 1);
			nocheck = true;
			self.bind('@touched @modified @setter', arr);
			setTimeout(self.uncheck, 100);
		});
	};

	self.configure = function(key, value) {
		if (key === 'datasource') {
			if (value.includes(','))
				config.datasource = config.datasource.parseSource();
		} else if (key === 'disabled')
			self.tclass('ui-disabled', value);
	};

	self.check = function() {
		var items = self.get() || [];
		var check = typeof(config.datasource) === 'string' ? GET(self.makepath(config.datasource)) : config.datasource;
		items.wait(function(item, next) {
			var m = check.findItem('id', item.id);
			if (m) {
				item.name = m.name;
				item.icon = m.icon;
				item.unit = m.unit;
			} else
				item.id = '';
			next();
		}, function() {
			nocheck = true;
			self.bind('@touched @modified @setter', items.remove('id', ''));
			setTimeout(self.uncheck, 100);
		});
	};

	self.redraw = function() {

		var value = self.get() || [];
		var builder = [];

		for (var item of value)
			builder.push(self.template(item));

		items.html(builder.join(''));
		setTimeout(self.uncheck, 100);
	};

	self.setter = function() {
		if (nocheck || !config.check)
			self.redraw();
		else
			self.check();
	};

});
