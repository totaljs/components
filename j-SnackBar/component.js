COMPONENT('snackbar', 'timeout:3000;button:Dismiss', function(self, config) {

	var virtual = null;
	var show = true;
	var callback;

	self.readonly();
	self.blind();
	self.make = function() {
		self.aclass('ui-snackbar hidden');
		self.append('<div><a href="javasc' + 'ript:void(0)" class="ui-snackbar-dismiss"></a><div class="ui-snackbar-body"></div></div>');
		virtual = self.virtualize({ body: '.ui-snackbar-body', button: '.ui-snackbar-dismiss' });
		self.event('click', '.ui-snackbar-dismiss', function() {
			self.hide();
			callback && callback();
		});
	};

	self.hide = function() {
		self.rclass('ui-snackbar-visible');
		setTimeout(function() {
			self.aclass('hidden');
		}, 1000);
		show = true;
	};

	self.show = function(message, button, close) {

		if (typeof(button) === 'function') {
			close = button;
			button = null;
		}

		var icon = message.match(/\"[a-z0-9\-]+\"/);
		if (icon) {
			message = message.replace(icon, '').trim();
			icon = '<i class="fa fa-{0}"></i>'.format(icon.toString().replace(/\"/g, ''));
		} else
			icon = '';

		callback = close;
		virtual.body.html(icon + message);
		virtual.button.html(button || config.button);

		if (show) {
			self.rclass('hidden');
			setTimeout(function() {
				self.aclass('ui-snackbar-visible');
			}, 50);
			setTimeout2(self.id, self.hide, config.timeout + 50);
		}

		show = false;
	};
});