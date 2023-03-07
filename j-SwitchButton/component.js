COMPONENT('switchbutton', function(self, config, cls) {
	self.nocompile();

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : value === true;
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				!init && self.tclass('ui-disabled', value);
				break;
			case 'invalid': 
				self.tclass(cls + '-invalid', value);
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		self.html('<div class="{1}-label"><span>{0}</span>{2}</div><label tabindex=0><div class="{1}-slider"></div></label>'.format(self.html(), cls, config.description));
		
		self.event('click', function() {
			if (!config.disabled) {
				self.dirty(false);
				self.getter(!self.get());
			}
		});

		self.event('keyup', 'label', function(e) {
			if (!config.disabled && e.which === 32) {
				self.dirty(false);
				self.getter(!self.get());
			}
		});

		self.event('focusin focusout', 'label', function(e) {
			if (config.disabled) 
				return;
			self.tclass(cls + '-focused', e.type === 'focusin');
		});

		config.align && self.aclass(cls + '-align-' + config.align);
		config.border && self.aclass(cls + '-border');
	};

	self.setter = function(value) {
		self.tclass(cls + '-checked', value === true);
	};
});