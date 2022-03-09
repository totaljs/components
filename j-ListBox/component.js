COMPONENT('listbox', function(self, config, cls) {

	var cls2 = '.' + cls;
	var Eitems = null;
	var skip = false;

	self.items = EMPTYARRAY;
	self.template = Tangular.compile('<li data-search="{{ search }}" data-index="{{ index }}" style="padding-right:{0}px">{{ if icon }}<i class="fa fa-{{ icon }}"></i>{{ fi }}{{ text }}</li>'.format(SCROLLBARWIDTH()));
	self.nocompile && self.nocompile();

	self.init = function() {

		var resize = function() {
			// Notifies all listboxes
			setTimeout2('listboxes_resize', function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'listbox' && !(com.config.height > 0))
						com.resize2();
				}
			}, 100);
		};

		ON('resize2', resize);
	};

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value ? (config.multiple ? value.length > 0 : true) : false;
	};

	self.make = function() {

		self.aclass(cls);
		self.redraw();

		config.datasource && self.reconfigure('datasource:' + config.datasource);
		config.items && self.reconfigure('items:' + config.items);

		self.event('click', 'li', function() {

			if (config.disabled)
				return;

			var index = +this.getAttribute('data-index');
			var value = self.items[index];

			skip = true;

			if (config.multiple) {
				var selected = self.get() || [];
				if (selected.indexOf(value.value) === -1)
					selected.push(value.value);
				else
					selected = selected.remove(value.value);
				self.set(selected);
				config.exec && self.EXEC(config.exec, selected);
			} else {
				self.set(value.value);
				config.exec && self.EXEC(config.exec, value.value);
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

		self.on('resize + reflow', self.resize2);
	};

	self.configure = function(key, value) {

		var redraw = false;
		switch (key) {
			case 'type':
				self.type = value;
				break;
			case 'disabled':
				self.tclass(cls + '-disabled', value);
				self.find('input').prop('disabled', value);
				if (value)
					self.rclass(cls + '-invalid');
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
				if (value > 0)
					Eitems.css('height', value + 'px');
				else
					self.resize();
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
				self.datasource(value, self.bind, true);
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
			if (!first && el.hclass(cls + '-selected'))
				first = el;
		});
		self.find(cls2 + '-search-icon').tclass('fa-search', search.length === 0).tclass('fa-times', search.length > 0);
		!skip && first && first[0].scrollIntoView(true);
		skip = false;
	};

	self.redraw = function() {
		self.html((typeof(config.search) === 'string' ? '<div class="{0}-search"><span><i class="fa fa-search {0}-search-icon"></i></span><div><input type="text" placeholder="{1}" /></div></div><div><div class="{0}-search-empty"></div>'.format(cls, config.search) : '') + '<div class="{0}-container"><ul style="height:{1}px" class="{0}-noscrollbar"></ul></div>'.format(cls, config.height || '200'));
		Eitems = self.find('ul');
		self.resize();
	};

	self.resize2 = function() {
		if (!(config.height > 0))
			setTimeout2(self.ID + 'resize', self.resize, 300);
	};

	self.resize = function() {
		self.width(function() {
			var h = 0;
			var css = {};
			if (typeof(config.height) === 'string') {
				// selector
				switch (config.height) {
					case 'parent':
						h = self.element.parent().height();
						break;
					case 'window':
						h = WH;
						break;
					default:
						h = self.element.closest(config.height).height();
						break;
				}
				css.height = (h - (config.margin || 0) - (self.find(cls2 + '-search').height() + 4)) >> 0; // 4 means border
			}
			Eitems.css(css);
		});
	};

	self.bind = function(path, value) {

		var kt = config.text || 'name';
		var kv = config.value || 'id';
		var ki = config.icon || 'icon';
		var builder = [];

		self.items = [];
		value && value.forEach(function(item, index) {

			var text;
			var value;
			var icon = null;

			if (typeof(item) === 'string') {
				text = item || '';
				value = self.parser(item);
			} else {
				text = item[kt] || '';
				value = item[kv];
				icon = item[ki];
			}

			var item = { text: text, value: value, index: index, search: text.toSearch(), icon: icon };
			self.items.push(item);
			builder.push(self.template(item));
		});

		Eitems.empty().append(builder.join(''));
		self.search();
	};

	self.setter = function(value) {

		var selected = {};
		var ds = self.items;
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
			el.tclass(cls + '-selected', is);
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
		self.tclass(cls + '-invalid', invalid);
	};
});