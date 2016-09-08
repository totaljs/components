COMPONENT('tabmenu', function() {
	var self = this;
	self.readonly();
	self.make = function() {
		self.element.on('click', 'li', function() {
			var el = $(this);
			!el.hasClass('selected') && self.set(el.attr('data-value'));
		});
	};
	self.setter = function(value) {
		self.element.find('.selected').removeClass('selected');
		self.element.find('li[data-value="' + value + '"]').addClass('selected');
	};
});