COMPONENT('listbox', function(self, config) {

	var Eitems, datasource = null;
	var skip = false;

	self.datasource = EMPTYARRAY;
	self.template = Tangular.compile('<li data-search="{{ search }}" data-index="{{ index }}">{{ if icon }}<i class="fa fa-{{ icon }}"></i>{{ fi }}{{ text }}</li>');
	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value ? (config.multiple ? value.length > 0 : true) : false;
	};

	self.make = function() {

		self.aclass('ui-listbox');
		self.redraw();

		config.datasource && self.reconfigure('datasource:' + config.datasource);
		config.items && self.reconfigure('items:' + config.items);

		self.event('click', 'li', function() {
			if (config.disabled)
				return;

			var index = +this.getAttribute('data-index');
			var value = self.datasource[index];

			skip = true;

			if (config.multiple) {
				var selected = self.get() || [];
				if (selected.indexOf(value.value) === -1)
					selected.push(value.value);
				else
					selected = selected.remove(value.value);
				self.set(selected);
				config.exec && EXEC(config.exec, selected);
			} else {
				self.set(value.value);
				config.exec && EXEC(config.exec, value.value);
			}

			self.change(true);
		});

		self.event('click', '.fa-times', function() {
			if (!config.disabled) {
				self.find('input').val('');
				self.search();
			}
		});

		typeof(config.search) === 'string' && self.event('keydown', 'input', function() {
			!config.disabled && setTimeout2(self.id, self.search, 500);
		});
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'type':
				self.type = value;
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('input').prop('disabled', value);
				if (value)
					self.rclass('ui-listbox-invalid');
				else if (config.required)
					self.state(1, 1);
				break;
			case 'required':
				!value && self.state(1, 1);
				break;
			case 'search':
				redraw = true;
				break;
			case 'height':
				Eitems.css('height', value + 'px');
				break;
			case 'items':
				var arr = [];
				value.split(',').forEach(function(item) {
					item = item.trim().split('|');
					var obj = {};
					obj.name = item[0].trim();
					obj.id = (item[1] == null ? item[0] : item[1]).trim();
					if (config.type === 'number')
						obj.id = +obj.id;
					arr.push(obj);
				});
				self.bind('', arr);
				break;
			case 'datasource':
				datasource && self.unwatch(datasource, self.bind);
				self.watch(value, self.bind, true);
				datasource = value;
				break;
		}

		redraw && self.redraw();
	};

	self.search = function() {
		var search = config.search ? self.find('input').val().toSearch() : '';
		var first;
		Eitems.find('li').each(function() {
			var el = $(this);
			el.tclass('hidden', el.attrd('search').indexOf(search) === -1);
			if (!first && el.hclass('ui-listbox-selected'))
				first = el;
		});
		self.find('.ui-listbox-search-icon').tclass('fa-search', search.length === 0).tclass('fa-times', search.length > 0);
		!skip && first && first[0].scrollIntoView(true);
		skip = false;
	};

	self.redraw = function() {
		self.html((typeof(config.search) === 'string' ? '<div class="ui-listbox-search"><span><i class="fa fa-search ui-listbox-search-icon"></i></span><div><input type="text" placeholder="{0}" /></div></div><div><div class="ui-listbox-search-empty"></div>'.format(config.search) : '') + '<div><ul style="height:{0}px"></ul></div>'.format(config.height || '200'));
		Eitems = self.find('ul');
	};

	self.bind = function(path, value) {

		var kt = config.text || 'name';
		var kv = config.value || 'id';
		var ki = config.icon || 'icon';
		var builder = [];

		self.datasource = [];
		value && value.forEach(function(item, index) {

			var text;
			var value;
			var icon = null;

			if (typeof(item) === 'string') {
				text = item;
				value = self.parser(item);
			} else {
				text = item[kt];
				value = item[kv];
				icon = item[ki];
			}

			var item = { text: text, value: value, index: index, search: text.toSearch(), icon: icon };
			self.datasource.push(item);
			builder.push(self.template(item));
		});

		Eitems.empty().append(builder.join(''));
		self.search();
	};

	self.setter = function(value) {

		var selected = {};
		var ds = self.datasource;
		var dsl = ds.length;

		if (value != null) {
			if (config.multiple) {
				for (var i = 0, length = value.length; i < length; i++) {
					for (var j = 0; j < dsl; j++) {
						if (ds[j].value === value[i])
							selected[j] = true;
					}
				}
			} else {
				for (var j = 0; j < dsl; j++) {
					if (ds[j].value === value)
						selected[j] = true;
				}
			}
		}

		Eitems.find('li').each(function() {
			var el = $(this);
			var index = +el.attrd('index');
			var is = selected[index] !== undefined;
			el.tclass('ui-listbox-selected', is);
		});

		self.search();
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-listbox-invalid', invalid);
	};
});