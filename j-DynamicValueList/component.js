COMPONENT('dynamicvaluelist', 'value:name;placeholder:Click to change;after:\\:', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;

	self.readonly();
	self.nocompile();

	self.validate = function(value) {
		return !config.required || config.disabled ? true : !!(value && value.length);
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

	self.configure = function(key, value) {
		switch (key) {
			case 'label':
				var label = self.find(cls2 + '-label');
				label.tclass('hidden', !value);
				label.find('span').html((value || '') + ':');
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				var el = self.find(cls2 + '-label');
				if (value)
					el.aclass(cls + '-required');
				else
					el.rclass(cls + '-required');
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'icon':
				var fa = self.find(cls2 + '-label').find('i');
				fa.rclass2('fa-').rclass('hidden');
				if (value)
					fa.aclass('fa-' + value);
				else
					fa.aclass('hidden');
				break;
			case 'remap':
				config.remap = value ? FN(value) : null;
				break;
		}
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		var icon = '';
		if (config.icon)
			icon = '<i class="{0}"></i>'.format(config.icon.indexOf(' ') === -1 ? ('fa fa-' + config.icon) : config.icon);

		self.aclass(cls);
		self.aclass(cls + '-empty');
		self.html('<div class="{0}-label">{1}{2}{3}</div><div class="{0}-container"></div><div class="{0}-item {0}-input"><div class="{0}-value">{4}</div></div>'.format(cls, icon, config.label, config.after || '', config.placeholder));
		container = self.find(cls2 + '-container');

		self.event('click', cls2 + '-value', function(e) {

			var parent = $(this).parent();
			var index = parent.attrd('index');
			if (config.disabled || parent.hclass(cls + '-input'))
				return;

			self.bind(parent, index);
		});

		self.event('click', cls2 + '-input', function(e) {

			if (config.disabled)
				return;

			var data = self.get();
			var index = (data || []).length;
			var el = $(this);
			self.bind(el, index);
		});

		self.event('click', cls2 + '-remove', function(e) {

			if (config.disabled)
				return;

			var data = self.get();
			var parent = $(this).parent();
			var index = +parent.attrd('index');
			parent.remove();
			data.splice(index, 1);
			self.set(data);
			self.change();
		});
	};

	self.bind = function(el, index) {
		if (config.dirsource) {
			var opt = {};
			opt.element = el;
			opt.offsetY = -1;
			opt.placeholder = config.dirplaceholder;
			opt.render = config.dirrender ? GET(self.makepath(config.dirrender)) : null;
			opt.custom = !!config.dircustom;
			opt.offsetWidth = 2;
			opt.minwidth = config.dirminwidth || 200;
			opt.maxwidth = config.dirmaxwidth;
			opt.key = config.dirkey || config.key;
			opt.empty = config.dirempty;
			opt.key = config.dirkey;

			opt.items = function(value, next) {
				EXEC(self.makepath(config.dirsource), value, next);
			};

			opt.callback = function(selected) {
				var data = self.get();
				data[index] = selected;
				self.set(data);
				self.change();
				config.required && setTimeout(self.validate2, 100);
			};

			SETTER('directory', 'show', opt);
		} else {
			EXEC(self.makepath(config.click), el, function(value) {
				var data = self.get();
				data[index] = value;
				self.set(data);
				self.change();
				config.required && setTimeout(self.validate2, 100);
			}, self.get());
		}
	};

	self.bindvalue = function(values) {

		if (!(values instanceof Array))
			values = [];

		var html = '';
		for (var i = 0; i < values.length; i++) {
			var value = values[i];
			var val;

			config.bind && SEEX(self.makepath(config.bind), value);

			val = (value instanceof Object ? value[config.value] : value);

			if (config.remap)
				value = config.remap(value);

				html += '<div class="{0}-item" data-index="{1}"><div class="{0}-remove"><i class="fa fa-times"></i></div><div class="{0}-value">{2}</div></div>'.format(cls, i, val);
		}

		container.html(html);

		self.tclass(cls + '-empty', !values.length);
	};

	self.setter = function(value, path, type) {
		if (!value) {
			self.set([], 0);
			return;
		}

		if (value)
				EXEC(self.makepath(config.exec), value, self.bindvalue, type);
		else
			self.bindvalue(value);
	};

});
