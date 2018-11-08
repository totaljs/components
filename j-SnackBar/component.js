COMPONENT('snackbar', 'timeout:4000;button:OK', function(self, config) {

	var show = true;
	var callback;

	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass('ui-snackbar hidden');
		self.append('<div><span class="ui-snackbar-dismiss"></span><span class="ui-snackbar-icon"></span><div class="ui-snackbar-body"></div></div>');
		self.event('click', '.ui-snackbar-dismiss', function() {
			self.hide();
			callback && callback();
		});
	};

	self.hide = function() {
		clearTimeout2(self.ID);
		self.rclass('ui-snackbar-visible');
		setTimeout(function() {
			self.aclass('hidden');
		}, 1000);
		show = true;
	};

	self.waiting = function(message, button, close) {
		self.show(message, button, close, 'fa-spinner fa-pulse');
	};

	self.success = function(message, button, close) {
		self.show(message, button, close, 'fa-check-circle');
	};

	self.warning = function(message, button, close) {
		self.show(message, button, close, 'fa-times-circle');
	};

	self.show = function(message, button, close, icon) {

		if (typeof(button) === 'function') {
			close = button;
			button = null;
		}

		callback = close;

		self.find('.ui-snackbar-icon').html('<i class="fa {0}"></i>'.format(icon || 'fa-info-circle'));
		self.find('.ui-snackbar-body').html(message).attr('title', message);
		self.find('.ui-snackbar-dismiss').html(button || config.button);

		if (show) {
			self.rclass('hidden');
			setTimeout(function() {
				self.aclass('ui-snackbar-visible');
			}, 50);
		}

		clearTimeout2(self.ID);
		setTimeout2(self.ID, self.hide, config.timeout + 50);
		show = false;
	};
});