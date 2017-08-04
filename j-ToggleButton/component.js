COMPONENT('togglebutton', function(self, config) {

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : value === true;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
		}
	};

	self.make = function() {
		self.aclass('ui-togglebutton');
		self.append('<button></button>');
		self.event('click', function() {
			if (config.disabled)
				return;
			self.dirty(false);
			self.getter(!self.get(), 2, true);
		});
	};

	self.setter = function(value) {
		self.tclass('ui-togglebutton-selected', value === true);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = self.isInvalid();
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass('ui-togglebutton-invalid', invalid);
	};
});