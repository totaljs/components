COMPONENT('emptyinline', 'icon:ti ti-ban', function(self, config, cls) {

	self.make = function() {
		self.aclass(cls + ' hidden');
		config.icon && self.element.prepend('<i class="{icon}"></i>'.args(config));
	};

	self.setter = function(value) {
		self.tclass('hidden', value instanceof Array ? value.length > 0 : !!value);
	};

});