COMPONENT('selectbox', function(self, config, cls) {

	var cls2 = '.' + cls;

	var Eitems, Eselected, condition;

	self.datasource2 = EMPTYARRAY;
	self.template = Tangular.compile('<span data-search="{{ search }}" data-index="{{ index }}">{{ text }}</span>');
	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value && value.length > 0;
	};

	self.configure = function(key, value) {

		var redraw = false;

		switch (key) {
			case 'type':
				self.type = value;
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('input').prop('disabled', value);
				if (value)
					self.rclass(cls + '-invalid');
				else if (config.required)
					self.state(1, 1);
				break;
			case 'if':
				condition = value ? FN(value) : null;
				break;
			case 'required':
				!value && self.state(1, 1);
				break;
			case 'height':
			case 'search':
				redraw = true;
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
				self.datasource(value, self.bind);
				break;
		}

		redraw && self.redraw();
	};

	self.search = function() {
		var search = config.search ? self.find('input').val().toSearch() : '';
		self.find(cls2 + '-main').find('span').each(function() {
			var el = $(this);
			el.tclass('hidden', el.attrd('search').indexOf(search) === -1);
		});
		self.find(cls2 + '-search-icon').tclass('ti-search', search.length === 0).tclass('ti-times', search.length > 0);
	};

	self.redraw = function() {
		self.html((typeof(config.search) === 'string' ? '<div class="{0}-search"><span><i class="ti ti-search {0}-search-icon"></i></span><div><input type="text" placeholder="{1}" /></div></div><div>'.format(cls, config.search) : '') + '<div class="{0}-container" style="height:{1}px"><div class="{0}-area {0}-main"><div class="{0}-body noscrollbar"></div></div><div class="{0}-area"><div class="{0}-body noscrollbar" style="height:{1}px"></div></div></div>'.format(cls, config.height || '200'));
		self.find(cls2 + '-body').each(function(index) {
			if (index)
				Eselected = $(this);
			else
				Eitems = $(this);
		});
	};

	self.bind = function(path, value) {

		if (M.is20)
			value = path;

		var kt = config.text || 'name';
		var kv = config.value || 'id';
		var builder = [];

		self.datasource2 = [];

		if (value) {
			var index = 0;
			for (var i = 0; i < value.length; i++) {
				var item = value[i];

				if (condition && !condition(item))
					continue;

				var text, val;

				if (typeof(item) === 'string') {
					text = item;
					val = self.parser(item);
				} else {
					text = item[kt];
					val = item[kv];
				}

				item = { text: text, value: val, index: index++, search: text.toSearch() };
				self.datasource2.push(item);
				builder.push(self.template(item));
			}
		}


		Eitems.empty().append(builder.join(''));
		self.refresh();
		self.search();
	};

	self.make = function() {

		self.aclass(cls);
		self.redraw();

		config.datasource && self.reconfigure('datasource:' + config.datasource);
		config.items && self.reconfigure('items:' + config.items);

		self.event('click', 'span[data-index]', function() {

			if (config.disabled)
				return;

			var selected = self.get() || [];
			var index = +this.getAttribute('data-index');
			var value = self.datasource2[index];

			if (selected.indexOf(value.value) === -1)
				selected.push(value.value);
			else
				selected = selected.remove(value.value);

			self.set(selected);
			self.change(true);
		});

		self.event('click', '.ti-times', function() {
			if (!config.disabled) {
				self.find('input').val('');
				self.search();
			}
		});

		typeof(config.search) === 'string' && self.event('keydown', 'input', function() {
			!config.disabled && setTimeout2(self.id, self.search, 500);
		});
	};

	self.setter = function(value, path, type) {

		var selected = {};
		var builder = [];

		var ds = self.datasource2;
		var dsl = ds.length;

		if (value) {
			for (var i = 0, length = value.length; i < length; i++) {
				for (var j = 0; j < dsl; j++) {
					if (ds[j].value === value[i]) {
						selected[j] = true;
						builder.push(self.template(ds[j]));
					}
				}
			}
		}

		Eitems.find('span').each(function() {
			var el = $(this);
			var index = +el.attrd('index');
			el.tclass(cls + '-selected', selected[index] !== undefined);
		});


		Eselected.empty().append(builder.join(''));
		self.search();

		if (type !== 1) {
			setTimeout(function() {
				Eitems[0].scrollTop = 0;
			}, 500);
		}
	};

	self.state = function(type) {
		if (type) {
			var invalid = config.required ? self.isInvalid() : false;
			if (invalid !== self.$oldstate) {
				self.$oldstate = invalid;
				self.tclass(cls + '-invalid', invalid);
			}
		}
	};
});