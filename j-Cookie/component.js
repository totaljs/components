COMPONENT('cookie', 'redirect:about\\:blank;agree:OK;cancel:Cancel', function(self, config) {

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	self.cancel = function() {
		document.cookie.split(';').forEach(function(key) {
			COOKIES.set(key.split('=')[0], '', '-2 days');
		});
		try {
			Object.keys(localStorage).forEach(function(key) {
				localStorage.removeItem(key);
			});
		} catch (e) {}
		location.href = config.redirect;
		return self;
	};

	self.make = function() {

		var cookie;

		// Determines private mode
		try {
			cookie = localStorage.getItem('cookie');
		} catch (e) {
			// Is private mode
			// We disable message
			cookie = true;
		}

		if (cookie) {
			self.aclass('hidden');
			return;
		}

		self.aclass('ui-cookie');
		self.rclass('hidden');
		self.append('<button name="agree">{0}</button><button name="cancel">{1}</button>'.format(config.agree, config.cancel));

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
