COMPONENT('togglebutton', function(self, config) {

	var btn = null;

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

	self.readonly();
	self.make = function() {
		self.aclass('ui-toggle-button');
		self.append('<button></button>');
		btn = self.find('button');
		self.event('click', 'button', function() {
			if (config.disabled)
				return;
			self.dirty(false);
			self.getter(!self.get(), 2, true);
		});
	};

	self.setter = function(value) {
		btn.tclass('ui-toggle-button-selected', value === true);
	};
});