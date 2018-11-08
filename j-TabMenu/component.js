COMPONENT('tabmenu', 'class:selected;selector:li', function(self, config) {
	var old, oldtab;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.event('click', config.selector, function() {
			var el = $(this);
			!el.hclass(config.class) && self.set(el.attrd('value'));
		});
	};

	self.setter = function(value) {
		if (old === value)
			return;
		oldtab && oldtab.rclass(config.class);
		oldtab = self.find(config.selector + '[data-value="' + value + '"]').aclass(config.class);
		old = value;
	};
});