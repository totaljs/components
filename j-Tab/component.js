COMPONENT('tabmenu', function(self) {
	var old = null;
	self.readonly();
	self.make = function() {
		self.event('click', 'li', function() {
			var el = $(this);
			!el.hasClass('selected') && self.set(el.attr('data-value'));
		});
	};

	self.setter = function(value) {
		if (old === value)
			return;
		self.find('.selected').rclass('selected');
		self.find('li[data-value="' + value + '"]').aclass('selected');
		old = value;
	};
});