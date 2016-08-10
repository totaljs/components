COMPONENT('cookie', function() {
	var self = this;
    self.singleton();
    self.readonly();
	self.make = function() {

      var cookie = localStorage.getItem('cookie');
		if (cookie) {
			self.element.addClass('hidden');
			return;
		}

		self.element.removeClass('hidden').addClass('ui-cookie');
		self.element.append('<button>' + (self.attr('data-button') || 'OK') + '</button>');
		self.element.on('click', 'button', function() {
			localStorage.setItem('cookie', '1');
			self.element.addClass('hidden');
		});
	};
});