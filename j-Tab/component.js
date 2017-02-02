COMPONENT('tabmenu', function() {
	var self = this;
	self.readonly();
	self.make = function() {
		self.event('click', 'li', function() {
			var el = $(this);
			!el.hasClass('selected') && self.set(el.attr('data-value'));
		});
	};
	self.setter = function(value) {
		self.find('.selected').removeClass('selected');
		self.find('li[data-value="' + value + '"]').addClass('selected');
	};
});