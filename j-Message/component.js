COMPONENT('message', function(self, config) {

	var is, visible = false;
	var timer = null;

	self.readonly();
	self.singleton();

	self.make = function() {
		self.aclass('ui-message hidden');

		self.event('click', 'button', function() {
			self.hide();
		});

		$(window).on('keyup', function(e) {
			visible && e.which === 27 && self.hide();
		});
	};

	self.warning = function(message, icon, fn) {
		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}
		self.callback = fn;
		self.content('ui-message-warning', message, icon || 'fa-warning');
	};

	self.success = function(message, icon, fn) {

		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}

		self.callback = fn;
		self.content('ui-message-success', message, icon || 'fa-check-circle');
	};

	self.hide = function() {
		self.callback && self.callback();
		self.rclass('ui-message-visible');
		timer && clearTimeout(timer);
		timer = setTimeout(function() {
			visible = false;
			self.aclass('hidden');
		}, 1000);
	};

	self.content = function(cls, text, icon) {
		!is && self.html('<div><div class="ui-message-body"><span class="fa fa-warning"></span><div class="ui-center"></div></div><button>' + (config.button || 'Close') + '</button></div>');
		timer && clearTimeout(timer);
		visible = true;
		self.find('.ui-message-body').rclass().aclass('ui-message-body ' + cls);
		self.find('.fa').rclass().aclass('fa ' + icon);
		self.find('.ui-center').html(text);
		self.rclass('hidden');
		setTimeout(function() {
			self.aclass('ui-message-visible');
		}, 5);
	};
});