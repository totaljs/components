COMPONENT('checkboxlist', 'checkicon:check', function(self, config) {

	var cls = 'ui-checkboxlist';
	var cls2 = '.' + cls;
	var W = window;
	!W.$checkboxlist && (W.$checkboxlist = Tangular.compile('<div{{ if $.class }} class="{{ $.class }}"{{ fi }}><div class="' + cls + '-item" data-index="{{ index }}"><div><i class="fa fa-{{ $.checkicon }}"></i></div><span>{{ text }}</span></div></div>'));

	var template = W.$checkboxlist;
	var container, data, datasource, content, dataold, render = null;
	var customtemplate = false;
	var recompile = false;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : !!(value && value.length > 0);
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {

			case 'type':
				self.type = value;
				break;

			case 'checkicon':
				self.find('i').rclass().aclass('fa fa-' + value);
				break;

			case 'disabled':
				self.tclass('ui-disabled', value);
				self.reset();
				break;

			case 'datasource':
				self.datasource(value, self.bind);
				datasource && self.refresh();
				datasource = value;
				break;

			case 'icon':
				if (!self.find(cls2 + '-label').find('i').rclass().aclass('fa fa-' + value).length)
					redraw = true;
				break;

			case 'required':
				self.tclass(cls + '-required', value);
				self.state(1, 1);
				break;

			case 'label':
				redraw = true;
				break;

			case 'items':

				if (value instanceof Array) {
					self.bind('', value);
					return;
				}

				var items = [];
				value.split(',').forEach(function(item) {
					item = item.trim().split('|');
					var val = (item[1] == null ? item[0] : item[1]).trim();
					if (config.type === 'number')
						val = +val;
					items.push({ name: item[0].trim(), id: val });
				});

				self.bind('', items);
				self.refresh();
				break;
		}

		redraw && setTimeout2(self.id + '.redraw', function() {
			self.redraw();
			self.bind('', dataold);
			self.refresh();
		}, 100);
	};

	self.make = function() {

		var element = self.find('script');

		if (element.length) {
			var html = element.html();
			element.remove();
			html = html.replace('>', ' data-index="{{ index }}">');
			template = Tangular.compile(html);
			recompile = html.COMPILABLE();
			customtemplate = true;
		}

		self.aclass(cls);
		content = config.label || self.html();
		config.type && (self.type = config.type);
		config.disabled && self.aclass('ui-disabled');
		self.redraw();

		if (config.items)
			self.reconfigure({ items: config.items });
		else if (config.datasource)
			self.reconfigure({ datasource: config.datasource });
		else
			self.bind('', null);

		self.event('click', cls2 + '-container div[data-index], ' + cls2 + '-container-custom div[data-index]', function(e) {

			e.stopPropagation();

			if (config.disabled)
				return;

			var el = $(this);
			var is = !el.hasClass(cls + '-checked');
			var index = +el.attr('data-index');
			var value = data[index];

			if (value == null)
				return;

			value = value.value;

			var arr = self.get();
			if (!(arr instanceof Array))
				arr = [];

			index = arr.indexOf(value);

			if (is) {
				index === -1 && arr.push(value);
			} else {
				index !== -1 && arr.splice(index, 1);
			}

			self.reset(true);
			self.set(arr, 2);
			self.change();
		});
	};

	self.redraw = function() {
		var label = content;
		self.tclass(cls + '-required', config.required == true);
		self.html((label ? '<div class="' + cls + '-label">{1}{0}</div>'.format(label, config.icon ? '<i class="fa fa-{0}"></i>'.format(config.icon) : '') : '') + '<div class="' + cls + '-{0}"></div>'.format(customtemplate ? 'container-custom' : 'container' ));
		container = self.find((customtemplate ? cls2 + '-container-custom' : cls2 + '-container'));
	};

	self.selectall = function() {

		if (config.disabled)
			return;

		var arr = [];
		var inputs = self.find(cls2 + '-item');
		var value = self.get();

		self.change(true);

		if (value && inputs.length === value.length) {
			self.set(arr);
			return;
		}

		inputs.each(function() {
			var el = $(this);
			arr.push(self.parser(data[+el.attr('data-index')].value));
		});

		self.set(arr);
	};

	self.bind = function(path, value) {

		if (!value)
			return;

		var kv = config.value || 'id';
		var kt = config.text || 'name';

		render = '';
		data = [];
		dataold = value;

		for (var i = 0, length = value.length; i < length; i++) {

			var item = { value: isString ? value[i] : value[i][kv], text: isString ? value[i] : value[i][kt], index: i };
			var isString = typeof(value[i]) === 'string';

			if (customtemplate) {
				render += template(item, value[i]);
				data.push(item);
				continue;
			}

			render += template(item, config);
			data.push(item);
		}

		if (render)
			container.html(render);
		else
			container.html(config.empty);

		recompile && self.compile();

		path && setTimeout(function() {
			self.refresh();
		}, 200);
	};

	self.setter = function(value) {
		container.find('div[data-index]').each(function() {
			var el = $(this);
			var index = +el.attr('data-index');
			var checked = false;
			if (!value || !value.length)
				checked = false;
			else if (data[index])
				checked = data[index];
			checked && (checked = value.indexOf(checked.value) !== -1);
			el.tclass(cls + '-checked', checked);
		});
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