COMPONENT('cookie', function() {
	var self = this;
	self.singleton();
	self.readonly();
	self.make = function() {

		var cookie;

		// private mode
		try {
			cookie = localStorage.getItem('cookie');
		} catch (e) {}

		if (cookie) {
			self.element.addClass('hidden');
			return;
		}

		self.element.removeClass('hidden').addClass('ui-cookie');
		self.element.append('<button>' + (self.attr('data-button') || 'OK') + '</button>');
		self.element.on('click', 'button', function() {
			// private mode
			try {
				localStorage.setItem('cookie', '1');
			} catch (e) {}
			self.element.addClass('hidden');
		});
	};
});