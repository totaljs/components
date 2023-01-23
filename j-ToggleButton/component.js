COMPONENT('togglebutton', function(self, config, cls) {

	var icon;

	self.nocompile();

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : value === true;
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				!init && self.tclass('ui-disabled', value);
				break;
			case 'icontrue':
			case 'iconfalse':
				if (value.indexOf(' ') === -1)
					config[key] = 'ti ti-' + value;
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		self.append('<button><i></i></button>');
		icon = self.find('i');
		self.event('click', function() {
			if (!config.disabled) {
				self.dirty(false);
				self.getter(!self.get());
			}
		});
	};

	self.setter = function(value) {
		self.tclass(cls + '-selected', value === true);
		icon.rclass();
		if (value === true) {
			if (config.icontrue)
				icon.aclass(config.icontrue);
		} else {
			if (config.iconfalse)
				icon.aclass(config.iconfalse);
		}
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