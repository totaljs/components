COMPONENT('cookie', function(self, config) {

	self.singleton();
	self.readonly();

	self.cancel = function() {
		document.cookie.split(';').forEach(function(key) {
			COOKIES.set(key.split('=')[0], '', '-2 days');
		});
		try {
			Object.keys(localStorage).forEach(function(key) {
				localStorage.removeItem(key);
			});
		} catch (e) {}
		location.href = config.redirect || 'about:blank';
		return self;
	};

	self.make = function() {

		var cookie;

		// private mode
		try {
			cookie = localStorage.getItem('cookie');
		} catch (e) {}

		if (cookie) {
			self.rclass('hidden');
			return;
		}

		self.classes('-hidden ui-cookie');
		self.append('<button name="agree">{0}</button><button name="cancel">{1}</button>'.format(config.agree || 'OK', config.cancel || 'Cancel'));

		self.event('click', 'button', function() {

			if (this.name === 'cancel')
				return self.cancel();

			// private mode
			try {
				localStorage.setItem('cookie', '1');
			} catch (e) {}

			self.aclass('hidden');
		});
	};
});