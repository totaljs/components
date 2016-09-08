COMPONENT('notifications', function() {
	var self = this;
	var autoclosing;

	self.singleton();
	self.readonly();
	self.template = Tangular.compile('<div class="ui-notification" data-id="{{ id }}"{{ if callback }} style="cursor:pointer"{{ fi }}><i class="fa fa-times-circle"></i><div class="ui-notification-icon"><i class="fa {{ icon }}"></i></div><div class="ui-notification-message"><div class="ui-notification-datetime">{{ date | format(\'{0}\') }}</div>{{ message | raw }}</div></div>'.format(self.attr('data-date-format') || 'yyyy-MM-dd HH:mm'));
	self.items = {};

	self.make = function() {

		self.element.addClass('ui-notification-container');

		self.element.on('click', '.fa-times-circle', function() {
			var el = $(this).closest('.ui-notification');
			self.close(+el.attr('data-id'));
			clearTimeout(autoclosing);
			autoclosing = null;
			self.autoclose();
		});

		self.element.on('click', 'a,button', function() {
			e.stopPropagation();
		});

		self.element.on('click', '.ui-notification', function(e) {
			var el = $(this);
			var id = +el.attr('data-id');
			var obj = self.items[id];
			if (!obj || !obj.callback)
				return;
			obj.callback();
			self.close(id);
		});
	};

	self.close = function(id) {
		var obj = self.items[id];
		if (!obj)
			return;
		obj.callback = null;
		delete self.items[id];
		self.find('div[data-id="{0}"]'.format(id)).remove();
	};

	self.append = function(icon, message, date, callback) {
		if (icon && icon.substring(0, 3) !== 'fa-')
			icon = 'fa-' + icon;

		if (typeof(date) === 'function') {
			callback = date;
			date = null;
		}

		var obj = { id: Math.floor(Math.random() * 100000), icon: icon || 'fa-info-circle', message: message, date: date || new Date(), callback: callback };
		self.items[obj.id] = obj;
		self.element.append(self.template(obj));
		self.autoclose();
	};

	self.autoclose = function() {

		if (autoclosing)
			return self;

		autoclosing = setTimeout(function() {
			clearTimeout(autoclosing);
			autoclosing = null;
			var el = self.find('.ui-notification');
			el.length > 1 && self.autoclose();
			el.length && self.close(+el.eq(0).attr('data-id'));
		}, +self.attr('data-timeout') || 5000);
	};
});