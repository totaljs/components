COMPONENT('cookie2', 'redirect:about\\:blank;agree:ACCEPT COOKIES;cancel:CANCEL', function(self, config, cls) {

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
			self.remove();
			return;
		}

		self.aclass(cls);
		self.rclass('hidden');
		self.element.prepend('<div class="ui-cookie2-icon"><i class="ti ti-cookie"></i></div');
		self.append('<div class="ui-cookie2-buttons"><button name="agree">{0}</button><button name="cancel">{1}</button></div>'.format(config.agree, config.cancel));

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