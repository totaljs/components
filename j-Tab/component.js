COMPONENT('tabmenu', 'class:selected', function(self, config) {
	var old, oldtab;

	self.readonly();
	self.make = function() {
		self.event('click', 'li', function() {
			var el = $(this);
			!el.hclass(config.class) && self.set(el.attr('data-value'));
		});
	};

	self.setter = function(value) {
		if (old === value)
			return;
		oldtab && oldtab.rclass(config.class);
		oldtab = self.find('li[data-value="' + value + '"]').aclass(config.class);
		old = value;
	};
});