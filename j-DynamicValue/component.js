COMPONENT('dynamicvalue', 'html:{{ name }};icon2:search;loading:true', function(self, config) {

	var cls = 'ui-dynamicvalue';

	self.readonly();
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
				var label = self.find('.' + cls + '-label');
				label.tclass('hidden', !value);
				label.find('span').text((value || '') + ':');
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
				var fa = self.find('.' + cls + '-label').find('i');
				fa.rclass2('fa-').rclass('hidden');
				if (value)
					fa.aclass('fa-' + value);
				else
					fa.aclass('hidden');
				break;
		}
	};

	self.make = function() {

		if (!config.label)
			config.label = self.html();

		self.aclass(cls + '-container');
		self.html('<div class="{2}-label{3}"><i class="fa hidden"></i><span>{1}:</span></div><div class="{2}"><div class="{2}-icon"><i class="fa fa-times"></i></div><div class="{2}-value">{0}</div></div>'.format(config.placeholder, config.label, cls, config.label ? '' : ' hidden'));

		self.event('click', '.' + cls, function() {
			!config.disabled && EXEC(config.click, function(value) {
				self.set(value);
				self.change();
				config.required && setTimeout(self.validate2, 100);
			}, self.get());
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

		self.tclass(cls + '-is', !!value);
		var fa = self.find('.' + cls + '-icon').find('i');

		fa.rclass2('fa-');

		if (value)
			fa.aclass('fa-times');
		else
			fa.aclass('fa-' + config.icon2);

		var val = value ? config.html(value) : config.placeholder;
		var body = self.find('.' + cls + '-value');

		if (body.html() !== val)
			body.html(val);

		config.loading && SETTER('loading', 'hide', 200);
	};

	self.setter = function(value, path, type) {
		if (value == null)
			self.bindvalue(value);
		else {
			if (config.url) {
				config.loading && SETTER('loading', 'show');
				AJAX(config.url.arg({ value: encodeURIComponent(value) }), self.bindvalue);
			} else
				EXEC(config.exec, value, self.bindvalue, type);
		}
	};

});