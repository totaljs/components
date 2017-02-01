COMPONENT('cookie', function() {
	var self = this;
	self.singleton();
	self.readonly();

	self.cancel = function() {
		document.cookie.split(';').forEach(function(key) {
			jC.cookies.set(key.split('=')[0], '', '-2 days');
		});
		try {
			Object.keys(localStorage).forEach(function(key) {
				localStorage.removeItem(key);
			});
		} catch (e) {}
		location.href = 'about:blank';
		return self;
	};

	self.make = function() {

		var cookie;

		// private mode
		try {
			cookie = localStorage.getItem('cookie');
		} catch (e) {}

		if (cookie) {
			self.classes('hidden');
			return;
		}

		self.classes('-hidden ui-cookie');
		self.append('<button name="agree">' + (self.attr('data-agree') || 'OK') + '</button>');
		self.append('<button name="cancel">' + (self.attr('data-cancel') || 'Cancel') + '</button>');

		self.element.on('click', 'button', function() {

			if (this.name === 'cancel')
				return self.cancel();

			// private mode
			try {
				localStorage.setItem('cookie', '1');
			} catch (e) {}
			self.classes('hidden');
		});
	};
});