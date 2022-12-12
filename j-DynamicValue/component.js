COMPONENT('dynamicvalue', 'html:{{ name }};icon2:angle-down;loading:1', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.nocompile();

	self.validate = function(value) {
		return !config.required || config.disabled ? true : !!value;
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
			case 'html':
				config.html = Tangular.compile(value);
				break;
			case 'label':
				var label = self.find(cls2 + '-label');
				label.tclass('hidden', !value);
				label.find('span').html((value || '') + ':');
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.tclass(cls + '-required', value);
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

		self.aclass(cls + '-container');
		self.html('<div class="{2}-label{3}"><i class="fa hidden"></i><span>{1}:</span></div><div class="{2}"><div class="{2}-icon"><i class="fa fa-times"></i></div><div class="{2}-value">{0}</div></div>'.format(config.placeholder, config.label, cls, config.label ? '' : ' hidden'));

		self.event('click', '.' + cls, function() {

			if (config.disabled)
				return;

			if (config.dirsource) {
				var opt = {};
				opt.element = self.element;
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
					if (config.dirsource.indexOf(' ') !== -1) {
						var val = encodeURIComponent(value);
						AJAX(config.dirsource.format(val).arg({ value: val }), next);
					} else
						self.EXEC(config.dirsource, value, next);
				};
				opt.callback = function(selected) {
					self.set(selected[config.dirvalue || 'id']);
					self.change();
					config.required && setTimeout(self.validate2, 100);
				};
				SETTER('directory', 'show', opt);
			} else {
				self.EXEC(config.click || config.find, self.element, function(value) {
					self.set(value);
					self.change();
					config.required && setTimeout(self.validate2, 100);
				}, self.get());
			}

		});

		self.event('click', '.fa-times', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (!config.disabled) {
				self.change();
				self.set(null);
			}
		});
	};

	self.bindvalue = function(value) {

		config.bind && self.SEEX(config.bind, value);

		if (config.remap)
			value = config.remap(value);

		self.tclass(cls + '-is', !!value);
		var fa = self.find(cls2 + '-icon').find('i');

		fa.rclass2('fa-');

		if (value)
			fa.aclass('fa-times');
		else
			fa.aclass('fa-' + config.icon2);

		var val = (value ? config.html(value) : config.placeholder) || '';
		var body = self.find(cls2 + '-value');

		if (body.html() !== val)
			body.html(val);

		config.loading && SETTER('loading', 'hide', 200);
		self.response = value;
		config.onresponse && self.SEEX(config.onresponse, value);
	};

	self.setter = function(value, path, type) {
		if (value) {
			if (config.url) {
				config.loading && SETTER('loading', 'show');
				var val = encodeURIComponent(value);
				AJAX((config.url.indexOf(' ') === -1 ? 'GET ' : '') + config.url.format(val).arg({ value: val }), self.bindvalue);
			} else
				self.EXEC(config.exec || config.read, value, self.bindvalue, type);
		} else
			self.bindvalue(value);
	};

});