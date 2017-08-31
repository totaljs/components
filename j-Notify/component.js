COMPONENT('notify', 'timeout:3000', function(self, config) {

	var autoclosing;

	self.singleton();
	self.readonly();
	self.template = Tangular.compile('<div class="ui-notify ui-notify-{{ type }}" data-id="{{ id }}"><div class="ui-notify-icon"><i class="fa {{ icon }}"></i></div><div class="ui-notify-message">{{ message }}</div>');
	self.items = {};

	self.make = function() {
		self.aclass('ui-notify-container');
		self.event('click', '.ui-notify', function() {
			var el = $(this);
			self.close(+el.attrd('id'));
			clearTimeout(autoclosing);
			autoclosing = null;
			self.autoclose();
		});
	};

	self.close = function(id) {
		var obj = self.items[id];
		if (!obj)
			return;

		delete self.items[id];
		var item = self.find('div[data-id="{0}"]'.format(id));
		item.aclass('ui-notify-hide');
		setTimeout(function() {
			item.remove();
		}, 600);
	};

	self.append = function(message, type) {

		if (!type)
			type = 1;

		// type 1: success
		// type 2: warning

		var obj = { id: Math.floor(Math.random() * 100000), message: message, type: type, icon: type === 1 ? 'fa-check-circle' : type === 2 ? 'fa-times-circle' : 'fa-info-circle' };
		self.items[obj.id] = obj;
		self.element.append(self.template(obj));
		self.autoclose();
	};

	self.autoclose = function() {

		if (autoclosing)
			return;

		autoclosing = setTimeout(function() {
			clearTimeout(autoclosing);
			autoclosing = null;
			var el = self.find('.ui-notify');
			el.length > 1 && self.autoclose();
			el.length && self.close(+el.eq(0).attrd('id'));
		}, config.timeout);
	};
});